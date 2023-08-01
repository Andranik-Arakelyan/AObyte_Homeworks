import React, { useState } from "react";
import { addPostWithImage } from "../api/api";

function AddPost(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [uploaded, setUploaded] = useState(null);

  const handleTitleChange = (value) => {
    setTitle(value);
  };

  const handleDescriptionChange = (value) => {
    setDescription(value);
  };

  const handleUploadedChange = (e) => {
    setUploaded(e.target.files[0]);
  };

  const handlePostUpload = (e) => {
    e.preventDefault();

    const uploadingFiles = {
      title,
      description,
      image: uploaded,
    };

    addPostWithImage(uploadingFiles)
      .then((res) => {})
      .catch((err) => console.log("CHEXAVVV"));
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        margin: "50px 45px",
      }}
    >
      <form
        encType="multipart/form-data"
        onSubmit={handlePostUpload}
        style={{ display: "flex", flexDirection: "column", gap: "25px" }}
      >
        <input
          name="title"
          type="text"
          placeholder="Title"
          onChange={(e) => handleTitleChange(e.target.value)}
        />
        <input
          name="description"
          type="text"
          placeholder="description"
          onChange={(e) => handleDescriptionChange(e.target.value)}
        />
        <input
          name="image"
          type="file"
          onChange={(e) => handleUploadedChange(e)}
        />
        <button type="submit">Post It</button>
      </form>
    </div>
  );
}

export default AddPost;
