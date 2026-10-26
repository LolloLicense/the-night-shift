export type Player = {
  name: string;
  completedNights: number;
  totalEarnings: number;
  totalUnhappyGuests: number;
  totalHappyGuests: number;
  playedScenarioIds: string[];
};

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

export type Room = {
  _id: string;
  roomNumber: number;
  roomType: string;
  quiet: boolean;
  smoking: boolean;
  petFriendly: boolean;
  location: string;
};

export type RoomAssignment = {
  guestId: string;
  roomNumber: number;
};

export type CheckInResult = {
  guestId: string;
  roomNumber: number;
  correctRoomType: boolean;
  upgrade: boolean;
  downgrade: boolean;
  requirementsMet: string[];
  requirementsMissed: string[];
  preferencesMet: string[];
  preferencesMissed: string[];
  rate: number;
  tip: number;
};

export type SavedGame = {
  playerName: string;
  scenario: Scenario;
  rooms: Room[];
  assignments: RoomAssignment[];
  currentGuestIndex: number;
  startedAt: number;
};
