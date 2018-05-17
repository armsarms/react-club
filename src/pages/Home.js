import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { Carousel } from 'antd';
import '../styles/home.css'

class Home extends Component {
  render() {
    return (
      <div className="App">
        <Carousel autoplay>
          <div>
            <Link to='/5/10035'>
              <img src="http://5b0988e595225.cdn.sohucs.com/images/20180517/9bc6464aded84b0da039d38e016fd03e.jpeg" alt="" />
              <h2>高血压日 | 清华长庚医院专家：高血压伤人“从头到脚”，防控需要这些技巧</h2>
            </Link>
          </div>
          <div>
            <Link to='/5/10036'>
              <img src="http://5b0988e595225.cdn.sohucs.com/c_fill,w_600,h_300,g_faces/images/20180517/f087127b8dc04d7ebb4f535927c275e7.jpeg" alt="" />
            <h2>《后来的我们》引发前任回忆热，哪些人更不容易“戒掉”前任</h2>
            </Link>
          </div>
          <div>
            <Link to='/5/10037'>
              <img src="http://5b0988e595225.cdn.sohucs.com/images/20180517/436b8d21bc3242d9b4427dd8eba9150b.jpeg" alt="" />
              <h2>高血压日 | 亚洲特供：中国走脑，欧美走心</h2>
            </Link>
          </div>
          <div>
            <Link to='/5/10038'>
              <img src="http://5b0988e595225.cdn.sohucs.com/images/20180517/ece97d63b8524bda8c46c0267a34dc91.jpeg" alt="" />
              <h2>高血压日 | 亚洲人血压老波动，不是好事儿</h2>
            </Link>
          </div>
        </Carousel>
      </div>
    );
  }
}

export default Home;