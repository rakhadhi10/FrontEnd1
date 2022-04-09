import { Button, Card, Checkbox, Divider, Input } from "antd";
import React from "react";
import { PlusCircleFilled } from "@ant-design/icons";

const TagTask = ({ tag }) => {
  switch (tag) {
    case "urgent":
      return (
        <p className="bg-primary-yellow text-xs font-mulish font-bold text-white px-3 py-1 rounded-xl">
          Urgent
        </p>
      );
    case "new":
      return (
        <p className="bg-primary-green text-xs font-mulish font-bold text-white px-3 py-1 rounded-xl">
          New
        </p>
      );
    default:
      return (
        <p className="bg-secondary-gray text-xs font-mulish font-bold text-primary-gray px-3 py-1 rounded-xl">
          Default
        </p>
      );
  }
};

export const CardTasksDashboard = () => {
  return (
    <Card
      className="flex flex-col justify-start border-secondary-gray "
      style={{ overflow: "hidden", borderRadius: "10px", width: "49%" }}
    >
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-col justify-start text-secondary-light-black font-mulish text-left ">
          <p className="text-lg font-bold ">Tasks</p>
          <p className="font-light text-xs"> Today</p>
        </div>
        <p
          className="cursor-pointer text-sm text-primary-blue hover:text-blue-900 font-mulish font-semibold"
        >
          View details
        </p>
      </div>
      <div className="mt-8 ">
        <Input.Group compact>
          <Input bordered={false} placeholder="Create new task" style={{ width: "90%" }} />
          <Button icon={<PlusCircleFilled />} style={{ border: "none" }} shape="circle" />
        </Input.Group>
      </div>
      <Divider className="bg-secondary-gray" style={{ marginBlock: "20px" }} />
      <div className="flex flex-row justify-between items-center text-secondary-light-black ">
        <Checkbox
          style={{
            width: "100%",
          }}
          children={<p className="font-mulish text-sm font-semibold">Waiting on Feature Request</p>}
          value="1"
        />
        <TagTask tag="urgent" />
      </div>
      <Divider className="bg-secondary-gray" style={{ marginBlock: "20px" }} />
      <div className="flex flex-row justify-between items-center text-secondary-light-black ">
        <Checkbox
          style={{ width: "100%" }}
          children={<p className="font-mulish text-sm font-semibold">Waiting on Feature Request</p>}
          value="1"
        />
        <TagTask tag="new" />
      </div>
      <Divider className="bg-secondary-gray" style={{ marginBlock: "20px" }} />
      <div className="flex flex-row justify-between items-center text-secondary-light-black ">
        <Checkbox
          style={{ width: "100%" }}
          children={<p className="font-mulish text-sm font-semibold">Waiting on Feature Request</p>}
          value="1"
        />
        <TagTask tag="default" />
      </div>
    </Card>
  );
};
