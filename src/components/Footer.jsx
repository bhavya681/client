import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <div className="bg-[#131A22] p-2 shadow-2xl rounded-lg relative bottom-0">
        <h1 className="p-2 my-2 mx-[44%] text-[2rem] transition-all ease-in-out hover:ml-20 hover:animate-ping text-white">
          <span className="font-mono">CyberMart🛒</span>
          </h1>
        <div className="grid grid-cols-5  py-4 items-center ml-[26%]">
          <Link className="text-white" to={"/about"}>
            About
            <br />
            <span className="text-[#959999]">About</span>
          </Link>
          <Link className="text-white" to={"/contact"}>
            Contact
            <br />
            <span className="text-[#959999]">Contact</span>
          </Link>
          <Link className="text-white" to={"/help"}>
            Help
            <br />
            <span className="text-[#959999]">Help</span>
          </Link>
          <Link className="text-white" to={"/service"}>
            Service
            <br />
            <span className="text-[#959999]">Service</span>
          </Link>
        </div>
        <p className="text-[#FFFFFF] text-xl text-center py-2 font-mono my-6">
          Conditions of Use & Sale Privacy Notice Interest-Based Ads ©
          1996-2024, CyberCart.com, Inc. or its affiliates
        </p>
      </div>
    </>
  );
};

export default Footer;
