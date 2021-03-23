import {
  SafeAreaView, Linking,
  TouchableHighlight,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Dimensions,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RNLocation from "react-native-location";
import moment from "moment";

const repoUrl = "https://github.com/timfpark/react-native-location";


const WIDTH = Dimensions.get('window').width;
const HIEGHT = Dimensions.get('window').height;


class Tracking extends React.PureComponent {

  constructor() {
    super();
    this.state = {
      location: null,
      location: null,
      latitude: 37.785834,
      longitude: -122.406417,
      range: 0,
      currentLongitude: 0.0,
      currentLatitude: 0.0,
      locationStatus: "",
    };
  }
  ////////////////


  ////////////////

  componentDidMount() {
    RNLocation.configure({
      allowsBackgroundLocationUpdates: true,
      distanceFilter: 5.0,
      pausesLocationUpdatesAutomatically: false,
      showsBackgroundLocationIndicator: false,

    });

    RNLocation.requestPermission(
      {
        ios: "always",
        android: {
          detail: "fine",
          rationale: {
            title: "Location permission",
            message: "We use your location to demo the library",
            buttonPositive: "OK",
            buttonNegative: "Cancel"
          }
        }
      }
    ).then(granted => {
      if (granted) {
        this._startUpdatingLocation();
      }
    });
  }

  _startUpdatingLocation = () => {
    this.locationSubscription = RNLocation.subscribeToLocationUpdates(
      locations => {
        this.setState({ location: locations[0] });
      }
    );
  };

  _stopUpdatingLocation = () => {
    this.locationSubscription && this.locationSubscription();
    this.setState({ location: null });
  };

  _openRepoUrl = () => {
    this.props.navigation.navigate('Home')
    // Linking.openURL(repoUrl).catch(err =>
    //   console.error("An error occurred", err)
    // );
  };

  render() {
    const { location } = this.state;
    return (
      <ScrollView style={styles.container}>
        <SafeAreaView style={styles.innerContainer}>
          
          <View style={styles.row}>
            <TouchableHighlight
              onPress={this._startUpdatingLocation}
              style={[styles.button, { backgroundColor: "#126312" }]}
            >
              <Text style={styles.buttonText}>Start</Text>
            </TouchableHighlight>

            <TouchableHighlight
              onPress={this._stopUpdatingLocation}
              style={[styles.button, { backgroundColor: "#881717" }]}
            >
              <Text style={styles.buttonText}>Stop</Text>
            </TouchableHighlight>
          </View>

          {location && (
            <React.Fragment>
              <View style={styles.row}>
                <View style={[styles.detailBox, styles.third]}>
                  <Text style={styles.valueTitle}>Course</Text>
                  <Text style={[styles.detail, styles.largeDetail]}>
                    {location.course}
                  </Text>
                </View>

                <View style={[styles.detailBox, styles.third]}>
                  <Text style={styles.valueTitle}>Speed</Text>
                  <Text style={[styles.detail, styles.largeDetail]}>
                    {location.speed}
                  </Text>
                </View>

                <View style={[styles.detailBox, styles.third]}>
                  <Text style={styles.valueTitle}>Altitude</Text>
                  <Text style={[styles.detail, styles.largeDetail]}>
                    {location.altitude}
                  </Text>
                </View>
              </View>

              <View style={{ alignItems: "flex-start" }}>
                <View style={styles.row}>
                  <View style={[styles.detailBox, styles.half]}>
                    <Text style={styles.valueTitle}>Latitude</Text>
                    <Text style={styles.detail}>{location.latitude}</Text>
                  </View>

                  <View style={[styles.detailBox, styles.half]}>
                    <Text style={styles.valueTitle}>Longitude</Text>
                    <Text style={styles.detail}>{location.longitude}</Text>
                  </View>
                </View>

                <View style={styles.row}>
                  <View style={[styles.detailBox, styles.half]}>
                    <Text style={styles.valueTitle}>Accuracy</Text>
                    <Text style={styles.detail}>{location.accuracy}</Text>
                  </View>

                  <View style={[styles.detailBox, styles.half]}>
                    <Text style={styles.valueTitle}>Altitude Accuracy</Text>
                    <Text style={styles.detail}>
                      {location.altitudeAccuracy}
                    </Text>
                  </View>
                </View>

                <View style={styles.row}>
                  <View style={[styles.detailBox, styles.half]}>
                    <Text style={styles.valueTitle}>Timestamp</Text>
                    <Text style={styles.detail}>{location.timestamp}</Text>
                  </View>

                  <View style={[styles.detailBox, styles.half]}>
                    <Text style={styles.valueTitle}>Date / Time</Text>
                    <Text style={styles.detail}>
                      {moment(location.timestamp).format("MM-DD-YYYY h:mm:ss")}
                    </Text>
                  </View>
                </View>

                <View style={styles.row}>
                  <View style={[styles.detailBox, styles.full]}>
                    <Text style={styles.json}>{JSON.stringify(location)}</Text>
                  </View>
                </View>
              </View>
            </React.Fragment>
          )}
        </SafeAreaView>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#CCCCCC"
  },
  innerContainer: {
    marginVertical: 30
  },
  title: {
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold"
  },
  repoLink: {
    textAlign: "center",
    fontSize: 12,
    fontWeight: "bold",
    // color: "#0000CC",
    textDecorationLine: "underline"
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginTop: 5,
    marginBottom: 5
  },
  detailBox: {
    padding: 15,
    justifyContent: "center"
  },
  button: {
    flex: 1,
    marginHorizontal: 10,
    marginTop: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    padding: 10
  },
  buttonText: {
    fontSize: 30,
    color: "#FFFFFF"
  },
  valueTitle: {
    fontFamily: "Futura",
    fontSize: 12
  },
  detail: {
    fontSize: 15,
    fontWeight: "bold"
  },
  largeDetail: {
    fontSize: 20
  },
  json: {
    fontSize: 12,
    fontFamily: "Courier",
    textAlign: "center",
    fontWeight: "bold"
  },
  full: {
    width: "100%"
  },
  half: {
    width: "50%"
  },
  third: {
    width: "33%"
  }
});

export default Tracking;