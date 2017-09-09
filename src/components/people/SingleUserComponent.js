import React,{Component} from "react";
import {View,Text,StyleSheet,Image,Dimensions,TouchableOpacity} from "react-native";
const { width } = Dimensions.get("window");
import {Actions} from "react-native-router-flux";
const userPage = (userId)=>{
	Actions.profile({userId})
}
export default class  SingleUserComponent extends Component{
		constructor(props){
			super(props);
		}
		shouldComponentUpdate = ()=>{
			return false;
		}
		render  = ()=>{
			const {user} = this.props;
			return (
				<TouchableOpacity onPress={() => userPage(user._id)}>
		<View style={styles.userContainer}>
			<View style={styles.userPicContainer}>
				{ user.picture?<Image style={styles.userPicture} source={{uri:user.picture}} />:<View></View>}
			</View>
			<View style={styles.userDetailsContainer}>
				<Text style={styles.userName}>
					{user.anonName} 
				</Text>
				<Text style={styles.userStatus}>
					{user.status}
				</Text>
				<View style={styles.userInterests}>{
					user.interests.map((interest,index)=><Text key={index}>#{interest}</Text>)}
				</View>
			</View>
		</View></TouchableOpacity>
			);}		

	
}






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
		fontSize: 14,
		fontWeight: "400"
	},
	userInterests:{
		flexDirection: "row"
	},
	userImage:{
		flex:1,
		height: 300,
		width: null
	}
});

