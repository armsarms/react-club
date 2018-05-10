import React, { Component } from 'react';
import { Card, Button } from 'antd';
import '../styles/home-sider.css';
import axios from "axios";
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/braft.css'
import { Input, Col, Select, InputNumber, DatePicker, AutoComplete, Cascader } from 'antd';
const InputGroup = Input.Group;
const Option = Select.Option;

class Editor extends Component {
    // handleChange = (content) => {
    //     console.log(content)
    // }
    state = {
        dataSource: [],
        autoComplete: '',
        select: '分组选择'
    }
    handleRawChange = (rawContent) => {
        console.log(rawContent)
    }
    handleSubmit = () => {
        // console.log(this.state.autoComplete);
        // console.log(this.state.select);
        const content = this.editorInstance.getContent();
        // const username =console.log(test);
        axios.post('http://localhost:3000/list', {
            content: content,
            group:this.state.select,
            title:this.state.autoComplete
        }).then(function (res) {
            console.log(res);
        })
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
                    html: '<span style="color:red;">Submit</span>',
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
                <BraftEditor {...editorProps} ref={instance => this.editorInstance = instance} />
            </div>
        );
    }
}

export default Editor;