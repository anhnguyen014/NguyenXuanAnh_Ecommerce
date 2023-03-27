import React from "react";
import { Link } from "react-router-dom";
import BreadCrumb from "../../components/BreadCrumb";
import Meta from "../../components/Meta";
import { HiOutlineArrowLeft } from "react-icons/hi";
import blog from "../../images/blog-1.jpg";
import Container from "../../components/Container";

const SingleBlog = () => {
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
                Go back to Blogs
              </Link>
              <h3 className="title">A Beautiful Sunday Morning Renaissance</h3>
              <img src={blog} className="img-fluid w-100 my-4" alt="blog" />
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsum
                reiciendis facere dolorum laudantium temporibus ad amet quisquam
                distinctio aspernatur sunt perspiciatis omnis recusandae magni
                eligendi dolores saepe, eaque tempore neque!
              </p>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default SingleBlog;
