import React,{Component} from 'react';
import {Actions} from "react-native-router-flux";
import {View,Text,Image,Button,TextInput,Keyboard,ScrollView} from 'react-native'
import {connect} from "react-redux";
import {submitPost,setPostLocation,setPostInterests} from "../../actions/createPost";
import {RkCard, RkText, RkStyleSheet,RkAvoidKeyboard} from "react-native-ui-kitten";
class SubmitPostComponent extends Component{
    constructor(props){
        super(props);
        this.state = {
            height: 0
        }
    }
    static navigationOptions = ({navigation}) => {
		let renderPreview = () => {
		  return (
			<Button onPress={() => navigation.state.params.submitPost()} title="SUBMIT"/>
		  );
		};
		let renderTitle = () => {
		  return (
				<RkText rkType='header5'>{"Submit Post"}</RkText>
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
    onTextChange = (event)=>{
        const {  text } = event.nativeEvent;
        this.props.setPostInterests(text);
    }
    onContentSizeChange = (event)=>{
        const { contentSize} = event.nativeEvent;
        this.setState({
                height: contentSize.height
        }); 
    }
    submitPost = ()=>{
        this.props.submitPost(this.props.createPost);
        Actions.tabs();
    }
    render=()=>{
        const post = this.props.createPost;
        return (
            <ScrollView style={styles.root}>           
                <RkCard rkType='backImg'>
		            <Image
                        rkCardImg
                        source={{uri: post.image || "https://pimg.tradeindia.com/00043756/b/0/Plain-Dupion-Silk-Fabric.jpg"}}
                    />
                    <View rkCardImgOverlay rkCardContent style={styles.overlay}>
                        <RkText rkType='header2 inverseColor blackShadow'
                            numberOfLines={2}
                            style={{
                                textShadowColor: "black",
                                textShadowOffset: {
                                    width: 2,
                                    height: 2
                                },
                                textShadowRadius: 3}}
                        >
                            {post.content}
                        </RkText>
                    </View>
                </RkCard>
            <RkAvoidKeyboard style={{flex:1}} onResponderRelease={(event) => {
				Keyboard.dismiss();
			  }}>
                <View style={{marginVertical:10}}>
                <Text>{"Add tags to your post. Makes it easy to search"}</Text>
                </View>
                <TextInput
                            placeholder = "#football #busy-work"
							multiline={true}
							style={[styles.textInput, {height: Math.max(35, this.state.height)}]}
							onChange={this.onTextChange}
							value={this.props.createPost.interests}
							maxLength = {30}
							onContentSizeChange = {this.onContentSizeChange}
							underlineColorAndroid = 'transparent'
				 	/>
                     <Button title="Submit" onPress={()=>this.submitPost()}/>
                </RkAvoidKeyboard>
                
            </ScrollView>
        );
    }
    componentWillMount = ()=>{
        this.props.navigation.setParams({
			submitPost: this.submitPost
		});
        try{
            if(!this.props.location_error){
                const location = {
                    latitude: this.props.location.coords.latitude,
                    longitude: this.props.location.coords.longitude
                }
                this.props.setPostLocation(location);
            }
        }
        catch(e){
            console.log("erorr");
        }
    }
}
const styles = RkStyleSheet.create(theme => ({
    root: {
        backgroundColor: theme.colors.screen.base,
        padding: 20
    },
    textInput: {
		fontSize: 17,
		backgroundColor: 'white',
		borderWidth: 0.6,
        borderRadius: 4, 
        borderColor: "black",
        marginBottom: 10
	},
    overlay: {
        justifyContent: 'flex-end'
    }
}));

const mapStateToProps = (state)=>{
    return {
        createPost: state.createPost,
        location: state.user.location,
		location_error: state.user.user_location_error
    };
};
export default connect(mapStateToProps,{submitPost,setPostLocation,setPostInterests})(SubmitPostComponent);