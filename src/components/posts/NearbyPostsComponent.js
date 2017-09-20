"use strict";
import React from "react";
import { View, Text,Button,FlatList,ActivityIndicator } from "react-native";
import {connect} from "react-redux";
import {getNearbyPosts,refreshNearbyPage,incrementNearbyPage} from "../../actions/posts";
import {Actions} from "react-native-router-flux";

import SinglePostComponent from "./SinglePostComponent";

class NearbyPostsComponent extends React.Component {
	constructor(props){
		super(props);
	}
	refreshPosts = async ()=>{
		await this.props.refreshNearbyPage();
		this.props.getNearbyPosts(this.props.nearby.page);
	}
	componentWillMount = ()=>{
		this.props.getNearbyPosts(this.props.nearby.page);
	}
	loadMorePosts = async ()=>{
		this.props.incrementNearbyPage();
		if(this.props.nearby.pages>=this.props.nearby.page){
			this.props.getNearbyPosts(this.props.nearby.page);
		}
	}
	_keyExtractor(post, index) {
		return post;
	}
	renderItem = ({item})=> {
		return (<SinglePostComponent location={this.props.location} post= {this.props.postsHash[item]} />);
	}
	renderFooter = ()=>{
		return(
			this.props.nearby.loading?<ActivityIndicator size="large" color="black"/>:<View/>
		);
	}
	render=()=>{
		if(this.props.nearby){
			return (
				<View style={{flex:1}}>
					<FlatList
						data={this.props.nearby.posts}
						renderItem={this.renderItem}
						keyExtractor={this._keyExtractor}
						onEndReached={this.loadMorePosts}
						onEndReachedThreshold={0.1}
						onRefresh={this.refreshPosts}
						refreshing={this.props.nearby.refreshing}
						ListFooterComponent = {this.renderFooter}
						style={{flex:1}}
						initialNumToRender={10}
					/>
				</View>
			);
		}
		return(
			<View style={{justifyContent:"center",paddingHorizontal:20,flex:1,backgroundColor:"white",alignItems:"center"}}>
				<Text style={{fontWeight:"500",fontSize:20}}>Location Details not available.Turn on location and restart the app</Text>	
			</View>
		);
	}
}
const mapStateToProps=(state)=>{
	return {
		nearby: state.posts.nearby,
		location: state.user.location,
		location_error: state.user.user_location_error,
		postsHash:state.posts.postsHash
	};
};
export default connect(mapStateToProps,{getNearbyPosts,refreshNearbyPage,incrementNearbyPage})(NearbyPostsComponent);