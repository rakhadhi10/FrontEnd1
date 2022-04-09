import { DatePicker, Table } from "antd";
import React from "react";
import { remapJadwalAuditMapa } from "../../../utils/mapData";
import moment from "moment";
import "moment/locale/id";
import Moment from "react-moment";
import locale from "antd/lib/date-picker/locale/id_ID";

export const TableJadwalAudit = ({ data = [], loading, dateOnChange }) => {
  const columns = [
    {
      key: 1,
      title: "Keterangan",
      dataIndex: "keterangan",
    },
    {
      title: "Planing",
      children: [
        {
          key: 2,
          title: "Start Date",
          dataIndex: "plan_start",
          render: (_, record) => (
            <DatePicker
              value={record.plan_start ? moment(record.plan_start) : ""}
              onChange={(date, dateString) =>
                dateOnChange({ [record.plan_start_key]: dateString })
              }
              format="DD-MMMM-YYYY"
              locale={locale}
              allowClear={false}
            />
          ),
        },
        {
          key: 3,
          title: "End Date",
          dataIndex: "plan_end",
          render: (_, record) => (
            <DatePicker
              value={record.plan_end ? moment(record.plan_end) : ""}
              onChange={(date, dateString) =>
                dateOnChange({ [record.plan_end_key]: dateString })
              }
              format="DD-MMMM-YYYY"
              locale={locale}
              allowClear={false}
            />
          ),
        },
      ],
    },
    {
      title: "Realization",
      children: [
        {
          key: 4,
          title: "Start Date",
          dataIndex: "real_start",
          render: (_, record) =>
            record.real_start && (
              <Moment
                date={record.real_start}
                format="DD-MMMM-YYYY"
                locale="id"
              />
            ),
        },
        {
          key: 5,
          title: "End Date",
          dataIndex: "real_end",
          render: (_, record) =>
            record.real_end && (
              <Moment
                date={record.real_end}
                format="DD-MMMM-YYYY"
                locale="id"
              />
            ),
        },
      ],
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={remapJadwalAuditMapa(data)}
      pagination={false}
      loading={loading}
    />
  );
};
