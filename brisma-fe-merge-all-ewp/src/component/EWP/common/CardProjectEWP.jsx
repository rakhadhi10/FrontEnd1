import { Avatar, Card, Space } from "antd";
import React, { useEffect } from "react";
import { UserOutlined } from "@ant-design/icons";
import {
  getCurrentProject,
  getCurrentProjectError,
  getCurrentProjectLoading,
  getCurrentTimAudit,
} from "../../../store/ducks/EWP/CreateEWP/selectors";
import { connect } from "react-redux";
import Moment from "react-moment";
import { currentProject } from "../../../store/ducks/EWP/CreateEWP/actions";
import { useParams } from "react-router-dom";

function CardProjectEWP({
  getCurrentProject,
  currentProject,
  getCurrentProjectError,
  getCurrentProjectLoading,
  tim_audit,
}) {
  const { project_id } = useParams();
  useEffect(() => currentProject(project_id), [currentProject, project_id]);

  const Status = ({ text, colorClass }) => {
    return (
      <div className="flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${colorClass}`} />
        <div className="text-xs">{text}</div>
      </div>
    );
  };

  const CardTitle = () => {
    return (
      <div className="flex flex-row justify-between">
        <div className="flex space-x-5">
          <p className="text-primary-blue text-lg font-mulish font-bold">
            {getCurrentProject.project_id}
          </p>
          <p className="bg-primary-blue text-xs w-min font-mulish font-thin text-white gap-6 px-4 py-1.5 rounded">
            {getCurrentProject.audit_type_name}
          </p>
        </div>
        <p className="text-lg italic font-normal text-gray-400">
          <Moment
            date={getCurrentProject.info_periode_pelaksanaan_start}
            format="DD-MM-YYYY"
          />{" "}
          sd{" "}
          <Moment
            date={getCurrentProject.info_periode_pelaksanaan_end}
            format="DD-MM-YYYY"
          />
        </p>
      </div>
    );
  };
  return (
    <Card
      title={<CardTitle />}
      style={{ overflow: "hidden", borderRadius: "10px" }}
    >
      <p className="text-sm font-mulish italic font-normal text-secondary-light-black mb-5">
        {getCurrentProjectError
          ? getCurrentProjectError
          : getCurrentProject.project_name}
      </p>
      <div className="flex flex-row justify-between ">
        <Space>
          {tim_audit && !getCurrentProjectLoading && (
            <>
              {tim_audit.ma && (
                <Avatar
                  style={{
                    backgroundColor: "#C9EEFA",
                  }}
                  icon={<UserOutlined />}
                />
              )}

              {tim_audit.kta && (
                <Avatar
                  style={{
                    backgroundColor: "#FAD6D8",
                  }}
                  icon={<UserOutlined />}
                />
              )}
              <Avatar.Group>
                {tim_audit.ata &&
                  tim_audit.ata.map((item, idx) => (
                    <Avatar
                      key={idx}
                      style={{
                        backgroundColor: "#E0FAD6",
                      }}
                      icon={<UserOutlined />}
                    />
                  ))}
              </Avatar.Group>
            </>
          )}
        </Space>
        <div>
          <Status
            colorClass="bg-primary-yellow"
            text={getCurrentProject.status_name}
          />
          <Status colorClass="bg-primary-red" text="Draft" />
          <Status
            colorClass="bg-primary-purple"
            text={"Addendum Ke-" + getCurrentProject.number_adendum}
          />
        </div>
      </div>
    </Card>
  );
}

const mapStateToProps = (state) => {
  return {
    getCurrentProject: getCurrentProject(state),
    getCurrentProjectLoading: getCurrentProjectLoading(state),
    getCurrentProjectError: getCurrentProjectError(state),
    tim_audit: getCurrentTimAudit(state),
  };
};

const mapDispachToProps = {
  currentProject: currentProject,
};

export default connect(mapStateToProps, mapDispachToProps)(CardProjectEWP);
