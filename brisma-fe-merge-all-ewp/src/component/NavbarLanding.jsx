import React from "react";
import { useState } from "react";
import Button from "./Button";
import { Link as LinkS } from "react-scroll";
import { Link as LinkR } from "react-router-dom";

const NavbarLanding = () => {
  const [changeBG, setChangeBG] = useState(false);
  React.useEffect(() => {
    const colorChange = () => {
      if (window.scrollY >= 80) {
        setChangeBG(true);
      } else {
        setChangeBG(false);
      }
    };
    window.addEventListener("scroll", colorChange);
  });
  return (
    <nav
      className={
        (changeBG ? " fixed bg-white" : " fixed bg-transparent") +
        " w-full flex justify-between place-items-center px-36 py-3 z-10"
      }
    >
      <a href="/" className="font-lato font-bold text-primary-blue text-2xl">
        LOGO
      </a>
      <div className="flex">
        <LinkS to="home" spy={true} smooth={true} duration={500}>
          <p className="font-mulish text-base focus:text-primary-blue text-black font-semibold px-8 hover:text-primary-blue ">
            Home
          </p>
        </LinkS>
        <LinkS to="blog" spy={true} smooth={true} duration={500}>
          <p className="font-mulish text-base focus:text-primary-blue text-black font-semibold px-8 hover:text-primary-blue ">
            Blogs
          </p>
        </LinkS>
        <LinkS to="news" spy={true} smooth={true} duration={500}>
          <p className="font-mulish text-base focus:text-primary-blue text-black font-semibold px-8 hover:text-primary-blue ">
            News
          </p>
        </LinkS>
      </div>
      <LinkR to="/login">
        <Button size="small" className="py-2 px-5 outline-none">
          Log In
        </Button>
      </LinkR>
    </nav>
  );
};

export default NavbarLanding;
