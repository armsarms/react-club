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

    handleRawChange = (rawContent) => {
        console.log(rawContent)
    }
    handleSubmit = () => {
        const content = this.editorInstance.getContent();
        const username =
            console.log(test);
        axios.post('http://localhost:3000/list', {
            content: content
        }).then(function (res) {
            console.log(res);
        })
    }
    state = {
        dataSource: [],
    }
    handleChange = (value) => {
        this.setState({
            dataSource: !value || value.indexOf('@') >= 0 ? [] : [
                `${value}@gmail.com`,
                `${value}@163.com`,
                `${value}@qq.com`,
            ],
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
                    <InputGroup size="large">
                        <Col span={5}>
                            <Input defaultValue="0571" />
                        </Col>
                        <Col span={8}>
                            <Input defaultValue="26888888" />
                        </Col>
                    </InputGroup>
                    <InputGroup compact>
                        <Select defaultValue="Sign Up">
                            <Option value="Sign Up">Sign Up</Option>
                            <Option value="Sign In">Sign In</Option>
                        </Select>
                        <AutoComplete
                            dataSource={this.state.dataSource}
                            style={{ width: 200 }}
                            onChange={this.handleChange}
                            placeholder="Email"
                        />
                    </InputGroup>
                </div>
                <BraftEditor {...editorProps} ref={instance => this.editorInstance = instance} />
            </div>
        );
    }
}

export default Editor;