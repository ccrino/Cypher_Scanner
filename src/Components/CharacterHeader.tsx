import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useCharacterProp} from '../useCharacter';
import {TextField, LabelText} from './Text';

export const CharacterHeader: React.FC<{}> = () => {
   const [name, setName] = useCharacterProp('Name');
   const [descriptor, setDescriptor] =
      useCharacterProp('Descriptor');
   const [type, setType] = useCharacterProp('Type');
   const [focus, setFocus] = useCharacterProp('Focus');

   return (
      <View>
         <View style={styles.horizFlex}>
            <TextField
               style={styles.fill}
               defaultValue={name}
               onChangeText={setName}
            />
            <LabelText style={styles.fixed}>IS A</LabelText>
         </View>
         <View style={styles.horizFlex}>
            <TextField
               style={styles.fill}
               defaultValue={descriptor}
               onChangeText={setDescriptor}
            />
            <TextField
               style={styles.fill}
               defaultValue={type}
               onChangeText={setType}
            />
         </View>
         <View style={styles.horizFlex}>
            <LabelText style={styles.fixed}>WHO</LabelText>
            <TextField
               style={styles.fill}
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
   fill: {
      flexGrow: 1,
   },
   fixed: {
      flexBasis: 'auto',
      flexGrow: 0,
      flexShrink: 0,
      alignSelf: 'center',
      padding: 4,
   },
});
