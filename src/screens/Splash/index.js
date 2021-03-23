import React, { Component } from 'react';
import { View, Text, SafeAreaView, ImageBackground, Image, StatusBar, TouchableOpacity, Dimensions } from 'react-native';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight =Dimensions.get('window').height;

class Splash extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: 0,
            modalVisible: false,
            modalVisibleRequest: false,
            isChecked: false,
        }
    }
    
    componentWillMount () {
        var navigator = this.props.navigator;
        setTimeout (() => {
            this.props.navigation.navigate('Home');
        }, 100); 
    }


    componentDidMount = async () => {
        
    }

    setModalVisibleRequest(visible) {
        this.setState({
            modalVisibleRequest: visible,
        });
    }

    render() {
        return (
            <View >
                <Image source={require('../../assets/imgs/decoy.png')} style={{width: deviceWidth, height: deviceHeight }}/>
            </View>
        );
        
    }
}

export default Splash;