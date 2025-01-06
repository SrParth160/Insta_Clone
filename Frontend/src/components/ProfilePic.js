import React, { useState, useEffect, useRef } from "react";

export default function ProfilePic() {
    const hiddenFileInput = useRef(null);
    const [image, setImage] = useState("");
    const [url, setUrl] = useState("");
  
    const handleClick = () => {
        hiddenFileInput.current.click();
      };
      const postDetails = () => {
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", "insta-clone");
        data.append("cloud_name", "cantacloud2");
        fetch("https://api.cloudinary.com/v1_1/cantacloud2/image/upload", {
          method: "post",
          body: data,
        })
          .then((res) => res.json())
          .then((data) => setUrl(data.url))
          .catch((err) => console.log(err));
        console.log(url);
      };
    

    return (
    <div className='ProfilePic darkBg'>
<div className="changePic centered">
        <div>
          <h2>Change Profile Photo</h2>
        </div>
        <div style={{ borderTop: "1px solid #00000030" }}>
          <button
            className="upload-btn"
            style={{ color: "#1EA1F7" }}
            onClick={handleClick}
          >
            Upload Photo
          </button>
          <input
            type="file"
            ref={hiddenFileInput}
            accept="image/*"
            style={{ display: "none" }}
            onChange={(e) => {
              setImage(e.target.files[0]);
            }}
          />
        </div>
    </div>
    </div>
    )
}