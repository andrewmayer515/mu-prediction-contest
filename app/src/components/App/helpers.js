export const formatNumber = (data, key) => {
  return {
    text: `${data[key].numberText}:`,
    answer: Number(data[key].number),
    type: 'number',
  };
};

export const formatPlayer = (data, key) => {
  return {
    text: `${data[key].playerText}:`,
    answer: data[key].player.map(player => player.value),
    type: 'player',
  };
};

export const formatPlayerNumber = (data, key) => {
  return {
    text: `${data[key].playerText} and how many:`,
    answer: {
      player: data[key].player.map(player => player.value),
      number: Number(data[key].number),
    },
    type: 'playerNumber',
  };
};

export const formatBody = data => {
  const body = {};

  Object.keys(data).forEach(key => {
    if (Number.isInteger(Number(key))) {
      if ('player' in data[key]) {
        body[`question${key}`] = formatPlayerNumber(data, key);
      } else {
        body[`question${key}`] = formatNumber(data, key);
      }
    } else if (key === 'bonus') {
      let format = {};
      switch (data[key].type) {
        case 'player':
          format = formatPlayer(data, key);
          break;
        case 'number':
          format = formatNumber(data, key);
          break;
        case 'playerNumber':
          format = formatPlayerNumber(data, key);
          break;
        default:
          break;
      }
      body.bonus = {
        ...format,
        text: data[key].text,
        points: Number(data[key].points),
      };
    }
  });

  return {
    ...body,
    url: data.url,
  };
};
