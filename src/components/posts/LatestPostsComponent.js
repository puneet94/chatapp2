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
		await this.props.incrementLatestPage();
		
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
	/*renderFooter = ()=>{
		return (
			<View style={{flex:1}}>
				<Text>{"FOOTER FOOTER"}</Text>
				<ActivityIndicator animating size="large"/>
			</View>
		);
	}*/
	render=()=>{
		
		if(this.props.latest){
			return (
				<View style={{flex:1}}>
					<FlatList
						data={this.props.latest.posts}
						renderItem={this.renderItem}
						keyExtractor={this._keyExtractor}
						onEndReached={this.loadMorePosts}
						onEndReachedThreshold={200}
						onRefresh={this.refreshPosts}
						
						refreshing={this.props.latest.loading}
						getItemLayout={(data, index) => (
  							{length: 230, offset: 230 * index, index}
						)}
						
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