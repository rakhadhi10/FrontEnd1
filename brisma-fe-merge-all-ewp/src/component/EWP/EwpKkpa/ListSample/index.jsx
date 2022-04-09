import { Checkbox, Table } from "antd";
import React from "react";
import "./style.css"
const ListSample = ({ data, id, type, date, onSelect, columns }) => {

    const [selected, setSelected] = React.useState("")



    const onRowSelected = (record, rowIndex) => {
        return {
            onClick: event => {
                setSelected(record.id_sample)
                onSelect(record)
            },

        };
    }

    return (
        <div className="mb-10 gap-4">
            <p className="font-mulish text-gray-600 italic">{type + " " + id + " " + date}</p>
            <Table
                bordered={false}
                rowClassName={(record) => record.id_sample === selected ? "bg-blue-200 cursor-pointer" : "cursor-pointer"}
                onRow={onRowSelected}
                columns={columns} dataSource={data} pagination={false} bordered />
        </div>
    );
};

export default ListSample
