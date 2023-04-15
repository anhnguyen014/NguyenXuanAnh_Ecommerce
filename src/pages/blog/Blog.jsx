import React, { useEffect } from "react";
import Meta from "../../components/Meta";
import BlogCard from "../../components/BlogCard";
import BreadCrumb from "../../components/BreadCrumb";
import Container from "../../components/Container";
import { useSelector, useDispatch } from "react-redux";
import { getAllBlogs } from "../../features/blogs/blogSlice";
import moment from "moment";

const Blog = () => {
  const dispatch = useDispatch();
  const blogState = useSelector((state) => state?.blog?.blogs);

  useEffect(() => {
    getBlogs();
  }, []);

  const getBlogs = () => {
    dispatch(getAllBlogs());
  };
  return (
    <>
      <Meta title={"Blogs"} />
      <BreadCrumb title="News" />
      <Container class1="blog-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-3">
            <div className="filter-card mb-3">
              <h3 className="filter-title">Find By Categories</h3>
              <div>
                <ul className="ps-0">
                  <li>Watch</li>
                  <li>TV</li>
                  <li>SmartPhone</li>
                  <li>Camera</li>
                  <li>Laptop</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-9">
            <div className="row">
              {blogState &&
                blogState.map((item, index) => {
                  return (
                    <div className="col-6 mb-3" key={index}>
                      <BlogCard
                        id={item?._id}
                        title={item?.title}
                        description={item?.description}
                        images={item?.images[0]?.url}
                        date={moment(item?.createdAt).format(
                          "MMMM Do YYYY, h:mm:ss a"
                        )}
                      />
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Blog;
