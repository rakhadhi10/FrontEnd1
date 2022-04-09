import moment from "moment";
import { Button, Table } from 'antd';
import { useParams } from "react-router-dom";
import { useEffect } from "react";

const { Column } = Table;

export default function TableDocumentHistory(props) {
  const { fetchAllDocuments, loading, error, data } = props
  const { id } = useParams()
  const RPM_URL = process.env.REACT_APP_RPM_URL

  useEffect(() => fetchAllDocuments(id), [fetchAllDocuments, id])

  if (error && !loading) return <div className="flex justify-center">{error}</div>

  return (
    <Table
      size="small"
      pagination={false}
      loading={loading}
      dataSource={data}
    >
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
        render={(v) => moment(v).format("DD MMMM YYYY")}
      />
      <Column
        title="Status Negosiasi"
        dataIndex="evaluasi_ke"
        key="evaluasi_ke"
        align="center"
        render={(v) => `Ke-${v}`}
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
            <Button type="primary" size="small">
              <a
                target="_blank"
                rel="noreferrer"
                href={`${RPM_URL}/document/preview?document_id=${rec.id}`}
              >
                Preview
              </a>
            </Button>
            <Button type="primary" size="small">
              <a
                target="_blank"
                rel="noreferrer"
                href={`${RPM_URL}/document/download?document_id=${rec.id}`}
              >
                Download
              </a>
            </Button>
          </div>
        )}
      />
    </Table>
  )
}