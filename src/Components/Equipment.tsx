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
import {OnListChange} from '../types';
import {useTheme} from '../Theme';

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
   let nextId = 0;

   const setEquipmentItem = (
      id: number,
      equipment: Equipment,
   ) => {
      setEquipmentData((s: Equipment[]) => {
         const newEquipmentData = s.slice();
         newEquipmentData[s.findIndex(i => i.id === id)] =
            equipment;
         return newEquipmentData;
      });
   };

   const renderChild = (item: Equipment) => {
      nextId = Math.max(nextId, item.id);
      return (
         <EquipmentItem
            {...item}
            onChange={setEquipmentItem}
         />
      );
   };

   const theme = useTheme();
   const color = {
      backgroundColor: theme.lowlight,
   };

   return (
      <Section title="Equipment" color="cyan">
         <DraggableList
            data={EquipmentData}
            setData={setEquipmentData}
            renderChild={renderChild}
         />
         <View style={styles.listFooter}>
            <TouchableOpacity
               style={[styles.listNewItem, color]}
               onPress={() => {
                  const newEquipmentData =
                     EquipmentData.concat({
                        id: nextId + 1,
                     });
                  setEquipmentData(newEquipmentData);
               }}>
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
   onChange: OnListChange<Equipment>;
}

export const EquipmentItem: React.FC<EquipmentItemProps> = (
   props: EquipmentItemProps,
) => {
   const [isExpanded, setIsExpanded] = useState(false);

   const sendUpdate = <K extends keyof Equipment>(
      key: K,
      val: Equipment[K],
   ) => {
      const newEquipmentData: Equipment = {
         ...(props as Equipment),
      };
      newEquipmentData[key] = val;
      props.onChange?.(props.id, newEquipmentData);
   };

   const makeCountText = () => {
      return props.count ? props.count.toString() : '';
   };

   const theme = useTheme();
   const color = {
      borderColor: theme.secondary,
   };

   return (
      <View style={styles.listItem}>
         <View style={styles.listItemHeader}>
            <DragHandle id={props.id} />
            <TextField
               defaultValue={props.name}
               onChangeText={text =>
                  sendUpdate('name', text)
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
                        sendUpdate('count', count)
                     }>
                     <LabelText>count</LabelText>
                  </SmallOrbNumberInput>
               </View>
               <ParagraphField
                  style={[styles.descField, color]}
                  value={props.description}
                  onChangeText={text =>
                     sendUpdate('description', text)
                  }
               />
            </>
         )}
      </View>
   );
};
