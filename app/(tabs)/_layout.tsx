import { icons } from '@/constants/icons'
import { images } from '@/constants/images'
import { Tabs } from 'expo-router'
import React from 'react'
import { Image, ImageBackground } from 'react-native'

const _layout = () => {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
          <>
              <ImageBackground
                source={images.highlight}
              >
                <Image
                  source={icons.home}
                  tintColor='#151312'
                  className="size-5"
                  />
              </ImageBackground>
            </>
          )
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          headerShown: false,
          title: 'Search',
        }}
      />
      <Tabs.Screen
        name="saved"
        options={{
          headerShown: false,
          title: 'Saved',
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          title: 'Profile',
        }}
      />
    </Tabs>
  )
}

export default _layout
