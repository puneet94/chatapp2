import axios from "axios";
import {URL,SET_POST_IMAGE,SET_POST_LOCATION,SET_POST_INTERESTS,SET_CONTENT,SELECT_LIBRARY_IMAGE,SELECT_RANDOM_IMAGE,SET_RANDOM_IMAGE,SET_LIBRARY_IMAGE,RANDOM_IMAGE_LOADING,RANDOM_IMAGES_LOADING,LIBRARY_IMAGE_LOADING} from "../actions/constants";
import {uploadImage} from "../services/messages";


export const createPostImage = (post)=>{
	
	return async (dispatch,getState)=>{
		const {jwt_token} = getState().auth;
		if(post.selectRandomImage){
			
			dispatch({type:SET_POST_IMAGE,payload:post.randomImage});
		}else if(post.selectLibraryImage){
			let response = await uploadImage(post.libraryImage,jwt_token);
			
			dispatch({type:SET_POST_IMAGE,payload:response.data.image});
		}
	}
}
export const setPostLocation = (location)=>{
	return (dispatch)=>{
		dispatch({type:SET_POST_LOCATION,payload:location});
	}
}

export const setPostInterests = (interests)=>{
	return (dispatch)=>{
		dispatch({type:SET_POST_INTERESTS,payload:interests});
	}
}
export const submitPost = (post)=>{
	return async (dipatch,getState)=>{
		const {jwt_token} = getState().auth;
		let response = await axios.post(`${URL}post/create/`,{
			post:post
		},{
			headers:{
				"Authorization": `Bearer ${jwt_token}`
			},	
		});
	}
}
export const setPostContent = (content)=>{
	return (dispatch)=>{
		dispatch({type:SET_CONTENT,payload:content});
	}
}

export const setPostImage = (content)=>{
	return (dispatch)=>{
		dispatch({type:SET_POST_IMAGE,payload:content});
	}
}
export const setRandomImage = (content)=>{
	return (dispatch)=>{
		dispatch({type:SET_RANDOM_IMAGE,payload:content});
	}
}

export const setLibraryImage = (content)=>{
	return (dispatch)=>{
		dispatch({type:SET_LIBRARY_IMAGE,payload:content});
	}
}

export const selectRandomImage = (content)=>{
	return (dispatch)=>{
		dispatch({type:SELECT_RANDOM_IMAGE,payload:content});
	}
}
export const selectLibraryImage = (content)=>{
	return (dispatch)=>{
		dispatch({type:SELECT_LIBRARY_IMAGE,payload:content});
	}
}
export const randomImageLoading = (content)=>{
	return (dispatch)=>{
		dispatch({type:RANDOM_IMAGE_LOADING,payload:content});
	}
}
export const libraryImageLoading = (content)=>{
	return (dispatch)=>{
		dispatch({type:LIBRARY_IMAGE_LOADING,payload:content});
	}
}
export const randomImagesLoading = (content)=>{
	return (dispatch)=>{
		dispatch({type:RANDOM_IMAGES_LOADING,payload:content});
	}
}
