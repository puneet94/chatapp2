"use strict";
import React from "react";
import { View, Text,Button,FlatList,ActivityIndicator } from "react-native";
import {connect} from 'react-redux';
import {getAllUsers,refreshAllPage,incrementAllPage} from '../../actions/users';
import {Actions} from 'react-native-router-flux';
import SingleUserComponent from './SingleUserComponent';
class AllUsersComponent extends React.Component {
	constructor(props){
		super(props);
	}
    refreshUsers = async ()=>{
		await this.props.refreshAllPage();
		this.props.getAllUsers(this.props.all.page);
	}
	componentWillMount = ()=>{
		this.props.getAllUsers(this.props.all.page);
	}
	loadMoreUsers = async ()=>{
		await this.props.incrementAllPage();
		
		if(this.props.all.pages>=this.props.all.page){
			this.props.getAllUsers(this.props.all.page);
		}
	}
	_keyExtractor(user, index) {
		return user;
	}
	renderItem = ({item})=> {
		return (<SingleUserComponent user= {this.props.usersHash[item]} />);
	}
	renderFooter = ()=>{
			return(
				
				this.props.all.loading?<ActivityIndicator size="large" color="black"/>:<View/>
				
			);
	}
	render=()=>{
		
		if(this.props.all){
			return (
				<View style={{flex:1}}>
					<FlatList
					data={this.props.all.users}
					renderItem={this.renderItem}
					keyExtractor={this._keyExtractor}
					onEndReached={this.loadMoreUsers}
					onEndReachedThreshold={200}
					onRefresh={this.refreshUsers}
					ListFooterComponent = {this.renderFooter}
					refreshing={this.props.all.refreshing}
					/>
				
				
				</View>
			);
		}
		return(
			<Text>Not there</Text>
			
		);
	}
}
const mapStateToProps=(state)=>{
	return {
		all: state.users.all,
		usersHash:state.users.usersHash
	};
};
export default connect(mapStateToProps,{getAllUsers,refreshAllPage,incrementAllPage})(AllUsersComponent);