import React from 'react';
import {
   StyleProp,
   StyleSheet,
   TouchableHighlight,
   View,
   ViewStyle,
} from 'react-native';
import {AccentColor, useTheme} from '../Theme';
import {OnChange} from '../types';
import {LabelText} from './Text';

interface TrackProps {
   color: AccentColor;
   title?: string;
   value?: boolean;
   onToggle?: OnChange<boolean>;
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
         {props.data.map((item: TrackProps, i: number) => {
            const color = {
               backgroundColor: item.value
                  ? theme[item.color]
                  : theme.lowlight,
               borderColor: theme.background,
            };

            return (
               <View
                  key={i}
                  style={[
                     styles.trackColumn,
                     {zIndex: props.data.length - i},
                  ]}>
                  <TouchableHighlight
                     style={[color, styles.trackToggle]}
                     onPress={() =>
                        item.onToggle?.(!item.value)
                     }
                     underlayColor={theme.secondary}>
                     <View />
                  </TouchableHighlight>
                  <LabelText>{item.title}</LabelText>
               </View>
            );
         })}
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
   trackToggle: {
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
   trackColumn: {
      flexDirection: 'column',
      flexGrow: 1,
      margin: 0,
      padding: 0,
   },
});
