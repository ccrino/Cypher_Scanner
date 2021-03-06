import React, {
   Dispatch,
   SetStateAction,
   useMemo,
   useState,
} from 'react';
import {
   StyleSheet,
   TouchableOpacity,
   View,
} from 'react-native';
import Character, {
   Attack,
   Equipment,
   LinkSource,
   LinkType,
   Skill,
   Ability,
   StatType,
   ItemType,
} from '../Character';
import {
   makeListSubChangeHandler,
   useNextId,
} from '../StateHandlers';
import {useTheme} from '../Theme';
import {OnListSubChange} from '../types';
import {
   CharacterContext,
   useCharacterBySelector,
   useCharacterProp,
} from '../useCharacter';
import {SkillItem} from './Skills';
import {
   DraggableList,
   DragHandle,
   RemoveHandle,
} from './Draggable';
import {EquipmentItem} from './Equipment';
import {
   DiamondToggle,
   ExpandToggle,
   Picker,
   SmallOrbNumberInput,
} from './Inputs';
import {Section} from './Layout';
import {AbilityItem} from './SpecialAbilities';
import {LabelText, ParagraphField, TextField} from './Text';

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
   pickerWidth: {
      width: 90,
   },
   listNewItemFooter: {
      height: 20,
      marginTop: 5,
      paddingTop: 4,
      borderRadius: 5,
      flexGrow: 1,
   },
   newLinkManager: {
      flexDirection: 'column',
   },
   linkPickerSection: {
      flexDirection: 'row',
      alignItems: 'stretch',
      marginBottom: 100,
      zIndex: 99,
   },
   subListFooter: {
      flexDirection: 'row',
      alignItems: 'stretch',
   },
   sourcePicker: {
      width: 100,
   },
   idPicker: {
      flexGrow: 1,
   },
});

export const AttacksList: React.FC<{}> = () => {
   const [AttackData, setAttackData] =
      useCharacterProp('attacks');
   const nextId = useNextId(AttackData);

   const setAttackSubItem =
      makeListSubChangeHandler(setAttackData);

   const theme = useTheme();
   const color = {
      backgroundColor: theme.lowlight,
   };

   return (
      <Section title="Attacks" color="green">
         <DraggableList
            data={AttackData}
            setData={setAttackData}
            renderChild={(item: Attack) => (
               <AttackItem
                  {...item}
                  onSubItemChange={setAttackSubItem}
               />
            )}
         />
         <TouchableOpacity
            style={[styles.listNewItemFooter, color]}
            onPress={() =>
               setAttackData(
                  AttackData.concat({
                     id: nextId,
                  }),
               )
            }>
            <LabelText>new attack</LabelText>
         </TouchableOpacity>
      </Section>
   );
};

type DamageTypeOption = {
   value: StatType;
};
const damageTypeOptions: DamageTypeOption[] = [
   {value: 'might'},
   {value: 'speed'},
   {value: 'intellect'},
];

interface AttackItemProps extends Attack {
   onSubItemChange: OnListSubChange<Attack>;
}

const AttackItem: React.FC<AttackItemProps> = (
   props: AttackItemProps,
) => {
   const [isExpanded, setIsExpanded] = useState(false);
   const linkData = props.links ?? [];
   const nextId = useNextId(linkData);

   const setLinkData = (
      action: SetStateAction<LinkType[]>,
   ) => {
      let val: LinkType[];
      if (typeof action === 'function') {
         val = action(linkData);
      } else {
         val = action;
      }
      props.onSubItemChange?.(props.id, 'links', val);
   };

   const makeLink = (source: LinkSource, id: number) =>
      props.onSubItemChange?.(
         props.id,
         'links',
         linkData.concat({
            id: nextId,
            linkSource: source,
            linkId: id,
         }),
      );

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
                  props.onSubItemChange?.(
                     props.id,
                     'name',
                     text,
                  )
               }
               style={styles.nameField}
            />
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
                     initialValue={props.damage}
                     onNumberChange={val =>
                        props.onSubItemChange?.(
                           props.id,
                           'damage',
                           val,
                        )
                     }>
                     <LabelText>damage</LabelText>
                  </SmallOrbNumberInput>
                  <Picker
                     selectedValue={props.damageType}
                     style={styles.pickerWidth}
                     options={damageTypeOptions}
                     toDisplayValue={opt =>
                        (opt as DamageTypeOption).value
                     }
                  />
                  <DiamondToggle
                     value={props.ignoresArmor}
                     onValueChange={val =>
                        props.onSubItemChange?.(
                           props.id,
                           'ignoresArmor',
                           val,
                        )
                     }>
                     <LabelText>Ignores Armor</LabelText>
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
               <DraggableList
                  data={linkData}
                  setData={setLinkData}
                  renderChild={(item: LinkType) => (
                     <LinkHost {...item} />
                  )}
               />
               <NewLinkManager onNewLink={makeLink} />
            </>
         )}
      </View>
   );
};

type LinkSourceOption = {value: LinkSource};
const linkSourceOptions: LinkSourceOption[] = [
   {value: 'item'},
   {value: 'skill'},
   {value: 'ability'},
];

interface LinkableItemType extends ItemType {
   name?: string;
}

interface NewLinkManagerProps {
   onNewLink: (source: LinkSource, id: number) => void;
}

interface NewLinkManagerState {
   isExpanded: boolean;
   isReady: boolean;
   source?: LinkSource;
   index?: number;
}
const initLinkManagerState: NewLinkManagerState = {
   isExpanded: false,
   isReady: false,
};

