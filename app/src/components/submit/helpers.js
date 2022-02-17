export const formatBody = (questions, url) => {
  const body = {};
  questions.forEach(question => {
    body[`question${question.order}`] = { ...question };
  });

  return {
    ...body,
    url,
  };
};
