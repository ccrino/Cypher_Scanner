import {ConstructableObjectOf} from './types';

export default class Character {
   //Overview fields
   name?: string;
   descriptor?: string;
   type?: string;
   focus?: string;

   //Core Stats
   might?: number;
   mightPool?: number;
   mightEdge?: number;
   speed?: number;
   speedPool?: number;
   speedEdge?: number;
   speedCost?: number;
   intellect?: number;
   intellectPool?: number;
   intellectEdge?: number;

   //Tier fields
   tier?: number;
   effort?: number;
   xp?: number;

   //Advancement markers
   extraEffort?: boolean;
   skillTraining?: boolean;
   otherAdvancement?: boolean;
   moveTowardPerfection?: boolean;
   increaseCapabilities?: boolean;

   //Recovery markers
   recoveryMod?: number;
   recoveryAction?: boolean;
   recoveryMinute?: boolean;
   recoveryHour?: boolean;
   recoveryTenHour?: boolean;

   //Damage track
   debilitated?: boolean;
   impaired?: boolean;
   dead?: boolean;

   //Other core or tier related fields
   cypherLimit?: number;
   shins?: number;
   armor?: number;

   //Lists
   specialAbilities: SpecialAbility[] = [];
   cyphers: Cypher[] = [];
   skills: Skill[] = [];
   equipment: Equipment[] = [];
   attacks: Attack[] = [];

   //free-form fields
   background?: string;
   notes?: string;

   constructor(o: ConstructableObjectOf<Character> = {}) {
      Object.assign(this, o);
   }
}

type StatType = 'might' | 'speed' | 'intellect';

interface ListItem {
   id: number;
}

export interface SpecialAbility extends ListItem {
   name?: string;
   enabler?: boolean;
   hasCost?: boolean;
   costPool?: StatType;
   cost?: number;
   costPlus?: boolean;
   description?: string;
}

export interface Cypher extends ListItem {
   name?: string;
   level?: number;
   form?: 'internal' | 'wearable' | 'useable';
   description?: string;
}

export interface Skill extends ListItem {
   //skill title
   name?: string;
   //Skill training markers
   inability?: boolean;
   trained?: boolean;
   specialized?: boolean;
}

export interface Equipment extends ListItem {
   name?: string;
   count?: number;
   description?: string;
}

export interface Attack extends ListItem {
   name?: string;
   damage?: number;
   damageType?: StatType;
   ignoresArmor?: boolean;
   description?: string;
   links: LinkType[];
}

type LinkSource = 'item' | 'ability' | 'skill';

export interface LinkType extends ListItem {
   linkSource?: LinkSource;
   linkId?: number;
}
