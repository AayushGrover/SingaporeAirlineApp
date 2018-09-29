import React, { Component } from 'react';
import { Image, Text, View } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { getPOI } from '../actions/poiAction';

class PlacesOfInterest extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentWillMount() {
		this.props.getPOI('Singapore');
	}

	render() {
		return (
			<View>
				<Text>{this.props.poi.poi.html_attributions}</Text>
			</View>
		);
	}
}

function matchDispatchToProps(dispatch) {
	return bindActionCreators(
		{
			getPOI: getPOI
		},
		dispatch
	);
}

const mapStateToProps = state => ({
	poi: state.poi
});

export default connect(mapStateToProps, matchDispatchToProps)(PlacesOfInterest);
