import React from 'react';
import { Button, Modal } from 'antd';
import Sign from "../component/Sign"
class ShowModal extends React.Component {
    state = { visible: false }
    showModal = () => {
        this.setState({
            visible: true,
        });
    }
    handleOk = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }
    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }
    render() {
        const { modalName,stateChange } = this.props;
        return (
            <div>
                <span onClick={stateChange}>{modalName}</span>
                <Modal
                    title="登陆"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    width={300}     
                    footer={null}
                    destroyOnClose={true}   
                >
                <Sign></Sign>
                </Modal>
            </div>
        );
    }
}

export default ShowModal;