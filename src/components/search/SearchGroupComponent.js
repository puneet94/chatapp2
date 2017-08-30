import React,{Component} from 'react';
import {View,Text} from 'react-native'
export default class SearchGroupComponent extends Component{
    constructor(props){
        super(props);
    }
    render=()=>{
        return (
            <View>            
                <Text>{"Search Group"}</Text>
            </View>            
        )
    }

}