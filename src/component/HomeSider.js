import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import { Card, Button } from 'antd';
import '../styles/home-sider.css';
import axios from "axios";

class HomeSider extends Component {
    state = {
        loading:true,
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
                <Card title="" className="profile-main profile">
                    <button><Link to='/4'>发布话题</Link></button>
                </Card>
                <Card title="友情社区" className="profile-friend profile">
                    Whatever content
                </Card>
            </div>
        );
    }
}

export default HomeSider;