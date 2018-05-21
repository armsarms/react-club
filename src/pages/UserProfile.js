import React, { Component } from 'react';
import { Card, Button } from 'antd';
import '../styles/user-profile.css';
import PostList from '../pages/PostList';
import axios from "axios";
import UserContent from '../component/UserContent';
import UserInformation from '../component/UserInformation';

class UserProfile extends Component {
    state = {
        loading: true,
        avatar: '',
        username: '',
    }
    componentDidMount() {
        const username = sessionStorage.getItem("username");
        console.log(username);
        axios.get('http://localhost:3000/user?username=' + username).then(function (res) {
            console.log(res);
            if (res.data.length) {
                this.setState({
                    loading: !this.state.loading,
                    avatar: res.data[0].avatar,
                    username: username,
                });
            }

        }.bind(this))
    }
    render() {
        const { avatar, username } = this.state;
        return (
            <div>
                <Card loading={this.state.loading} title="个人信息" className="profile-top profile">
                    <div className="userinformation"><img src={avatar} alt="" /><span>{username}</span></div>
                </Card>
                <Card loading={this.state.loading} title="最近创建的话题" className="profile-main profile">
                    <UserContent></UserContent>
                </Card>
                <Card loading={this.state.loading} title="相关用户健康信息" className="profile-friend profile">
                   <UserInformation></UserInformation>
                </Card>
            </div>
        );
    }
}

export default UserProfile;