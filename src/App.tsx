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
   FlatList,
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
   fillPane: {
      flexGrow: 1,
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
         <View style={[styles.fillPane, backgroundStyle]}>
            <CharacterSheetRightPane />
         </View>
      </SafeAreaView>
   );
};

const Background: React.FC<{}> = () => {
   const [background, setBackground] =
      useCharacterProp('background');

   return (
      <Section title="Background" color="yellow">
         <ParagraphField
            value={background}
            onChangeText={setBackground}
         />
      </Section>
   );
};

const Notes: React.FC<{}> = () => {
   const [notes, setNotes] = useCharacterProp('notes');

   return (
      <Section title="Notes" color="orange">
         <ParagraphField
            value={notes}
            onChangeText={setNotes}
         />
      </Section>
   );
};

const rightPaneData = [
   SpecialAbilities,
   Cyphers,
   CharacterSkills,
   EquipmentList,
   AttacksList,
   Background,
   Notes,
];

const CharacterSheetRightPane: React.FC<{}> = () => (
   <FlatList
      data={rightPaneData}
      renderItem={val => <val.item />}
   />
);
