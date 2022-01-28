import axios from "axios";
import { useState } from "react";
import { FiPlus } from "react-icons/fi";

import { setDownloadModelData, updateList, addNew, addNewTag } from '../home/homeSlice'
import { useSelector, useDispatch } from 'react-redux'

export function AddTAg() {
    const [tag, settag] = useState("");
    const dispatch = useDispatch()

    async function handleSubmit() {
        if (tag) {

            let result = await axios.post("/api/tag",
                { tag }
            );
            console.log('result');
            console.log(result);
            dispatch(addNewTag(tag))
            settag('')
        }

    }
    return (
        <div className="flex pb-20 items-center space-x-2">
            <div style={{ width: "10rem" }} className="form-control max-w-xs">
                <input type="search" onChange={(e) => settag(e.target.value)} placeholder="New tag..." className="input input-sm input-bordered" />
            </div>
            <label onClick={handleSubmit} className="btn btn-ghost bg-base-200 btn-square btn-xs"><FiPlus /></label>
        </div>
    )
}