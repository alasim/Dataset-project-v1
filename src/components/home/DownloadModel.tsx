import { BsDownload } from 'react-icons/bs'
import { useSelector, useDispatch } from 'react-redux'
import { BsArrowDownShort, BsHeart } from "react-icons/bs"
import { FiDownload, FiHeart, FiUser } from "react-icons/fi"
import { AiOutlineClose } from "react-icons/ai"
import { HiDatabase } from "react-icons/hi"
import { RootState } from '../store'
import React, { FC, useEffect, useState } from 'react'
import { IItem } from 'interfaces/IItem'
import axios from 'axios'
import Link from 'next/link'
export const DowloadModel: FC<{ data: IItem }> = ({ data }) => {
    const { list, tags, downloadModelData } = useSelector((state: RootState) => state.home)

    const downloadFile = (url?: string) => {
        if (url != null) {
            axios.get(url).then((res) => {
                /* var data = new Blob([res.data], { type: data.file.type });
                var csvURL = window.URL.createObjectURL(data); */
                var tempLink = document.createElement('a');
                tempLink.href = data.file.url;
                tempLink.setAttribute('download', data.file.name);
                tempLink.click();
            }).catch(error => {

            });
        }


    };

    useEffect(downloadFile, []);



    return <div>
        <input type="checkbox" id="DowloadModel" className="modal-toggle" />
        <div className="modal">
            <div className="modal-box p-4 rounded">
                <div className="space-y-4 relative pt-4 p-2 border-2 border-base-200 rounded">
                    <label htmlFor='DowloadModel'><AiOutlineClose className='btn btn-xs btn-ghost btn-square absolute right-2 top-2' /></label>
                    <header className="flex items-center px-4 ">
                        <HiDatabase className="mr-1 text-gray-400 group-hover:text-red-500 flex-none" />
                        <h6>{data.title}</h6>
                    </header>
                    {/* <div className="text-sm text-base-300 px-3"><span>Updated Jan 20, 2022</span></div> */}
                    <div className="flex px-3 items-center text-sm text-gray-400 leading-tight whitespace-nowrap overflow-hidden mr-1">
                        <span className="truncate space-x-1"><span>Updated</span>
                            <time dateTime="2021-11-22T16:40:18" title="Mon, 22 Nov 2021 16:40:18 GMT">{data.date}</time>
                        </span>
                        <br />
                        <span className="px-1.5 text-gray-300">•</span>
                        <FiDownload className="flex-none w-3 text-gray-400 mr-0.5" /> {data.downloads}k
                        <span className="px-1.5 text-gray-300">•</span>
                        <FiHeart className="flex-none w-3 text-gray-400 mr-1" /> {data.loves}
                        <span className="px-1.5 text-gray-300">•</span>
                        <FiUser className="flex-none w-3 text-gray-400 mr-1" /> {data.user}
                    </div>
                    <div className='flex px-3 space-x-4 items-center'>
                        <div>Tags:</div>
                        <div className='space-x-2'>
                            {downloadModelData.tags.map(e => <span className='btn btn-xs btn-ghost bg-primary/10'>{e}</span>)}
                        </div>
                    </div>

                    <div className='flex justify-end'>
                        <Link href={downloadModelData.file.url}>
                            <button onClick={() => downloadFile(downloadModelData.file.url)} className="btn btn-sm ml-3 btn-primary">
                                <BsDownload className="inline-block w-6 h-6 mr-2 stroke-current" />
                                {downloadModelData.file.type}
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

