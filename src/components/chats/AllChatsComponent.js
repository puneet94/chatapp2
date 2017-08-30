"use strict";
import React from "react";
import { View, Text,Button,FlatList } from "react-native";
import {connect} from 'react-redux';
import {getAllChats,refreshAllChatPage,incrementAllChatPage} from '../../actions/chats';
import {Actions} from 'react-native-router-flux';

import SingleChatComponent from './SingleChatComponent';
class AllChatsComponent extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			page: 1
		};
	}
	refreshChats = async ()=>{
		await this.props.refreshAllChatPage();
		this.props.getAllChats(this.props.all.page);
	}
	componentWillMount = ()=>{
		this.props.getAllChats(this.props.all.page);
	}
	loadMoreChats = async ()=>{
		await this.props.incrementAllChatPage();
		
		let pages = this.props.all.pages;
		let page = this.props.all.page;
		console.log(pages);
		console.log(page);
		if(pages>=page){
			this.props.getAllChats(page);
		}
	}
    /*
	componentWillMount=()=>{
		this.setState({
			refreshing: true
		});
		this.props.getAllChats(1);            
		this.setState({
			refreshing: false
		});
		
	}
	refreshChats = ()=>{
		this.setState({
			refreshing: true,
			page: 1
		},()=>{
			this.props.getAllChats(1);
		});

		
		this.setState({
			refreshing: false
		});
	}
	loadMoreChats = ()=>{
		console.log("called load more chats");
		console.log(this.props.all.pages);
		console.log(this.state.page);
		if(this.props.all.pages>=(this.state.page+1)){
			this.setState({
				page: this.state.page+1
			},()=>{
				this.props.getAllChats(this.state.page);
			});
		}	
	}*/
	renderItem = ({item})=>{
		return (<SingleChatComponent chat= {this.props.chatsHash[item]} />);
	}
	render=()=>{
		if(this.props.all){
			return (
				<View style={{flex:1}}>
					<FlatList
						data={this.props.all.chats}
						renderItem={this.renderItem}
						keyExtractor={(item)=>item}
						onEndReached={this.loadMoreChats}
						onEndReachedThreshold={0.1}
						onRefresh={this.refreshChats}
						refreshing={this.props.all.loading}
					/>				
				</View>
			);
		}
		return(
			<Text>Not there</Text>
			
		);
	}
	componentWillUnmount = ()=>{
		//this.refreshChats();
	}
}
const mapStateToProps=(state)=>{
	return {
		all: state.chats.all,
		chatsHash: state.chats.chatsHash
	};
};
export default connect(mapStateToProps,{getAllChats,refreshAllChatPage,incrementAllChatPage})(AllChatsComponent);