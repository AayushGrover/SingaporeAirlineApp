import React, { Component } from 'react';
import { Image, Text, View } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { getWeather } from '../actions/weatherAction';

class Weather extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentWillMount() {
		this.props.getWeather('Singapore');
	}

	render() {
		return (
			<View>
				<Text>{this.props.weather.weather.main.temp}</Text>
			</View>
		);
	}
}

function matchDispatchToProps(dispatch) {
	return bindActionCreators(
		{
			getWeather: getWeather
		},
		dispatch
	);
}

const mapStateToProps = state => ({
	weather: state.weather
});

export default connect(mapStateToProps, matchDispatchToProps)(Weather);
