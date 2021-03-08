import { ReactNode, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Layout, Menu, Breadcrumb } from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
  CodeOutlined,
} from '@ant-design/icons';

const { Header, Sider, Content, Footer } = Layout;

type BreadCrumb = {
  name: string;
  href: string;
}[];

const Main = ({
  children,
  breadCrumb,
  defaultSelectedKeys,
}: {
  children: ReactNode;
  breadCrumb: BreadCrumb;
  defaultSelectedKeys: string[];
}) => {
  const [collapsed, setCollapsed] = useState<boolean>(false);

  const onCollapse = (collapsed: any) => {
    setCollapsed(collapsed);
  };

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width, maximum-scale=1"
        />
      </Head>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={onCollapse}
          breakpoint="lg"
          collapsedWidth="0"
        >
          <div
            className="logo"
            style={{
              height: '32px',
              margin: '16px',
              color: '#fff',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontWeight: 700,
            }}
          >
            <CodeOutlined />{' '}
            {!collapsed && (
              <span style={{ marginLeft: '10px' }}> LÝ THUYẾT MẬT MÃ</span>
            )}
          </div>
          <Menu
            theme="dark"
            defaultSelectedKeys={defaultSelectedKeys}
            mode="inline"
          >
            <Menu.Item key="1" icon={<PieChartOutlined />}>
              <Link href="/">Mã dịch vòng (Shift Cipher)</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<DesktopOutlined />}>
              <Link href="/substitution-cipher">
                Mã thay thế (Substitution Cipher)
              </Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<DesktopOutlined />}>
              <Link href="/gcd">GCD (Thuật toán Euclid)</Link>
            </Menu.Item>
            <Menu.Item key="4" icon={<DesktopOutlined />}>
              <Link href="/phi">Φ (Phi)</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ padding: 0, background: '#fff' }} />
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              {breadCrumb.map((el) => (
                <Breadcrumb.Item key={el.name}>
                  <Link href={el.href}>{el.name}</Link>
                </Breadcrumb.Item>
              ))}
            </Breadcrumb>
            <div style={{ padding: 24, minHeight: 360, background: '#fff' }}>
              {children}
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Lý thuyết mật mã © {new Date().getFullYear()} Dương Nam Trường
          </Footer>
        </Layout>
      </Layout>
    </>
  );
};

export default Main;
