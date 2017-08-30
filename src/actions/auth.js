import axios from "axios";
import {DEVICE_AUTH_URL,SET_AUTH_TOKEN,JWT_TOKEN,URL,FACEBOOK_LOGIN_FAIL,REMOVE_AUTH_TOKEN,ERROR_AUTH_TOKEN} from "./constants";
import {fetchUserDetails} from "./user";
import { AsyncStorage,Alert } from "react-native";
import {Actions} from "react-native-router-flux";
var DeviceInfo = require("react-native-device-info");
export const login = ()=>{
    return async (dispatch)=>{
        try {
            const deviceId = DeviceInfo.getUniqueID();
            const profile = {
                device: deviceId
            }
            
            let response = await axios.post(DEVICE_AUTH_URL,{profile});
            
            let stored_item = await AsyncStorage.setItem(JWT_TOKEN,response.data.token);
            dispatch({type:SET_AUTH_TOKEN,payload: response.data.token});
            Actions.tabs();
        } catch (error) {
            console.log("error in login");
            console.log(error);
        }
    }
}

export const logout = ()=>{
    return async (dispatch)=>{
        await AsyncStorage.removeItem(JWT_TOKEN);
        dispatch({type:REMOVE_AUTH_TOKEN});
        Actions.logo();
    }
}
export const setAuthToken=()=>{
    return async (dispatch)=>{

    }
}


/*{"id":"117083328855188008858","name":"puneet mahendra","givenName":"puneet","familyName":"mahendra","photoUrl":"https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg","email":"puneet.mahendra27@gmail.com"}*/