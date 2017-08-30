"use strict";

import React,{Component} from "react";
import { View, Text, StyleSheet,Button,TouchableOpacity } from "react-native";

import AllUsersComponent from '../components/people/AllUsersComponent';
import NearbyUsersComponent from '../components/people/NearbyUsersComponent';

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
	render=()=>{
		return(
			<View style={{flex:1}}>
				<View style={styles.tabContainer}>
					<TouchableOpacity style={[styles.singleTab,this.currentTab(1)]} onPress={ () => this.setTab(1) } >
						<Text style={styles.singleTabText}>{"NEARBY"}</Text>  
					</TouchableOpacity>
				
					<TouchableOpacity style={[styles.singleTab,this.currentTab(2)]} onPress={ () => this.setTab(2) } >
						<Text style ={styles.singleTabText}>{"ALL"}</Text>  
					</TouchableOpacity>
				</View>
				<View style={styles.singleTabContainer}>
					{
						this.renderTabs()
					}
				</View>
				<View style={styles.fabTouchableOpacity}></View>
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
		width: 60,
		height: 60,
		borderRadius: 30,
		backgroundColor: "#ee6e73",
		position: "absolute",
		bottom: 10,
		right: 10,
	}	

});
