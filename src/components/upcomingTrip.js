import React, { Component } from 'react';
import {
	ImageBackground,
	Text,
	View,
	TouchableOpacity,
	ScrollView
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
// import { getWeather } from '../actions/weatherAction';

import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

class Trip extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentWillMount() {
		// this.props.getWeather('Singapore');
	}

	render() {
		return (
			// <ScrollView
			// 	style={{ flex: 1 }}
			// 	keyboardShouldPersistTaps="always"
			// 	showsVerticalScrollIndicator={false}
			// >
			<ImageBackground
				source={require('../assets/blue.jpg')}
				style={styles.backgroundImage}
			>
				<View style={styles.heading}>
					<Text style={[styles.whiteText, styles.bigText]}>
						Tokyo
					</Text>
					<Text style={styles.whiteText}>
						22 Sept 2017-22 Sept 2017
					</Text>
					<Text style={[styles.whiteText, { fontSize: 11 }]}>
						Booking reference ANDPQ
					</Text>
				</View>
				<View style={styles.flyingDetailsContainer}>
					<View style={styles.horizontalBox}>
						<View style={styles.sourceContainer}>
							<Text style={[styles.whiteText, { fontSize: 20 }]}>
								SQ631 · Gate 2
							</Text>
						</View>
						<View
							style={[
								styles.destinationContainer,
								{ justifyContent: 'center' }
							]}
						>
							<Text style={styles.whiteText}>Airline A330</Text>
						</View>
					</View>
					<View style={styles.horizontalBox}>
						<View style={styles.sourceContainer}>
							<Text style={[styles.whiteText, styles.bigText]}>
								Singapore
							</Text>
							<Text style={styles.whiteText}>
								Singapore airport
							</Text>
							<Text style={styles.whiteText}>Terminal 2</Text>
						</View>
						<View style={styles.destinationContainer}>
							<Text style={[styles.whiteText, styles.bigText]}>
								Tokyo
							</Text>
							<Text style={styles.whiteText}>
								Tokyo International airport
							</Text>
							<Text style={styles.whiteText}>Terminal 2</Text>
						</View>
					</View>
					<View style={styles.horizontalBox}>
						<View style={styles.sourceContainer}>
							<Text style={styles.whiteText}>
								Fri, September 2, 2017
							</Text>
							<Text style={styles.whiteText}>Scheduled</Text>
							<Text style={[styles.whiteText, styles.bigText]}>
								08:00
							</Text>
						</View>
						<View style={styles.destinationContainer}>
							<Text style={styles.whiteText}>
								Fri, September 2, 2017
							</Text>
							<Text style={styles.whiteText}>Scheduled</Text>
							<Text style={[styles.whiteText, styles.bigText]}>
								18:00
							</Text>
						</View>
					</View>
					<View style={{ paddingTop: height / 50 }}>
						<TouchableOpacity
							onPress={() => {}}
							style={[styles.horizontalBox, styles.functions]}
						>
							<Text style={[styles.whiteText, { fontSize: 17 }]}>
								Check in
							</Text>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() => {}}
							style={[styles.horizontalBox, styles.functions]}
						>
							<Text style={[styles.whiteText, { fontSize: 17 }]}>
								Get a ride
							</Text>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() => {}}
							style={[styles.horizontalBox, styles.functions]}
						>
							<Text style={[styles.whiteText, { fontSize: 17 }]}>
								Currency
							</Text>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() => {}}
							style={[styles.horizontalBox, styles.functions]}
						>
							<Text style={[styles.whiteText, { fontSize: 17 }]}>
								Weather Conditions
							</Text>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() => {}}
							style={[styles.horizontalBox, styles.functions]}
						>
							<Text style={[styles.whiteText, { fontSize: 17 }]}>
								e-Library
							</Text>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() => {}}
							style={[styles.horizontalBox, styles.functions]}
						>
							<Text style={[styles.whiteText, { fontSize: 17 }]}>
								Places of Interest
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			</ImageBackground>
			// </ScrollView>
		);
	}
}

function matchDispatchToProps(dispatch) {
	return bindActionCreators(
		{
			// getWeather: getWeather
		},
		dispatch
	);
}

const mapStateToProps = state => ({
	// weather: state.weather
});

const styles = StyleSheet.create({
	backgroundImage: {
		flex: 1,
		paddingTop: height / 10,
		width: null,
		resizeMode: 'stretch',
		height: null
	},
	heading: {
		marginHorizontal: width / 50,
		marginBottom: height / 100
	},
	flyingDetailsContainer: {
		marginHorizontal: width / 50
	},
	horizontalBox: {
		backgroundColor: 'rgba(0,0,0,0.2)',
		paddingHorizontal: width / 50,
		flexDirection: 'row',
		marginBottom: 2
	},
	sourceContainer: {
		flex: 1
	},
	destinationContainer: {
		flex: 1,
		alignItems: 'flex-end'
	},
	bigText: {
		fontSize: 25
	},
	whiteText: {
		color: 'white'
	},
	functions: {
		justifyContent: 'center',
		alignItems: 'center',
		paddingVertical: 5
	}
});

export default connect(mapStateToProps, matchDispatchToProps)(Trip);
