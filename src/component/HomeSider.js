import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Card, Button, Icon, Popover } from 'antd';
import '../styles/home-sider.css';
import axios from "axios";
import qq from '../qq.jpg';
import wechat from '../wechat.jpg';

class HomeSider extends Component {
    state = {
        loading: true,
        avatar: '',
        username: '',
    }
    componentDidMount() {
        this.updateData();
    }
    updateData() {
        const username = this.props.username;
        console.log(username);
        axios.get('http://localhost:3000/user?username=' + username).then(function (res) {
            console.log(res);
            if (res.data.length) {
                console.log(this.state.loading);
                this.setState({
                    loading: !this.state.loading,
                    avatar: res.data[0].avatar,
                    username: username,
                });
            }

        }.bind(this))
    }
    // componentWillUpdate() {
    //     this.updateData();
    // }
    render() {
        const { avatar, username } = this.state;
        return (
            <div className="home-sider">
                <Card loading={this.state.loading} title="个人信息" className="profile-top profile">
                    <div className="userinformation"><img src={avatar} alt="" /><span>{username}</span></div>
                </Card>
                <Card loading={this.state.loading} title="" className="profile-main profile">
                    <button><Link to='/4/submit'>发布话题</Link></button>
                </Card>
                <Card title="相关社区" className="profile-friend profile">
                    <a href="https://github.com/armsarms/react-club" target="_blank"><Icon type="github" /></a>
                    <a href="#">
                        <Popover content={<img src={wechat} className='popover_img'/>} trigger="click">
                            <Icon type="wechat" />
                        </Popover></a>
                    <a href="https://weibo.com/p/1005051357631673" target="_blank"><Icon type="weibo" /></a>
                    <a href="#">
                        <Popover content={<img src={qq} className='popover_img'/>} trigger="click">
                            <Icon type="qq" />
                        </Popover></a>
                    <a href="#">
                        <Popover content={<p>邮箱：armsarms@sina.com</p>} trigger="click">
                            <Icon type="mail" />
                        </Popover>
                    </a>
                </Card>
            </div>
        );
    }
}

export default HomeSider;