
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home';
import Location from '../screens/Location';
import Tracking from '../screens/Tracking';
import { Button } from 'react-native';


const Navigation = () => {

    const Stack = createStackNavigator();


    return (
        <NavigationContainer >
            <Stack.Navigator initialRouteName="Tracking">
                <Stack.Screen name="Home" component={Home} 
                options={({ navigation, route }) => ({
                    headerTitle:'Settings',
                    
                  })}
                />
                <Stack.Screen name="Location" component={Location} />
                <Stack.Screen name="Tracking" component={Tracking} 
                options={({ navigation, route }) => ({
                    headerTitle:'Tracking',
                    headerRight: () => (
                      <Button
                        onPress={() => navigation.navigate('Home')}
                        title="Settings"
                        color="#000"
                      />
                    ),
                  })}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};
export default Navigation;