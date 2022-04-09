import React, { useEffect, useState } from "react";
import { Divider, Tag, Radio, Button, Input } from "antd";

const { TextArea } = Input;

export const AdjustmentKategoriTemuan = ({ loadingUpdate, onSaveAdjustment, dataDampak, dataLikeLihood, allDataKategori }) => {
  const [dampak, setdampak] = useState("TAN");
  const [likehood, setlikehood] = useState("TAN");
  const [keteranganValue, setKeteranganValue] = useState("")

  useEffect(() => {
    if (allDataKategori !== null) {
      if (allDataKategori.adj_impact_kode !== null && allDataKategori.adj_likelihood_kode !== null) {
        setdampak(allDataKategori.adj_impact_kode)
        setlikehood(allDataKategori.adj_likelihood_kode)
        setKeteranganValue(allDataKategori.adj_alasan)
      }
    }
  }, [allDataKategori])



  const getValueKeterangan = (value) => {
    setKeteranganValue(value)
  }

  const handleDampakOnChange = (tag, value) => {
    console.log(tag)
    console.log(value)

    if (tag === "dampak") {
      setdampak(value);
    } else {
      setlikehood(value)
    }
  };


  const onSaveAdj = () => {

    const dataTemp = {
      "adj_impact_kode": dampak,
      "adj_likelihood_kode": likehood,
      "adj_alasan": keteranganValue
    }

    onSaveAdjustment(dataTemp)
  }


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
    <div className="text-red-600 font-mulish  ">
      <div className="flex">
        <p className="w-3/12">Skor Dampak</p>
        <SkorTag skor={dampak} dataTag={dataDampak} onChange={(e) => handleDampakOnChange("dampak", e.target.value)} className="w-9/12" />
      </div>
      <div className="flex mt-3">
        <p className=" w-3/12">Skor Likehood</p>
        <SkorTag skor={likehood} dataTag={dataLikeLihood} onChange={(e) => handleDampakOnChange("likelihood", e.target.value)} className="w-9/12" />
      </div>

      <Divider dashed className="border border-red-600" />
      <div className="flex">
        <p className=" w-3/12">Kategori Temuan</p>
        <Tag color="red" className="text-2xl text-center pb-1">
          {allDataKategori !== null ? allDataKategori.adj_kategori_temuan_name : ""}
        </Tag>
      </div>
      <div className="flex my-4">
        <p className=" w-3/12">Kategori Temuan</p>
        <textarea value={keteranganValue} onChange={(e) => getValueKeterangan(e.target.value)} rows={4} className="w-10/12 border border-blue-400 px-3 outline-none" />
      </div>
      <div className="flex justify-end py-4">
        <Button loading={loadingUpdate} onClick={() => onSaveAdj()} type="primary" danger>
          Save Adjustment
        </Button>
      </div>
    </div>
  );
};
