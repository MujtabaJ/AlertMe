import React, { Component } from 'react';
import { Alert, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { SafeAreaView, ScrollView, StatusBar, useColorScheme, Button, TextInput, Image, TouchableHighlight, Dimensions, Platform } from 'react-native';
import { Colors, DebugInstructions, Header, LearnMoreLinks, ReloadInstructions, } from 'react-native/Libraries/NewAppScreen';
import { getDistance, getPreciseDistance } from 'geolib';
import Geolocation from '@react-native-community/geolocation';
import useWindowDimensions from 'react-native/Libraries/Utilities/useWindowDimensions';

const WIDTH = Dimensions.get('window').width;
const HIEGHT = Dimensions.get('window').height;

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            location: null,
            latitude: 37.785834,
            longitude: -122.406417,
            range: 0,
            currentLongitude: 0.0,
            currentLatitude: 0.0,
            locationStatus: "",
        };

    }

    componentDidMount = () => {
        this.requestLocationPermission();
    }

    onChangeLatitude = (text) => {
        this.setState({ latitude: text });
    }
    onChangeLongitude = (text) => {
        this.setState({ longitude: text });
    }
    onChangeRange = (text) => {
        this.setState({ range: text });
    }
    setCurrentLongitude = (text) => {
        this.setState({ currentLongitude: text });
    }
    setCurrentLatitude = (text) => {
        this.setState({ currentLatitude: text });
    }
    setLocationStatus = (text) => {
        this.setState({ locationStatus: text });
    }

    calculateDistance = () => {

        var dis = getDistance(
            { latitude: 20.0504188, longitude: 64.4139099 },
            { latitude: this.state.currentLatitude, longitude: this.state.currentLongitude },
        );
        alert(
            `Distance\n\n${dis} Meter\nOR\n${dis / 1000} KM`
        );
    };

    calculatePreciseDistance = () => {
        const { latitude, longitude, currentLatitude, currentLongitude } = this.state;
        // var v1 = parseFloat(currentLatitude)
        // var v2 = parseFloat(currentLongitude)

        // var s1 = parseFloat(latitude)
        // var s2 = parseFloat(longitude)

        console.log(latitude, " , ", longitude, " , ", currentLatitude, " , ", currentLongitude);
        var pdis = getPreciseDistance(
            { currentLatitude, currentLongitude },
            { latitude, longitude },
        );
        // { latitude: 20.0504188, longitude: 64.4139099 },
        // { latitude: 51.528308, longitude: -0.3817765 },
        console.log(pdis);
        alert(
            `Precise Distance\n\n${pdis} Meter\nOR\n${pdis / 1000} KM`
        );
    };

    requestLocationPermission = async () => {
        if (Platform.OS === 'ios') {

            this.getOneTimeLocation();
            this.subscribeLocationLocation();
        } else {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                    {
                        title: 'Location Access Required',
                        message: 'This App needs to Access your location',
                    },
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    //To Check, If Permission is granted
                    this.getOneTimeLocation();
                    this.subscribeLocationLocation();
                } else {
                    this.setLocationStatus('Permission Denied');
                }
            } catch (err) {
                console.warn(err);
            }
        }
    };



    getOneTimeLocation = () => {
        this.setLocationStatus('Getting Location ...');
        Geolocation.getCurrentPosition(
            //Will give you the current location
            (position) => {
                this.setLocationStatus('You are Here');

                //getting the Longitude from the location json
                const currentLongitude =
                    JSON.stringify(position.coords.longitude);

                //getting the Latitude from the location json
                const currentLatitude =
                    JSON.stringify(position.coords.latitude);

                //Setting Longitude state
                this.setCurrentLongitude(currentLongitude);

                //Setting Longitude state
                this.setCurrentLatitude(currentLatitude);
            },
            (error) => {
                this.setLocationStatus(error.message);
            },
            {
                enableHighAccuracy: false,
                timeout: 30000,
                // maximumAge: 1000
            },
        );
    };

    subscribeLocationLocation = () => {
        watchID = Geolocation.watchPosition(
            (position) => {
                //Will give you the location on location change

                this.setLocationStatus('You are Here');
                console.log(position);

                //getting the Longitude from the location json        
                const currentLongitude =
                    JSON.stringify(position.coords.longitude);

                //getting the Latitude from the location json
                const currentLatitude =
                    JSON.stringify(position.coords.latitude);

                //Setting Longitude state
                this.setCurrentLongitude(currentLongitude);

                //Setting Latitude state
                this.setCurrentLatitude(currentLatitude);
            },
            (error) => {
                this.setLocationStatus(error.message);
            },
            {
                enableHighAccuracy: false,
                // maximumAge: 1000
            },
        );
    };
    locationPage = () => {
        this.props.navigation.navigate('Location');
    }

    render() {
        return (
            // <SafeAreaView style={{ flex: 1, }}>
            // <View style={{ height:HIEGHT }}>
            //   <StatusBar backgroundColor={Colors.TRANSPARENT} translucent={true} />
            // </View>

            <View style={styles.container}>
                <View style={styles.container}>
                    <View style={styles.container}>
                        <Text style={styles.header}>
                            Set your position
                      </Text>
                        <TouchableHighlight
                            style={styles.buttonStyle}
                            onPress={() => this.locationPage()}>
                            <Text>Location</Text>
                        </TouchableHighlight>
                        <View style={{ width: "100%" }}>
                            <TextInput
                                style={styles.input}
                                onChangeText={this.onChangeLatitude}
                                value={this.state.latitude}
                                placeholder="Latitude"
                                keyboardType="numeric"
                            />
                        </View>
                        <View>
                            <TextInput
                                style={styles.input}
                                onChangeText={this.onChangeLongitude}
                                value={this.state.longitude}
                                placeholder="Longitude"
                                keyboardType="numeric"
                            />
                        </View>
                        <View>
                            <TextInput
                                style={styles.input}
                                onChangeText={this.onChangeRange}
                                value={this.state.range}
                                placeholder="Range"
                                keyboardType="numeric"
                            />
                        </View>
                        <TouchableHighlight
                            style={styles.buttonStyle}
                            onPress={this.calculateDistance}>
                            <Text>Get Distance</Text>
                        </TouchableHighlight>

                        <TouchableHighlight
                            style={styles.buttonStyle}
                            onPress={this.calculatePreciseDistance}>
                            <Text>Get Precise Distance</Text>
                        </TouchableHighlight>
                    </View>


                    <View >
                        <Text style={styles.boldText}>
                            {this.state.locationStatus}
                        </Text>
                        <Text
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginTop: 16,
                            }}>
                            Longitude: {this.state.currentLongitude}
                        </Text>
                        <Text
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginTop: 16,
                            }}>
                            Latitude: {this.state.currentLatitude}
                        </Text>
                        <View style={{ marginTop: 20 }}>
                            <Button
                                title="Button"
                                onPress={this.getOneTimeLocation}
                            />
                        </View>
                    </View>
                </View>
            </View>
            // </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 10,
        justifyContent: 'center',
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        width: WIDTH * 0.7,

    },
    header: {
        fontSize: 22,
        fontWeight: '600',
        color: 'black',
        textAlign: 'center',
        paddingVertical: 20,
    },
    textStyle: {
        marginTop: 30,
        fontSize: 16,
        textAlign: 'center',
        color: 'black',
        paddingVertical: 20,
    },
    buttonStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        backgroundColor: '#dddddd',
        margin: 10,
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    boldText: {
        fontSize: 25,
        color: 'red',
        marginVertical: 16,
    },
});

export default Home;