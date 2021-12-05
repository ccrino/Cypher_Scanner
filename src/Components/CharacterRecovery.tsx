import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useTheme} from '../Theme';
import {useCharacterProp} from '../useCharacter';
import {DamageTrack, ToggleTrack} from './DamageTrack';
import {HorizontalBar} from './Layout';
import {NumericField} from './NumericField';
import {BigLabelText} from './Text';

export const CharacterRecovery: React.FC<{}> = () => {
   const [recoveryMod, setRecoveryMod] =
      useCharacterProp('RecoveryMod');
   const [recoveryAction, setRecoveryAction] =
      useCharacterProp('RecoveryAction');
   const [recoveryMinute, setRecoveryMinute] =
      useCharacterProp('RecoveryMinute');
   const [recoveryHour, setRecoveryHour] =
      useCharacterProp('RecoveryHour');
   const [recoveryTenHour, setRecoveryTenHour] =
      useCharacterProp('RecoveryTenHour');

   const theme = useTheme();
   const color = {
      borderColor: theme.secondary,
   };

   return (
      <View style={styles.body}>
         <BigLabelText>Recovery</BigLabelText>
         <HorizontalBar />
         <View style={styles.horizFlex}>
            <View style={styles.fieldBack}>
               <NumericField
                  style={[styles.smallInput, color]}
                  initialValue={recoveryMod}
                  onNumberChange={setRecoveryMod}>
                  1d6+
               </NumericField>
            </View>
            <ToggleTrack
               style={styles.trackBack}
               data={[
                  {
                     color: theme.violet,
                     title: '10 hours',
                     value: recoveryTenHour,
                     onToggle: setRecoveryTenHour,
                  },
                  {
                     color: theme.blue,
                     title: '1 hour',
                     value: recoveryHour,
                     onToggle: setRecoveryHour,
                  },
                  {
                     color: theme.cyan,
                     title: '10 mins',
                     value: recoveryMinute,
                     onToggle: setRecoveryMinute,
                  },
                  {
                     color: theme.green,
                     title: '1 action',
                     value: recoveryAction,
                     onToggle: setRecoveryAction,
                  },
               ]}
            />
         </View>
         <DamageTrack />
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
