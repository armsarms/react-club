import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Button, Modal, Form, Input, Radio, List } from 'antd';
import '../styles/home-sider.css';
import axios from "axios";

const FormItem = Form.Item;

const CollectionCreateForm = Form.create()(
    class extends React.Component {
        render() {
            const { visible, onCancel, onCreate, form } = this.props;
            const { getFieldDecorator } = form;
            return (
                <Modal
                    visible={visible}
                    title="创建一个新的关联用户"
                    okText="Create"
                    onCancel={onCancel}
                    onOk={onCreate}
                >
                    <Form layout="vertical">
                        <FormItem label="设备码">
                            {getFieldDecorator('code', {
                                rules: [{ required: true, message: 'Please input the Device code of collection!' }],
                            })(
                                <Input />
                            )}
                        </FormItem>
                        <FormItem label="姓名">
                            {getFieldDecorator('name', {
                                rules: [{ required: true, message: 'Please input the name of collection!' }],
                            })(<Input type="textarea" />)}
                        </FormItem>
                    </Form>
                </Modal>
            );
        }
    }
);

class Userinformation extends React.Component {
    state = {
        visible: false,
        data: [],
    };
    componentDidMount() {
        this.getData((res) => {
            this.setState({
                data: res.data,
            });
        });
    }
    getData = (callback) => {
        axios({
            url: 'http://localhost:3000/userinformation?username='+sessionStorage.getItem('username'),
            type: 'json',
            method: 'get',
            contentType: 'application/json',
        }).then((res) => {
            console.log(res);
            callback(res);
        });
    }
    showModal = () => {
        this.setState({ visible: true });
    }
    handleCancel = () => {
        this.setState({ visible: false });
    }
    handleDelect = (id) => {
        console.log('idd');
        axios.delete('http://localhost:3000/userinformation/'+id).then(function (res) {
            console.log(res);
            if(res.status==200){
                console.log('del success');
                this.getData((res) => {
                    this.setState({
                        data: res.data,
                    });
                })
            }
        }.bind(this))
    }
    handleCreate = () => {
        const form = this.formRef.props.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }

            console.log('Received values of form: ', values);
            axios.post('http://localhost:3000/userinformation', {
                code: values.code,
                name: values.name,
                username: sessionStorage.getItem("username"),
            }).then(function (res) {
                console.log(res);
                this.getData((res) => {
                    this.setState({
                        data: res.data,
                    });
                });
            }.bind(this))
            form.resetFields();
            this.setState({ visible: false });
        });
    }
    saveFormRef = (formRef) => {
        this.formRef = formRef;
    }
    render() {
        return (
            <div>
                <Button type="primary" onClick={this.showModal}>New Collection</Button>
                <CollectionCreateForm
                    wrappedComponentRef={this.saveFormRef}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}
                />
                <List
                    itemLayout="horizontal"
                    dataSource={this.state.data}
                    renderItem={item => (
                        <List.Item>
                            <List.Item.Meta
                                // avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                title={<p>用户名字：{item.name}</p>}
                                description={<p>设备编号：{item.code}</p>}
                            />
                            <Button onClick={()=>this.handleDelect(item.id)}>删除</Button>    
                        </List.Item>
                    )}
                />
            </div>
        );
    }
}


export default Userinformation;