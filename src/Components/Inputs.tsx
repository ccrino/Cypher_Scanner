import React, {PropsWithChildren, useState} from 'react';
import {
   StyleProp,
   StyleSheet,
   TextInput,
   TextStyle,
   TouchableHighlight,
   TouchableOpacity,
   View,
   ViewProps,
   ViewStyle,
} from 'react-native';
import {useTheme} from '../Theme';
import {LabelText} from './Text';
import {OnChange} from '../types';

const styles = StyleSheet.create({
   vertFlex: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
   },
   box: {
      borderWidth: 2,
      transform: [{rotate: '45deg'}],
      width: 12,
      height: 12,
      margin: 8,
   },
   expandButton: {
      alignItems: 'center',
      justifyContent: 'center',
      height: 30,
      width: 25,
      borderRadius: 2,
      flexGrow: 0,
   },
   baseCarat: {
      borderBottomWidth: 2,
      borderRightWidth: 2,
      width: 12,
      height: 12,
   },
   pickerBox: {
      borderWidth: 1,
      padding: 6,
      borderRadius: 2,
      flexDirection: 'row',
      justifyContent: 'space-between',
   },
   pickerCarat: {
      borderBottomWidth: 1,
      borderRightWidth: 1,
      width: 6,
      height: 6,
      marginLeft: 4,
      marginTop: 3,
      transform: [{rotate: '45deg'}],
   },
   pickerList: {
      width: '100%',
      borderWidth: 1,
      borderRadius: 2,
      flexDirection: 'column',
      paddingVertical: 6,
      position: 'absolute',
      marginTop: 30,
   },
   pickerItem: {
      width: '100%',
      paddingHorizontal: 6,
   },
   pickerItemLabel: {
      textAlign: 'left',
   },
   numericBase: {
      fontFamily: 'Georgia',
   },
   numericShel: {
      flexDirection: 'column',
      alignItems: 'center',
   },
   smallOrb: {
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
   largeOrb: {
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

interface ToggleProps {
   value?: boolean;
   onValueChange?: OnChange<boolean>;
}

export const DiamondToggle: React.FC<
   PropsWithChildren<ToggleProps>
> = (props: PropsWithChildren<ToggleProps>) => {
   const theme = useTheme();
   const color = {
      backgroundColor: props.value
         ? theme.highlight
         : '#0000',
      borderColor: theme.highlight,
   };

   return (
      <View style={styles.vertFlex}>
         <TouchableOpacity
            onPress={() =>
               props.onValueChange?.(!props.value)
            }>
            <View style={[styles.box, color]} />
         </TouchableOpacity>
         {props.children}
      </View>
   );
};

export const TextToggle: React.FC<
   PropsWithChildren<ToggleProps>
> = (props: PropsWithChildren<ToggleProps>) => {
   const theme = useTheme();
   const color = {
      backgroundColor: theme.lowlight,
   };

   return (
      <TouchableOpacity
         onPress={() =>
            props?.onValueChange?.(!props.value)
         }
         style={[styles.expandButton, color]}>
         {props.children}
      </TouchableOpacity>
   );
};

export const ExpandToggle: React.FC<ToggleProps> = (
   props: ToggleProps,
) => {
   const theme = useTheme();
   const backColor = {
      backgroundColor: theme.lowlight,
   };

   const carat = {
      borderColor: theme.highlight,
      transform: props.value
         ? [{rotate: '45deg'}]
         : [{rotate: '225deg'}],
      marginTop: props.value ? -6 : 6,
   };

   return (
      <TouchableOpacity
         onPress={() =>
            props?.onValueChange?.(!props.value)
         }
         style={[styles.expandButton, backColor]}>
         <View style={[styles.baseCarat, carat]} />
      </TouchableOpacity>
   );
};

interface PickerOption {
   value: string;
   label?: string;
}

interface PickerProps {
   selectedValue?: string;
   onValueChange?: OnChange<number>;
   options: PickerOption[];
   style?: StyleProp<ViewStyle>;
}

export const Picker: React.FC<PickerProps> = (
   props: PickerProps,
) => {
   const [expanded, setExpanded] = useState(false);

   const theme = useTheme();
   const color = {
      borderColor: theme.secondary,
      backgroundColor: theme.background,
   };

   return (
      <View style={props.style}>
         <TouchableHighlight
            onPress={() => setExpanded(!expanded)}>
            <View style={[styles.pickerBox, color]}>
               <LabelText>{props.selectedValue}</LabelText>
               <View style={[styles.pickerCarat, color]} />
            </View>
         </TouchableHighlight>
         {expanded && (
            <View style={[styles.pickerList, color]}>
               {props.options.map((opt, ind) => (
                  <TouchableHighlight
                     key={ind}
                     style={styles.pickerItem}
                     onPress={() => {
                        props?.onValueChange?.(ind);
                        setExpanded(false);
                     }}>
                     <LabelText
                        style={styles.pickerItemLabel}>
                        {opt.label || opt.value}
                     </LabelText>
                  </TouchableHighlight>
               ))}
            </View>
         )}
      </View>
   );
};

interface NumericBaseInputProps extends ViewProps {
   initialValue?: number;
   maxLength?: number;
   style?: StyleProp<TextStyle>;
   errorStyle?: StyleProp<TextStyle>;
   onNumberChange?: OnChange<number>;
}

export const NumericBaseInput: React.FC<NumericBaseInputProps> =
   (props: NumericBaseInputProps) => {
      const [isInvalid, setInvalid] = useState(false);

      const theme = useTheme();
      const color = {
         color: theme.highlight,
         backgroundColor: theme.lowlight,
      };

      const error = {
         borderWidth: 2,
         borderColor: theme.red,
      };

      function handleTextChange(text: string) {
         const value = Number(text);
         const isNumeric = value.toString() === text;
         setInvalid(!isNumeric);
         if (isNumeric && props.onNumberChange) {
            props.onNumberChange(value);
         }
      }

      return (
         <View style={styles.numericShel}>
            <TextInput
               style={[
                  styles.numericBase,
                  color,
                  props.style,
                  isInvalid && (props.errorStyle || error),
               ]}
               defaultValue={props.initialValue?.toString()}
               maxLength={props.maxLength}
               onChangeText={handleTextChange}
               multiline
            />
            {props.children && (
               <LabelText>{props.children}</LabelText>
            )}
         </View>
      );
   };

interface NumberInputProps {
   initialValue?: number;
   onNumberChange?: OnChange<number>;
}

export const SmallOrbNumberInput: React.FC<
   PropsWithChildren<NumberInputProps>
> = (props: PropsWithChildren<NumberInputProps>) => {
   const theme = useTheme();
   const color = {
      borderColor: theme.secondary,
   };

   return (
      <NumericBaseInput
         style={[styles.smallOrb, color]}
         onNumberChange={props.onNumberChange}
         initialValue={props.initialValue}>
         {props.children}
      </NumericBaseInput>
   );
};

export const LargeOrbNumberInput: React.FC<
   PropsWithChildren<NumberInputProps>
> = (props: PropsWithChildren<NumberInputProps>) => {
   const theme = useTheme();
   const color = {
      borderColor: theme.secondary,
   };

   return (
      <NumericBaseInput
         style={[styles.largeOrb, color]}
         onNumberChange={props.onNumberChange}
         initialValue={props.initialValue}>
         {props.children}
      </NumericBaseInput>
   );
};
