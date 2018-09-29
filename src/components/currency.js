import React, { Component } from 'react';
import { Image, Text, View } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { getCurrencyRate } from '../actions/currencyAction';

class CurrencyRate extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentWillMount() {
		this.props.getCurrencyRate('USD', 'INR');
	}

	render() {
		return (
			<View>
				<Text>{this.props.currency.currency_rate}</Text>
			</View>
		);
	}
}

function matchDispatchToProps(dispatch) {
	return bindActionCreators(
		{
			getCurrencyRate: getCurrencyRate
		},
		dispatch
	);
}

const mapStateToProps = state => ({
	currency: state.currency
});

export default connect(mapStateToProps, matchDispatchToProps)(CurrencyRate);
