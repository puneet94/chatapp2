"use strict";
import React,{Component} from "react";
import { View, Text, StyleSheet,Button,TouchableOpacity } from "react-native";
import {Actions} from "react-native-router-flux";
import AllUsersComponent from '../components/people/AllUsersComponent';
import NearbyUsersComponent from '../components/people/NearbyUsersComponent';
import Ionicons from 'react-native-vector-icons/Ionicons';
export default class PeoplePage extends Component {
	constructor(props){
		super(props);
		this.state={
			currentTab: 2
		};
	}
	renderTabs = ()=>{
		if(this.state.currentTab==1){
			return (
				<NearbyUsersComponent/>
			);
		}else if(this.state.currentTab==2){
			return (
				<AllUsersComponent/>
			);
		}
	}
	currentText=(tabPage)=>{
		if(tabPage === this.state.currentTab){
			return {
				color: "white",
				fontSize: 14
			};
		}else{
			return {};
		}
	}
	currentTab=(tabPage)=>{
		if(tabPage === this.state.currentTab){
			return {
				borderBottomWidth: 3,
				borderBottomColor: "white"
			};
		}else{
			return {};
		}
	}
	setTab=(tab)=>{
		this.setState({currentTab:tab});
	}
	render=()=>{
		return(
			<View style={{flex:1}}>
				<View style={styles.tabContainer}>
					<TouchableOpacity style={[styles.singleTab,this.currentTab(1)]} onPress={ () => this.setTab(1) } >
						<Text style={[styles.singleTabText,this.currentText(1)]}>{"NEARBY"}</Text>  
					</TouchableOpacity>
				
					<TouchableOpacity style={[styles.singleTab,this.currentTab(2)]} onPress={ () => this.setTab(2) } >
						<Text style={[styles.singleTabText,this.currentText(2)]}>{"ALL"}</Text>  
					</TouchableOpacity>
				</View>
				<View style={styles.singleTabContainer}>
					{
						this.renderTabs()
					}
				</View>
				<View style={styles.fabTouchableOpacity}>
					<TouchableOpacity  onPress={ () => Actions.searchprofile() } >
						<Ionicons name="md-search" color="white" size={28}/>
					</TouchableOpacity>
				</View>
		</View>
		
		);
	}
}

const styles = StyleSheet.create({
	tabContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "stretch"
	},
	singleTab:{
		flex: 1,
		alignItems: "center",
		alignSelf: "stretch",
		backgroundColor: "blue",
		justifyContent: "center",
		
		padding: 12
	},
	singleTabText:{
		color: "white",
		fontSize: 14
	},
	singleTabContainer:{
		flex: 1
	},
	fabTouchableOpacity:{
		width: 50,
		height: 50,
		borderRadius: 25,
		backgroundColor: "#ee6e73",
		position: "absolute",
		bottom: 10,
		right: 10,
		flex: 1,
		justifyContent: "center",
		alignItems: "center"
	}	

});
