import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
/**
 * # MY ACCOUNT GOOGLE PLAY:
 * @see {@link https://play.google.com/store/apps/developer?id=dzino Google Play}
 */

export default function PrivatePage(props) {
  const [file, setFile] = useState(null);
  const [createObjectURL, setCreateObjectURL] = useState(null);

  const uploadToClient = (event) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];

      setFile(i);
      setCreateObjectURL(URL.createObjectURL(i));
    }
  };

  const uploadToServer = async (event) => {
    const data = {
      id: uuidv4(),
      title: "News today",
      user: "Hasan",
      downloads: 21,
      loves: 10,
      file: {
        id: uuidv4(),
        name: file.name,
        type: file.type,
        extention: '.' + file.name.split('.')[file.name.split('.').length - 1]
      },
      date: Date(),
    }
    const body = new FormData();
    body.append("file", file);
    body.append("data", JSON.stringify(data));
    const response = await fetch("/api/file", {
      method: "POST",
      body
    });
    console.log(response.body);
  };

  return (
    <div>
      <div>
        <img src={createObjectURL} />
        <h4>Select Image</h4>
        <input type="file" name="myImage" onChange={uploadToClient} />
        <button
          className="btn btn-primary"
          type="submit"
          onClick={uploadToServer}
        >
          Send to server
        </button>
      </div>
    </div>
  );
}
