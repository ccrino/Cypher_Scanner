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
   //StatusBar,
   StyleSheet,
   View,
} from 'react-native';

import {CharacterStats} from './Components/CharacterStats';
import {CharacterProvider} from './CharacterProvider';
import {CharacterHeader} from './Components/CharacterHeader';
import {CharacterRecovery} from './Components/CharacterRecovery';
import {CharacterAdvancement} from './Components/CharacterAdvancement';
import {ThemeProvider, useTheme} from './Theme';
import {Section} from './Components/Layout';
import {ParagraphField} from './Components/Text';
import {useCharacterProp} from './useCharacter';
import {CharacterSkills} from './Components/Skills';
import {SpecialAbilities} from './Components/SpecialAbilities';
import {Cyphers} from './Components/Cyphers';
import {EquipmentList} from './Components/Equipment';
import {AttacksList} from './Components/Attacks';

const styles = StyleSheet.create({
   viewPane: {
      flexDirection: 'row',
   },
   floatPane: {
      width: 300,
   },
   scrollSpacer: {
      paddingRight: 10,
   },
});

export const App: React.FC<{}> = () => {
   return (
      <ThemeProvider>
         <CharacterProvider>
            <CharacterSheetViewer />
         </CharacterProvider>
      </ThemeProvider>
   );
};

const CharacterSheetViewer: React.FC<{}> = () => {
   const theme = useTheme();
   const backgroundStyle = {
      backgroundColor: theme.lowlight,
   };

   const foregroundStyle = {
      backgroundColor: theme.background,
   };

   return (
      <SafeAreaView
         style={[backgroundStyle, styles.viewPane]}>
         {/* <StatusBar
                  barStyle={
                     isDarkMode
                        ? 'light-content'
                        : 'dark-content'
                  }
               /> */}
         <View style={[styles.floatPane, foregroundStyle]}>
            <ScrollView
               contentInsetAdjustmentBehavior="automatic"
               style={[
                  styles.scrollSpacer,
                  foregroundStyle,
               ]}>
               <CharacterHeader />
               <CharacterStats />
               <CharacterRecovery />
               <CharacterAdvancement />
            </ScrollView>
         </View>
         <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={backgroundStyle}>
            <CharacterSheetRightPane />
         </ScrollView>
      </SafeAreaView>
   );
};

const CharacterSheetRightPane: React.FC<{}> = () => {
   const [background, setBackground] =
      useCharacterProp('background');
   const [notes, setNotes] = useCharacterProp('notes');

   return (
      <View>
         <SpecialAbilities />
         <Cyphers />
         <CharacterSkills />
         <EquipmentList />
         <AttacksList />
         <Section title="Background" color="yellow">
            <ParagraphField
               value={background}
               onChangeText={setBackground}
            />
         </Section>
         <Section title="Notes" color="orange">
            <ParagraphField
               value={notes}
               onChangeText={setNotes}
            />
         </Section>
      </View>
   );
};
