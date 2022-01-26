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

const post = async (req, res) => {
    console.log(req.body);
    const form = new formidable.IncomingForm();
    form.parse(req, async function (err, fields) {
        console.log('fields');
        console.log(fields);
        console.log(data);
        data.uploads.push(fields)
        console.log(data);
        // var fileName = await saveFile(files.file, newData);
        saveData()
        return res.status(201).json(fields);
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