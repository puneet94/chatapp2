import {LATEST_POSTS_REFRESH,LATEST_POSTS_INCREMENT,LATEST_POSTS_LOADING,LATEST_POSTS_RECEIVED} from "../actions/constants";
import keyBy from "lodash/keyBy";
import keys from "lodash/keys";

const INITIAL_STATE = {
	latest: {
		posts: [],
		pages: 0,
		posts_loading: true,
		posts_received: false,
		page: 1,
		loading: true
	},
	popular: {
		posts: [],
		pages: 0,
		posts_loading: true,
		posts_received: false
	},
	nearby:  {
		posts: [],
		pages: 0,
		posts_loading: true,
		posts_received: false,
	},
	postsHash:{} 
};
export const posts_reducer = (state=INITIAL_STATE,action)=>{
	switch(action.type){
	case LATEST_POSTS_REFRESH:
		return {...state,latest:{...state.latest,page: 1}};
	case LATEST_POSTS_INCREMENT:
		return {...state,latest:{...state.latest,page: state.latest.page+1}};
	case LATEST_POSTS_LOADING:
		return {...state,latest:{...state.latest,loading: true}};
	case LATEST_POSTS_RECEIVED:
		const postsHashNew = keyBy(action.payload.data,(post)=>{
			return post._id;
		});
		
		if(action.payload.page==1){
			return {...state, postsHash:{...state.postsHash,...postsHashNew},latest:{...state.latest,posts:[...keys(postsHashNew)],pages:action.payload.pages,loading:false}};    
		}
		const postsIds = keys(postsHashNew).filter((postId)=>{
			if(state.latest.posts.indexOf(postId)==-1){
				return true;
			}
		});
		return {...state, postsHash:{...state.postsHash,...postsHashNew}, latest:{...state.latest,posts:[...state.latest.posts,...postsIds],pages:action.payload.pages,loading:false}};
	case 'POPULAR_POSTS_RECEIVED':
		if(action.payload.page==1){
			return {...state, popular:{...state.popular,posts:[...action.payload.data],pages:action.payload.pages}};    
		}
		return {...state, popular:{...state.popular,posts:[...state.popular.posts,...action.payload.data],pages:action.payload.pages}};
	case 'NEARBY_POSTS_RECEIVED':
		if(action.payload.page==1){
			return {...state, nearby:{...state.nearby,posts:[...action.payload.data],pages:action.payload.pages}};    
		}
		return {...state, nearby:{...state.nearby,posts:[...state.nearby.posts,...action.payload.data],pages:action.payload.pages}};
	default:
		return state;
	}
}