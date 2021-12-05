import React, {
   createContext,
   PropsWithChildren,
   useContext,
   useMemo,
   useState,
} from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {useColorScheme} from 'react-native';
import {KeysOfExcept} from './types';

interface AbstractTheme {
   base03: string;
   base02: string;
   base01: string;
   base00: string;
   base0: string;
   base1: string;
   base2: string;
   base3: string;

   yellow: string;
   orange: string;
   red: string;
   magenta: string;
   violet: string;
   blue: string;
   cyan: string;
   green: string;
}

const solarTheme: AbstractTheme = {
   base03: '#002b36',
   base02: '#073642',
   base01: '#586e75',
   base00: '#657b83',
   base0: '#839496',
   base1: '#93a1a1',
   base2: '#eee8d5',
   base3: '#fdf6e3',

   yellow: '#b58900',
   orange: '#cb4b16',
   red: '#dc322f',
   magenta: '#d33682',
   violet: '#6c71c4',
   blue: '#268bd2',
   cyan: '#2aa198',
   green: '#859900',
};

interface Theme {
   primary: string;
   secondary: string;
   highlight: string;

   background: string;
   lowlight: string;

   yellow: string;
   orange: string;
   red: string;
   magenta: string;
   violet: string;
   blue: string;
   cyan: string;
   green: string;
}

export type AccentColor = KeysOfExcept<
   Theme,
   `${string}${'y' | 'ht' | 'd'}`
>;

// export type AccentColor =
//    | 'yellow'
//    | 'orange'
//    | 'red'
//    | 'magenta'
//    | 'violet'
//    | 'blue'
//    | 'cyan'
//    | 'green';

const defaultTheme: Theme = {
   primary: 'black',
   secondary: 'gray',
   highlight: 'black',

   background: 'white',
   lowlight: '#ddd',

   yellow: 'yellow',
   orange: 'orange',
   red: 'red',
   magenta: 'magenta',
   violet: 'violet',
   blue: 'blue',
   cyan: 'cyan',
   green: 'green',
};

const context: [Theme] = [defaultTheme];

export const ThemeContext = createContext(context);

export const ThemeProvider: React.FC<
   PropsWithChildren<{}>
> = (props: PropsWithChildren<{}>) => {
   // eslint-disable-next-line @typescript-eslint/no-unused-vars
   const [state, setState] = useState(solarTheme);
   const isDarkMode = true; //useColorScheme() === 'dark';
   const curTheme = useMemo(() => {
      return {
         ...state,
         primary: isDarkMode ? state.base0 : state.base00,
         secondary: isDarkMode ? state.base01 : state.base1,
         highlight: isDarkMode ? state.base1 : state.base01,
         lowlight: isDarkMode ? state.base02 : state.base2,
         background: isDarkMode
            ? state.base03
            : state.base3,
      };
   }, [state, isDarkMode]);

   return (
      <ThemeContext.Provider value={[curTheme]}>
         {props.children}
      </ThemeContext.Provider>
   );
};

export function useTheme(): Theme {
   return useContext(ThemeContext)[0];
}
