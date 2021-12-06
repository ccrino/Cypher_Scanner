// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, {
   Dispatch,
   SetStateAction,
   useMemo,
} from 'react';
import {OnListSubChange} from './types';

type ItemType = {
   id: number;
};

/**
 * creates a state change method which will update a single list item property to a provided value
 * @param setData a state change method for the complete list
 */
export function makeListSubChangeHandler<
   T extends ItemType,
>(
   setData: Dispatch<SetStateAction<T[]>>,
): OnListSubChange<T> {
   return (id, key, value) =>
      setData((s: T[]) => {
         const ind = s.findIndex(i => i.id === id);
         const newData = s.slice();
         newData[ind] = {
            ...newData[ind],
            [key]: value,
         };
         return newData;
      });
}

/**
 * react hook which provides the next id to use for new list items
 * @param list the collection to get id from
 * @returns the smallest numeric id greater than all current ids
 */
export function useNextId(list: ItemType[]) {
   return useMemo(() => {
      let maxId = 0;
      if (list) {
         for (const item of list) {
            maxId = Math.max(maxId, item.id);
         }
      }
      return maxId + 1;
   }, [list]);
}
