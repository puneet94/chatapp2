"use strict";
import React from "react";
import { View, Text,Button } from "react-native";
import {Actions} from 'react-native-router-flux';
export default class ChatComponent extends React.Component {
	render(){
		return(
			<View style={{
				flex:1,
				
				alignItems:"center", 
				justifyContent:"center"
			}}>
				<Text>{ "Chat Component" }</Text>
                <Button onPress={() => Actions.profile()} title="profile"></Button>
			</View>
		);
	}
}