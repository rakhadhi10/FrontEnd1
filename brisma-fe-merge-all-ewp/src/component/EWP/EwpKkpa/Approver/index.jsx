import { compose } from "redux";
import { Fragment, memo } from "react";
import { connect } from "react-redux";

import BadgeApproval from "../Badge/Approval";
import BadgeRejected from "../Badge/Rejected";
import { CheckCircleOutlined, CheckOutlined } from "@ant-design/icons";

const reason = [
  {
    type: "MA",
    kode: 38374,
    nama: "Sutarto",
    status: "Approved",
    review: "Saya sudah review dan ok semua",
    tanggal: "14 Okt 2021 11:20",
  },
  {
    type: "MA",
    kode: 38374,
    nama: "Sutarto",
    status: "Rejected",
    review: "Tolong perhatikan lebih detail lagi di comment",
    tanggal: "14 Okt 2021 11:20",
  },
  {
    type: "MA",
    kode: 38374,
    nama: "Sutarto",
    status: "Rejected",
    review: "Direject karena belum lengkap, comment sudah di berikan",
    tanggal: "14 Okt 2021 11:20",
  },
];

const Approver = ({ log_persetujuan, state_kkpa_info }) => {
  console.log(state_kkpa_info)
  return (
    <Fragment>
      <div className="border border-primary-blue  rounded-xl">
        <div className="header border-b border-primary-blue px-5 py-2 flex justify-between">
          <p className="text-primary-blue font-bold">Approver Notulen Entrance Meeting</p>
          <CheckCircleOutlined className="text-primary-blue" />
        </div>
        <div className="content px-5">
          <div className="mt-3">
            <div className="flex flex-row gap-2  text-base">
              <p className="font-bold">Ketua Tim Audit</p>
              <p>{state_kkpa_info.kkpa_info && state_kkpa_info.kkpa_info.pn_kta.pn} </p>
              <span> - </span>
              <p> {state_kkpa_info.kkpa_info && state_kkpa_info.kkpa_info.pn_kta.nama}</p>
              <span className="font-extrabold">[</span>
              <CheckOutlined className="text-primary-green mt-1" />
              <span className="font-extrabold">]</span>
            </div>
          </div>
          <div className="mt-2">
            <div className="flex flex-row gap-2  text-base">
              <p className="font-bold">Manajer Audit</p>
              <p>{state_kkpa_info.kkpa_info && state_kkpa_info.kkpa_info.pn_ma.pn} </p>
              <span> - </span>
              <p>{state_kkpa_info.kkpa_info && state_kkpa_info.kkpa_info.pn_ma.nama}</p>
              <span className="font-extrabold">[</span>
              <span className="font-extrabold">]</span>
            </div>
          </div>
          <div className="mt-2">
            <p className="underline text-primary-blue mb-1">Reason Approval</p>
            <div className="bg-white py-2 px-2 h-44 overflow-x-scroll">
              {log_persetujuan &&
                log_persetujuan.map((value, key) => (
                  <div key={key} className="flex flex-row justify-between mb-2">
                    <div>
                      <div className="inline-block pr-1 text-black">({value.from.posisi})</div>
                      <div className="inline-block pr-1 text-black">{value.from.pn}</div>
                      <div className="inline-block pr-1 text-black">-</div>
                      <div className="inline-block pr-1 text-black">{value.from.name}</div>
                      <div className="inline-block pr-1">
                        {value.is_approved ? (
                          <BadgeApproval title={"Approved"} />
                        ) : (
                          <BadgeRejected title={"Rejected"} />
                        )}
                      </div>
                      <div className="flex flex-col mt-1 text-xs text-primary-gray">
                        {value.note}
                      </div>
                    </div>
                    <div className="text-xs text-primary-gray">{value.created_at}</div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  log_persetujuan: state.kkpa_info.kkpa_log_persetujuan,
  state_kkpa_info: state.kkpa_info,
});

const withConnect = connect(mapStateToProps, null);

export default compose(withConnect, memo)(Approver);
