import React,{Component} from 'react';
import {View,Text} from 'react-native'
export default class SearchProfileComponent extends Component{
    constructor(props){
        super(props);
    }
    render=()=>{
        return (
            <View>            
                <Text>{"Search Profile"}</Text>
            </View>            
        )
    }

}