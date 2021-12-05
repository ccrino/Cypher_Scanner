import React, {useState} from 'react';
import {
   StyleProp,
   StyleSheet,
   TextInput,
   TextStyle,
   View,
   ViewProps,
} from 'react-native';
import {useTheme} from '../Theme';
import {LabelText} from './Text';

export const NumericField: React.FC<NumericFieldProps> = (
   props: NumericFieldProps,
) => {
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
      <View style={styles.col}>
         <TextInput
            style={[
               styles.base,
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

const styles = StyleSheet.create({
   base: {
      fontFamily: 'Georgia',
   },
   col: {
      flexDirection: 'column',
      alignItems: 'center',
   },
});

interface NumericFieldProps extends ViewProps {
   initialValue?: number;
   maxLength?: number;
   style?: StyleProp<TextStyle>;
   errorStyle?: StyleProp<TextStyle>;
   onNumberChange?: (val: number) => void;
}
