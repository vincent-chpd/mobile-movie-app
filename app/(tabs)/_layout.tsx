import { Icon, Label, NativeTabs } from 'expo-router/unstable-native-tabs';
import React from 'react';

const _layout = () => {
  return (
    <NativeTabs>
      <NativeTabs.Trigger name="index">
        <Label>Home</Label>
        <Icon
          sf={{ default: 'house', selected: 'house.fill' }}
          selectedColor="#ab8bff"
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="search">
        <Label>Search</Label>
        <Icon sf="magnifyingglass" selectedColor="#ab8bff" />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="saved">
        <Label>Saved</Label>
        <Icon
          sf={{ default: 'bookmark', selected: 'bookmark.fill' }}
          selectedColor="#ab8bff"
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="profile">
        <Label>Profile</Label>
        <Icon
          sf={{ default: 'person', selected: 'person.fill' }}
          selectedColor="#ab8bff"
        />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
};

export default _layout;
