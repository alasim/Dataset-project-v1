import { BsArrowDownShort, BsHeart } from "react-icons/bs"
import { FiDownload, FiHeart, FiPlus, FiPlusCircle, FiUser } from "react-icons/fi"
import { HiDatabase } from "react-icons/hi"
import { DataCard } from "./DataCard"
import { BiSortAlt2 } from 'react-icons/bi'
import { RootState } from '../../components/store'
import { useSelector, useDispatch } from 'react-redux'
import { setDownloadModelData, updateList, updateTags, sortList } from '../home/homeSlice'
import axios from "axios"
import { useEffect, useState } from "react"
export const Main = () => {
    const [search, setsearch] = useState('');

    useEffect(() => {
        axios.get('/api/data').then(
            res => {
                console.log('res.data.data.tags');
                console.log(res.data.data.tags);
                dispatch(updateList(res.data.data.uploads))
                dispatch(updateTags(res.data.data.tags))
            })
    }, []);

    const { list, tags, filtered } = useSelector((state: RootState) => state.home)

    const dispatch = useDispatch()
    console.log(list.map(e => e.tags));

    return <div className="w-full">
        <div className="flex space-x-6 mb-6 items-center">
            <div className="font-medium">Datasets &nbsp;&nbsp;<span className="text-base-content/40">{list.length}</span></div>
            <div style={{ width: "15rem" }} className="form-control max-w-xs">
                <input type="search" onChange={(e) => setsearch(e.target.value)} placeholder="Search datas..." className="input input-sm input-bordered" />
            </div>
            <label htmlFor="UpLoadModel" className="btn btn-ghost bg-base-200 btn-square btn-xs"><FiPlus /></label>
            <div>
                <FilterDropDown />
            </div>
        </div>
        {search == "" && <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            {filtered != "" ? Array.from(list.filter(e => e.tags.includes(filtered))).map(e => <DataCard data={e} />) : Array.from(list).map(e => <DataCard data={e} />)}
        </div>}
        {search != "" &&
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                {filtered != "" ? Array.from(list.filter(e => e.tags.includes(filtered) && e.title.toLowerCase().includes(search))).map(e => <DataCard data={e} />) : Array.from(list.filter(e => e.title.toLowerCase().includes(search))).map(e => <DataCard data={e} />)}
            </div>}
        {/* <div className="cursor-pointer" onClick={() => dispatch(increment())}>+</div><span>{count}</span> */}
    </div>
}



const FilterDropDown = () => {
    const [open, setopen] = useState(false);
    const [sort, setsort] = useState('Alphabetical');
    const dispatch = useDispatch()
    return <div onClick={() => setopen(!open)} style={{ width: "200px" }} className="py-1 flex justify-center cursor-pointer text-base-content/60 relative bg-base-200 border border-base-300 rounded-lg px-4">
        {open && <div onClick={() => setopen(false)} className="fixed inset-0 bg-transparent"></div>}
        <div className="flex items-center space-x-2"><BiSortAlt2 /> <span>{sort}</span></div>
        {open && <div className="bg-white rounded-lg shadow-lg absolute bottom-0 translate-y-full left-0">
            <div onClick={() => {
                dispatch(sortList("acc"))
                setsort("Most Downloads")
            }} className="flex py-1 cursor-pointer hover:bg-slate-50 px-4  items-center space-x-2"><BiSortAlt2 /> <span>Most Downloads</span></div>
            <div onClick={() => {
                dispatch(sortList("acc"))
                setsort("Alphabetical")
            }} className="flex py-1 cursor-pointer hover:bg-slate-50 px-4  items-center space-x-2"><BiSortAlt2 /> <span>Alphabetical</span></div>
            <div onClick={() => {
                dispatch(sortList("des"))
                setsort("Recently Updated")
            }} className="flex py-1 cursor-pointer hover:bg-slate-50 px-4  items-center space-x-2"><BiSortAlt2 /> <span>Recently Updated</span></div>
        </div>}
    </div>
}
