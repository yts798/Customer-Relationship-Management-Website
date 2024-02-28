import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import { Layout, Menu, Avatar, Row, Col, Button, Space, Spin, message, Tooltip, Radio } from 'antd';
import axios from '../commons/axios.js';
import TextField from '@material-ui/core/TextField';
import Cookies from 'js-cookie';
import FillDetaillAddress from '../components/fillDetailAddress.js';

export default function ChangeInfo(props) {

    const home = "/dashboard";
    const { Header, Content } = Layout;

    // get data to display
    const [profile, setProfile] = useState([]);
    const [loading, setLoading] = useState(true);

    const [givenName, setGivenName] = useState('');
    const [familyName, setFamilyName] = useState('');
    const [gender, setGender] = useState('');
    const [mobile, setMobile] = useState('');
    const [address, setAdd] = useState([]);
    const [company, setCompany] = useState('');
    const [job, setJob] = useState('');

    // store input data for changing profile
    const [userID, setUserID] = useState('');
    const [introduction, setIntroduction] = useState('');

    // get data from backend
    useEffect(() => {
        axios.get(home).then(response => {
            if (response.data.success) {
                setProfile(response.data.user);
                setLoading(false);
            }
        }).catch(error => {
            console.log(error.response.data.error)
            message.error(error.response.data.error);
        })
    }, [home])

    // logout
    const OnLogOut = () => {
        Cookies.remove('token')
        props.history.push('/login');
    }


    // change personal infos
    const changeInformation = () => {

        axios.post(home + '/editInfo', {
            givenName: givenName,
            familyName: familyName,
            userID: userID,
            introduction: introduction,
            gender: gender,
            mobile: mobile,
            // region: { city: address[2], state: address[1], country: address[0] },
            company: company,
            occupation: job
        }).then(res => {
            if (res.data.success) {
                message.success("successfully changed profile!")
                props.history.push('/dashboard', { replace: true });
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
        setAdd(address);
    }



    const changeAvatar = (e) => {
        e.preventDefault();
        var reader = new FileReader();
        var file = e.target.files[0];
        var file_size = file.size;
        file_size = file_size / 1024; //into kb
        console.log(file_size);

        reader.onloadend = () => {

            if (file_size > 200) {
                message.error("File size too large. Please select another picture.");
            }
            // else if (a) {

            // }
            else {
                axios.post(home + '/uploadImage', { image: reader.result }).then(res => {
                    if (res.data.success) {
                        message.success("successfully changed avatar!");
                        props.history.push('/dashboard', { replace: true });
                    }
                    else {
                        // if error
                        message.error(res.data.error)
                        return;
                    }

                }).catch(error => {
                    console.log(error.response.data.error)
                    message.error(error.response.data.error)
                    return;
                })
            }

        }
        reader.readAsDataURL(file);

    }



    // if the page is loading, draw a loading animation
    if (loading) {
        return <Space size="middle" style={{ position: 'relative', marginLeft: '50vw', marginTop: '50vh' }}>
            <Spin size="large" />
            <h3>Loading</h3>
        </Space>;
    }


    return (
        <Layout >
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
                        <Menu theme='dark' mode='horizontal' defaultSelectedKeys={['4']} style={{ height: '64px' }}>
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
                <Content style={{ padding: '0 5vw', backgroundImage: 'url("/../pics/background4.jpg")' }}>
                    <div style={{ minHeight: '130vh', backgroundColor: 'rgba(255, 255, 255, 0.5)', padding: '2vw', marginTop: '2vh' }}>

                        <div id="left" style={{ width: '20vw', float: 'left', paddingLeft: '8vw', paddingTop: '5vh' }}>
                            <Avatar size={140} src={profile.photo.data} />

                            <div>
                                &nbsp;
                            </div>

                            <Button type="primary" size='large'>
                                <input id="inputAvatar" style={{ display: 'none' }} type="file" onChange={(e) => changeAvatar(e)} accept=".jpg, .png, .bmp, .jpeg" />
                                <label style={{ color: "#FFF" }} htmlFor="inputAvatar">
                                    Change Avatar
                                </label>
                            </Button>


                            <div>
                                &nbsp;
                            </div>

                            <a href={home + "/changepassword"}>
                                <Button type="primary" size='large' variant="contained">
                                    Change Password
                                </Button>
                            </a>

                        </div>

                        <div id="right" style={{ width: "15vw", float: 'right', paddingRight: '5vw', paddingTop: '8vh' }}>
                        </div>

                        <div id="middle" style={{ width: '45vw', float: 'right', paddingTop: '5vh', margin: '0 auto' }}>

                            <div style={{ color: 'black', verticalAlign: 'middle', fontSize: '47px' }}>
                                Manage Your Profile
                            </div>
                            <br />

                            <div>
                                <form noValidate>



                                    <Tooltip title={
                                        <div style={{ verticalAlign: 'middle', fontSize: '15px', paddingLeft: '0px' }}>
                                            Set a personal ID and people can use it to find you!
                                            <br />
                                            The ID must contain one uppercase, lowercase letter and digit and be more than 8 characters
                                            <br />
                                        </div>}
                                        placement="right"
                                        color="blue"
                                    >

                                        <TextField
                                            variant="outlined"
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="userID"
                                            label={'Your current id: ' + profile.userID}
                                            name="userID"
                                            autoComplete="UserID"
                                            onChange={e => setUserID(e.target.value)}
                                        />
                                    </Tooltip>


                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="givenName"
                                        label={'Your current givenName: ' + profile.givenName}
                                        name="givenName"
                                        autoComplete="givenName"
                                        onChange={e => setGivenName(e.target.value)}
                                    />

                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="familyName"
                                        label={'Your current familyName: ' + profile.familyName}
                                        name="familyName"
                                        autoComplete="familyName"
                                        onChange={e => setFamilyName(e.target.value)}
                                    />
                                    <br />
                                    <br />
                                    <Row>
                                        <Col span={4} offset={1} style={{ verticalAlign: "middle" }}>
                                            <h2> Gender: </h2>
                                        </Col>
                                        <Col span={19}>
                                            <Space>
                                                <Radio.Group onChange={e => setGender(e.target.value)} size="large" style={{ verticalAlign: "middle", width: '100%' }}>
                                                    {/* <Radio.Group onChange={e => this.state.gender = e.target.value} size = "large" style = {{verticalAlign: "middle", width: '100%'}}> */}
                                                    <Radio.Button value="Male">Male</Radio.Button>
                                                    <Radio.Button value="Female">Female</Radio.Button>
                                                    <Radio.Button value="Prefer not to say"> Prefer not to say </Radio.Button>
                                                </Radio.Group>
                                            </Space>
                                        </Col>
                                    </Row>

                                    {/* <FillDetaillAddress sendData={setAddress}></FillDetaillAddress> */}

                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="Mobile"
                                        label="Phone Number"
                                        name="Mobile"
                                        onChange={e => setMobile(e.target.value)}
                                    />

                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="Mobile"
                                        label="Company:"
                                        name="Company"
                                        onChange={e => setCompany(e.target.value)}
                                    />
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="Mobile"
                                        label="Job:"
                                        name="Job"
                                        onChange={e => setJob(e.target.value)}
                                    />
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        rows="3"
                                        multiline="true"
                                        id="introduction"
                                        label={'Introduce yourself: '}
                                        defaultValue={profile.introduction}
                                        placeholder={profile.introduction}
                                        name="introduction"
                                        autoComplete="introduction"
                                        onChange={e => setIntroduction(e.target.value)}
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
    )

}

