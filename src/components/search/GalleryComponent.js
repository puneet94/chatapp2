import React, {Component} from 'react';
import {View, StyleSheet, Image, Text,FlatList, Dimensions, TouchableOpacity} from 'react-native';
import GalleryImageComponent from './GalleryImageComponent';
import {fetchImages} from '../../services/common';
const windowSize= ((Dimensions.get('window').width - 12 ));
import uniqBy from "lodash/uniqBy";
import {Actions} from "react-native-router-flux";
import {connect} from "react-redux";
import {randomImagesLoading,setRandomImage,selectLibraryImage,selectRandomImage} from "../../actions/createPost";
class GalleryComponent extends Component{
    constructor(props){
        super(props);
    }
    selectRandomImage = (imageUrl)=>{
        this.props.setRandomImage(imageUrl);
        this.props.selectRandomImage(true);
        this.props.selectLibraryImage(false);
        Actions.pop();
    }
    fetchInternetImages = async() => {
		
		try{
			let imageResponse = await fetchImages(this.props.createPost.content||'happy',this.props.auth.jwt_token);
			this.setState({
				images: uniqBy(imageResponse.data)
			},()=>{
                this.props.randomImagesLoading(false);
            });
		}
		catch(e){

			console.log(e);
		}
	}
    componentWillMount= () => {   
        this.props.randomImagesLoading(true);
        this.fetchInternetImages();
        this.setState({
            size: (windowSize/ 2.2)
        });
    }
    _renderItem = ({item})=>{
        return(
            <GalleryImageComponent singleImage = {item}  selectRandomImage = {this.selectRandomImage} />
        );
    };
    _keyExtractor = (image, index) => {
        return image;
    };
    render = () => {
        if( this.props.createPost.randomImagesLoading){
            return (
                <View>
                <Text>{
                    "Loading"
                }</Text>
                </View>
            )
        }else{        
            return (
                    <FlatList 
                    style={styles.containerStyle} 
                    data = {this.state.images} 
                    renderItem = {this._renderItem}
                    keyExtractor = {this._keyExtractor}
                    numColumns = {2}
                />
                
                
                    
            );
        }
    }
}
const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        width: windowSize
        
    },
    singleImage: {
         width: windowSize/2.2,
         height: windowSize/2.2,
         flexWrap: 'wrap', 
         margin: 5
    }
});

const mapStateToProps = (state) => {
    
        return {
            auth:state.auth,
            createPost:state.createPost
        };
    }; 
export default connect(mapStateToProps,{randomImagesLoading,setRandomImage,selectLibraryImage,selectRandomImage})(GalleryComponent);
