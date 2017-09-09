import axios from 'axios';
import {URL,USER_DETAILS_RECEIVED,USER_SET_DETAILS,USER_POSTS_RECEIVED,USER_DETAILS_ERROR,SET_AUTH_TOKEN,REMOVE_USER_DETAILS,USER_LOCATION_RECEIVED,USER_LOCATION_ERROR,OTHER_USER_RECEIVED,USER_UNFOLLOWED,USER_FOLLOWED} from './constants';
const USER_URL = `${URL}nativeAuth/userDetails`;
import {Actions} from 'react-native-router-flux';
import {getLocation} from "../services/common.js";
import {uploadImage} from "../services/messages";
export const userSetDetails = (payload)=>{
    return async (dispatch,getState) =>{
        dispatch({type:USER_SET_DETAILS,payload});
        const {jwt_token} = getState().auth;
        try {
            await axios.post(`${URL}user/update`,{
                user: payload
            },{
                headers:{
                    "Authorization": `Bearer ${jwt_token}`
                }
            });
            dispatch({type:USER_SAVE_DETAILS})
        } catch (error) {   
        }
    }
};
export const uploadUserImage = (image)=>{
    return async (dispatch,getState)=>{
        const {jwt_token} = getState().auth;
        let response = await uploadImage(image,jwt_token);
        dispatch({type:USER_SET_DETAILS, payload:{picture:response.data.image}});
    }
};
export const userSaveDetails = (user)=>{
    return async (dispatch,getState)=>{
        const {jwt_token} = getState().auth;
        try {
            await axios.post(`${URL}user/update`,{
                user
            },{
                headers:{
                    "Authorization": `Bearer ${jwt_token}`
                }
            });
            dispatch({type:USER_SAVE_DETAILS})
        } catch (error) {   
        }
    }
}
export const fetchUserDetails = (jwt_token)=>{
    return async (dispatch,getState)=>{
        try{
            let response = await axios.get(USER_URL,{
                headers:{
                    'Authorization': `Bearer ${jwt_token}`
                }
            });
            dispatch({type:SET_AUTH_TOKEN,payload: jwt_token});
            
            dispatch({type:USER_DETAILS_RECEIVED,payload: response.data});
            
            Actions.tabs();
        }catch(e){
            dispatch({type:USER_DETAILS_ERROR,payload:e});
        }       
    }
}
export const fetchUserLocationDetails = ()=>{
    
    return async (dispatch)=>{
        try{
            let location = await getLocation();
            dispatch({type:USER_LOCATION_RECEIVED,payload: location});       
            
        }catch(e){
            dispatch({type:USER_LOCATION_ERROR,payload: true});
        }       
    }
}

export const submitUserFollow = (userId)=>{
    return async (dispatch,getState)=>{
        const {jwt_token} = getState().auth;
        try {
            dispatch({type:USER_FOLLOWED,payload:userId})
            await axios.post(`${URL}user/follow/${userId}`,{},{
                headers:{
                    "Authorization": `Bearer ${jwt_token}`
                }
            });
        } catch (error) {
            
        }
    }
}
export const deleteUserFollow = (userId)=>{
    return async (dispatch,getState)=>{
        const {jwt_token} = getState().auth;
        try {
            dispatch({type:USER_UNFOLLOWED,payload:userId})
            await axios.post(`${URL}user/unfollow/${userId}`,{},{
                headers:{
                    "Authorization": `Bearer ${jwt_token}`
                }
            });
        } catch (error) {
            
        }
    }
}

export const getOtherUserDetails = (userId)=>{
    return async (dispatch,getState)=>{
        const {jwt_token} = getState().auth;
        try{
            let response = await axios.get(`${URL}user/get/${userId}`,{headers:{
                'Authorization': `Bearer ${jwt_token}`
            }});
        
            dispatch({type:OTHER_USER_RECEIVED,payload:{data:response.data}});
        }
        
        catch(err){
            console.log("error in other");
            console.log(err);
        };
    };
}

export const removeUserDetails = ()=>{
    return (dispatch)=>{
        dispatch({type:REMOVE_USER_DETAILS});
    }
    
}

export const getUserPosts = (userId,page)=>{
	
	return async (dispatch,getState)=>{
        const {jwt_token} = getState().auth;
        
		try {
			let response = await axios.get(`${URL}post/getPosts`,{
				headers:{
						'Authorization': `Bearer ${jwt_token}`
				},
				params:{
				sort: '-time',
				limit: 100,
                page: page,
                user: userId
            }});
            
			dispatch({type:USER_POSTS_RECEIVED,payload:{data:response.data.docs,page:page,pages:response.data.pages}});
			
		} catch (error) {
			
		}
		
		
	};
}

