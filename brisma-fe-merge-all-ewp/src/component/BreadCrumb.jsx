import React from "react";
import { Breadcrumb } from "antd";

export const BreadCrumb = () => {
  return (
    <Breadcrumb separator=">>" className="pb-5">
      <Breadcrumb.Item>
        <a href="/" className="font-mulish text-primary-blue text-base font-bold">
          BRISMA
        </a>
      </Breadcrumb.Item>
      <Breadcrumb.Item>
        <a href="/dashboard" className="font-mulish text-secondary-light-black text-sm">
          Dashboard
        </a>
      </Breadcrumb.Item>
    </Breadcrumb>
  );
};
