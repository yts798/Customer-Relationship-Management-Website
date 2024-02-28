// import libraries
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import 'antd/dist/antd.css';
import axios from '../commons/axios.js';
import { Layout, message } from 'antd';
import { Row, Col, Button, Radio, DatePicker, Space } from 'antd';
import Cookies from 'js-cookie';
import FillDetaillAddress from '../components/fillDetailAddress.js'



// register page
export default class RegisterFillInfo extends React.Component {

    constructor(props) {
        super(props)
        this.state = { gender: undefined, mobieNumber: '', dob: undefined, address: undefined, company: '', job: '' };
    }


    render() {

        const { Content } = Layout;

        const setAddress = (value) => {
            var address = value;
            address[0] = value[0];
            if (value[1] === undefined) {
                address[1] = '';
            } else {
                address[1] = value[1];
            }
            if (value[2] === undefined) {
                address[2] = '';
            } else {
                address[2] = value[2];
            }
            this.state.address = address;
        }

        const checkInfo = () => {
            if (this.state.gender === undefined) {
                message.error("Please Enter your Gender")
            }
            else if (this.state.dob === undefined) {
                message.error("Please Enter your Birthday")
            }

            else if (this.state.address === undefined) {
                message.error("Please Enter your Address")
            }

            else if (this.state.mobieNumber === '') {
                message.error("Please Enter your mobie number")
            }
            else {
                console.log(this.state.address)
                uploadInfo();
            }

        }



        //using on onchange
        const uploadInfo = () => {

            // use axios connect back-end and push personal information to back-end
            axios.post('/register/fillInfo', {
                gender: this.state.gender,
                mobile: this.state.mobieNumber,
                dob: { year: this.state.dob.getFullYear(), month: this.state.dob.getMonth() + 1, date: this.state.dob.getDate() },
                region: { city: this.state.address[2], state: this.state.address[1], country: this.state.address[0] },
                company: this.state.company,
                occupation: this.state.job,
            },
                {
                    headers: {
                        Authorization: `Bearer ${Cookies.get('token')}`
                    }
                }).then(res => {
                    if (res.data.success) {
                        this.props.history.push('/dashboard')
                    }
                    else {
                        // if error
                        //this.prop.push('/register/fillInfo')
                        message.error(res.data.error)
                    }

                }).catch(error => {
                    console.log(error.response.data.error)
                    message.error(error.response.data.error)
                })

        }

        const button = {
            width: "250px",
            height: "50px",
            background: '#429CEF',
            borderRadius: '100px',
            border: 0,
            color: '#FFFFFF',
            fontFamily: 'Ubuntu',
            fontSize: "18px",
            alignItems: 'center'
        };

        const blocks = {
            height: 'auto',
            flexWrap: 'wrap',
            justifyContent: 'center',
            paddingLeft: 'unset',
            paddingTop: '3vh',
            verticalAlign: 'middle',
            borderRadius: 3,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            textAlign: 'center',
        };

        return (
            <Layout style={{ backgroundImage: 'url("../pics/background9.jpg")', minHeight: '100vh' }}>
                <Row style={{ marginTop: "2%" }}>
                    <Col offset={9}>
                    </Col>
                    <Col span={6}>
                        <img src='../pics/logo_full.png' title="go back to home page" alt="logo pic" style={{ width: '100%' }}></img>
                    </Col>
                    <Col offset={9}>
                    </Col>
                </Row>
                <Content style={{ width: '40vw', marginTop: '3vh', alignSelf: 'center' }}>

                    <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: '2vw', marginTop: '2vh', minHeight: '60vh' }}>

                        <Typography component="h2" variant="h2" align="center">
                            Fill In Your Detaills
                        </Typography>
                        <br />
                        <Typography component="h1" variant="h5" align="center">
                            Welcome to be the new member!
                        </Typography>
                        <br />

                        <Row>
                            <Col span={4} offset={1} style={{ verticalAlign: "middle" }}>
                                <h2> Gender: </h2>
                            </Col>
                            <Col span={19}>
                                <Space>
                                    <Radio.Group onChange={e => this.state.gender = e.target.value} size="large" style={{ verticalAlign: "middle", width: '100%' }}>
                                        <Radio.Button value="Male">Male</Radio.Button>
                                        <Radio.Button value="Female">Female</Radio.Button>
                                        <Radio.Button value="Prefer not to say"> Prefer not to say </Radio.Button>
                                    </Radio.Group>
                                </Space>
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col span={4} offset={1} style={{ textAlign: "left" }}>
                                <h2 style={{ verticalAlign: "middle" }}> Birthday: </h2>
                            </Col>
                            <Col span={19}>
                                <DatePicker onChange={e => this.state.dob = new Date(e._d)} size="large" style={{ width: '100%' }} />
                            </Col>
                        </Row>
                        <br />

                        {/* the address selection menu */}
                        <FillDetaillAddress sendData={setAddress}></FillDetaillAddress>


                        <Row>
                            <Col span={23} offset={1}>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="Mobile"
                                    label="Phone Number"
                                    name="Mobile"
                                    autoComplete="Mobile Number"
                                    size="medium"
                                    onChange={e => this.state.mobieNumber = e.target.value}
                                />
                            </Col>
                        </Row>

                        <Row>
                            <Col span={23} offset={1}>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="Mobile"
                                    label="Company: (Optional)"
                                    name="Company"
                                    autoComplete="Company"
                                    size="medium"
                                    onChange={e => this.state.company = e.target.value}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col span={23} offset={1}>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="Mobile"
                                    label="Job: (Optional)"
                                    name="Job"
                                    autoComplete="Job"
                                    size="medium"
                                    onChange={e => this.state.job = e.target.value}
                                />
                            </Col>
                        </Row>

                        <div style={blocks}>
                            <Button variant="contained" style={button} onClick={e => checkInfo()}>
                                Register
                            </Button>
                        </div>
                    </div>
                </Content>
            </Layout>
        )
    }
}