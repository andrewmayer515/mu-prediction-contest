export const formatBody = (questions, bonus, url) => {
  const body = {};
  questions.forEach(question => {
    body[`question${question.order}`] = { ...question };
  });

  return {
    ...body,
    bonus,
    url,
  };
};
