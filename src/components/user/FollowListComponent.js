"use strict";
import React from "react";
import { View, Text,Button,FlatList,ActivityIndicator } from "react-native";
import {connect} from 'react-redux';
import {getUserFollowers,
    getUserFollowing,
    emptyFollowList} from '../../actions/user';
import {Actions} from 'react-native-router-flux';
import SingleUserComponent from '../people/SingleUserComponent';
class AllUsersComponent extends React.Component {
	constructor(props){
		super(props);
	}
    
	componentWillMount = ()=>{
        if(this.props.followers){
            this.props.getUserFollowers();
        }else{
            this.props.getUserFollowing();
        }
		
	}
	
	_keyExtractor(user, index) {
		return user._id;
	}
	renderItem = ({item})=> {
		return (<SingleUserComponent user= {item} />);
	}
	
	render=()=>{

		if(this.props.userFollowers || this.props.userFollowing){
			return (
				<View style={{flex:1,backgroundColor:"white"}}>
					<FlatList
					data={this.props.followers?this.props.userFollowers:this.props.userFollowing}
					renderItem={this.renderItem}
					keyExtractor={this._keyExtractor}
					/>
				</View>
			);
		}
		return(
			<Text>Not there</Text>
			
		);
    }
    componentWillUnmount = ()=>{
        this.props.emptyFollowList();
    }
}
const mapStateToProps=(state)=>{
	return {
		userFollowers: state.user.followers,
		userFollowing: state.user.following
	};
};
export default connect(mapStateToProps,{getUserFollowers,
    getUserFollowing,
    emptyFollowList})(AllUsersComponent);