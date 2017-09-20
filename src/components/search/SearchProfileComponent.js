"use strict";
import React from "react";
import { View, Text,Button,FlatList,ActivityIndicator,TextInput } from "react-native";
import {connect} from "react-redux";
import {getSearchUsers,setSearchInterest,setUserSearchEmpty} from "../../actions/users";
import {Actions} from "react-native-router-flux";
import SingleUserComponent from "../people/SingleUserComponent";
class SearchProfileComponent extends React.Component {
	constructor(props){
		super(props);
	}
	componentWillMount = async ()=>{
		if(this.props.interest){
			await this.props.setSearchInterest(this.props.interest);
			this.props.getSearchUsers(this.props.search.interest);
				
		}
		
	}
	_keyExtractor(user, index) {
		return user;
	}
	onTextChange = async (event)=>{
		const {  text } = event.nativeEvent;
		
		await this.props.setSearchInterest(text);
		console.log("received text");
		console.log(this.props.search.interest.length);
		if(this.props.search.interest.length>0){
			this.props.getSearchUsers(this.props.search.interest);
		}
	}
	renderItem = ({item})=> {
		return (<SingleUserComponent user= {this.props.usersHash[item]} />);
	}
	
	renderHeader = ()=>{
		return(
			<TextInput 
				style={{margin:7,paddingLeft:7,borderColor:"black",height:50,borderWidth:1,justifyContent:"center",borderRadius:5}}
				placeholder ="Search Users with tags. Eg: football"			
				onChange={this.onTextChange}
				value={this.props.search.interest}			
				underlineColorAndroid = 'transparent'>
			</TextInput>
		);
	}
	render=()=>{
		if(this.props.search){
			return (
				<View style={{flex:1}}>
					<FlatList
						data={this.props.search.users}
						renderItem={this.renderItem}
						keyExtractor={this._keyExtractor}
						ListHeaderComponent = {this.renderHeader}
						
						style={{flex:1}}
					/>
				</View>
			);
		}
		
	}
	componentWillUnmount=()=>{
		this.props.setUserSearchEmpty();
	}
}

const mapStateToProps= (state) => {
	return {
		search: state.users.search,
		usersHash:state.users.usersHash
	};
};
export default connect(mapStateToProps,{setUserSearchEmpty,getSearchUsers,setSearchInterest})(SearchProfileComponent);