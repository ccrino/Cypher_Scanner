import React, {PropsWithChildren, useState} from 'react';
import Character from './Character';
import {CharacterContext} from './CharacterContext';

const testCharacter: Character = new Character({
   Name: 'Friendly',
   Descriptor: 'Charming',
   Type: 'Jack',
   Focus: 'Fights with two weapons',

   Might: 13,
   MightPool: 13,
   MightEdge: 2,

   Speed: 9,
   SpeedPool: 16,
   SpeedEdge: 2,

   Intellect: 4,
   IntellectPool: 12,
   IntellectEdge: 1,

   Impaired: true,
   Debilitated: true,
   Dead: true,

   Skills: [
      {
         id: 0,
         name: 'climbing',
         inability: false,
         trained: true,
         specialized: false,
      },
      {
         id: 1,
         name: 'understanding numenera',
         inability: true,
         trained: false,
         specialized: false,
      },
   ],
});

export const CharacterProvider: React.FC<
   PropsWithChildren<{}>
> = (props: PropsWithChildren<{}>) => {
   const [state, setState] = useState(testCharacter);
   return (
      <CharacterContext.Provider value={[state, setState]}>
         {props.children}
      </CharacterContext.Provider>
   );
};
