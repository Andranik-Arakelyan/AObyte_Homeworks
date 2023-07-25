import React from "react";
import classes from "./PostDetail.module.css";

// const drawPhotos = (photos) => {
//   return photos.map((photo) => {
//     return <img src={photo.url} key={photo.id} alt="post" />;
//   });
// };

function PostDetail({ title, description, photos }) {
  return (
    <div className={classes.container}>
      <div className={classes.heading}>
        <h3>{title}</h3>
      </div>
      <div className={classes.description}>
        <p>{description}</p>
      </div>
      {/* <div className={classes.photos}>{drawPhotos(photos)}</div> */}
    </div>
  );
}

export default PostDetail;
