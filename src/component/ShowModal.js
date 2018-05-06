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
        const { modalName,stateChange,children } = this.props;
        return (
            <div> 
                <span onClick={this.showModal}>{modalName}</span>
                <Modal
                    title={modalName}
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    width={300}     
                    footer={null}
                    destroyOnClose={true}   
                >
                {/* {children} */}
                <Sign stateChange={stateChange} handleCancel={this.handleCancel}></Sign>
                </Modal>
            </div>
        );
    }
}

export default ShowModal;