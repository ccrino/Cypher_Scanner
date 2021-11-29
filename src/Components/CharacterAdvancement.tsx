import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useCharacterProp} from '../useCharacter';
import {NumericField} from './NumericField';
import {BigLabelText, LabelText} from './Text';
import ToggleField from './ToggleField';

export const CharacterAdvancement: React.FC<{}> = () => {
   const [tier, setTier] = useCharacterProp('Tier');
   const [effort, setEffort] = useCharacterProp('Effort');
   const [xp, setXP] = useCharacterProp('XP');

   const [increaseCapabilities, setIncreaseCapabilities] =
      useCharacterProp('IncreaseCapabilities');
   const [extraEffort, setExtraEffort] =
      useCharacterProp('ExtraEffort');
   const [moveTowardsPerfection, setMoveTowardsPerfection] =
      useCharacterProp('MoveTowardPerfection');
   const [skillTraining, setSkillTraining] =
      useCharacterProp('SkillTraining');
   const [otherAdvancement, setOtherAdvancement] =
      useCharacterProp('OtherAdvancement');

   return (
      <View style={styles.vertFlex}>
         <BigLabelText>Advancement</BigLabelText>
         <View style={styles.horizFlex}>
            <NumericField
               initialValue={tier}
               onNumberChange={setTier}>
               Tier
            </NumericField>
            <NumericField
               initialValue={effort}
               onNumberChange={setEffort}>
               Effort
            </NumericField>
            <NumericField
               initialValue={xp}
               onNumberChange={setXP}>
               XP
            </NumericField>
         </View>
         <View style={styles.horizFlex}>
            <LabelText>Increase Capabilities</LabelText>
            <ToggleField
               value={increaseCapabilities}
               onToggle={setIncreaseCapabilities}
            />
         </View>
         <View style={styles.horizFlex}>
            <LabelText>Extra Effort</LabelText>
            <ToggleField
               value={extraEffort}
               onToggle={setExtraEffort}
            />
         </View>
         <View style={styles.horizFlex}>
            <LabelText>Move Towards Perfection</LabelText>
            <ToggleField
               value={moveTowardsPerfection}
               onToggle={setMoveTowardsPerfection}
            />
         </View>
         <View style={styles.horizFlex}>
            <LabelText>Skill Training</LabelText>
            <ToggleField
               value={skillTraining}
               onToggle={setSkillTraining}
            />
         </View>
         <View style={styles.horizFlex}>
            <LabelText>Other</LabelText>
            <ToggleField
               value={otherAdvancement}
               onToggle={setOtherAdvancement}
            />
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
