import { RosterContextInterface } from '../../contexts';

//---------------------------------------------------------------------

export function getPlayerOptions(roster: RosterContextInterface) {
  return Object.keys(roster).map(player => {
    return {
      value: roster[player as keyof typeof roster],
    };
  });
}
