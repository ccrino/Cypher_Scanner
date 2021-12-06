// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, {Dispatch, SetStateAction} from 'react';

type ItemType = {
   id: number;
};

export function makeListSubChangeHandler<
   T extends ItemType,
   K extends keyof T,
>(setData: Dispatch<SetStateAction<T[]>>) {
   return (id: number, key: K, value: T[K]) =>
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
