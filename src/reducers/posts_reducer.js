import {
	POPULAR_POSTS_INCREMENT,
	NEARBY_POSTS_INCREMENT,
	POPULAR_POSTS_LOADING,
	NEARBY_POSTS_LOADING,
	LATEST_POSTS_REFRESH,
	POPULAR_POSTS_REFRESH,
	NEARBY_POSTS_REFRESH,
	LATEST_POSTS_INCREMENT,
	LATEST_POSTS_LOADING,
	LATEST_POSTS_RECEIVED,
	POST_USER_LIKED,
	POST_USER_UNLIKED,
	SEARCH_POSTS_RECEIVED,
	SEARCH_NO_POSTS,
	SET_SEARCH_INTEREST,
	SET_SEARCH_LOADING} from "../actions/constants";
import keyBy from "lodash/keyBy";
import keys from "lodash/keys";

const INITIAL_STATE = {
	latest: {
		posts: [],
		pages: 0,
		posts_loading: true,
		posts_received: false,
		page: 1,
		loading: true,
		refreshing: false 
	},
	popular: {
		posts: [],
		pages: 0,
		posts_loading: true,
		posts_received: false,
		page: 1,
		loading: true,
		refreshing: false 	
	},
	nearby:  {
		posts: [],
		pages: 0,
		posts_loading: true,
		posts_received: false,
		page: 1,
		loading: true,
		refreshing: false 
	},
	search:{
		posts: [],
		loading: false,
		no_posts: false,
		interest: null

	},
	postsHash:{} 
};
export const posts_reducer = (state=INITIAL_STATE,action)=>{
	switch(action.type){
	case LATEST_POSTS_REFRESH:
		return {...state,latest:{...state.latest,page: 1,refreshing:true}};
	case LATEST_POSTS_INCREMENT:
		return {...state,latest:{...state.latest,page: state.latest.page+1}};
	case LATEST_POSTS_LOADING:
		return {...state,latest:{...state.latest,loading: true}};
	
	case POPULAR_POSTS_REFRESH:
		return {...state,popular:{...state.popular,page: 1,refreshing:true}};
	case POPULAR_POSTS_INCREMENT:
		return {...state,popular:{...state.popular,page: state.popular.page+1}};
	case POPULAR_POSTS_LOADING:
		return {...state,latest:{...state.popular,loading: true}};
	
	case NEARBY_POSTS_REFRESH:
		return {...state,nearby:{...state.nearby,page: 1,refreshing:true}};
	case NEARBY_POSTS_INCREMENT:
		return {...state,nearby:{...state.nearby,page: state.nearby.page+1}};
	case NEARBY_POSTS_LOADING:
		return {...state,nearby:{...state.nearby,loading: true}};
	
	
	case LATEST_POSTS_RECEIVED:
		let postsHashNew = keyBy(action.payload.data,(post)=>{
			return post._id;
		});
		if(action.payload.page==1){
			return {...state, postsHash:{...state.postsHash,...postsHashNew},latest:{...state.latest,posts:[...keys(postsHashNew)],pages:action.payload.pages,loading:false,refreshing:false}};    
		}
		let postsIds = keys(postsHashNew).filter((postId)=>{
			if(state.latest.posts.indexOf(postId)==-1){
				return true;
			}
		});
		return {...state, postsHash:{...state.postsHash,...postsHashNew}, latest:{...state.latest,posts:[...state.latest.posts,...postsIds],pages:action.payload.pages,loading:false}};
	
	case 'POPULAR_POSTS_RECEIVED':
		let postsHashNew2 = keyBy(action.payload.data,(post)=>{
			return post._id;
		});
		if(action.payload.page==1){
			return {...state, postsHash:{...state.postsHash,...postsHashNew2},popular:{...state.popular,posts:[...keys(postsHashNew2)],pages:action.payload.pages,loading:false,refreshing:false}};    
		}
		let postsIds2 = keys(postsHashNew2).filter((postId)=>{
			if(state.popular.posts.indexOf(postId)==-1){
				return true;
			}
		});
		return {...state, postsHash:{...state.postsHash,...postsHashNew2}, popular:{...state.popular,posts:[...state.popular.posts,...postsIds2],pages:action.payload.pages,loading:false}};
	
	case 'NEARBY_POSTS_RECEIVED':
		let postsHashNew3 = keyBy(action.payload.data,(post)=>{
			return post._id;
		});
		if(action.payload.page==1){
			return {...state, postsHash:{...state.postsHash,...postsHashNew3},nearby:{...state.nearby,posts:[...keys(postsHashNew3)],pages:action.payload.pages,loading:false,refreshing:false}};    
		}
		let postsIds3 = keys(postsHashNew3).filter((postId)=>{
			if(state.nearby.posts.indexOf(postId)==-1){
				return true;
			}
		});
		return {...state, postsHash:{...state.postsHash,...postsHashNew3}, nearby:{...state.nearby,posts:[...state.nearby.posts,...postsIds3],pages:action.payload.pages,loading:false}};
	
	case SEARCH_POSTS_RECEIVED:
		let postsHashSearch = keyBy(action.payload.data,(post)=>{
			return post._id;
		});
		return {...state, postsHash:{...state.postsHash,...postsHashSearch},search:{...state.search,posts:[...keys(postsHashSearch)],loading:false}};    
	case SEARCH_NO_POSTS:
		return {...state,search:{...state.search,no_posts: action.payload}};
	case SET_SEARCH_LOADING:
		return {...state,search:{...state.search,loaidng: action.payload}};
	case SET_SEARCH_INTEREST:
		return {...state,search:{...state.search,interest: action.payload}};
	case POST_USER_LIKED:
		const postId  = action.payload.postId;
		const userId = action.payload.userId;
		const newPost = {...state.postsHash[postId],likes:state.postsHash[postId].likes.concat(userId)}
		const newHash = {...state.postsHash,...{[postId]:newPost}}
		const newState = {...state,postsHash:{...state.postsHash,...newHash}};
		return newState;
	case POST_USER_UNLIKED:
		const removePostId = action.payload.postId;
		const removeUserId = action.payload.userId;
		const indexRemoved = state.postsHash[removePostId].likes.indexOf(removeUserId);
		if(indexRemoved>-1){
			const newLikes  = [...state.postsHash[removePostId].likes.slice(0,indexRemoved),...state.postsHash[removePostId].likes.slice(indexRemoved+1)]
			const newPostRemoved = {...state.postsHash[removePostId],likes:newLikes}
			const newHashRemoved = {...state.postsHash,...{[removePostId]:newPostRemoved}}
			const newStateRemoved = {...state,postsHash:{...state.postsHash,...newHashRemoved}};
			return newStateRemoved;
		}else{
			return state;
		}
		

	default:
		return state;
	}
}