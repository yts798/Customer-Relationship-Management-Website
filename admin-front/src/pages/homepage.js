//import libraries
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { useState } from 'react';
import { Drawer } from 'antd';


// homepage style 
const useStyles = makeStyles((theme) => ({
    header: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        width: '100%',
        boxSizing: "border-box",
        position: 'center',
        marginTop: '15vh'
    },
    middle: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        verticalAlign: 'middle',
        width: '100%',
        marginTop: "10vh",
        overflow: 'hidden'
    },
    blocks: {
        height: 'auto',
        flexWrap: 'wrap',
        justifyContent: 'center',
        paddingLeft: 'unset',
        paddingTop: '9vh',
        verticalAlign: 'middle',
        borderRadius: 3,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        textAlign: 'center',

    },
    button: {
        width: "140px",
        height: "40px",
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
        backgroundImage: 'url("/../pics/beach.jpeg")',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        resizeMethod: 'cover',
        position: 'absolute',
        bottom: '0',

    },

}));


//  return homepage
function Homepage() {

    const classes = useStyles();
    const [about, setAbout] = useState(false);
    const [support, setSupport] = useState(false);
    const [admin, setAdmin] = useState(false);
    const [team, setTeam] = useState(false);


    const showAbout = () => {
        setAbout(true);
    };

    const showSupport = () => {
        setSupport(true);
    };

    const showAdmin = () => {
        setAdmin(true);
    };

    const showTeam = () => {
        setTeam(true);
    };


    const onClose = () => {
        setAbout(false);
        setSupport(false);
        setAdmin(false);
        setTeam(false);
    };

    return (
        <div style={{ width: '100%', height: '100%', backgroundImage: 'url("/../pics/background18.jpg")', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', position: 'absolute', right: '0vw', top: '0vh' }}>
            {/* logo div */}
            <div style={{ position: 'absolute', left: '3vw', top: '3vh' }}>
                <img src='./pics/logo_full.png' alt='logo pic' height={50} />
            </div>

            {/* help divs */}
            <div style={{ position: 'absolute', right: '28.5vw', top: '3.8vh' }}>
                <h2 onClick={showAbout} style={{ color: 'white', fontFamily: 'Ubuntu' }}> About </h2>
            </div>

            <div style={{ position: 'absolute', right: '23vw', top: '3.8vh' }}>
                <h2 onClick={showSupport} style={{ color: 'white', fontFamily: 'Ubuntu' }}> Support </h2>
            </div>
            <div style={{ position: 'absolute', right: '18vw', top: '3.8vh' }}>
                <h2 onClick={showAdmin} style={{ color: 'white', fontFamily: 'Ubuntu' }}> Admin </h2>
            </div>
            <div style={{ position: 'absolute', right: '14vw', top: '3.8vh' }}>
                <h2 onClick={showTeam} style={{ color: 'white', fontFamily: 'Ubuntu' }}> Team </h2>
            </div>

            {/* continue div */}
            <div style={{ position: 'absolute', right: '3vw', top: '3.5vh' }}>
                <a href={window.location.href + 'login'}>
                    <Button variant="contained" className={classes.button}>
                        Get Start
                    </Button>
                </a>

            </div>

            {/* slogon div */}
            <div align='center' style={{ position: 'absolute', left: '41vw', top: '30vh' }}>
                <h1 style={{ color: 'white', fontFamily: 'Ubuntu' }}> New-Bee Personal CRM </h1>
                <h1 style={{ color: 'white', fontFamily: 'Ubuntu' }}> Admin Version </h1>
            </div>

            <Drawer
                title="About"
                placement={'left'}
                onClose={onClose}
                visible={about}
                key={'d1'}
            >
                <p>This is NEW-BEE Personal CRM, developed by team New-Bees from University of Melbourne.</p>
                <br />
                <p>We offer free CRM service to small business, private business, local vendor and freelancer.</p>
                <br />
                <p>Our priorities are build friendly community that users can connect with other users easily and comfortably.</p>
                <br />
                <p>The New-Bees team reserves the right of final interpretation of this CRM.</p>
            </Drawer>

            <Drawer
                title="Support"
                placement={'left'}
                onClose={onClose}
                visible={support}
                key={'d2'}
            >
                <p>The New-Bees Team is glad to offer support with your account.</p>
                <br />
                <p>Please comply with the internet rules and local laws, and show respect to other users. We do not tolerate racist or other types of discriminaition information/massage. Failed to comply with above terms may lead to your account being banned.</p>
                <br />
                <p>For further assistance, please contact us via the email: new.bee.crm@gmail.com.</p>
            </Drawer>

            <Drawer
                title="Admin"
                placement={'left'}
                onClose={onClose}
                visible={admin}
                key={'d3'}
            >
                <p>Administrators of NEW-BEE CRM are amicable partners that help New-Bees Team to maintain a friendly online community.</p>
                <br />
                <p>Admins reserve the rights of banning and unbanning any accounts that violate the community rules. Admins also reserves the right of modifying users information, but we guarantee that users private information will not be revealed to any third parties.</p>
                <br />
                <p>For appeal of banned accounts please contact us via the email: new.bee.crm@gmail.com.</p>
                <br />
                <p>For current admins: Please log in with a different website!</p>
            </Drawer>

            <Drawer
                title="Team"
                placement={'left'}
                onClose={onClose}
                visible={team}
                key={'d4'}
            >
                <p>This personal CRM is developed by the student team New-Bees</p>
                <br />
                <p>The Team members are: Shenggang Qian, Shengjun Su, Xinyu Wu, Yutong Sun and Ziyu Qian. The supervisor of the team is Zhe Wang and the client is Haichao Song </p>
                <br />
                <p>For any suggestions and potential future opportunities, please contact us via the email: new.bee.crm@gmail.com</p>
            </Drawer>


        </div>
    )

};

export default Homepage;