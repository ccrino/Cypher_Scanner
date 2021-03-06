import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useTheme} from '../Theme';
import {useCharacterProp} from '../useCharacter';
import {TextField, LabelText} from './Text';

export const CharacterHeader: React.FC<{}> = () => {
   const [name, setName] = useCharacterProp('name');
   const [descriptor, setDescriptor] =
      useCharacterProp('descriptor');
   const [type, setType] = useCharacterProp('type');
   const [focus, setFocus] = useCharacterProp('focus');

   const theme = useTheme();
   const color = {
      color: theme.highlight,
      backgroundColor: theme.lowlight,
   };

   return (
      <View>
         <View style={styles.horizFlex}>
            <TextField
               style={[styles.input, color]}
               defaultValue={name}
               onChangeText={setName}
            />
            <LabelText style={styles.fixed}>IS A</LabelText>
         </View>
         <View style={styles.horizFlex}>
            <TextField
               style={[styles.input, color]}
               defaultValue={descriptor}
               onChangeText={setDescriptor}
            />
            <TextField
               style={[styles.input, color]}
               defaultValue={type}
               onChangeText={setType}
            />
         </View>
         <View style={styles.horizFlex}>
            <LabelText style={styles.fixed}>WHO</LabelText>
            <TextField
               style={[styles.input, color]}
               defaultValue={focus}
               onChangeText={setFocus}
            />
         </View>
      </View>
   );
};

const styles = StyleSheet.create({
   vertFlex: {
      flexDirection: 'column',
      flexGrow: 1,
   },
   horizFlex: {
      flexDirection: 'row',
      flexGrow: 1,
      flexShrink: 0,
      justifyContent: 'space-around',
   },
   input: {
      flexGrow: 1,
      borderRadius: 0,
   },
   fixed: {
      flexBasis: 'auto',
      flexGrow: 0,
      flexShrink: 0,
      alignSelf: 'center',
      padding: 4,
   },
});
