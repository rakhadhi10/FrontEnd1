import { useState, useEffect, useCallback, memo } from "react";
import { checkKesimpulanKkpa, getKkptList, createKkptList } from "../../../../store/ducks/EWP/KKPA/kkpakesimpulan/action";
import { compose } from "redux";
import { connect } from "react-redux";
import { CardInfoKkpa, KkpaLayout, ModalApproval, ModalCreateKkpt } from "../../../../component/EWP/EwpKkpa";
import { Button, Table, notification } from "antd";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { CheckOutlined } from "@ant-design/icons";
import withAuth from "../../../routes/hoc/withAuth";
import withRole from "../../../routes/hoc/withRole";
import { pat_content } from "../../../routes/allowedRoles";
import CardProjectEWP from "../../../../component/EWP/common/CardProjectEWP";

const breadcrumb = [
  {
    title: "BRISMA",
    link: "/dashboard",
  },
  {
    title: "EWP",
    link: "/",
  },
  {
    title: "20210011",
    link: "/",
  },
  {
    title: "KKPA",
    link: "/",
  },
  {
    title: "KESIMPULAN",
    link: "/",
  },
];





function EwpKkpaKesimpulan({ checkKesimpulanKkpa, state_kkpa_info, getKkptList, state_kkpa_kesimpulan, createKkptList }) {
  const { project_id, kkpa_id } = useParams()
  const navigate = useNavigate()
  const { data } = state_kkpa_kesimpulan
  const statusEfective = state_kkpa_info.kkpa_info && state_kkpa_info.kkpa_info.is_efective;

  console.log(statusEfective);
  const list = useLocation();

  const [show, setShow] = useState(false);
  const [showApprove, setShowAprove] = useState(false);

  const modalClose = useCallback(() => {
    setShow(false);
    setShowAprove(false);
  }, []);


  useEffect(() => {
    checkKesimpulanKkpa(kkpa_id);
    if (!statusEfective) {
      getKkptList(kkpa_id)
    }
  }, [checkKesimpulanKkpa, statusEfective]);

  const columns = [
    {
      title: "Judul KKPT",
      dataIndex: "judul_kkpt",
      key: "judul_kkpt",
    },
    {
      title: "Kategori Temuan",
      dataIndex: "kategori_temuan",
      key: "kategori_temuan",
    },
    {
      title: "Temuan Berulang",
      dataIndex: "temuan_berulang",
      key: "temuan_berulang",
      render: (_, record) => {
        if (record.temuan_berulang) {
          return <CheckOutlined className="text-red-800" />;
        }
        return "";
      },
      align: "center",
    },
    {
      title: "Tipe Temuan",
      dataIndex: "tipe_temuan",
      key: "tipe_temuan",
    },
    {
      title: "Level Temuan",
      dataIndex: "level_temuan",
      key: "level_temuan",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record) => <button onClick={() => navigate(`/ewp/project/kkpt/project/${project_id}/${record.id}`)} className="text-primary-blue underline">Edit</button>,
    },
  ];


  const onCreateKkpt = async (data) => {
    let tempCreate = {
      "kkpa_id": kkpa_id,
      "judul_kkpt": data
    }
    let res = await createKkptList(tempCreate)
    if (res === "success") {
      setShow(false)
      notification["success"]({
        message: 'Informasi',
        description:
          'Created Kkpt Successfully',
      });
    }
  }

  return (
    <KkpaLayout breadcrumb={breadcrumb} kkpa_id={kkpa_id}>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <CardProjectEWP />
        </div>
        <div>
          <CardInfoKkpa />
        </div>
      </div>
      <div className="mt-6">
        <h1 className="font-bold text-3xl">Kesimpulan</h1>
      </div>
      <div className="my-10">
        <p className="text-xl">
          Pengendalian Intern Terhadap Risk Issue AKD1 - Analisa Permohonan Kredit adalah
        </p>
        <div className="space-y-10 my-10">
          <div className="flex place-content-center">
            <div>
              <img src={statusEfective !== true ? "/nook.png" : "/like.png"} alt="" />
              <p
                className={
                  statusEfective !== true
                    ? `text-center text-6xl text-red-500`
                    : `text-center text-6xl text-secondary-green`
                }
              >
                {statusEfective !== true ? "Tidak Efektif" : "Efektif"}
              </p>
            </div>
          </div>
          {/* <div className="border-dashed border border-blue-500  p-5 space-y-3">
            <p className="text-center font-bold text-sm">
              Silahkan untuk melakukan approval pada KKPA ini
            </p>
            <div className="flex place-content-center justify-around">
              <Button
                onClick={() => setShow(true)}
                className="bg-red-500 h-10 w-20 text-white hover:text-black"
              >
                reject
              </Button>
              <Button
                onClick={() => setShowAprove(true)}
                className="bg-secondary-green text-white h-10 w-20 hover:text-black"
              >
                Approve
              </Button>
            </div>
          </div> */}
          <div className="flex  justify-end pr-10">
            {/* <Button
              onClick={() => setShowAprove(true)}
              className="bg-secondary-green text-white h-10 w-20 hover:text-black"
            >
              Approve
            </Button> */}
            {
              statusEfective !== true ? <Button
                onClick={() => setShow(true)}
                className="bg-red-500 h-10  text-white hover:text-black"
              >
                Create Kkpt
              </Button> :
                null
            }

          </div>
        </div>
        {statusEfective !== true ? (
          <Table
            className="border border-primary-blue"
            scroll={{ x: 1300, y: 300 }}
            tableLayout="fixed"
            pagination={false}
            size="small"
            dataSource={data}
            columns={columns}
          />
        ) : null}
      </div>

      {/* <ModalApproval show={show} reject={true} cancelModal={modalClose} /> */}
      <ModalCreateKkpt onCreateKkpt={onCreateKkpt} show={show} cancelModal={modalClose} />
      {/* <ModalApproval show={showApprove} cancelModal={modalClose} /> */}
    </KkpaLayout>
  );
}

const mapStateToProps = (state) => ({
  state_kkpa_info: state.kkpa_info,
  state_kkpa_kesimpulan: state.kkpa_kesimpulan
});

const mapDispatchToProps = {
  checkKesimpulanKkpa,
  getKkptList,
  createKkptList
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withAuth, withRole(pat_content), withConnect, memo)(EwpKkpaKesimpulan);
