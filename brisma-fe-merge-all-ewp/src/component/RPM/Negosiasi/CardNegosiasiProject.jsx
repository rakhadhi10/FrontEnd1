import React from "react";
import { Card, Button } from "antd";
import { useNavigate } from "react-router";

const Status = ({ colorClass }) => {
  return (
    <div className="flex items-center gap-2">
      <div className={`w-2 h-2 rounded-full ${colorClass}`} />
    </div>
  );
};

export const CardNegosiasiProject = ({ title, link, img, status, deskripsi }) => {
  let navigate = useNavigate();

  function handleOnClick(e) {
    e.preventDefault();
    navigate(link);
  }

  return (
    <Card style={{ overflow: "hidden", borderRadius: "10px", borderColor: "#3C64B1" }}>
      <Button
        type="default"
        onClick={handleOnClick}
        style={{ borderColor: "#3C64B1" }}
        className="text-primary-blue font-mulish font-bold"
      >
        {title}
      </Button>
      <p className="my-5">{deskripsi}</p>
      <div className="flex flex-row justify-between items-end">
        <Status colorClass={status === "filled" ? "bg-primary-green" : "bg-primary-red"} />
        <img src={img} alt={deskripsi} />
      </div>
    </Card>
  );
};
