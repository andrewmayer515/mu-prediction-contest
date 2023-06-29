import { RosterContextInterface } from './types';

//---------------------------------------------------------------------

export function getPlayerOptions(roster: RosterContextInterface) {
  return Object.keys(roster).map(player => ({
    value: roster[player as keyof typeof roster],
  }));
}
