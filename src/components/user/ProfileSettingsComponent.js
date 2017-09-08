import React from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  Button,
  Picker,
  ActivityIndicator,
  Slider,
  TextInput
} from 'react-native';
import {
  RkText,
  RkTextInput,
  RkAvoidKeyboard,
  RkTheme,
  RkStyleSheet
} from 'react-native-ui-kitten';
import times from "lodash/times";
import {userSetDetails,uploadUserImage,userSaveDetails} from "../../actions/user";
import {Avatar} from '../../components/avatar';
import {connect} from "react-redux";
import PhotoUpload from "../search/PhotoUploadComponent";

class ProfileSettingsComponent extends React.Component {
  static navigationOptions = {
    title: 'Profile Settings'.toUpperCase()
  };
  constructor(props) {
    super(props);
    this.user = this.props.user;
    this.state = {
      pictureLoading: false,
      saveLoading: false
    }

  }
  changeUserPicture = async (avatar)=>{
    
    await this.props.uploadUserImage(avatar);
    //await this.props.userSetDetails({picture: avatar});
    this.setState({
      pictureLoading: false
    });
  }
  buttonCancel = ()=>{
    this.setState({
      pictureLoading: false
    });
  }
  buttonPress = ()=>{
    this.setState({
      pictureLoading: true
    });
  }
  userSaveDetails = async ()=>{
    if(this.state.saveLoading){
      return;
    }
    this.setState({
      saveLoading: true
    });
    await this.props.userSaveDetails({
      
        anonName: this.props.user.anonName,
        gender: this.props.user.gender,
        age: this.props.user.age,
        status: this.props.user.status,
        interests: this.props.user.interests,
        picture: this.props.user.picture
    });
    this.setState({
      saveLoading: false
    });
  }
  render() {
    const user = this.props.user
    const userPicture = user.picture;
    
    return (
      <ScrollView style={styles.root}>
        <RkAvoidKeyboard>
          <View style={styles.header}>
          <PhotoUpload pickerTitle={"Send Image"} 
          onButtonCancel = {()=>{this.buttonCancel()}}
						onButtonPress =  {()=>{this.buttonPress()}}  
  							onPhotoSelect={this.changeUserPicture}   quality={100}>
                {this.state.pictureLoading?<ActivityIndicator size="large" color="black"/>:
                <Avatar img={userPicture} rkType='big'/>}
 						</PhotoUpload>	
            
          </View>
          <View style={styles.section}>
            <View style={[styles.row, styles.heading]}>
              <RkText rkType='header6 primary'>INFO</RkText>
            </View>
            <View style={styles.row}>
              <RkTextInput label='Anonymous Name'
                           value={user.anonName}
                           rkType='right clear'
                           onChangeText={(text) => this.props.userSetDetails({anonName: text})}/>
            </View>
            
            <View style={styles.row}>
              <RkText style={{flex:1}} rkType='header6  clear'>Gender</RkText>
              <Picker 
                style={{flex:0.5,justifyContent:"flex-end"}}
                selectedValue={user.gender}
                onValueChange={(itemValue, itemIndex) => this.props.userSetDetails({gender: itemValue})}>
                <Picker.Item label="Other" value="Other" />
                <Picker.Item label="Male" value="Male" />
                <Picker.Item label="Female" value="Female" />
                
              </Picker>

            </View>
            
            <View style={styles.row}>
              <RkText style={{flex:1,color:"#4c4c4c"}} rkType='header6  clear'>Age</RkText>
              <TextInput 
              style={{flex:0.2,justifyContent:"flex-end"}}
                keyboardType = 'numeric'
                onChangeText = {(text)=> this.props.userSetDetails({age:text})}
                value = {user.age+""}
                maxLength = {2}  
             />
            </View>

            

          </View>

          <View style={styles.section}>
            <View style={[styles.row, styles.heading]}>
              <RkText rkType='primary header6'>STATUS</RkText>
            </View>
          </View>
          <TextInput
							multiline={true}
							style={[styles.statusTextInput]}
							onChangeText={(text) => this.props.userSetDetails({status: text})}
							value={user.status}
							maxLength = {150}
							
				 	/>
          
          <Button rkType='large' title={this.state.saveLoading?"Loading":"Save"} onPress={()=>{this.userSaveDetails()}} style={styles.button} text='SAVE'/>
        </RkAvoidKeyboard>
      </ScrollView>
    )
  }
}

const mapStateToProps = (state)=>{
  return {
    user: state.user.user
  }
}
export default connect(mapStateToProps,{userSetDetails,uploadUserImage,userSaveDetails})(ProfileSettingsComponent);
let styles = RkStyleSheet.create(theme => ({
  root: {
    backgroundColor: theme.colors.screen.base
  },
  header: {
    backgroundColor: theme.colors.screen.neutral,
    paddingVertical: 20
  },
  section: {
    marginVertical: 20
  },
  statusTextInput:{
    marginHorizontal: 10
  },
  heading: {
    paddingBottom: 12.5
  },
  row: {
    flexDirection: 'row',
    paddingHorizontal: 17.5,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: theme.colors.border.base,
    alignItems: 'center'
  },
  button: {
    marginHorizontal: 16,
    marginBottom: 32
  }
}));