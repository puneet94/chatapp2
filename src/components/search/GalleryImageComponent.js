import React, {PureComponent} from 'react';
import {View, StyleSheet, Image, FlatList, Dimensions, TouchableOpacity} from 'react-native';
const windowSize= ((Dimensions.get('window').width - 12 ));
export default class GalleryComponent extends PureComponent{
    constructor(props){
        super(props);
        this.state={images: [],imageUrl:''};
    }

    
    currentImage=(item)=>{
        if(item == this.props.randomImage){
            return {
                
            };
        }
        else{
            return {};
        }
    }
    clickRandomImage = (imageUrl) => {
        this.props.selectRandomImage(imageUrl)
    }
    render = () => {
        let style1 = {};
        if(this.props.showBorder){
            style1 = {
                borderWidth: 0.5,
                borderColor: 'yellow'
            }
        }
        return (
            <TouchableOpacity 
            onPress = {() => this.clickRandomImage(this.props.singleImage)} 
            style = {style1}>
            <Image source = {{uri: this.props.singleImage}} 
            style={styles.singleImage}/>
            </TouchableOpacity>    
        );
    }
}
const styles = StyleSheet.create({
    singleImage: {
         width: windowSize/2.2,
         height: windowSize/2.2,
         flexWrap: 'wrap', 
         margin: 5
    }
});
