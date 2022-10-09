export const newPostText = `1. Total Game Points:
2. MU points:
3. Opponent points:
4. TO's forced by MU:
5. TO's forced by Opponent:
6. MU total made 3's:
7. MU top scorer and how many:
8. MU top assist man and how many:
9. MU top rebounder and how many:
10. MU top 3-point shooter and how many:

Bonus Question (1 point). Predict something:

Rules:
[list]
[li]Copy/paste the exact format in the original post[/li]
[li]All answers must be written next to the question being asked (to the right of the colon)[/li]
[li]If a question asks for a player name, use first and/or last name [list]
[li]ie: Kam, Jones, Kam Jones, or KJones[/li]
[li]You can use OMP or OMax as a shorthand for Olivier-Maxence Prosper[/li]
[/list][/li]
[li]Do not 'Quote' another users prediction[/li]
[/list]
`;

export const demoData = {
  question1: {
    text: 'Total Game Points:',
    answer: 117,
    type: 'number',
  },
  question2: {
    text: 'MU Points:',
    answer: 59,
    type: 'number',
  },
  question3: {
    text: 'Opponent Points:',
    answer: 58,
    type: 'number',
  },
  question4: {
    text: "TO's forced by MU:",
    answer: 11,
    type: 'number',
  },
  question5: {
    text: "TO's forced by Opponent:",
    answer: 9,
    type: 'number',
  },
  question6: {
    text: 'MU total made 3s:',
    answer: 4,
    type: 'number',
  },
  question7: {
    text: 'MU top scorer and how many:',
    answer: {
      player: ['Vander Blue'],
      number: 16,
    },
    type: 'playerNumber',
  },
  question8: {
    text: 'MU top assist man and how many:',
    answer: {
      player: ['Vander Blue', 'Jamil Wilson'],
      number: 2,
    },
    type: 'playerNumber',
  },
  question9: {
    text: 'MU top rebounder and how many:',
    answer: {
      player: ['Chris Otule'],
      number: 5,
    },
    type: 'playerNumber',
  },
  question10: {
    text: 'MU top 3-point shooter and how many:',
    answer: {
      player: ['Jamil Wilson', 'Vander Blue'],
      number: 2,
    },
    type: 'playerNumber',
  },
  bonus: {
    answer: 35,
    type: 'number',
    text: "Predict Marquette's shooting percentage:",
    points: 1,
  },
  url: 'https://www.muscoop.com/index.php?topic=37247.0',
};
