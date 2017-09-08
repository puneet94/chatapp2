import React, {PureComponent} from 'react';
import {View, StyleSheet, Image, FlatList, Dimensions, TouchableOpacity} from 'react-native';
const windowSize= ((Dimensions.get('window').width - 12 ));
export default class GalleryComponent extends PureComponent{
    constructor(props){
        super(props);
        this.state={images: [],imageUrl:''};
    }

    
    
    clickRandomImage = (imageUrl) => {
        this.props.selectRandomImage(imageUrl)
    }
    render = () => {
        return (
            <TouchableOpacity 
            onPress = {() => this.clickRandomImage(this.props.singleImage)} 
            >
            <Image source = {{uri: this.props.singleImage}} 
            style={styles.singleImage}/>
            </TouchableOpacity>    
        );
    }
}
const styles = StyleSheet.create({
    singleImage: {
         width: windowSize/2,
         height: windowSize/2, 
         margin: 5
    }
});
