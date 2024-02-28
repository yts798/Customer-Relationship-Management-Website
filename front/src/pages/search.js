import React from 'react';
import 'antd/dist/antd.css';
import { Layout, Menu, Card, Divider, message } from 'antd';
import TextField from '@material-ui/core/TextField';


import { SearchOutlined, UserAddOutlined, CloseOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import axios from '../commons/axios.js';
import { Row, Col, Space, Spin, Carousel } from 'antd';
import Cookies from 'js-cookie';


export default class AddFriend extends React.Component {


    constructor(props) {
        super(props)
        this.state = { profile: undefined, loading: true, result: undefined, visible: false, myremark: "", mysearch: "", mymsg: "" };
    }


    componentDidMount() {
        const home = "/dashboard";
        axios.get(home).then(response => {
            if (response.data.success) {
                this.setState({ profile: response.data.user, loading: false });
            }
        }).catch(error => {
            this.props.history.push('/login');
        })
    }

    render() {
        const OnLogOut = () => {
            Cookies.remove('token')
            this.props.history.push('/login');
        }

        // style const
        const { Header, Content } = Layout;
        const { Meta } = Card;
        const { profile, loading, result, visible, myremark, mysearch, mymsg } = this.state;

        const contentStyle = {
            height: '160px',
            color: '#63c',
            lineHeight: '160px',
            textAlign: 'center',
            background: 'rgba(255, 255, 255, 0.13)',
        };

        const home = "/dashboard";
        if (loading) {
            return <Space size="middle" style={{ position: 'relative', marginLeft: '50vw', marginTop: '50vh' }}>
                <Spin size="large" />
                <h3>Loading</h3>
            </Space>;
        }



        // perform send friend request functionality
        const sendRequest = () => {
            axios.post(home + '/addFriend', { friend: result._id, remark: myremark, message: mymsg }).then(res => {
                if (res.data.success) {
                    message.success("request successfully")
                }
                else {

                    message.error(res.data.error)
                }
            }).catch(error => {
                console.log(error.response.data.error)
                message.error(error.response.data.error)
                // or throw(error.respond)
            })

        }

        // perform set friend remark functionality
        const setRemark = event => {
            this.setState({
                myremark: event.target.value
            });

        }

        // helper function of search
        const setSearch = event => {
            this.setState({
                mysearch: event.target.value
            });

        }

        // helper function of write verify message
        const setmsg = event => {
            this.setState({
                mymsg: event.target.value
            });

        }

        //perform search functionality
        const onSearch = () => {

            axios.post(home + '/search', { userID: mysearch }).then(res => {
                // sucessful scenario
                if (res.data.success) {
                    message.success("search sucessfully")
                    this.setState({ result: res.data.user });
                    this.setState({ visible: true })
                }
                // failed scenario
                else {
                    message.error(res.data.error)
                }
            }).catch(error => {
                message.error(error.response.data.error)
                console.log(error.response.data.error)
                // or throw(error.respond)
            })


        }

        // Close the search resulut
        const onClose = () => {
            this.setState({
                visible: false,
            });
        };

        return (

            <Layout >
                <Header style={{ padding: '0 10px' }}>
                    <Row style={{ height: "64px" }}>
                        <Col span={2} offset={1}>
                            <a href={home}>
                                <div>
                                    <img src="/../pics/logo_bee.png" alt="logo_bee" style={{ height: '64px', padding: '6px' }} />
                                </div>
                            </a>
                        </Col>
                        <Col span={12}>
                            <Menu theme='dark' mode='horizontal' defaultSelectedKeys={['3']} style={{ height: '64px' }}>
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
                <Layout style={{ padding: '2vh 2vh', paddingRight: '2vh', backgroundImage: 'url("/../pics/background23.jpg")', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', }}>



                    <Content style={{ padding: '0 5vw' }}>
                        <div style={{ minHeight: '100vh', backgroundColor: 'rgba(255, 255, 255, 0.5)', padding: '2vw', marginTop: '2vh' }}>
                            <Carousel effect="fade">
                                <div>
                                    <h3 style={contentStyle}>Hey, {profile.givenName}! ready to acquint another bee?</h3>
                                </div>
                                <div>
                                    <h3 style={contentStyle}>Ask for others New BEE ID before your search </h3>
                                </div>
                                <div>
                                    <h3 style={contentStyle}>Type the id into the search box and click search</h3>
                                </div>
                                <div>
                                    <h3 style={contentStyle}>Click add icon to send request or close the window</h3>
                                </div>
                            </Carousel>

                            <br />

                            <Divider />

                            <div align='center'>
                                <br />
                                <img src="/../pics/newbeesearch.png" alt="search_pic" style={{ height: '80px', padding: '6px' }} />
                                
                                <div display="inline">
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        size="medium"
                                        id="remark"
                                        label={'Search others by their ID '}
                                        name="search"
                                        onChange={setSearch}
                                        style={{ width: '85%' }}
                                    />
                                    <Avatar size={80} icon={<SearchOutlined />} style={{ color: 'black', background: 'rgba(255, 255, 255, 0)' }} onClick={onSearch} />
                                </div>

                            </div>
                            {showSearch()}
                        </div>
                    </Content>
                </Layout >
            </Layout >
        );

        // this funtion show the search result
        function showSearch() {

            if (!visible) {

                return;
            }
            return (
                <div align='center'>
                    <Card style={{ color: 'black', width: 600, /*height: 200*/ marginTop: 16, backgroundColor: 'rgba(255, 255, 255, 0)', borderColor: '#625B57' }}>
                        <div align='center' style={{ color: 'black', verticalAlign: 'middle', fontSize: '20px' }}>
                            You have find a bee!
                        </div>
                        <br />
                        <div align='center'>
                            <Card style={{ color: 'black', width: 550, /*height: 200*/ marginTop: 16, backgroundColor: 'rgba(255, 255, 255, 0)', borderColor: '#625B57' }}>
                                <Meta
                                    avatar={
                                        <Avatar size={48} src={result.photo.data} />
                                    }
                                    title={result.givenName + ' ' + result.familyName}
                                    description={result.email}
                                />
                            </Card>
                        </div>
                        <br />
                        <br />
                        <div align='center' style={{ height: '60px' }}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                size="small"
                                id="remark"
                                label={'Accompany a message to introduce yourself!'}
                                name="msg"
                                onChange={setmsg}
                                style={{ width: 550, height: '40px' }}
                            />
                        </div>

                        <div display="inline">
                            <div align="left" style={{ height: '60px' }}>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    size="small"
                                    id="remark"
                                    label={'Set a remark!'}
                                    name="remark"
                                    onChange={setRemark}
                                    style={{ width: '30%', height: '40px' }}
                                />
                            </div>
                            <div align="right">
                                <Avatar size={50} icon={<CloseOutlined />} style={{ color: 'black', background: 'rgba(255, 255, 255, 0)' }} onClick={onClose} />
                                <Avatar size={50} icon={<UserAddOutlined />} style={{ color: 'black', background: 'rgba(255, 255, 255, 0)' }} onClick={sendRequest} />

                            </div>
                        </div>
                    </Card>
                </div>
            );

        }
    }


};
