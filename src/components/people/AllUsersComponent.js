"use strict";
import React from "react";
import { View, Text,Button,FlatList,ActivityIndicator } from "react-native";
import {connect} from 'react-redux';
import {getAllUsers} from '../../actions/users';
import {Actions} from 'react-native-router-flux';

import SingleUserComponent from './SingleUserComponent';
class AllUsersComponent extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			page: 1
		};
	}
    
	componentWillMount=()=>{
		
		this.setState({
			refreshing: true
		});
		this.props.getAllUsers(1);            
		this.setState({
			refreshing: false
		});
		
	}
	refreshUsers = ()=>{
		this.setState({
			refreshing: true,
			page: 1
		},()=>{
			this.props.getAllUsers(this.state.page);
		});
		
		
		this.setState({
			refreshing: false
		});
	}
	loadMoreUsers = ()=>{
		if(this.props.all.pages>=(this.state.page+1)){
			this.setState({
				page: this.state.page+1,
				refreshing: true
			},()=>{
				this.props.getAllUsers(this.state.page);
			});
			this.setState({
				refreshing: false
			});
		}
	}
	renderFooter () {
		return (
			<ActivityIndicator
				animating={this.state.refreshing}
				style={ {height: 80}}
				size="large" color="white"
			/>
		);
	}
	renderItem = ({item})=> {
		return (<SingleUserComponent user= {item} />);
	}
	render=()=>{
		
		if(this.props.all){
			return (
				<View style={{flex:1}}>
					<FlatList
						data={this.props.all.users}
						renderItem={this.renderItem}
						keyExtractor={(item)=>item._id}
						onEndReached={this.loadMoreUsers}
						onEndReachedThreshold={10}
						renderFooter={this.renderFooter}
						onRefresh={this.refreshUsers}
						refreshing={this.state.refreshing}
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
		all: state.users.all
	};
};
export default connect(mapStateToProps,{getAllUsers})(AllUsersComponent);