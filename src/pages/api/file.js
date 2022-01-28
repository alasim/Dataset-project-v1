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
    const form = new formidable.IncomingForm();
    form.parse(req, async function (err, fields) {
        data.uploads.push(fields)
        // var fileName = await saveFile(files.file, newData);
        saveData()
        return res.status(201).json(fields);
    });
};
const countDownload = (id) => {
    let item = data.uploads.filter(e => e.id == id)[0]
    let index = data.uploads.indexOf(item)
    if (item) {
        item.downloads = item.downloads + 1
    }
    data.uploads[index] = item
    saveData()
};
const deleteItem = async (req, res) => {
    const form = new formidable.IncomingForm();
    form.parse(req, async function (err, fields) {
        console.log('fields');
        console.log(fields);
        if (fields.downloadCount) {
            countDownload(fields.id)
        } else {
            console.log(data.uploads.length);
            data.uploads = data.uploads.filter(e => e.id != fields.id)
        }

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
    else if (req.method === "PUT") {
        await deleteItem(req, res)
    }
};

function saveData() {
    try {
        const filePath = path.join(process.cwd(), `/datas.json`);
        fs.writeFileSync(filePath, JSON.stringify(data))
        // fs.writeFileSync('datas3.json', JSON.stringify(data))
    } catch (err) {
        ('Error writing Metadata.json:' + err.message)
    }
}