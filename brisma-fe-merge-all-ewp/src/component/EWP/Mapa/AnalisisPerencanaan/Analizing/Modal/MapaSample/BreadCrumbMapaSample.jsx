import React from "react";

export default function BreadCrumbMapaSample() {
  const data = [];
  return (
    <div className="flex space-x-4 text-gray-600 font-mulish">
      <p>KC Simantupang</p>
      <p>{" ---> "}</p>
      <p>Perkreditan</p>
      <p>{" ---> "}</p>
      <p>Kredit Ritel</p>
      <p>{" ---> "}</p>
      <p>AKD</p>
      <p>{" ---> "}</p>
      <p>AKD01</p>
    </div>
  );
}
