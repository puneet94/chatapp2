"use strict";

import React,{Component} from "react";
import { View, Text, StyleSheet,TouchableOpacity } from "react-native";
import LatestPostsComponent from "../components/posts/LatestPostsComponent";
import PopularPostsComponent from "../components/posts/PopularPostsComponent";
import NearbyPostsComponent from "../components/posts/NearbyPostsComponent";

export default class HomePage extends Component {
	constructor(props){
		super(props);
		this.state={
			currentTab: 3
		};
	}
	renderTabs = ()=>{
		if(this.state.currentTab==1){
			return (
				<NearbyPostsComponent/>
			);
		}else if(this.state.currentTab==2){
			return (
				<PopularPostsComponent/>
			);
		}else if(this.state.currentTab==3){
			return (
				<LatestPostsComponent/>
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
						<Text style={{color:"white"}}>{"NEARBY"}</Text>  
					</TouchableOpacity>
				
					<TouchableOpacity style={[styles.singleTab,this.currentTab(2)]} onPress={ () => this.setTab(2) } >
						<Text style={{color:"white"}}>{"POPULAR"}</Text>  
					</TouchableOpacity>
				
					<TouchableOpacity style={[styles.singleTab,this.currentTab(3)]} onPress={ () => this.setTab(3) } >
						<Text style={{color:"white"}}>{"LATEST"}</Text> 
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
