import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useCharacterProp} from '../useCharacter';
import {NumericField} from './NumericField';
import {BigLabelText} from './Text';
import ToggleField from './ToggleField';

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

   return (
      <View style={styles.vertFlex}>
         <BigLabelText>Recovery</BigLabelText>
         <View style={styles.horizFlex}>
            <ToggleField
               value={recoveryAction}
               onToggle={setRecoveryAction}>
               1 action
            </ToggleField>
            <ToggleField
               value={recoveryMinute}
               onToggle={setRecoveryMinute}>
               10 mins
            </ToggleField>
            <NumericField
               initialValue={recoveryMod}
               onNumberChange={setRecoveryMod}>
               1d6+
            </NumericField>
            <ToggleField
               value={recoveryHour}
               onToggle={setRecoveryHour}>
               1 hour
            </ToggleField>
            <ToggleField
               value={recoveryTenHour}
               onToggle={setRecoveryTenHour}>
               10 hours
            </ToggleField>
         </View>
      </View>
   );
};

const styles = StyleSheet.create({
   vertFlex: {
      flexDirection: 'column',
      flexGrow: 1,
   },
   horizFlex: {
      flexDirection: 'row',
      flexGrow: 1,
      flexShrink: 0,
      justifyContent: 'space-around',
   },
   fillInput: {
      flexGrow: 1,
   },
   rightFixed: {
      flexBasis: 'auto',
      flexGrow: 0,
      flexShrink: 0,
      alignSelf: 'center',
      padding: 4,
   },
});
