import React,{Component} from 'react';
import {View,Text,AsyncStorage,BackHandler,Alert} from 'react-native';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import {fetchUserDetails,fetchUserLocationDetails} from '../actions/user.js';
import {JWT_TOKEN} from '../actions/constants';
import {login} from "../actions/auth.js";
class LogoComponent extends Component{
	constructor(props){
		super(props);
	}
	componentWillMount = async ()=>{
		this.configureBackButton();
		this.props.fetchUserLocationDetails();
		this.initiatePushNotification();
		try {
			const value = await AsyncStorage.getItem(JWT_TOKEN);
			if (value !== null){
				this.props.fetchUserDetails(value);
			}else{
				//Actions.auth();
				this.props.login();
			}
		} catch (error) {
			console.log("logo catch");
			console.log(error);
			//Actions.auth();
			this.props.login();
		}
	}
	render= ()=>{
		this.configureBackButton();
		return (
			<View style={{flex:1,justifyContent:"center",alignItems:"center"}}>            
				<Text style={{fontSize:32,fontWeight:"600"}}>{"Gossip"}</Text>
			</View>            
		);
	}
	initiatePushNotification=()=>{
		var PushNotification = require('react-native-push-notification');
		
		PushNotification.configure({
		
			
			onRegister: function(token) {
				console.log('*********************token****************************');
				console.log(  token );
				Alert.alert(
					'Delete Post',
					token,
					[
					  {text: 'Yes'},
					  {text: 'Cancel'}
					],
					{ cancelable: true }
				  );
			},
		
			// (required) Called when a remote or local notification is opened or received
			onNotification: function(notification) {
				console.log( 'NOTIFICATION:', notification );
			},
		
			// ANDROID ONLY: GCM Sender ID (optional - not required for local notifications, but is need to receive remote push notifications)
			senderID: "gossip-177217",
		
			// IOS ONLY (optional): default: all - Permissions to register.
			permissions: {
				alert: true,
				badge: true,
				sound: true
			},
		
			// Should the initial notification be popped automatically
			// default: true
			popInitialNotification: true,
		
			/**
			  * (optional) default: true
			  * - Specified if permissions (ios) and token (android and ios) will requested or not,
			  * - if not, you must call PushNotificationsHandler.requestPermissions() later
			  */
			requestPermissions: true,
		});
	}
	configureBackButton = () => {
		
		BackHandler.addEventListener('hardwareBackPress',()=>{
			console.log("************called back button***********");
			console.log(Actions.currentScene);
			if(Actions.currentScene == 'logo' || Actions.currentScene=='auth' || Actions.currentScene=='tabs'){
				return false;
			}else{
				Actions.pop();
				return true;
			}
		})
	}

}
export default connect(null,{fetchUserDetails,fetchUserLocationDetails,login})(LogoComponent);