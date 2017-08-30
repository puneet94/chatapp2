import React,{Component} from "react";
import {View,Text,Button} from "react-native"
import {connect} from "react-redux";

import {login} from "../actions/auth.js";
 class AuthComponent extends Component{
	render=()=>{
		return (
			<View>
				<Button onPress={this.props.login} title={"LOGIN"}></Button>
				
				<View><Text>{this.props.auth.error}</Text></View>
				<View><Text>{this.props.auth.jwt_token}</Text></View>
			</View>
		)
	}
}
const mapStateToProps=(state)=>{
	return {
		auth: state.auth
	};
}
export default connect(mapStateToProps,{login})(AuthComponent);
