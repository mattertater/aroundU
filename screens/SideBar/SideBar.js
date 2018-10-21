import React from "react";
import { Container, Content, Text, List, ListItem, Item, Button, Icon,} from "native-base";
const routes = ["Map", "MyEvents", "EventsAttending", "Profile", "Friends"];
import colors from '../../config/Colors.js';
export default class SideBar extends React.Component {

  render() {
    return (
      <Container>
        <Content>
          <List
            dataArray={routes}
            renderRow={data => {
              return (
                <ListItem
                  button
                  onPress={() => this.props.navigation.navigate(data)}>
                  <Text style={{color: colors.white}}>{data.replace(/([A-Z])/g, ' $1').trim()}</Text>
                </ListItem>
              );
            }}
          />
        </Content>
        <Button transparent style={{position: 'absolute', left: 10, bottom: 10, borderColor: 'transparent'}} onPress={() => this.props.navigation.navigate('Settings')}>
          <Icon style={{ color: colors.white }} name='settings'/>
        </Button>  
      </Container>
    );
  }
}