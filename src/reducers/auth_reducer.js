import {SET_AUTH_TOKEN,REMOVE_AUTH_TOKEN,ERROR_AUTH_TOKEN} from '../actions/constants';

const INITIAL_STATE = {
	jwt_token: null,
	error: null
};
export const auth_reducer = (state=INITIAL_STATE,action)=>{
	switch(action.type){
		case SET_AUTH_TOKEN:
			return {...state, jwt_token:action.payload};    
		case REMOVE_AUTH_TOKEN:
			
			return {...state, jwt_token:null};    
		case ERROR_AUTH_TOKEN:
			return {...state,error: action.payload}
		default:
			return state;
	}
}