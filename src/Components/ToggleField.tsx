import React from 'react';
import {
   ColorValue,
   StyleSheet,
   Switch,
   View,
   ViewProps,
} from 'react-native';
import {useTheme} from '../Theme';
import {LabelText} from './Text';

interface ToggleFieldProps extends ViewProps {
   value?: boolean;
   onToggle?: (value: boolean) => void;
   thumbColor?: ColorValue;
   trackOnColor?: ColorValue;
   trackOffColor?: ColorValue;
}

const styles = StyleSheet.create({
   vertColumn: {
      flexDirection: 'column',
      alignItems: 'center',
   },
   colorWorkAround: {
      minHeight: 0,
      padding: 0,
      margin: 0,
      width: 40,
      height: 20,
      borderRadius: 10,
      //borderWidth: 1,
   },
   switchInt: {
      padding: -1,
      borderWidth: 0,
      marginTop: -10,
   },
});

export const ToggleField: React.FC<ToggleFieldProps> = (
   props: ToggleFieldProps,
) => {
   const theme = useTheme();
   const color = {
      borderColor: theme.primary,
   };

   const thumbColor =
      props.value === true
         ? theme.lowlight
         : theme.highlight;

   const trackColorClear = {
      true: '#0000',
      false: '#0000',
   };

   const trackColorActual = {
      borderColor: theme.primary,
      backgroundColor:
         props.value === true
            ? props.trackOnColor ?? theme.highlight
            : props.trackOffColor ?? theme.lowlight,
   };

   return (
      <View style={styles.vertColumn}>
         <View
            style={[
               styles.colorWorkAround,
               trackColorActual,
               props.style,
            ]}>
            <Switch
               style={[styles.switchInt, color]}
               value={props.value}
               onValueChange={props.onToggle}
               thumbColor={thumbColor}
               trackColor={trackColorClear}
            />
         </View>
         {props.children && (
            <LabelText>{props.children}</LabelText>
         )}
      </View>
   );
};
