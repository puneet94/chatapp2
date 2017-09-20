import {SET_CONTENT,SET_POST_LOCATION,
    SET_POST_INTERESTS,EMPTY_CREATE_POST,SET_POST_IMAGE,SELECT_LIBRARY_IMAGE,SELECT_RANDOM_IMAGE,SET_RANDOM_IMAGE,SET_LIBRARY_IMAGE,RANDOM_IMAGE_LOADING,RANDOM_IMAGES_LOADING,LIBRARY_IMAGE_LOADING} from "../actions/constants";
const INITIAL_STATE = {
	content: "",
	randomImage: "",
	libraryImage: "",
    selectRandomImage: false,
    selectLibraryImage: false,
    randomImageLoading: false,
    libraryImageLoading: false,
    randomImagesLoading: false,
    image: "",
    latitude: null,
    longitude: null,
    interests: ""
};
export const createPost_reducer = (state=INITIAL_STATE,action)=>{
	switch(action.type){
    case SET_POST_IMAGE:
        return {...state,image:action.payload};
	case SET_CONTENT:
		return {...state, content:action.payload};      
	case SET_RANDOM_IMAGE:
        return {...state, randomImage:action.payload};    
    case SET_LIBRARY_IMAGE:
        return {...state, libraryImage:action.payload};    
    case SELECT_RANDOM_IMAGE:
        return {...state, selectRandomImage:action.payload};    
    case SELECT_LIBRARY_IMAGE:
        return {...state, selectLibraryImage:action.payload};    
    case RANDOM_IMAGE_LOADING:
        return {...state, randomImageLoading:action.payload};    
    case LIBRARY_IMAGE_LOADING:
        return {...state, libraryImageLoading:action.payload};    
    case RANDOM_IMAGES_LOADING:
		return {...state, randomImagesLoading:action.payload};    
    case SET_POST_LOCATION:
		return {...state, latitude:action.payload.latitude,longitude:action.payload.longitude};    
    case SET_POST_INTERESTS:
		return {...state, interests:action.payload};    
    case EMPTY_CREATE_POST:
        return {...state,content: "",
        randomImage: "",
        libraryImage: "",
        selectRandomImage: false,
        selectLibraryImage: false,
        randomImageLoading: false,
        libraryImageLoading: false,
        randomImagesLoading: false,
        image: "",
        interests: ""};
	default:
		return state;
	}
};