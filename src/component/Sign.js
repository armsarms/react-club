import React from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { withRouter, Link } from 'react-router-dom';
import '../styles/Sign.css';
import axios from 'axios';

const FormItem = Form.Item;
class NormalLoginForm extends React.Component {
    constructor(props) {
        super(props);

    }
    handleSubmit = (e) => {
        e.preventDefault();
        // console.log(this.props);
        // console.log(this.props.stateChange);
        const stateChange = this.props.stateChange;
        const handleCancel = this.props.handleCancel;
        const history = this.props.history;
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                axios.get('http://localhost:3000/user?username=' + values.userName).then(function (res) {
                    console.log(res);
                    if (res.data[0].password == values.password) {
                        console.log('hehehehe');
                        const token = Date.now();
                        sessionStorage.setItem('access_token', token);
                        sessionStorage.setItem('username', values.userName);
                        // 隐藏登陆，显示个人中心
                        stateChange();
                        handleCancel();
                        history.push('/3');
                    }
                }.bind(this)).catch(function (error) {
                    console.log(error);
                });
            } else {
                console.log(err);
            }
        });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        // const handleCancel = this.props.handleCancel;
        const { handleCancel, goToRegister } = this.props;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <FormItem>
                    {getFieldDecorator('userName', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                    })(
                        <Checkbox>Remember me</Checkbox>
                    )}
                    {/* <a className="login-form-forgot" href="">Forgot password</a> */}
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Log in
                    </Button>
                    Or <Link to='/' onClick={goToRegister} >register now!</Link>
                </FormItem>
            </Form>
        );
    }
}
const Sign = Form.create()(NormalLoginForm);

export default withRouter(Sign);