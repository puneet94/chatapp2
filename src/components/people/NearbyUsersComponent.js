"use strict";
import React from "react";
import { View, Text,Button,FlatList,Slider,StyleSheet } from "react-native";
import {connect} from "react-redux";
import {getNearbyUsers} from "../../actions/users";
import {Actions} from "react-native-router-flux";

import SingleUserComponent from "./SingleUserComponent";

class NearbyUsersComponent extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			page: 1,
			distance: 10
		};
	}
    
	componentWillMount = () => {
		this.setState({ 
			refreshing: true
		});
		this.props.getNearbyUsers(1,this.state.distance);            
		this.setState({
			refreshing: false
		});
		
	}
	refreshUsers = ()=>{
		this.setState({
			refreshing: true,
			page: 1
		},()=>{this.props.getNearbyUsers(this.state.page,this.state.distance);});
		
		
		this.setState({
			refreshing: false
		});
	}
	loadMoreUsers = ()=>{
		if(this.props.nearby.pages>=(this.state.page+1)){
			this.setState({
				page: this.state.page+1
			},()=>{
				this.props.getNearbyUsers(this.state.page,this.state.distance);
			});
		}
		
		
	}
	slidingComplete=(slideValue)=>{
		this.setState({
			distance:slideValue,
			page: 1
		},()=>{
			this.refreshUsers();
		});
	}
	
	renderItem = ({item})=> {
		return (<SingleUserComponent user= {item} location={this.props.location}/>);
	}
	render=()=>{
		if(this.props.nearby && !this.props.location_error){
			return (
				<View style={{flex:1}}>
					<View style={styles.sliderContainer}>
						<Slider style={styles.slider}
							maximumValue={1000}
							minimumValue={10}
							onSlidingComplete={this.slidingComplete}
							step={5}
						/>
						<Text style={styles.sliderDistance}>
							{this.state.distance}</Text>
					</View>
					<View style={styles.listContainer}>
						<FlatList
							data={this.props.nearby.users}
							renderItem={this.renderItem}
							keyExtractor={(item)=>item._id}
							onEndReached={this.loadMoreUsers}
							onEndReachedThreshold={0.1}
							onRefresh={this.refreshUsers}
							refreshing={this.state.refreshing}
						/>
					</View>
				</View>
			);
		}
		return(
			<Text>Not there</Text>
			
		);
	}
}

const styles = StyleSheet.create({
	sliderContainer: {
		flex: 1,
		backgroundColor: "#fff",
		justifyContent: "flex-start",
		alignItems: "flex-start",
		flexDirection:"row",
		padding: 5,
	},
	slider:{
		flex: 9
	},
	sliderDistance:{
		flex:1
	},
	listContainer:{
		flex:11
	}
});
const mapStateToProps=(state)=>{
	return {
		nearby: state.users.nearby,
		location: state.user.location,
		location_error: state.user.user_location_error
	};
};
export default connect(mapStateToProps,{getNearbyUsers})(NearbyUsersComponent);