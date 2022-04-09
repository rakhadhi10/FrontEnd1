import React from "react";
import { Card } from "antd";
import { ChartTodaysTrend } from "./ChartTodaysTrend";

const stylegrid = {
  height: "100px",
  width: "30%",
};

const SubCard = ({ title, value }) => {
  return (
    <div className="flex flex-col items-center justify-between font-mulish text-center">
      <p className="text-primary-gray text-base ">{title}</p>
      <p className="text-secondary-light-black text-2xl font-bold">{value}</p>
    </div>
  );
};

export const CardTodaysTrend = () => {
  return (
    <Card
      className="flex flex-col justify-start border-secondary-gray "
      style={{ overflow: "hidden", borderRadius: "10px", width: "100%" }}
    >
      <Card.Grid hoverable={false} style={{ width: "70%", height: "500px" }}>
        <p className="text-lg font-bold font-mulish">Today's Trend</p>
        <ChartTodaysTrend />
      </Card.Grid>
      <Card.Grid hoverable={false} style={stylegrid}>
        <SubCard title="Resolved" value="449" />
      </Card.Grid>
      <Card.Grid hoverable={false} style={stylegrid}>
        <SubCard title="Received" value="426" />
      </Card.Grid>
      <Card.Grid hoverable={false} style={stylegrid}>
        <SubCard title="Average first response time" value="33m" />
      </Card.Grid>
      <Card.Grid hoverable={false} style={stylegrid}>
        <SubCard title="Average response time" value="3h 8m" />
      </Card.Grid>
      <Card.Grid hoverable={false} style={stylegrid}>
        <SubCard title="Resolution within SLA" value="94%" />
      </Card.Grid>
    </Card>
  );
};
