import React from "react";
import { Collapse } from "antd";

const { Panel } = Collapse;

export const DaftarIsi = ({ databab, setContent }) => {

  const contentData = (type) => {
    setContent(type)
  }

  return (
    <div className="border border-primary-blue font-mulish rounded-lg h-auto">
      <Collapse defaultActiveKey={["1"]} expandIconPosition="right" bordered ghost>
        <Panel
          header={<span className="font-semibold text-primary-blue">Approver AIW</span>}
          key={1}
        >
          {
            databab.map((value, key) => {
              return (
                <div key={key}>
                  <button onClick={() => contentData(value.nama)} className="hover:bg-blue-300 underline cursor-pointer">{value.nomor}. {value.nama}</button>
                  {
                    value.children_bab.map((valChildren, keyChildren) => (
                      <div>
                        <button onClick={() => contentData(valChildren.nama)} className="hover:bg-blue-300 underline cursor-pointer pl-5">{valChildren.nomor} {valChildren.nama}</button>
                      </div>
                    ))
                  }
                </div>
              )
            })
          }

        </Panel>
      </Collapse>
    </div>
  );
};
