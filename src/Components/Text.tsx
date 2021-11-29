import React, {PropsWithChildren} from 'react';
import {
   StyleProp,
   StyleSheet,
   Text,
   TextInput,
   TextProps,
   TextStyle,
   ViewProps,
   ViewStyle,
} from 'react-native';

const styles = StyleSheet.create({
   label: {
      fontFamily: 'Georgia',
      fontSize: 12,
      color: 'gray',
      textTransform: 'uppercase',
      textAlign: 'center',
   },
   bigLabel: {
      fontFamily: 'Georgia',
      fontSize: 18,
      color: 'gray',
      textTransform: 'uppercase',
      textAlign: 'center',
   },
   textField: {
      fontFamily: 'Georgia',
      fontSize: 12,
      color: 'white',
      padding: 8,
   },
});

interface LabelProps {
   style?: StyleProp<TextStyle>;
}

export const LabelText: React.FC<LabelProps> = (
   props: PropsWithChildren<LabelProps>,
) => {
   return (
      <Text style={[styles.label, props.style]}>
         {props.children}
      </Text>
   );
};

export const BigLabelText: React.FC<LabelProps> = (
   props: PropsWithChildren<LabelProps>,
) => {
   return (
      <Text style={[styles.bigLabel, props.style]}>
         {props.children}
      </Text>
   );
};

interface TextFieldProps extends ViewProps {
   style?: StyleProp<TextProps> | StyleProp<ViewStyle>;
   defaultValue?: string;
   multiline?: boolean;
   onChangeText?: (text: string) => void;
}

export const TextField: React.FC<TextFieldProps> = (
   props: TextFieldProps,
) => {
   return (
      <TextInput
         style={[styles.textField, props.style]}
         defaultValue={props.defaultValue}
         multiline={props.multiline}
         onChangeText={props.onChangeText}
      />
   );
};
