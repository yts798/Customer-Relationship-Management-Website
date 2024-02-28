import React from 'react';
import 'antd/dist/antd.css';
import axios from '../commons/axios.js';
import Cookies from 'universal-cookie';
import { Layout, Menu, Avatar, Row, Col, Button, Space, Spin, message } from 'antd';
import TextField from '@material-ui/core/TextField';

export default class ChangeUserInfo extends React.Component {


  constructor(props) {
    super(props)
    this.state = { profile: this.props.location.state, loading: false, userID: '', givenName: '', familyName: '', mobile: '', company: '', job: '', introduction: '' };
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
    const { profile, loading, userID, givenName, familyName, mobile, company, job, introduction } = this.state;
    const home = '/dashboard';

    console.log(this.props.location.state);
    console.log(profile);

    // change personal infos
    const changeInformation = () => {

      axios.post(home + '/editInfo', {
        user: profile._id,
        givenName: givenName,
        familyName: familyName,
        userID: userID,
        introduction: introduction,
        // gender: gender,
        mobile: mobile,
        // region: { city: address[2], state: address[1], country: address[0] },
        company: company,
        occupation: job
      }).then(res => {
        if (res.data.success) {
          message.success("successfully changed profile!")
          this.props.history.push('/dashboard', { replace: true });
        }
        else {
          // if error
          message.error(res.data.error)
        }
      }).catch(error => {
        console.log(error.response.data.error)
        message.error(error.response.data.error)
        // or throw(error.respond)
      })

    }

    if (loading) {
      return <Space size='middle' style={{ position: 'relative', marginLeft: '50vw', marginTop: '50vh' }}>
        <Spin size='large' />
        <h3>Loading</h3>
      </Space>;
    }


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
        <Layout>
          <Content style={{ padding: '0 5vw', backgroundImage: 'url("/../pics/background4.jpg")' }}>
            <div style={{ minHeight: '130vh', backgroundColor: 'rgba(255, 255, 255, 0.5)', padding: '2vw', marginTop: '2vh' }}>

              <div id="left" style={{ width: '20vw', float: 'left', paddingLeft: '8vw', paddingTop: '5vh' }}>
                <Avatar size={140} src={profile.photo.data} />
              </div>

              <div id="right" style={{ width: "15vw", float: 'right', paddingRight: '5vw', paddingTop: '8vh' }}>
              </div>

              <div id="middle" style={{ width: '45vw', float: 'right', paddingTop: '5vh', margin: '0 auto' }}>

                <div style={{ color: 'black', verticalAlign: 'middle', fontSize: '47px' }}>
                  Manage profile
                </div>
                <br />

                <div>
                  <form noValidate>

                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      id="userID"
                      label={'Current id: ' + profile.userID}
                      name="userID"
                      autoComplete="UserID"
                      onChange={e => this.setState({ userID: e.target.value })}
                    />

                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      id="givenName"
                      label={'Current givenName: ' + profile.givenName}
                      name="givenName"
                      autoComplete="givenName"
                      onChange={e => this.setState({ givenName: e.target.value })}
                    />

                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      id="familyName"
                      label={'Current familyName: ' + profile.familyName}
                      name="familyName"
                      autoComplete="familyName"
                      onChange={e => this.setState({ familyName: e.target.value })}
                    />


                    {/* <FillDetaillAddress sendData={setAddress}></FillDetaillAddress> */}

                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      id="Mobile"
                      label={"Current phone number: " + profile.mobile}
                      name="Mobile"
                      onChange={e => this.setState({ mobile: e.target.value })}
                    />

                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      id="Company"
                      label={"Current company: " + profile.company}
                      name="Company"
                      onChange={e => this.setState({ company: e.target.value })}
                    />
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      id="Job"
                      label={"Current job: " + profile.occupation}
                      name="Job"
                      onChange={e => this.setState({ job: e.target.value })}
                    />
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      id="introduction"
                      label={'Current introduction: ' + profile.introduction}
                      defaultValue={profile.introduction}
                      placeholder={profile.introduction}
                      name="introduction"
                      autoComplete="introduction"
                      onChange={e => this.setState({ introduction: e.target.value })}
                    />

                    <div style={{ paddingTop: '3vh' }}>
                      <Button type="primary" size='large' onClick={changeInformation}>
                        Save
                      </Button>

                      <span>
                        &nbsp;&nbsp;
                      </span>

                      <a href={home}>
                        <Button type="primary" size='large'>
                          Cancel
                        </Button>
                      </a>

                    </div>
                  </form >

                </div >
              </div >
            </div >
          </Content >
        </Layout >
      </Layout >

    );
  }

};
