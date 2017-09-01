import axios from 'axios';

import {ALL_CHATS_RECEIVED,REVEALED_CHATS_RECEIVED,CREATE_CHAT_ROOM,CHAT_RECEIVED,GROUPS_CHATS_RECEIVED,URL,ALL_CHAT_INCREMENT,ALL_CHAT_LOADING,ALL_CHAT_REFRESH,CHAT_TRANSFERRED} from './constants';

export const uploadImage = (imageString) => {
	return async (dispatch,getState)=>{
		const {jwt_token} = getState().auth;
		let response = await axios.post(`${URL}upload/stringUpload`,{
            imageString
		},{
			headers:{
				"Authorization": `Bearer ${jwt_token}`
			},	
        });
        dispatch({type:IMAGE_UPLOADED,payload:response.data});
	};	
};

