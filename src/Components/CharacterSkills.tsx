import React from 'react';
import {
   StyleSheet,
   TouchableOpacity,
   View,
} from 'react-native';
import {DiamondToggle} from './Inputs';
import {Section} from './Layout';
import {BigLabelText, LabelText, TextField} from './Text';
import {
   DraggableList,
   DragHandle,
   RemoveHandle,
} from './Draggable';
import {useTheme} from '../Theme';
import {useCharacterProp} from '../useCharacter';
import {Skill} from '../Character';

export const CharacterSkills: React.FC<{}> = () => {
   const [skillData, setSkillData] =
      useCharacterProp('skills');
   let nextId = 0;

   const setSkillItem = (id: number, skill: Skill) => {
      setSkillData((s: Skill[]) => {
         const newSkillData = s.slice();
         newSkillData[s.findIndex(i => i.id === id)] =
            skill;
         return newSkillData;
      });
   };

   const renderChild = (item: Skill) => {
      nextId = Math.max(nextId, item.id);
      return (
         <SkillListItem {...item} onChange={setSkillItem} />
      );
   };

   const theme = useTheme();
   const color = {
      backgroundColor: theme.lowlight,
   };

   return (
      <Section title="Skills / Inabilities" color="blue">
         <View style={styles.skillsHeader}>
            <View style={styles.spacerHandles} />
            <View style={styles.fillSpacer} />
            <BigLabelText style={styles.ColumnText}>
               I
            </BigLabelText>
            <BigLabelText style={styles.ColumnText}>
               T
            </BigLabelText>
            <BigLabelText style={styles.ColumnText}>
               S
            </BigLabelText>
            <View style={styles.spacerHandles} />
         </View>
         <DraggableList
            data={skillData}
            setData={setSkillData}
            renderChild={renderChild}
         />
         <TouchableOpacity
            style={[styles.newSkillFooter, color]}
            onPress={() => {
               const newSkillData = skillData.concat({
                  id: nextId + 1,
               });
               setSkillData(newSkillData);
            }}>
            <LabelText>new skill</LabelText>
         </TouchableOpacity>
      </Section>
   );
};

interface SkillListItemProps extends Skill {
   onChange?: (id: number, skill: Skill) => void;
}

const SkillListItem: React.FC<SkillListItemProps> = (
   props: SkillListItemProps,
) => {
   const sendUpdate = <T extends Skill, K extends keyof T>(
      key: K,
      val: T[K],
   ) => {
      const newSkillData: T = {
         ...(props as T),
      };
      newSkillData[key] = val;
      props.onChange?.(props.id, newSkillData);
   };

   const theme = useTheme();
   const color = {
      backgroundColor: theme.background,
   };

   return (
      <View style={[styles.listItem, color]}>
         <DragHandle id={props.id} />
         <TextField
            defaultValue={props.name}
            style={styles.skillField}
            onChangeText={(text: string) => {
               sendUpdate('name', text);
            }}
         />
         <DiamondToggle
            value={props.inability}
            onValueChange={(val: boolean) =>
               sendUpdate('inability', val)
            }
         />
         <DiamondToggle
            value={props.trained}
            onValueChange={(val: boolean) =>
               sendUpdate('trained', val)
            }
         />
         <DiamondToggle
            value={props.specialized}
            onValueChange={(val: boolean) =>
               sendUpdate('specialized', val)
            }
         />
         <RemoveHandle id={props.id} />
      </View>
   );
};

const styles = StyleSheet.create({
   listItem: {
      flexDirection: 'row',
   },
   skillField: {
      flexGrow: 1,
      paddingTop: 8,
      borderWidth: 0,
   },
   skillsHeader: {
      flexDirection: 'row',
   },
   newSkillFooter: {
      height: 20,
      marginTop: 5,
      paddingTop: 4,
      borderRadius: 5,
   },
   ColumnText: {
      width: 28,
      flexGrow: 0,
   },
   spacerHandles: {
      width: 25,
      flexGrow: 0,
   },
   fillSpacer: {
      flexGrow: 1,
   },
});
