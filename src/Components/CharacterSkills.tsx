import React from 'react';
import {
   StyleSheet,
   TouchableOpacity,
   View,
} from 'react-native';
import {BoxToggle} from './Inputs';
import {Section} from './Layout';
import {BigLabelText, LabelText, TextField} from './Text';
import {
   DraggableList,
   DragHandle,
   RemovePress,
} from './Draggable';
import {useTheme} from '../Theme';
import {useCharacterProp} from '../useCharacter';

export const CharacterSkills: React.FC<{}> = () => {
   const [skillData, setSkillData] =
      useCharacterProp('Skills');
   let nextId = 0;

   const setSkillItem = (
      id: number,
      skill: SkillListItemProps,
   ) => {
      setSkillData((s: SkillListItem[]) => {
         const newSkillData = s.slice();
         newSkillData[s.findIndex(i => i.id === id)] =
            skill;
         return newSkillData;
      });
   };

   const renderChild = (item: SkillListItem) => {
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

interface SkillListItem {
   id: number;
   name?: string;
   inability?: boolean;
   trained?: boolean;
   specialized?: boolean;
}

interface SkillListItemProps extends SkillListItem {
   onChange?: (id: number, skill: SkillListItem) => void;
}

const SkillListItem: React.FC<SkillListItemProps> = (
   props: SkillListItemProps,
) => {
   const sendUpdate = <
      T extends SkillListItem,
      K extends keyof T,
   >(
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
         <BoxToggle
            value={props.inability}
            onValueChange={(val: boolean) =>
               sendUpdate('inability', val)
            }
         />
         <BoxToggle
            value={props.trained}
            onValueChange={(val: boolean) =>
               sendUpdate('trained', val)
            }
         />
         <BoxToggle
            value={props.specialized}
            onValueChange={(val: boolean) =>
               sendUpdate('specialized', val)
            }
         />
         <RemovePress id={props.id} />
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
