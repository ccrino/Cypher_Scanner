import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useCharacterProp} from '../useCharacter';
import {
   LargeOrbNumberInput,
   SmallOrbNumberInput,
} from './Inputs';
import {BigLabelText, LabelText} from './Text';

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
});

export const CharacterStats: React.FC<{}> = () => {
   const [might, setMight] = useCharacterProp('might');
   const [mightPool, setMightPool] =
      useCharacterProp('mightPool');
   const [mightEdge, setMightEdge] =
      useCharacterProp('mightEdge');
   const [speed, setSpeed] = useCharacterProp('speed');
   const [speedPool, setSpeedPool] =
      useCharacterProp('speedPool');
   const [speedEdge, setSpeedEdge] =
      useCharacterProp('speedEdge');
   const [speedCost, setSpeedCost] =
      useCharacterProp('speedCost');
   const [armor, setArmor] = useCharacterProp('armor');
   const [intellect, setIntellect] =
      useCharacterProp('intellect');
   const [intellectPool, setIntellectPool] =
      useCharacterProp('intellectPool');
   const [intellectEdge, setIntellectEdge] =
      useCharacterProp('intellectEdge');

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
   return (
      <View style={styles.statBody}>
         <View style={styles.edgePool}>
            <SmallOrbNumberInput
               initialValue={props.pool ?? 0}
               onNumberChange={props.onPoolChange}>
               <LabelText>Pool</LabelText>
            </SmallOrbNumberInput>
            <SmallOrbNumberInput
               initialValue={props.edge ?? 0}
               onNumberChange={props.onEdgeChange}>
               <LabelText>Edge</LabelText>
            </SmallOrbNumberInput>
         </View>
         <View style={styles.edgePool}>
            <LargeOrbNumberInput
               initialValue={props.value ?? 0}
               onNumberChange={props.onStatChange}>
               <BigLabelText>{props.name}</BigLabelText>
            </LargeOrbNumberInput>
         </View>
         {props.showCost && (
            <View style={styles.edgePool}>
               <SmallOrbNumberInput
                  initialValue={props.cost ?? 0}
                  onNumberChange={props.onCostChange}>
                  <LabelText>Cost</LabelText>
               </SmallOrbNumberInput>
               <SmallOrbNumberInput
                  initialValue={props.armor ?? 0}
                  onNumberChange={props.onArmorChange}>
                  <LabelText>Armor</LabelText>
               </SmallOrbNumberInput>
            </View>
         )}
      </View>
   );
};
