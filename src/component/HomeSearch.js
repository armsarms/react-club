import React, { Component } from 'react';
import { Button, Input } from 'antd';
import axios from "axios";
import { withRouter } from 'react-router-dom';

const Search = Input.Search;
class HomeSearch extends Component {
    state = {
        loading: true,
        loadingMore: false,
        showLoadingMore: true,
        data: [],
        number: 0,
    }
    getData = (value) => {
        const history = this.props.history;
        if(value!=''){
             history.push('/1/'+value);
        }
    }
    render() {
        const { loading, loadingMore, showLoadingMore, data } = this.state;
        return (
                <Search
                    placeholder="search something"
                    onSearch={(value) => this.getData(value)}
                    style={{ width: 200, margin: '0 80px' }}
                    enterButton
                />
        );
    }
}

export default withRouter(HomeSearch);