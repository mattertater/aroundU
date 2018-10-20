import React from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';


class EventsAttending extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };
      }
    
   
    render(){
        return(
            <View style={styles.temp}><Text>EventsAttending Screen</Text></View>
        );
    }
}
  const styles = StyleSheet.create({
    temp: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
  });

  export default EventsAttending;
