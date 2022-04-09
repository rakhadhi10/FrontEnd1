import React from "react";
import { Card, Divider } from "antd";

export const CardUnresolvedTickets = () => {
  return (
    <Card
      className="flex flex-col justify-start border-secondary-gray "
      style={{ overflow: "hidden", borderRadius: "10px", width: "49%" }}
    >
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-col justify-start text-secondary-light-black font-mulish text-left ">
          <p className="text-lg font-bold ">Unresolved tickets</p>
          <span className="text-xs flex flex-row">
            <p className="font-light">Group: </p>
            <p className="font-semibold"> Support</p>
          </span>
        </div>
        <p
          className="cursor-pointer text-sm text-primary-blue hover:text-blue-900 font-mulish font-semibold"
        >
          View details
        </p>
      </div>
      <div className="flex flex-row justify-between items-center text-secondary-light-black mt-10">
        <p className="font-mulish text-sm font-semibold">Waiting on Feature Request</p>
        <p className="font-mulish text-sm font-light">4238</p>
      </div>
      <Divider className="bg-secondary-gray" style={{ marginBlock: "20px" }} />
      <div className="flex flex-row justify-between items-center text-secondary-light-black ">
        <p className="font-mulish text-sm font-semibold">Awaiting Customer Response</p>
        <p className="font-mulish text-sm font-light">1005</p>
      </div>
      <Divider className="bg-secondary-gray" style={{ marginBlock: "20px" }} />
      <div className="flex flex-row justify-between items-center text-secondary-light-black ">
        <p className="font-mulish text-sm font-semibold">Awaiting Developer Fix</p>
        <p className="font-mulish text-sm font-light">914</p>
      </div>
      <Divider className="bg-secondary-gray" style={{ marginBlock: "20px" }} />
      <div className="flex flex-row justify-between items-center text-secondary-light-black ">
        <p className="font-mulish text-sm font-semibold">Pending</p>
        <p className="font-mulish text-sm font-light">2018</p>
      </div>
    </Card>
  );
};
