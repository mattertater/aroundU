import React, { Component } from "react";
import MyMap from "./Map.js";
import MyEvents from "../MyEvents/MyEvents.js";
import EventsAttending from "../EventsAttending/EventsAttending.js";
import Profile from "../Profile/Profile.js";
import Friends from "../Friends/Friends.js";
import SideBar from "../SideBar/SideBar.js";
import Settings from "../Settings/Settings.js";
import NewEvent from "../NewEvent/NewEvent.js";
import colors from '../../config/Colors.js';

import { createDrawerNavigator } from 'react-navigation';

const HomeScreenRouter = createDrawerNavigator(
    {
      Map: { screen: MyMap },
      MyEvents: { screen: MyEvents },
      NewEvent: { screen: NewEvent},
      EventsAttending: { screen: EventsAttending },
      Profile: { screen: Profile },
      Friends: { screen: Friends }, 
      Settings:  { screen: Settings }, 
    },
    {
        intialRouteName: Map,
        contentComponent: props => <SideBar {...props} />,
        backBehavior: "initialRoute",
        drawerBackgroundColor: colors.darkBlue,
        contentOptions: {
          activeTintColor: 'white',
          activeBackgroundColor: colors.blue,
          activeLabelStyle: { color: colors.white },
        }
    }
  );
  export default HomeScreenRouter;