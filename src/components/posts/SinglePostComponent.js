import React, {Component} from "react";
import {
				View,
				Text,
				StyleSheet,
				Image,
				Dimensions,
				TouchableOpacity
} from "react-native";
const {width} = Dimensions.get("window");
import {RkCard, RkText, RkStyleSheet} from "react-native-ui-kitten";
import {Actions} from "react-native-router-flux";
import {Avatar} from "../../components/avatar";
import {SocialBar} from "../socialBar";
let moment = require("moment");

export default class SinglePostComponent extends Component {
				constructor(props) {
								super(props);
				}
				shouldComponentUpdate = (nextProps,nextState) => {
						if(nextProps.post.likes != this.props.post.likes){
								return true;
						}
						return false;
				}
				openSinglePostPage = (post) => {
					Actions.singlePostPage({post});
				}
				
				render = () => {
					
								const post = this.props.post;
								
								if (!(post && post.user)) {
												return (
																<View></View>
												);
								}
								
								return (
												<View>
																<TouchableOpacity
																				style={{
																				borderBottomColor: "white",
																				borderBottomWidth: 2
																}}
																				delayPressIn={70}
																				activeOpacity={0.8}
																				onPress={() => this.openSinglePostPage(post)}>
																				<RkCard rkType='backImg'>
																								<Image
																												rkCardImg
																												source={{
																												uri: post.image || "https://pimg.tradeindia.com/00043756/b/0/Plain-Dupion-Silk-Fabric.jpg"
																								}}/>
																								<View rkCardImgOverlay rkCardContent style={styles.overlay}>
																												<RkText
																																rkType='header2 inverseColor blackShadow'
																																numberOfLines={2}
																																style={{
																																textShadowColor: "black",
																																textShadowOffset: {
																																				width: 2,
																																				height: 2
																																},
																																textShadowRadius: 3
																												}}>{post.content}</RkText>
																												<RkText rkType='secondary2 inverseColor'>{moment(post.time).fromNow()}</RkText>
																												<View rkCardFooter style={styles.footer}>
																																<SocialBar
																																				rkType='leftAligned'
																																				views={post.views}
																																				likes={post.likes}
																																				loc={post.loc}/>
																												</View >
																								</View>
																				</RkCard>
																</TouchableOpacity>

												</View>
								);
				}
				/*

	return (
		<View style={styles.postContainer}>
  			<View style={styles.userDetails}>
				<View style={styles.postUserImage}>
	  				{
						post.user.picture?<Image style={styles.userImage} source={{uri:post.user.picture}}/>:<View></View>
					}

				</View>
				<View style={styles.postUserNameContainer}>
					<Text style={styles.postUserName}>{post.user.anonName}</Text>
					<View style={ styles.postInterest}>
					{post.interests.map((interest,index)=>(<Text  key={index}>#{interest}</Text>))}
					</View>
				</View>
				<View style={styles.postDistance}>
					<Text>{getDistance(post.loc,location)}</Text>
				</View>
			</View>
			<View style={styles.postDetails}>
				<TouchableOpacity onPress={()=>openSinglePostPage(post) }>

					<Text style={styles.postContent}>{post.content.slice(0,150)}<Text>{post.content.length>150?"...":""}</Text></Text>

					{post.image?<Image style={styles.postImage}
						source={{uri:post.image}}
						/>:<View></View>}
				</TouchableOpacity>

			</View>
		</View>
	);*/
}

const styles = RkStyleSheet.create(theme => ({
				root: {
								backgroundColor: theme.colors.screen.base
				},
				overlay: {
								justifyContent: 'flex-end'
				},
				footer: {
								width: 240
				}
}));

/*
const styles = RkStyleSheet.create(theme => ({


	container: {
		backgroundColor: theme.colors.screen.scroll,
		paddingVertical: 8,
		paddingHorizontal: 14,
		flex: 1
	},
	card: {
		marginVertical: 8,
	},
	userInfo: {
		flexDirection: "row",
		alignItems: "center"
	},
	avatar: {
		marginRight: 17
	}
}));
/*
const styles = StyleSheet.create({
	card: {
		marginVertical: 8,
  	},
	postContainer: {
		flex: 1,
		backgroundColor: "#fff",
		justifyContent: "flex-start",
		alignItems: "stretch"
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
	},postUserName:{
		fontSize: 14
	},
	postDistance:{
		flex: 1,
		paddingTop: 10
	},
	postContent:{
		fontSize: 16
	},
	postDetails:{
		flex:8,
		padding: 10
	},
	postImage:{
		flex:1,
		height: 300,

	width: null
	},postInterest:{
		flex: 1,
		flexDirection: "row"
	}
});*/
