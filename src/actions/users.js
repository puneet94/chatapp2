import axios from 'axios';
import {getLocation} from "../services/common.js";
import debounce from "lodash/debounce";
import {
		NEARBY_USERS_INCREMENT,
		NEARBY_USERS_LOADING,
        NEARBY_USERS_REFRESH,
		NEARBY_USERS_RECEIVED,
		USER_LOCATION_RECEIVED,
		URL,
		ALL_USERS_REFRESH,
		ALL_USERS_RECEIVED,
		ALL_USERS_INCREMENT,
		ALL_USERS_LOADING,
		USER_LOCATION_ERROR,
		SEARCH_USERS_RECEIVED,
		SEARCH_NO_USERS,
		SET_SEARCH_USER_INTEREST,
		SET_SEARCH_USER_LOADING,
		SET_USER_SEARCH_EMPTY
} from "./constants";

export const refreshNearbyPage = () => {
		return (dispatch) => {
				dispatch({type: NEARBY_USERS_REFRESH})
		}
}
export const incrementNearbyPage = () => {
		return (dispatch) => {
				dispatch({type: NEARBY_USERS_INCREMENT})
		}
}
export const refreshAllPage = () => {
		return (dispatch) => {
				dispatch({type: ALL_USERS_REFRESH});
		}
}
export const incrementAllPage = () => {
		return (dispatch) => {
				dispatch({type: ALL_USERS_INCREMENT});
		}
}
export const setSearchInterest = (interest) => {
		return (dispatch) => {
				dispatch({type: SET_SEARCH_USER_INTEREST, payload: interest});
		};
};

export const setUserSearchEmpty = ()=>{
	return (dispatch)=>{
		dispatch({type:SET_USER_SEARCH_EMPTY});
	}
};
export const getSearchUsers = (interest) => {

		const searchUsersFunction = async(dispatch, getState) => {
				const {jwt_token} = getState().auth;
				try {
					dispatch({type: SET_SEARCH_USER_LOADING,payload: true});
						dispatch({type: SEARCH_NO_USERS, payload: false});
						let response = await axios.get(`${URL}user/getUsers`, {
								headers: {
										'Authorization': `Bearer ${jwt_token}`
								},
								params: {
										interest: interest,
										limit: 50,
                                        page: 1,
                                        all:true
								}
						});
						dispatch({
								type: SEARCH_USERS_RECEIVED,
								payload: {
										data: response.data.docs
								}
						});
						if (response.data.docs.length == 0) {
								dispatch({type: SEARCH_NO_USERS, payload: true});
						}

				} catch (error) {
						dispatch({type: USER_LOCATION_ERROR, payload: error});
				}
		};
		return debounce(searchUsersFunction, 300, {
				leading: true,
				trailing: false
		});
}
export const getAllUsers = (page) => {
		return async(dispatch, getState) => {
				const {jwt_token} = getState().auth;
				dispatch({type: ALL_USERS_LOADING});
				try {
						let response = await axios.get(`${URL}user/getUsers`, {
								headers: {
										'Authorization': `Bearer ${jwt_token}`
								},
								params: {
										limit: 10,
                                        page: page,
                                        all: true
								}
						});
						dispatch({
								type: ALL_USERS_RECEIVED,
								payload: {
										data: response.data.docs,
										page: page,
										pages: response.data.pages
								}
						});

				} catch (error) {
						dispatch({type: USER_LOCATION_ERROR, payload: error});
				}

		};
}

export const getNearbyUsers = (page) => {
		return async(dispatch, getState) => {
				var location;
				var params = {
					distance: 10,
					limit: 10,
					page: page,
					nearby: true
				};
				dispatch({type: NEARBY_USERS_LOADING});
				try {
						const {jwt_token} = getState().auth;
						if (getState().user.location) {


							location = getState().user.location;

							const {latitude, longitude} = location.coords;
							params.latitude = latitude;
							params.longitude = longitude;
						} else {
							try{
								location = await getLocation();
								const {latitude, longitude} = location.coords;
								params.latitude = latitude;
								params.longitude = longitude;
								dispatch({type:USER_LOCATION_RECEIVED,payload: location});       

							}catch(e){
								
							}
							
						}
						
						let response = await axios.get(`${URL}user/getUsers`, {
								headers: {
										'Authorization': `Bearer ${jwt_token}`
								},
								params
						});
						dispatch({
								type: NEARBY_USERS_RECEIVED,
								payload: {
										data: response.data.docs,
										page: page,
										pages: response.data.pages
								}
						});
				} catch (e) {
						
						console.log(e);
				}
		};
}