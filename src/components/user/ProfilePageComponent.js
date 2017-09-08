import React,{Component} from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity
} from 'react-native';
import {
  RkText,
  RkButton, RkStyleSheet
} from 'react-native-ui-kitten';
import {Avatar} from '../../components/avatar';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {connect} from "react-redux";
import formatNumber from '../../utils/textUtils';
import {Actions} from "react-native-router-flux";
import {logout} from "../../actions/auth";
import UserPostsComponent from "../../components/posts/UserPostsComponent";
export class ProfilePageComponent extends Component {
  constructor(props) {
    super(props);
  }
  render() {
	const user = this.props.user;
    return (
      <View>
        <View style={{height:50,backgroundColor:"blue",flexDirection:"row",justifyContent:"space-around",alignItems:"center"}}>
          <View style={{flex:1}}>
            <Text style={{color:"white",fontSize:22,paddingLeft:10}}>{user.anonName}</Text>
          </View>
          <TouchableOpacity style={{flex:1,alignItems:"flex-end",paddingRight:10}} onPress={()=>Actions.profilesettings()}>
            <Ionicons name="md-settings" size={28} color="white"/>
          </TouchableOpacity>
        </View>
      <ScrollView style={styles.root} >
        <View style={[styles.header, styles.bordered]}>
          <Avatar img={user.picture} rkType='big'/>
          <RkText rkType='header5'>{user.status}</RkText>
        </View>
        <View style={[styles.userInfo, styles.bordered]}>
          <View style={styles.section}>
            <RkText rkType='header3' style={styles.space}>{user.posts.length}</RkText>
            <RkText rkType='secondary1 hintColor'>Posts</RkText>
          </View>
          <View style={styles.section}>
            <RkText rkType='header3' style={styles.space}>{formatNumber(user.followers.length)}</RkText>
            <RkText rkType='secondary1 hintColor'>Followers</RkText>
          </View>
          <View style={styles.section}>
            <RkText rkType='header3' style={styles.space}>{user.following.length}</RkText>
            <RkText rkType='secondary1 hintColor'>Following</RkText>
          </View>
        </View>
        <UserPostsComponent userId = {user._id}></UserPostsComponent>
      </ScrollView>
      </View>
    )
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
        user: state.user.user
    }
};
 export default connect(mapStateToProps,{logout})(ProfilePageComponent);