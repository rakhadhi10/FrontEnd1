import { Radio, Tag } from "antd";
import React from "react";

export const RadioSkor = ({ dataSkor = [], skor, onChange }) => {
  return (
    <div className="flex justify-between">
      <Radio.Group onChange={onChange} value={skor}>
        {
          dataSkor.map((v, k) => {
            return (
              <Radio value={`${v.kode_sample}-${v.kode}`}>
                <Tag color={skor === v.kode_sample + "-" + v.kode ? v.color : null} className="text-center">
                  {v.nama}
                </Tag>
              </Radio>
            )
          })
        }
      </Radio.Group>
    </div>
  );
};
