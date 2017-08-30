import React from "react";
import {
	Image,
	View
} from "react-native";
import {
	RkComponent,
	RkText,
	RkTheme
} from "react-native-ui-kitten";


export class Avatar extends RkComponent {
	componentName = "Avatar";
	typeMapping = {
		container: {},
		image: {}
	};

	constructor(props) {
		super(props);
	}

	renderImg(styles) {
		let {image} = styles;
		return (
			<View>
				<Image style={image} source={{uri:this.props.img}}/>
			</View>
		);
	}

		render() {
		let {container, ...other} = this.defineStyles();
		return (
			<View style={[container, this.props.style]}>
				{this.renderImg(other)}
			</View>
		)
	}
}
