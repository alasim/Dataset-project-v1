import { BsArrowDownShort, BsHeart } from "react-icons/bs"
import { FiDownload, FiHeart, FiPlus, FiPlusCircle, FiUser } from "react-icons/fi"
import { HiDatabase } from "react-icons/hi"
import { DataCard } from "./DataCard"

import { RootState } from '../../components/store'
import { useSelector, useDispatch } from 'react-redux'
import { setDownloadModelData, updateList } from '../home/homeSlice'
import axios from "axios"
import { useEffect, useState } from "react"
export const Main = () => {
    const [datas, setdatas] = useState([]);
    useEffect(() => {
        // axios.get('/api/data').then(
        //     res => {
        //         console.log(res.data.data.uploads);
        //         dispatch(updateList(res.data.data.uploads))
        //     })      
        getUrl()
    }, []);

    const getUrl = async () => {
        const data = {
            "id": "c2071634-5091-4e53-a01b-6cb876561946",
            "title": "Hasan",
            "user": "Hasan",
            "downloads": 0,
            "loves": 0,
            "file": {
                "id": "ba103461-875e-413f-a19b-0e35855b05ac",
                "name": "asim.jpg",
                "type": "image/jpeg",
                "extention": ".jpg"
            },
            "date": "Tue Jan 25 2022 01:25:18 GMT+0600 (Bangladesh Standard Time)"
        }
        const body = new FormData();
        body.append("data", JSON.stringify({ name: "Hasan" }));
        const response = await fetch("/api/getFile", {
            method: "POST",
            body
        });
        console.log(response.body);
    };

    const { list, tags } = useSelector((state: RootState) => state.home)
    const dispatch = useDispatch()
    return <div className="w-full">
        <div className="flex space-x-6 mb-6 items-center">
            <div className="font-medium">Datasets &nbsp;&nbsp;<span className="text-base-content/40">2000</span></div>
            <div style={{ width: "15rem" }} className="form-control max-w-xs">
                <input type="text" placeholder="Search datas..." className="input input-sm input-bordered" />
            </div>
            <label htmlFor="UpLoadModel" className="btn btn-ghost bg-base-200 btn-square btn-xs"><FiPlus /></label>
        </div>
        <div className="grid gap-4 grid-cols-2">
            {Array.from(list).map(e => <DataCard data={e} />)}
        </div>
        {/* <div className="cursor-pointer" onClick={() => dispatch(increment())}>+</div><span>{count}</span> */}
    </div>
}




