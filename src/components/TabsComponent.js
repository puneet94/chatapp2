"use strict";

import React,{Component} from "react";
import { View, Text } from "react-native";
import HomePage from "../screen/HomePage";
import PeoplePage from "../screen/PeoplePage";
import ChatsPage from "../screen/ChatsPage";
import ProfilePage from "../screen/ProfilePage";
import ScrollableTabView from "react-native-scrollable-tab-view";

export default class TabsComponent extends Component {
	render(){
		return(
			<ScrollableTabView tabBarPosition="bottom">
				<HomePage tabLabel="Home" />
				<PeoplePage tabLabel="People" />
				<ProfilePage tabLabel="Profile" />
				<ChatsPage tabLabel="Chat" />
			</ScrollableTabView>
		);
	}
}