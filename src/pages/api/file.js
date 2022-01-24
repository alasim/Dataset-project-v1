import formidable from "formidable";
import fs from "fs";
import path from 'path';
import data from "/datas.json";
// let data = require('./datas.json');
export const config = {
    api: {
        bodyParser: false
    }
};
/* 
"id": "0835a524-5eee-45b4-b5cc-487c13e8b3f9",
            "name": "337ddd0415.png",
            "type": "image/png",
            "size": 4667554,
            "extention": ".png"
*/
const post = async (req, res) => {
    const form = new formidable.IncomingForm();
    form.parse(req, async function (err, fields, files) {
        let newData = JSON.parse(fields.data);

        console.log(data);
        data.uploads.push(newData)
        console.log(data);
        var fileName = await saveFile(files.file, newData);
        saveData()
        return res.status(201).json(fileName);
    });
};

const saveFile = async (file, newData) => {
    const data = fs.readFileSync(file.filepath);
    const filePath = path.join(process.cwd(), `/downloads/${newData.file.id}${newData.file.extention}`);
    try {
        fs.writeFileSync(filePath, data)
        fs.unlinkSync(file.filepath);
        return { path: file.filepath };
    } catch (error) {
        return { error: "Error" };
    }

};

export default async (req, res) => {
    console.log('read first data');
    console.log(data);
    if (req.method === "POST") {
        await post(req, res)

    }

};

function saveData() {
    try {
        console.log('save data data');
        console.log(data);
        const filePath = path.join(process.cwd(), `/datas.json`);
        fs.writeFileSync(filePath, JSON.stringify(data))
        // fs.writeFileSync('datas3.json', JSON.stringify(data))
    } catch (err) {
        console.log('Error writing Metadata.json:' + err.message)
    }

}