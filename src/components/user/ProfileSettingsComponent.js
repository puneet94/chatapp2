import React from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  TouchableOpacity,
  Picker,
  ActivityIndicator,
  Slider,
  TextInput,
  Alert
} from 'react-native';
import {
  RkText,
  RkTextInput,
  RkAvoidKeyboard,
  RkTheme,
  RkStyleSheet
} from 'react-native-ui-kitten';
import {userSetDetails,uploadUserImage,userSaveDetails} from "../../actions/user";
import {Avatar} from '../../components/avatar';
import {connect} from "react-redux";
import PhotoUpload from "../search/PhotoUploadComponent";

class ProfileSettingsComponent extends React.Component {
  static navigationOptions = {
    title: 'Edit Profile'
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
    this.props.userSetDetails({picture: this.props.user.picture})
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
              <RkText style={{flex:0.5,color:"rgb(218,218,218)",fontWeight:'100'}} rkType='header6  clear'>Name</RkText>
                <TextInput 
                style={{flex:1,textAlign: "right",alignSelf:"flex-end",fontWeight:'500',fontSize:18}}
                  onChangeText={(text) => this.props.userSetDetails({anonName: text})}
                  value={user.anonName}
                  underlineColorAndroid = 'transparent'
                  maxLength = {25}  
              />
            </View>
            <View style={styles.row}>
              <RkText style={{flex:1,color:"rgb(218,218,218)",fontWeight:'100'}} rkType='header6  clear'>Age</RkText>
              <TextInput 
              style={{flex:1,textAlign:"right",fontWeight:"500"}}
                keyboardType = 'numeric'
                onChangeText = {(text)=> this.props.userSetDetails({age:text})}
                value = {user.age+""}
                maxLength = {2}  
                underlineColorAndroid = 'transparent'
             />
            </View>
            
            <View style={styles.row}>
              <RkText style={{flex:1,color:"rgb(218,218,218)",fontWeight:'100'}} rkType='header6  clear'>Gender</RkText>
              <Picker 
                style={{flex:0.5,justifyContent:"flex-end",alignSelf:"flex-end",paddingRight:0}}
                selectedValue={user.gender}
                onValueChange={(itemValue, itemIndex) => this.props.userSetDetails({gender: itemValue})}>
                <Picker.Item label="Other" value="Other" />
                <Picker.Item label="Male" value="Male" />
                <Picker.Item label="Female" value="Female" />
              </Picker>
            </View>
            <View style={styles.row}>
              <RkText style={{flex:1,color:"rgb(218,218,218)",fontWeight:'100'}} rkType='header6  clear'>Gossip ID</RkText>
              <TouchableOpacity style={{paddingVertical:12,flex:1}} onPress={()=>{Alert.alert(
					'Gossip ID',
          'This ID is unique and cannot be changed. Send it to your friends and start chatting on gossip.',
          [
    {text: 'Ok', onPress: () => console.log('Ask me later pressed')}
  ],
					{ cancelable: true }
				  );}}>
              <RkText 
              style={{flex:1,textAlign:"right",fontWeight:"400",fontSize:16,color:'rgb(218,218,218)'}}>
             {user.unique_id}</RkText>
             </TouchableOpacity>
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
    marginHorizontal: 10,
    fontSize: 18,
    fontWeight: '500'
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
    marginBottom: 32,
    backgroundColor: 'rgb(50,25,110)'
  }
}));