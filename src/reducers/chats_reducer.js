import {ALL_CHATS_RECEIVED,CHAT_TRANSFERRED,CREATE_CHAT_ROOM,CHAT_RECEIVED,REVEALED_CHATS_RECEIVED,GROUPS_CHATS_RECEIVED,ALL_CHAT_INCREMENT,ALL_CHAT_LOADING,ALL_CHAT_REFRESH} from "../actions/constants";
import keyBy from "lodash/keyBy";
import keys from "lodash/keys";

const INITIAL_STATE = {
	all: {
		chats: [],
		chats_loading: true,
		chats_received: false,
		pages: 1,
		page: 1,
		loading: true
	},
	revealed: {
		chats: [],
		chats_loading: true,
		chats_received: false,
	},
	groups:  {
		chats: [],
		chats_loading: true,
		chats_received: false,
		pages: 0
	},
	chatsHash: {}
};
export const chats_reducer = (state=INITIAL_STATE,action)=>{
	//deepFreeze(state);
	switch(action.type){
	case ALL_CHAT_REFRESH:
		return {...state,all:{...state.all,page: 1}};
	case ALL_CHAT_INCREMENT:
		return {...state,all:{...state.all,page: state.all.page+1}};
	case ALL_CHAT_LOADING:
		return {...state,all:{...state.all,loading: true}};
	case CHAT_TRANSFERRED:
		const chatRoomId = action.payload.roomId;
		let chatRoomLastMessage = {}
		if(state.chatsHash[chatRoomId].lastMessage){
			chatRoomLastMessage = {...state.chatsHash[chatRoomId].lastMessage,message:action.payload.message,
				user:action.payload.user}
		}else{
			chatRoomLastMessage = {message:action.payload.message,user:action.payload.user}
		}
		const chatRoomUpdate = {...state.chatsHash[chatRoomId],
				lastMessage:{...chatRoomLastMessage},
				lastMessageTime: new Date()
		}
		const newChatRoom = {...state.chatsHash[chatRoomId],...chatRoomUpdate};
		const newChatRoomHash = {...state.chatsHash,[chatRoomId]:{...newChatRoom}};
		const slicedIndex = state.all.chats.indexOf(chatRoomId);
		let newChatsIds = [];

		if(slicedIndex!==-1){
			newChatsIds = [chatRoomId,...state.all.chats.slice(0,slicedIndex),...state.all.chats.slice(slicedIndex+1)];  
		}else{
			newChatsIds = [chatRoomId,...state.all.chats];
		}

		return {...state,all:{...state.all,chats:newChatsIds},chatsHash:newChatRoomHash};
	case CHAT_RECEIVED:
		
		const chat = action.payload;
		const chatRoom = action.payload.chatRoom;
		
		const chatRoomNew = {...state.chatsHash[chatRoom._id],...chatRoom};
		const chatRoomHashNew = {...state.chatsHash,[chatRoom._id]:{...chatRoomNew}};
		
		const indexSlice = state.all.chats.indexOf(chatRoom._id);
		let newChatsId = [];
		if(indexSlice!==-1){
			newChatsId = [chatRoom._id,...state.all.chats.slice(0,indexSlice),...state.all.chats.slice(indexSlice+1)];  
		}else{
			newChatsId = [chatRoom._id,...state.all.chats];
		}

		return {...state,all:{...state.all,chats:newChatsId},chatsHash:chatRoomHashNew};
	case ALL_CHATS_RECEIVED:

		const chatsHashNew = keyBy(action.payload.data,(chat)=>{
			return chat._id;
		});
		
		if(action.payload.page==1){
			 
			return {...state, chatsHash:{...state.chatsHash,...chatsHashNew},all:{...state.all,chats:[...keys(chatsHashNew)],pages:action.payload.pages,loading:false}};    
		}
		const chatsIds = keys(chatsHashNew).filter((chatId)=>{
			if(state.all.chats.indexOf(chatId)==-1){
				return true;
			}
		});
		return {...state, chatsHash:{...state.chatsHash,...chatsHashNew}, all:{...state.all,chats:[...state.all.chats,...chatsIds],pages:action.payload.pages,loading:false}};
	case CREATE_CHAT_ROOM:
		console.log("the chat create");
		console.log(action.payload);
		let chatIndex = state.all.chats.indexOf(action.payload._id);
		let chatRoomCheck = state.chatsHash[action.payload._id];
		let oldChatRoom = {...action.payload,lastMessage:{
			message: '',
			type: '',
			time: new Date()
		},lastMessageTime:new Date(),lastLoggedOut:new Date()};
		
		let newCreateChatRoom = {[action.payload._id]:action.payload};
		
		if(!chatRoomCheck && chatIndex==-1){
			console.log("entered create chatroom");
			return {...state, chatsHash:{...state.chatsHash,...newCreateChatRoom},all:{...state.all,chats:[action.payload._id,...state.all.chats]}};    
		}return state;
		
	case REVEALED_CHATS_RECEIVED:
		if(action.payload.page==1){
			return {...state, revealed:{...state.revealed,chats:[...action.payload.data]}};    
		}
		return {...state, revealed:{...state.revealed,chats:[...state.revealed.chats,...action.payload.data]}};
	case GROUPS_CHATS_RECEIVED:
		if(action.payload.page==1){
			return {...state, groups:{...state.groups,chats:[...action.payload.data]}};    
		}
		return {...state, groups:{...state.groups,chats:[...state.groups.chats,...action.payload.data]}};
	default:
		return state;
	}
};