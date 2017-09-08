import React,{Component} from 'react';
import {View,Text,ScrollView,TextInput,ActivityIndicator, Button, Dimensions, Image, Keyboard} from 'react-native';
import PhotoUpload from './PhotoUploadComponent';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import {setPostContent,createPostImage,libraryImageLoading,selectLibraryImage,setLibraryImage,selectRandomImage} from '../../actions/createPost';
import {
	RkText,
	RkButton, RkStyleSheet
  } from 'react-native-ui-kitten';
const windowSize = Dimensions.get('window');
class CreatePostComponent extends Component{
	constructor(props){
		super(props);
		this.state = {
			showGallery	: false,
			showLibraryImage: false,
			height: 50,
			choosePicture: "CHOOSE PICTURE",
			pageLoading: false
		};
	}

	static navigationOptions = ({navigation}) => {
		let renderPreview = () => {
		  return (
			<Button onPress={() => navigation.state.params.openSubmitPage()} title="PREVIEW"/>
		  );
		};
		let renderTitle = () => {
		  return (
				<RkText rkType='header5'>{"Create Post"}</RkText>
		  )
		};	
		let rightButton = renderPreview();
		let title = renderTitle();
		return (
		  {
			headerTitle: title,
			headerRight: rightButton
		  });
	};
	componentWillMount = ()=>{
		this.props.navigation.setParams({
			openSubmitPage: this.openSubmitPage
		});
	}
	onContentSizeChange = (event)=>{
			const { contentSize} = event.nativeEvent;
			this.setState({
					height: contentSize.height
			}); 
	}
	openSubmitPage =  async ()=>{
		this.setState({
			pageLoading:true
		});
		if(this.props.createPost.selectLibraryImage || this.props.createPost.selectRandomImage){
			await this.props.createPostImage(this.props.createPost);
		}
		this.setState({
			pageLoading:false
		});
		Actions.submitpost();		
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
	buttonCancel = ()=>{
		this.props.libraryImageLoading(false)
	}
	buttonPress = ()=>{
		this.props.libraryImageLoading(true);
	}

	showLibraryImage = (avatar) => {
		
		if (avatar) {

		
			this.setState({showGallery: false, showLibraryImage: true, libraryImage: avatar});
			this.props.setLibraryImage(avatar);
			this.props.selectLibraryImage(true);
			this.props.selectRandomImage(false);
			this.props.libraryImageLoading(false);
		}
	}
	render= ()=>{
		if(this.state.pageLoading){
			return (
				<View style={styles.container}>	
					<ActivityIndicator size="large" color="black"/>
				</View>
			);
		}
		return (
			<ScrollView contentContainerStyle={styles.container}>
				<View style={styles.textInputContainer}>
					<Text>{300-this.props.createPost.content.length}</Text>
					<TextInput
							autoFocus={true}
							multiline={true}
							style={[styles.textInput, {height: Math.max(50, this.state.height)}]}
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
						onButtonCancel = {()=>{this.buttonCancel()}}
						onButtonPress =  {()=>{this.buttonPress()}} 
  							onPhotoSelect={this.showLibraryImage}   quality={100}>
						  <RkText  rkType='clear link'>{this.props.createPost.libraryImageLoading?"LOADING...":"CHOOSE PICTURES"}</RkText>	
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
			</ScrollView>        
		);
	}
}
const size= 310;
const styles = RkStyleSheet.create(theme => ({
	container: {		
		height: windowSize.height+100,
		backgroundColor: '#76c6ff',
		justifyContent: "flex-start",
		alignItems: "center",		
	},
	textInput: {
		width: size,
		fontSize: 24,
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

export default connect(mapStateToProps,{setPostContent,createPostImage,libraryImageLoading,setLibraryImage,selectLibraryImage,selectRandomImage})(CreatePostComponent);