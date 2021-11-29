import React from 'react';
import {ColorValue, StyleSheet, Switch, View, ViewProps} from 'react-native';
import {LabelText} from './Text';

interface ToggleFieldProps extends ViewProps {
   value?: boolean;
   onToggle?: (value: boolean) => void;
   thumbColor?: ColorValue;
   trackColor?: {false?: ColorValue; true?: ColorValue};
}

const styles = StyleSheet.create({
   vertColumn: {
      flexDirection: 'column',
      alignItems: 'center',
   },
});

export default class ToggleField extends React.Component {
   props: ToggleFieldProps;

   constructor(props: ToggleFieldProps) {
      super(props);
      this.props = props;
   }

   render() {
      return (
         <View style={styles.vertColumn}>
            <Switch
               style={this.props.style}
               value={this.props.value}
               onValueChange={this.props.onToggle}
               thumbColor={this.props.thumbColor}
               trackColor={this.props.trackColor}
            />
            <LabelText>{this.props.children}</LabelText>
         </View>
      );
   }
}
