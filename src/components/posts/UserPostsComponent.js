"use strict";
import React,{Component} from "react";
import { View, Text,Button,FlatList,ActivityIndicator,Image,TouchableOpacity } from "react-native";
import {connect} from 'react-redux';
import {getUserPosts} from '../../actions/user.js';
import {Actions} from 'react-native-router-flux';
class UserPostsComponent extends Component {
	constructor(props){
		super(props);
	}
	
	componentWillMount = ()=>{
		this.props.getUserPosts(this.props.userId,1);
	}
	_keyExtractor(post, index) {
		return post;
	}
	openSinglePostPage = (post) => {
		Actions.singlePostPage({postId:post._id});
	}
	renderItem = ({item})=> {
		
		const post = this.props.postsHash[item];
		
		return (
			<TouchableOpacity onPress={() => this.openSinglePostPage(post)} style={{flex:1,height:250,width:250,margin:10,alignItems: 'stretch',justifyContent: 'center'}}>
				<Image 
					style={
						{
							flex:1,
							height:250,
							width:250,
							alignItems: 'center',
							justifyContent:'center'
							}
						} 
					source={{uri: post.image||"https://pimg.tradeindia.com/00043756/b/0/Plain-Dupion-Silk-Fabric.jpg"}}>
					<Text style={{padding:10,color:"white",fontSize:26,fontWeight:"600",textShadowColor: "black",textShadowOffset:{width: 2,height: 2},textShadowRadius: 3}}>{post.content}</Text>
				</Image>
			</TouchableOpacity>
		);
	}
	render=()=>{
		
		if(this.props.currentUser.posts){
			return (
				<FlatList
					data={this.props.currentUser.posts}
					renderItem={this.renderItem}
					keyExtractor={this._keyExtractor}
					horizontal={true}
					style={{flex:1,height:300}}
				/>
			);
		}
	}
}
const mapStateToProps=(state)=>{
	return {
		currentUser: state.posts.currentUser,
		postsHash:state.posts.postsHash
	};
};
export default connect(mapStateToProps,{getUserPosts})(UserPostsComponent);

