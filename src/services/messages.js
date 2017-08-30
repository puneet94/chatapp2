
import axios from "axios";
import {URL} from "../actions/constants";

export const  fetchMessagesChatRoom=  (id,page,jwt_token)=>{
	
	return axios.get(`${URL}chat/getChats/${id}`,{
		headers:{
			"Authorization": `Bearer ${jwt_token}`
		},
		params:{
			limit: 10,
			page: page
		}
	});
	
	
};

export const sendMessageChatRoom = (chat,jwt_token)=>{
	
	return axios.post(`${URL}chat/create/${chat.roomId}`,{
		...chat
	},{
		headers:{
			"Authorization": `Bearer ${jwt_token}`
		},
		
	});
};
export const fetchChatRoom = (id,jwt_token)=>{
	return axios.get(`${URL}chatRoom/get/${id}`,{
		headers:{
			"Authorization": `Bearer ${jwt_token}`
		}
	});
};