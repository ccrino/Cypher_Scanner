import React, {useState} from 'react';
import {
   StyleSheet,
   TouchableOpacity,
   View,
} from 'react-native';
import {Cypher, CypherForm} from '../Character';
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
      minWidth: 100,
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
   const nextId = useNextId(cypherData);

   const setCypherSubItem =
      makeListSubChangeHandler(setCypherData);

   const theme = useTheme();
   const color = {
      backgroundColor: theme.lowlight,
   };

   return (
      <Section title="Cyphers" color="violet">
         <DraggableList
            data={cypherData}
            setData={setCypherData}
            renderChild={(item: Cypher, ind: number) => (
               <CypherItem
                  {...item}
                  onChange={setCypherSubItem}
                  isOverLimit={
                     !!(cypherLimit && ind >= cypherLimit)
                  }
               />
            )}
         />
         <View style={styles.listFooter}>
            <TouchableOpacity
               style={[styles.listNewItem, color]}
               onPress={() =>
                  setCypherData(
                     cypherData.concat({
                        id: nextId,
                     }),
                  )
               }>
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
   onChange: OnListSubChange<Cypher>;
   isOverLimit?: boolean;
}

interface CypherFormOption {
   value: CypherForm;
}
const cypherFormOptions: CypherFormOption[] = [
   {value: 'internal'},
   {value: 'wearable'},
   {value: 'useable'},
];

const CypherItem: React.FC<CypherItemProps> = (
   props: CypherItemProps,
) => {
   const [isExpanded, setIsExpanded] = useState(false);
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
                  props.onChange?.(props.id, 'name', text)
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
                        props.onChange?.(
                           props.id,
                           'level',
                           level,
                        )
                     }>
                     <LabelText>Level</LabelText>
                  </SmallOrbNumberInput>
                  <Picker
                     selectedValue={props.form}
                     options={cypherFormOptions}
                     toDisplayValue={option =>
                        (option as CypherFormOption).value
                     }
                     onValueChange={ind =>
                        props.onChange?.(
                           props.id,
                           'form',
                           cypherFormOptions[ind].value,
                        )
                     }
                     style={styles.pickerWidth}
                  />
               </View>
               <ParagraphField
                  style={[styles.descField, color]}
                  value={props.description}
                  onChangeText={text =>
                     props.onChange?.(
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
