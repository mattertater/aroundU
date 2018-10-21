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
import {MapView, Permissions, Location} from 'expo';
import { Container, StyleProvider, Header, Left, Button, Icon, Body, Title, Content, Item, Fab } from 'native-base';
import colors from '../../config/Colors.js';



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
        this.setState({ region:{ latitude: location.coords.latitude, longitude: location.coords.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }, loading: false });
    };

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

                <View style={styles.container}>
                    <MapView
                        style={styles.map}
                        initialRegion={this.state.region}
                        onRegionChange={() => this._handleMapRegionChange.bind(this)}
                        mapPadding={{top: 0, left: Dimensions.get('window').width - 50, right: 0, bottom: 0}}
                        />
                    <Fab style={{ backgroundColor: colors.yellow }} position="bottomRight" onPress={() => this.props.navigation.navigate('NewEvent')}>
                        <Icon name="add" />
                    </Fab>
                </View>

                <Button transparent style={styles.mapMenu} onPress={() => this.props.navigation.toggleDrawer()}>
                    <Icon name='menu' style={{ width: 20, height: 20, color: colors.darkBlue }}/>
                </Button>
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
    mapMenu: {
        position: 'absolute',
        left: 15,
        top: 15,
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