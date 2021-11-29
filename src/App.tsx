/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {
   SafeAreaView,
   ScrollView,
   StatusBar,
   StyleSheet,
   //useColorScheme,
   View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {CharacterStats} from './Components/CharacterStats';
import {DamageTrack} from './Components/DamageTrack';
import {CharacterProvider} from './CharacterProvider';
import {CharacterHeader} from './Components/CharacterHeader';
import {CharacterRecovery} from './Components/CharacterRecovery';
import {CharacterAdvancement} from './Components/CharacterAdvancement';

export const App: React.FC<{}> = () => {
   const isDarkMode = true; //useColorScheme() === 'dark';

   const backgroundStyle = {
      backgroundColor: isDarkMode
         ? Colors.darker
         : Colors.lighter,
   };

   const foregroundStyle = {
      backgroundColor: isDarkMode
         ? Colors.black
         : Colors.white,
   };

   return (
      <CharacterProvider>
         <SafeAreaView style={backgroundStyle}>
            <StatusBar
               barStyle={
                  isDarkMode
                     ? 'light-content'
                     : 'dark-content'
               }
            />
            <ScrollView
               contentInsetAdjustmentBehavior="automatic"
               style={backgroundStyle}>
               <View
                  style={[
                     styles.viewPane,
                     foregroundStyle,
                  ]}>
                  <CharacterHeader />
                  <CharacterStats />
                  <DamageTrack />
                  <CharacterRecovery />
                  <CharacterAdvancement />
               </View>
            </ScrollView>
         </SafeAreaView>
      </CharacterProvider>
   );
};

const styles = StyleSheet.create({
   viewPane: {
      width: '30%',
      minWidth: 300,
      maxWidth: 600,
   },
});
