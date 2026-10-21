export type Guest = {
  _id: string;
  name: string;
  portrait: string;
  stay: number;
  roomType: string;
  requirements: string[];
  preferences: string[];
  quote: string;
};

export type Scenario = {
  _id: string;
  name: string;
  difficulty: string;
  guests: Guest[];
  briefing: string;
};
