"use strict";
import React,{Component} from "react";
import { View, Text,Button,StyleSheet,TouchableOpacity } from "react-native";
import {Actions} from 'react-native-router-flux';
import AllChatsComponent from "../components/chats/AllChatsComponent.js";
import FavoriteChatsComponent from "../components/chats/FavoriteChatsComponent.js";
import {chatReceived} from "../actions/chats";
import {connect} from "react-redux";

import {URL} from "../actions/constants";
const io = require("socket.io-client");
class ChatsPage extends Component {

	constructor(props){
		super(props);
		this.state={
			currentTab: 1
		};

		this.socket = io(URL, {transports: ["websocket"]});
	}
	socketInit = (userId) => {
		this
			.socket
			
			.emit('addToSingleRoom', { 'roomId': userId });
			
		this
			.socket
			.on("newMessageReceived", (message) => {
				console.log("this is the recere");
				console.log(message);
				
				this.props.chatReceived(message);
			});
	}
	renderTabs = ()=>{
		if(this.state.currentTab==1){
			return (
				
				<AllChatsComponent/>
			);
		}else if(this.state.currentTab==2){
			return (
				<FavoriteChatsComponent/>
				
			);
		}
	}
	currentTab=(tabPage)=>{
		if(tabPage === this.state.currentTab){
			return {
				backgroundColor: "green"
			};
		}else{
			return {

			};
		}
	}
	setTab=(tab)=>{
		this.setState({currentTab:tab});
	}
	componentDidMount = ()=>{
		console.log("got userid");
		console.log(this.props.user._id);
		
		this.socketInit(this.props.user._id);
	}
	render=()=>{
		
		return(
			<View style={{flex:1}}>
				<View style={styles.tabContainer}>
					<TouchableOpacity style={[styles.singleTab,this.currentTab(1)]} onPress={ () => this.setTab(1) } >
						<Text style={{color:"white"}}>{"CHATS"}</Text>  
					</TouchableOpacity>
					{/*<TouchableOpacity style={[styles.singleTab,this.currentTab(2)]} onPress={ () => this.setTab(2) } >
						<Text style={{color:"white"}}>{"FAVORITES"}</Text> 
					</TouchableOpacity>*/}
				</View>
				<View style={styles.singleTabContainer}>
					{
						this.renderTabs()
					}
				</View>
				{/*<View style={styles.fabTouchableOpacity}></View>*/}
			</View>
		);
	}
}
const mapStateToProps = (state)=>{
	return {
		user: state.user.user
	}
}
export default connect(mapStateToProps,{chatReceived})(ChatsPage);
const styles = StyleSheet.create({
	tabContainer: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "stretch"
	},
	singleTab:{
		flex: 1,
		alignItems: "center",
		alignSelf: "stretch",
		backgroundColor: "blue",
		justifyContent: "center"
	},
	singleTabContainer:{
		flex: 11
	},
	fabTouchableOpacity:{
		width: 60,
		height: 60,
		borderRadius: 30,
		backgroundColor: "#ee6e73",
		position: "absolute",
		bottom: 10,
		right: 10,
	}
});
