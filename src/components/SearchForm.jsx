import React, { useContext } from "react";
import { SearchContext } from "../context/Search";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const SearchForm = () => {
  const { results, setResults, values, setValues } = useContext(SearchContext);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `http://localhost:8080/api/v1/product/search/${values.keyword}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
    
        setValues({ ...values });
        setResults(data);
        setValues("");
        navigate("/search");
      
    } catch (error) {
      toast.error(error);
    }
  };
  return (
    <>
      <div className="container-fluid m-5">
        <form
          className="d-flex justify-center text-center items-center"
          role="search"
          onSubmit={handleSubmit}
        >
          <input
            className="form-control font-mono me-2 w-80 placeholder:text-lg rounded-xl placeholder:font-semibold"
            type="search"
            placeholder="Search"
            aria-label="Search"
            value={values.keyword}
            onChange={(e) => {
              setValues({ ...values, keyword: e.target.value });
              setResults([...values]);
            }}
          />
          <button
            className="btn btn-outline-success text-md font-bold font-mono rounded-xl"
            type="submit"
          >
            Search
          </button>
        </form>
      </div>
    </>
  );
};

export default SearchForm;
