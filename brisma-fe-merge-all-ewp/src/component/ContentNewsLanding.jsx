import React from "react";
import CardNewsLanding from "./CardNewsLanding";

const ContentNewsLanding = () => {
  return (
    <div className="bg-white flex-col flex w-full py-20 px-36">
      <div className="flex-row flex justify-between pb-10">
        <h1 className="font-mulish font-bold text-secondary-light-black flex-wrap text-left text-4xl ">
          Hot News
        </h1>
        <a
          href="/"
          className="font-mulish text-base font-normal text-blue-600 underline hover:text-blue-800"
        >
          see all
        </a>
      </div>
      <div className="w-full flex flex-row flex-wrap">
        <CardNewsLanding />
        <CardNewsLanding />
        <CardNewsLanding />
        <CardNewsLanding />
        <CardNewsLanding />
        <CardNewsLanding />
        <CardNewsLanding />
        <CardNewsLanding />
      </div>
    </div>
  );
};

export default ContentNewsLanding;
