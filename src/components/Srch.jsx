import React, { useContext } from "react";
import { SearchContext } from "../context/Search";

const Srch = () => {
  const { results } = useContext(SearchContext);

  return (
    <>
      <div className="container mt-5">
        <div className="text-center">
          <h1 className="display-4 mb-4">Search Results</h1>
          <div className="d-flex justify-content-center mb-3">
            {results.results.length > 0 ? (
              <>
                <p className="text-4xl font-semibold font-mono p-3 m-1">
                  Total Products Found :{results.results.length}
                </p>
              </>
            ) : (
              <>
                <p>No Products are Found</p>
              </>
            )}
          </div>

          <div className="flex rounded-2xl m-4 space-x-6 justify-center ">
            {results.results.map((product) => (
              <>
                <div className="m-3 flex-col justify-center w-[14rem]  shadow-lg bg-gray-300 rounded-lg p-2">
                  <h1 className="text-2xl font-mono font-semibold p-1">
                    {product.name}
                  </h1>
                  <img
                    className="p-3 w-[262px] h-[195px] rounded-[50%] transition-all ease-in-out hover:animate-bounce cursor-pointer"
                    src={`http://localhost:8080/api/v1/product/product-photo/${product._id}`}
                    alt={product.name}
                  />
                  <h3 className="text-lg font-serif font-semibold ">
                    {product.description.slice(0, 80)}...
                  </h3>
                  <p className="font-bold text-xl p-1 text-green-800 ">${product.price}</p>
                  <p className="text-xl font-sans p-1 font-bold">Qty:{product.quantity}</p>
                </div>
              </>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Srch;
