import axios from 'axios';
import {getLocation} from "../services/common.js";
import debounce from "lodash/debounce";
import {
		POPULAR_POSTS_INCREMENT,
		NEARBY_POSTS_INCREMENT,
		POPULAR_POSTS_LOADING,
		NEARBY_POSTS_LOADING,
		NEARBY_POSTS_REFRESH,
		POPULAR_POSTS_REFRESH,
		URL,
		POST_LIKED,
		POST_UNLIKED,
		LATEST_POSTS_REFRESH,
		LATEST_POSTS_RECEIVED,
		LATEST_POSTS_INCREMENT,
		LATEST_POSTS_LOADING,
		POST_USER_LIKED,
		USER_LOCATION_ERROR,
		SEARCH_POSTS_RECEIVED,
		SEARCH_NO_POSTS,
		SET_SEARCH_INTEREST,
		POST_USER_UNLIKED,
		SET_SEARCH_LOADING
} from "./constants";

export const refreshNearbyPage = () => {
		return (dispatch) => {
				dispatch({type: NEARBY_POSTS_REFRESH})
		}
}



export const incrementNearbyPage = () => {
		return (dispatch) => {
				dispatch({type: NEARBY_POSTS_INCREMENT})
		}
}
export const refreshLatestPage = () => {
		return (dispatch) => {
				dispatch({type: LATEST_POSTS_REFRESH});
		}
}
export const incrementLatestPage = () => {
		return (dispatch) => {
				dispatch({type: LATEST_POSTS_INCREMENT});
		}
}
export const refreshPopularPage = () => {
		return (dispatch) => {
				dispatch({type: POPULAR_POSTS_REFRESH});
		}
}
export const incrementPopularPage = () => {
		return (dispatch) => {
				dispatch({type: POPULAR_POSTS_INCREMENT});
		}
}

export const setSearchInterest = (interest) => {
		return (dispatch) => {
				dispatch({type: SET_SEARCH_INTEREST, payload: interest});
		};
};

export const getSearchPosts = (interest) => {

		const searchPostsFunction = async(dispatch, getState) => {
				const {jwt_token} = getState().auth;
				try {
					dispatch({type: SET_SEARCH_LOADING,payload: true});
						dispatch({type: SEARCH_NO_POSTS, payload: false});
						let response = await axios.get(`${URL}post/getPosts`, {
								headers: {
										'Authorization': `Bearer ${jwt_token}`
								},
								params: {
										interest: interest,
										limit: 50,
										page: 1
								}
						});
						dispatch({
								type: SEARCH_POSTS_RECEIVED,
								payload: {
										data: response.data.docs
								}
						});
						if (response.data.docs.length == 0) {
								dispatch({type: SEARCH_NO_POSTS, payload: true});
						}

				} catch (error) {
						dispatch({type: USER_LOCATION_ERROR, payload: error});
				}
		};
		return debounce(searchPostsFunction, 300, {
				leading: true,
				trailing: false
		});
}

export const getLatestPosts = (page) => {

		return async(dispatch, getState) => {
				const {jwt_token} = getState().auth;
				dispatch({type: LATEST_POSTS_LOADING});
				try {
						let response = await axios.get(`${URL}post/getPosts`, {
								headers: {
										'Authorization': `Bearer ${jwt_token}`
								},
								params: {
										sort: '-time',
										limit: 5,
										page: page
								}
						});
						dispatch({
								type: LATEST_POSTS_RECEIVED,
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

export const getNearbyPosts = (page) => {

		return async(dispatch, getState) => {
				var location;
				dispatch({type: NEARBY_POSTS_LOADING});
				try {
						const {jwt_token} = getState().auth;
						if (!getState().user.user_location_error) {
								location = getState().user.location;
						} else {
								location = await getLocation();
						}
						const {latitude, longitude} = location.coords;
						let response = await axios.get(`${URL}post/getPosts`, {
								headers: {
										'Authorization': `Bearer ${jwt_token}`
								},
								params: {
										latitude,
										longitude,
										distance: 10,
										limit: 5,
										page: page
								}
						});
						dispatch({
								type: 'NEARBY_POSTS_RECEIVED',
								payload: {
										data: response.data.docs,
										page: page,
										pages: response.data.pages
								}
						});
				} catch (e) {
						console.log("nearby posts error");
						console.log(e);
				}

		};
}
export const getPopularPosts = (page) => {
		return async(dispatch, getState) => {
				dispatch({type: POPULAR_POSTS_LOADING});
				const {jwt_token} = getState().auth;
				let response = await axios.get(`${URL}post/getPosts`, {
						headers: {
								'Authorization': `Bearer ${jwt_token}`
						},
						params: {
								sort: '-upvotesLength',
								limit: 5,
								page: page
						}
				});
				dispatch({
						type: 'POPULAR_POSTS_RECEIVED',
						payload: {
								data: response.data.docs,
								page: page,
								pages: response.data.pages
						}
				});
		};
}
export const submitLike = (postId) => {
		return async(dispatch, getState) => {
				const {jwt_token} = getState().auth;
				const userId = getState().user.user._id;
				dispatch({type: POST_LIKED, payload: postId});
				dispatch({
						type: POST_USER_LIKED,
						payload: {
								postId,
								userId
						}
				});
				let response = await axios.post(`${URL}post/like/${postId}`, {}, {
						headers: {
								"Authorization": `Bearer ${jwt_token}`
						}
				});
		};
};

export const submitViews = (postId) => {
		return async(dispatch, getState) => {
				const {jwt_token} = getState().auth;
				try {

						let response = await axios.post(`${URL}post/views/${postId}`, {}, {
								headers: {
										"Authorization": `Bearer ${jwt_token}`
								}
						});
				} catch (e) {
						console.log("exception in submit views");
						console.log(e);
				}
		};
};

export const deleteLike = (postId) => {
		return async(dispatch, getState) => {
				const {jwt_token} = getState().auth;
				const userId = getState().user.user._id;
				dispatch({type: POST_UNLIKED, payload: postId});
				dispatch({
						type: POST_USER_UNLIKED,
						payload: {
								postId,
								userId
						}
				});
				try {

						let response = await axios.post(`${URL}post/unlike/${postId}`, {}, {
								headers: {
										"Authorization": `Bearer ${jwt_token}`
								}
						});
						console.log("dlete like");
						console.log(response);
				} catch (e) {
						console.log("error in delete like");
						console.log(e);
				}

		};
};
export const deletePost = (postId) => {
		return async(dispatch, getState) => {
				const {jwt_token} = getState().auth;
				console.log("the token");
				console.log(jwt_token);
				let response = await axios.delete(`${URL}post/delete/${postId}`, {
						headers: {
								"Authorization": `Bearer ${jwt_token}`
						}
				});

		}
};