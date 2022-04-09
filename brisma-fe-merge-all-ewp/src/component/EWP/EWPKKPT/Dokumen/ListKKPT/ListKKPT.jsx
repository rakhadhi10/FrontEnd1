import { Button } from "antd";
import React from "react";
import TreeKKPT from "./TreeKKPT";

export const ListKKPT = ({ listData = [] }) => {
  return (
    <div className="border border-primary-blue rounded-lg py-4">
      <div className="flex justify-between items-center">
        <p className="text-primary-blue font-bold font-mulish">List KKPT</p>
        <Button type="link" className="text-secondary-yellow">
          Filter
        </Button>
      </div>
      <div className="my-4 bg-white rounded-lg font-mulish p-3">
        <p className="text-secondary-yellow">Filtered By</p>
        <li>Uker KC A</li>
        <li>Aktivitas Pengkreditan</li>
        <li>SubMajor AKD1</li>
      </div>
      <TreeKKPT data={listData} />
    </div>
  );
};
