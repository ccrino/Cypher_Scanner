import React, {useState} from 'react';
import {
   StyleSheet,
   TouchableOpacity,
   View,
} from 'react-native';
import {Equipment} from '../Character';
import {useCharacterProp} from '../useCharacter';
import {
   DraggableList,
   DragHandle,
   RemoveHandle,
} from './Draggable';
import {ExpandToggle, SmallOrbNumberInput} from './Inputs';
import {Section} from './Layout';
import {
   BigLabelText,
   LabelText,
   ParagraphField,
   TextField,
} from './Text';
import {OnListSubChange} from '../types';
import {useTheme} from '../Theme';
import {
   makeListSubChangeHandler,
   useNextId,
} from '../StateHandlers';

const styles = StyleSheet.create({
   listItem: {
      flexDirection: 'column',
   },
   listItemHeader: {
      flexDirection: 'row',
      alignItems: 'center',
   },
   nameField: {
      flexGrow: 1,
      paddingTop: 8,
      borderWidth: 0,
   },
   listItemSubHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 4,
      zIndex: 99,
   },
   descField: {
      borderWidth: 1,
   },
   listFooter: {
      flexDirection: 'row',
      alignItems: 'stretch',
   },
   listNewItem: {
      marginTop: 5,
      paddingTop: 16,
      borderRadius: 5,
      flexGrow: 1,
   },
   listShinField: {
      flexDirection: 'row',
      alignItems: 'center',
   },
});

export const EquipmentList: React.FC<{}> = () => {
   const [EquipmentData, setEquipmentData] =
      useCharacterProp('equipment');
   const [shins, setShins] = useCharacterProp('shins');
   const nextId = useNextId(EquipmentData);

   const setEquipmentSubItem = makeListSubChangeHandler(
      setEquipmentData,
   );

   const theme = useTheme();
   const color = {
      backgroundColor: theme.lowlight,
   };

   return (
      <Section title="Equipment" color="cyan">
         <DraggableList
            data={EquipmentData}
            setData={setEquipmentData}
            renderChild={(item: Equipment) => (
               <EquipmentItem
                  {...item}
                  onSubItemChange={setEquipmentSubItem}
               />
            )}
         />
         <View style={styles.listFooter}>
            <TouchableOpacity
               style={[styles.listNewItem, color]}
               onPress={() =>
                  setEquipmentData(
                     EquipmentData.concat({
                        id: nextId,
                     }),
                  )
               }>
               <LabelText>new item</LabelText>
            </TouchableOpacity>
            <View style={styles.listShinField}>
               <SmallOrbNumberInput
                  initialValue={shins}
                  onNumberChange={setShins}
               />
               <LabelText>Shins</LabelText>
            </View>
         </View>
      </Section>
   );
};

interface EquipmentItemProps extends Equipment {
   onSubItemChange: OnListSubChange<Equipment>;
}

export const EquipmentItem: React.FC<EquipmentItemProps> = (
   props: EquipmentItemProps,
) => {
   const [isExpanded, setIsExpanded] = useState(false);

   const theme = useTheme();
   const color = {
      borderColor: theme.secondary,
   };

   const makeCountText = () => {
      return props.count ? props.count.toString() : '';
   };

   return (
      <View style={styles.listItem}>
         <View style={styles.listItemHeader}>
            <DragHandle id={props.id} />
            <TextField
               defaultValue={props.name}
               onChangeText={text =>
                  props.onSubItemChange?.(
                     props.id,
                     'name',
                     text,
                  )
               }
               style={styles.nameField}
            />
            <BigLabelText>{makeCountText()}</BigLabelText>
            <ExpandToggle
               value={isExpanded}
               onValueChange={setIsExpanded}
            />
            <RemoveHandle id={props.id} />
         </View>
         {isExpanded && (
            <>
               <View style={styles.listItemSubHeader}>
                  <SmallOrbNumberInput
                     initialValue={props.count}
                     onNumberChange={count =>
                        props.onSubItemChange?.(
                           props.id,
                           'count',
                           count,
                        )
                     }>
                     <LabelText>count</LabelText>
                  </SmallOrbNumberInput>
               </View>
               <ParagraphField
                  style={[styles.descField, color]}
                  value={props.description}
                  onChangeText={text =>
                     props.onSubItemChange?.(
                        props.id,
                        'description',
                        text,
                     )
                  }
               />
            </>
         )}
      </View>
   );
};
