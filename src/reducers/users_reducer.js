
import {
	NEARBY_USERS_INCREMENT,
	NEARBY_USERS_LOADING,
	ALL_USERS_REFRESH,
	NEARBY_USERS_RECEIVED,
	NEARBY_USERS_REFRESH,
	ALL_USERS_INCREMENT,
	ALL_USERS_LOADING,
	ALL_USERS_RECEIVED,
	SEARCH_USERS_RECEIVED,
	SEARCH_NO_USERS,
	SET_SEARCH_USER_INTEREST,
	SET_SEARCH_USER_LOADING} from "../actions/constants";
import keyBy from "lodash/keyBy";
import keys from "lodash/keys";

const INITIAL_STATE = {
	all: {
		users: [],
		pages: 0,
		users_loading: true,
		users_received: false,
		page: 1,
		loading: true,
		refreshing: false 
	},
	nearby:  {
		users: [],
		pages: 0,
		users_loading: true,
		users_received: false,
		page: 1,
		loading: true,
		refreshing: false 
	},
	search:{
		users: [],
		loading: false,
		no_users: false,
		interest: null

	},
	usersHash:{} 
};

export const users_reducer = (state=INITIAL_STATE,action)=>{
    switch(action.type){
    case ALL_USERS_REFRESH:
		return {...state,all:{...state.all,page: 1,refreshing:true}};
	case ALL_USERS_INCREMENT:
		return {...state,all:{...state.all,page: state.all.page+1}};
	case ALL_USERS_LOADING:
		return {...state,all:{...state.all,loading: true}};
	
	
	case NEARBY_USERS_REFRESH:
		return {...state,nearby:{...state.nearby,page: 1,refreshing:true}};
	case NEARBY_USERS_INCREMENT:
		return {...state,nearby:{...state.nearby,page: state.nearby.page+1}};
	case NEARBY_USERS_LOADING:
		return {...state,nearby:{...state.nearby,loading: true}};
	
    case ALL_USERS_RECEIVED:
		let usersHashNew = keyBy(action.payload.data,(user)=>{
			return user._id;
		});
		if(action.payload.page==1){
			return {...state, usersHash:{...state.usersHash,...usersHashNew},all:{...state.all,users:[...keys(usersHashNew)],pages:action.payload.pages,loading:false,refreshing:false}};    
		}
		let usersIds = keys(usersHashNew).filter((userId)=>{
			if(state.all.users.indexOf(userId)==-1){
				return true;
			}
		});
		return {...state, usersHash:{...state.usersHash,...usersHashNew}, all:{...state.all,users:[...state.all.users,...usersIds],pages:action.payload.pages,loading:false}};
	
	case NEARBY_USERS_RECEIVED:
		let usersHashNew3 = keyBy(action.payload.data,(user)=>{
			return user._id;
		});
		if(action.payload.page==1){
			return {...state, usersHash:{...state.usersHash,...usersHashNew3},nearby:{...state.nearby,users:[...keys(usersHashNew3)],pages:action.payload.pages,loading:false,refreshing:false}};    
		}
		let usersIds3 = keys(usersHashNew3).filter((userId)=>{
			if(state.nearby.users.indexOf(userId)==-1){
				return true;
			}
		});
		return {...state, usersHash:{...state.usersHash,...usersHashNew3}, nearby:{...state.nearby,users:[...state.nearby.users,...usersIds3],pages:action.payload.pages,loading:false}};
	
	case SEARCH_USERS_RECEIVED:
		let usersHashSearch = keyBy(action.payload.data,(user)=>{
			return user._id;
		});
		return {...state, usersHash:{...state.usersHash,...usersHashSearch},search:{...state.search,users:[...keys(usersHashSearch)],loading:false}};    
	case SEARCH_NO_USERS:
		return {...state,search:{...state.search,no_users: action.payload}};
	case SET_SEARCH_USER_LOADING:
		return {...state,search:{...state.search,loaidng: action.payload}};
	case SET_SEARCH_USER_INTEREST:
		return {...state,search:{...state.search,interest: action.payload}};
	
        default:
            return state;
    }
}