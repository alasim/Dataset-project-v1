import fs from 'fs';
import path from 'path';

const ioHandler = (req, res) => {
    console.log(JSON.parse(req.body.data));

    const fileId = req.query.fileId;
    console.log(fileId);
    const filePath = path.join(process.cwd(), `/downloads/${fileId}`);
    var stat = fs.statSync(filePath);
    console.log(filePath);
    try {
        const fileBuffer = fs.readFileSync(filePath);

        res.setHeader('Content-Type', 'video/mp4');
        res.setHeader('Content-Length', stat.size);
        res.send(fileBuffer);
    } catch (e) {
        res.status(400).json({ error: true, message: 'file not found' });
    }
}

export default ioHandler