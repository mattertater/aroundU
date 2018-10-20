import React from "react";
import { Container, Content, Text, List, ListItem } from "native-base";
const routes = ["MyEvents", "EventsAttending", "Profile", "Friends"];
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
      </Container>
    );
  }
}