import React, { Component } from 'react';
import { Image, Text, View, TouchableOpacity } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import {
	Container,
	Header,
	Content,
	Tab,
	Tabs,
	Body,
	Title,
	Right
} from 'native-base';
import UpcomingTrip from './upcomingTrip';
// import { getWeather } from '../actions/weatherAction';
import Icon from 'react-native-vector-icons/EvilIcons';

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
			<Container>
				<Header hasTabs>
					<Body style={{ flex: 1, alignItems: 'flex-end' }}>
						<Text
							style={{
								color: 'white',
								fontSize: 20,
								fontWeight: 'bold'
							}}
						>
							My Trips
						</Text>
					</Body>
					<Right>
						<TouchableOpacity onPress={() => {}}>
							<Icon name="user" size={40} color="white" />
						</TouchableOpacity>
					</Right>
				</Header>
				<Tabs locked={true}>
					<Tab heading="Upcoming">
						<UpcomingTrip />
					</Tab>
					<Tab heading="Future">
						<View>
							<Text>Tokyo</Text>
							<Text>Booking reference AKN0</Text>
						</View>
					</Tab>
					<Tab heading="Past">
						<View>
							<Text>Tokyo</Text>
							<Text>22 Sept 2017-22 Sept 2017</Text>
						</View>
					</Tab>
				</Tabs>
			</Container>
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

export default connect(mapStateToProps, matchDispatchToProps)(Trip);
