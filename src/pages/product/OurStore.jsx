import React, { useState } from "react";
import BreadCrumb from "../../components/BreadCrumb";
import Meta from "../../components/Meta";
import ReactStars from "react-rating-stars-component";
import ProductCard from "../../components/ProductCard";
import Color from "../../components/Color";
import Container from "../../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { getAllProduct } from "../../features/products/productSlice";
import { useEffect } from "react";

const OurStore = () => {
  const [grid, setGrid] = useState(4);

  const productState = useSelector((state) => state?.product?.products);
  // console.log(productState);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);

  //filter state
  const [category, setCategory] = useState(null);
  const [tag, setTag] = useState(null);
  const [brand, setBrand] = useState(null);
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);
  const [sort, setSort] = useState(null);
  console.log(sort);

  useEffect(() => {
    let newBrands = [];
    let newCategories = [];
    let newTags = [];
    for (let index = 0; index < productState?.length; index++) {
      const element = productState[index];
      newBrands.push(element?.brand);
      newCategories.push(element?.category);
      newTags.push(element?.tags);
    }
    setBrands(newBrands);
    setCategories(newCategories);
    setTags(newTags);
  }, [productState]);

  const dispatch = useDispatch();
  useEffect(() => {
    getProducts();
  }, [sort, tag, brand, category, minPrice, maxPrice]);
  const getProducts = () => {
    dispatch(getAllProduct({ sort, tag, brand, category, minPrice, maxPrice }));
  };
  const [noOfElements, setNoOfElements] = useState(6);
  const loadMore = () => {
    setNoOfElements(noOfElements + noOfElements);
  };

  return (
    <>
      <Meta title={"Our Store"} />
      <BreadCrumb title="Sản phẩm" />
      <Container class1="store-wrapper home-wrapper-2 py-5 ">
        <div className="row">
          <div className="col-3">
            <div className="filter-card mb-3">
              <h3 className="filter-title">Danh mục sản phẩm</h3>
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
                </ul>
              </div>
            </div>
            <div className="filter-card mb-3">
              <h3 className="filter-title">Lọc theo</h3>
              <div>
                <h5 className="sub-title">Giá</h5>
                <div className="d-flex align-items-center gap-10">
                  <div className="form-floating">
                    <input
                      type="number"
                      className="form-control"
                      id="floatingInput"
                      placeholder="Từ"
                      onChange={(e) => setMinPrice(e.target.value)}
                    />
                    <label htmlFor="floatingInput">Từ</label>
                  </div>
                  <div className="form-floating">
                    <input
                      type="number"
                      className="form-control"
                      id="floatingInput1"
                      placeholder="Đến"
                      onChange={(e) => setMaxPrice(e.target.value)}
                    />
                    <label htmlFor="floatingInput1">Đến</label>
                  </div>
                </div>
              </div>
              <div className=" my-4">
                <h3 className="sub-title">Loại</h3>
                <div>
                  <div className="product-tags d-flex flex-wrap align-items-center gap-10">
                    {tags &&
                      [...new Set(tags)]?.map((item, index) => {
                        return (
                          <span
                            key={index}
                            onClick={() => setTag(item)}
                            className="text-capitalize badge badge-1 bg-light text-secondary rounded-3 py-2 px-3 "
                          >
                            {item}
                          </span>
                        );
                      })}
                  </div>
                </div>
              </div>
              <div className=" my-4">
                <h3 className="sub-title">Thương hiệu</h3>
                <div>
                  <div className="product-tags d-flex flex-wrap align-items-center gap-10">
                    {brands &&
                      [...new Set(brands)]?.map((item, index) => {
                        return (
                          <span
                            key={index}
                            onClick={() => setBrand(item)}
                            className="text-capitalize badge badge-1 bg-light text-secondary rounded-3 py-2 px-3 "
                          >
                            {item}
                          </span>
                        );
                      })}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-9">
            <div className="filter-sort-grid mb-4">
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center gap-10">
                  <p className="mb-0 d-block">Sắp xếp theo: </p>
                  <select
                    name=""
                    defaultValue={"manual"}
                    className="form-control form-select"
                    id=""
                    onChange={(e) => setSort(e.target.value)}
                  >
                    <option value="-title">Tên_A-Z</option>
                    <option value="title">Tên_Z-A</option>
                    <option value="price">Giá_Thấp-Cao</option>
                    <option value="-price">Giá_Cao-Thấp</option>
                    <option value="createdAt">Ngày_Cũ-Mới</option>
                    <option value="-createdAt">Ngày_Mới-Cũ</option>
                  </select>
                </div>
                <div className="d-flex align-items-center gap-10">
                  <p className="total-products mb-0" style={{ width: "100px" }}>
                    {productState?.length} sản phẩm
                  </p>
                  <div className="d-flex gap-10 align-items-center grid">
                    <img
                      onClick={() => {
                        setGrid(3);
                      }}
                      src="images/gr4.svg"
                      className="d-block img-fluid"
                      alt="grid"
                    />
                    <img
                      onClick={() => {
                        setGrid(4);
                      }}
                      src="images/gr3.svg"
                      className="d-block img-fluid"
                      alt="grid"
                    />
                    <img
                      onClick={() => {
                        setGrid(6);
                      }}
                      src="images/gr2.svg"
                      className="d-block img-fluid"
                      alt="grid"
                    />
                    <img
                      onClick={() => {
                        setGrid(12);
                      }}
                      src="images/gr.svg"
                      className="d-block img-fluid"
                      alt="grid"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="products-list pb-5">
              <div className="d-flex gap-10 flex-wrap">
                <ProductCard
                  data={
                    productState?.slice(0, noOfElements)
                      ? productState?.slice(0, noOfElements)
                      : []
                  }
                  grid={grid}
                />
                <button
                  className="btn btn-primary w-100 mt-4"
                  onClick={() => loadMore()}
                >
                  Xem thêm
                </button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default OurStore;
