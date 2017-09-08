"use strict";
import React,{Component} from "react";
import { View, Text,Button,Alert,StyleSheet,Image,ScrollView,Dimensions,TouchableOpacity } from "react-native";
import {connect} from "react-redux";

import {Actions} from "react-native-router-flux";
import {
	RkCard,
	RkText,
	RkStyleSheet
} from "react-native-ui-kitten";
const moment = require("moment");
import {Avatar} from "../../components/avatar";
import {SocialBar} from "../../components/socialBar";
import {submitLike,deleteLike,deletePost,submitViews} from "../../actions/posts";
import Ionicons from 'react-native-vector-icons/Ionicons';
class PostPageComponent extends Component {
	constructor(props){
		super(props);
		this.state = {
			likes: props.post.likes.length?props.post.likes.length:1
		}
	}
	showDeleteAlert= ()=>{
		Alert.alert(
			'Alert Title',
			'My Alert Msg',
			[
			  {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
			  {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
			  {text: 'OK', onPress: () => console.log('OK Pressed')},
			],
			{ cancelable: false }
		  );
	}
	componentWillMount = ()=>{
		this.props.navigation.setParams({
			user: this.props.user,
			deletePost: this.props.deletePost
		});
	}
	static navigationOptions = ({navigation}) => {
		const deletePost = ()=>{
			navigation.state.params.deletePost(navigation.state.params.post._id);
			Actions.pop();
			
		};
		const showDeleteAlert= ()=>{
			Alert.alert(
				'Delete Post',
				'Are you sure you want to delete the post?',
				[
				  {text: 'Yes', onPress: () => deletePost()},
				  {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'}
				],
				{ cancelable: true }
			  );
		};
		let isUser = false;
		if(navigation.state.params.user && navigation.state.params.post){
			isUser = navigation.state.params.user._id===navigation.state.params.post.user._id;
		}
		let renderDelete = () => {
			if(isUser){
				return (
					 <Button title="Delete" onPress={()=>{showDeleteAlert()}}/>
				
				  );
			}else{
				return (<View></View>);
			}
		  ;
		};
	
		
		let rightButton = renderDelete();
		let title = "Post";
		return (
		  {
			headerTitle: title,
			headerRight: rightButton
		  });
	  };
	
	submitLike = ()=>{
		this.props.submitLike(this.props.post._id);
	}
	checkLike = ()=>{
		
		if(this.props.user.likes.indexOf(this.props.post._id)!=-1){
		
			return true;
		}else{
			return false;
		}
	}
	deleteLike = ()=>{
		
		this.props.deleteLike(this.props.post._id);
	}
	componentDidMount = ()=>{
		this.props.submitViews(this.props.post._id);
	}
	render=()=>{
		const post  = this.props.post;
		return (
			<View style={styles.mainContainer}>
				<ScrollView style={styles.root}>
					<RkCard rkType="article">
						{post.image?<Image rkCardImg source={{uri:post.image}} style={{height:400}}/>:<View></View>}
						<View rkCardHeader>
							<View style={{flex:8}}>
								<View style={ styles.postInterest}>
									{post.interests.map((interest,index)=>(<RkText style={styles.title} rkType="header4"  key={index}>#{interest}</RkText>))}
								</View>
								<RkText rkType="secondary2 hintColor">{moment(post.time).fromNow()}</RkText>
							</View>
							<TouchableOpacity onPress={() => Actions.profile({userId:post.user._id})} style={{flex:2,alignItems:"flex-end"}}>
								<Avatar rkType="circle" img={post.user.picture}/>
							</TouchableOpacity>
						</View>
						<View rkCardContent>
							<View>
								<RkText rkType="primary3 bigLine">{post.content}</RkText>
							</View>
						</View>
						<View rkCardFooter>
							<SocialBar likes={this.props.post.likes} views = {post.views} time={post.time} updateLikes={this.checkLike()?this.deleteLike:this.submitLike} liked={this.checkLike()} loc={post.loc}/>
						</View>
					</RkCard>
				</ScrollView>


			</View>
		);
	}
}
const mapStateToProps = (state)=>{
	return {
		user: state.user.user
	};
};
export default connect(mapStateToProps,{submitLike,deleteLike,deletePost,submitViews})(PostPageComponent);
let styles = RkStyleSheet.create(theme => ({
	root: {
		backgroundColor: theme.colors.screen.base
	},
	
	mainContainer:{
		marginTop: 5
	},
	title: {
		marginBottom: 5
	},
	postInterest:{
		flex: 1,
		flexDirection: "row",
		flexWrap: "wrap"
	}
}));/*
const styles = StyleSheet.create({
    mainContainer:{
      
        marginTop: 20
    },
    scrollContainer:{
        height,
        marginTop: 20
    },
	postContainer: {
		flex: 1,
		backgroundColor: "#fff"
	},
	userDetails:{
		flexDirection: "row",
		flex: 1,
		justifyContent: "flex-start",
    	alignItems: "flex-start"
	},
	postUserImage:{
		flex: 1.7,
		padding: 10
	},
	userImage:{
		width: 50,
		height:50,
	},
	postUserNameContainer:{
		flex: 8,
		paddingTop: 10
	},
	postUserName:{
		fontSize: 14
	},
	postDistance:{
		flex: 1,
		paddingTop: 10
	},
	
	postDetails:{
		flex:8,
		padding: 10,
		alignItems: "center",
		justifyContent: "flex-start"
	},
	postContent:{
		fontSize: 16,
		flex:1
	},
	postImage:{
		flex: 10,
    	width: (width/1.2),
    	height: height,
    	resizeMode: "contain"    
	},postInterest:{
		flex: 1,
		flexDirection: "row"
	}
});*/
