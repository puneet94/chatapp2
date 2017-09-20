"use strict";
import React from "react";
import { View, Text,Button,FlatList,ActivityIndicator,TouchableOpacity } from "react-native";
import {connect} from "react-redux";
import {getPopularPosts,refreshPopularPage,incrementPopularPage} from "../../actions/posts";
import {Actions} from "react-native-router-flux";
import SinglePostComponent from "./SinglePostComponent";
class PopularPostsComponent extends React.Component {
	constructor(props){
		super(props);
	}
	refreshPosts = async ()=>{
		await this.props.refreshPopularPage();
		this.props.getPopularPosts(this.props.popular.page);
	}
	componentWillMount = ()=>{
		this.props.getPopularPosts(this.props.popular.page);
	}
	loadMorePosts = async ()=>{
		this.props.incrementPopularPage();
		if(this.props.popular.pages>=this.props.popular.page){
			this.props.getPopularPosts(this.props.popular.page);
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
			
			this.props.popular.loading?<ActivityIndicator size="large" color="black"/>:<View/>
		);
	}
	renderHeader = ()=>{
		return(
			<TouchableOpacity 
				onPress = {()=>{Actions.searchpost()}}
				style={{margin:7,paddingLeft:7,borderColor:"black",height:50,borderWidth:1,justifyContent:"center",borderRadius:5}}>
				
				<Text style={{fontSize:18}}>{"Search Posts"}</Text>
			</TouchableOpacity>
		);
	}
	render=()=>{
		if(this.props.popular){
			return (
				<View style={{flex:1}}>
					<FlatList
						data={this.props.popular.posts}
						renderItem={this.renderItem}
						keyExtractor={this._keyExtractor}
						onEndReached={this.loadMorePosts}
						onEndReachedThreshold={0.1}
						ListHeaderComponent = {this.renderHeader}
						ListFooterComponent = {this.renderFooter}
						onRefresh={this.refreshPosts}
						refreshing={this.props.popular.refreshing}
						style={{flex:1}}
					/>
				</View>
			);
		}
		
	}
}
const mapStateToProps=(state)=>{
	return {
		popular: state.posts.popular,
		postsHash:state.posts.postsHash
	};
}
export default connect(mapStateToProps,{getPopularPosts,refreshPopularPage,incrementPopularPage})(PopularPostsComponent);