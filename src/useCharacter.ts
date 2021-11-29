import {Dispatch, SetStateAction} from 'react';
import {
   useContext,
   useContextSelector,
} from 'use-context-selector';
import Character from './Character';
import {CharacterContext} from './CharacterContext';

export function useCharacter() {
   return useContext(CharacterContext);
}

export function useCharacterProp<K extends keyof Character>(
   key: K,
): [Character[K], (value: Character[K]) => void] {
   const val = useContextSelector(
      CharacterContext,
      v => v[0]?.[key],
   ) as Character[K];

   const setState = useContextSelector(
      CharacterContext,
      v => v[1],
   ) as Dispatch<SetStateAction<Character>>;

   return [
      val,
      (newVal: Character[K]) =>
         setState(s => {
            return {...s, [key]: newVal};
         }),
   ];
}
