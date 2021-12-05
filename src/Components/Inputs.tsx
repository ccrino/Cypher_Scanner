import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {useTheme} from '../Theme';

const styles = StyleSheet.create({
   box: {
      borderWidth: 2,
      transform: [{rotate: '45deg'}],
      width: 12,
      height: 12,
      margin: 8,
   },
});

interface BoxToggleProps {
   value?: boolean;
   onValueChange?: (value: boolean) => void;
}

export const BoxToggle: React.FC<BoxToggleProps> = (
   props: BoxToggleProps,
) => {
   const theme = useTheme();
   const color = {
      backgroundColor: props.value
         ? theme.highlight
         : '#0000',
      borderColor: theme.highlight,
   };

   return (
      <Pressable
         onPress={() =>
            props.onValueChange?.(!props.value)
         }>
         <View style={[styles.box, color]} />
      </Pressable>
   );
};
