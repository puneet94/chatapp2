import axios from "axios";
import {URL} from "../actions/constants";

export const fetchUser = (id,jwt_token)=>{
	return axios.get(`${URL}user/get/${id}`,{
		headers:{
			"Authorization": `Bearer ${jwt_token}`
		}
	});
};