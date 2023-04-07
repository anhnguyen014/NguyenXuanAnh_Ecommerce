const Blog = require("../models/blogModel");

const User = require("../models/userModel");
const asyHandler = require("express-async-handler");
const { validateMoongodbId } = require("../utils/vaidateMongodbid");
const { cloudinaryUploadImg } = require("../utils/cloudinary");

const fs = require("fs");

// create blog

const createBlog = asyHandler(async (req, res) => {
  try {
    const newBlog = await Blog.create(req.body);
    console.log(newBlog);
    res.json({
      status: "success",
      newBlog,
    });
  } catch (error) {
    throw new Error(error);
  }
});

//update a blog

const updateBlog = asyHandler(async (req, res) => {
  const { id } = req.params;
  validateMoongodbId(id);
  try {
    const updateBlog = await Blog.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json({
      status: "success",
      updateBlog,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// get a blog
const getBlog = asyHandler(async (req, res) => {
  const { id } = req.params;
  validateMoongodbId(id);
  try {
    const getBlog = await Blog.findById(id)
      .populate("likes")
      .populate("dislikes");
    const updateViews = await Blog.findByIdAndUpdate(
      id,
      {
        $inc: { numViews: 1 },
      },
      { new: true }
    );
    res.json(getBlog);
  } catch (error) {
    throw new Error(error);
  }
});

//get all blog

const getAllBlog = asyHandler(async (req, res) => {
  try {
    const get_allBlog = await Blog.find();
    res.json(get_allBlog);
  } catch (error) {
    throw new Error(error);
  }
});

//delete blog

const deleteBlog = asyHandler(async (req, res) => {
  const { id } = req.params;
  validateMoongodbId(id);
  try {
    const deleteBlog = await Blog.findByIdAndDelete(id);
    res.json({
      success: "Blog is deleted",
    });
  } catch (error) {
    throw new Error(error);
  }
});

//like blog

const likeBlog = asyHandler(async (req, res) => {
  const { blogId } = req.body;
  validateMoongodbId(blogId);
  //find the blog which you want to be liked
  const blog = await Blog.findById(blogId);

  //find login user
  const loginUserId = req?.user?._id;
  //find the user has liked the post
  const isLiked = blog?.isLiked;
  //find the user if user disliked the post
  const alreadyDisliked = blog?.dislikes?.find(
    (userId) => userId?.toString() === loginUserId?.toString()
  );
  if (alreadyDisliked) {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $pull: { dislikes: loginUserId },
        isDisliked: false,
      },
      {
        new: true,
      }
    );
    res.json(blog);
  }
  if (isLiked) {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $pull: { likes: loginUserId },
        isLiked: false,
      },
      {
        new: true,
      }
    );
    res.json(blog);
  } else {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $push: { likes: loginUserId },
        isLiked: true,
      },
      {
        new: true,
      }
    );
    res.json(blog);
  }
});

// dislike the blog

const dislikeBlog = asyHandler(async (req, res) => {
  const { blogId } = req.body;
  validateMoongodbId(blogId);
  //find the blog which you want to be liked
  const blog = await Blog.findById(blogId);

  //find login user
  const loginUserId = req?.user?._id;
  //find the user has liked the post
  const isDisLiked = blog?.isDisliked;
  //find the user if user disliked the post
  const alreadyLiked = blog?.likes?.find(
    (userId) => userId?.toString() === loginUserId?.toString()
  );
  if (alreadyLiked) {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $pull: { likes: loginUserId },
        isLiked: false,
      },
      {
        new: true,
      }
    );
    res.json(blog);
  }
  if (isDisLiked) {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $pull: { dislikes: loginUserId },
        isDisliked: false,
      },
      {
        new: true,
      }
    );
    res.json(blog);
  } else {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $push: { dislikes: loginUserId },
        isDisliked: true,
      },
      {
        new: true,
      }
    );
    res.json(blog);
  }
});

const updateImages = asyHandler(async (req, res) => {
  const { id } = req.params;
  validateMoongodbId(id);
  try {
    const uploader = (path) => cloudinaryUploadImg(path, "images");
    const urls = [];
    const files = req.files;
    for (const file of files) {
      const { path } = file;
      const newpath = await uploader(path);

      urls.push(newpath);
      fs.unlinkSync(path);
    }
    const findBlog = await Blog.findByIdAndUpdate(
      id,
      {
        images: urls.map((file) => {
          return file;
        }),
      },
      {
        new: true,
      }
    );
    res.json(findBlog);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createBlog,
  updateBlog,
  getBlog,
  getAllBlog,
  deleteBlog,
  likeBlog,
  dislikeBlog,
  updateImages,
};
