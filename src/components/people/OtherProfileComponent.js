import React,{Component} from 'react';
import {
  View,
  ScrollView,Text
} from 'react-native';
import {
  RkText,
  RkButton, RkStyleSheet
} from 'react-native-ui-kitten';
import {Avatar} from '../../components/avatar';
import formatNumber from '../../utils/textUtils';
import {Actions} from "react-native-router-flux";
import {connect} from "react-redux";
import UserPostsComponent from "../../components/posts/UserPostsComponent";
import {getOtherUserDetails,submitUserFollow,deleteUserFollow,removeUserDetails} from "../../actions/user";
class OtherProfileComponent extends Component {
  openChatBox = (userId)=>{
    Actions.allchat({userId});
  }
  constructor(props) {
    super(props);
    
  }
  static navigationOptions = {
    title: 'Profile'
  };
  componentWillMount = ()=>{

	this.props.getOtherUserDetails(this.props.userId);
  }
  checkFollowing = ()=>{
	  if(this.props.currentUser && this.props.otherUser){
		if(this.props.currentUser.following.indexOf(this.props.otherUser._id)!=-1){
			return true;
		}else{
			
			return false;
		}
	  }
  }
  submitUserFollow = ()=>{
	  
	  this.props.submitUserFollow(this.props.otherUser._id);
  }
  deleteUserFollow = ()=>{
	
	this.props.deleteUserFollow(this.props.otherUser._id);
}
  componentWillUnmount=()=>{
	this.props.removeUserDetails();
  }
  render() {
	  
	this.otherUser = this.props.otherUser;
	if(this.props.otherUser){
    return (
      <ScrollView style={styles.root}>
        <View style={[styles.header, styles.bordered]}>
          <Avatar img={this.otherUser.picture} rkType='big'/>
          <RkText rkType='header2'>{this.otherUser.anonName}</RkText>
        </View>
        <View style={[styles.header, styles.bordered]}>
          <RkText rkType='header5'>{this.otherUser.status}</RkText>
        </View>
        <View style={[styles.userInfo, styles.bordered]}>
          <View style={styles.section}>
            <RkText rkType='header3' style={styles.space}>{this.otherUser.posts.length}</RkText>
            <RkText rkType='secondary1 hintColor'>Posts</RkText>
          </View>
          <View style={styles.section}>
            <RkText rkType='header3' style={styles.space}>{this.otherUser.followers.length}</RkText>
            <RkText rkType='secondary1 hintColor'>Followers</RkText>
          </View>
          <View style={styles.section}>
            <RkText rkType='header3' style={styles.space}>{this.otherUser.following.length}</RkText>
            <RkText rkType='secondary1 hintColor'>Following</RkText>
          </View>
        </View>
        <View style={styles.buttons}>
			{!this.checkFollowing()?<RkButton style={styles.button} onPress={this.submitUserFollow} rkType='clear link'>FOLLOW</RkButton>:<RkButton style={styles.button} onPress={this.deleteUserFollow} rkType='clear link'>FOLLOWED</RkButton>}
          <View style={styles.separator}/>
          <RkButton style={styles.button} onPress={()=>this.openChatBox(this.otherUser._id)} rkType='clear link'>MESSAGE</RkButton>
        </View>
        <UserPostsComponent userId = {this.otherUser._id}></UserPostsComponent>
      </ScrollView>
    );}else{
		return (<View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
        <Text style={{fontSize:20,fontWeight:"600"}}>{"Loading"}</Text>
      </View>);
	}
  }
}

let styles = RkStyleSheet.create(theme => ({
  root: {
    backgroundColor: theme.colors.screen.base
  },
  header: {
    alignItems: 'center',
    paddingTop: 25,
    paddingBottom: 17
  },
  userInfo: {
    flexDirection: 'row',
    paddingVertical: 18,
  },
  bordered: {
    borderBottomWidth: 1,
    borderColor: theme.colors.border.base
  },
  section: {
    flex: 1,
    alignItems: 'center'
  },
  space: {
    marginBottom: 3
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
const mapStateToProps = (state)=>{
	return {
		otherUser: state.user.otherUser,
		currentUser: state.user.user
	};
}
export default connect(mapStateToProps,{getOtherUserDetails,submitUserFollow,deleteUserFollow,removeUserDetails})(OtherProfileComponent);