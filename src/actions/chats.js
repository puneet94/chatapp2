import axios from 'axios';

import {ALL_CHATS_RECEIVED,REVEALED_CHATS_RECEIVED,CREATE_CHAT_ROOM,CHAT_RECEIVED,GROUPS_CHATS_RECEIVED,URL,ALL_CHAT_INCREMENT,ALL_CHAT_LOADING,ALL_CHAT_REFRESH,CHAT_TRANSFERRED} from './constants';
export const refreshAllChatPage = ()=>{
	return (dispatch)=>{
		dispatch({type:ALL_CHAT_REFRESH});
	}
}
export const  incrementAllChatPage= ()=>{
	return (dispatch)=>{
		dispatch({type:ALL_CHAT_INCREMENT});
	}
}
export const chatReceived = (chat)=>{
	return (dispatch)=>{
		dispatch({type:CHAT_RECEIVED,payload:chat});
	}
}
export const getAllChats = (page) => {
	return async (dispatch,getState)=>{
		dispatch({type:ALL_CHAT_LOADING});
		const {jwt_token} = getState().auth;
		let response  = await axios.get(`${URL}chatRoom/all`,{
			headers:{
				'Authorization': `Bearer ${jwt_token}`
			},
			params:{
				limit: 9,
				page: page
		}});
		
		dispatch({type:ALL_CHATS_RECEIVED,payload:{data:response.data.docs,page:page,pages:response.data.pages}});
		
	};
}
export const chatTransferred = (chat) =>{
	return (dispatch,getState)=>{
		dispatch({type:"CHAT_TRANSFERRED",payload:{ ...chat, user: getState().user.user._id }});
	}
}
export const createChatRoom = (chatRoom)=>{
	return (dispatch)=>{
		console.log("chatroom dispatch");
		console.log(chatRoom);
		dispatch({type:CREATE_CHAT_ROOM,payload:chatRoom});
	}
}
export const updateChatRoom = (chatRoomId) => {
	return async (dispatch,getState)=>{
		const {jwt_token} = getState().auth;
		let response = await axios.post(`${URL}chatRoom/update/${chatRoomId}`,{
		},{
			headers:{
				"Authorization": `Bearer ${jwt_token}`
			},	
		});


		
	};	
};
export const getFavoriteChats = (page)=>{
	return async (dispatch,getState)=>{
		const {jwt_token} = getState().auth;
		let response  = await axios.get(`${URL}messageRoom/getRooms`,{
			headers:{
					'Authorization': `Bearer ${jwt_token}`
			},params:{
			limit: 10,
			page: page
		}});
		dispatch({type:GROUPS_CHATS_RECEIVED,payload:{data:response.data.docs,page:page,pages:response.data.pages}});
		
	};
}

