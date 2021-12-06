import React, {useState} from 'react';
import {
   StyleSheet,
   TouchableOpacity,
   View,
} from 'react-native';
import {Ability as Ability, StatType} from '../Character';
import {
   makeListSubChangeHandler,
   useNextId,
} from '../StateHandlers';
import {useTheme} from '../Theme';
import {OnListSubChange} from '../types';
import {useCharacterProp} from '../useCharacter';
import {
   DraggableList,
   DragHandle,
   RemoveHandle,
} from './Draggable';
import {
   DiamondToggle,
   ExpandToggle,
   Picker,
   SmallOrbNumberInput,
   TextToggle,
} from './Inputs';
import {Section} from './Layout';
import {
   BigLabelText,
   LabelText,
   ParagraphField,
   SmallLabelText,
   TextField,
} from './Text';

const styles = StyleSheet.create({
   listItem: {
      flexDirection: 'row',
      alignItems: 'center',
   },
   listItemSubHeader: {
      flexDirection: 'row',
      marginBottom: 8,
      justifyContent: 'space-between',
      alignItems: 'center',
      zIndex: 99,
   },
   nameField: {
      flexGrow: 1,
      paddingTop: 8,
      borderWidth: 0,
   },
   pickerWidth: {
      width: 90,
   },
   descField: {
      borderWidth: 1,
   },
   newItemFooter: {
      height: 20,
      marginTop: 5,
      paddingTop: 4,
      borderRadius: 5,
   },
});

export const SpecialAbilities: React.FC<{}> = () => {
   const [abilityData, setAbilityData] = useCharacterProp(
      'specialAbilities',
   );
   const nextId = useNextId(abilityData);

   const setAbilitySubItem =
      makeListSubChangeHandler(setAbilityData);

   const theme = useTheme();
   const color = {
      backgroundColor: theme.lowlight,
   };

   return (
      <Section title="Special Abilities" color="magenta">
         <DraggableList
            data={abilityData}
            setData={setAbilityData}
            renderChild={(item: Ability) => (
               <AbilityItem
                  {...item}
                  onSubItemChange={setAbilitySubItem}
               />
            )}
         />
         <TouchableOpacity
            style={[styles.newItemFooter, color]}
            onPress={() =>
               setAbilityData(
                  abilityData.concat({
                     id: nextId,
                  }),
               )
            }>
            <LabelText>new ability</LabelText>
         </TouchableOpacity>
      </Section>
   );
};

interface AbilityItemProps extends Ability {
   onSubItemChange: OnListSubChange<Ability>;
}

type CostPoolOption = {
   value: StatType;
};
const costPoolOptions: CostPoolOption[] = [
   {value: 'might'},
   {value: 'speed'},
   {value: 'intellect'},
];

export const AbilityItem: React.FC<AbilityItemProps> = (
   props: AbilityItemProps,
) => {
   const [isExpanded, setIsExpanded] = useState(false);

   const theme = useTheme();
   const backdrop = {
      backgroundColor: theme.background,
   };
   const color = {
      borderColor: theme.secondary,
   };

   const makeCostText = () => {
      return (
         (props.hasCost && props.cost && props.costPool
            ? `(${props.cost}${props.costPlus ? '+' : ''} ${
                 props.costPool
              } pts)`
            : '') + (props.enabler ? 'e.' : '')
      );
   };

   return (
      <View style={[backdrop]}>
         <View style={styles.listItem}>
            <DragHandle id={props.id} />
            <TextField
               defaultValue={props.name}
               style={styles.nameField}
               onChangeText={text =>
                  props.onSubItemChange?.(
                     props.id,
                     'name',
                     text,
                  )
               }
            />
            <LabelText>{makeCostText()}</LabelText>
            <ExpandToggle
               value={isExpanded}
               onValueChange={setIsExpanded}
            />
            <RemoveHandle id={props.id} />
         </View>
         {isExpanded && (
            <>
               <View style={styles.listItemSubHeader}>
                  <DiamondToggle
                     value={props.hasCost}
                     onValueChange={val =>
                        props.onSubItemChange?.(
                           props.id,
                           'hasCost',
                           val,
                        )
                     }>
                     <SmallLabelText>
                        has cost?
                     </SmallLabelText>
                  </DiamondToggle>
                  {props.hasCost && (
                     <>
                        <TextToggle
                           value={props.costPlus}
                           onValueChange={val =>
                              props.onSubItemChange?.(
                                 props.id,
                                 'costPlus',
                                 val,
                              )
                           }>
                           <BigLabelText>
                              {props.costPlus ? '+' : '='}
                           </BigLabelText>
                        </TextToggle>
                        <SmallOrbNumberInput
                           initialValue={props.cost}
                           onNumberChange={val =>
                              props.onSubItemChange?.(
                                 props.id,
                                 'cost',
                                 val,
                              )
                           }
                        />
                        <Picker
                           selectedValue={props.costPool}
                           onValueChange={ind => {
                              props.onSubItemChange?.(
                                 props.id,
                                 'costPool',
                                 costPoolOptions[ind].value,
                              );
                           }}
                           style={styles.pickerWidth}
                           options={costPoolOptions}
                           toDisplayValue={opt =>
                              (opt as CostPoolOption).value
                           }
                        />
                     </>
                  )}
                  <DiamondToggle
                     value={props.enabler}
                     onValueChange={val =>
                        props.onSubItemChange?.(
                           props.id,
                           'enabler',
                           val,
                        )
                     }>
                     <SmallLabelText>
                        enabler?
                     </SmallLabelText>
                  </DiamondToggle>
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
