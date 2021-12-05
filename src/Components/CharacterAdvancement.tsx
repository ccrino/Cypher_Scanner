import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useCharacterProp} from '../useCharacter';
import {HorizontalBar} from './Layout';
import {NumericField} from './NumericField';
import {
   BigLabelText,
   LabelText,
   SmallLabelText,
} from './Text';
import {ToggleField} from './ToggleField';

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
      <View style={styles.body}>
         <BigLabelText>Advancement</BigLabelText>
         <HorizontalBar />
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
         <HorizontalBar />
         <ToggleSection
            title="Increase Capabilities"
            subtext="+4 to stat pools"
            value={increaseCapabilities}
            onToggle={setIncreaseCapabilities}
         />
         <ToggleSection
            title="Extra Effort"
            subtext="+1 to effort"
            value={extraEffort}
            onToggle={setExtraEffort}
         />
         <ToggleSection
            title="Move Towards Perfection"
            subtext="+1 to edge"
            value={moveTowardsPerfection}
            onToggle={setMoveTowardsPerfection}
         />
         <ToggleSection
            title="Skill Training"
            subtext="Train or specialize in a skill"
            value={skillTraining}
            onToggle={setSkillTraining}
         />
         <ToggleSection
            title="Other"
            subtext="Refer to numenera discovery"
            value={otherAdvancement}
            onToggle={setOtherAdvancement}
         />
      </View>
   );
};

interface ToggleSectionProps {
   title?: string;
   subtext?: string;
   value?: boolean;
   onToggle?: (v: boolean) => void;
}

const ToggleSection: React.FC<ToggleSectionProps> = (
   props: ToggleSectionProps,
) => {
   return (
      <View style={styles.tableRow}>
         <View style={styles.sectCol}>
            <LabelText style={styles.leftAlign}>
               {props.title}
            </LabelText>
            <SmallLabelText style={styles.leftAlign}>
               {props.subtext}
            </SmallLabelText>
         </View>
         <ToggleField
            style={styles.rightAlign}
            value={props.value}
            onToggle={props.onToggle}
         />
      </View>
   );
};

const styles = StyleSheet.create({
   body: {
      flexDirection: 'column',
      flexGrow: 1,
      marginBottom: 10,
   },
   horizFlex: {
      flexDirection: 'row',
      flexGrow: 1,
      flexShrink: 0,
      justifyContent: 'space-around',
   },
   tableRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 10,
   },
   sectCol: {
      flexDirection: 'column',
      alignContent: 'flex-start',
   },
   leftAlign: {
      textAlign: 'left',
      marginLeft: 8,
   },
   fillInput: {
      flexGrow: 1,
   },
   rightAlign: {
      marginRight: 8,
   },
});
