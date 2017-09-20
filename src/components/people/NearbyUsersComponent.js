"use strict";
import React from "react";
import { View, Text,Button,FlatList,ActivityIndicator } from "react-native";
import {connect} from "react-redux";
import {getNearbyUsers,refreshNearbyPage,incrementNearbyPage} from "../../actions/users";
import {Actions} from "react-native-router-flux";
import SingleUserComponent from "./SingleUserComponent";
class NearbyUsersComponent extends React.Component {
	constructor(props){
		super(props);
	}
	refreshUsers = async ()=>{
		await this.props.refreshNearbyPage();
		this.props.getNearbyUsers(this.props.nearby.page);
	}
	componentWillMount = ()=>{
		this.props.getNearbyUsers(this.props.nearby.page);
	}
	loadMoreUsers = async ()=>{
		this.props.incrementNearbyPage();
		if(this.props.nearby.pages>=this.props.nearby.page){
			this.props.getNearbyUsers(this.props.nearby.page);
		}
	}
	_keyExtractor(user, index) {
		return user;
	}
	renderItem = ({item})=> {
		return (<SingleUserComponent location={this.props.location} user= {this.props.usersHash[item]} />);
	}
	renderFooter = ()=>{
		return(
			this.props.nearby.loading?<ActivityIndicator size="large" color="black"/>:<View/>
		);
	}
	render=()=>{
		if(this.props.nearby){
			return (
				<View style={{flex:1,backgroundColor:"white"}}>
					<FlatList
						data={this.props.nearby.users}
						renderItem={this.renderItem}
						keyExtractor={this._keyExtractor}
						onEndReached={this.loadMoreUsers}
						onEndReachedThreshold={0.1}
						onRefresh={this.refreshUsers}
						refreshing={this.props.nearby.refreshing}
						ListFooterComponent = {this.renderFooter}
						style={{flex:1}}
						initialNumToRender={10}
					/>
				</View>
			);
		}
		return(
			<View style={{justifyContent:"center",paddingHorizontal:20,flex:1,backgroundColor:"white",alignItems:"center"}}>
				<Text style={{fontWeight:"500",fontSize:20}}>Location Details not available.Turn on location and restart the app</Text>	
			</View>
		);
	}
}
const mapStateToProps=(state)=>{
	return {
		nearby: state.users.nearby,
		location: state.user.location,
		location_error: state.user.user_location_error,
		usersHash:state.users.usersHash
	};
};
export default connect(mapStateToProps,{getNearbyUsers,refreshNearbyPage,incrementNearbyPage})(NearbyUsersComponent);