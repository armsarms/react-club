import React from 'react';
import { Link, Router, Route, Switch } from 'react-router-dom';
import { Layout, Menu, Breadcrumb, Icon, Input,Button } from 'antd';
import PostList from '../pages/PostList';
import '../styles/home-layout.css';
import Home from '../pages/Home';
import ShowModal from '../component/ShowModal'

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
const Search = Input.Search;

class HomeLayout extends React.Component {
    render() {
        const { children } = this.props;
        return (
            <div>
                <Layout className="layout">
                    <Header className='home-header'>
                        <div className="logo" />
                        <Search
                            placeholder="search something"
                            onSearch={value => console.log(value)}
                            style={{ width: 200 }}
                            enterButton
                        />
                        <ul className="menu-ul">
                            <li><span>首页</span></li>
                            <li><ShowModal modalName="登陆"></ShowModal></li>
                            <li><span>注册</span></li>
                            <li><span>关于</span></li>
                        </ul>
                        {/* <Menu
                            theme="dark"
                            mode="horizontal"
                            defaultSelectedKeys={['2']}
                            style={{ lineHeight: '64px', float: 'right' }}
                        >
                            <Menu.Item key="1">首页</Menu.Item>
                            <Menu.Item key="2">登陆</Menu.Item>
                            <Menu.Item key="3">关于</Menu.Item>
                            <Button type="dark">Open</Button>
                        </Menu> */}
                    </Header>
                    <Content style={{ padding: '0 50px' }}>
                        <Layout style={{ padding: '0 24px 0 0'}}>
                            <Content style={{ padding: '0 24px', minHeight: 500, background: '#fff','margin-right': 20 }}>
                                <Menu mode="horizontal">
                                    <Menu.Item><Link to='/'>首页</Link></Menu.Item>
                                    <Menu.Item><Link to='/1'>精华</Link></Menu.Item>
                                    <Menu.Item><Link to='/2'>分享</Link></Menu.Item>
                                    <Menu.Item><Link to='/3'>问答</Link></Menu.Item>
                                </Menu>
                                <Switch>
                                    <Route exact path='/' component={Home} />
                                    <Route path='/1' component={PostList} />
                                    {/* <Route path='/3/:id' component={Form} /> */}
                                </Switch>
                            </Content>
                            <Sider width={300} style={{ background: '#fff' }}>
                                <ul className="home-sider">
                                    <li>1</li>
                                    <li>2</li>
                                    <li>3</li>
                                </ul>
                            </Sider>
                        </Layout>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        <p>Ant Design ©2016 Created by Ant UED</p>
                    </Footer>
                </Layout>
                {/* <main className={style.main}>
                    <div className={style.content}>
                        {children}
                    </div>
                </main> */}
            </div>
        );
    }
}

export default HomeLayout;