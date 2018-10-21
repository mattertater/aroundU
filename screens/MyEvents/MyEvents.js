import React from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';
import {Icon, Button, Item} from 'native-base';
import colors from '../../config/Colors.js';


class MyEvents extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };
      }
    
   
    render(){
        return(
            <View style={styles.container}>
                <Item style={styles.noUnderline}>
                    <Text style={{fontSize: 30, color: colors.white}}>My Events</Text>
                </Item>
                <Button transparent style={styles.mapMenu} onPress={() => this.props.navigation.toggleDrawer()}>
                    <Icon name='menu' style={{ width: 20, height: 20, color: colors.white }}/>
                </Button>
            </View>
        );
    }
}
  const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: 50,
        backgroundColor: colors.blue,
        borderBottomWidth: 0,
    },
    noUnderline: {
        borderColor: 'transparent',
    },
    mapMenu: {
        position: 'absolute',
        left: 10,
        top: 10,
    },
  });

  export default MyEvents;
