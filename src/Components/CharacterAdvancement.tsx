import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useCharacterProp} from '../useCharacter';
import {NumericBaseInput} from './Inputs';
import {HorizontalBar} from './Layout';
import {
   BigLabelText,
   LabelText,
   SmallLabelText,
} from './Text';
import {ToggleField} from './ToggleField';

export const CharacterAdvancement: React.FC<{}> = () => {
   const [tier, setTier] = useCharacterProp('tier');
   const [effort, setEffort] = useCharacterProp('effort');
   const [xp, setXP] = useCharacterProp('xp');

   const [increaseCapabilities, setIncreaseCapabilities] =
      useCharacterProp('increaseCapabilities');
   const [extraEffort, setExtraEffort] =
      useCharacterProp('extraEffort');
   const [moveTowardsPerfection, setMoveTowardsPerfection] =
      useCharacterProp('moveTowardPerfection');
   const [skillTraining, setSkillTraining] =
      useCharacterProp('skillTraining');
   const [otherAdvancement, setOtherAdvancement] =
      useCharacterProp('otherAdvancement');

   return (
      <View style={styles.body}>
         <BigLabelText>Advancement</BigLabelText>
         <HorizontalBar />
         <View style={styles.horizFlex}>
            <NumericBaseInput
               initialValue={tier}
               onNumberChange={setTier}>
               Tier
            </NumericBaseInput>
            <NumericBaseInput
               initialValue={effort}
               onNumberChange={setEffort}>
               Effort
            </NumericBaseInput>
            <NumericBaseInput
               initialValue={xp}
               onNumberChange={setXP}>
               XP
            </NumericBaseInput>
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
