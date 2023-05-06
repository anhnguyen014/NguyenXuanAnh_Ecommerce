import React, { useEffect, useState } from "react";
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
  const [categories, setCategories] = useState([]);

  const [category, setCategory] = useState(null);
  useEffect(() => {
    let newCategories = [];
    for (let index = 0; index < blogState?.length; index++) {
      const element = blogState[index];
      newCategories.push(element?.category);
    }
    setCategories(newCategories);
  }, [blogState]);

  console.log(...new Set(categories));

  useEffect(() => {
    getBlogs();
  }, [category]);

  const getBlogs = () => {
    dispatch(getAllBlogs({ category }));
  };
  return (
    <>
      <Meta title={"Blogs"} />
      <BreadCrumb title="News" />
      <Container class1="blog-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-3">
            <div className="filter-card mb-3">
              <h3 className="filter-title">Danh mục tin tức</h3>
              <div>
                <ul className="ps-0">
                  {categories &&
                    [...new Set(categories)]?.map((item, index) => {
                      return (
                        <li key={index} onClick={() => setCategory(item)}>
                          {item}
                        </li>
                      );
                    })}
                  {/* <li>Watch</li>
                  <li>TV</li>
                  <li>SmartPhone</li>
                  <li>Camera</li>
                  <li>Laptop</li> */}
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
