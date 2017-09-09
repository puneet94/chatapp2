"use strict";
import React from "react";
import { View, Text,Button,FlatList,ActivityIndicator,TextInput } from "react-native";
import {connect} from "react-redux";
import {getSearchPosts,setSearchInterest} from "../../actions/posts";
import {Actions} from "react-native-router-flux";
import SinglePostComponent from "../posts/SinglePostComponent";

class SearchPostsComponent extends React.Component {
	constructor(props){
		super(props);
	}
	componentWillMount = async ()=>{
		if(this.props.interest){
			await this.props.setSearchInterest(this.props.interest);
			this.props.getSearchPosts(this.props.search.interest);
				
		}
		
	}
	
	_keyExtractor(post, index) {
		return post;
	}
	onTextChange = async (event)=>{
		const {  text } = event.nativeEvent;
		
		await this.props.setSearchInterest(text);
		console.log("received text");
		console.log(this.props.search.interest.length);
		if(this.props.search.interest.length>0){
			this.props.getSearchPosts(this.props.search.interest);
		}
	}
	renderItem = ({item})=> {
		return (<SinglePostComponent post= {this.props.postsHash[item]} />);
	}
	
	renderHeader = ()=>{
		return(
			<TextInput 
				style={{margin:7,paddingLeft:7,borderColor:"black",height:50,borderWidth:1,justifyContent:"center",borderRadius:5}}
				placeholder ="Search Posts with tags. Eg: football"			
				onChange={this.onTextChange}
				value={this.props.search.interest}			
				underlineColorAndroid = 'transparent'
				autoFocus={true}
				>
				
			</TextInput>
		);
	}
	render=()=>{
		if(!this.props.search.no_posts){
			return (
				<View style={{flex:1}}>
					<FlatList
						data={this.props.search.posts}
						renderItem={this.renderItem}
						keyExtractor={this._keyExtractor}
						ListHeaderComponent = {this.renderHeader}
						
						style={{flex:1}}
					/>
				</View>
			);
		}else if(this.props.search.no_posts){
            return (
                <Text>No posts available</Text>
            );
        }
		
	}
}

const mapStateToProps= (state) => {
	return {
		search: state.posts.search,
		postsHash:state.posts.postsHash
	};
};
export default connect(mapStateToProps,{getSearchPosts,setSearchInterest})(SearchPostsComponent);