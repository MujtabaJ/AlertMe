import React, { useState, useEffect, Component } from 'react';

import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { Alert, StyleSheet, Text, View, TouchableOpacity } from 'react-native';

// const Container = Styled.View`
//     flex: 1;
// `;


class Location extends React.Component {


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
      _watchId: 0,
      locations: [],
      region: {},
      markers: [],
    };

  }
  setLocations = (text) => {
    this.setState({ latitude: text });
  }
  setLocations = (text) => {
    this.setState({ longitude: text });
  }
  setLocations = (array) => {
    this.setState({ locations: array });
  }

  componentDidMount() {
    this.getRunTimeData();
  }

  getRunTimeData = () => {
    this.state._watchId = Geolocation.watchPosition(
      position => {
        const { latitude, longitude } = position.coords;

        setLocations(latitude);
        setLocations(longitude);
        setLocations([...locations, { latitude, longitude }]);
      },
      error => {
        console.log(error);
      },
      {
        enableHighAccuracy: true,
        distanceFilter: 100,
        interval: 5000,
        fastestInterval: 2000,
      },
    );
  }

  componentWillUnmount() {
    Geolocation.clearWatch(this.state._watchId);
  }

  getInitialState() {
    return {
      region: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.01,
            longitudeDelta: 0.01,
      },
    };
  }

  onRegionChange(region) {
    if (region !== undefined) {
      // this.setState({ region: region })
    }
  }
  onMapPress(e) {
    this.setState({
      markers: [
        ...this.state.markers,
        {
          coordinate: e.nativeEvent.coordinate,
          key: id++,
        },
      ],
    }
    );
  }

  render() {
    const { latitude, longitude, locations } = this.state;
    return (
      <View style={{ flex: 1 }}>
        
        <MapView
          // provider={PROVIDER_GOOGLE}
          style={{flex:1, width: '100%', height: '100%' }}
          initialRegion={{
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          onPress={(e) => this.setState({ markers: [...this.state.markers, { latlng: e.nativeEvent.coordinate }] })}
          // region={this.state.region}
          onRegionChange={this.onRegionChange}
        >

          {
            this.state.markers.map((marker, i) => (
              <MapView.Marker key={i} coordinate={marker.latlng} />
            ))
          }

        </MapView>

      </View>
    );
  }
};

export default Location;