import React, { Component } from 'react';
import axios from 'axios';
import '../styles/user-article.css'

class UserArticle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: ['']
        }
    }
    componentDidMount() {
        const id = this.props.match.params.id;
        console.log(id);
        axios.get('http://localhost:3000/list/'+id).then(function (res) {
            console.log(res);
            console.log(res.data.content);
            this.setState({ 
                list: res.data.content ,
                title: res.data.title ,
                username: res.data.username,
            })
            // console.log(this.state.list);
            // console.log(this.state.list[1]);
            document.getElementById('container').innerHTML = res.data.content;
        }.bind(this))
        
    }
    render() {
        const {title,username} = this.state;
        return (
            <div className='user-article'>
                <h1>{title}</h1>
                <div className='user-name'><p>作者：{username}</p></div>
                <div id='container'></div>  
            </div>
        );
    }
}

export default UserArticle;