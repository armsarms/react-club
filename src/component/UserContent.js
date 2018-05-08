import React, { Component } from 'react';
import { Card, Button,List, Avatar, Spin } from 'antd';
import '../styles/user-profile.css';
import PostList from '../pages/PostList';
import axios from "axios";

const data = [
    {
        aa: 'Ant Design Title 1',
        qq:'ee'
    },
    {
        aa: 'Ant Design Title 2',
        qq:'ee'
    },
    {
        aa: 'Ant Design Title 3',
        qq:'ee'
    },
    {
        aa: 'Ant Design Title 4',
        qq:'ee'
    },
];
class UserContent extends Component {
    state = {
        loading: true,
        loadingMore: false,
        showLoadingMore: true,
        data: [],
      }
      componentDidMount() {
        this.getData((res) => {
          this.setState({
            loading: false,
            data: res.data,
          });
        });
      }
      getData = (callback) => {
        axios({
          url: 'http://localhost:3000/list?_limit=5',
          type: 'json',
          method: 'get',
          contentType: 'application/json',
        }).then((res) => {
            console.log(res);
            
            callback(res);
          });
      }
      onLoadMore = () => {
        this.setState({
          loadingMore: true,
        });
        this.getData((res) => {
          const data = this.state.data.concat(res.data);
          this.setState({
            data,
            loadingMore: false,
          }, () => {
            // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
            // In real scene, you can using public method of react-virtualized:
            // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
            window.dispatchEvent(new Event('resize'));
          });
        });
      }
    render() {
        const { loading, loadingMore, showLoadingMore, data } = this.state;
        const loadMore = showLoadingMore ? (
          <div style={{ textAlign: 'center', marginTop: 12, height: 32, lineHeight: '32px' }}>
            {loadingMore && <Spin />}
            {!loadingMore && <Button onClick={this.onLoadMore}>loading more</Button>}
          </div>
        ) : null;
        return (
            <div>
                <List
                     className="demo-loadmore-list"
                     loading={loading}
                     itemLayout="horizontal"
                     loadMore={loadMore}
                     dataSource={data}
                    renderItem={
                        item => (
                            <List.Item actions={[<a>edit</a>, <a>more</a>]}>
                                <List.Item.Meta
                                    avatar={<Avatar src={item.avatar} />}
                                    title={<a href={item.title_href}>{item.title}</a>}
                                    description={item.username}
                                />
                                 <div>content</div>
                            </List.Item>
                        )
                    }
                />
            </div>
        );
    }
}

export default UserContent;