const sourceKeyMap: {[key in LinkSource]: keyof Character} =
   {
      item: 'equipment',
      skill: 'skills',
      ability: 'specialAbilities',
   };

const NewLinkManager: React.FC<NewLinkManagerProps> = (
   props: NewLinkManagerProps,
) => {
   const [linkState, setLinkState] = useState(
      initLinkManagerState,
   );

   const characterKey = linkState.source
      ? sourceKeyMap?.[linkState.source]
      : '';

   const idOptions = (useCharacterBySelector(
      (v: CharacterContext) => {
         if (characterKey === '') {
            return undefined;
         }
         return v[0]?.[characterKey];
      },
   ) ?? []) as LinkableItemType[];

   const theme = useTheme();
   const color = {
      backgroundColor: theme.lowlight,
   };
   const declineColor = {
      backgroundColor: theme.red,
   };
   const acceptColor = {
      backgroundColor: theme.cyan,
   };
   const textColor = {
      color: theme.background,
   };

   const initialState = () => (
      <TouchableOpacity
         style={[styles.listNewItemFooter, color]}
         onPress={() =>
            setLinkState({
               isExpanded: true,
               isReady: false,
               source: undefined,
               index: undefined,
            })
         }>
         <LabelText>create link</LabelText>
      </TouchableOpacity>
   );

   const buildingState = () => (
      <>
         <View style={styles.linkPickerSection}>
            <Picker
               style={styles.sourcePicker}
               options={linkSourceOptions}
               toDisplayValue={opt =>
                  (opt as LinkSourceOption).value
               }
               selectedValue={linkState.source}
               onValueChange={(ind: number) => {
                  const source =
                     linkSourceOptions[ind].value;
                  if (source !== linkState.source) {
                     setLinkState({
                        isExpanded: true,
                        isReady: false,
                        index: undefined,
                        source: source,
                     });
                  }
               }}
            />
            <Picker
               style={styles.idPicker}
               options={idOptions}
               toDisplayValue={opt => {
                  const idOpt = opt as LinkableItemType;
                  return idOpt.name ?? idOpt.id.toString();
               }}
               selectedValue={
                  linkState.index !== undefined
                     ? idOptions[linkState.index].name ??
                       idOptions[
                          linkState.index
                       ].id.toString()
                     : ''
               }
               onValueChange={(ind: number) => {
                  if (
                     ind !== undefined &&
                     ind !== linkState.index
                  ) {
                     setLinkState({
                        ...linkState,
                        index: ind,
                        isReady: true,
                     });
                  }
               }}
            />
         </View>
         <View style={styles.subListFooter}>
            <TouchableOpacity
               style={[
                  styles.listNewItemFooter,
                  declineColor,
               ]}
               onPress={() =>
                  setLinkState(initLinkManagerState)
               }>
               <LabelText style={textColor}>
                  cancel
               </LabelText>
            </TouchableOpacity>
            <TouchableOpacity
               style={[
                  styles.listNewItemFooter,
                  acceptColor,
               ]}
               onPress={() => {
                  if (
                     linkState.source === undefined ||
                     linkState.index === undefined
                  ) {
                     return;
                  }

                  props.onNewLink(
                     linkState.source,
                     idOptions[linkState.index].id,
                  );
                  setLinkState(initLinkManagerState);
               }}>
               <LabelText style={textColor}>
                  create link
               </LabelText>
            </TouchableOpacity>
         </View>
      </>
   );

   return (
      <View style={styles.newLinkManager}>
         {linkState.isExpanded
            ? buildingState()
            : initialState()}
      </View>
   );
};

const emptyData: ItemType[] = [];
type ItemsSupportedByHost = Ability | Skill | Equipment;
type HostOnSubListChange =
   OnListSubChange<ItemsSupportedByHost>;

interface LinkHostProp extends LinkType {}

const LinkHost: React.FC<LinkHostProp> = (
   props: LinkHostProp,
) => {
   const {linkSource, linkId} = props;
   const characterKey = linkSource
      ? sourceKeyMap[linkSource]
      : '';

   const data = (useCharacterBySelector(
      (v: CharacterContext) => {
         if (characterKey === '') {
            return undefined;
         }
         return v?.[0]?.[characterKey];
      },
   ) ?? emptyData) as ItemType[];
   const setData = useCharacterBySelector(
      (v: CharacterContext) => v[1],
   ) as Dispatch<SetStateAction<Character>>;

   const item = useMemo(
      () => data.find(i => i.id === linkId),
      [linkId, data],
   );

   if (
      linkSource === undefined ||
      linkId === undefined ||
      characterKey === ''
   ) {
      return (
         <View style={styles.listItemHeader}>
            <LabelText>Bad Link</LabelText>
            <RemoveHandle id={props.id} />
         </View>
      );
   }

   const setItemSubItem: HostOnSubListChange = (
      id,
      key,
      value,
   ) => {
      setData(s => {
         const prevData = s[characterKey] as any;
         const ind = prevData.findIndex(
            (i: any) => i.id === id,
         );
         const newData = prevData.slice();
         newData[ind] = {
            ...newData[ind],
            [key]: value,
         };
         return newData;
      });
   };

   switch (linkSource) {
      case 'ability':
         return (
            <AbilityItem
               {...(item as Ability)}
               onSubItemChange={setItemSubItem}
            />
         );
      case 'item':
         return (
            <EquipmentItem
               {...(item as Equipment)}
               onSubItemChange={setItemSubItem}
            />
         );
      case 'skill':
         return (
            <SkillItem
               {...(item as Skill)}
               onSubItemChange={setItemSubItem}
            />
         );
   }
};
