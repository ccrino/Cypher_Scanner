import React, {PropsWithChildren, useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {AccentColor, useTheme} from '../Theme';
import {BigLabelText} from './Text';

export const HorizontalBar: React.FC<{}> = () => {
   const theme = useTheme();
   const style = useMemo(
      () => ({
         borderWidth: 1,
         borderColor: theme.secondary,
         marginHorizontal: 8,
         marginVertical: 8,
      }),
      [theme],
   );

   return <View style={style} />;
};

interface SectionProps {
   title?: string;
   color?: AccentColor;
}

export const Section: React.FC<
   PropsWithChildren<SectionProps>
> = (props: PropsWithChildren<SectionProps>) => {
   const theme = useTheme();
   const accentColor = {
      backgroundColor: theme[props.color ?? 'red'],
   };

   const headerInset = {
      backgroundColor: theme.lowlight,
   };

   const bodyInset = {
      backgroundColor: theme.background,
   };

   return (
      <View style={styles.sectionShell}>
         {props.title && (
            <View
               style={[
                  styles.sectionHeaderInset,
                  headerInset,
               ]}>
               <BigLabelText>{props.title}</BigLabelText>
            </View>
         )}
         <View
            style={[styles.sectionHeader, accentColor]}
         />
         <View style={[styles.sectionBody, bodyInset]}>
            {props.children}
         </View>
      </View>
   );
};

const styles = StyleSheet.create({
   sectionShell: {
      alignItems: 'flex-start',
      marginBottom: 12,
   },
   sectionBody: {
      marginTop: -10,
      paddingTop: 15,
      paddingHorizontal: 5,
      paddingBottom: 5,
      borderBottomRightRadius: 10,
      width: '95%',
      zIndex: -1,
   },
   sectionHeader: {
      width: '95%',
      height: 20,
      borderTopRightRadius: 10,
      borderBottomRightRadius: 10,
   },
   sectionHeaderInset: {
      borderRadius: 10,
      alignSelf: 'flex-start',
      marginLeft: 20,
      paddingHorizontal: 15,
      marginBottom: -10,
      zIndex: 2,
   },
});
