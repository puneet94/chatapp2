import React,{Component} from 'react';
import {View,Text,StyleSheet,TouchableOpacity,TextInput, Button, Dimensions, Image, Keyboard} from 'react-native';
import PhotoUpload from 'react-native-photo-upload';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import {setPostContent,libraryImageLoading,selectLibraryImage,setLibraryImage,selectRandomImage} from '../../actions/createPost';


import {
	RkText,
	RkButton, RkStyleSheet
  } from 'react-native-ui-kitten';
  
class CreatePostComponent extends Component{
constructor(props){
	super(props);
	this.state = {
		
		
		
		showGallery	: false,
		showLibraryImage: false
	};
}
	onContentSizeChange = (event)=>{
			const { contentSize} = event.nativeEvent;
			this.setState({
					height: contentSize.height
			}); 
	}
	openGalleryPage = ()=>{
		Keyboard.dismiss();
		Actions.galleryPage();
	}
	onTextChange = (event)=>{
			const {  text } = event.nativeEvent;
			this.props.setPostContent(text);
	}
	
	showGallery = () => {
		this.setState({showGallery: true, showLibraryImage: false, fetchImagesLoading: false});
		
	}
	showLibraryImage = (avatar) => {
		if (avatar) {

			console.log('Image base64 string: ', avatar);
			this.setState({showGallery: false, showLibraryImage: true, libraryImage: avatar});
			this.props.setLibraryImage(avatar);
			this.props.selectLibraryImage(true);
			this.props.selectRandomImage(false);
			this.props.libraryImageLoading(false);
		}
	}
	render= ()=>{
		return (
			<View style={styles.container}>
				<View style={styles.textInputContainer}>
					<Text>{300-this.props.createPost.content.length}</Text>
					<TextInput
							autoFocus={true}
							multiline={true}
							style={[styles.textInput, {height: Math.max(35, this.state.height)}]}
							onChange={this.onTextChange}
							value={this.props.createPost.content}
							maxLength = {300}
							onContentSizeChange = {this.onContentSizeChange}
							underlineColorAndroid = 'transparent'
				 />
				 </View>
				 	<View style={styles.buttons}>
						<RkButton style={styles.button} onPress={()=>this.openGalleryPage()} rkType='clear link'>IMAGE LIBRARY</RkButton>
						<View style={styles.separator}/>
						<PhotoUpload pickerTitle={"Send Image"} style = {{backgroundColor: 'green'}} 
						onButtonCancel = {()=>{this.props.libraryImageLoading(false)}}
						
						onButtonPress =  {()=>{this.props.libraryImageLoading(true)}} 
  							onPhotoSelect={this.showLibraryImage}   quality={100}>
						  <RkText  rkType='clear link'>CHOOSE PICTURE</RkText>	
 					</PhotoUpload>
							
					</View>
				 <View style={styles.imagesContainer}>
					{this.props.createPost.selectLibraryImage?<Image style = {{width: 300, height: 300}}
					source = {{uri: "data:image/jpeg;base64,"+this.props.createPost.libraryImage}}
					/>:<View/>}
					{this.props.createPost.selectRandomImage?<Image style = {{width: 300, height: 300}}
					source = {{uri: this.props.createPost.randomImage}}
					/>:<View/>}
				 </View>
			</View>        
		);
	}
}
const size= 310;
const styles = RkStyleSheet.create(theme => ({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: "flex-start",
		backgroundColor: '#76c6ff'
	},
	textInput: {
		width: size,
		fontSize: 17,
		backgroundColor: 'white',
		borderWidth: 0,
		borderRadius:  4 
	},
	buttonContainer: {
		flex: 0.2,
		flexWrap: 'wrap',
		flexDirection: 'row',
		width: size,
		height: 40
	},
	imagesContainer: {
		width: size,
		justifyContent: 'center'
	},
	separator: {
	  backgroundColor: theme.colors.border.base,
	  alignSelf: 'center',
	  flexDirection: 'row',
	  flex: 0,
	  width: 1,
	  height: 42
	},
	buttons: {
	  flexDirection: 'row',
	  paddingVertical: 8,
	 
	},
	button: {
	  flex: 1,
	  alignSelf: 'center'
	}
  }));
const mapStateToProps = (state) => {
	return {
		auth:state.auth,
		createPost:state.createPost
	};
}; 

export default connect(mapStateToProps,{setPostContent,libraryImageLoading,setLibraryImage,selectLibraryImage,selectRandomImage})(CreatePostComponent);