import React, {useState} from 'react';
import {
   StyleSheet,
   TouchableOpacity,
   View,
} from 'react-native';
import {SpecialAbility, StatType} from '../Character';
import {useTheme} from '../Theme';
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
   expCol: {
      flexDirection: 'row',
      marginBottom: 8,
      justifyContent: 'space-between',
      alignItems: 'center',
      zIndex: 99,
   },
   expRow: {
      flexDirection: 'column',
      flexGrow: 1,
   },
   nameField: {
      flexGrow: 1,
      paddingTop: 8,
      borderWidth: 0,
   },
   costField: {
      textAlign: 'center',
      margin: 5,
      fontSize: 20,
      paddingTop: 5,
      height: 40,
      width: 40,
      minWidth: 40,
      borderWidth: 1,
      borderRadius: 20,
   },
   pickerField: {
      width: 90,
   },
   descField: {
      borderWidth: 1,
   },
   newAbilityFooter: {
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
   let nextId = 0;

   const setAbilityItem = (
      id: number,
      ability: SpecialAbility,
   ) => {
      setAbilityData((s: SpecialAbility[]) => {
         const newAbilityData = s.slice();
         newAbilityData[s.findIndex(i => i.id === id)] =
            ability;
         return newAbilityData;
      });
   };

   const renderChild = (item: SpecialAbility) => {
      nextId = Math.max(nextId, item.id);
      return (
         <AbilityItem {...item} onChange={setAbilityItem} />
      );
   };

   const theme = useTheme();
   const color = {
      backgroundColor: theme.lowlight,
   };

   return (
      <Section title="Special Abilities" color="magenta">
         <DraggableList
            data={abilityData}
            setData={setAbilityData}
            renderChild={renderChild}
         />
         <TouchableOpacity
            style={[styles.newAbilityFooter, color]}
            onPress={() => {
               const newAbilityData = abilityData.concat({
                  id: nextId + 1,
               });
               setAbilityData(newAbilityData);
            }}>
            <LabelText>new ability</LabelText>
         </TouchableOpacity>
      </Section>
   );
};

interface AbilityItemProps extends SpecialAbility {
   onChange: (id: number, item: SpecialAbility) => void;
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

   const sendUpdate = <K extends keyof SpecialAbility>(
      key: K,
      val: SpecialAbility[K],
   ) => {
      const newAbilityData: SpecialAbility = {
         ...(props as SpecialAbility),
      };
      newAbilityData[key] = val;
      props.onChange?.(props.id, newAbilityData);
   };

   const makeCostText = () => {
      return (
         (props.hasCost && props.cost && props.costPool
            ? '(' +
              props.cost +
              (props.costPlus ? '+ ' : ' ') +
              props.costPool +
              ' pts) '
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
                  sendUpdate('name', text)
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
            <View style={styles.expRow}>
               <View style={styles.expCol}>
                  <DiamondToggle
                     value={props.hasCost}
                     onValueChange={val =>
                        sendUpdate('hasCost', val)
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
                              sendUpdate('costPlus', val)
                           }>
                           <BigLabelText>
                              {props.costPlus ? '+' : '='}
                           </BigLabelText>
                        </TextToggle>
                        <SmallOrbNumberInput
                           initialValue={props.cost}
                           onNumberChange={val =>
                              sendUpdate('cost', val)
                           }
                        />
                        <Picker
                           selectedValue={props.costPool}
                           onValueChange={ind => {
                              sendUpdate(
                                 'costPool',
                                 costPoolOptions[ind].value,
                              );
                           }}
                           style={styles.pickerField}
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
                        sendUpdate('enabler', val)
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
                     sendUpdate('description', text)
                  }
               />
            </View>
         )}
      </View>
   );
};
