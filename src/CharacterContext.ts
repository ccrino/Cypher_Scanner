import {Dispatch, SetStateAction} from 'react';
import {createContext} from 'use-context-selector';
import Character from './Character';

const context: [
   Character | undefined,
   Dispatch<SetStateAction<Character>> | undefined,
] = [undefined, undefined];

export const CharacterContext = createContext(context);
