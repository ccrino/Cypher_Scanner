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
import {
   makeListSubChangeHandler,
   useNextId,
} from '../StateHandlers';
import {OnListSubChange} from '../types';

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

export const CharacterSkills: React.FC<{}> = () => {
   const [skillData, setSkillData] =
      useCharacterProp('skills');
   const nextId = useNextId(skillData);

   const setSkillSubItem =
      makeListSubChangeHandler(setSkillData);

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
            renderChild={(item: Skill) => (
               <SkillItem
                  {...item}
                  onSubItemChange={setSkillSubItem}
               />
            )}
         />
         <TouchableOpacity
            style={[styles.newSkillFooter, color]}
            onPress={() =>
               setSkillData(
                  skillData.concat({
                     id: nextId,
                  }),
               )
            }>
            <LabelText>new skill</LabelText>
         </TouchableOpacity>
      </Section>
   );
};

interface SkillListItemProps extends Skill {
   onSubItemChange?: OnListSubChange<Skill>;
}

export const SkillItem: React.FC<SkillListItemProps> = (
   props: SkillListItemProps,
) => {
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
               props.onSubItemChange?.(
                  props.id,
                  'name',
                  text,
               );
            }}
         />
         <DiamondToggle
            value={props.inability}
            onValueChange={(val: boolean) =>
               props.onSubItemChange?.(
                  props.id,
                  'inability',
                  val,
               )
            }
         />
         <DiamondToggle
            value={props.trained}
            onValueChange={(val: boolean) =>
               props.onSubItemChange?.(
                  props.id,
                  'trained',
                  val,
               )
            }
         />
         <DiamondToggle
            value={props.specialized}
            onValueChange={(val: boolean) =>
               props.onSubItemChange?.(
                  props.id,
                  'specialized',
                  val,
               )
            }
         />
         <RemoveHandle id={props.id} />
      </View>
   );
};
