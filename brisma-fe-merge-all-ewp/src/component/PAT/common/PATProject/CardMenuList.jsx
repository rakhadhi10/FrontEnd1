import { Spin } from "antd";
import { connect } from "react-redux";
import { useLocation } from "react-router";
import { getAddendumStatus, getAllStatus, getError, getLoading } from "../../../../store/ducks/PATProject/selectors";
import CardMenu from "./CardMenu";

const mapStateToProps = (state, ownProps) => {
  let status = {}
  if (ownProps.addendum) {
    const add_st = getAddendumStatus(state)
    status.pic_latar_belakang_tujuan = add_st.latar_belakang
    status.pic_sumber_informasi = add_st.sumber_informasi
    status.pic_tim_audit = add_st.tim_audit
    status.pic_jadwal_audit = add_st.jadwal_audit
    status.pic_jadwal_sbp = add_st.sbp
    status.pic_anggaran = add_st.kegiatan_lain
    status.pic_document = true
  } else {
    status = { ...getAllStatus(state) }
  }
  return {
    ...status,
    loading: getLoading(state),
    error: getError(state)
  }
}

const mapDispatchToProps = null

export default connect(mapStateToProps, mapDispatchToProps)(CardMenuList)

export function CardMenuList({
  pic_latar_belakang_tujuan,
  pic_sumber_informasi,
  pic_tim_audit,
  pic_jadwal_audit,
  pic_jadwal_sbp,
  pic_anggaran,
  pic_document,
  error,
  loading,
  addendum
}) {
  const { pathname } = useLocation()

  return (
    <>
      {loading &&
        <div className="p-8 text-center">
          <Spin />
        </div>
      }
      {error && !loading &&
        <div className="p-8 text-center">
          <p>{error}</p>
        </div>
      }
      {!loading && !error &&
        <div className="my-8 grid grid-cols-4 gap-8">
          <CardMenu
            addendum={addendum}
            title="Latar Belakang dan Tujuan Audit"
            src={`${pathname}/latar-belakang`}
            description="Latar belakang dari Perencanaan Audit Tahunan"
            status={!pic_latar_belakang_tujuan ? "belum" : "sudah"}
            image="/pat-project-1.png"
          />
          <CardMenu
            addendum={addendum}
            title="Sumber Informasi"
            src={`${pathname}/sumber-informasi`}
            description="Sumber Informasi dari Perencanaan Audit Tahunan"
            status={!pic_sumber_informasi ? "belum" : "sudah"}
            image="/pat-project-2.png"
          />
          <CardMenu
            addendum={addendum}
            title="Target Audit"
            src={`${pathname}/target-audit`}
            description="Kesimpulan Objek Audit dari Perencanaan Audit Tahunan"
            status={"sudah"}
            image="/pat-project-3.png"
          />
          <CardMenu
            addendum={addendum}
            title="Tim Audit"
            src={`${pathname}/tim-audit`}
            description="Tim Audit dari Perencanaan Audit Tahunan"
            status={!pic_tim_audit ? "belum" : "sudah"}
            image="/pat-project-4.png"
          />
          <CardMenu
            addendum={addendum}
            title="Jadwal Audit"
            src={`${pathname}/jadwal-audit`}
            description="Jadwal Audit dari Perencanaan Audit Tahunan"
            status={!pic_jadwal_audit ? "belum" : "sudah"}
            image="/pat-project-5.png"
          />
          <CardMenu
            addendum={addendum}
            title="Jadwal Consulting"
            src={`${pathname}/jadwal-consulting`}
            description="Jadwal Consulting dari Perencanaan Audit Tahunan"
            status={!pic_jadwal_sbp ? "belum" : "sudah"}
            image="/pat-project-6.png"
          />
          <CardMenu
            addendum={addendum}
            title="Anggaran"
            src={`${pathname}/anggaran`}
            description="Angaran dari Perencanaan Audit Tahunan"
            status={!pic_anggaran ? "belum" : "sudah"}
            image="/pat-project-7.png"
          />
          <CardMenu
            addendum={addendum}
            title="Document PAT"
            src={`${pathname}/dokumen`}
            description="Generate & View Doc PAT dari Perencanaan Audit Tahunan"
            status={!pic_document ? "belum" : "sudah"}
            image="/pat-project-8.png"
          />
        </div>
      }
    </>
  );
}