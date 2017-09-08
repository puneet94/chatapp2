import axios from 'axios';
import {getLocation} from "../services/common.js";
import debounce from "lodash/debounce";
import {
		NEARBY_USERS_INCREMENT,
		NEARBY_USERS_LOADING,
        NEARBY_USERS_REFRESH,
        NEARBY_USERS_RECEIVED,
		URL,
		ALL_USERS_REFRESH,
		ALL_USERS_RECEIVED,
		ALL_USERS_INCREMENT,
		ALL_USERS_LOADING,
		USER_LOCATION_ERROR,
		SEARCH_USERS_RECEIVED,
		SEARCH_NO_USERS,
		SET_SEARCH_USER_INTEREST,
		SET_SEARCH_USER_LOADING
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
										limit: 5,
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
				dispatch({type: NEARBY_USERS_LOADING});

				try {
						const {jwt_token} = getState().auth;
						if (!getState().user.user_location_error) {
								location = getState().user.location;
								console.log(location);
						} else {
								location = await getLocation();
								console.log("from second");
								console.log(location);
						}
						const {latitude, longitude} = location.coords;
						let response = await axios.get(`${URL}user/getUsers`, {
								headers: {
										'Authorization': `Bearer ${jwt_token}`
								},
								params: {
										latitude,
										longitude,
										distance: 10,
										limit: 5,
                                        page: page,
                                        nearby: true
								}
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
						console.log("nearby users error");
						console.log(e);
				}
		};
}