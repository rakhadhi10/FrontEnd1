import { Button, Divider, Skeleton } from "antd";
import { memo, useEffect } from "react";
import { FaQuestionCircle } from "react-icons/fa";
import { CardInfoKKPT, KkptLayout } from "../../../../component/EWP/EWPKKPT";
import CardProjectEWP from "../../../../component/EWP/common/CardProjectEWP";
import { SkorDampak } from "../../../../component/EWP/EWPKKPT/Dampak/SkorDampak";
import EWPLayout from "../../../../layouts/EwpLayout";
import { useParams } from "react-router";
import { getKkptLikehood } from "../../../../store/ducks/EWP/Kkpt/kkptlikehood/action"
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
    title: "Likehood",
    link: "/ewp/project/kkpt/likehood",
  },
];

function KKPTLikehood({ stateKkptLikehood, getDataLikeHood }) {
  const { data, loading, error, message } = stateKkptLikehood
  const { project_id, kkpt_id } = useParams();

  useEffect(() => {
    (async () => {
      getDataLikeHood(kkpt_id)
    })()
  }, [kkpt_id])




  return (
    <KkptLayout selectedKey="5" kkpt_id={kkpt_id} breadcrumb={breadcrumb}>
      <div className="flex gap-1 pb-5">
        <Button size="small">&lt;</Button>
        <Button size="small">&gt;</Button>
      </div>
      <div className="grid grid-cols-2 gap-6 px-6">
        <CardProjectEWP />
        <CardInfoKKPT />
      </div>
      <div className="flex items-center gap-4 mb-4 mt-8">
        <p className="text-secondary-light-black text-3xl font-mulish font-bold">Likehood</p>
        <FaQuestionCircle className="text-primary-blue text-xl cursor-pointer" />
      </div>

      {
        loading ? <Skeleton active />
          :
          <div className="w-full rounded-2xl bg-white border border-primary-blue py-5 px-5 mb-10">
            <div className="flex mb-4 font-mulish">
              <p className="w-3/12 text-primary-blue">Jumlah Populasi</p>
              <p className="text-primary-blue text-xl font-bold">{data.likelihood !== null ? data.likelihood.jumlah_populasi : 0}</p>
            </div>
            <div className="flex mb-4 font-mulish">
              <p className="w-3/12 text-primary-blue">Jumlah Sample</p>
              <p className="text-primary-yellow text-xl font-bold">{data.likelihood !== null ? data.likelihood.jumlah_sample : 0}</p>
            </div>
            <div className="flex mb-4 font-mulish">
              <p className="w-3/12 text-primary-blue">Jumlah Sample Bermasalah</p>
              <p className="text-red-600 text-xl font-bold">{data.likelihood !== null ? data.likelihood.jumlah_sample_bermasalah : 0}</p>
            </div>
            <Divider dashed className="border border-primary-blue" />
            {error && message}
            <div className="flex mt-4 mb-6 font-mulish font-bold">
              <p className="w-3/12 text-primary-blue font-bold">Skor Likehood</p>
              <SkorDampak data={data.mtd_stc_likelihood !== null ? data.mtd_stc_likelihood : []} skor={data.likelihood !== null && data.likelihood.likelihood_kode} />
            </div>
          </div>
      }

    </KkptLayout>
  );
}

const mapStateToProps = (state) => ({
  stateKkptLikehood: state.kkpt_likehood,
});

const mapDispatchToProps = {
  getDataLikeHood: getKkptLikehood
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(KKPTLikehood);