export const formatBody = data => {
  const body = {};

  Object.keys(data).forEach(key => {
    if (Number.isInteger(Number(key))) {
      if ('player' in data[key]) {
        body[`question${key}`] = {
          text: `${data[key].playerText} and how many:`,
          answer: {
            player: data[key].player.map(player => player.value),
            number: data[key].number,
          },
          type: 'playerNumber',
        };
      } else {
        body[`question${key}`] = {
          text: `${data[key].numberText}:`,
          answer: data[key].number,
          type: 'number',
        };
      }
    }
  });

  return {
    ...body,
    // bonus,
    url: data.url,
  };
};
