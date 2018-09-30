import React, { Component } from 'react';
import { Image, Text, View, ToastAndroid } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Container, Button } from 'native-base';
import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

class Voice extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<Container>
				<Button onPress={() => {}}>
					<Text>Speak</Text>
				</Button>
			</Container>
		);
	}
}

const styles = StyleSheet.create({});

function matchDispatchToProps(dispatch) {
	return bindActionCreators({}, dispatch);
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps, matchDispatchToProps)(Voice);
