import formidable from "formidable";
import fs from "fs";
import path from 'path';
import data from "/datas.json";
export default async (req, res) => {

    if (req.method === "POST") {

        console.log(req.body.tag);
        saveData(req.body.tag).then(reusult => {
            console.log(reusult);
            res.status(201).json(reusult);
        })
    }

};

async function saveData(tag) {
    try {
        data.tags.push(tag)
        const filePath = path.join(process.cwd(), `/datas.json`);
        await fs.writeFileSync(filePath, JSON.stringify(data))
        // fs.writeFileSync('datas3.json', JSON.stringify(data))
        return 0
    } catch (err) {
        console.log('Error writing Metadata.json:' + err.message)
        return 1
    }

}