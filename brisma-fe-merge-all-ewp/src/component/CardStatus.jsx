import React from "react";
import { Card } from "antd";

export const CardStatus = ({ title, children, type }) => {
    const renderBorderColor = (cardType) => {
        switch (cardType) {
            case "primary":
              return "border-primary-blue";
            case "success":
              return "border-secondary-green";
            case "warning":
              return "border-secondary-yellow";
            case "danger":
              return "border-red-500";
            default:
                return "border-secondary-gray";
          }
    }
  return (
    <Card
      className={`my-4  justify-center items-center flex flex-col hover:border-primary-blue hover:text-primary-blue text-secondary-light-black ${renderBorderColor(type)}`}
      style={{ overflow: "hidden", borderRadius: "15px", width: "230px", height: "134px" }}
      hoverable
    >
      <div>
        <p className="font-mulish font-bold text-lg  text-center text-gray-400">{title}</p>
        <p className="font-mulish font-bold text-5xl  text-center">{children}</p>
      </div>
    </Card>
  );
};
