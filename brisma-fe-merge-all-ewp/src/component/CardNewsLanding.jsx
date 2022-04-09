import React from "react";
import Image from "@material-tailwind/react/Image";

const CardNewsLanding = () => {
  return (
    <div className="w-1/4 px-4 py-4">
      <Image src="/image.png" rounded={false} />
      <p className="text-base font-bold font-mulish text-secondary-light-black flex-wrap text-center py-4">
        Ad eos saepe lucilius
      </p>
      <p className="font-mulish font-normal text-sm text-secondary-light-black flex-wrap text-center">
        At eripuit signiferumque sea, vel ad mucius molestie, cu labitur.
      </p>
    </div>
  );
};

export default CardNewsLanding;
