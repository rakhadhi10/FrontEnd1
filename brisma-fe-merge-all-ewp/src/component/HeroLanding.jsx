import React from "react";
import Button from "./Button";

const HeroLanding = () => {
  return (
    <div className="w-full flex flex-col lg:flex-row items-center px-36 pt-40 pb-24 bg-primary-blue bg-opacity-5">
      <div className="lg:w-5/12 w-full flex flex-col justify-center items-start">
        <h1 className="font-mulish font-bold text-light-black flex-wrap text-center lg:text-left text-4xl">
          BRI Sistem Manajemen Audit
        </h1>
        <p className="font-mulish font-normal text-secondary-light-black flex-wrap text-center lg:text-left text-base py-10">
          Et has minim elitr intellegat. Mea aeterno eleifend antiopam ad, nam no suscipit
          quaerendum. At nam minimum ponderum. Est audiam animal molestiae te. Ex duo eripuit
          mentitum.
        </p>
        <Button className="py-3 text-sm">Start Yours!</Button>
      </div>
      <div className="lg:w-1/12"></div>
      <div className="lg:w-6/12 w-full">
        <img src="/desktop.png" alt="Desktop" className="w-auto h-auto" />
      </div>
    </div>
  );
};

export default HeroLanding;
