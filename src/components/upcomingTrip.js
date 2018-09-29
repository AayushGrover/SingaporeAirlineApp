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
import { getPNR } from '../actions/pnrAction';
import { c2cd } from '../assets/codeToCountry';

import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

class Trip extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentWillMount() {
		this.props.getPNR('JWRKQC', 'Greig');
	}

	getTime(time) {
		// Create a new JavaScript Date object based on the timestamp
		// multiplied by 1000 so that the argument is in milliseconds, not seconds.
		var date = new Date(time);
		// Hours part from the timestamp
		var hours = date.getHours();
		// Minutes part from the timestamp
		var minutes = '0' + date.getMinutes();
		// Seconds part from the timestamp
		var seconds = '0' + date.getSeconds();

		// Will display time in 10:30:23 format
		var formattedTime = hours + ':' + minutes.substr(-2);
		return formattedTime;
	}

	getFullDate(date) {
		var event = new Date(date);
		return event.toDateString();
	}

	render() {
		return (
			<ImageBackground
				source={require('../assets/blue.jpg')}
				style={styles.backgroundImage}
			>
				<View style={styles.heading}>
					<Text style={[styles.whiteText, styles.bigText]}>
						{
							c2cd[
								this.props.pnr.flights[0].flightSegment[0]
									.destination.countryCode
							]
						}
					</Text>
					<Text style={styles.whiteText}>
						{this.getFullDate(
							this.props.pnr.flights[0].flightSegment[0]
								.estimatedDepartureTime
						)}{' '}
						-{' '}
						{this.getFullDate(
							this.props.pnr.flights[0].flightSegment[0]
								.estimatedArrivalTime
						)}
					</Text>
					<Text style={[styles.whiteText, { fontSize: 11 }]}>
						Booking reference {this.props.pnr.bookingReference}
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
								{
									c2cd[
										this.props.pnr.flights[0]
											.flightSegment[0].origin.countryCode
									]
								}
							</Text>
							<Text style={styles.whiteText}>
								{
									this.props.pnr.flights[0].flightSegment[0]
										.origin.airportName
								}
							</Text>
							<Text style={styles.whiteText}>
								Terminal{' '}
								{
									this.props.pnr.flights[0].flightSegment[0]
										.origin.terminalNumber
								}
							</Text>
						</View>
						<View style={styles.destinationContainer}>
							<Text style={[styles.whiteText, styles.bigText]}>
								{
									c2cd[
										this.props.pnr.flights[0]
											.flightSegment[0].destination
											.countryCode
									]
								}
							</Text>
							<Text style={styles.whiteText}>
								{
									this.props.pnr.flights[0].flightSegment[0]
										.destination.airportName
								}
							</Text>
							<Text style={styles.whiteText}>
								Terminal{' '}
								{
									this.props.pnr.flights[0].flightSegment[0]
										.destination.terminalNumber
								}
							</Text>
						</View>
					</View>
					<View style={styles.horizontalBox}>
						<View style={styles.sourceContainer}>
							<Text style={styles.whiteText}>
								{this.getFullDate(
									this.props.pnr.flights[0].flightSegment[0]
										.estimatedDepartureTime
								)}
							</Text>
							<Text style={styles.whiteText}>Scheduled</Text>
							<Text style={[styles.whiteText, styles.bigText]}>
								{this.getTime(
									this.props.pnr.flights[0].flightSegment[0]
										.estimatedDepartureTime
								)}
							</Text>
						</View>
						<View style={styles.destinationContainer}>
							<Text style={styles.whiteText}>
								{this.getFullDate(
									this.props.pnr.flights[0].flightSegment[0]
										.estimatedArrivalTime
								)}
							</Text>
							<Text style={styles.whiteText}>Scheduled</Text>
							<Text style={[styles.whiteText, styles.bigText]}>
								{this.getTime(
									this.props.pnr.flights[0].flightSegment[0]
										.estimatedArrivalTime
								)}
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
							onPress={() => {
								Actions.currency();
							}}
							style={[styles.horizontalBox, styles.functions]}
						>
							<Text style={[styles.whiteText, { fontSize: 17 }]}>
								Currency
							</Text>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() => {
								Actions.weather();
							}}
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
							onPress={() => {
								Actions.placesOfInterest();
							}}
							style={[styles.horizontalBox, styles.functions]}
						>
							<Text style={[styles.whiteText, { fontSize: 17 }]}>
								Places of Interest
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			</ImageBackground>
		);
	}
}

function matchDispatchToProps(dispatch) {
	return bindActionCreators(
		{
			getPNR: getPNR
		},
		dispatch
	);
}

const mapStateToProps = state => ({
	pnr: state.pnr.pnr.responseBody
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
