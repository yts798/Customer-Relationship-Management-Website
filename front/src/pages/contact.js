import React from 'react'
import axios from '../commons/axios.js'
import ContactPendingBrief from '../components/contactPendingBrief.js'
import ContactBrief from '../components/contactAcceptBrief.js'
import { Menu, Badge, Typography } from 'antd';
import { UserOutlined, UserAddOutlined, SearchOutlined } from '@ant-design/icons';
import { Layout } from 'antd';
import { Row, Col, Space, Spin } from 'antd';
import Cookies from 'js-cookie';
import { Avatar } from 'antd';
import { message } from 'antd';
import { Input } from 'antd';
import { Select } from 'antd';
import { MenuItem } from 'rc-menu'





export default class Contact extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            acceptContact: [], pendingContact: [], detailLoading: true,
            profileLoading: true, Detail: undefined, searchOption: 'Email', profile: [],
            searchDisplay: [], showStatus: 0, length: 0
        }
    }

    componentDidMount() {
        const home = '/dashboard'
        // connect contact back-end and seting contact list information
        axios.get(home + '/contact').then(response => {

            if (response.data.success) {
                this.setState({ acceptContact: response.data.accepted })
                this.setState({ pendingContact: response.data.pending })
                this.setState({ length: response.data.pending.length })
                this.setState({ detailLoading: false })
            }
        }).catch(error => {
            console.log(error.response.data.error)
            message.error(error.response.data.error)
        })

        axios.get(home).then(response => {
            if (response.data.success) {
                this.setState({ profile: response.data.user })
                this.setState({ profileLoading: false })
            }
        }).catch(error => {
            console.log(error.response.data.error)
            message.error(error.response.data.error)
        })
    }



    render() {
        const { Search } = Input;
        const { Text } = Typography;
        const { SubMenu } = Menu;
        const { Header, Content, Sider } = Layout;
        const { Option } = Select;
        const { acceptContact, pendingContact, detailLoading,
            profileLoading, Detail, searchOption, profile,
            searchDisplay, showStatus, length } = this.state;

        const home = '/dashboard'
        // logout function
        const OnLogOut = () => {
            Cookies.remove('token')
            this.props.history.push('/login');
        }

        const setSearch = e => {
            this.setState({ searchOption: e })
        }

        // Search function 
        const onSearch = e => {
            e = e.toLowerCase()
            if (e !== '') {
                let searchList = [];
                if (searchOption === 'Email') {
                    searchList = acceptContact.filter(contact =>
                        contact.friend.email.toString().toLowerCase().includes(e)
                    );
                }
                else if (searchOption === 'Name') {
                    searchList = acceptContact.filter(contact =>
                        contact.friend.givenName.toString().toLowerCase().includes(e) ||
                        contact.friend.familyName.toString().toLowerCase().includes(e)
                    );
                }
                else if (searchOption === 'Remark') {
                    searchList = acceptContact.filter(contact =>
                        contact.remark.toString().toLowerCase().includes(e)
                    );
                }
                else if (searchOption === 'UserID') {
                    searchList = acceptContact.filter(contact =>
                        contact.friend.userID.toString().toLowerCase().includes(e)
                    );
                }
                else if (searchOption === 'Tag') {
                    searchList = searchTag(acceptContact, e);
                }
                this.setState({ searchDisplay: searchList });
            }
        };

        // Search tag
        const searchTag = (allFriendList, e) => {
            var searchList = [];
            allFriendList.map(contact => {
                contact.tag.map(tag => {
                    if (tag.toLowerCase().includes(e)) {
                        searchList.push(contact)
                    }
                    return tag;
                })
                return contact;
            })
            return searchList;
        };

        // Get the tags from component
        const getTags = (tags, id) => {
            let newContacts = this.state.acceptContact.map(contact => {
                if (contact._id === id) {
                    contact.tag = tags
                }
                return contact
            })
            this.setState({ acceptContact: newContacts })
        }

        // Get the remark from component
        const getRemark = (remark, id) => {
            let newContacts = this.state.acceptContact.map(contact => {
                if (contact._id === id) {
                    contact.remark = remark
                }
                return contact
            })
            this.setState({ acceptContact: newContacts })
        }

        // Get accept friend from component
        const getAcceptFriend = () => {
            this.setState({ detailLoading: true })
            const home = '/dashboard'
            // Connect contact back-end and seting contact list information
            axios.get(home + '/contact').then(response => {

                if (response.data.success) {
                    console.log(response.data.accepted)
                    this.setState({
                        acceptContact: response.data.accepted,
                        pendingContact: response.data.pending,
                        length: response.data.pending.length,
                        Detail: undefined,
                        showStatus: 0
                    },
                        () => { this.setState({ detailLoading: false }) })

                }
            }).catch(error => {
                console.log(error.response.data.error)
                message.error(error.response.data.error)
            })
        }

        // Get reject friend request from component
        const getRejectFriend = (id) => {
            var newPendingContact = pendingContact.filter(contact => contact.user._id !== id);
            this.setState({ pendingContact: newPendingContact });
            this.setState({ Detail: undefined })
            this.setState({ showStatus: 0 })
        }

        // Get Delete friend request from component
        const getDeleteFriend = (id) => {
            var newAcceptContact = acceptContact.filter(contact => contact._id !== id);
            this.setState({ Detail: undefined })
            this.setState({ showStatus: 0 })
            this.setState({ acceptContact: newAcceptContact });
        }


        const contentDetail = (Detail, status) => {
            this.setState({ Detail: Detail.id });
            this.setState({ showStatus: status });
        }

        // separate each contact list with index
        const renderContact = () => {
            if (Detail === undefined) {
                return (<div> </div>)
            }

            // decide show detail showed for pending contact or accepting contact
            if (showStatus === 2) {
                var showedAcceptedcontact = undefined;
                acceptContact.map(contact => {
                    if (contact.friend._id === Detail) {
                        showedAcceptedcontact = contact
                    }
                    return contact;
                })
                return (
                    <ContactBrief key={showedAcceptedcontact._id} contact={showedAcceptedcontact}
                        sendTags={getTags} sendRemark={getRemark} sendDelete={getDeleteFriend} />);
            }
            // pending contact
            else if (showStatus === 1) {
                var showedPendingContact = undefined;
                pendingContact.map(contact => {
                    if (contact.user._id === Detail) {
                        showedPendingContact = contact
                    }
                    return contact;
                })
                return (
                    <ContactPendingBrief
                        key={showedPendingContact.user._id}
                        contact={showedPendingContact}
                        sendAccept={getAcceptFriend}
                        sendReject={getRejectFriend}
                    />
                )
            }
        }


        // loading page if waiting 
        if (detailLoading || profileLoading) {
            return <Space size="middle" style={{ position: 'relative', marginLeft: '50vw', marginTop: '50vh' }}>
                <Spin size="large" />
                <h3>Loading</h3>
            </Space>;
        }
        else {
            // render contact page
            return (
                <Layout>
                    <Header style={{ padding: '0 10px' }}>
                        <Row style={{ height: "64px" }}>
                            <Col span={2} offset={1}>
                                <a href={home}>
                                    <div>
                                        <img src='/../pics/logo_bee.png' alt='logo_bee' style={{ height: '64px', padding: '6px' }} />
                                    </div>
                                </a>
                            </Col>
                            <Col span={12}>
                                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['contact']} style={{ height: '64px' }}>
                                    <Menu.Item key="dashboard">
                                        <a href={home}>
                                            <img src='/../pics/user_icon.png' alt='profile_icon' style={{ height: '24px', verticalAlign: 'middle' }} />
                                            <span style={{ verticalAlign: 'middle', paddingLeft: '10px' }}>Profile</span>
                                        </a>
                                    </Menu.Item>

                                    <Menu.Item key="contact">
                                        <a href={home + '/contact'}>
                                            <img src='/../pics/contact_icon.png' alt='contact_icon' style={{ height: '24px' }} />
                                            <span style={{ verticalAlign: 'middle', paddingLeft: '10px' }}>Contact</span>
                                        </a>
                                    </Menu.Item>

                                    <Menu.Item key="search">
                                        <a href={home + '/search'}>
                                            <img src='/../pics/AddFriend.png' alt='AddFriend' style={{ height: '19px' }} />
                                            <span style={{ verticalAlign: 'middle', paddingLeft: '10px' }}>Search</span>
                                        </a>
                                    </Menu.Item>
                                    <Menu.Item key='changeinfo'>
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
                    <Layout style={{ padding: '2vh 2vh', paddingRight: '2vh', backgroundImage: 'url("/../pics/background1.jpg")', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
                        <Sider width={'405px'} style={{ background: '#fff', height: '100vh', overflow: 'auto'}}>
                            <Menu
                                mode="inline"
                            >
                                <SubMenu key="3" icon={<SearchOutlined />} title="Search friend">
                                    <MenuItem key="4" style={{ paddingLeft: '10px' }}>
                                        <Input.Group compact style={{ alignSelf: 'center', padding: '10px 20px' }}>
                                            <Select defaultValue="Email" onChange={setSearch} style={{ width: "90px" }}>
                                                <Option value="Email">Email</Option>
                                                <Option value="UserID">UserID</Option>
                                                <Option value="Remark">Remark</Option>
                                                <Option value="Name">Name</Option>
                                                <Option value="Tag">Tag</Option>
                                            </Select>
                                            <Search style={{ width: "250px" }}
                                                placeholder="Search to Select"
                                                onSearch={onSearch}
                                            />
                                        </Input.Group>
                                    </MenuItem>
                                    {searchDisplay.map(contact => <Menu.Item icon={
                                        <Avatar icon={<Avatar src={contact.friend.photo.data} />} key={contact.friend._id} />
                                    } style={{ paddingLeft: '20px' }}>
                                        <div
                                            onClick={e => contentDetail(e.target, 2)}
                                            id={contact.friend._id}
                                        >
                                            {contact.friend.givenName}
                                            <Text
                                                type="secondary"
                                                style={{ margin: '5px' }}
                                                id={contact.friend._id}
                                                onClick={e => contentDetail(e.target, 2)}
                                            >
                                                {contact.remark}
                                            </Text>

                                        </div>
                                    </Menu.Item>)}
                                </SubMenu>
                                <SubMenu key="sub1" icon={<Badge count={length} size="small" offset={[2, -1]}>
                                    <UserAddOutlined />

                                </Badge>}
                                    title="New friend"
                                >
                                    {pendingContact.map((contact, index) => <Menu.Item key={contact.user._id} icon={
                                        <Avatar src={contact.user.photo.data} />} style={{ paddingLeft: '20px', height: '50px' }}  >
                                        <div
                                            onClick={e => contentDetail(e.target, 1)}
                                            id={contact.user._id}
                                        >
                                            <Text
                                                type="secondary"
                                                style={{ margin: '5px', fontWeight: 'bold' }}
                                                id={contact.user._id}
                                                onClick={e => contentDetail(e.target, 1)}

                                            >
                                                {contact.user.givenName + ' ' + contact.user.familyName}
                                            </Text>
                                            <Text
                                                type="secondary"
                                                style={{ margin: '5px' }}
                                                id={contact.user._id}
                                                onClick={e => contentDetail(e.target, 1)}
                                            >
                                                {contact.user.email}
                                            </Text>

                                        </div>
                                    </Menu.Item>)}

                                </SubMenu>
                                <SubMenu key="sub2" icon={<UserOutlined />} title="My friend">
                                    {acceptContact.map((contact, index) => <Menu.Item key={contact.friend._id} icon={
                                        <Avatar src={contact.friend.photo.data} id={contact.friend._id} />
                                    } style={{ paddingLeft: '20px' }}>
                                        <div
                                            id={contact.friend._id}
                                            onClick={e => contentDetail(e.target, 2)}
                                        >
                                            {contact.friend.givenName}
                                            <Text
                                                type="secondary"
                                                style={{ margin: '5px' }}
                                                id={contact.friend._id}
                                                onClick={e => contentDetail(e.target, 2)}
                                            >
                                                {contact.remark}
                                            </Text>
                                        </div>
                                    </Menu.Item>)}
                                </SubMenu>
                            </Menu>
                        </Sider>
                        <Content style={{ minHeight: 280, backgroundColor: 'rgba(255, 255, 255, 0.5)', padding: '2vw 2vw' }}>
                            {renderContact()}
                        </Content>
                    </Layout>
                </Layout>
            )
        }
    }
}