import React,{Component} from 'react';
import {View,Text} from 'react-native'
export default class SubmitPostComponent extends Component{
    constructor(props){
        super(props);
    }
    render=()=>{
        return (
            <View>            
                <Text>{"Submit Post"}</Text>
            </View>            
        )
    }

}