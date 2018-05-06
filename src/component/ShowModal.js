import React from 'react';
import { Button, Modal } from 'antd';
import Sign from "../component/Sign"
import Register from "../component/Register"

class ShowModal extends React.Component {
    state = { visible: false,modal:'' }
    showModal = () => {
        this.setState({
            visible: true,
            modal: this.props.modal
        });
    }
    handleOk = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }
    handleCancel = (e) => {
        this.setState({
            visible: false,
        });
    }
    handleChange = (e) => {
        this.setState({
            modal: 'register'
        })
    }
    componentDidMount() {
        console.log("componentDidMount");
        this.setState({
            modal: this.props.modal
        })
    }    

    render() {
        const { modalName,stateChange,children } = this.props;
        const modal = this.state.modal;
        return (
            <div> 
                <span onClick={this.showModal}>{modalName}</span>
                <Modal
                    title={modalName}
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    width={modal == 'sign' ? 300 : 500}     
                    footer={null}
                    destroyOnClose={true}   
                >
                 {  modal == 'sign' ?
                    <Sign stateChange={stateChange} handleCancel={this.handleCancel} goToRegister={this.handleChange}/>:
                    <Register stateChange={stateChange} handleCancel={this.handleCancel}/>
                }
                </Modal>
            </div>
        );
    }
}

export default ShowModal;