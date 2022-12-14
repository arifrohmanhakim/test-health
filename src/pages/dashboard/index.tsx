import { Button, Card, Col, DatePicker, Dropdown, Input, Layout, Row, Select, Space, Tag, Typography, theme, Table } from "antd";
import { history } from "umi";
import { CheckCircleFilled, SearchOutlined, MessageFilled, CloseCircleFilled } from '@ant-design/icons';
import { useEffect, useState } from "react";
import _ from "lodash";

const { useToken } = theme;
const style = {
    padding: 8, paddingRight: 12, paddingLeft: 12, borderRadius: 50, display: 'flex', alignItems: 'center', gap: 6, backgroundColor: 'transparent'
}

export default function DashboardPage() {
    const { token } = useToken();
    const [results, setResults] = useState(null);

    useEffect(() => {
        setTimeout(() => {
            let re = []
            for (let index = 0; index < 10; index++) {
                re.push({
                    no: '83243',
                    patient_name: 'Ahemd Salim',
                    doctors: 'Dr. Laila Taher',
                    speciality: 'Orthopedic',
                    level: '',
                    center_name: 'Hekma Hospital',
                    city: 'Misurata',
                    phone: '0913222444',
                    city_info: 'Sat: Morning - 14 may 2022',
                    appt_time: '30 Dinars',
                    appt_price: '30 Dinars',
                    notes: 'Another doctor on same day is fine',
                    status: _.eq(index, 2) ? 'refused' : _.eq(index, 4) ? 'approved' : 'new'
                })
            }
            setResults(re)
        }, 3000);
    }, [])

    const columns: any = [
        {
            title: 'ID No.',
            dataIndex: 'no',
            key: 'no',
        }, {
            title: 'Patient Name',
            dataIndex: 'patient_name',
            key: 'patient_name',
        }, {
            title: 'Doctors',
            dataIndex: 'doctors',
            key: 'doctors',
        }, {
            title: 'Speciality',
            dataIndex: 'speciality',
            key: 'speciality',
        }, {
            title: 'Level',
            dataIndex: 'level',
            key: 'level',
        }, {
            title: 'Center Name',
            dataIndex: 'center_name',
            key: 'center_name',
        }, {
            title: 'District/City',
            dataIndex: 'city',
            key: 'city',
        }, {
            title: 'Center Info',
            dataIndex: 'city_info',
            key: 'city_info',
        }, {
            title: 'Appt. Time',
            dataIndex: 'appt_time',
            key: 'appt_time',
        }, {
            title: 'Appt. Price',
            dataIndex: 'appt_price',
            key: 'appt_price',
        }, {
            title: 'Notes',
            dataIndex: 'notes',
            key: 'notes',
        }, {
            title: 'Actions',
            dataIndex: 'no',
            key: 'action',
            render: (val, item) => {
                if (_.eq(item.status, 'approved')) return (<Space size="middle"><CheckCircleFilled style={{ color: token.colorSuccess }} /> Approved by User</Space>);
                if (_.eq(item.status, 'refused')) return (<Space align="center" size="middle"><CloseCircleFilled style={{ color: token.colorError }} /> Refused by User</Space>);
                return (
                    <Space>
                        <Button size="small">Modify</Button>
                        <Button size="small" danger>Refuse</Button>
                        <Button size="small">Accept</Button>
                        <Button icon={<MessageFilled style={{ color: token.colorPrimary }} />} type="ghost" />
                    </Space>
                )
            }
        }
    ];

    return (
        <Space size="large" style={{ width: '100%' }} direction="vertical">
            <Card>
                <Space size="large" direction="vertical">
                    <Space direction="vertical">
                        <Typography.Title level={4} style={{ marginTop: 0 }}>Filter</Typography.Title>
                        <Row gutter={6}>
                            <Col>
                                <Tag style={{ ...style, borderColor: token.colorPrimary }}>
                                    <CheckCircleFilled style={{ fontSize: 20, color: token.colorPrimary }} />
                                    Booking Date Range
                                </Tag>
                            </Col>
                            <Col>
                                <Tag style={{ ...style, borderColor: token.colorPrimary }}>
                                    <CheckCircleFilled style={{ fontSize: 20, color: token.colorPrimary }} />
                                    Processed Request
                                </Tag></Col>
                            <Col>
                                <Tag style={{ ...style }}>
                                    <CheckCircleFilled style={{ fontSize: 20, color: '#ddd' }} />
                                    Unprocessed Request
                                </Tag></Col>
                            <Col>
                                <Tag style={{ ...style, borderColor: token.colorPrimary }}>
                                    <CheckCircleFilled style={{ fontSize: 20, color: token.colorPrimary }} />
                                    Filter by Health Center
                                </Tag>
                            </Col>
                            <Col>
                                <Input placeholder='Search here...' size="large" bordered={false} style={{ backgroundColor: '#f1f2f3', borderRadius: 50 }} suffix={<SearchOutlined />} />
                            </Col>
                        </Row>
                    </Space>
                    <Row gutter={14}>
                        <Col span={10}>
                            <Space direction="vertical">
                                <Typography.Text>Date Range</Typography.Text>
                                <Space>
                                    <DatePicker /> <span>To</span><DatePicker />
                                </Space>
                            </Space>
                        </Col>
                        <Col span={6}>
                            <Space direction="vertical">
                                <Typography.Text>Sort by Booking Date</Typography.Text>
                                <Select defaultValue="last_7d" options={[{ value: 'last_7d', label: 'last 7 days' }]} />
                            </Space>
                        </Col>
                        <Col span={8}>
                            <Space direction="vertical">
                                <Typography.Text>Search list of Health centers</Typography.Text>
                                <Select defaultValue="1" options={[{ value: '1', label: 'Search list of health centers' }]} />
                            </Space>
                        </Col>
                    </Row>
                </Space>
            </Card>
            <Typography.Title level={3} style={{ margin: 0 }}>52 Requests</Typography.Title>
            <Table columns={columns} dataSource={results || []} loading={_.isNil(results)} />
        </Space>
    );
}
