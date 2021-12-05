import React, {useState} from 'react';
import {
   StyleSheet,
   TouchableOpacity,
   View,
} from 'react-native';
import {Cypher} from '../Character';
import {useCharacterProp} from '../useCharacter';
import {
   DraggableList,
   DragHandle,
   RemoveHandle,
} from './Draggable';
import {
   ExpandToggle,
   Picker,
   SmallOrbNumberInput,
} from './Inputs';
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
   warnIcon: {
      alignItems: 'center',
      justifyContent: 'center',
      height: 30,
      width: 30,
      marginHorizontal: 4,
      borderRadius: 2,
   },
   listItemSubHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 4,
      zIndex: 99,
   },
   pickerWidth: {
      width: 90,
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
   listLimitField: {
      flexDirection: 'row',
      alignItems: 'center',
   },
});

export const Cyphers: React.FC<{}> = () => {
   const [cypherData, setCypherData] =
      useCharacterProp('cyphers');
   const [cypherLimit, setCypherLimit] =
      useCharacterProp('cypherLimit');
   let nextId = 0;

   const setCypherItem = (id: number, cypher: Cypher) => {
      setCypherData((s: Cypher[]) => {
         const newCypherData = s.slice();
         newCypherData[s.findIndex(i => i.id === id)] =
            cypher;
         return newCypherData;
      });
   };

   const renderChild = (item: Cypher, ind: number) => {
      nextId = Math.max(nextId, item.id);
      return (
         <CypherItem
            {...item}
            onChange={setCypherItem}
            isOverLimit={
               !!(cypherLimit && ind >= cypherLimit)
            }
         />
      );
   };

   const theme = useTheme();
   const color = {
      backgroundColor: theme.lowlight,
   };

   return (
      <Section title="Cyphers" color="violet">
         <DraggableList
            data={cypherData}
            setData={setCypherData}
            renderChild={renderChild}
         />
         <View style={styles.listFooter}>
            <TouchableOpacity
               style={[styles.listNewItem, color]}
               onPress={() => {
                  const newCypherData = cypherData.concat({
                     id: nextId + 1,
                  });
                  setCypherData(newCypherData);
               }}>
               <LabelText>new cypher</LabelText>
            </TouchableOpacity>
            <View style={styles.listLimitField}>
               <SmallOrbNumberInput
                  initialValue={cypherLimit}
                  onNumberChange={setCypherLimit}
               />
               <LabelText>Limit</LabelText>
            </View>
         </View>
      </Section>
   );
};

interface CypherItemProps extends Cypher {
   onChange: OnListChange<Cypher>;
   isOverLimit?: boolean;
}

const formPickerOptions: {
   value: 'internal' | 'wearable' | 'useable';
}[] = [
   {value: 'internal'},
   {value: 'wearable'},
   {value: 'useable'},
];

const CypherItem: React.FC<CypherItemProps> = (
   props: CypherItemProps,
) => {
   const [isExpanded, setIsExpanded] = useState(false);

   const sendUpdate = <K extends keyof Cypher>(
      key: K,
      val: Cypher[K],
   ) => {
      const newCypherData: Cypher = {
         ...(props as Cypher),
      };
      newCypherData[key] = val;
      props.onChange?.(props.id, newCypherData);
   };

   const theme = useTheme();
   const color = {
      borderColor: theme.secondary,
   };
   const warn = {
      backgroundColor: theme.red,
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
            {props.isOverLimit && (
               <View style={[styles.warnIcon, warn]}>
                  <BigLabelText>😬</BigLabelText>
               </View>
            )}
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
                     initialValue={props.level}
                     onNumberChange={level =>
                        sendUpdate('level', level)
                     }>
                     <LabelText>Level</LabelText>
                  </SmallOrbNumberInput>
                  <Picker
                     selectedValue={props.form}
                     options={formPickerOptions}
                     onValueChange={ind =>
                        sendUpdate(
                           'form',
                           formPickerOptions[ind].value,
                        )
                     }
                     style={styles.pickerWidth}
                  />
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
