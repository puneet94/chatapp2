import axios from "axios";
import {URL} from "../actions/constants";

export const getLocation = ()=>{
    const locationPromise = new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                console.log("posiiton founnd");
                console.log(position);
                resolve(position);
            },
            (error) => reject(error),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
        );
    });
    return locationPromise;

};


export const  fetchImages =  (imageText,jwt_token)=>{
	
	return axios.get(`${URL}upload/getImages`,{
		headers:{
			"Authorization": `Bearer ${jwt_token}`
		},
		params:{
			imageText
		}
	});
	
	
};
