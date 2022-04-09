import { Tag } from "antd";
import React from "react";

export const SkorDampak = ({ skor, data }) => {

  return (
    <div className="flex justify-between">
      {
        data.map((val, k) => {
          return (
            <Tag
              key={k}
              color={skor === val.kode ? val.color : null}
              style={{ width: "120px" }}
              className="text-center"
            >
              {val.nama}
            </Tag>
          )
        })
      }
    </div>
  );
};
