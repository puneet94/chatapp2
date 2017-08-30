import axios from "axios";

import {ALL_CHATS_RECEIVED,REVEALED_CHATS_RECEIVED,GROUPS_CHATS_RECEIVED,URL} from "./constants";


export const fetchMessagesChatRoomId=(id,page)=>{
    return async (dispatch,getState)=>{
        const {jwt_token} = getState().auth;
		let response  = await axios.get(`${URL}chat/getChats/${id}`,{
			headers:{
				'Authorization': `Bearer ${jwt_token}`
			},
			params:{
				limit: 5,
				page: page
		}});
		dispatch({type:FETCH_MESSAGES,payload:{data:response.data.docs,page:page,pages:response.data.pages}});
    }
};

export const fetchMessagesUserId=()=>{

};