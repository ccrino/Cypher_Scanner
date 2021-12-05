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
import {LabelText, ParagraphField} from './Components/Text';
import {useCharacterProp} from './useCharacter';
import {CharacterSkills} from './Components/CharacterSkills';

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
      useCharacterProp('Background');
   const [notes, setNotes] = useCharacterProp('Notes');

   return (
      <View>
         <Section title="Special Abilities" color="magenta">
            <LabelText>
               Here we handle the character abilities
            </LabelText>
         </Section>
         <Section title="Cyphers" color="violet">
            <LabelText>
               Here we handle the cypher list
            </LabelText>
         </Section>
         <CharacterSkills />
         <Section title="Equipment" color="cyan">
            <LabelText>
               Here we handle the character equipment
            </LabelText>
         </Section>
         <Section title="Attacks" color="green">
            <LabelText>
               Here we handle the character attacks
            </LabelText>
         </Section>
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
