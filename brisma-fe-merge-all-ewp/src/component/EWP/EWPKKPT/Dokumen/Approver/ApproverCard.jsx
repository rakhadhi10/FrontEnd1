import React from "react";
import { Collapse } from "antd";
import ApproverStatus from "./ApprovalStatusPill";
import moment from "moment"
import { CheckCircleOutlined, CheckOutlined } from "@ant-design/icons";

const { Panel } = Collapse;

const approverData = [
  {
    pn: "2134",
    nama: "Santoso",
    status: "Approved",
    jabatan: "Ketua Tim Audit",
  },
  {
    pn: "2174",
    nama: "Sutarto",
    status: "",
    jabatan: "Manager Audit",
  },
];


export const ApproverCard = ({ dataAuditor, dataLog = [] }) => {

  return (
    <div className="border border-primary-blue  rounded-xl">
      <div className="header border-b border-primary-blue px-5 py-2 flex justify-between">
        <p className="text-primary-blue font-bold">Approver KKPT</p>
        <CheckCircleOutlined className="text-primary-blue" />
      </div>
      <div className="content px-5">
        <div className="mt-3">
          <div className="flex flex-row gap-2  text-base">
            <p className="font-bold">Ketua Tim Audit</p>
            <p>{dataAuditor && dataAuditor.kta.pn}</p>
            <span> - </span>
            <p>{dataAuditor && dataAuditor.kta.nama}</p>
            <span className="font-extrabold">[</span>
            <CheckOutlined className="text-primary-green mt-1" />
            <span className="font-extrabold">]</span>
          </div>
        </div>
        <div className="mt-2">
          <div className="flex flex-row gap-2  text-base">
            <p className="font-bold">Manajer Audit</p>
            <p>{dataAuditor && dataAuditor.ma.pn}</p>
            <span> - </span>
            <p>{dataAuditor && dataAuditor.ma.nama}</p>
            <span className="font-extrabold">[</span>
            <span className="font-extrabold">]</span>
          </div>
        </div>
        <div className="mt-2">
          <p className="underline text-primary-blue mb-1">Reason Approval</p>
          <div className="bg-white py-2 px-2 h-44 overflow-x-scroll">

            {
              dataLog.map((v, k) => {
                return (
                  <div className="flex flex-row justify-between mb-2">
                    <div>
                      <div className="inline-block pr-1 text-black">({v.from.posisi})</div>
                      <div className="inline-block pr-1 text-black">({v.from.pn})</div>
                      <div className="inline-block pr-1 text-black">-</div>
                      <div className="inline-block pr-1 text-black">{v.from.name}</div>
                      <div className="inline-block pr-1">
                        {
                          v.is_approved ? <ApproverStatus status={"Approved"} /> : <ApproverStatus status={"Rejected"} />
                        }
                      </div>
                      <div className="flex flex-col mt-1 text-xs text-primary-gray truncate">
                        {v.note}
                      </div>
                    </div>
                    <div className="text-xs text-primary-gray"> {moment(v.created_at).format('LLL')}</div>
                  </div>
                )
              })
            }

          </div>
        </div>
      </div>
    </div>
  );
};
