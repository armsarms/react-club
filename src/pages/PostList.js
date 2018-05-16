import React, { Component } from 'react';
import axios from 'axios';
import { Tag } from 'antd';
import {Link} from 'react-router-dom';
import '../styles/post-list.css';

class PostList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: ['']
        }
    }
    componentDidMount() {
        axios.get('http://localhost:3000/list').then(function (res) {
            this.setState({ list: res.data })
            // console.log(this.state.list);
            // console.log(this.state.list[1]);
        }.bind(this))
        // axios({
        //     method: "get",
        //     url: 'http://localhost:3000/user',
        //     headers: {
        //         'Access-Token': '123456' // 从sessionStorage中获取access token
        //       }
        // }).then(function (res) {
        //     console.log(res);
        //     this.setState({ list: res.data })
        // }.bind(this))

        // get('http://localhost:3000/user').then(function (res) {
        //     if (res) {
        //         this.setState({ list: res.data })
        //     }
        //     // console.log(res);   
        // }.bind(this)).catch(function (error) {
        //     console.log(error);
        //     this.props.history.push('/login')
        // }.bind(this));


        // let token = ''; 
        // axios({
        //     method: "post",
        //     url: 'http://localhost:3000/login',
        //     data: {
        //         account: "admin",
        //         password: "123456"
        //       }
        // }).then(function (res) {
        //     console.log(res.headers['access-token']);
        //     console.log(res);
        //     token = res.headers['access-token'];
        // }.bind(this)).then(function () {
        //     console.log(token+'haha');
        //     axios({
        //         method: "get",
        //         url: 'http://localhost:3000/user',
        //         headers: {
        //             'Access-Token': token // 从sessionStorage中获取access token
        //           }
        //     }).then(function (res) {
        //         console.log(res);
        //         this.setState({ list: res.data })
        //     }.bind(this))
        // }.bind(this))


    }
    // handleEdit(li) {
    //     // var data = { id: li.id, username: li.username, password: li.password };
    //     var data = {
    //         username: {
    //             valid: true,
    //             value: li.username,
    //             error: ''
    //         },
    //         password: {
    //             valid: true,
    //             value: li.password,
    //             error: ''
    //         }
    //     };
    //     var path = {
    //         pathname: '/3/' + li.id,
    //         state: data,
    //     }
    //     this.props.history.push(path)
    // }
    // handleDel(li) {
    //     del('http://localhost:3000/user/' + li.id).then(function (res) {
    //         this.setState({ list: this.state.list.filter(item => item.id !== li.id) })
    //         // console.log(res);               
    //     }.bind(this)).catch(function (error) {
    //         console.log(error);
    //     });
    // }

    render() {
        const lists = this.state.list;//important
        return (
            <div>
                <main>
                    {lists.map((list) =>
                        (
                            <div key={list.id} className="userList">
                                <div className="left-side">
                                    <a href={list.avatar_master}><img src={list.avatar} alt="" />
                                    </a>
                                    <span>
                                        {list.count_of_replies}/{list.count_of_visits}
                                    </span>
                                </div>
                                <div className="main-side">
                                    <Tag color="purple">{list.label}</Tag>
                                    <Link to={'/5/'+list.id} className="title">{list.title}</Link>
                                </div>
                                {/* <div className="right-side">
                                    <a href={list.last_master}><img src={list.last_time_user} alt="" />
                                    </a>
                                    <span>
                                        {list.last_time}
                                    </span>
                                </div> */}
                            </div>
                        )
                    )}
                </main>
            </div>
        );
    }
}

export default PostList;
