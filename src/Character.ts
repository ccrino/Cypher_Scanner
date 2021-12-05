export default class Character {
   //Overview fields
   Name?: string;
   Descriptor?: string;
   Type?: string;
   Focus?: string;

   //Core Stats
   Might?: number;
   MightPool?: number;
   MightEdge?: number;
   Speed?: number;
   SpeedPool?: number;
   SpeedEdge?: number;
   SpeedCost?: number;
   Intellect?: number;
   IntellectPool?: number;
   IntellectEdge?: number;

   //Tier fields
   Tier?: number;
   Effort?: number;
   XP?: number;

   //Advancement markers
   ExtraEffort?: boolean;
   SkillTraining?: boolean;
   OtherAdvancement?: boolean;
   MoveTowardPerfection?: boolean;
   IncreaseCapabilities?: boolean;

   //Recovery markers
   RecoveryMod?: number;
   RecoveryAction?: boolean;
   RecoveryMinute?: boolean;
   RecoveryHour?: boolean;
   RecoveryTenHour?: boolean;

   //Damage track
   Debilitated?: boolean;
   Impaired?: boolean;
   Dead?: boolean;

   //Other core or tier related fields
   CypherLimit?: number;
   Armor?: number;

   //Lists
   SpecialAbilities?: ListItem[];
   Cyphers?: ListItem[];
   Skills: Skill[] = [];
   Equipment?: ListItem[];
   Attacks?: ListItem[];

   //free-form fields
   Background?: string;
   Notes?: string;

   constructor(o: Object = {}) {
      Object.assign(this, o);
   }

   // public static toJSON(character: Character): string {
   //    return JSON.stringify(character);
   // }

   // public static fromJSON(json: string): Character {
   //    return JSON.parse(json) as Character;
   // }
}

interface ListItem {
   id: number;
}

interface Skill extends ListItem {
   //skill title
   Name?: string;

   //Skill training markers
   Inability?: boolean;
   Trained?: boolean;
   Specialized?: boolean;
}
