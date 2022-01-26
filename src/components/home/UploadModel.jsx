import axios from 'axios';
import clsx from 'clsx'
import { useState } from 'react'
import { setDownloadModelData, updateList, addNew } from '../home/homeSlice'
import { useSelector, useDispatch } from 'react-redux'
import { v4 as uuidv4 } from 'uuid';
import { RootState } from '../store'
export const UpLoadModel = () => {

    const [openMenu, setopenMenu] = useState(false)
    const [title, settitle] = useState("");
    const dispatch = useDispatch()
    const [selecetedTags, setselecetedTags] = useState([])
    const { list, tags, downloadModelData } = useSelector((state) => state.home)
    const [file, setfile] = useState(null);
    const handleFileChange = (e) => {
        if (e.target.files.length === 0) return false;
        console.log(e.target.files[0]);
        setfile(e.target.files[0]);
    };
    console.log('tags');
    console.log(tags);
    const uploadToServer = async (event) => {
        const body = new FormData();
        body.append("file", file);
        body.append("token", '2IITpuRYdgtcowglhMOQ69ieEERiKlIY');
        body.append("folderId", '24b59a9a-99f5-482e-b511-6c007c4aaccf');
        const response = await axios.post("https://store2.gofile.io/uploadFile", body);
        const data = {
            id: uuidv4(),
            title: title,
            user: "Hasan",
            downloads: 0,
            loves: 0,
            file: {
                id: response.data.data.fileId,
                name: response.data.data.fileName,
                type: file.type,
                url: response.data.data.directLink
            },
            date: Date(),
            tags: selecetedTags
        }
        console.log(data);
        let result = await axios.post("/api/file",
            data
        );
        dispatch(addNew(result.data))
        console.log('result');
        console.log(result);
    };

    return <div>
        <input type="checkbox" id="UpLoadModel" className="modal-toggle" />
        <div className="modal">
            <div className="modal-box p-4 rounded">
                <p className='font-bold'>Upload New file</p>
                <form action="">
                    <div className="form-control mb-4">
                        <label className="label">
                            <span className="label-text">Title</span>
                        </label>
                        <input type="text" onChange={(e) => settitle(e.target.value)} placeholder="Title" className="block
    w-full
    px-3
    py-1.5
    text-base
    font-normal
    text-gray-700
    bg-white bg-clip-padding
    border border-solid border-gray-300
    rounded
    transition
    ease-in-out
    m-0
    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" />
                    </div>
                    <div className="flex justify-center">
                        <div className="mb-3 w-96">
                            <span className="label-text">File</span>
                            <input onChange={handleFileChange} className="form-control
    block
    w-full
    px-3
    py-1.5
    text-base
    font-normal
    text-gray-700
    bg-white bg-clip-padding
    border border-solid border-gray-300
    rounded
    transition
    ease-in-out
    m-0
    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" type="file" id="formFileMultiple" />
                        </div>
                    </div>

                </form>
                <div className="relative" >
                    <span className="label-text">Tags</span>
                    <div className="pr-10 mt-2 pb-1 relative border border-gray-300 dark:border-gray-600 rounded" data-v-27032f04="">
                        <div className="flex flex-wrap items-center" >
                            {selecetedTags.map(e =>
                                <div className="mt-1 ml-1 p-1 max-w-full flex items-center bg-blue-500 text-white rounded select-none cursor-text"
                                >
                                    <span className="text-sm truncate">{e}</span>
                                    <button onClick={() => {
                                        setselecetedTags(selecetedTags.filter(i => i != e))
                                    }} className="pl-1 flex items-center border-0 outline-none focus:outline-none focus:ring-0">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                                    </button>
                                </div>)}

                            {/* <!-- input --> */}
                            <div className="mt-1 ml-1 overflow-hidden min-w-min flex-1">
                                <input type="text" className="py-1 w-full border-0 bg-transparent outline-none focus:outline-none ring-0 focus:ring-0 appearance-none" data-v-27032f04="" /></div>
                        </div>
                        <button onClick={() => {
                            setopenMenu(!openMenu)
                        }} className="w-10 h-full absolute top-0 right-0 flex items-center justify-center outline-none focus:outline-none" data-v-27032f04=""><span className="transition-all duration-100 transform rotate-180"><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M19 9l-7 7-7-7"></path></svg></span></button>
                    </div>
                    <div className={clsx("mt-2 w-full absolute to-full h-40 overflow-y-scroll", openMenu ? 'block' : 'hidden')} data-v-27032f04="">
                        <ul className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded shadow-lg overflow-y-auto"
                            style={{ maxHeight: '150px;' }}>
                            {tags.map(e => <li onClick={() => {
                                if (selecetedTags.includes(e)) {
                                    setselecetedTags(selecetedTags.filter(i => i != e))
                                } else
                                    setselecetedTags([...selecetedTags, e])
                            }}
                                className={clsx("pl-4 pr-6 py-1 border-b border-gray-300 dark:border-gray-600 cursor-pointer truncate ", selecetedTags.includes(e) && 'bg-blue-500 text-white')}>
                                {e}</li>)}


                        </ul>
                    </div>
                </div>
                <div className="modal-action">
                    <label htmlFor="UpLoadModel" onClick={uploadToServer} className="btn btn-sm btn-primary">Submit</label>
                    <label htmlFor="UpLoadModel" className="btn btn-sm">Cencel</label>
                </div>
            </div>
        </div>
    </div>
}