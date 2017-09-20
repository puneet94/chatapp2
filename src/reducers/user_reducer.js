import {OTHER_USER_POSTS_RECEIVED,USER_DETAILS_RECEIVED,USER_FOLLOWERS_RECEIVED,
	USER_FOLLOWING_RECEIVED,EMPTY_FOLLOW_LIST,USER_SET_DETAILS,USER_LOCATION_RECEIVED,USER_POSTS_RECEIVED,POST_LIKED,POST_UNLIKED,REMOVE_USER_DETAILS,USER_LOCATION_ERROR,OTHER_USER_RECEIVED,USER_FOLLOWED,USER_UNFOLLOWED} from "../actions/constants";
const INITIAL_STATE = {
	user: null,
	location: null,
	user_location_error: false,
	otherUser: null,
	posts: [],
	loading: true,
	followers: [],
	following: [],
	otherUserPosts:[]
};
export const user_reducer = (state=INITIAL_STATE,action)=>{
	switch(action.type){
	case USER_POSTS_RECEIVED:
		return {...state, posts:[...action.payload.data],pages:action.payload.pages,loading: false};      
	case USER_DETAILS_RECEIVED:
		return {...state, user:action.payload.user};    
	case USER_SET_DETAILS:
		return {...state,user:{...state.user,...action.payload}};
	case USER_LOCATION_RECEIVED:
		return {...state, location:action.payload};    
	case USER_LOCATION_ERROR:
		return {...state, user_location_error:action.payload};    
	case OTHER_USER_RECEIVED:		
		return {...state, otherUser:action.payload.data};  
	case REMOVE_USER_DETAILS:
		return {...state, otherUser:null,otherUserPosts:[]};  
	case USER_FOLLOWED:
		return {...state,
			user:{...state.user,following:state.user.following.concat(action.payload)},
			otherUser:{...state.otherUser,followers:state.otherUser.followers.concat(state.user._id)}
		};
	case USER_UNFOLLOWED:
		const followers = state.otherUser.followers.filter((userId)=>{
			return userId!=state.user._id
		});
		const following = state.user.following.filter((userId)=>{
			return userId!=action.payload;	
		});
		return {...state,user:{...state.user,following},otherUser:{...state.otherUser,followers}};
	case POST_LIKED:
		return {...state,user:{...state.user,likes:state.user.likes.concat(action.payload)}};
	case POST_UNLIKED:
		const likes = state.user.likes.filter((postId)=>{
			return postId!=action.payload;	
		});
		return {...state,user:{...state.user,likes}};
	case EMPTY_FOLLOW_LIST:
		return {...state,followers:[],following:[]};
	case USER_FOLLOWERS_RECEIVED:
		return {...state,followers:action.payload};
	case USER_FOLLOWING_RECEIVED:
		
		return {...state,following:action.payload};
	
	default:
		return state;
	}
};