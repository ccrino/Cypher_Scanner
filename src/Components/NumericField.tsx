import React, {useState} from 'react';
import {
   StyleProp,
   StyleSheet,
   TextInput,
   TextStyle,
   View,
   ViewProps,
} from 'react-native';
import {LabelText} from './Text';

export const NumericField: React.FC<NumericFieldProps> = (
   props: NumericFieldProps,
) => {
   const [isInvalid, setInvalid] = useState(false);

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
               props.style,
               isInvalid &&
                  (props.errorStyle || styles.error),
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
   error: {
      borderWidth: 2,
      borderColor: 'red',
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
