import React,{Component} from "react";
import {View,Text,StyleSheet,Image,Dimensions} from "react-native";
const { width } = Dimensions.get("window");
const GroupChatComponent = ({group})=>{
	const picture = group.messageRoomImage || group.lastMessage.user.picture;
    
	return (
		
		<View style={styles.userContainer}>
			<View style={styles.userPicContainer}>
				{
					<Image style={styles.userPicture} source={{uri:picture}} />
				}
			</View>
			<View style={styles.userDetailsContainer}>
				<Text style={styles.userName}>
					{group.interest}
				</Text>
				<View style={styles.userStatus}>
					{group.lastMessage.type=="img"?<Image style={styles.chatMessagePicture} source={{uri:group.lastMessage.message}} />:
						<Text style={styles.userTextMessage}>{group.lastMessage.message}</Text>
					}
				</View>
				
			</View>
			
		</View>

	);
};






const styles = StyleSheet.create({
	userContainer: {
		flex: 1,
		backgroundColor: "#fff",
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
		justifyContent: "center"
	}
});

export default GroupChatComponent;