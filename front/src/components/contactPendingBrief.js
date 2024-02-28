import React from 'react'
import axios from '../commons/axios.js'
import { message, List, Row, Col,Modal,Button,Typography,Layout} from 'antd';
import { IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';

export default class ContactBrief extends React.Component {
    constructor(props) {
        super(props);
    }

    //write friend info
    handleClick = e => {
       
    }

    // connect bacl-end accept friend 
    acceptFriend = () => {
        axios.post('/dashboard/acceptFriend', {
            userid: this.props.contact.user._id
        }).then(response => {
            if (response.data.success) {
                message.success('Accept successfully')
                this.props.sendAccept()
            }
            else {
                message.error(response.data.error)
            }

        }).catch(error => {
            message.error(error.response.data.error)
        })

    }
    // connect bacl-end reject friend 
    rejectFriend = () => {
        axios.post('/dashboard/deleteFriend', {
            contactid: this.props.contact._id
        }).then(response => {
            if (response.data.success) {
                message.success('Delete successfully')
                this.props.sendReject(this.props.contact._id)
            }
            else {
                message.error(response.data.error)
            }
            window.location.reload()

        }).catch(error => {
            message.error(error.response.data.error)
        })

    }

    render() {
        const { Text } = Typography;
        const { Content } = Layout;
        // Description item components
        const DescriptionItem = ({ title, content }) => (
            <div className="site-description-item-profile-wrapper">
                <Text strong className="site-description-item-profile-p-label">{title}: </Text>
                {content}
            </div>
        );
        // render pending  page
        return (
            <Content style={{ minHeight: '100vh', background: '#fff', padding: '3vh 3vh', margin: '10px 10px' }}>
                    <h1 style={{ margin: '20px 330px' }}>
                      User request
                    </h1>
                    <h3>User information</h3>
                    <Row style={{ marginTop: 24 }}>
                        <Col span={12}>
                            <DescriptionItem title="User Name" content={this.props.contact.user.givenName+' '+this.props.contact.user.familyName} />
                        </Col>
                        <Col span={12}>
                            <DescriptionItem title="User id" content={this.props.contact.user.userID} />
                        </Col>
                    </Row>
                    <Row style={{ marginTop: 24 }}>
                        <Col span={12}>
                        <DescriptionItem title="Email" content={this.props.contact.user.email} />
                        </Col>
                        <Col span={12}>
                        <DescriptionItem title="Region" content={this.props.contact.user.region.country} />
                        </Col>
                    </Row>
                    <Row style={{ marginTop: 24 }}>
                        <Col span={24}>
                            <DescriptionItem title="Request message" content={this.props.contact.message} />
                        </Col>
                    </Row>
                    <Row style={{ marginTop: 24 }}>
                        <Col span={12} >
                            <Button 
                                type="primary"
                                shape="round"
                                
                                onClick={() => this.acceptFriend()}
                            >
                                
                                Accept         
                            </Button>
                            <Button 
                                
                                onClick={() => this.rejectFriend()}
                                type="primary"
                                shape="round"
                                style={{ marginLeft: 24}}
                            >   
                            Reject        
                            </Button>
                        </Col>
                    </Row>
            </Content>
        )

    }
}
