import React, { Component } from 'react';
import axios from 'axios';
import { Tag, Pagination } from 'antd';
import { Link } from 'react-router-dom';
import '../styles/post-list.css';

class PostList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [''],
            total:50,
            search:'',
        }
    }
    componentDidMount() {
        this.onChange();
    }
    componentWillReceiveProps(nextProps) {
        console.log(nextProps.match.params.search);
        // this.onChange()
        this.setState({
            search: nextProps.match.params.search,
        }, () => {
            this.onChange()
          })
       }
    onChange(val) {
        const search = this.props.match.params.search;
        console.log(search);
        this.setState({
            search: search,
            // total:res.data.length
        })
        // console.log('sss'+this.props.match.params.search);
        if (search == 'jinghuaneirong') {
            axios.get('http://localhost:3000/list?_start=' + (val - 1) * 10 + '&_limit=10').then(function (res) {
                console.log(res.data);
                this.setState({
                    list: res.data,
                    // total:res.data.length
                })
            }.bind(this))
        } else {
            axios.get('http://localhost:3000/list?title_like='+search).then(function (res) {
                console.log(res.data);
                this.setState({
                    list: res.data,
                    total:res.data.length                    
                })
            }.bind(this))
        }
    }
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
                                    <Link to={'/5/' + list.id} className="title">{list.title}</Link>
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
                    <Pagination onChange={(val) => this.onChange(val)} defaultCurrent={1} total={this.state.total} />
                </main>
            </div>
        );
    }
}

export default PostList;
