import React from 'react';
import { Link, Router, Route, Switch,withRouter } from 'react-router-dom';
import { Layout, Menu, Breadcrumb, Icon, Input, Button, Popover } from 'antd';
import '../styles/home-layout.css';
import MainHome from '../pages/MainHome';
import ShowModal from '../component/ShowModal'
import Home from '../pages/Home';
import HomeSider from "../component/HomeSider"
import Notification from "../component/Notification"

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
const Search = Input.Search;
const content = (
    <div>
      <p>Content</p>
      <p>Content</p>
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
                        <Search
                            placeholder="search something"
                            onSearch={value => console.log(value)}
                            style={{ width: 200 ,margin:'0 80px' }}
                            enterButton
                        />
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
                        <p>Ant Design ©2016 Created by Ant UED</p>
                    </Footer>
                    <Notification></Notification>
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