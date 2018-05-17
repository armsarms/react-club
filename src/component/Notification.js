import React, { Component } from 'react';
import logo from '../logo.svg';
import { Button, Modal, Icon } from 'antd';

class Notification extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal1Visible: false,
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
            timeOut = (Math.floor(Math.random() * 30 + 1))
            console.log(timeOut);
            if (timeOut == 10 && sessionStorage.getItem('username')!=null) {
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
                        <source src="http://www.runoob.com/try/demo_source/mov_bbb.mp4" type="video/mp4" />
                    </video>
                    <p><Icon type="environment" />跌倒发生地址：广东省 广州市番禺区大学城外环西路100号</p>
                    <p><Icon type="phone" />用户电话：(020)39322316</p>
                </Modal>
            </div>
        );
    }
}


export default Notification;