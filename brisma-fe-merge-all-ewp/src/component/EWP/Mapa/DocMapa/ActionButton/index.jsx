import React from "react";
import KTAActionButton from "./KTAActionButton";
import MAActionButton from "./MAActionButton";

export const ActionButton = ({ status }) => {
  console.log(status);
  const content = () => {
    switch (status) {
      case "on KTA":
        return <KTAActionButton />;
      case "on MA":
        return <MAActionButton />;
      case "on KAI":
        return <MAActionButton />;
      default:
        return;
    }
  };

  return content();
};
