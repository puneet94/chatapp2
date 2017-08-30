import React,{PureComponent} from "react";
import {
	RkText
} from "react-native-ui-kitten";
import {getLocation} from "../../services/common";
import {connect} from "react-redux";
class DistanceValue extends PureComponent{
    constructor(props){
        super(props);
        this.state = {
            distance: "N.A"
            
        }
    }
    deg2rad = (deg) => {
        return deg * (Math.PI / 180);
    }
    getDistance = (geoPosition, position) => {
        
        if (position && geoPosition) {
            const latitude = geoPosition[1];
            const longitude = geoPosition[0];
            const lat2 = position.coords.latitude;
            const lon2 = position.coords.longitude;
            const R = 6371;
            var dLat = this.deg2rad(lat2 - latitude);
            var dLon = this.deg2rad(lon2 - longitude);
            var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(this.deg2rad(latitude)) * Math.cos(this.deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            var distance = R * c;
            return Math.floor(distance) + " mi";
        }
    }
    componentWillMount = async ()=>{
        if(!this.props.location || this.props.location_error){
            try{
                let location = await getLocation();
                const distance = this.getDistance(this.props.loc,location);
                this.setState({
                    distance: distance
                });
            }catch(e){
                console.log(e);
            }
        }else{
            const distance2 = this.getDistance(this.props.loc,this.props.location);
            this.setState({
                distance: distance2
            });
        }
    }
    render = ()=>{
        return (
            <RkText rkType="primary4 hintColor" style={this.props.label}>{this.state.distance}</RkText>
        );
    }
}
const mapStateToProps = (state)=>{
    return {
        location: state.user.location,
		location_error: state.user.user_location_error
    }
}
export default connect(mapStateToProps,null)(DistanceValue);
