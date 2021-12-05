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
import {useTheme} from '../Theme';

const styles = StyleSheet.create({
   label: {
      fontFamily: 'Georgia',
      fontSize: 12,
      textTransform: 'uppercase',
      textAlign: 'center',
   },
   bigLabel: {
      fontFamily: 'Georgia',
      fontSize: 18,
      textTransform: 'uppercase',
      textAlign: 'center',
   },
   smallLabel: {
      fontFamily: 'Georgia',
      fontSize: 10,
      textTransform: 'uppercase',
      textAlign: 'center',
   },
   textField: {
      fontFamily: 'Georgia',
      fontSize: 12,
      padding: 8,
   },
   paragraphField: {
      fontFamily: 'Georgia',
      fontSize: 12,
      padding: 8,
      margin: 2,
      borderWidth: 0,
      minHeight: 80,
   },
});

interface LabelProps {
   style?: StyleProp<TextStyle>;
}

export const LabelText: React.FC<LabelProps> = (
   props: PropsWithChildren<LabelProps>,
) => {
   const theme = useTheme();
   const color = {
      color: theme.primary,
   };
   return (
      <Text style={[styles.label, color, props.style]}>
         {props.children}
      </Text>
   );
};

export const BigLabelText: React.FC<LabelProps> = (
   props: PropsWithChildren<LabelProps>,
) => {
   const theme = useTheme();
   const color = {
      color: theme.primary,
   };
   return (
      <Text style={[styles.bigLabel, color, props.style]}>
         {props.children}
      </Text>
   );
};

export const SmallLabelText: React.FC<LabelProps> = (
   props: PropsWithChildren<LabelProps>,
) => {
   const theme = useTheme();
   const color = {
      color: theme.primary,
   };
   return (
      <Text style={[styles.smallLabel, color, props.style]}>
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
   const theme = useTheme();
   const color = {
      color: theme.highlight,
      backgroundColor: theme.background,
   };

   return (
      <TextInput
         style={[styles.textField, color, props.style]}
         defaultValue={props.defaultValue}
         multiline={props.multiline}
         onChangeText={props.onChangeText}
      />
   );
};

interface ParagraphFieldProps {
   style?: StyleProp<TextStyle | ViewStyle>;
   value?: string;
   onChangeText?: (text: string) => void;
}

export const ParagraphField: React.FC<ParagraphFieldProps> =
   (props: ParagraphFieldProps) => {
      const theme = useTheme();
      const color = {
         color: theme.highlight,
         backgroundColor: theme.background,
      };

      //const [text, onChangeText] = useState('dummy');

      return (
         <TextInput
            style={[
               styles.paragraphField,
               color,
               props.style,
            ]}
            multiline
            defaultValue={props.value}
            onChangeText={props.onChangeText}
         />
      );
   };
