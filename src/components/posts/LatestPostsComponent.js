"use strict";
import React,{Component} from "react";
import { View, Text,Button,FlatList,ActivityIndicator } from "react-native";
import {connect} from 'react-redux';
import {getLatestPosts,refreshLatestPage,incrementLatestPage} from '../../actions/posts.js';
import {Actions} from 'react-native-router-flux';
import SinglePostComponent from './SinglePostComponent.js';
class LatestPostsComponent extends Component {
	constructor(props){
		super(props);
	}
	refreshPosts = async ()=>{
		await this.props.refreshLatestPage();
		this.props.getLatestPosts(this.props.latest.page);
	}
	componentWillMount = ()=>{
		this.props.getLatestPosts(this.props.latest.page);
	}
	loadMorePosts = async ()=>{
		this.props.incrementLatestPage();
		
		if(this.props.latest.pages>=this.props.latest.page){
			this.props.getLatestPosts(this.props.latest.page);
		}
	}
	_keyExtractor(post, index) {
		return post;
	}
	renderItem = ({item})=> {
		return (<SinglePostComponent post= {this.props.postsHash[item]} />);
	}
	renderFooter = ()=>{
			return(
				this.props.latest.loading?<ActivityIndicator size="large" color="black"/>:<View/>
			);
	}
	render=()=>{
		if(this.props.latest){
			return (
				<View style={{flex:1}}>
					<FlatList
						data={this.props.latest.posts}
						renderItem={this.renderItem}
						keyExtractor={this._keyExtractor}
						onEndReached={this.loadMorePosts}
						onEndReachedThreshold={0.1}
						onRefresh={this.refreshPosts}
						ListFooterComponent = {this.renderFooter}
						refreshing={this.props.latest.refreshing}
					/>				
				</View>
			);
		}
		return(
			<Text>Not there</Text>
			
		);
	}
}
const mapStateToProps=(state)=>{
	return {
		latest: state.posts.latest,
		postsHash:state.posts.postsHash
	};
};
export default connect(mapStateToProps,{getLatestPosts,refreshLatestPage,incrementLatestPage})(LatestPostsComponent);