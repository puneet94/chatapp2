import React,{Component} from "react";
import { StyleSheet, Text, View,BackHandler } from "react-native";
import { Provider } from "react-redux";
import {bootstrap} from "./src/config/bootstrap.js";
import { Router,Scene,ActionConst} from "react-native-router-flux";

import store from "./src/store.js";
import TabsComponent from "./src/components/TabsComponent.js";
import ChatComponent from "./src/components/chats/ChatComponent.js";
import OtherProfileComponent from "./src/components/people/OtherProfileComponent.js";
import AuthComponent from "./src/components/AuthComponent.js";

import GroupChatBoxComponent from "./src/components/chats/GroupChatBoxComponent.js";
import ChatBoxComponent from "./src/components/chats/ChatBoxComponent.js";


import SearchPostsComponent from "./src/components/search/SearchPostsComponent.js";
import SearchProfileComponent from "./src/components/search/SearchProfileComponent.js";


import CreatePostComponent from "./src/components/search/CreatePostComponent.js";
import SubmitPostComponent from "./src/components/search/SubmitPostComponent.js";



import LogoComponent from "./src/components/LogoComponent.js";

import PostPageComponent from "./src/components/posts/PostPageComponent.js";
bootstrap();
export default class App extends Component {
	
	render=()=>{
		return (
			<Provider store={store}>
				<Router style={styles.container}>
					<Scene key="root" >
						<Scene key="logo" component={LogoComponent} hideNavBar ={true} />
						<Scene key="auth" component={AuthComponent} hideNavBar ={true} />
						<Scene key="tabs" component={TabsComponent} hideNavBar ={true}  type={ActionConst.RESET} />
						<Scene key="profile" component={OtherProfileComponent} />
						<Scene key="searchpost" component={SearchPostsComponent} />
						<Scene key="searchprofile" component={SearchProfileComponent} />
						<Scene key="createpost" component={CreatePostComponent} />
						<Scene key="submitpost" component={SubmitPostComponent} />
						<Scene key="allchat" component={ChatBoxComponent}  hideNavBar ={true}/>
						<Scene key="singlePostPage" component={PostPageComponent}   />
					</Scene>
				</Router>
			</Provider>
		);
	}
}

const styles = StyleSheet.create({
	header:{
		marginTop: 10
	},
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		
	},
});
