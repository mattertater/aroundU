import React from "react";
import { Container, Content, Text, List, ListItem, Item, Button, Icon,} from "native-base";
const routes = ["Map", "MyEvents", "EventsAttending", "Profile", "Friends"];
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
                  <Text>{data.replace(/([A-Z])/g, ' $1').trim()}</Text>
                </ListItem>
              );
            }}
          />
        </Content>
        <Item style={{position: 'absolute', left: 10, bottom: 10, borderColor: 'transparent'}}>
          <Button transparent onPress={() => this.props.navigation.navigate('Settings')}>
            <Icon  style={{ color: 'black' }} name='settings'/>
          </Button>
        </Item>          
      </Container>
    );
  }
}