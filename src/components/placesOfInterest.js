import React, { Component } from 'react';
import { Image, Text, View, FlatList, ActivityIndicator } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { getPOI } from '../actions/poiAction';
import { CardItem, Body } from 'native-base';

import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

class PlacesOfInterest extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false
		};
	}

	componentWillMount() {
		this.setState({ loading: true });
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
				this.props.getPOI(data.response[0].name);
				this.setState({ loading: false });
			})
			.catch(error => {
				this.setState({ loading: false });
				console.log(error);
			});
	}

	renderCard({ item }) {
		return (
			<CardItem>
				<Body style={{ flexDirection: 'row', alignItems: 'center' }}>
					<Image
						source={{ uri: item.icon }}
						style={{ height: 40, width: 40, marginRight: 10 }}
					/>
					<Text style={{ fontSize: 15, fontWeight: 'bold' }}>
						{item.name}
					</Text>
				</Body>
			</CardItem>
		);
	}

	render() {
		if (this.props.poi.poi_loading || this.state.loading) {
			return (
				<View
					style={{ justifyContent: 'center', alignItems: 'center' }}
				>
					<ActivityIndicator size="large" color="blue" />
				</View>
			);
		} else {
			return (
				<View style={{ paddingVertical: height / 50 }}>
					<Text>{this.props.poi.poi.html_attributions[0]}</Text>
					<FlatList
						data={this.props.poi.poi.results}
						renderItem={({ item }) => this.renderCard({ item })}
					/>
				</View>
			);
		}
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
	poi: state.poi,
	pnr: state.pnr.pnr.responseBody
});

export default connect(mapStateToProps, matchDispatchToProps)(PlacesOfInterest);
