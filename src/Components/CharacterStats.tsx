import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useTheme} from '../Theme';
import {useCharacterProp} from '../useCharacter';
import {NumericField} from './NumericField';
import {BigLabelText} from './Text';

const styles = StyleSheet.create({
   body: {
      marginBottom: 40,
   },
   statBody: {
      flexDirection: 'row',
   },
   edgePool: {
      flexDirection: 'column',
      alignSelf: 'flex-end',
   },
   smallInput: {
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
   largeInput: {
      textAlign: 'center',
      padding: 15,
      margin: 5,
      fontSize: 40,
      height: 90,
      width: 90,
      borderWidth: 1,
      borderRadius: 45,
   },
});

export const CharacterStats: React.FC<{}> = () => {
   const [might, setMight] = useCharacterProp('Might');
   const [mightPool, setMightPool] =
      useCharacterProp('MightPool');
   const [mightEdge, setMightEdge] =
      useCharacterProp('MightEdge');
   const [speed, setSpeed] = useCharacterProp('Speed');
   const [speedPool, setSpeedPool] =
      useCharacterProp('SpeedPool');
   const [speedEdge, setSpeedEdge] =
      useCharacterProp('SpeedEdge');
   const [speedCost, setSpeedCost] =
      useCharacterProp('SpeedCost');
   const [armor, setArmor] = useCharacterProp('Armor');
   const [intellect, setIntellect] =
      useCharacterProp('Intellect');
   const [intellectPool, setIntellectPool] =
      useCharacterProp('IntellectPool');
   const [intellectEdge, setIntellectEdge] =
      useCharacterProp('IntellectEdge');

   return (
      <View style={styles.body}>
         <Stats
            pool={mightPool}
            onPoolChange={setMightPool}
            edge={mightEdge}
            onEdgeChange={setMightEdge}
            value={might}
            onStatChange={setMight}
            name="Might"
         />
         <Stats
            pool={speedPool}
            onPoolChange={setSpeedPool}
            edge={speedEdge}
            onEdgeChange={setSpeedEdge}
            value={speed}
            onStatChange={setSpeed}
            name="Speed"
            showCost
            cost={speedCost}
            onCostChange={setSpeedCost}
            armor={armor}
            onArmorChange={setArmor}
         />
         <Stats
            pool={intellectPool}
            onPoolChange={setIntellectPool}
            edge={intellectEdge}
            onEdgeChange={setIntellectEdge}
            value={intellect}
            onStatChange={setIntellect}
            name="Intellect"
         />
      </View>
   );
};

interface StatsProps {
   pool?: number;
   onPoolChange?: (val: number) => void;
   edge?: number;
   onEdgeChange?: (val: number) => void;
   value?: number;
   onStatChange?: (val: number) => void;
   name?: string;
   showCost?: boolean;
   cost?: number;
   onCostChange?: (val: number) => void;
   armor?: number;
   onArmorChange?: (val: number) => void;
}

export const Stats: React.FC<StatsProps> = (
   props: StatsProps,
) => {
   const theme = useTheme();
   const color = {
      borderColor: theme.secondary,
      backgroundColor: theme.lowlight,
   };

   return (
      <View style={styles.statBody}>
         <View style={styles.edgePool}>
            <NumericField
               initialValue={props.pool ?? 0}
               onNumberChange={props.onPoolChange}
               maxLength={2}
               style={[styles.smallInput, color]}>
               Pool
            </NumericField>
            <NumericField
               initialValue={props.edge ?? 0}
               onNumberChange={props.onEdgeChange}
               maxLength={2}
               style={[styles.smallInput, color]}>
               Edge
            </NumericField>
         </View>
         <View style={styles.edgePool}>
            <NumericField
               initialValue={props.value ?? 0}
               onNumberChange={props.onStatChange}
               maxLength={2}
               style={[styles.largeInput, color]}>
               <BigLabelText>{props.name}</BigLabelText>
            </NumericField>
         </View>
         {props.showCost && (
            <View style={styles.edgePool}>
               <NumericField
                  initialValue={props.cost ?? 0}
                  onNumberChange={props.onCostChange}
                  maxLength={2}
                  style={[styles.smallInput, color]}>
                  Cost
               </NumericField>
               <NumericField
                  initialValue={props.armor ?? 0}
                  onNumberChange={props.onArmorChange}
                  maxLength={2}
                  style={[styles.smallInput, color]}>
                  Armor
               </NumericField>
            </View>
         )}
      </View>
   );
};
