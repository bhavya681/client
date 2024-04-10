import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const getAllCategories = async () => {
    try {
      const res = await fetch(
        "http://localhost:8080/api/v1/category/get-category",
        {
          method: "GET",
          header: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      setCategories(data.categories);
    } catch (error) {
      toast.error(error);
    }
  };
  useEffect(() => {
    getAllCategories();
  }, []);
  return (
    <>
    <div className="conatiner flex justify-center">
      <div className="row ">
        {categories.map((c) => (
          <>
            <div className="col-md-6 mt-5 mb-3 gx-3 gy-3 " key={c._id}>
              <Link
                className="btn btn-primary text-light"
                to={`/category/${c.slug}`}
              >
                {c.name}
              </Link>
            </div>
          </>
        ))}
      </div>
    </div>
    </>
  );
};

export default Categories;
