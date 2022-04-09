import moment from "moment";
import { Button, Table } from 'antd';

const { Column } = Table;

export default function TableDocumentHistory(props) {
  const { data } = props
  const PAT_URL = process.env.REACT_APP_PAT_URL

  return (
    <Table dataSource={data} pagination={false} size="small">
      <Column
        title="No"
        dataIndex="no"
        key="no"
        align="center"
        width="5%"
        render={(a, b, idx) => idx + 1}
      />
      <Column
        title="Dokumen"
        dataIndex="dokumen"
        key="dokumen"
        align="center"
        width="40%"
      />
      <Column
        title="Tanggal"
        dataIndex="tanggal_document"
        key="tanggal_document"
        align="center"
        render={(val) => moment(val).format("DD MMMM YYYY")}
      />
      <Column
        title="Adendum"
        dataIndex="adendum_no"
        key="adendum_no"
        align="center"
        render={(val) => `Ke-${val}`}
      />
      <Column
        title="Lampiran"
        dataIndex="nama_lampiran"
        key="nama_lampiran"
        align="center"
      />
      <Column
        title="Action"
        dataIndex="action"
        key="action"
        align="center"
        width="15%"
        render={(_, rec) => (
          <div className="flex justify-center gap-2">
            <Button type="primary" size="small" href="google.com">
              <a href={`${PAT_URL}/document/review?document_id=${rec.id}`} target="_blank" rel="noreferrer">
                Preview
              </a>
            </Button>
            <Button type="primary" size="small">
              <a href={`${PAT_URL}/document/download?document_id=${rec.id}`} target="_blank" rel="noreferrer">
                Download
              </a>
            </Button>
          </div>
        )}
      />
    </Table>
  )
}