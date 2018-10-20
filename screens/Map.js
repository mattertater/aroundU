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
import {MapView, Permissions, Location} from 'expo';
import { Container, StyleProvider, } from 'native-base';



class MapScreen extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            region: {
                latitude: null,
                longitude: null,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421
            }
        };
    }

   
    componentDidMount() {
        this._getLocationAsync();
    }

    _getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            alert('permission not granted');
        }

        let location = await Location.getCurrentPositionAsync({});
        console.log(JSON.stringify(location))
        this.setState({ region:{ latitude: location.coords.latitude, longitude: location.coords.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }, loading: false });
    };

    

    _handleMapRegionChange = region => {
        this.setState({ region });
    };

    render() {
        if(this.state.loading){
            return(<View><ActivityIndicator/></View>);
        }
        return (
            <MapView
                style={styles.map}
                initialRegion={this.state.region}
                onRegionChange={() => this._handleMapRegionChange.bind(this)}
            >
            </MapView>
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