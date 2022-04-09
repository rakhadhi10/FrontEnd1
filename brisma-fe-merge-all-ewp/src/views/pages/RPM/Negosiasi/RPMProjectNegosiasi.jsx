import { Spin } from "antd";
import React from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { ProjectTimCard, CardNegosiasiProject } from "../../../../component/RPM";
import RPMNegosiasiBreadcrumb from "../../../../component/RPMNegosiasiBreadcrumb";
import AppLayout from "../../../../layouts/AppLayout";
import { createNegosiasi } from "../../../../store/ducks/RPMNegosiasi/actions";
import { getStatus, getStatusError, getStatusLoading } from "../../../../store/ducks/RPMNegosiasi/selectors";

function RPMProjectNegosiasi(props) {
  const { id } = useParams()
  const { createNegosiasi, loading, error, data } = props
  useEffect(() => createNegosiasi(id), [createNegosiasi, id])

  if (loading) return (
    <AppLayout title="RPM">
      <div className="flex justify-center"><Spin /></div>
    </AppLayout>
  )

  if (error && !loading) return (
    <AppLayout title="RPM">
      <div className="flex justify-center">{error}</div>
    </AppLayout>
  )

  const menuProject = [
    {
      title: "Attendance",
      deskripsi: "Kehadiran pada saat negosiasi meeting",
      link: `/rpm/negosiasi/${id}/attendance`,
      img: "/pat-project-1.png",
      status: data.status_attandence ? "filled" : null,
    },
    {
      title: "Notulen",
      deskripsi: "Notulen negosiasi meeting",
      link: `/rpm/negosiasi/${id}/notulen`,
      img: "/pat-project-1.png",
      status: data.status_notulen ? "filled" : null,
    },
    {
      title: "Negosiasi Meeting",
      deskripsi: "Negosiasi meeting",
      link: `/rpm/negosiasi/${id}/kkpt`,
      img: "/pat-project-1.png",
      status: "filled"
    },
    {
      title: "Berita Acara",
      deskripsi: "Berita Acara negosiasi meeting",
      link: `/rpm/negosiasi/${id}/berita-acara`,
      img: "/pat-project-1.png",
      status: data.status_berita_acara ? "filled" : null,
    },
  ];
  return (
    <AppLayout title="RPM" breadcrumb={RPMNegosiasiBreadcrumb}>
      <div className="mx-24">
        <ProjectTimCard
          num_project={data.num_project}
          tim_audit={data.tim_audit}
          makers_auditee={data.makers_auditor}
          checkers_auditee={data.checkers_auditor}
          signers_auditee={data.signers_auditor}
        />
      </div>
      <p className="text-2xl font-bold font-mulish text-secondary-light-black my-10">{data.nama_project}</p>
      <div className="grid grid-cols-4 gap-8 my-6 mx-10">
        {menuProject.map((item) => (
          <CardNegosiasiProject
            title={item.title}
            status={item.status}
            img={item.img}
            link={item.link}
            deskripsi={item.deskripsi}
          />
        ))}
      </div>
    </AppLayout>
  );
}

const mapDispatchToProps = {
  createNegosiasi: createNegosiasi
}

const mapStateToProps = state => ({
  loading: getStatusLoading(state),
  error: getStatusError(state),
  data: getStatus(state)
})

export default connect(mapStateToProps, mapDispatchToProps)(RPMProjectNegosiasi)
