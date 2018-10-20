import React, { Component } from "react";
import MyMap from "./Map.js";
import MyEvents from "../MyEvents/MyEvents.js";
import EventsAttending from "../EventsAttending/EventsAttending.js";
import Profile from "../Profile/Profile.js";
import Friends from "../Friends/Friends.js";
import SideBar from "../SideBar/SideBar.js";

import { createDrawerNavigator } from 'react-navigation';

const HomeScreenRouter = createDrawerNavigator(
    {
      Map: { screen: MyMap },
      MyEvents: { screen: MyEvents },
      EventsAttending: { screen: EventsAttending },
      Profile: { screen: Profile },
      Friends: { screen: Friends },
    },
    {
        contentComponent: props => <SideBar {...props} />
    }
  );
  export default HomeScreenRouter;