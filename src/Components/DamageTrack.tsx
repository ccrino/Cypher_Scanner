import React from 'react';
import {
   ColorValue,
   StyleProp,
   StyleSheet,
   View,
   ViewStyle,
} from 'react-native';
import {useTheme} from '../Theme';
import {useCharacterProp} from '../useCharacter';
import {LabelText} from './Text';
import {ToggleField} from './ToggleField';

interface DamageTrackProps {}

export const DamageTrack: React.FC<DamageTrackProps> = (
   _props: DamageTrackProps,
) => {
   const [Dead, setDead] = useCharacterProp('dead');
   const [Debilitated, setDebilitated] =
      useCharacterProp('debilitated');
   const [Impaired, setImpaired] =
      useCharacterProp('impaired');

   const theme = useTheme();
   return (
      <ToggleTrack
         data={[
            {
               color: theme.yellow,
               title: 'Impaired',
               value: Impaired,
               onToggle: setImpaired,
            },
            {
               color: theme.orange,
               title: 'Debilitated',
               value: Debilitated,
               onToggle: setDebilitated,
            },
            {
               color: theme.red,
               title: 'Dead',
               value: Dead,
               onToggle: setDead,
            },
         ]}
      />
   );
};

interface TrackProps {
   color: ColorValue;
   title?: string;
   value?: boolean;
   onToggle?: (v: boolean) => void;
}

interface ToggleTrackProps {
   data: TrackProps[];
   style?: StyleProp<ViewStyle>;
}

export const ToggleTrack: React.FC<ToggleTrackProps> = (
   props: ToggleTrackProps,
) => {
   const theme = useTheme();

   return (
      <View style={[styles.track, props.style]}>
         {props.data.map(
            (
               item: TrackProps,
               i: number,
               data: TrackProps[],
            ) => {
               const color = {
                  backgroundColor: item.value
                     ? item.color
                     : theme.background,
                  borderColor: theme.background,
               };

               return (
                  <View
                     key={i}
                     style={[
                        styles.col,
                        {zIndex: data.length - i},
                     ]}>
                     <View
                        style={[color, styles.round]}
                        onTouchEnd={() => {
                           item.onToggle?.(!item.value);
                        }}>
                        <ToggleField
                           style={styles.narrowToggle}
                           trackOnColor={item.color}
                           value={item.value}
                           onToggle={item.onToggle}
                        />
                     </View>
                     <LabelText>{item.title}</LabelText>
                  </View>
               );
            },
         )}
      </View>
   );
};

const styles = StyleSheet.create({
   track: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      marginHorizontal: 0,
      flexGrow: 1,
   },
   narrowToggle: {
      //marginTop: -10,
   },
   round: {
      minHeight: 24,
      height: 24,
      maxHeight: 24,
      borderTopRightRadius: 12,
      borderBottomRightRadius: 12,
      marginLeft: -10,
      borderRightWidth: 4,
      borderBottomWidth: 2,
      borderTopWidth: 2,
      flexGrow: 1,
   },
   col: {
      flexDirection: 'column',
      flexGrow: 1,
      margin: 0,
      padding: 0,
   },
});
