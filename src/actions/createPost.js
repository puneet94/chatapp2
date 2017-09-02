
import {SET_CONTENT,SELECT_LIBRARY_IMAGE,SELECT_RANDOM_IMAGE,SET_RANDOM_IMAGE,SET_LIBRARY_IMAGE,RANDOM_IMAGE_LOADING,RANDOM_IMAGES_LOADING,LIBRARY_IMAGE_LOADING} from "../actions/constants";
export const setPostContent = (content)=>{
	return (dispatch)=>{
		dispatch({type:SET_CONTENT,payload:content});
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
