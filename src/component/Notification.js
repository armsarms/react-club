import React, { Component } from 'react';
import logo from '../logo.svg';
import { Button, Modal, Icon } from 'antd';
import axios from 'axios';
import mp4 from "../WeChat.mp4";

class Notification extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal1Visible: false,
            user: false,
        };
        this.test = this.test.bind(this);
    }
    setModal1Visible(modal1Visible) {
        this.setState({ modal1Visible });
        this.test()
    }
    test() {
        let timeOut = '';
        // setInterval('timeOut = (Math.floor(Math.random()*10+1))', 1000) //1~10,一秒
        let timeInt = setInterval(function () {
            timeOut = (Math.floor(Math.random() * 40 + 1))
            // console.log(timeOut);
            // console.log(this.state.user);
            axios.get('http://localhost:3000/userinformation?username='+sessionStorage.getItem('username')).then(function (res) {
                // console.log(res);
                if (res.data.length!=0) {
                    this.setState({ user: true });
                  } else {
                    this.setState({ user: false });  
                  }
            }.bind(this))
            if (timeOut == 10 && this.state.user &&sessionStorage.getItem('username')!=null) {
                clearTimeout(timeInt)
                console.log(this.state.modal1Visible);
                this.setState({ modal1Visible: true });
            }
        }.bind(this), 1000) //1~10,一秒        

    }
    componentDidMount() {
        this.test()
    }
    render() {
        return (
            <div>
                {/* <Button type="primary" onClick={() => this.setModal1Visible(true)}>Display a modal dialog at 20px to Top</Button> */}
                <Modal
                    title="⚠⚠发生跌倒事故！"
                    style={{ top: '38%', left: '26%' }}
                    visible={this.state.modal1Visible}
                    onOk={() => this.setModal1Visible(false)}
                    onCancel={() => this.setModal1Visible(false)}
                    className="video-modal"
                >
                    <video width="100%" controls autoPlay loop>
                        <source src={mp4} type="video/mp4" />
                    </video>
                    <p><Icon type="environment" />跌倒发生地址：广东省 广州市番禺区大学城外环西路100号</p>
                    <p><Icon type="solution" />用户名字：XYZ</p>
                    <p><Icon type="tablet" />设备编号：xxx-sssx-ssssx</p>
                </Modal>
            </div>
        );
    }
}


export default Notification;