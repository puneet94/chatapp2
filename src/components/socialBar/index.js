import React from "react";
import {
	View
} from "react-native";
import {
	RkText,
	RkButton,
	RkComponent
} from "react-native-ui-kitten";

import Entypo from 'react-native-vector-icons/Entypo';
import DistanceValue from "../distance";

export class SocialBar extends RkComponent {
	componentName = "SocialBar";
	typeMapping = {
		container: {},
		section: {},
		icon: {},
		label: {}
	};

	constructor(props) {
		super(props);

		this.likes = this.props.likes;
		
		this.views = this.props.views;
		this.state = {
			likes: this.likes,
			views: this.views
		};
		
	}
	
	render() {
		let {container, section, icon, label} = this.defineStyles();

		let likes = this.state.likes + (this.props.showLabel ? " Likes" : "");
		let views = this.state.views + (this.props.showLabel ? " Shares" : "");
		const iconName = this.props.liked?"heart":"heart-outlined";
		
		return (
			<View style={container}>
				<View style={section}>
					{this.props.updateLikes?<RkButton rkType='clear' onPress={this.props.updateLikes}>
						<RkText rkType="primary" style={icon}><Entypo name={iconName} size={22}  /></RkText>
						<RkText rkType="primary primary4" style={label}>{likes}</RkText>
					</RkButton>:<View style={section}>
						<RkText rkType="primary" style={icon}><Entypo name={iconName} size={22}  key={1}/>
						</RkText>
						<RkText rkType="primary primary4" style={label} key={2}>{likes}</RkText>
					</View>}
				</View>
				<View style={section}>
					<RkText rkType=" hintColor" style={icon}><Entypo style={{textShadowColor: "black",textShadowOffset: {width: 2, height: 2},textShadowRadius: 3}} name="eye" size={22} /></RkText>
					<RkText rkType="primary4 hintColor" style={label}>{views}</RkText>
				</View>
				
				<View style={section}>
					<RkText rkType="hintColor" style={icon}><Entypo name="location-pin" size={22}  /></RkText>
					<DistanceValue loc={this.props.loc} label={label}/>
				</View>
				
			</View>
		);
	}
}