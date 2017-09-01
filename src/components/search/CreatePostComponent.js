import React,{Component} from 'react';
import {View,Text,StyleSheet,TouchableOpacity,TextInput} from 'react-native';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';

class CreatePostComponent extends Component{
	constructor(props){
		super(props);
				this.state = {text:""};
			}
			onContentSizeChange = (event)=>{
				const { contentSize} = event.nativeEvent;
				this.setState({
						height: contentSize.height
				}); 
			}
			onTextChange = (event)=>{
				const {  text } = event.nativeEvent;
				this.setState({
						text: text 
				}); 
			}
	render= ()=>{
		return (
			<View style={styles.container}>
					<Text>{this.state.height}</Text>
					<Text>{this.state.text.length}</Text>
					<TextInput
							multiline={true}
							style={[styles.textInput, {height: Math.max(35, this.state.height)}]}
							onChange={this.onTextChange}
							value={this.state.text}
							maxLength = {300}
							onContentSizeChange = {this.onContentSizeChange}
				 />
			</View>        
		);
	}
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: "flex-start",
		backgroundColor: '#76c6ff'
	},
	textInput: {
		width: 300,
		fontSize: 17,
		backgroundColor: 'white',
		borderWidth: 0,
		borderRadius:  4 
	}
});export default connect(null,{})(CreatePostComponent);