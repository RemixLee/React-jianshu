import React, { Component } from 'react';
import { connect } from 'react-redux';
import Topic from './components/Topic';
import List from './components/List';
import Writer from './components/Writer';
import Recommend from './components/Recommend';
import axios from 'axios';
import { 
    HomeWrapper,
    HomeLeft,
    HomeRight,
 } from './style.js';

class Home extends Component {
    render() {
        return (
            <HomeWrapper>
                <HomeLeft>
                    <img alt='' className="banner-img" src="https://upload.jianshu.io/admin_banners/web_images/4450/d17fd4b5bec7134323d089a46a71aa98f01d75bb.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/1250/h/540"/>
                    <Topic />
                    <List />
                </HomeLeft>
                <HomeRight>
                    <Recommend />
                    <Writer />
                </HomeRight>
            </HomeWrapper>
        )
    }

    componentDidMount() {
        axios.get('/api/home.json').then((res) => {
            const result = res.data;
            const action = {
                type: 'change_home_data',
                topicList: result.data.topicList,
                articleList: result.data.articleList,
                recommendList: result.data.recommendList
            }
            this.props.changeHomeData(action);
        })
    }
}

const mapDispatchToProps = (dispatch) => ({
    changeHomeData(action) {
        dispatch(action);
    }
});

export default connect(null, mapDispatchToProps)(Home);