import { MessageOutlined } from "@ant-design/icons";
import { Button, Typography } from "antd";
import React, { useState } from "react";
import BaseContentViewer from "./BaseContentViewer";
import CommentDrawer from "./CommentDrawer";
import { getAnalisisPerencanaanDoc } from "../../../../templates/EWP/Mapa/doc_analisis_perencanaan_mapa_bab5";
import { doc_tim_audit_mapa } from "../../../../templates/EWP/Mapa/doc_tim_audit_mapa";
import { doc_jadwal_audit_mapa } from "../../../../templates/EWP/Mapa/doc_jadwal_audit_mapa";
import { doc_anggaran_audit_mapa } from "../../../../templates/EWP/Mapa/doc_anggaran_audit_mapa";
import { doc_perencanaan_audit_tahunan_mapa_bab4 } from "../../../../templates/EWP/Mapa/doc_perancangan_audit_tahunan_mapa_bab4";
function BaseContent({ currentContent }) {
  const [commentVisible, setCommentVisible] = useState(false);
  let currentBab = 0;
  const handleOnClickCommentButton = () => {
    setCommentVisible(!commentVisible);
  };

  const content = (key, params) => {
    switch (key) {
      case 1:
        currentBab = 1;
        return <BaseContentViewer params={params} />;
      case 2:
        currentBab = 2;
        return <BaseContentViewer params={params} />;
      case 3:
        currentBab = 3;
        return <BaseContentViewer params={params} />;
      case 4:
        currentBab = 4;
        return (
          <BaseContentViewer params={params} template={doc_perencanaan_audit_tahunan_mapa_bab4} />
        );
      case 5:
        currentBab = 0;
        return;
      case 6:
        currentBab = 6;
        return <BaseContentViewer params={params} template={doc_tim_audit_mapa} />;
      case 7:
        currentBab = 7;
        return <BaseContentViewer params={params} template={doc_anggaran_audit_mapa} />;
      case 8:
        currentBab = 8;
        return <BaseContentViewer params={params} template={doc_jadwal_audit_mapa} />;
      default:
        currentBab = 5;
        return <BaseContentViewer params={params} template={getAnalisisPerencanaanDoc} />;
    }
  };

  return (
    <div>
      <Typography.Title level={3}>
        <span className="text-primary-blue">
          {currentContent.title !== "" ? currentContent.title : "Doc Mapa"}
        </span>
      </Typography.Title>
      <div
        className="relative bg-white border border-primary-blue rounded-lg p-4 col-span-3 overflow-auto h-auto"
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

        <div className="text-center pb-8">
          <Typography.Title level={1}>{currentContent.title}</Typography.Title>
          {currentContent.key !== "" && content(currentContent.key, currentContent.params)}
        </div>
        <CommentDrawer
          visible={commentVisible}
          bab_id={currentBab}
          onClickClose={() => setCommentVisible(false)}
        />
      </div>
    </div>
  );
}

export default BaseContent;
