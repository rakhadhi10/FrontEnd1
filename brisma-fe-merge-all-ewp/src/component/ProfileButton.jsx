import { Dropdown, Button, Menu, Avatar } from "antd";
import React from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logOut } from "../store/ducks/auth/actions";
import { getUserJabatan, getUserName, getUserPN, getUserUkaName } from "../store/ducks/auth/selectors";

const ProfileMenu = ({ name, jabatan, unit_kerja, logout, navigate }) => (
  <Menu>
    <Menu.Item key="0" className="hover:bg-white cursor-default">
      <p>{name}</p>
    </Menu.Item>
    <Menu.Item key="1" className="hover:bg-white cursor-default">
      <p>{jabatan}</p>
    </Menu.Item>
    <Menu.Item key="2" className="hover:bg-white cursor-default">
      <p>{unit_kerja}</p>
    </Menu.Item>
    <Menu.Item
      key="3"
      onClick={() => navigate("/dashboard")}
      className="hover:bg-primary-blue"
    >
      <p className="text-primary-blue hover:text-white">Back to Dashboard</p>
    </Menu.Item>
    <Menu.Item
      key="4"
      danger
      onClick={() => {
        logout()
      }}
    >
      <p>Logout</p>
    </Menu.Item>
  </Menu>
);

const ProfileButton = (props) => {
  const navigate = useNavigate()

  return (
    <div className="flex items-center">
      <Dropdown
        overlay={ProfileMenu({ ...props, navigate })}
        trigger={["click"]}
      >
        <Button
          icon={<Avatar />}
          ghost
          shape="circle"
          style={{ border: "none" }}
          className="flex items-center"
        />
      </Dropdown>
    </div>
  );
};

const mapStateToProps = state => ({
  name: `${getUserPN(state)} - ${getUserName(state)}`,
  jabatan: getUserJabatan(state),
  unit_kerja: getUserUkaName(state)
})

const mapDispatchToProps = {
  logout: logOut
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileButton)