// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
let data = require('/datas.json');


export default function handler(
  req,
  res
) {
  res.status(200).json({ data });
}
