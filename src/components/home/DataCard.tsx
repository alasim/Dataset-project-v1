import axios from "axios"
import { IItem } from "interfaces/IItem"
import { FC, useEffect } from "react"
import { BsArrowDownShort, BsHeart } from "react-icons/bs"
import { FiDownload, FiHeart, FiUser } from "react-icons/fi"
import { HiDatabase } from "react-icons/hi"

import { useSelector, useDispatch } from 'react-redux'
import { setDownloadModelData } from '../home/homeSlice'

export const DataCard: FC<{ data: IItem }> = ({ data }) => {
    const dispatch = useDispatch()
    useEffect(() => {
        axios.get('/api/getFile').then(data => {
            console.log('data');
            console.log(data);
        })

    }, []);

    return <label onClick={() => dispatch(setDownloadModelData(data))} htmlFor="DowloadModel" className="">
        <div className="cursor-pointer space-y-2 py-2 group hover:bg-base-200/50 border-2 border-base-200 rounded-xl">
            <header className="flex group-hover:text-red-500 items-center px-4 ">
                <HiDatabase className="mr-1 text-gray-400 group-hover:text-red-500 flex-none" />
                <h6>{data.title}</h6>
            </header>
            {/* <div className="text-sm text-base-300 px-3"><span>Updated Jan 20, 2022</span></div> */}
            <div className="flex px-3 items-center text-sm text-gray-400 leading-tight whitespace-nowrap overflow-hidden mr-1">
                <span className="truncate space-x-1"><span>Updated</span>
                    <time dateTime="2021-11-22T16:40:18" title="Mon, 22 Nov 2021 16:40:18 GMT">{data.date}</time>
                </span>
                <span className="px-1.5 text-gray-300">•</span>
                <FiDownload className="flex-none w-3 text-gray-400 mr-0.5" /> {data.downloads}k
                <span className="px-1.5 text-gray-300">•</span>
                <FiHeart className="flex-none w-3 text-gray-400 mr-1" /> {data.loves}
                <span className="px-1.5 text-gray-300">•</span>
                <FiUser className="flex-none w-3 text-gray-400 mr-1" /> {data.user} </div>
        </div>
    </label >
}
// <label htmlFor="UpLoadModel" className="btn btn-primary modal-button">open modal</label>