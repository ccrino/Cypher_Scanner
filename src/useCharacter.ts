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
): [Character[K], Dispatch<SetStateAction<Character[K]>>] {
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
      (
         action:
            | Character[K]
            | ((prevState: Character[K]) => Character[K]),
      ) =>
         setState(s => {
            const oldVal = s[key];
            const newVal =
               typeof action === 'function'
                  ? action(oldVal)
                  : action;
            if (oldVal === newVal) {
               return s;
            }
            return {...s, [key]: newVal};
         }),
   ];
}

export type CharacterContext = [
   Character | undefined,
   Dispatch<SetStateAction<Character>> | undefined,
];

export function useCharacterBySelector(selector: any) {
   return useContextSelector(CharacterContext, selector);
}
