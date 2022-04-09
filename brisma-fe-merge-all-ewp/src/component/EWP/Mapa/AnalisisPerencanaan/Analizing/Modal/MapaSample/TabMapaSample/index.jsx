import { Tabs } from "antd";
import React from "react";
import CSVMapaSample from "./CSVMapaSample";
import FileMapaSample from "./FileMapaSample";
import FRDMapaSample from "./FRDMapaSample";
import MonberMapaSample from "./MonberMapaSample";

export const TabMapaSample = ({ mcrKode }) => {
  return (
    <Tabs type="card">
      <Tabs.TabPane tab="CSV" key={1}>
        <div className="border border-primary-blue rounded-lg p-6">
          <CSVMapaSample mcr_id={mcrKode} />
        </div>
      </Tabs.TabPane>
      <Tabs.TabPane tab="File" key={2}>
        <div className="border border-primary-blue rounded-lg p-6">
          <FileMapaSample mcr_id={mcrKode} />
        </div>
      </Tabs.TabPane>
      <Tabs.TabPane tab="Monber" key={3}>
        <div className="border border-primary-blue rounded-lg p-6">
          <MonberMapaSample mcr_id={mcrKode} />
        </div>
      </Tabs.TabPane>
      <Tabs.TabPane tab="FRD" key={4}>
        <div className="border border-primary-blue rounded-lg p-6">
          <FRDMapaSample mcr_id={mcrKode} />
        </div>
      </Tabs.TabPane>
    </Tabs>
  );
};
