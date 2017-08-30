import {USER_DETAILS_RECEIVED,USER_LOCATION_RECEIVED,USER_POSTS_RECEIVED,POST_LIKED,POST_UNLIKED,REMOVE_USER_DETAILS,USER_LOCATION_ERROR,OTHER_USER_RECEIVED,USER_FOLLOWED,USER_UNFOLLOWED} from "../actions/constants";
const INITIAL_STATE = {
	user: null,
	location: null,
	user_location_error: false,
	otherUser: null,
	posts: [],
	loading: true
};
export const user_reducer = (state=INITIAL_STATE,action)=>{
	switch(action.type){
	case USER_POSTS_RECEIVED:
		return {...state, posts:[...action.payload.data],pages:action.payload.pages,loading: false};      
	case USER_DETAILS_RECEIVED:
		return {...state, user:action.payload.user};    
	case USER_LOCATION_RECEIVED:
		return {...state, location:action.payload};    
	case USER_LOCATION_ERROR:
		return {...state, user_location_error:action.payload};    
	case OTHER_USER_RECEIVED:		
		return {...state, otherUser:action.payload.data};  
	case REMOVE_USER_DETAILS:
		return {...state, otherUser:null};  
	case USER_FOLLOWED:
		return {...state,user:{...state.user,following:state.user.following.concat(action.payload)}};
	case USER_UNFOLLOWED:
		const following = state.user.following.filter((userId)=>{
			return userId!=action.payload;	
		});
		return {...state,user:{...state.user,following}};
	case POST_LIKED:
		console.log("post liked");
		console.log(action.payload);
		return {...state,user:{...state.user,likes:state.user.likes.concat(action.payload)}};
	case POST_UNLIKED:
		const likes = state.user.likes.filter((postId)=>{
			return postId!=action.payload;	
		});
		return {...state,user:{...state.user,likes}};

	default:
		return state;
	}
};