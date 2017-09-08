"use strict";
import React,{Component} from "react";
import { View, Text, StyleSheet,TouchableOpacity } from "react-native";
import LatestPostsComponent from "../components/posts/LatestPostsComponent";
import PopularPostsComponent from "../components/posts/PopularPostsComponent";
import NearbyPostsComponent from "../components/posts/NearbyPostsComponent";
import {Actions} from "react-native-router-flux";
import Entypo from 'react-native-vector-icons/Entypo';
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
						<Text style={[styles.tabText,this.currentText(1)]}>{"NEARBY"}</Text>  
					</TouchableOpacity>
				
					<TouchableOpacity style={[styles.singleTab,this.currentTab(2)]} onPress={ () => this.setTab(2) } >
						<Text style={[styles.tabText,this.currentText(2)]}>{"POPULAR"}</Text>  
					</TouchableOpacity>
				
					<TouchableOpacity style={[styles.singleTab,this.currentTab(3)]} onPress={ () => this.setTab(3) } >
						<Text style={[styles.tabText,this.currentText(3)]}>{"LATEST"}</Text> 
					</TouchableOpacity>
					
				</View>
				<View style={styles.singleTabContainer}>
					{
						this.renderTabs()
					}
				</View>
				<View style={styles.fabTouchableOpacity}>
					<TouchableOpacity  onPress={ () => Actions.createpost() } >
						<Entypo name="pencil" color="white" size={28}/>
					</TouchableOpacity>
				</View>
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
		backgroundColor: "#1919ff",
		justifyContent: "center"
	},
	tabText:{
		color: "#fff",
		fontSize: 13
	},
	singleTabContainer:{
		flex: 11
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
