import React from 'react';
import 'antd/dist/antd.css';
import { Layout, Menu, Card, Descriptions } from 'antd';
import { Avatar } from 'antd';
import axios from '../commons/axios.js';
import { Row, Col, Space, Spin } from 'antd';
import { message } from 'antd';
import Cookies from 'js-cookie';


export default class Dashboard extends React.Component {
    constructor(props) {
        super(props)
        this.state = { profile: undefined, loading: true };
    }

    componentDidMount() {
        const home = '/dashboard';
        axios.get(home, {
            headers: {
                Authorization: `Bearer ${Cookies.get('token')}`
            }
        }).then(response => {
            if (response.data.success) {
                this.setState({ profile: response.data.user, loading: false });
            }
        }).catch(error => {
            console.log(error.response.data.error)
            message.error(error.response.data.error);
            this.props.history.push('/login', { replace: true });
        })
    }



    render() {
        const OnLogOut = () => {
            Cookies.remove('token');
            this.props.history.push('/login', { replace: true });
        }

        // Define the variable
        const { Header, Content } = Layout;
        const { profile, loading } = this.state;
        const { Meta } = Card;
        const home = '/dashboard';
        if (loading) {
            return <Space size='middle' style={{ position: 'relative', marginLeft: '50vw', marginTop: '50vh' }}>
                <Spin size='large' />
                <h3>Loading</h3>
            </Space>;
        }




        return (
            <Layout>
                <Header style={{ padding: '0 10px' }}>
                    <Row style={{ height: '64px' }}>
                        <Col span={2} offset={1}>
                            <a href={home}>
                                <div>
                                    <img src='/../pics/logo_bee.png' alt='logo_bee' style={{ height: '64px', padding: '6px' }} />
                                </div>
                            </a>
                        </Col>
                        <Col span={12}>
                            <Menu theme='dark' mode='horizontal' defaultSelectedKeys={['1']} style={{ height: '64px' }}>
                                <Menu.Item key='1'>
                                    <a href={home}>
                                        <img src='../pics/manage1.png' alt='profile_icon' style={{ height: '28px', verticalAlign: 'middle' }} />
                                        <span style={{ verticalAlign: 'middle', paddingLeft: '10px' }}>Profile</span>
                                    </a>
                                </Menu.Item>

                                <Menu.Item key='2'>
                                    <a href={home + '/contact'}>
                                        <img src='../pics/friend.png' alt='contact_icon' style={{ height: '24px' }} />
                                        <span style={{ verticalAlign: 'middle', paddingLeft: '10px' }}>Contact</span>
                                    </a>
                                </Menu.Item>

                                <Menu.Item key='3'>
                                    <a href={home + '/search'}>
                                        <img src='../pics/af1.png' alt='AddFriend' style={{ height: '26px' }} />
                                        <span style={{ verticalAlign: 'middle', paddingLeft: '10px' }}>Search</span>
                                    </a>
                                </Menu.Item>

                                <Menu.Item key='4'>
                                    <a href={home + '/changeinfo'}>
                                        <img src='../pics/edit.png' alt='ManageProfile' style={{ height: '28px' }} />
                                        <span style={{ verticalAlign: 'middle', paddingLeft: '10px' }}>Manage Profile</span>
                                    </a>
                                </Menu.Item>

                            </Menu>
                        </Col>
                        <Col span={5}>
                            <div style={{ float: 'right' }}>
                                <Avatar src={profile.photo.data} />
                                <span style={{ color: 'white', verticalAlign: 'middle', paddingLeft: '10px' }}>
                                    {profile.email}
                                </span>
                            </div>
                        </Col>
                        <Col span={4} style={{ padding: "0 10px" }}>
                            <Menu theme="dark" mode="horizontal" style={{ height: '64px' }}>
                                <Menu.Item key='logout'>
                                    <div onClick={() => OnLogOut()}>
                                        <img src='/../pics/logout.png' alt='AddFriend' style={{ height: '28px' }} />
                                        <span style={{ color: 'white', verticalAlign: 'middle', paddingLeft: '10px' }}>
                                            Log Out
                                        </span>
                                    </div>
                                </Menu.Item>
                            </Menu>
                        </Col>
                    </Row>
                </Header>
                <Layout>
                    <Content style={{ padding: '0 5vw', backgroundImage: 'url("../pics/background2.jpg")', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
                        <div style={{ minHeight: '100vh', backgroundColor: 'rgba(255, 255, 255, 0.9)', padding: '2vw', marginTop: '2vh' }}>

                            <div id='left' style={{ width: '10vw', float: 'left', paddingLeft: '5vw', paddingTop: '5vh' }}>
                                <div style={{ paddingLeft: '3vw' }}>
                                    <Avatar size={140} src={profile.photo.data} />
                                </div>

                                <br />
                                <br />
                                <br />
                                <a href={home + '/contact'}>
                                    <Card
                                        hoverable
                                        style={{ width: 240 }}
                                        cover={<img alt="example" src="https://blmparis.files.wordpress.com/2014/07/angle.jpg" />}
                                    >
                                        <Meta title="Welcome!" description="Click to add new friend!" />
                                    </Card>
                                </a>
                            </div>

                            <div id='right' style={{ width: '60vw', float: 'right', paddingTop: '3vh', paddingRight: '10vw' }}>

                                <span style={{ color: 'black', verticalAlign: 'middle', fontSize: '65px' }}>
                                    Hi!&nbsp;{profile.givenName}&nbsp;{profile.familyName}
                                </span>

                                <Descriptions layout="vertical" style={{ paddingTop: '8vh' }} bordered>
                                    <Descriptions.Item label="UserID">{profile.userID}</Descriptions.Item>
                                    <Descriptions.Item label="Name" span={2}>{profile.givenName + " " + profile.familyName}</Descriptions.Item>

                                    <Descriptions.Item label="Mobile number">{profile.mobile}</Descriptions.Item>
                                    <Descriptions.Item label="Email" span={2}>{profile.email}</Descriptions.Item>

                                    <Descriptions.Item label="Company">{profile.company}</Descriptions.Item>
                                    <Descriptions.Item label="Region" span={2}>{profile.region.country + " " + profile.region.state + " " + profile.region.city}</Descriptions.Item>

                                    <Descriptions.Item label="Occupation">{profile.occupation}</Descriptions.Item>
                                    <Descriptions.Item label="Date of Birth">{profile.dob.year + '-' + profile.dob.month + '-' + profile.dob.date}</Descriptions.Item>
                                    <Descriptions.Item label="Gender">{profile.gender}</Descriptions.Item>

                                    <Descriptions.Item label="introduction">{profile.introduction}</Descriptions.Item>
                                </Descriptions>
                            </div>



                        </div>
                    </Content>
                </Layout >
            </Layout >
        );
    }

};
