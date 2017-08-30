import React,{Component} from 'react';
import {
  View,
  ScrollView,
} from 'react-native';
import {
  RkText,
  RkButton, RkStyleSheet
} from 'react-native-ui-kitten';
import {Avatar} from '../../components/avatar';
import {connect} from "react-redux";
import formatNumber from '../../utils/textUtils';
import {Actions} from "react-native-router-flux";
import {logout} from "../../actions/auth";
import UserPostsComponent from "../../components/posts/UserPostsComponent";
export class ProfilePageComponent extends Component {
  static navigationOptions = {
    title: 'ME'
  };

  constructor(props) {
    super(props);
    //let {params} = this.props.navigation.state;
    //let id = params ? params.id : 1;
    //this.user = data.getUser(id);
  }

  render() {
    //let name = `${this.user.firstName} ${this.user.lastName}`;
	//let images = this.user.images.map((image) => image.id);
	const user = this.props.user;
    return (
      <ScrollView style={styles.root}>
        <View style={[styles.header, styles.bordered]}>
          <Avatar img={user.picture} rkType='big'/>
          <RkText rkType='header2'>{user.anonName}</RkText>
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