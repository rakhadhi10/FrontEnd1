import { Button, Table } from 'antd';
import { FiPaperclip } from 'react-icons/fi';
import { connect } from 'react-redux';
import { approveActionPlanSigner } from '../../../../../store/ducks/RPMAuditee/actions';

const { Column } = Table

const sharedOnCell = (value, record, index) => {
  const obj = {
    children: value,
    props: {},
  };
  if (record.subHeader) {
    obj.props.colSpan = 0;
  }
  return obj
};

function TableRekomendasi({ data, approveActionPlan }) {
  return <Table
    bordered
    size="small"
    dataSource={data}
    pagination={false}
    rowClassName={(record) => {
      if (record.subHeader) return "text-black"
      if (record.status_kode === 5) return "text-red-600"
      return "text-black"
    }
    }
  >
    <Column
      align="center"
      title="No"
      dataIndex="no"
      render={
        (value, record, index) => {
          const obj = {
            children: value,
            props: {},
          };
          if (record.subHeader) {
            obj.props.colSpan = 7;
          }
          return obj;
        }
      }
    />
    <Column
      align="center"
      title="Action Plan"
      dataIndex="actionPlan"
      render={sharedOnCell}
    />
    <Column
      align="center"
      title="Batas Waktu"
      dataIndex="batasWaktu"
      render={sharedOnCell}
    />
    <Column
      align="center"
      title="Status Tindak Lanjut"
      dataIndex="statusTindakLanjut"
      render={sharedOnCell}
    />
    <Column
      align="center"
      title="Hasil Evaluasi"
      dataIndex="hasilEvaluasi"
      render={sharedOnCell}
    />
    <Column
      align="center"
      title="Lampiran"
      dataIndex="lampiran"
      render={(value, record) => {
        const obj = {
          children: value,
          props: {},
        };
        if (record.subHeader) {
          obj.props.colSpan = 0;
        }
        obj.children = (
          record.lampiran === "" ? (
            <div className="flex justify-center">
              <FiPaperclip className="text-primary-blue text-xl" />
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <p className="underline cursor-pointer">{record.lampiran}</p>
            </div>
          )
        )
        return obj
      }
      }
    />
    <Column
      align="center"
      title="Action"
      dataIndex="action"
      render={(value, record) => {
        const obj = {
          children: value,
          props: {},
        };
        if (record.subHeader) {
          obj.props.colSpan = 0;
        }
        obj.children = (
          record.status_kode !== "5" ? (
            <div className='flex justify-center gap-3'>
              <Button
                type="danger"
                disabled={record.status_kode !== "3"}
                onClick={() => approveActionPlan(
                  record.kkptID,
                  record.projectID,
                  record.rekomendasi,
                  {
                    id: record.id,
                    nama: record.nama
                  },
                  false
                )}
              >
                Reject
              </Button>
              <Button
                type="primary"
                disabled={record.status_kode !== "3"}
                onClick={() => approveActionPlan(
                  record.kkptID,
                  record.projectID,
                  record.rekomendasi,
                  {
                    id: record.id,
                    nama: record.nama
                  },
                  true
                )}
              >
                Submit
              </Button>
            </div>
          ) : null
        )
        return obj
      }
      }
    />
  </Table>
}

const mapDispatchToProps = {
  approveActionPlan: approveActionPlanSigner
}

export default connect(null, mapDispatchToProps)(TableRekomendasi)