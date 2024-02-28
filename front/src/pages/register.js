// import libraries
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import 'antd/dist/antd.css';
import axios from '../commons/axios.js';
import { useState } from 'react';
import { message } from 'antd';
import { Row, Col, Button } from 'antd';
import Cookies from 'js-cookie';

//web page style design
const useStyles = makeStyles(theme => ({
    header: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        width: '100%',
        boxSizing: "border-box",
        position: 'center',
        marginTop: '5vh'
    },
    middle: {
        display: 'felx',
        alignItems: 'center',
        verticalAlign: 'middle',
        justifyContent: 'center',
        boxSizing: "border-box",
        width: '100%',
    },
    column: {
        display: 'flex',
        float: 'left',
        width: "50%",
        padding: "15px",
        alignItems: 'center',
        verticalAlign: 'middle',
        boxSizing: "border-box",
        height: '100%',
    },
    middle2: {
        float: 'left',
        width: "50%",
        padding: "15px",
        display: 'flex',
        alignItems: 'center',
        verticalAlign: 'middle',
    },
    blocks: {
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

    },
    button: {
        width: "250px",
        height: "50px",
        background: '#429CEF',
        borderRadius: '100px',
        border: 0,
        color: '#FFFFFF',
        fontFamily: 'Ubuntu',
        fontSize: "18px"
    },
    background: {
        display: 'flex',
        overflow: 'hidden',
        width: '100%',
        height: '100%',
        backgroundImage: 'url("../pics/background9.jpg")',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        resizeMethod: 'cover',
        position: 'absolute',
        bottom: '0',
    },

}));



// register page
export default function Register(props) {

    const classes = useStyles();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [givenName, setGivenName] = useState('');
    const [familyName, setFamilyName] = useState('');
    const [confirmedPassword, ConfirmedPassword] = useState('');



    //using on onchange
    const onSignUp = () => {
        if (/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,5}$/.test(email)) {
            //use axios connect back-end and push personal information to back-end
            axios.post('/register', {
                email: email,
                givenName: givenName,
                familyName: familyName,
                password: password,
                confirmPassword: confirmedPassword
            }).then(res => {
                if (res.data.success) {
                    Cookies.set('token', res.data.token, { expires: 1 })
                    props.history.push('/register/fillInfo')
                }
                else {
                    // if error
                    message.error(res.data.error)
                }

            }).catch(error => {
                message.error(error.response.data.error)
            })
        } else {
            console.log()
            message.error("please input a valid email address")
        }


    }



    return (
        <div className={classes.background} style={{ width: '100vw', height: '100vw, maxWidth: 100%', margin: '0', overflow: 'hidden' }}>
            <div className={classes.middle}>
                <div className={classes.column} style={{ textAlign: 'center', minHeight: '82vh' }}>
                    <span>
                        <a href="/">
                            <img src='./pics/logo_full.png' title="go back to home page" alt="logo pic" style={{ width: '75%' }}></img>
                        </a>
                    </span>

                </div>
                <div className={classes.column} style={{ textAlign: 'center', paddingRight: '15vh', minHeight: '82vh' }}>
                    <Container component="main" maxWidth="xs" style={{ backgroundColor: 'rgba(255, 255, 255, 0.7)', borderRadius: 10, padding: ' 2vh 2vw' }}>
                        <div>
                            <Typography component="h1" variant="h1" align="center">
                                Register
                            </Typography>
                            <br />
                            <Typography component="h1" variant="h5" align="center">
                                Welcome to be the new member!
                            </Typography>
                            <br />
                            <div>
                                <Row gutter={20}>
                                    <Col span={12}>
                                        <TextField
                                            variant="outlined"
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="givenName"
                                            label="First Name"
                                            name="firstname"
                                            autoComplete="email"
                                            size="medium"
                                            autoFocus
                                            onChange={e => setGivenName(e.target.value)}
                                        />
                                    </Col>

                                    <Col span={12}>
                                        <TextField
                                            variant="outlined"
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="familyName"
                                            label="Last Name"
                                            name="lastname"
                                            size="medium"
                                            autoComplete="email"
                                            onChange={e => setFamilyName(e.target.value)}
                                        />
                                    </Col>
                                </Row>

                                <Row>
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        size="medium"
                                        autoComplete="email"
                                        onChange={e => setEmail(e.target.value)}
                                    />
                                </Row>

                                <Row>
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        size="medium"
                                        autoComplete="current-password"
                                        onChange={e => setPassword(e.target.value)}
                                    />
                                </Row>

                                <Row>
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="comfirmed password"
                                        label="Comfirmed Password"
                                        type="password"
                                        id="confirmPassword"
                                        size="medium"
                                        autoComplete="current-password"
                                        onChange={e => ConfirmedPassword(e.target.value)}
                                    />
                                </Row>

                                <div className={classes.blocks}>
                                    <Button variant="contained" className={classes.button} onClick={e => onSignUp()} style={{ alignItems: 'center' }}>
                                        Next
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </Container>
                </div>
            </div>
        </div>
    );
}





