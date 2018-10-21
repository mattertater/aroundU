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
    Text,
} from 'react-native';
import Expo from 'expo'
import { Ionicons } from '@expo/vector-icons';
import getTheme from '../../native-base-theme/components';
import Common from '../../native-base-theme/variables/commonColor';
import {MapView, Marker, Permissions, Location} from 'expo';
import { Container, StyleProvider, Header, Left, Button, Icon, Body, Title, Content, Item, Fab } from 'native-base';
import colors from '../../config/Colors.js';
import firebase from '../../config/Firebase';


class MapScreen extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            eventMarkers: [],
            tappedMarkerData: {},
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
        this._setMarkers();
    }

    _getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            alert('permission not granted');
        }
        let location = await Location.getCurrentPositionAsync({});
        this.setState({ region:{ latitude: location.coords.latitude, longitude: location.coords.longitude, latitudeDelta: 0.0922 * 0.50, longitudeDelta: 0.0421 * 0.50 }, loading: false });
    };

    _setMarkers = () => { 
        var markers = [];
        firebase.database().ref('Events').orderByKey().on('value',function(database){
            database.forEach(function(event) {
                var instance = event.val(); 
                console.log(instance);
                markers.push({
                    title: instance.title,
                    organization: instance.organization, 
                    description: instance.description,
                    startTime: instance.startTime,
                    endTime: instance.endTime,
                    coordinate: {latitude: instance.location.lat, longitude: instance.location.lng, latitudeDelta: 0.0922 * 0.50, longitudeDelta: 0.0421 * 0.50},
                    locationName: instance.locationName,
                    submissionBy: instance.submissionBy,
                });  
            });
        })
        this.setState({eventMarkers: markers})
    }

    

    _handleMapRegionChange = region => {
        this.setState({ region });
    };

    render() {
        if(this.state.loading)
        {
            return <Loading/>;
        }
        return (
            <Container>
                <Header androidStatusBarColor="rgba(0,0,0,0.251)" style={{marginTop: Expo.Constants.statusBarHeight, elevation: 0}}>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.toggleDrawer()}>
                            <Icon name='menu'/>
                        </Button>
                    </Left>
                    <Body>
                        <Title>aroundU</Title>
                    </Body>
                </Header>
                <View style={styles.container}>
                    <MapView
                        style={styles.map}
                        initialRegion={this.state.region}
                        onRegionChange={() => this._handleMapRegionChange.bind(this)}
                        >
                            {this.state.eventMarkers.map( marker => (
                                <MapView.Marker
                                    key={marker.title}
                                    coordinate={{latitude: marker.coordinate.latitude, longitude: marker.coordinate.longitude}}
                                    title={marker.title + ' at ' + marker.organization}
                                    description={marker.description + ' from ' + marker.startTime + ' to ' + marker.endTime}
                                    onPress={() => this.setState({tappedMarkerData: marker})}
                                    >
                                    <View>
                                        <Icon name='md-pin' style={{color: colors.yellow, fontSize: 40,}}/>
                                    </View>
                                </MapView.Marker>
                                
                            ))}
                    </MapView>
                    <Fab style={{ backgroundColor: colors.yellow }} position="bottomRight" onPress={() => this.props.navigation.navigate('NewEvent')}>
                        <Icon name="add" />
                    </Fab>
                </View>
            </Container>
        );
    }
}


const Loading = () => (
    <View style={styles.container}>
      <Text>Loading...</Text>
    </View>
  );

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    addEventButton: {
        marginTop: 20,
        width: 60,
        height: 60,
        borderRadius: 60/2,
        justifyContent: 'center',
        backgroundColor: colors.yellow,
        borderColor: 'transparent',
    }
});
export default MapScreen;