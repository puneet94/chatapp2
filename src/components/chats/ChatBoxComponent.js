import React, {Component} from "react"; 
import PhotoUpload from '../search/PhotoUploadComponent';
import {View,Text,
	StyleSheet,
	Image,
	Button,
	TouchableHighlight,
	TouchableOpacity,
	TextInput,
	FlatList,
	InteractionManager,
	Platform
} from "react-native";
import {
	RkButton,
	RkText,
	RkTextInput,
	RkAvoidKeyboard,
	RkStyleSheet,
	RkTheme
  } from 'react-native-ui-kitten';
import {Avatar} from '../../components/avatar';
import {Actions} from "react-native-router-flux";
import {connect} from "react-redux";
import {scale} from '../../utils/scale.js';
import Ionicons from 'react-native-vector-icons/Ionicons';
const io = require("socket.io-client");
const moment = require('moment');
import {fetchMessagesChatRoom, fetchChatRoom,sendMessageChatRoom,uploadImage} from "../../services/messages";
import {URL} from "../../actions/constants";
import {updateChatRoom,getAllChats,chatTransferred,createChatRoom} from "../../actions/chats";
import delay from "lodash/delay";
const userPage=(id)=>{
	Actions.profile({userId:id});
}
class SingleChatComponent extends Component {
	constructor(props){
		super(props);
	}
	shouldComponentUpdate = ()=>{
		return false;
	}

	render=()=>{
		const {chat,receiver} = this.props;
		const inMessage = chat.user._id == receiver;
		let backgroundColor = inMessage
		? RkTheme.current.colors.chat.messageInBackground
		: RkTheme.current.colors.chat.messageOutBackground;
		let itemStyle = inMessage ? styles.itemIn : styles.itemOut;
	
		return (
			<View style={[styles.item, itemStyle]}>
				{!inMessage && this.renderDate(chat.time)}
				<View style={[styles.balloon, {backgroundColor}]}>
				{chat.type==='img'?<Image style={{height: 120,width:120}} source={{
									uri: chat.message
								}}></Image>:<RkText rkType='primary2 mediumLine chat'>{chat.message}</RkText>}
				</View>
				{inMessage && this.renderDate(chat.time)}
			</View>
			);
	}
	
  renderDate = (time) => (
	<RkText style={styles.time} rkType='secondary7 hintColor'>
	  {moment(time).format('LT')}
	</RkText>);

  

}
class ChatBoxComponent extends Component {
	constructor(props) {
		super(props);
		this.socket = io(URL, {transports: ["websocket"]});
		this.state = {
			chatRoom: {},
			page: 1,
			messages: [],
			refreshing: true,
			receiver: {},
			imagePickerLoading: false
		};
		console.ignoredYellowBox = [
			'Setting a timer'
		];
	}
	componentWillMount = ()=>{
		if(this.props.userId==this.props.currentUserId){
			Actions.pop();
			return;
		}
	}
	
	static navigationOptions = ({navigation}) => {
		let renderAvatar = (user) => {
		  return (
			<TouchableOpacity onPress={() => userPage(user._id)}>
			  <Avatar style={styles.avatar} rkType='small' img={user.picture}/>
			</TouchableOpacity>
		  );
		};
		let renderTitle = (user) => {
		  return (
			<TouchableOpacity onPress={() => userPage(user._id)}>
			  <View style={styles.header}>
					<RkText style={{color:"white"}} rkType='header5'>{`${user.anonName}`}</RkText>
			  </View>
			</TouchableOpacity>
		  )
		};	
		let user = navigation.state.params.user||{anonName: "loading..",picture:"https://cdn.pixabay.com/photo/2017/01/06/19/15/soap-bubble-1958650_960_720.jpg"};
		let rightButton = renderAvatar(user);
		let title = renderTitle(user);
		return (
		  {
			headerTitle: title,
			headerRight: rightButton
		  });
	  };
	getMessages = async(id, page, jwt_token) => {
		let response = await fetchMessagesChatRoom(id, page, jwt_token);

		const messages = response
			.data
			.docs
			.reverse();

		this.setState((previousState) => {
			return {
				messages: messages.concat(previousState.messages),
				refreshing: false
			};
		}, () => {
			if (page == 1) {
				this._scroll();
				
			} else {
				this
					.listRef
					.scrollToOffset({x: 0, y: 0, animated: true});
			}

		});

	}
	socketInit = (chatRoomId) => {
		this
			.socket
			.emit("addToChatRoom", {"roomId": chatRoomId});
		this
			.socket
			.on("messageReceived", (message) => {
				this.setState((previousState) => {
					return {
						messages: previousState
							.messages
							.concat(message)
					};
				},()=>{this._scroll(true);});
			});
	}
	
