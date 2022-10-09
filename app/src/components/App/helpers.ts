interface NumberInterface {
  number: string;
  numberText: string;
}

interface PlayerValueInterface {
  value: string;
}

interface PlayerInterface {
  player: PlayerValueInterface[];
  playerText: string;
}

interface BonusInterface {
  type: string;
  text: string;
  points: string;
  number: string;
  numberText: string;
  player: string;
  playerText: string;
}

export interface DataInterface {
  [name: string]: PlayerInterface | NumberInterface | BonusInterface;
}

export function formatNumber({ number, numberText }: NumberInterface) {
  return {
    text: `${numberText}:`,
    answer: Number(number),
    type: 'number',
  };
}

export function formatPlayer({ player, playerText }: PlayerInterface) {
  return {
    text: `${playerText}:`,
    answer: player.map(i => i.value),
    type: 'player',
  };
}

export function formatPlayerNumber({
  player,
  playerText,
  number,
}: NumberInterface & PlayerInterface) {
  return {
    text: `${playerText} and how many:`,
    answer: {
      player: player.map(i => i.value),
      number: Number(number),
    },
    type: 'playerNumber',
  };
}

export function formatBonus({ text, points, type, ...args }: BonusInterface) {
  let format = {};
  switch (type) {
    case 'player':
      format = formatPlayer((args as unknown) as PlayerInterface);
      break;
    case 'number':
      format = formatNumber(args as NumberInterface);
      break;
    case 'playerNumber':
      format = formatPlayerNumber(
        (args as unknown) as NumberInterface & PlayerInterface
      );
      break;
    default:
      break;
  }
  return {
    ...format,
    text,
    points: Number(points),
  };
}

interface RequestBodyInterface {
  text: string;
  bonus?: {
    text: string;
    points: number;
  };
}

export function formatBody(data: DataInterface) {
  const body: Record<string, RequestBodyInterface> = {};

  Object.keys(data).forEach(key => {
    const item = data[key as keyof typeof data];

    // Questions 1-10
    if (Number.isInteger(Number(key))) {
      if ('player' in data[key]) {
        body[`question${key as keyof typeof body}`] = formatPlayerNumber(
          item as NumberInterface & PlayerInterface
        );
      } else {
        body[`question${key}` as keyof typeof body] = formatNumber(
          item as NumberInterface
        );
      }
    } else if (key === 'bonus') {
      body.bonus = formatBonus(item as BonusInterface);
    }
  });

  return {
    ...body,
    url: data.url,
  };
}
