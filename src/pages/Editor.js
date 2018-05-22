import React, { Component } from 'react';
import { Card, Button, message } from 'antd';
import '../styles/home-sider.css';
import axios from "axios";
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/braft.css';
import { Input, Col, Select, InputNumber, DatePicker, AutoComplete, Cascader } from 'antd';

const InputGroup = Input.Group;
const Option = Select.Option;
const success = (content) => {
    message.success(content);
};

const error = (content) => {
    message.error(content);
};
const validateFn = (file) => {
    console.log('success');
    if (file.size < 1024 * 100) {
        return file.size
    } else {
        error('some thing wornging')
    }
    // return file.size < 1024 * 100
}
const uploadFn = (param) => {

    const serverURL = 'http://localhost:8086/'
    const xhr = new XMLHttpRequest
    const fd = new FormData()

    // libraryId可用于通过mediaLibrary示例来操作对应的媒体内容
    console.log(param.libraryId)

    const successFn = (response) => {
        // 假设服务端直接返回文件上传后的地址
        // 上传成功后调用param.success并传入上传后的文件地址
        param.success({
            url: xhr.responseText,
            meta: {
                id: 'xxx',
                title: 'xxx',
                alt: 'xxx',
                loop: true, // 指定音视频是否循环播放
                autoPlay: true, // 指定音视频是否自动播放
                controls: true, // 指定音视频是否显示控制栏
                poster: 'http://xxx/xx.png', // 指定视频播放器的封面
            }
        })
    }

    const progressFn = (event) => {
        // 上传进度发生变化时调用param.progress
        param.progress(event.loaded / event.total * 100)
    }

    const errorFn = (response) => {
        // 上传发生错误时调用param.error
        param.error({
            msg: 'unable to upload.'
        })
    }

    xhr.upload.addEventListener("progress", progressFn, false)
    xhr.addEventListener("load", successFn, false)
    xhr.addEventListener("error", errorFn, false)
    xhr.addEventListener("abort", errorFn, false)

    fd.append('file', param.file)
    xhr.open('POST', serverURL, true)
    xhr.send(fd)

}

class Editor extends Component {
    // handleChange = (content) => {
    //     console.log(content)
    // }
    state = {
        dataSource: [],
        autoComplete: '',
        select: '分组选择',
        avatar:'',
        username:'',
    }
    componentDidMount() {
        console.log(sessionStorage.getItem('username'));
        const username = sessionStorage.getItem('username');
        if (username == null) {
            console.log('success');
            this.props.history.push("/")
        }
        axios.get('http://localhost:3000/user?username=' + username).then(function (res) {
            console.log(res);
            if (res.data.length) {
                this.setState({
                    avatar: res.data[0].avatar,
                    username: username,
                });
            }
        }.bind(this))
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
                label: this.state.select,
                title: this.state.autoComplete,
                username: this.state.username,
                avatar:this.state.avatar,
            }).then(function (res) {
                if (res.status == 201) {
                    // console.log('success');
                    success('提交成功');
                    this.props.history.push("/1")
                } else {
                    error('提交失败，请稍后再尝试');
                }
            }.bind(this))
        } else {
            // console.log('false');
            error('必填内容未填写完');
        }

    }

    handleChangeSelet = (value) => {
        let val = '';
        switch (value) {
            case "usually":
                val = '日常护理';
                break;
            case "international":
                val = '互联网IT';
                break;
            case "life":
                val = '生活常识';
                break;
            case "something":
                val = '闲聊';
                break;
            default:
                break;
        }
        this.setState({
            select: val
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
            onChange: this.handleChange,
            onRawChange: this.handleRawChange,
            extendControls: [
                {
                    type: 'button',
                    text: 'Submit',
                    html: '<span style="font-weight:bold;font-size:20px;">Submit</span>',
                    hoverTitle: 'submit!',
                    className: 'submit-button',
                    onClick: () => this.handleSubmit(),
                }
            ],
            media: {
                allowPasteImage: true, // 是否允许直接粘贴剪贴板图片（例如QQ截图等）到编辑器
                image: true, // 开启图片插入功能
                video: true, // 开启视频插入功能
                audio: true, // 开启音频插入功能
                validateFn: validateFn, // 指定本地校验函数，说明见下文
                uploadFn: uploadFn, // 指定上传函数，说明见下文
                removeConfirmFn: null, // 指定删除前的确认函数，说明见下文
                onRemove: null, // 指定媒体库文件被删除时的回调，参数为被删除的媒体文件列表(数组)
                onChange: null, // 指定媒体库文件列表发生变化时的回调，参数为媒体库文件列表(数组)
                onInsert: null, // 指定从媒体库插入文件到编辑器时的回调，参数为被插入的媒体文件列表(数组)
            }
        }

        return (
            <div className="demo">
                <h1>编辑文章</h1>
                <div>
                    <InputGroup>
                        <Select style={{ width: '20%' }} value={this.state.select}
                            onChange={this.handleChangeSelet}
                        >
                            <Option value="usually">日常护理</Option>
                            <Option value="international">互联网IT</Option>
                            <Option value="life">生活常识</Option>
                            <Option value="something">闲聊</Option>
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