	componentDidMount = async ()=>{
		try{
			let response = await fetchChatRoom(this.props.userId, this.props.auth.jwt_token);
			let chatRoom = response.data;
			this.props.createChatRoom(chatRoom);
			
			//let userResponse = await fetchUser(this.props.userId, this.props.auth.jwt_token);
			let receiver = chatRoom.creator2;
			this.getMessages(chatRoom._id, this.state.page, this.props.auth.jwt_token);
			this.socketInit(chatRoom._id);
			this.props.navigation.setParams({
				user: receiver
			});
			this.setState({chatRoom, receiver});
		}catch(e){
			console.log("error in chat mount");
			console.log(e);
		}
		InteractionManager.runAfterInteractions(() => {
      if(this.listRef){
				this.listRef.scrollToEnd();
			}
    });
	}
	_scroll = (getChats) => {
		if ( Platform.OS === "ios") {
			if(this.listRef){
				this.listRef.scrollToEnd();
			}
		} else {
			if(this.listRef){
				delay(() => this.listRef.scrollToEnd(), 100);
			}
		}
	}
	sendChatMessage = async (sendImage) => {
		this.setState({
			refreshing: true
		});
		let newMessage = {};
		if(sendImage){
			newMessage = {
				message: sendImage,
				receiver: this.props.userId,
				roomId: this.state.chatRoom._id,
				type: 'img'
			};
		}else{
			newMessage = {
				message: this.state.chatMessage,
				receiver: this.props.userId,
				roomId: this.state.chatRoom._id,
			};
		}
		this.props.chatTransferred(newMessage);
		let response = await sendMessageChatRoom(newMessage,this.props.auth.jwt_token);
		this.setState((prevState) => {			
			return {
				chatMessage: '',
				messages: prevState
					.messages
					.concat(response.data.message)
			};

		}, () => {
			this._scroll(true);
			this.setState({
				refreshing: false
			});
		});
		
	}
	onPhotoSelect = avatar => {
		if (avatar) {
			console.log('Image base64 string: ', avatar);
			this.setState({
				chatImage: avatar,
				imagePickerLoading:false
			});
		}
	}
	cancelImageUpload = ()=>{
		this.setState({
			showChatImage: false,
			chatImage: ""
		});
	}
	sendImage = async ()=>{
		let imageResponse = await uploadImage(this.state.chatImage,this.props.auth.jwt_token);
		this.sendChatMessage(imageResponse.data.image);
		this.cancelImageUpload();
	}
	loadMoreMessages = () => {
		const page = this.state.page + 1;
		this.setState({
			page: page,
			refreshing: true
		}, () => {
			this.getMessages(this.state.chatRoom._id, this.state.page, this.props.auth.jwt_token);
		});
	}
	renderItem = ({item})=>{
	return (<SingleChatComponent chat = {item} receiver = {this.props.userId} />);
	}
	render = () => {
		return (
			<RkAvoidKeyboard style={styles.container} onResponderRelease={(event) => {
				Keyboard.dismiss();
			  }}>
			  	
				<FlatList ref='list'
							extraData={this.state}
							style={styles.list}
							data={this.state.messages}
							renderItem={this.renderItem}
							keyExtractor={(item) => item._id}
							onRefresh={this.loadMoreMessages}
							refreshing={this.state.refreshing}
							ref={(ref) => {
								this.listRef = ref;
							}}	  
				/>
				{this.state.showChatImage?<View style={styles.imageUploadContainer}>
							{this.state.imagePickerLoading?<Text>{"Loaidng"}</Text>:<View/>}
							<Image style={styles.imageUploadImage} source={{uri:"data:image/jpeg;base64,"+this.state.chatImage}}/>
							<Button style={styles.imageUploadSend} title="Send" onPress={()=>this.sendImage()}>{"SEND"}</Button>
							<Button style={styles.imageUploadCancel} title="Cancel" onPress={()=>this.cancelImageUpload()}>{"CANCEL"}</Button>
				</View>:<View></View>}
				<View style={styles.footer}>
					<PhotoUpload 
					onButtonCancel = {()=>{this.setState({imagePickerLoading:false,showChatImage: false});}}
						pickerTitle={"Send Image"} 
						onButtonPress =  {()=>{this.setState({imagePickerLoading:true,showChatImage: true});}} 
  					onPhotoSelect={this.onPhotoSelect}   quality={100}>
							<Ionicons name="md-camera" size={24} color="black"/>
 					</PhotoUpload>
				  <RkTextInput
						onFocus={() => this._scroll()}
						onBlur={() => this._scroll()}
						style={styles.chatInput}
						onChangeText={(chatMessage) => this.setState({chatMessage})}
						value={this.state.chatMessage}
						rkType='row sticker'
						placeholder="Add a comment..."
					/>
				  <RkButton onPress={()=>this.sendChatMessage()} style={styles.send} rkType='circle highlight' disabled={this.state.refreshing}>
						<Ionicons name="md-send" size={23} color="white"/>
				  </RkButton>
				</View>
			</RkAvoidKeyboard>
		);
	}
	componentWillUnmount = ()=>{
		this.socket.emit('removeFromRoom', { 'roomId': this.state.chatRoom._id });
		this.props.updateChatRoom(this.state.chatRoom._id);
		
	}
}
const mapStateToProps = (state) => {
	return {auth: state.auth,currentUserId: state.user.user._id};
};
export default connect(mapStateToProps, {updateChatRoom,getAllChats,chatTransferred,createChatRoom})(ChatBoxComponent);

