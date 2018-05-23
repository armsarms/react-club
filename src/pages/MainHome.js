import React, { Component } from 'react';
import { Link, Router, Route, Switch } from 'react-router-dom';
import { Layout, Menu, Breadcrumb, Icon, Input,Button } from 'antd';
import PostList from '../pages/PostList';
import Home from '../pages/Home';
import ShowModal from '../component/ShowModal'
import UserProfile from './UserProfile';
import Editor from './Editor'
import UserArticle from './UserArticle'
class MainHome extends Component {
    render() {
        return (
            <div >
                <Menu mode="horizontal">
                    <Menu.Item><Link to='/'>首页</Link></Menu.Item>
                    <Menu.Item><Link to='/1/jinghuaneirong'>精华</Link></Menu.Item>
                    {/* <Menu.Item><Link to='/2'>分享</Link></Menu.Item> */}
                    <Menu.Item><Link to='/3'>个人空间</Link></Menu.Item>
                </Menu>
                <Switch>
                    <Route exact path='/' component={Home} />
                    {/* <Route path='/1' component={PostList} />                     */}
                    <Route path='/1/:search' component={PostList} />
                    <Route path='/3' component={UserProfile} />
                    <Route path='/4/:edit' component={Editor} />
                    <Route path='/5/:id' component={UserArticle} />
                </Switch>
            </div>
        );
    }
}

export default MainHome;