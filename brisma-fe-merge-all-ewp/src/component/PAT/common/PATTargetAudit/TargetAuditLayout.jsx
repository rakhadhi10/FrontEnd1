import { Button, Spin, Typography } from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import PrevNextNav from "../../../../component/PrevNextNav";
import AppLayout from "../../../../layouts/AppLayout";
import AddendumPATBreadcrumb from "../../../AddendumPATBreadcrumb";

export default function TargetAuditLayout({
  title = "PAT",
  fetchTargetAudit,
  loading,
  error,
  addendum,
  children
}) {
  const { pat_id } = useParams()

  useEffect(() => fetchTargetAudit(pat_id), [fetchTargetAudit, pat_id])

  return (
    <AppLayout title={title} addendum={addendum} breadcrumb={addendum && AddendumPATBreadcrumb}>
      <PrevNextNav />
      <div className="mt-16">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 py-4">
            <Typography.Title level={3} style={{ margin: 0 }} className="font-mulish">
              <span className={addendum && "text-red-500"}>Target Audit</span>
            </Typography.Title>
            <Button
              ghost
              disabled={loading}
              icon={
                <ReloadOutlined
                  className="text-2xl text-primary-blue"
                  spin={loading}
                />
              }
              onClick={() => fetchTargetAudit(pat_id)}
            />
          </div>
        </div>
        {loading && <div className="flex justify-center"><Spin /></div>}
        {!loading && !error &&
          children
        }
      </div>
    </AppLayout>
  );
}
