const express = require("express");
const admin = require("firebase-admin");
const cors = require("cors");

const serviceAccount = require("./commentify-8218e-firebase-adminsdk-kez8r-e1a9c241dd.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://commentify-8218e-default-rtdb.firebaseio.com",
});

const db = admin.database();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.get("/api/posts", (req, res) => {
  db.ref("posts")
    .once("value")
    .then((snapshot) => {
      const posts = snapshot.val();
      res.json(posts);
    })
    .catch((error) => {
      res.status(500).json({ error: "Error fetching posts" });
    });
});

app.post("/api/posts", (req, res) => {
  const { id, title } = req.body;

  const newPost = {
    title,
    comments: [],
  };

  db.ref("posts")
    .child(id)
    .set(newPost)
    .then(() => {
      res.json(newPost);
    })
    .catch((error) => {
      res.status(500).json({ error: "Error adding post" });
    });
});

app.delete("/api/posts/:postId/comments/:commentId", (req, res) => {
  const { postId, commentId } = req.params;
  db.ref("posts")
    .child(postId)
    .once("value")
    .then((snapshot) => {
      const postData = snapshot.val();
      // console.log(commentId);
      // console.log(postData.comments);
      postData.comments = postData.comments.filter((com) => {
        return com.id !== commentId;
      });
      // console.log(postData.comments);

      db.ref("posts")
        .child(postId)
        .update({ comments: postData.comments })
        .then(() => {
          res.json(postData.comments);
        })
        .catch((error) => {
          res.status(500).json({ error: "Error adding comment" });
        });
    });
});

app.post("/api/posts/:postId/comments", (req, res) => {
  const { postId } = req.params;
  const { comment, rating } = req.body;
  const newComment = {
    id: `comment${Date.now()}`,
    comment,
    rating,
  };

  db.ref("posts")
    .child(postId)
    .once("value")
    .then((snapshot) => {
      const postData = snapshot.val();
      if (!postData) {
        return res.status(404).json({ error: "Post not found" });
      }

      postData.comments = postData.comments || [];

      postData.comments.push(newComment);

      db.ref("posts")
        .child(postId)
        .update({ comments: postData.comments })
        .then(() => {
          res.json(newComment);
        })
        .catch((error) => {
          res.status(500).json({ error: "Error adding comment" });
        });
    })
    .catch((error) => {
      res.status(500).json({ error: "Error fetching post data" });
    });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
