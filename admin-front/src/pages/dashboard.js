import React from 'react';
import 'antd/dist/antd.css';
import axios from '../commons/axios.js';
import { Row, Col, Button } from 'antd';
import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons';
import { Avatar, message, Divider, Typography, Table, Layout, Menu, Space, Spin } from 'antd';
import Cookies from 'universal-cookie';
import { Link } from 'react-router-dom'


export default class Dashboard extends React.Component {


  constructor(props) {
    super(props)
    this.state = { profile: undefined, loading: true, data: undefined };
  }

  componentDidMount() {
    const home = '/dashboard';
    const cookies = new Cookies();
    axios.get(home, {
      headers: {
        Authorization: `Bearer ${cookies.get('token')}`
      }

    }).then(response => {
      if (response.data.success) {
        console.log(response);
        this.setState({ data: response.data.users, loading: false, profile: response.data.admin });
      }
    }).catch(error => {
      console.log(error.response.data.error)
      message.error(error.response.data.error);
    })

  }



  render() {

    const OnLogOut = () => {
      const cookies = new Cookies();
      cookies.remove('token');
      this.props.history.push('/login', { replace: true });
    }
    // Define the variable
    const { Header, Content } = Layout;
    // remember to add loading back!
    const { loading, data, profile } = this.state;
    const home = '/dashboard';

    if (loading) {
      return <Space size='middle' style={{ position: 'relative', marginLeft: '50vw', marginTop: '50vh' }}>
        <Spin size='large' />
        <h3>Loading</h3>
      </Space>;
    }

    const OnUnban = (record) => {

      axios.post(home + '/unBanUser', { _id: record._id }).then(res => {
        if (res.data.success) {
          message.success("unban successfully")
        }
        else {
          message.error(res.data.error)
        }
      }).catch(error => {
        console.log(error.response.data.error)
        message.error(error.response.data.error)
        // or throw(error.respond)
      })

      let datalist = data.map(data => {
        if (record._id === data._id) {
          data.ban = false
        }
        return data;
      })
      this.setState({ data: [...datalist] })
    }

    const OnBan = (record) => {
      console.log("click ban");
      axios.post(home + '/banUser', { _id: record._id }).then(res => {
        if (res.data.success) {
          message.success("ban successfully")
          record.ban = true;

        }
        else {
          message.error(res.data.error)
        }
      }).catch(error => {
        console.log(error.response.data.error)
        message.error(error.response.data.error)
      })
      let datalist = data.map(data => {
        if (record._id === data._id) {
          data.ban = true;
        }
        return data;
      })
      this.setState({ data: [...datalist] })
    }

    const columns = [
      {
        title: 'Status',
        key: 'ban',
        render(record) {
          if (record.ban === true) {
            return (
              <div align='center'>
                <Avatar size={30} icon={<CloseCircleFilled />} style={{ color: 'red', background: 'rgba(255, 255, 255, 0)' }} />
              </div>
            )
          }
          else {
            return (
              <div align='center'>
                <Avatar size={30} icon={<CheckCircleFilled />} style={{ color: 'green', background: 'rgba(255, 255, 255, 0)' }} />
              </div>
            )
          }
        }
      },
      {
        title: 'User ID',
        dataIndex: 'userID',
      },
      {
        title: 'First Name',
        dataIndex: 'givenName',
      },
      {
        title: 'Last Name',
        dataIndex: 'familyName',

      },
      {
        title: 'Email',
        dataIndex: 'email',
      },
      {
        title: 'Action',
        key: 'action',
        render(record) {

          if (record.ban === true) {
            return (
              <div>
                <Link
                  to={
                    {
                      pathname: '/dashbord/changeuserinfo',
                      state: record
                    }
                  }>
                  <Button type="dashed" size={20}>
                    Edit
                  </Button>
                </Link>

                <span style={{ paddingRight: '2vw' }}></span>

                <Button type="dashed" onClick={e => OnUnban(record)} size={20}>
                  Unban
                </Button>
              </div >
            )
          }
          else {
            return (
              <div>
                <Link
                  to={
                    {
                      pathname: '/dashboard/changeuserinfo',
                      state: record
                    }
                  }>
                  <Button type="dashed" size={20}>
                    Edit
                  </Button>
                </Link>

                <span style={{ paddingRight: '2vw' }}></span>

                <Button type="dashed" onClick={e => OnBan(record)} size={20}>
                  Ban
                </Button>
              </div>
            )
          }

        }

      }

    ];






    return (
      <Layout >
        <Header>
          <Row style={{ height: '64px' }}>
            <Col span={2} offset={1}>
              <a href={home}>
                <div>
                  <img src='/../pics/logo_bee.png' alt='logo_bee' style={{ height: '64px', padding: '6px' }} />
                </div>
              </a>
            </Col>
            <Col span={7} offset={2}>
            </Col>
            <Col span={3} offset={9}>
              <Menu theme='dark' mode='horizontal' style={{ height: '64px' }}>
                <Menu.Item key='2' onClick={e => OnLogOut()}>
                  Log Out
                </Menu.Item>
              </Menu>
            </Col>
          </Row>
        </Header>
        <Layout style={{ padding: '2vh 2vh', paddingRight: '2vh', backgroundImage: 'url("/../pics/background2.jpg")' }}>



          <Content style={{ padding: '0 5vw' }}>
            <div style={{ minHeight: '100vh', backgroundColor: 'rgba(255, 255, 255, 0.5)', padding: '2vw', marginTop: '2vh' }}>
              <Typography component="h1" variant='h1' align='center'>Manage all the users</Typography>
              <p align='right' style={{ fontSize: '20px', paddingRight: '10vw', color: 'grey' }}>"{profile.name} is watching you!"</p>
              <Divider />
              <Table columns={columns} rowKey='_id' dataSource={data} style={{ backgroundColor: 'rgba(255, 255, 255, 0)' }} />
            </div>
          </Content>
        </Layout >
      </Layout >

    );
  }

};
