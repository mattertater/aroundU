import React from 'react';
import {
    ActivityIndicator,
    AsyncStorage,
    StatusBar,
    StyleSheet,
    View,
    Image,
    TextInput,
    Dimensions,
    TouchableOpacity,
    Modal,
    ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import getTheme from '../native-base-theme/components';
import Common from '../native-base-theme/variables/commonColor';
import MapView, { Marker, Callout } from 'react-native-maps';
import { Container, StyleProvider, } from 'native-base';



class MapScreen extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            region: {
                latitude: null,
                longitude: null,
                latitudeDelta: null,
                longitudeDelta: null,
            }
        };
    }

    // componentDidMount(){
    //     console.log('component DID mount playa!');
    //     // this.setCurrentPosition();
    // }


    // setCurrentPosition(){
    //     console.log('yo we in this function b');
    //     navigator.geolocation.getCurrentPosition((position) => {
    //         this.setState({
    //             ...this.state,
    //             loading: false, 
    //             region: {
    //                 latitude: position.coords.latitude,
    //                 longitude: position.coords.longitude,
    //                 latitudeDelta: 0.0922,
    //                 longitudeDelta: 0.0421
    //             },
    //         })
    //     },
    //     (error) => this.setState({ ...this.state, error: error.message }),
    //     { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    //   );
    // };
    

    _handleMapRegionChange = region => {
        this.setState({ region });
    };

    render() {
        
        return (
            <View>
                <MapView
                    initialRegion={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                        }}
                    onRegionChange={() => this._handleMapRegionChange.bind(this)}
                >
                </MapView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },

});

export default MapScreen;