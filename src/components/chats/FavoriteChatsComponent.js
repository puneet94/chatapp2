"use strict";
import React,{Component} from "react";
import { View, Text,Button,FlatList } from "react-native";
import {connect} from 'react-redux';
import {getFavoriteChats} from '../../actions/chats';
import {Actions} from 'react-native-router-flux';

import GroupChatComponent from './GroupChatComponent';

class FavoriteChatsComponent extends Component {
	constructor(props){
		super(props);
		this.state = {
			page: 1
		};
	}
    
	componentWillMount = ()=>{
		
		this.setState({
			refreshing: true,
			page: 1
		},()=>{
			this.props.getFavoriteChats(1);            
		});
		
		this.setState({
			refreshing: false
		});
		
	}
	refreshChats = ()=>{
		this.setState({
			refreshing: true
		});
		this.props.getFavoriteChats(1);
		
		this.setState({
			refreshing: false
		});
	}
	loadMoreChats = ()=>{
		this.setState({
			page: this.state.page+1
		},()=>{
			this.props.getFavoriteChats(this.state.page);
		})
		
	}
	renderItem = ({item})=>{
		return (<GroupChatComponent group= {item} />);
	}
	render=()=>{
		if(this.props.Favorites){
				return (
					<View style={{
				flex:1
			}}>
				<FlatList
					data={this.props.groups.chats}
					renderItem={this.renderItem}
					keyExtractor={(item)=>item._id}
					onEndReached={this.loadMoreChats}
					onEndReachedThreshold={0.1}
					onRefresh={this.refreshChats}
					refreshing={this.state.refreshing}
				/>
					
				
			</View>
				)
		}
		return(
			<Text>Not the</Text>
			
		);
	}
}
const mapStateToProps=(state)=>{
    return {
        groups: state.chats.groups
    }
}
export default connect(mapStateToProps,{getFavoriteChats})(FavoriteChatsComponent);