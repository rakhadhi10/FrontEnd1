import { connect } from "react-redux";
import { useMemo } from "react";
import { VList } from "virtuallist-antd";
import { Button, Input, Space, Table } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { getBranchChildren, getBranchChildrenLoading } from "../../../../../../../../../store/ducks/search/selectors";

const { Column } = Table

const mapStateToProps = state => ({
  data: getBranchChildren(state),
  loading: getBranchChildrenLoading(state)
})

const mapDispatchToProps = null

export default connect(mapStateToProps, mapDispatchToProps)(TableEditUnitKerja)

function TableEditUnitKerja({
  loading,
  data,
  rows,
  updateRows,
  ...tableProps
}) {
  const tableData = data.map(item => ({ key: item, kodeNamaBranch: `${item.branch} - ${item.brdesc}` }))

  const vc1 = useMemo(() => {
    return VList({
      height: 1000,
      vid: "first"
    })
  }, [])

  const getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          style={{ marginBottom: 8, display: 'block' }}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => {
            confirm();
          }}
        />
        <Space>
          <Button
            type="primary"
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
            onClick={() => {
              confirm();
            }}
          >
            Search
          </Button>
          <Button
            size="small"
            style={{ width: 90 }}
            onClick={() => {
              clearFilters();
              confirm()
            }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : '',
    render: text => text
  });

  return (
    <Table
      loading={loading}
      scroll={{ y: 300, x: "100%" }}
      rowSelection={{
        selectedRowKeys: rows.map(r => r.branch),
        onChange: (newSelectedRowKeys, selectedRows) => {
          const newRows = []
          newSelectedRowKeys.forEach(r => {
            const alreadyAdded = rows.some(o => o.branch === r)
            if (!alreadyAdded) {
              newRows.push({
                branch: r,
                orgeh: "<Input Orgeh>",
                tipeUker: "",
                years: "",
                temuanFraud: "",
                temuanMajor: "",
                temuanModerate: "",
                deskripsi: "",
                attachments: [],
              })
            }
          })
          updateRows([...rows, ...newRows])
        },
      }}
      components={vc1}
      className="py-8"
      size="small"
      pagination={false}
      dataSource={tableData}
      bordered={false}
      {...tableProps}
    >
      <Column
        title="Kode - Nama Branch"
        dataIndex="kodeNamaBranch"
        key="kodeNamaBranch"
        align="center"
        render={(text, record) => text}
        {...getColumnSearchProps("kodeNamaBranch")}
      />
      {/* <Column
        title="Kode - Nama Orgeh"
        dataIndex="kodeNamaOrgeh"
        key="kodeNamaOrgeh"
        align="center"
        render={(text, record) => text}
      />
      <Column
        title="Tipe Uker"
        dataIndex="tipeUker"
        key="tipeUker"
        align="center"
        render={(text, record) => text}
      />
      <Column
        title="NA"
        dataIndex="NA"
        key="NA"
        align="center"
        render={(text, record) => text}
      />
      <Column
        title="Fraud"
        dataIndex="fraud"
        key="fraud"
        align="center"
        render={(text, record) => text}
      />
      <Column
        title="Major"
        dataIndex="major"
        key="major"
        align="center"
        render={(text, record) => text}
      />
      <Column
        title="Moderate"
        dataIndex="moderate"
        key="moderate"
        align="center"
        render={(text, record) => text}
      /> */}
    </Table>
  );
}