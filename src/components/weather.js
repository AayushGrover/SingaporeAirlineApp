import React, { Component } from 'react';
import { Image, Text, View, ActivityIndicator } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { getWeather } from '../actions/weatherAction';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { weatherConditions } from '../assets/weatherConditions';

import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

class Weather extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentWillMount() {
		fetch(
			'http://iatacodes.org/api/v6/cities?api_key=f99593f5-aa24-4531-ac15-cb3eee8b6b10&code=' +
				this.props.pnr.flights[0].destination.airportCode,
			{
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json'
				}
			}
		)
			.then(data => {
				return data.json();
			})
			.then(data => {
				// console.log('12', data);
				this.props.getWeather(data.response[0].name);
			})
			.catch(error => {
				console.log(error);
			});
	}

	render() {
		if (this.props.weather.weather_loading) {
			return (
				<View
					style={{ justifyContent: 'center', alignItems: 'center' }}
				>
					<ActivityIndicator size="large" color="blue" />
				</View>
			);
		} else {
			return (
				<View
					style={[
						styles.weatherContainer,
						{
							backgroundColor:
								weatherConditions[
									this.props.weather.weather[0].main
								].color
						}
					]}
				>
					<View style={styles.headerContainer}>
						<Icon
							size={72}
							name={
								weatherConditions[
									this.props.weather.weather[0].main
								].icon
							}
							color={'#fff'}
						/>
						<Text style={styles.tempText}>
							{this.props.weather.main.temp}˚
						</Text>
					</View>
					<View style={styles.bodyContainer}>
						<Text style={styles.title}>
							{
								weatherConditions[
									this.props.weather.weather[0].main
								].title
							}
						</Text>
						<Text style={styles.subtitle}>
							{
								weatherConditions[
									this.props.weather.weather[0].main
								].subtitle
							}
						</Text>
					</View>
				</View>
			);
		}
	}
}

const styles = StyleSheet.create({
	weatherContainer: {
		flex: 1
	},
	headerContainer: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-around'
	},
	tempText: {
		fontSize: 72,
		color: '#fff'
	},
	bodyContainer: {
		flex: 2,
		alignItems: 'flex-start',
		justifyContent: 'flex-end',
		paddingLeft: 25,
		marginBottom: 40
	},
	title: {
		fontSize: 60,
		color: '#fff'
	},
	subtitle: {
		fontSize: 24,
		color: '#fff'
	}
});

function matchDispatchToProps(dispatch) {
	return bindActionCreators(
		{
			getWeather: getWeather
		},
		dispatch
	);
}

const mapStateToProps = state => ({
	weather: state.weather.weather,
	pnr: state.pnr.pnr.responseBody
});

export default connect(mapStateToProps, matchDispatchToProps)(Weather);
