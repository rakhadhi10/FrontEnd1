import React from "react";
import CardNilaiLanding from "./CardNilaiLanding";

const ContentNilaiLanding = () => {
  return (
    <div className="w-full  flex flex-col flex-wrap bg-white pt-28 pb-16 px-36 items-center">
      <h1 className="font-mulish font-bold text-3xl text-secondary-light-black ">
        5 Nilai Audit BRI
      </h1>
      <div className="w-full flex-col lg:flex-row flex justify-center flex-wrap pt-16">
        <CardNilaiLanding
          src="/integrity.png"
          desc="Eos tota dicunt democritum no. Has natum gubergren ne. Est viris soleat sadipscing cu. Legere epicuri insolens eu nec, dicit virtute urbanitas id nam, qui in habeo semper eligendi."
          title="Integrity"
        />
        <CardNilaiLanding
          src="/objectivity.png"
          desc="Eos tota dicunt democritum no. Has natum gubergren ne. Est viris soleat sadipscing cu. Legere epicuri insolens eu nec, dicit virtute urbanitas id nam, qui in habeo semper eligendi."
          title="Objectivity"
        />
        <CardNilaiLanding
          src="/competency.png"
          desc="Eos tota dicunt democritum no. Has natum gubergren ne. Est viris soleat sadipscing cu. Legere epicuri insolens eu nec, dicit virtute urbanitas id nam, qui in habeo semper eligendi."
          title="Competency"
        />
        <CardNilaiLanding
          src="/confidentiality.png"
          desc="Eos tota dicunt democritum no. Has natum gubergren ne. Est viris soleat sadipscing cu. Legere epicuri insolens eu nec, dicit virtute urbanitas id nam, qui in habeo semper eligendi."
          title="Confidentiality"
        />
        <CardNilaiLanding
          src="/agility.png"
          desc="Eos tota dicunt democritum no. Has natum gubergren ne. Est viris soleat sadipscing cu. Legere epicuri insolens eu nec, dicit virtute urbanitas id nam, qui in habeo semper eligendi."
          title="Agility"
        />
      </div>
    </div>
  );
};

export default ContentNilaiLanding;
