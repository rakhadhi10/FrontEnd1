import React from "react";

const ContentAboutLanding = () => {
  return (
    <div className="w-full flex flex-row bg-primary-blue bg-opacity-5 py-20 px-36">
      <div className="lg:w-1/2 w-full flex-col items-start ">
        <h1 className="font-mulish font-bold text-secondary-light-black flex-wrap text-left text-4xl pb-10">
          About SKAI
        </h1>
        <p className="font-mulish font-normal text-secondary-light-black flex-wrap text-base text-left">
          Et has minim elitr intellegat. Mea aeterno eleifend antiopam ad, nam no suscipit
          quaerendum. At nam minimum ponderum. Est audiam animal molestiae te. Ex duo eripuit
          mentitum. Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots
          in a piece of classical Latin literature from 45 BC, making it over 2000 years old.
          Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one
          of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going
          through the cites of the word in classical literature, discovered the undoubtable source.
          Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum"
          (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on
          the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum,
          "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.{" "}
          <a href="/" className="text-blue-600 font-mulish font-normal text-base">
            read more
          </a>
        </p>
      </div>
      <div className="w-full lg:w-1/2 items-center justify-center flex ">
        <img src="/5 nilai audit BRI 1.png" alt="Lima nilai audit BRI" className="w-auto h-auto flex" />
      </div>
    </div>
  );
};

export default ContentAboutLanding;
