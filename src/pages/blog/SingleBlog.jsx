import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import BreadCrumb from "../../components/BreadCrumb";
import Meta from "../../components/Meta";
import { HiOutlineArrowLeft } from "react-icons/hi";
import blog from "../../images/blog-1.jpg";
import Container from "../../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { getABlog } from "../../features/blogs/blogSlice";

const SingleBlog = () => {
  const dispatch = useDispatch();
  const blogState = useSelector((state) => state?.blog?.singleBlog);
  const location = useLocation();
  const getBlogId = location.pathname.split("/")[2];

  useEffect(() => {
    getBlogs(getBlogId);
  }, []);
  const getBlogs = () => {
    dispatch(getABlog(getBlogId));
  };
  return (
    <>
      <Meta title={"Dynamic Blog Name"} />
      <BreadCrumb title="Dynamic Blog Name" />
      <Container class1="blog-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="single-blog-card">
              <Link to="/blog" className="d-flex align-items-center gap-10">
                <HiOutlineArrowLeft className="fs-4" />
                Trở lại
              </Link>
              <h3 className="title">{blogState?.title}</h3>
              <img
                src={blogState?.images[0].url ? blogState?.images[0].url : blog}
                className="img-fluid w-100 my-4"
                alt="blog"
              />
              <p
                dangerouslySetInnerHTML={{ __html: blogState?.description }}
              ></p>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default SingleBlog;
