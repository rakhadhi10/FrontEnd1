import React from "react";

const CardNilaiLanding = ({ src, title, desc }) => {
  return (
    <div className="w-full lg:w-1/3 justify-between px-6 py-8 flex-col">
      <div className="pb-3 flex justify-center">
        <img src={src} alt={desc} className="w-10 h-10" />
      </div>
      <h1 className="font-mulish text-secondary-light-black text-lg font-bold text-center pb-3">
        {title}
      </h1>
      <p className="font-mulish flex-wrap text-sm font-normal text-center">{desc}</p>
    </div>
  );
};

export default CardNilaiLanding;
