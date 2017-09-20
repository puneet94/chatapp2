"use strict";

import React,{Component} from "react";
import { View, Text,TouchableOpacity,StyleSheet, Platform, BackHandler, ToastAndroid } from "react-native";
import HomePage from "../screen/HomePage";
import PeoplePage from "../screen/PeoplePage";
import ChatsPage from "../screen/ChatsPage";
import ProfilePage from "../screen/ProfilePage";
import ScrollableTabView from "react-native-scrollable-tab-view";
import Icon from 'react-native-vector-icons/Ionicons';
import {Actions} from "react-native-router-flux";

class FacebookTabBar extends Component{
	constructor(props){
		super(props);
		this.tabIcons  = [];
		this.backButtonListener = null;
		this.lastBackButtonPress = null;
	}
	componentWillMount  = ()=>{
		if (Platform.OS === 'android') {
			this.initiateBackHandler();
			}
	}
	componentWillUnmount = ()=> {
		if (Platform.OS === 'android') {
		this.backButtonListener.remove();}
	}
  initiateBackHandler = ()=>{
			this.backButtonListener = BackHandler.addEventListener('hardwareBackPress', ()=> {
			if(Actions.currentScene!='tabs'){
				Actions.pop();			
				return false;
			}
			else{
				ToastAndroid.show('Press again to exit', ToastAndroid.SHORT);
			}
			if (this.lastBackButtonPress + 2000 >= new Date().getTime()) {
				BackHandler.exitApp();
				return true;
			}
		
			this.lastBackButtonPress = new Date().getTime();
				
		});
		   
	}
	componentDidMount = ()=> {
		this._listener = this.props.scrollValue.addListener(this.setAnimationValue);
	
	}
  
	setAnimationValue = ({ value, })=> {
	  this.tabIcons.forEach((icon, i) => {
		const progress = Math.min(1, Math.abs(value - i))
		icon.setNativeProps({
		  style: {
			color: this.iconColor(progress),
		  },
		});
	  });
	}
  
	//color between rgb(59,89,152) and rgb(204,204,204)
	iconColor = (progress) =>{
	  const red = 59 + (204 - 59) * progress;
	  const green = 89 + (204 - 89) * progress;
	  const blue = 152 + (204 - 152) * progress;
	  return `rgb(${red}, ${green}, ${blue})`;
	}
	render = ()=> {
	  return <View style={[styles.tabs, this.props.style, ]}>
		{this.props.tabs.map((tab, i) => {
		  return <TouchableOpacity key={tab} onPress={() => this.props.goToPage(i)} style={styles.tab}>
			<Icon
			  name={tab}
			  size={30}
			  color={this.props.activeTab === i ? 'rgb(50,20,110)' : 'rgb(204,204,204)'}
			  ref={(icon) => { this.tabIcons[i] = icon; }}
			/>
		  </TouchableOpacity>;
		})}
	  </View>;
	}
  }

  const styles = StyleSheet.create({
	tab: {
	  flex: 1,
	  alignItems: 'center',
	  justifyContent: 'center',
	  paddingBottom: 10,
	},
	tabs: {
	  height: 45,
	  flexDirection: 'row',
	  paddingTop: 5,
	  borderWidth: 1,
	  borderTopWidth: 0,
	  borderLeftWidth: 0,
	  borderRightWidth: 0,
	  borderBottomColor: 'rgba(0,0,0,0.05)',
	  backgroundColor: "white"
	},
  });
  
  


export default class TabsComponent extends Component {
	render(){
		return(
			<ScrollableTabView tabBarPosition="bottom" renderTabBar={() => <FacebookTabBar />}>
				<HomePage tabLabel="md-home" />
				<PeoplePage tabLabel="md-people" />
				<ProfilePage tabLabel="md-person" />
				<ChatsPage tabLabel="md-chatbubbles" />
			</ScrollableTabView>
		);
	}
}