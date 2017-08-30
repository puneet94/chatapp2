import axios from 'axios';
import {getLocation} from "../services/common.js";
import {URL,POST_LIKED,POST_UNLIKED,LATEST_POSTS_REFRESH,LATEST_POSTS_RECEIVED,LATEST_POSTS_INCREMENT,LATEST_POSTS_LOADING} from "./constants";
export const refreshLatestPage = ()=>{
	return (dispatch)=>{
		dispatch({type:LATEST_POSTS_REFRESH});
	}
}
export const  incrementLatestPage= ()=>{
	return (dispatch)=>{
		dispatch({type:LATEST_POSTS_INCREMENT});
	}
}
export const getLatestPosts = (page)=>{
	
	return async (dispatch,getState)=>{
		const {jwt_token} = getState().auth;
		dispatch({type:LATEST_POSTS_LOADING});
		try {
			let response = await axios.get(`${URL}post/getPosts`,{
				headers:{
						'Authorization': `Bearer ${jwt_token}`
				},
				params:{
				sort: '-time',
				limit: 5,
				page: page
			}});
			dispatch({type:LATEST_POSTS_RECEIVED,payload:{data:response.data.docs,page:page,pages:response.data.pages}});
			
		} catch (error) {
			
		}
		
		
	};
}
getLocationAsync = async () => {
			let { status } = await Permissions.askAsync(Permissions.LOCATION);
			if (status !== 'granted') {
			this.setState({
				errorMessage: 'Permission to access location was denied',
			});
			}

			return  Location.getCurrentPositionAsync({});
			
  }
export const getNearbyPosts =  (page) => {
	
	return async (dispatch,getState)=>{
		var location;
		try{
			const {jwt_token} = getState().auth;
			if(!getState().user.user_location_error){
				location = getState().user.location;
			}else{
				location = await getLocation();
			}
			const {latitude,longitude} = location.coords;
			let response = await axios.get(`${URL}post/getPosts`,{
				headers:{
						'Authorization': `Bearer ${jwt_token}`
				},
				params:{
					latitude,
					longitude,
					distance: 10,
					limit: 5,
					page: page
			}});
			dispatch({type:'NEARBY_POSTS_RECEIVED',payload:{data:response.data.docs,page:page,pages:response.data.pages}});
		}catch(e){
			console.log("nearby posts error");
			console.log(e);
		}
		
	};
}
export const getPopularPosts = (page)=>{
	return (dispatch,getState)=>{
		const {jwt_token} = getState().auth;
		axios.get(`${URL}post/getPosts`,{
			headers:{
					'Authorization': `Bearer ${jwt_token}`
			},params:{
			sort: '-upvotesLength',
			limit: 5,
			page: page
		}}).then((response)=>{
			
			dispatch({type:'POPULAR_POSTS_RECEIVED',payload:{data:response.data.docs,page:page,pages:response.data.pages}});
		});
	};
}

export const submitLike = (postId)=>{
	return async (dispatch,getState)=>{
		const {jwt_token} = getState().auth;
		dispatch({type:POST_LIKED,payload:postId})
		let response = await axios.post(`${URL}post/like/${postId}`,{
		},{
			headers:{
				"Authorization": `Bearer ${jwt_token}`
			},
			
		});
	};
};
export const deleteLike = (postId)=>{
	return async (dispatch,getState)=>{
		const {jwt_token} = getState().auth;
		dispatch({type:POST_UNLIKED,payload:postId})
		let response = await axios.post(`${URL}post/unlike/${postId}`,{
		},{
			headers:{
				"Authorization": `Bearer ${jwt_token}`
			},
			
		});
	};
};
export const deletePost = (postId)=>{
	return async(dispatch,getState)=>{
		const {jwt_token} = getState().auth;
		console.log("the token");
		console.log(jwt_token);
		let response = await axios.delete(`${URL}post/delete/${postId}`,{
			headers: {
				"Authorization": `Bearer ${jwt_token}`
			}
		});

	}
};