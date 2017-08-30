"use strict";
import React from "react";
import { View, Text,Button,FlatList } from "react-native";
import {connect} from "react-redux";
import {getNearbyPosts,incrementNearbyPostsPage} from "../../actions/posts";
import {Actions} from "react-native-router-flux";

import SinglePostComponent from "./SinglePostComponent";

class NearbyPostsComponent extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			page: 1
		};
	}
    
	componentWillMount=()=>{
		this.setState({
			refreshing: true
		});
		this.props.getNearbyPosts(1);            
		this.setState({
			refreshing: false
		});
		
	}
	refreshPosts = ()=>{

		



		this.setState({
			refreshing: true,
			page: 1
		},()=>{
			this.props.getNearbyPosts(1);
		});
		
		
		this.setState({
			refreshing: false
		});
	}
	loadMorePosts = ()=>{
		if(this.props.nearby.pages>=(this.state.page+1)){
			this.setState({
				page: this.state.page+1
			},()=>{
				this.props.getNearbyPosts(this.state.page);
			});
		}
		
	}
	_keyExtractor(post, index) {
		return post._id;
	}
	
	renderItem = ({item})=> {
			return (<SinglePostComponent post= {item} location={this.props.location}/>);
	}
	render=()=>{
		
		if(this.props.nearby&&!this.props.location_error){
			return (
				<View style={{flex:1}}>
					<FlatList
						data={this.props.nearby.posts}
						renderItem={this.renderItem}
						keyExtractor={this._keyExtractor}
						onEndReached={this.loadMorePosts}
						onEndReachedThreshold={0.1}
						onRefresh={this.refreshPosts}
						refreshing={this.state.refreshing}
						style={{flex:1}}
						initialNumToRender={10}
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
		nearby: state.posts.nearby,
		location: state.user.location,
		location_error: state.user.user_location_error
	};
};
export default connect(mapStateToProps,{getNearbyPosts,incrementNearbyPostsPage})(NearbyPostsComponent);