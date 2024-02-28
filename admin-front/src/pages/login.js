//import libraries
import React from 'react';
import { useState } from 'react'
import { message, Drawer } from 'antd';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import 'antd/dist/antd.css';
import axios from '../commons/axios.js';
import Cookies from 'universal-cookie';


////web page style design
const useStyles = makeStyles((theme) => ({
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
        verticalalign: 'middle',
        justifyContent: 'center',
        marginTop: "10%",
        boxSizing: "border-box",
        width: '100%',
    },
    column: {
        float: 'left',
        width: "50%",
        padding: "15px",
        alignItems: 'center',
        verticalalign: 'middle',
        display: 'flex',
        marginTop: "5%",
    },
    middle2: {
        float: 'left',
        width: "50%",
        padding: "15px",
        display: 'flex',
        alignItems: 'center',
        verticalalign: 'middle',
    },
    blocks: {
        height: 'auto',
        flexWrap: 'wrap',
        justifyContent: 'center',
        paddingLeft: 'unset',
        paddingTop: '3vh',
        verticalalign: 'middle',
        borderRadius: 3,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        textAlign: 'center',

    },
    background: {
        display: 'flex',
        overflow: 'hidden',
        width: '100%',
        height: '100%',
        backgroundImage: 'url("/../pics/ink1.jpeg")',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        resizeMethod: 'cover',
        position: 'absolute',
        bottom: '0',
    },
    blocks_signin: {
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
    blocks_text: {
        height: '3vh',
        flexWrap: 'wrap',
        justifyContent: 'center',
        paddingLeft: 'unset',
        paddingTop: '1vh',
        verticalAlign: 'middle',
        borderRadius: 2,
        display: 'flex',
        fontFamily: 'Ubuntu',
        flexDirection: 'row',
        alignItems: 'center',
        textAlign: 'center',

    },
    blocks_google: {
        height: 'auto',
        flexWrap: 'wrap',
        justifyContent: 'center',
        paddingLeft: 'unset',
        paddingTop: '1.5vh',
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
        alignItems: 'center',
        fontFamily: 'Ubuntu',
        fontSize: "18px"
    },
    button_google: {
        width: "250px",
        height: "50px",
        background: '#EA4335',
        borderRadius: '100px',
        border: 1,
        color: '#FFFFFF',
        alignItems: 'center',
        fontFamily: 'Ubuntu',
        fontSize: "18px"
    }
}));

// signin page
function SignIn(props) {
    const classes = useStyles();
    const [account, setAccount] = useState('');
    const [password, setPassword] = useState('');

    const onSignIn = () => {
        //put user input to back-end and return status
        axios.post('/login', { account: account, password: password }).then(res => {
            if (res.data.success) {
                const cookies = new Cookies();
                cookies.set('token', res.data.token, { maxAge: 24 * 60 * 60 })
                props.history.push('/dashboard')
            }
            else {
                // if error
                message.error(res.data.error)
            }
        }).catch(error => {
            console.log("login axios errors")
            message.error(error)
            console.log(error)

            // or throw(error.respond)
        })
    };


    const checkEmpty = () => {
        if (account === '') {
            message.error("The account name can't be empty")
        }
        else if (password === '') {
            message.error("The password can't be empty")

        }
        else {
            onSignIn()
        }

    }

    const [support, setSupport] = useState(false);

    const showSupport = () => {
        setSupport(true);
    };
    const onClose = () => {
        setSupport(false);
    };




    return (
        <div className={classes.background} style={{ width: '100vw', height: '100vh, maxWidth: 100%', margin: '0', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', left: '19vw', top: '4.3vh' }}>
                <h2 onClick={showSupport} style={{ color: 'black', fontFamily: 'Ubuntu' }}> Support </h2>
            </div>

            <Drawer
                title="Support"
                placement={'right'}
                onClose={onClose}
                visible={support}
                key={'d2'}
            >
                <p>Welcome to the admin community! Let's maintain a friendly CRM environment together </p>
                <br />
                <p>Please manage the users according to the rules of our website. Do not hesitate to ban them if their activities are offensive </p>
                <br />
                <p>For further clarification, please contact us via the email: new.bee.crm@gmail.com.</p>
            </Drawer>



            <div className={classes.middle}>
                <Container component="main" maxWidth="xs">

                    <a href="/">
                        <img src='../pics/logo_full.png' alt="logo pic" style={{ position: 'absolute', left: '3vw', top: '3vh', height: '50px' }}></img>
                    </a>

                    <div>

                        <Typography component="h1" variant="h3" align='center' style={{ fontFamily: 'Ubuntu' }}>Admin Log In</Typography>
                    </div>

                    <div>

                        <p align='center' style={{ fontFamily: 'Ubuntu' }}>Who controls the past controls the future.</p>
                        <p align='center' style={{ fontFamily: 'Ubuntu' }}>Who controls the present controls the past.</p>
                        <p align='right' style={{ fontFamily: 'Ubuntu' }}>― George Orwell, 1984</p>
                    </div>
                    <div>
                        <form noValidate>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="account"
                                label="Account"
                                name="account"
                                autoComplete="account"
                                autoFocus
                                onChange={e => setAccount(e.target.value)}
                            />

                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={e => setPassword(e.target.value)}
                            />


                            <div className={classes.blocks_signin}>
                                <Button
                                    variant="contained"
                                    onClick={() => checkEmpty()}
                                    className={classes.button}
                                >
                                    Log In
                                </Button>

                            </div>

                        </form>
                    </div>
                </Container>
            </div>
            {/* <div className={classes.background}> </div> */}

        </div>
    )
};

export default SignIn;

