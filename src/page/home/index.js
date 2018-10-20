import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Topic from './components/Topic';
import List from './components/List';
import Writer from './components/Writer';
import Recommend from './components/Recommend';
import { actionCreators } from './store';
import { 
    HomeWrapper,
    HomeLeft,
    HomeRight,
    BackTop,
 } from './style.js';

 class Home extends PureComponent {

    handleScrollTop() {
        window.scrollTo(0, 0);
    }

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
                {this.props.showScroll ?  <BackTop onClick={this.props.handleScrollTop}>^_^</BackTop> : null}
            </HomeWrapper>
        )
    }

    componentDidMount() {
        this.props.changeHomeData();
        this.bindEvents();
    }

    componentWillMount() {
        window.removeEventListener('scroll', this.props.changeScrollTopShow);
    }

    bindEvents() {
        window.addEventListener('scroll', this.props.changeScrollTopShow);
    }
}

const mapStateToProps = (state) => ({
    showScroll: state.getIn(['home', 'showScroll'])
})

const mapDispatchToProps = (dispatch) => ({
    changeHomeData() {
        dispatch(actionCreators.getHomeInfo());
    },
    changeScrollTopShow() {
        if(document.documentElement.scrollTop > 400) {
            dispatch(actionCreators.toggleTopShow(true))
        } else {
            dispatch(actionCreators.toggleTopShow(false))
        }
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);