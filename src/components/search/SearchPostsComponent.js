import React,{Component} from 'react';
import {View,Text} from 'react-native'
export default class SearchPostsComponent extends Component{
    constructor(props){
        super(props);
    }
    render=()=>{
        return (
            <View>            
                <Text>{"Search Posts"}</Text>
            </View>            
        )
    }

}