let styles = RkStyleSheet.create(theme => ({
	avatar: {
		marginRight: 16
	},
	
	header: {
	  alignItems: 'center'
	},
	container: {
	  flex: 1,
	  backgroundColor: theme.colors.screen.base
	},
	list: {
		paddingRight: 5
		
	},
	chatInput:{
		flex:7
	},
	footer: {
	  flexDirection: 'row',
	  minHeight: 60,
	  padding: 10,
	  backgroundColor: theme.colors.screen.alter
	},
	item: {
	  marginVertical: 14,
	  flex: 1,
	  flexDirection: 'row'
	},
	itemIn: {
		marginLeft: 5
	},
	itemOut: {
		alignSelf: 'flex-end'
	},
	balloon: {
	  maxWidth: scale(250),
	  padding: 15,
	  borderRadius: 20,
	},
	time: {
	  alignSelf: 'flex-end',
	  margin: 15
	},
	plus: {
		
		width: 30
	},
	send: {
	  width: 40,
	  height: 40,
	  marginLeft: 10
	},
	imageUploadContainer:{
		justifyContent: "center",
		height: 200,
		width: 300,
		flexDirection: "row",
		alignItems: 'center',
		marginLeft: 20
	},
	imageUploadImage:{
		flex: 3,
		alignSelf: "stretch"
	},
	imageUploadSend:{
		flex: 1
	},
	imageUploadCancel:{
		flex: 1
	}
  }));