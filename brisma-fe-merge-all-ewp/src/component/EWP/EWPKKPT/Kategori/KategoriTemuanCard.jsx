import { useEffect, useState } from "react";
import { Divider, Tag, Radio, Button, Input } from "antd";

export const KategoriTemuanCard = ({ skorDampak, skorLikehood, dataDampak, dataLikeLihood, allDataKategori }) => {
  const [dampak, setdampak] = useState("TAN");
  const [likehood, setlikehood] = useState("TAN");

  useEffect(() => {
    if (allDataKategori !== null) {
      setdampak(allDataKategori.impact_score_kode)
      setlikehood(allDataKategori.likelihood_score_kode)
    }

  }, [allDataKategori])


  const handleDampakOnChange = (e) => {
    setdampak(e.target.value);
  };
  const handleLikehoodOnChange = (e) => {
    setlikehood(e.target.value);
  };

  const SkorTag = ({ skor, onChange, dataTag = [] }) => {
    return (
      <div className="flex justify-between">
        <Radio.Group onChange={onChange} value={skor}>
          {
            dataTag.map((valueTag, key) => {
              return (
                <Radio key={key} value={valueTag.kode}>
                  <Tag color={skor === valueTag.kode ? valueTag.color : ""} className="text-center">
                    {valueTag.nama}
                  </Tag>
                </Radio>
              )
            })
          }
        </Radio.Group>
      </div>
    );
  };

  return (
    <div>
      <div className="flex">
        <p className="text-primary-blue font-mulish  w-3/12">Skor Dampak</p>
        <SkorTag skor={dampak} dataTag={dataDampak} onChange={handleDampakOnChange} className="w-9/12" />
      </div>
      <div className="flex mt-3">
        <p className="text-primary-blue font-mulish  w-3/12">Skor Likehood</p>
        <SkorTag skor={likehood} dataTag={dataLikeLihood} onChange={handleLikehoodOnChange} className="w-9/12" />
      </div>

      <Divider dashed className="border border-primary-blue" />
      <div className="flex">
        <p className="text-primary-blue font-mulish w-3/12">Kategori Temuan</p>
        <Tag color="red" className="text-2xl text-center pb-1">
          {allDataKategori !== null ? allDataKategori.kategori_temuan_name : ""}
        </Tag>
      </div>
    </div>
  );
};
