import React, { useState } from "react";
import {
  PlusCircleOutlined,
  WalletFilled,
  HomeFilled,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout, Menu, theme } from "antd";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { polygonMumbai } from "wagmi/chains";

import Link from "next/link";

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const AppLayout = ({ children }: { children: React.ReactElement }) => {
  const [collapsed, setCollapsed] = useState(false);

  const { isConnected } = useAccount();
  const { connect } = useConnect({
    connector: new MetaMaskConnector(),
  });
  const { disconnect } = useDisconnect();

  function walletButton() {
    if (isConnected)
      return (
        <div>
          <p style={{ background: "transparent" }} onClick={() => disconnect()}>
            Disconnect
          </p>
        </div>
      );
    return <p onClick={() => connect()}>Connect Wallet</p>;
  }

  const items: MenuItem[] = [
    getItem(walletButton(), "1", <WalletFilled />),
    getItem(<Link href="/">Home</Link>, "2", <HomeFilled />),
    getItem(
      <Link href="/js-stamp">Mint JS Stamp</Link>,
      "3",
      <PlusCircleOutlined />
    ),
    getItem(
      <Link href="/solidity-stamp">Mint Solidity Stamp</Link>,
      "4",
      <PlusCircleOutlined />
    ),
    getItem(
      <Link href="/rust-stamp">Mint Rust Stamp</Link>,
      "5",
      <PlusCircleOutlined />
    ),
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <h3
          style={{
            padding: "12% 0",
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          Contribution Stamp
        </h3>

        <Menu
          selectable={false}
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0 }} />
        <Content style={{ margin: "0 auto", paddingTop: "5%" }}>
          {children}
        </Content>
        <Footer style={{ textAlign: "center" }}>
          ©2023 Created by Mohit Chandel
        </Footer>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
