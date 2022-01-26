import axios from "axios"
import clsx from "clsx"
import { RootState } from "components/store"
import { FiX } from "react-icons/fi"
import { useDispatch, useSelector } from "react-redux"
import { setDownloadModelData, updateList, updateTags, setFilter, clearFilter } from '../home/homeSlice'
import { AddTAg } from "./AddTag"

export const Tags = () => {
    const dispatch = useDispatch()
    const { list, tags, downloadModelData, filtered } = useSelector((state: RootState) => state.home)

    return <div style={{ width: "15rem" }} className="shrink-0 h-screen flex flex-col justify-between space-y-2 p-4 bg-base-200">

        <div>
            <div className="font-medium flex justify-between"><div><span>Tags</span></div> {filtered != "" && <span onClick={() => dispatch(clearFilter())} className="btn btn-xs  btn-ghost bg-error/5"><FiX /></span>}</div>
            <div className='flex flex-wrap '>
                {tags.map(e => <span onClick={() => dispatch(setFilter(e))} className={clsx("btn btn-xs btn-ghost  mr-2 mb-3", filtered == e ? "bg-primary/50" : "bg-primary/5")}>{e}</span>)}
            </div>
        </div>
        <AddTAg />
    </div>
}

