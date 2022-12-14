import { history, Outlet } from 'umi';
import cookie from 'js-cookie';
import React, { useMemo } from 'react';
import { CalendarFilled, BellFilled, SearchOutlined, CloseOutlined } from '@ant-design/icons';
import _ from 'lodash';
import { Avatar, Badge, Breadcrumb, Button, Col, ConfigProvider, Divider, Image, Input, Layout, Menu, Row, Space, Typography } from 'antd';
import type { MenuProps } from 'antd';

const { Header, Content, Sider } = Layout;

const sideMenu: MenuProps['items'] = [{
    icon: <CalendarFilled />,
    label: 'Process Booking'
}, {
    icon: <CalendarFilled />,
    label: 'Medical Center'
}, {
    icon: <CalendarFilled />,
    label: 'Doctor'
}, {
    icon: <CalendarFilled />,
    label: 'Institution'
}, {
    icon: <CalendarFilled />,
    label: 'Expense Claims'
}, {
    icon: <CalendarFilled />,
    label: 'Medical Claims'
}, {
    icon: <CalendarFilled />,
    label: 'Admintration'
}].map(
    (item, index) => {
        return {
            key: _.snakeCase(item.label),
            icon: item.icon,
            label: item.label,
        };
    },
);

export default function DashboardLayout() {
    return (
        <ConfigProvider theme={{
            token: {
                colorPrimary: '#00B2B6',
                colorLink: '#00B2B6',
                borderRadius: 14
            },
        }}>
            <Layout style={{ margin: -8 }}>
                <Header className="header" style={{ backgroundColor: 'white' }}>
                    <Row align="middle" justify="space-between">
                        <Col>
                            <Button icon={<CloseOutlined />} type="ghost" />
                            <Image
                                width={180}
                                src={require('../assets/logo.png')}
                            />
                        </Col>
                        <Col>
                            <Space size="large">
                                <Input placeholder='Search here...' size="large" bordered={false} style={{ backgroundColor: '#f1f2f3', borderRadius: 50 }} suffix={<SearchOutlined />} />
                                <Badge dot>
                                    <BellFilled style={{ fontSize: 18 }} />
                                </Badge>
                                <Divider type='vertical' orientation='center' />
                                <Space size="middle">
                                    <Typography.Text strong style={{ fontSize: 14 }}>Hi, John</Typography.Text>
                                    <Avatar size="large" style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>J</Avatar>
                                </Space>
                            </Space>
                        </Col>
                    </Row>
                </Header>
                <Layout style={{ margin: 24, marginBottom: 0 }}>
                    <Sider width={240} theme="light" style={{ borderRadius: 14 }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', paddingTop: 24 }}>
                            <Avatar size={84} style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>J</Avatar>
                            <Typography.Title level={4} style={{ marginBottom: 0 }}>John William</Typography.Title>
                            <Button type='link'>User Account</Button>
                        </div>
                        <Divider />
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={['process_booking']}
                            style={{ height: '100%', borderRight: 0, paddingLeft: 10, paddingRight: 10 }}
                            items={sideMenu}
                        />
                    </Sider>
                    <Layout style={{ padding: '0 24px' }}>
                        <Content>
                            <Outlet />
                        </Content>
                    </Layout>
                </Layout>
            </Layout></ConfigProvider>)
}