import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useCharacterProp} from '../useCharacter';
import ToggleField from './ToggleField';

interface DamageTrackProps {}

export const DamageTrack: React.FC<DamageTrackProps> = (
   _props: DamageTrackProps,
) => {
   const [Dead, setDead] = useCharacterProp('Dead');
   const [Debilitated, setDebilitated] =
      useCharacterProp('Debilitated');
   const [Impaired, setImpaired] =
      useCharacterProp('Impaired');

   const DeadColor = {
      flexGrow: 1,
      backgroundColor: Dead
         ? 'red'
         : Debilitated
         ? 'orange'
         : Impaired
         ? 'yellow'
         : '#0000',
   };
   const DebiliatedColor = {
      flexGrow: 1,
      backgroundColor: Debilitated
         ? 'orange'
         : Impaired
         ? 'yellow'
         : '#0000',
   };
   const ImpairedColor = {
      flexGrow: 1,
      backgroundColor: Impaired ? 'yellow' : '#0000',
   };

   return (
      <View style={styles.track}>
         <View style={DeadColor}>
            <ToggleField
               thumbColor={'white'}
               trackColor={{false: '#0000', true: 'red'}}
               value={Dead}
               onToggle={setDead}>
               Dead
            </ToggleField>
         </View>
         <View style={DebiliatedColor}>
            <ToggleField
               thumbColor={'white'}
               trackColor={{false: '#0000', true: 'orange'}}
               value={Debilitated}
               onToggle={setDebilitated}>
               Debilitated
            </ToggleField>
         </View>
         <View style={ImpairedColor}>
            <ToggleField
               thumbColor={'white'}
               trackColor={{false: '#0000', true: 'yellow'}}
               value={Impaired}
               onToggle={setImpaired}>
               Impaired
            </ToggleField>
         </View>
      </View>
   );
};

const styles = StyleSheet.create({
   track: {
      flexDirection: 'row',
      justifyContent: 'space-around',
   },
   toggle: {},
});
