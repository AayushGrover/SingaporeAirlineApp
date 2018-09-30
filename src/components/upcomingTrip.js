import React, { Component } from 'react';
import {
	ImageBackground,
	Text,
	View,
	TouchableOpacity,
	ScrollView,
	Modal
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { getPNR } from '../actions/pnrAction';
import { c2cd } from '../assets/codeToCountry';
import StepIndicator from 'react-native-step-indicator';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SendSMS from 'react-native-sms';
import { getLocation } from '../actions/locationAction';
var haversine = require('haversine-distance');

import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

const data = [
	{
		title: 'Reach airport'
	},
	{
		title: 'Take off'
	},
	{
		title: 'Landed'
	},
	{
		title: 'Left airport'
	}
];

const stepIndicatorStyles = {
	stepIndicatorSize: 30,
	currentStepIndicatorSize: 40,
	separatorStrokeWidth: 3,
	currentStepStrokeWidth: 5,
	stepStrokeCurrentColor: '#fe7013',
	separatorFinishedColor: '#fe7013',
	separatorUnFinishedColor: '#aaaaaa',
	stepIndicatorFinishedColor: '#fe7013',
	stepIndicatorUnFinishedColor: '#aaaaaa',
	stepIndicatorCurrentColor: '#ffffff',
	stepIndicatorLabelFontSize: 15,
	currentStepIndicatorLabelFontSize: 15,
	stepIndicatorLabelCurrentColor: '#000000',
	stepIndicatorLabelFinishedColor: '#ffffff',
	stepIndicatorLabelUnFinishedColor: 'rgba(255,255,255,0.5)',
	labelColor: '#666666',
	labelSize: 15,
	currentStepLabelColor: '#fe7013'
};

class Trip extends Component {
	constructor(props) {
		super(props);
		this.state = {
			visible: false,
			currentPage: -1
		};
	}

	componentWillMount() {
		this.props.getPNR('JWRKQC', 'Greig').then(() => {
			// fetch(
			// 	'http://iatacodes.org/api/v6/airports?api_key=f99593f5-aa24-4531-ac15-cb3eee8b6b10&code=' +
			// 		this.props.pnr.flights[0].origin.airportCode,
			// 	{
			// 		headers: {
			// 			Accept: 'application/json',
			// 			'Content-Type': 'application/json'
			// 		}
			// 	}
			// )
			// 	.then(data => {
			// 		return data.json();
			// 	})
			// 	.then(data => {
			// 		this.props.getLocation().then(() => {
			// 			if (
			// 				haversine(this.props.location, {
			// 					lat: data.response.lat,
			// 					lng: data.response.lng
			// 				}) < 500
			// 			) {
			// 				this.setState({ currentPage: 0 });
			// 			}
			// 		});
			// 	})
			// 	.catch(error => {
			// 		console.log(error);
			// 	});
			// fetch(
			// 	'http://iatacodes.org/api/v6/airports?api_key=f99593f5-aa24-4531-ac15-cb3eee8b6b10&code=' +
			// 		this.props.pnr.flights[0].destination.airportCode,
			// 	{
			// 		headers: {
			// 			Accept: 'application/json',
			// 			'Content-Type': 'application/json'
			// 		}
			// 	}
			// )
			// 	.then(data => {
			// 		return data.json();
			// 	})
			// 	.then(data => {
			// 		this.props.getLocation().then(() => {
			// 			if (
			// 				haversine(this.props.location, {
			// 					lat: data.response.lat,
			// 					lng: data.response.lng
			// 				}) < 500
			// 			) {
			// 				this.setState({ currentPage: 3 });
			// 			}
			// 		});
			// 	})
			// 	.catch(error => {
			// 		console.log(error);
			// 	});
			// if (
			// 	this.props.pnr.flights[0].flightSegment[0]
			// 		.scheduledDepartureTime -
			// 		new Date() ===
			// 	0
			// ) {
			// 	this.setState({ currentPage: 1 });
			// }
			// if (
			// 	this.props.pnr.flights[0].flightSegment[0]
			// 		.scheduledArrivalTime -
			// 		new Date() ===
			// 	0
			// ) {
			// 	this.setState({ currentPage: 2 });
			// }
		});
	}

	setVisible(bool) {
		this.setState({ visible: bool });
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
		if (this.props.pnr.pnr_loading) {
			return <ActivityIndicator size="large" color="blue" />;
		}
		pnr = this.props.pnr.responseBody;
		return (
			<ImageBackground
				source={require('../assets/blue.jpg')}
				style={styles.backgroundImage}
			>
				<View style={styles.heading}>
					<TouchableOpacity
						style={{
							alignItems: 'flex-end',
							justifyContent: 'flex-start',
							paddingTop: height / 30,
							paddingRight: width / 20
						}}
						onPress={() => {
							this.setVisible(true);
						}}
					>
						<Icon name="notifications" size={30} color="white" />
					</TouchableOpacity>
					<Text style={[styles.whiteText, styles.bigText]}>
						{
							c2cd[
								pnr.flights[0].flightSegment[0].destination
									.countryCode
							]
						}
					</Text>
					<Text style={styles.whiteText}>
						{this.getFullDate(
							pnr.flights[0].flightSegment[0]
								.estimatedDepartureTime
						)}{' '}
						-{' '}
						{this.getFullDate(
							pnr.flights[0].flightSegment[0].estimatedArrivalTime
						)}
					</Text>
					<Text style={[styles.whiteText, { fontSize: 11 }]}>
						Booking reference {pnr.bookingReference}
					</Text>
					<Modal
						animationType="slide"
						transparent={false}
						visible={this.state.visible}
						onRequestClose={() => {
							alert('Modal has been closed.');
						}}
					>
						<View
							style={{
								flex: 1,
								flexDirection: 'row',
								justifyContent: 'space-between',
								backgroundColor: '#ffffff'
							}}
						>
							<View style={styles.stepIndicator}>
								<StepIndicator
									customStyles={stepIndicatorStyles}
									stepCount={data.length}
									direction="vertical"
									currentPosition={this.state.currentPage}
									labels={data.map(item => item.title)}
									onPress={index => {
										this.setState({
											currentPage: index
										});
										SendSMS.send(
											{
												body:
													data[index].title +
													' -> complete!',
												recipients: ['+91-8861494421'],
												successTypes: [
													'sent',
													'queued'
												],
												allowAndroidSendWithoutReadPermission: true
											},
											(completed, cancelled, error) => {
												console.log(
													'SMS Callback: completed: ' +
														completed +
														' cancelled: ' +
														cancelled +
														'error: ' +
														error
												);
											}
										);
									}}
								/>
							</View>

							<TouchableOpacity
								style={{
									justifyContent: 'flex-start',
									paddingTop: height / 20,
									paddingRight: width / 10
								}}
								onPress={() => {
									this.setVisible(!this.state.visible);
								}}
							>
								<Icon name="close" size={30} color="black" />
							</TouchableOpacity>
						</View>
					</Modal>
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
										pnr.flights[0].flightSegment[0].origin
											.countryCode
									]
								}
							</Text>
							<Text style={styles.whiteText}>
								{
									pnr.flights[0].flightSegment[0].origin
										.airportName
								}
							</Text>
							<Text style={styles.whiteText}>
								Terminal{' '}
								{
									pnr.flights[0].flightSegment[0].origin
										.terminalNumber
								}
							</Text>
						</View>
						<View style={styles.destinationContainer}>
							<Text style={[styles.whiteText, styles.bigText]}>
								{
									c2cd[
										pnr.flights[0].flightSegment[0]
											.destination.countryCode
									]
								}
							</Text>
							<Text style={styles.whiteText}>
								{
									pnr.flights[0].flightSegment[0].destination
										.airportName
								}
							</Text>
							<Text style={styles.whiteText}>
								Terminal{' '}
								{
									pnr.flights[0].flightSegment[0].destination
										.terminalNumber
								}
							</Text>
						</View>
					</View>
					<View style={styles.horizontalBox}>
						<View style={styles.sourceContainer}>
							<Text style={styles.whiteText}>
								{this.getFullDate(
									pnr.flights[0].flightSegment[0]
										.estimatedDepartureTime
								)}
							</Text>
							<Text style={styles.whiteText}>Scheduled</Text>
							<Text style={[styles.whiteText, styles.bigText]}>
								{this.getTime(
									pnr.flights[0].flightSegment[0]
										.estimatedDepartureTime
								)}
							</Text>
						</View>
						<View style={styles.destinationContainer}>
							<Text style={styles.whiteText}>
								{this.getFullDate(
									pnr.flights[0].flightSegment[0]
										.estimatedArrivalTime
								)}
							</Text>
							<Text style={styles.whiteText}>Scheduled</Text>
							<Text style={[styles.whiteText, styles.bigText]}>
								{this.getTime(
									pnr.flights[0].flightSegment[0]
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
			getPNR: getPNR,
			getLocation: getLocation
		},
		dispatch
	);
}

const mapStateToProps = state => ({
	pnr: state.pnr.pnr,
	location: state.location
});

const styles = StyleSheet.create({
	backgroundImage: {
		flex: 1,
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
	},
	stepIndicator: {
		marginVertical: 50,
		paddingHorizontal: width / 10
	}
});

export default connect(mapStateToProps, matchDispatchToProps)(Trip);
