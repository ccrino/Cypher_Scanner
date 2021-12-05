import React, {PropsWithChildren, useState} from 'react';
import Character from './Character';
import {CharacterContext} from './CharacterContext';

const testCharacter: Character = new Character({
   name: 'Friendly',
   descriptor: 'Charming',
   type: 'Jack',
   focus: 'Fights with two weapons',

   might: 13,
   mightPool: 13,
   mightEdge: 2,

   speed: 9,
   speedPool: 16,
   speedEdge: 2,

   intellect: 4,
   intellectPool: 12,
   intellectEdge: 1,

   impaired: true,
   debilitated: true,
   dead: true,

   skills: [
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

   specialAbilities: [
      {
         id: 0,
         name: 'big kick',
         cost: 3,
         costPool: 'might',
         hasCost: true,
         costPlus: true,
         enabler: true,
      },
      {
         id: 1,
         name: 'good punch',
      },
   ],

   cypherLimit: 3,
   cyphers: [
      {
         id: 0,
         name: 'Stimpak',
         level: 3,
         form: 'internal',
         description: 'restore 1d6 might points',
      },
      {
         id: 1,
         name: 'Density Nodule',
         level: 6,
         form: 'useable',
         description:
            'attach to a melee weapon to apply 1 additional damage with every attack',
      },
      {
         id: 2,
         name: 'Chemical Factory',
         level: 1,
         form: 'internal',
         description:
            'consume to cause your sweat to become a highly euphoric drug for 1 hour, creates enough for 1d6 doses',
      },
   ],

   shins: 100,
   equipment: [
      {
         id: 0,
         name: 'Battleaxe',
         count: 1,
      },
      {
         id: 1,
         name: 'Blowgun',
         count: 1,
      },
      {
         id: 2,
         name: 'Dart',
         count: 12,
      },
      {
         id: 3,
         name: 'Bag of light tools',
         count: 1,
      },
      {
         id: 4,
         name: 'Compass',
         count: 1,
      },
      {
         id: 5,
         name: 'Floatstone',
         count: 2,
      },
      {
         id: 6,
         name: 'Memory ants',
         count: 1,
      },
   ],

   attacks: [
      {
         id: 0,
         name: 'Battle Axe',
         damage: 6,
         damageType: 'might',
         ignoresArmor: false,
         description:
            'make a heavy melee attack with my battle axe',
         links: [
            {
               id: 0,
               linkSource: 'item',
               linkId: 0,
            },
         ],
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
