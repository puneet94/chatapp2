import React,{PureComponent } from "react";
import {View,Text,StyleSheet,Image,Dimensions,TouchableHighlight} from "react-native";
const { width } = Dimensions.get("window");

import {Actions} from "react-native-router-flux";
const openChatBox = (chatId,userId)=>{
	Actions.allchat({chatId,userId});
}
export default class  SingleChatComponent extends PureComponent  {
	
	constructor(props){
		super(props);
	}
	render = ()=>{
		
		const {chat} = this.props;
	return (
		<TouchableHighlight onPress={()=>openChatBox(chat._id,chat.creator2._id)} >		
			<View style={styles.userContainer}>
				<View style={styles.userPicContainer}>
					{
						chat.creator2.picture?<Image style={styles.userPicture} source={{uri:chat.creator2.picture}} />:<View></View>
					}
				</View>
				<View style={styles.userDetailsContainer}>
					<Text style={styles.userName}>
						{chat.creator2.anonName}
					</Text>
					{chat.lastMessage?<View style={styles.userStatus}>
						{chat.lastMessage.type=="img"?<Image style={styles.chatMessagePicture} source={{uri:chat.lastMessage.message}} />:
							<Text style={styles.userTextMessage}>{chat.lastMessage.message}</Text>
						}
					</View>:<View></View>}
					
				</View>
				<View style={styles.userMessageAlert}>
					<Text>
						{
							chat.lastMessageTime>chat.lastLoggedOut?"1":""
						}
					</Text>
				</View>
			</View>
		</TouchableHighlight>
	);}
};

const styles = StyleSheet.create({
	userContainer: {
		flex: 1,
		justifyContent: "flex-start",
		alignItems: "flex-start",
		flexDirection:"row",
		padding: 10,
		borderTopColor: "black",
		borderTopWidth: 0.6
	},
	userPicContainer:{
		flex: 2.5
	},
	userPicture:{
		height: 55,
		width: 55,
		borderRadius: 4

	},
	userDetailsContainer:{
		flex: 10
	},
	userName: {
		fontSize: 18,
		fontWeight: "600"
	},

	userStatus:{
	
	},
	userTextMessage:{
		fontSize: 14,
		fontWeight: "400"
	},
	chatMessagePicture:{
		width: 200,
		flex:1,
		height: 50
	},
	userImage:{
		flex:1,
		height: 300,
		width: null
	},
	userMessageAlert:{
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	}
});

