import React, { Component } from 'react';
import { TextInput, Text, View, TouchableOpacity } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { getCurrencyRate } from '../actions/currencyAction';
import { c2cr } from '../assets/countryToCurrency';
import { Container, Header, Content, Body, Title, Left } from 'native-base';
import Icon from 'react-native-vector-icons/Feather';

import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

class CurrencyRate extends Component {
	constructor(props) {
		super(props);
		this.state = {
			from: 1,
			to: 1,
			isTo: false
		};
	}

	componentWillMount() {
		this.props.getCurrencyRate(
			c2cr[this.props.pnr.flights[0].origin.countryCode],
			c2cr[this.props.pnr.flights[0].destination.countryCode]
		);
	}

	render() {
		return (
			<Container>
				<Header>
					<Left>
						<TouchableOpacity onPress={() => Actions.pop()}>
							<Icon name="chevron-left" size={40} color="white" />
						</TouchableOpacity>
					</Left>
					<Body style={{ flex: 1, alignItems: 'center' }}>
						<Text
							style={{
								color: 'white',
								fontSize: 20,
								fontWeight: 'bold'
							}}
						>
							Currency Converter
						</Text>
					</Body>
				</Header>
				<View style={styles.box}>
					<TextInput
						style={styles.input}
						value={
							this.state.isTo
								? this.state.to *
										1 /
										this.props.currency.currency_rate +
								  ''
								: this.state.from + ''
						}
						keyboardType="numeric"
						onChangeText={from => this.setState({ from })}
						onFocus={() => {
							this.setState({ isTo: false });
						}}
					/>
					<Text style={{ flex: 0, fontSize: 20, fontWeight: 'bold' }}>
						{
							c2cr[
								this.props.pnr.flights[0].destination
									.countryCode
							]
						}
					</Text>
				</View>
				<View style={styles.box}>
					<TextInput
						style={styles.input}
						value={
							!this.state.isTo
								? this.state.from *
										this.props.currency.currency_rate +
								  ''
								: this.state.to + ''
						}
						keyboardType="numeric"
						onChangeText={to => this.setState({ to })}
						onFocus={() => {
							this.setState({ isTo: true });
						}}
					/>
					<Text style={{ flex: 0, fontSize: 20, fontWeight: 'bold' }}>
						{c2cr[this.props.pnr.flights[0].origin.countryCode]}
					</Text>
				</View>
			</Container>
		);
	}
}

const styles = StyleSheet.create({
	box: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	},
	input: {
		height: height * 0.07,
		width: width * 0.5,
		borderColor: 'gray',
		borderWidth: 2,
		borderRadius: 20,
		paddingLeft: 20,
		marginRight: width / 50
	}
});

function matchDispatchToProps(dispatch) {
	return bindActionCreators(
		{
			getCurrencyRate: getCurrencyRate
		},
		dispatch
	);
}

const mapStateToProps = state => ({
	currency: state.currency,
	pnr: state.pnr.pnr.responseBody
});

export default connect(mapStateToProps, matchDispatchToProps)(CurrencyRate);
