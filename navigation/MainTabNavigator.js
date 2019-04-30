import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import MessageForm from '../screens/MessageForm';
import InfoScreen from '../screens/InfoScreen';
import SettingsScreen from '../screens/SettingsScreen';

const MessageStack = createStackNavigator({
  Home: MessageForm,
});

MessageStack.navigationOptions = {
  tabBarLabel: 'Room',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={'chat'}
    />
  ),
};

const InfoStack = createStackNavigator({
  Info: InfoScreen,
});

InfoStack.navigationOptions = {
  tabBarLabel: 'Info',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={'info'}
    />
  ),
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={'settings'}
    />
  ),
};

export default createBottomTabNavigator({
  MessageStack,
  InfoStack,
  SettingsStack
});
