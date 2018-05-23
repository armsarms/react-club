import React from 'react';
import { Link, Router, Route, Switch,withRouter } from 'react-router-dom';
import { Layout, Menu, Breadcrumb, Icon, Input, Button, Popover, BackTop } from 'antd';
import '../styles/home-layout.css';
import MainHome from '../pages/MainHome';
import ShowModal from '../component/ShowModal'
import Home from '../pages/Home';
import HomeSider from "../component/HomeSider"
import Notification from "../component/Notification"
import HomeSearch from "../component/HomeSearch"

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
const Search = Input.Search;
const content = (
    <div>
      <p>制作by</p> 
      <p>姓名：林思洋</p>   
      <p>班级：14电子信息(4)</p>
      <p>学号：3114002900</p>
    </div>
  );
  
class HomeLayout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sign:'show-false',
            signOut:'show-true',
            username:sessionStorage.getItem('username'),
        };
        this.stateChange = this.stateChange.bind(this);
        this.handleSignOut = this.handleSignOut.bind(this);
    }
    componentDidMount() {
        this.stateChange();
    }
    stateChange() {
        console.log('sss');    
        if(sessionStorage.getItem('access_token')){
            console.log("hh");
            this.setState({
                sign: 'show-true',
                signOut:'show-false',
                username:sessionStorage.getItem('username')
            });  
        }
    }
    handleSignOut() {
        sessionStorage.removeItem('access_token');
        sessionStorage.removeItem('username');
        this.setState({
            sign: 'show-false',
            signOut:'show-true',
            username:sessionStorage.getItem('username')
        }); 
        this.props.history.push('/'); 
    }
    render() {
        const { children } = this.props;
        return (
            <div>
                <Layout className="layout">
                    <Header className='home-header'>
                        <Icon type="medicine-box"  className="logo" />
                        <HomeSearch></HomeSearch>
                        <ul className="menu-ul">
                            <li><span><Link to='/' style={{color:'rgb(240, 255, 255)'}}>首页</Link></span></li>
                            <li className={this.state.sign}><ShowModal modalName="登陆" stateChange={this.stateChange} modal="sign"></ShowModal></li>
                            <li className={this.state.sign}><ShowModal modalName="注册" modal="register"></ShowModal></li>
                            <li className={this.state.signOut}><span onClick={this.handleSignOut}>退出</span></li>
                            <li><Popover content={content} title="医疗预警系统" trigger="click">
                            <span>关于</span></Popover></li>
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
                                <MainHome key={this.state.username+'MainHome'}></MainHome>
                            </Content>
                            <Sider width={300} style={{ background: '#fff' }}>
                                <HomeSider key={this.state.username+'HomeSider'} username={this.state.username}/>
                            </Sider>
                        </Layout>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        <p>system ©2018 Created by ARMS</p>
                    </Footer>
                    <Notification></Notification>
                    <BackTop />
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

export default withRouter(HomeLayout);