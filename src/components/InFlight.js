import React, { Component } from 'react';
import {
	Image,
	Text,
	View,
	TouchableOpacity,
	ToastAndroid,
	ActivityIndicator
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import GridView from 'react-native-super-grid';
import { Title, Header, Toast, ListItem, CheckBox, Body } from 'native-base';
import { getFood } from '../actions/foodAction';

import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

class InFlightDelivery extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dataArray: []
		};
	}

	componentWillMount() {
		this.props.getFood('SQ890', '2018-07-20').then(() => {
			var food = this.props.food.food.response;
			if (
				this.props.pnr.flights[0].flightSegment[0].cabinClass ===
				'BUSINESS'
			) {
				for (i in food.mealUpliftPlan[1].containerUpliftInformation) {
					this.state.dataArray.push({
						id: i,
						name:
							food.mealUpliftPlan[1].containerUpliftInformation[i]
								.meal,
						isChecked: false,
						color:
							'#' + ((Math.random() * 0xffffff) << 0).toString(16)
					});
				}
			}
			if (
				this.props.pnr.flights[0].flightSegment[0].cabinClass ===
				'FIRST'
			) {
				for (i in food.mealUpliftPlan[0].containerUpliftInformation
					.length) {
					this.state.dataArray.push({
						id: i,
						name:
							food.mealUpliftPlan[0].containerUpliftInformation[i]
								.meal,
						isChecked: false,
						color:
							'#' + ((Math.random() * 0xffffff) << 0).toString(16)
					});
				}
			}
			if (
				this.props.pnr.flights[0].flightSegment[0].cabinClass ===
				'ECONOMY'
			) {
				for (i in food.mealUpliftPlan[2].containerUpliftInformation
					.length) {
					this.state.dataArray.push({
						id: i,
						name:
							food.mealUpliftPlan[2].containerUpliftInformation[i]
								.meal,
						isChecked: false,
						color:
							'#' + ((Math.random() * 0xffffff) << 0).toString(16)
					});
				}
			}
		});
	}

	updateState(index) {
		var state = this.state.dataArray;
		state[index].isChecked = !state[index].isChecked;
		this.setState({ dataArray: state });
	}

	render() {
		if (this.props.food.food_loading) {
			return <ActivityIndicator size="large" color="blue" />;
		}
		return (
			<View style={{ flex: 1 }}>
				<Header
					style={{
						justifyContent: 'center',
						alignItems: 'center'
					}}
				>
					<Title>InFlight Delivery</Title>
				</Header>
				<GridView
					itemDimension={130}
					items={this.state.dataArray}
					style={styles.gridView}
					renderItem={(item, index) => (
						<TouchableOpacity
							activeOpacity={0.1}
							onPress={() => {
								this.updateState(index);
							}}
							style={[
								styles.itemContainer,
								{
									backgroundColor: this.state.dataArray[index]
										.color
								}
							]}
						>
							<View
								style={{
									flexDirection: 'row',
									justifyContent: 'space-between'
								}}
							>
								<Text style={styles.itemName}>{item.name}</Text>
								<CheckBox
									onPress={() => {
										this.updateState(index);
									}}
									checked={
										this.state.dataArray[index].isChecked
									}
									color="white"
									style={{ marginRight: 15 }}
								/>
							</View>
						</TouchableOpacity>
					)}
				/>
				<TouchableOpacity
					activeOpacity={0.1}
					onPress={() => {
						var i = 0;
						for (index in this.state) {
							if (this.state[index] === true) {
								i = 1;
							}
						}
						console.log(i);
						if (i === 1) {
							ToastAndroid.show(
								'Your order has been sent to the cabin crew!',
								ToastAndroid.SHORT
							);
						} else {
							ToastAndroid.show(
								'Please select alteast 1 item!',
								ToastAndroid.SHORT
							);
						}
					}}
					style={{
						alignItems: 'center',
						justifyContent: 'center',
						backgroundColor: '#59d1f2',
						height: height * 0.07
					}}
				>
					<Text
						style={{
							fontSize: 17,
							fontWeight: 'bold',
							color: 'black'
						}}
					>
						Checkout->
					</Text>
				</TouchableOpacity>
				{console.log(this.state.dataArray)}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	gridView: {
		paddingTop: 25,
		flex: 1
	},
	itemContainer: {
		justifyContent: 'flex-end',
		borderRadius: 5,
		padding: 10,
		height: 150
	},
	itemName: {
		fontSize: 16,
		color: '#fff',
		fontWeight: '600'
	},
	itemCode: {
		fontWeight: '600',
		fontSize: 12,
		color: '#fff'
	}
});

function matchDispatchToProps(dispatch) {
	return bindActionCreators(
		{
			getFood: getFood
		},
		dispatch
	);
}

const mapStateToProps = state => ({
	food: state.food,
	pnr: state.pnr.pnr.responseBody
});

export default connect(mapStateToProps, matchDispatchToProps)(InFlightDelivery);
