import React from "react";
import { BiCube } from "react-icons/bi";
import { Layout, Menu } from "antd";

const { Sider } = Layout;

export const SidebarDashboard = ({ onClickMenu }) => {
  const handleClick = (e) => {
    onClickMenu(e.key);
  };

  return (
    <Sider width="240px" className="bg-primary-blue bg-opacity-5">
      <a
        href="/"
        className="font-lato font-bold text-primary-blue text-2xl flex justify-center pt-6 px-6"
      >
        LOGO
      </a>

      <Menu
        mode="inline"
        defaultActiveFirst
        className="bg-transparent"
        onClick={handleClick}
        defaultSelectedKeys="1"
      >
        <div className="pt-16 px-6 ">
          <p className="font-mulish font-bold text-primary-gray text-lg">
            BRISMA
          </p>
        </div>

        <Menu.Item
          key="1"
          icon={<BiCube size={20} />}
          className="text-secondary-light-black "
        >
          Dashboard
        </Menu.Item>
        <Menu.Item
          key="2"
          icon={<BiCube size={20} />}
          className="text-secondary-light-black "
        >
          PAT
        </Menu.Item>
        <Menu.Item
          key="3"
          icon={<BiCube size={20} />}
          className="text-secondary-light-black"
        >
          EWP
        </Menu.Item>
        <Menu.Item
          key="4"
          icon={<BiCube size={20} />}
          className="text-secondary-light-black focus:text-primary-blue font-mulish"
        >
          RPM
        </Menu.Item>
        <Menu.Item
          key="5"
          icon={<BiCube size={20} />}
          className="text-secondary-light-black focus:text-primary-blue font-mulish"
        >
          Human Resource
        </Menu.Item>
        <Menu.Item
          key="6"
          icon={<BiCube size={20} />}
          className="text-secondary-light-black focus:text-primary-blue font-mulish"
        >
          Aset & Logistics
        </Menu.Item>
        <Menu.Item
          key="7"
          icon={<BiCube size={20} />}
          className="text-secondary-light-black focus:text-primary-blue font-mulish"
        >
          References
        </Menu.Item>
        <Menu.Item
          key="8"
          icon={<BiCube size={20} />}
          className="text-secondary-light-black focus:text-primary-blue font-mulish"
        >
          Next Audit File
        </Menu.Item>

        <Menu.Divider
          style={{ height: "1px", backgroundColor: "gray", margin: "24px" }}
        />
        <div className=" px-6 ">
          <p className="font-mulish font-bold text-primary-gray text-lg">
            BRIDEX
          </p>
        </div>

        <Menu.Item
          key="8"
          icon={<BiCube size={20} />}
          className="text-secondary-light-black focus:text-primary-blue font-mulish"
        >
          Dashboard
        </Menu.Item>
        <Menu.Item
          key="9"
          icon={<BiCube size={20} />}
          className="text-secondary-light-black focus:text-primary-blue font-mulish"
        >
          APP
        </Menu.Item>
        <Menu.Item
          key="10"
          icon={<BiCube size={20} />}
          className="text-secondary-light-black focus:text-primary-blue font-mulish"
        >
          Maskings
        </Menu.Item>
        <Menu.Item
          key="11"
          icon={<BiCube size={20} />}
          className="text-secondary-light-black focus:text-primary-blue font-mulish"
        >
          Automatics
        </Menu.Item>
        <Menu.Item
          key="12"
          icon={<BiCube size={20} />}
          className="text-secondary-light-black focus:text-primary-blue font-mulish"
        >
          Approval
        </Menu.Item>
        <Menu.Item
          key="13"
          icon={<BiCube size={20} />}
          className="text-secondary-light-black focus:text-primary-blue font-mulish"
        >
          Configurations
        </Menu.Item>
        <Menu.Item
          key="14"
          icon={<BiCube size={20} />}
          className="text-secondary-light-black focus:text-primary-blue font-mulish"
        >
          Documentations
        </Menu.Item>
      </Menu>
    </Sider>
  );
};
