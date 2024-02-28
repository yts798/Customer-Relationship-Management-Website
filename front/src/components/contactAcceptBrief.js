import React from 'react'
import axios from '../commons/axios.js'
import { Divider, Col, Row, message, Button, Typography, Tag, Input, Tooltip } from 'antd';
import { DeleteOutlined, CheckCircleFilled, PlusOutlined } from '@ant-design/icons';
import { Layout } from 'antd';




export default class ContactBrief extends React.Component {
  constructor(props) {
    super(props)
  }

  state = {
    changeRemark: this.props.contact.remark,
    tags: this.props.contact.tag,
    inputVisible: false,
    inputValue: '',
    editInputIndex: -1,
    editInputValue: '',

  }

  // set edit remark 
  editRemarkF = e => {
    this.setState({ changeRemark: e });
  };

  // Some tag function code using from Antd Design: https://ant.design/components/tag

  //click delete tag 
  handleClose = removedTag => {
    let newTags = this.state.tags.filter(tag => tag !== removedTag);
    this.editTags(newTags);
  };


  // show user input --tag
  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  };
  // change input infon --tag
  handleInputChange = e => {
    this.setState({ inputValue: e.target.value });
  };

  // edit change input --tag
  handleEditInputChange = e => {
    this.setState({ editInputValue: e.target.value });
  };

  // edir input confirm --tag
  handleEditInputConfirm = () => {
    this.setState(({ tags, editInputIndex, editInputValue }) => {
      const newTags = [...tags];
      newTags[editInputIndex] = editInputValue;
      this.editTags(newTags);
    });
  };

  // save input --tag
  saveInputRef = input => {
    this.input = input;
  };

  // save edit input --tag
  saveEditInputRef = input => {
    this.editInput = input;
  };

  // connect back-end for edit friend remark
  editRemark = () => {
    var newRemark = this.state.changeRemark;
    if (newRemark === undefined){
      newRemark = ''
    }
    axios.post('/dashboard/changeRemark', {
      remark: newRemark,
      contactid: this.props.contact._id
    }).then(response => {
      if (response.data.success) {
        message.success('Edit successfully')

      }
      else {
        message.error(response.data.error)
      }

    }).catch(error => {
      message.error(error.response.data.error)
    })
    this.props.sendRemark(newRemark, this.props.contact._id)
  }

  // connect back-end for edit tags(delete and add)
  editTags = (newTags) => {
    if(this.state.tags.length < 7){
      axios.post('/dashboard/editTag', {
        tag: newTags,
        contactid: this.props.contact._id
      }).then(response => {
        if (response.data.success) {
          message.success('Edit successfully')
          this.setState({
            tags: newTags,
            inputVisible: false,
            inputValue: '',
            editInputIndex: -1,
            editInputValue: '',
          });
        }
        else {
          message.error(response.data.error)
        }

      }).catch(error => {
        message.error(error.response.data.error)
      })}
      else{
        message.error(' Max SIX tags')
      }
      
      // Send data to contact
      this.props.sendTags(newTags, this.props.contact._id);
  }

  // input comfirm --tag
  handleInputConfirm = () => {
    const { inputValue } = this.state;
    var newTags = this.state.tags;
    if (inputValue && newTags.indexOf(inputValue) === -1) {
      newTags = [...newTags, inputValue];
    }
    
    this.editTags(newTags);
  };

  // connect back-end for reject friend
  rejectFriend = () => {
    axios.post('/dashboard/deleteFriend', {
      contactid: this.props.contact._id
    }).then(response => {
      if (response.data.success) {
        message.success('Delete successfully')
        this.props.sendDelete(this.props.contact._id)
      }
      else {
        message.error(response.data.error)
      }

    }).catch(error => {
      message.error(error.response.data.error)
    })

  }

  render() {
    const { Text } = Typography;
    const { Content } = Layout;
    const { tags, inputVisible, inputValue, editInputIndex, editInputValue } = this.state;
    // Description item components
    const DescriptionItem = ({ title, content }) => (
      <div className="site-description-item-profile-wrapper">
        <Text strong className="site-description-item-profile-p-label">{title}: </Text>
        {content}
      </div>
    );
    return (
      // render accept 
      <Content style={{ minHeight: 280, background: '#fff', padding: '3vh 3vh', margin: '10px 10px' }}>
        <h1 style={{ margin: '20px 330px' }}>
          User Profile
        </h1>
        <h2>Personal</h2>
        <Row style={{ marginTop: 24 }}>
          <Col span={12}>
            <DescriptionItem title="Friend Name" content={this.props.contact.friend.givenName+' '+this.props.contact.friend.familyName} />
          </Col>
          <Col span={12}>
            <DescriptionItem title="User id" content={this.props.contact.friend.userID} />
          </Col>
        </Row>
        <Row style={{ marginTop: 24 }}>
          <Col span={12}>
          <DescriptionItem title="Birthday" content={this.props.contact.friend.dob.year+'-'+this.props.contact.friend.dob.month+'-'+this.props.contact.friend.dob.date} />
          </Col>
          <Col span={12}>
            <DescriptionItem title="Gender" content={this.props.contact.friend.gender} />
          </Col>
        </Row>
        <Row style={{ marginTop: 24 }}>
          <Col span={12}>
            <DescriptionItem title="Company" content={this.props.contact.friend.company} />
          </Col>
          <Col span={12}>
            <DescriptionItem title="Occupation" content={this.props.contact.friend.occupation} />
          </Col>
        </Row>
        <Row style={{ marginTop: 24 }}>
          <Col span={24}>
            <DescriptionItem title="Region" content={this.props.contact.friend.region.country+' '+this.props.contact.friend.region.city+' '+this.props.contact.friend.region.state}/>
          </Col>
        </Row>
        <Row style={{ marginTop: 24}}>
          <Col span={24}>
            <DescriptionItem title="Friend Introduction" content={this.props.contact.friend.introduction} />
          </Col>
        </Row>
        <Divider />
        <Row style={{ marginTop: 24}}>
          <Col span={2}>
            <DescriptionItem title="Remark" />
          </Col>
          <Col span={10}>
            <Text
              style={{ margin: "0px 0px 0px 0px" }}
              editable={{
                tooltip: 'click to edit text',
                onChange: this.editRemarkF
              }}
            >
              {this.state.changeRemark}
            </Text>
          </Col>
          <Col span={12}>
            <Button
              style={{ margin: "-9px 0px 0px 0px" }}
              shape="round"
              type="primary"
              icon={<CheckCircleFilled/>}
              onClick={this.editRemark}
            >
              Comform
            </Button>

          </Col>
        </Row>



        <Divider />
        <h2>Tag</h2>

        {tags.map((tag, index) => {
          if (editInputIndex === index) {
            return (
              <Input
                ref={this.saveEditInputRef}
                key={tag}
                size="small"
                className="tag-input"
                value={editInputValue}
                onChange={this.handleEditInputChange}
                onBlur={this.handleEditInputConfirm}
                onPressEnter={this.handleEditInputConfirm}
              />
            );
          }

          const isLongTag = tag.length > 20;

          const tagElem = (

            <Tag
              color="#2db7f5"
              className="edit-tag"
              key={tag}
              closable
              style={{ marginTop: 24}}
              onClose={() => this.handleClose(tag)}
            >
              <span
                onClick={e => {
                    this.setState({ editInputIndex: index, editInputValue: tag }, () => {
                      console.log(1111)
                      this.editInput.focus();
                    });
                    e.preventDefault();
                }}
              >
                {isLongTag ? `${tag.slice(0, 20)}...` : tag}
              </span>
            </Tag>

          );
          return isLongTag ? (
            <Tooltip title={tag} key={tag}>
              {tagElem}
            </Tooltip>
          ) : (
            tagElem
          );
        })}

        
        {inputVisible && (
          <Input
            color="blue"
            ref={this.saveInputRef}
            type="text"
            size="small"
            className="tag-input"
            maxLength = "20"
            value={inputValue}
            onChange={this.handleInputChange}
            onBlur={this.handleInputConfirm}
            onPressEnter={this.handleInputConfirm}
            style = {{marginTop: '10px'}}
          />
        )}
        {!inputVisible && (
          <Tag className="site-tag-plus" onClick={this.showInput}>
            <PlusOutlined /> New Tag
          </Tag>
        )}


        <Divider />
        <h2>Contacts</h2>
        <Row style={{ marginTop: 24 }}>
          <Col span={12}>
            <DescriptionItem title="Phone Number" content={this.props.contact.friend.mobile} />
          </Col>
          <Col span={12}>
            <DescriptionItem title="Email" content={this.props.contact.friend.email} />
          </Col>
        </Row>
        <Row>
        </Row>
        <Button
          style={{ margin: '50px 300px' }}
          type="primary"
          shape="round"
          icon={<DeleteOutlined />}
          size='large'
          danger
          onClick={() => this.rejectFriend()}
        >
          Delete Friend
        </Button>

      </Content>

    )
  }
}
