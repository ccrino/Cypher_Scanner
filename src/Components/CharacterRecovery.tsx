import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useCharacterProp} from '../useCharacter';
import {ToggleTrack} from './ToggleTrack';
import {SmallOrbNumberInput} from './Inputs';
import {HorizontalBar} from './Layout';
import {BigLabelText, LabelText} from './Text';

export const CharacterRecovery: React.FC<{}> = () => {
   const [recoveryMod, setRecoveryMod] =
      useCharacterProp('recoveryMod');
   const [recoveryAction, setRecoveryAction] =
      useCharacterProp('recoveryAction');
   const [recoveryMinute, setRecoveryMinute] =
      useCharacterProp('recoveryMinute');
   const [recoveryHour, setRecoveryHour] =
      useCharacterProp('recoveryHour');
   const [recoveryTenHour, setRecoveryTenHour] =
      useCharacterProp('recoveryTenHour');
   const [Dead, setDead] = useCharacterProp('dead');
   const [Debilitated, setDebilitated] =
      useCharacterProp('debilitated');
   const [Impaired, setImpaired] =
      useCharacterProp('impaired');

   return (
      <View style={styles.body}>
         <BigLabelText>Recovery</BigLabelText>
         <HorizontalBar />
         <View style={styles.horizFlex}>
            <View style={styles.fieldBack}>
               <SmallOrbNumberInput
                  initialValue={recoveryMod}
                  onNumberChange={setRecoveryMod}>
                  <LabelText>1d6+</LabelText>
               </SmallOrbNumberInput>
            </View>
            <ToggleTrack
               style={styles.trackBack}
               data={[
                  {
                     color: 'violet',
                     title: '10 hours',
                     value: recoveryTenHour,
                     onToggle: setRecoveryTenHour,
                  },
                  {
                     color: 'blue',
                     title: '1 hour',
                     value: recoveryHour,
                     onToggle: setRecoveryHour,
                  },
                  {
                     color: 'cyan',
                     title: '10 mins',
                     value: recoveryMinute,
                     onToggle: setRecoveryMinute,
                  },
                  {
                     color: 'green',
                     title: '1 action',
                     value: recoveryAction,
                     onToggle: setRecoveryAction,
                  },
               ]}
            />
         </View>
         <ToggleTrack
            data={[
               {
                  color: 'yellow',
                  title: 'Impaired',
                  value: Impaired,
                  onToggle: setImpaired,
               },
               {
                  color: 'orange',
                  title: 'Debilitated',
                  value: Debilitated,
                  onToggle: setDebilitated,
               },
               {
                  color: 'red',
                  title: 'Dead',
                  value: Dead,
                  onToggle: setDead,
               },
            ]}
         />
      </View>
   );
};

const styles = StyleSheet.create({
   body: {
      flexDirection: 'column',
      flexGrow: 1,
      marginBottom: 40,
   },
   horizFlex: {
      flexDirection: 'row',
      flexGrow: 1,
      flexShrink: 0,
      alignContent: 'center',
      justifyContent: 'space-between',
   },
   smallInput: {
      textAlign: 'center',
      margin: 5,
      fontSize: 20,
      paddingTop: 5,
      height: 40,
      width: 40,
      minWidth: 40,
      borderWidth: 1,
      borderRadius: 20,
   },
   trackBack: {
      zIndex: 1,
      marginTop: 4,
      marginBottom: 28,
   },
   fieldBack: {
      zIndex: 2,
      marginTop: 0,
      marginRight: -10,
   },
});
