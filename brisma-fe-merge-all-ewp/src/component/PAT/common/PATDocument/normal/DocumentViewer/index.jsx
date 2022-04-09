import { useState } from "react";
import { connect } from "react-redux";
import { Button, Input, Typography } from "antd";
import { MessageOutlined } from "@ant-design/icons";
import CommentDrawer from "../../common/CommentDrawer";
import DaftarIsiItem from "../../common/DaftarIsiItem";
import JadwalKegiatanAudit from "./JadwalKegiatanAudit";
import LatarBelakangTujuan from "./LatarBelakangTujuan";
import SumberInformasi from "./SumberInformasi";
import RuangLingkupAudit from "./RuangLingkupAudit";
import JadwalSBP from "./JadwalSBP";
import JadwalLainnya from "./JadwalLainnya";
import SusunanTimAudit from "./SusunanTimAudit";
import AnggaranAudit from "./AnggaranAudit";
import { updateRefBabPatKode } from "../../../../../../store/ducks/PATDocument/actions";
import { getComments } from "../../../../../../store/ducks/PATDocument/selectors";
import AddNewComment from "../AddNewComment";
import CommentSectionReply from "../CommentSectionReply";

const chapterMap = [
  {
    title: "A. Latar Belakang dan Tujuan Audit",
    content: <LatarBelakangTujuan />,
    ref_bab_pat_kode: 1,
  },
  {
    title: "B. Sumber Informasi",
    content: <SumberInformasi />,
    ref_bab_pat_kode: 2,
  },
  {
    title: "C. Ruang Lingkup Audit",
    content: <RuangLingkupAudit />,
    ref_bab_pat_kode: 3,
  },
  {
    title: "D. Jadwal Kegiatan Audit",
    content: <JadwalKegiatanAudit />,
    ref_bab_pat_kode: 5,
  },
  {
    title: "E. Jadwal SBP (Strategic Business Partner)",
    content: <JadwalSBP />,
    ref_bab_pat_kode: 6,
  },
  {
    title: "F. Jadwal Lainnya",
    content: <JadwalLainnya />,
    ref_bab_pat_kode: 7
  },
  {
    title: "G. Susunan Tim Audit, Unit Kerja Binaan, & Auditor Pembina",
    content: <SusunanTimAudit />,
    ref_bab_pat_kode: 4
  },
  {
    title: "H. Anggaran Audit",
    content: <AnggaranAudit />,
    ref_bab_pat_kode: 8
  }
]

function DocumentViewer({ updateRefBabPatKode }) {
  const [chapter, setChapter] = useState(0)
  const handleOnClickChapter = (chapter, ref_bab_pat_kode) => {
    setChapter(chapter)
    updateRefBabPatKode(ref_bab_pat_kode)
  }

  const [commentVisible, setCommentVisible] = useState(false)
  const handleOnClickCommentButton = () => setCommentVisible(!commentVisible);

  const [keyword, setKeyword] = useState("")
  const handleOnKeywordChange = (e) => setKeyword(e.target.value)

  return (
    <>
      <section className="grid grid-cols-4 gap-4">
        <div className="mt-16 col-start-2 col-span-3">
          <Typography.Title level={3}>
            <span className="text-primary-blue">{chapterMap[chapter].title}</span>
          </Typography.Title>
        </div>
      </section>
      <section className="grid grid-cols-4 items-start gap-4 pb-4">
        <div
          className="bg-white border border-primary-blue rounded-lg p-4 overflow-auto"
          style={{ height: 500 }}
        >
          <Typography.Title level={4}>
            <span className="text-primary-blue">Daftar Isi</span>
          </Typography.Title>
          <Input placeholder="Search" onChange={handleOnKeywordChange} />
          <div className="pt-4">
            {chapterMap.map((m, idx) => (
              <DaftarIsiItem
                label={m.title}
                isActive={chapter === idx}
                hidden={!m.title.includes(keyword)}
                onClick={() => handleOnClickChapter(idx, m.ref_bab_pat_kode)}
              />
            ))}
          </div>
        </div>
        <div
          className="relative bg-white border border-primary-blue rounded-lg p-4 col-span-3 overflow-x-hidden"
          style={{ height: 800 }}
        >
          <div className="absolute right-8 top-8">
            <Button
              size="large"
              shape="circle"
              style={{ backgroundColor: "#E8B912" }}
              icon={<MessageOutlined className="text-2xl" />}
              onClick={handleOnClickCommentButton}
            />
          </div>
          <div className="mt-16">
            {chapterMap[chapter].content}
          </div>
          <CommentDrawer
            visible={commentVisible}
            onClickClose={() => setCommentVisible(false)}
            getComments={getComments}
            addNewComment={AddNewComment}
            commentSectionReply={CommentSectionReply}
          />
        </div>
      </section>
    </>
  )
}

const mapDispatchToProps = {
  updateRefBabPatKode: updateRefBabPatKode
}

export default connect(null, mapDispatchToProps)(DocumentViewer)