var express = require("express");
var router = express.Router();
var multer = require("multer");
var db = require("../conf/database");
const { isLoggedIn } = require("../middleware/auth");
const { makeThumbnail, getPostById, GetCommentsForPostById } = require("../middleware/posts");
const flash = require("express-flash");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/videos/uploads");
  },
  filename: function (req, file, cb) {
    var fileExt = file.mimetype.split("/")[1];
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${file.fieldname}-${uniqueSuffix}.${fileExt}`);
  },
});

const upload = multer({ storage: storage });

router.post(
  "/create",
  isLoggedIn,
  upload.single("inputVideo"),
  makeThumbnail,
  async function (req, res, next) {
    var { title, description } = req.body;
    var { path, thumbnail } = req.file;
    var { userID } = req.session.user;
    try {
      var [insertResult, _] = await db.execute(
        `INSERT INTO posts (title, description, video, thumbnail, fk_userId) VALUE (?,?,?,?,?);`,
        [title, description, path, thumbnail, userID]
      );
      if (insertResult && insertResult.affectedRows) {
        req.flash("success", "Your post was created!");
        return req.session.save(function (error) {
          if (error) next(error);
          return res.redirect(`/`);
        });
      } else {
        next(new Error("Post could not be created"));
      }
    } catch (error) {
      next(error);
    }
  }
);

router.get("/:id(\\d+)", getPostById, GetCommentsForPostById, function (req, res) {
  res.render("viewpost");
});

router.post("/delete/:id(\\d+)", async function (req, res, next) {
  var {id} = req.params;
  console.log(id);
  try {
    var [deleteComments,_] = await db.execute(`DELETE from comments where fk_postId = ?;`, [id])
    var [deleteResult,_] = await db.execute(`DELETE from posts where id = ?;`, [id])
    req.flash("success", "Post deleted.");
    res.redirect('/');
  } catch (error) {
    next(error);
  }
});

module.exports = router;
