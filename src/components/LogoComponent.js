import React,{Component} from 'react';
import {View,Text,AsyncStorage,Image,Button,TouchableHighlight,Modal} from 'react-native';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import {fetchUserDetails,fetchUserLocationDetails,userSetDetails} from '../actions/user.js';
import {JWT_TOKEN} from '../actions/constants';
import {login} from "../actions/auth.js";

import PolicyComponent from "./PolicyComponent";
class LogoComponent extends Component{
	constructor(props){
		super(props);
		this.state = {
			modalVisible: false,
			loading: true
		}
	}
	  setModalVisible(visible) {
		this.setState({modalVisible: visible});
	  }
	componentWillMount = async ()=>{
		this.props.fetchUserLocationDetails();
		try {
			const value = await AsyncStorage.getItem(JWT_TOKEN);
			this.tokenValue = value;
			if (value !== null){
				await this.props.fetchUserDetails(value);
				this.initiatePushNotification();
				
			}else{
				//Actions.auth();
				//this.props.login();
			}
		} catch (error) {
			console.log("logo catch");
			console.log(error);
			//Actions.auth();
			this.props.login();
		}finally{
			this.setState({
				loading: false
			});
		}
	}
	doLogin = ()=>{
		this.setState({
			loading: true
		});
		this.props.login();
	}
	render= ()=>{
		if(this.state.loading){
			return (
				<View style={{flex:1,backgroundColor:"white",justifyContent:"center",alignItems:"center"}}>            
					<Image source={require('./main_icon.png')} style={{width:100,height:100,marginBottom:10}} />
					<Text style={{fontSize:32,fontWeight:"600"}}>{"Gossip"}</Text>
				</View>   
				
			);
		}
		else{
			return (
				<View style={{flex:1,backgroundColor:"white",justifyContent:"center",alignItems:"center"}}>            
					
					<Image source={require('./main_icon.png')} style={{width:100,height:100,marginBottom:10}} />
					<Text style={{fontSize:42,fontWeight:"600"}}>{"Gossip"}</Text>
					<Modal
          				animationType="slide"
						transparent={false}
						visible={this.state.modalVisible}
						onRequestClose={() => {}}
          			>
						<View style={{marginTop: 22,flex:1}}>
								<PolicyComponent style={{flex:1}}/>
								<Button style={{flex:0.3}} title="Close" onPress={() => {
								this.setModalVisible(!this.state.modalVisible)
								}}>
								</Button>
							
						</View>
        			</Modal>
					<TouchableHighlight style={{marginVertical:20}}  onPress={() => {this.setModalVisible(true)}}>
					<Text 
						style={{fontSize: 18,fontWeight:'500', 
							textDecorationLine: "underline",
							textDecorationStyle: "solid",
							textDecorationColor: "#000"}}>
							Privacy Policy
						</Text>
					</TouchableHighlight>
					<Button title="accept & continue" onPress={()=>{this.doLogin()}}/>
				</View>   
			);
		}
	}
	initiatePushNotification=()=>{
		var PushNotification = require('react-native-push-notification');
		PushNotification.configure({
			onRegister: (token)=> {
				console.log(  token.token );
				this.props.userSetDetails({device_token:token.token});
				/*Alert.alert(
					'Delete Post',
					token.token,
					[
					  {text: 'Yes'},
					  {text: 'Cancel'}
					],
					{ cancelable: true }
				  );*/
			},
			// (required) Called when a remote or local notification is opened or received
			onNotification: function(notification) {
				console.log( 'NOTIFICATION:', notification );
			},
			// ANDROID ONLY: GCM Sender ID (optional - not required for local notifications, but is need to receive remote push notifications)
			senderID: "895971150926",
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
			requestPermissions: true
		});
	}
}
export default connect(null,{userSetDetails,fetchUserDetails,fetchUserLocationDetails,login})(LogoComponent);