import React from "react";
import { Card } from "antd";

export const CardDasboard = ({ title, children }) => {
  return (
    <Card
      className="my-4  justify-center items-center flex flex-col hover:border-primary-blue hover:text-primary-blue text-secondary-light-black  border-secondary-gray"
      style={{ overflow: "hidden", borderRadius: "15px", width: "230px", height: "134px" }}
      hoverable
    >
      <div>
        <p className="font-mulish font-bold text-lg  text-center">{title}</p>
        <p className="font-mulish font-bold text-5xl  text-center">{children}</p>
      </div>
    </Card>
  );
};
