import { Button, notification } from "antd";
import { useEffect, useState, memo } from "react";
import { FaQuestionCircle } from "react-icons/fa";
import {
  AdjustmentKategoriTemuan,
  CardInfoKKPT,
  KategoriTemuanCard,
  KkptLayout
} from "../../../../component/EWP/EWPKKPT";
import CardProjectEWP from "../../../../component/EWP/common/CardProjectEWP";
import { useParams } from "react-router";
import { getKategoriList, updateKkptKategori } from "../../../../store/ducks/EWP/Kkpt/kkptkategori/action"
import { compose } from "redux";
import { connect } from "react-redux";

const breadcrumb = [
  {
    title: "BRISMA",
    link: "/",
  },
  {
    title: "EWP",
    link: "/dashboard",
  },
  {
    title: "20210011",
    link: "/ewp/project",
  },
  {
    title: "KKPT",
    link: "/ewp/project/kkpt",
  },
  {
    title: "Kategori",
    link: "/ewp/project/kkpt/kategori",
  },
];

function KKPTKategori({ stateKkptDetail, stateKkptKategori, kategory_list, update_kategory }) {
  const { project_id, kkpt_id } = useParams();
  const { loadingUpdate, errorUpdate, messageUpdate } = stateKkptKategori

  useEffect(() => {
    (async () => {
      kategory_list(kkpt_id)
    })()
  }, [])




  const onSaveAdjustment = async (data) => {
    alert(JSON.stringify(data))
    let res = await update_kategory({
      ...data,
      kkpt_id
    })

    if (res === "success") {
      notification['success']({
        message: 'Berhasil',
        description:
          'Saved Adjustment Successfully',
      });
    }

  }


  const propsAdjusmentKategoriTemuan = {
    loadingUpdate,
    onSaveAdjustment,
    dataDampak: stateKkptKategori.dataDampak,
    dataLikeLihood: stateKkptKategori.dataLikelihood,
    allDataKategori: stateKkptKategori.data
  }

  const propsCardTemuanCard = {
    dataDampak: stateKkptKategori.dataDampak,
    dataLikeLihood: stateKkptKategori.dataLikelihood,
    allDataKategori: stateKkptKategori.data
  }

  return (
    <KkptLayout selectedKey="5" breadcrumb={breadcrumb} kkpt_id={kkpt_id}>
      <div className="flex gap-1 pb-5">
        <Button size="small">&lt;</Button>
        <Button size="small">&gt;</Button>
      </div>
      <div className="grid grid-cols-2 gap-6 px-6">
        <CardProjectEWP />
        <CardInfoKKPT />
      </div>
      <div className="flex items-center gap-4 mb-4 mt-8">
        <p className="text-secondary-light-black text-3xl font-mulish font-bold">Kategori</p>
        <FaQuestionCircle className="text-primary-blue text-xl cursor-pointer" />
      </div>
      <div className="w-full rounded-2xl bg-white border border-primary-blue py-5 px-5 mb-10">
        <div className="flex items-center gap-4 mb-4 mt-4">
          <p className="text-secondary-light-black text-lg font-mulish font-bold">
            Kategori Temuan
          </p>
          <FaQuestionCircle className="text-primary-blue text-lg cursor-pointer" />
        </div>
        <div className="w-full rounded-2xl bg-white border border-primary-blue py-5 px-5 mb-10">
          <KategoriTemuanCard {...propsCardTemuanCard} />
        </div>
        <div className="flex items-center gap-4 mb-4 mt-8">
          <p className="text-red-600 text-lg font-mulish font-bold">Adjustment Kategori Temuan</p>
          <FaQuestionCircle className="text-primary-blue text-lg cursor-pointer" />
        </div>
        <div className="w-full rounded-2xl bg-white border border-red-600 py-5 px-5 mb-10">
          {errorUpdate && messageUpdate}
          <AdjustmentKategoriTemuan  {...propsAdjusmentKategoriTemuan} />
        </div>
      </div>
    </KkptLayout>
  );
}

const mapStateToProps = (state) => ({
  stateKkptKategori: state.kkpt_kategori_temuan,
  stateKkptDetail: state.kkpt_detail
});

const mapDispatchToProps = {
  kategory_list: getKategoriList,
  update_kategory: updateKkptKategori,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(KKPTKategori);
