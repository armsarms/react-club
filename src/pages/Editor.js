import React, { Component } from 'react';
import { Card, Button,message } from 'antd';
import '../styles/home-sider.css';
import axios from "axios";
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/braft.css'
import { Input, Col, Select, InputNumber, DatePicker, AutoComplete, Cascader } from 'antd';
const InputGroup = Input.Group;
const Option = Select.Option;
const success = (content) => {
    message.success(content);
  };
  
  const error = (content) => {
    message.error(content);
  };

class Editor extends Component {
    // handleChange = (content) => {
    //     console.log(content)
    // }
    state = {
        dataSource: [],
        autoComplete: '',
        select: '分组选择'
    }
    componentDidMount () {
        console.log(sessionStorage.getItem('username'));
        
         if(sessionStorage.getItem('username')==null){
             console.log('success');  
             this.props.history.push("/")
         } 
    }
    handleRawChange = (rawContent) => {
        console.log(rawContent)
    }
    handleSubmit = () => {
        // console.log(this.state.autoComplete);
        // console.log(this.state.select);
        const content = this.editorInstance.getContent();
        // const username =console.log(test);
        if (content != '' && this.state.select != "分组选择" && this.state.autoComplete != '') {
            axios.post('http://localhost:3000/list', {
                content: content,
                group: this.state.select,
                title: this.state.autoComplete
            }).then(function (res) {
                if(res.status==201){
                    // console.log('success');
                    success('提交成功');    
                } else {
                    error('提交失败，请稍后再尝试');
                }
            })
        } else {
            // console.log('false');
            error('必填内容未填写完');
        }

    }

    handleChangeSelet = (value) => {
        this.setState({
            select: value
        });
    }
    handleChangeAuto = (value) => {
        this.setState({
            autoComplete: value
        });
    }
    render() {
        const editorProps = {
            height: 500,
            contentFormat: 'html',
            initialContent: '<p>Hello World!</p>',
            // onChange: this.handleChange,
            // onRawChange: this.handleRawChange,
            extendControls: [
                {
                    type: 'button',
                    text: 'Submit',
                    html: '<span style="font-weight:bold;font-size:20px;">Submit</span>',
                    hoverTitle: 'submit!',
                    className: 'submit-button',
                    onClick: () => this.handleSubmit(),
                }
            ]
        }

        return (
            <div className="demo">
                <h1>testtest</h1>
                <div>
                    <InputGroup>
                        <Select style={{ width: '20%' }} value={this.state.select}
                            onChange={this.handleChangeSelet}
                        >
                            <Option value="usually">日常护理</Option>
                            <Option value="international">互联网IT</Option>
                        </Select>
                        <AutoComplete style={{ width: '70%' }}
                            onChange={this.handleChangeAuto}
                            placeholder="标题"
                            value={this.state.autoComplete}
                        />
                    </InputGroup>
                </div>
                <BraftEditor {...editorProps} ref={instance => this.editorInstance = instance} className='editor' />
            </div>
        );
    }
}

export default Editor;