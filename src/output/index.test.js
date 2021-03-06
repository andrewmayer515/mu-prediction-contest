/* eslint no-console: 0 */
import { displayResults, header, questionWinners, summary } from './index';
import { TYPE } from '../common/constants';

describe('output', () => {
  const results = [
    {
      answer: 167,
      username: ['Test'],
      prediction: 160,
    },
    {
      answer: 89,
      username: ['Andrew'],
      prediction: 80,
    },
    {
      answer: {
        player: ['Markus Howard'],
        number: 18,
      },
      username: ['Andrew'],
      prediction: 16,
    },
    {
      answer: {
        player: ['Sam Hauser'],
        number: 18,
      },
      username: ['No winner'],
    },
    {
      answer: 56,
      username: ['Bonus_Winner'],
      prediction: 56,
      isBonusQuestion: true,
    },
  ];
  const key = {
    question1: {
      text: 'Total Game Points:',
      answer: 167,
      type: TYPE.NUMBER,
    },
    question2: {
      text: 'MU Points:',
      answer: 89,
      type: TYPE.NUMBER,
    },
    question3: {
      text: 'MU top scorer and how many:',
      answer: {
        player: ['Markus Howard'],
        number: 18,
      },
      type: TYPE.PLAYER_NUMBER,
    },
    question4: {
      text: 'MU top rebounder and how many:',
      answer: {
        player: ['Sam Hauser'],
        number: 5,
      },
      type: TYPE.PLAYER_NUMBER,
    },
    bonus: {
      answer: 56,
      type: TYPE.NUMBER,
      text: "Predict Marquette's shooting percentage:",
      points: 3,
    },
  };
  describe('displayResults', () => {
    test('should console log all of the output sections', () => {
      console.log = jest.fn();
      displayResults(results, key);

      expect(console.log.mock.calls[0][0]).toBe('');
      expect(console.log.mock.calls[1][0]).toBe('');
      expect(console.log.mock.calls[2][0]).toBe('Results:');
      expect(console.log.mock.calls[3][0]).toBe('----------');
      expect(console.log.mock.calls[4][0]).toBe('1. Total Game Points: 167');
      expect(console.log.mock.calls[5][0]).toBe('   Test (160)');
      expect(console.log.mock.calls[6][0]).toBe('');
      expect(console.log.mock.calls[7][0]).toBe('2. MU Points: 89');
      expect(console.log.mock.calls[8][0]).toBe('   Andrew (80)');
      expect(console.log.mock.calls[9][0]).toBe('');
      expect(console.log.mock.calls[10][0]).toBe(
        '3. MU top scorer and how many: Markus Howard - 18'
      );
      expect(console.log.mock.calls[11][0]).toBe('   Andrew (16)');
      expect(console.log.mock.calls[12][0]).toBe('');
      expect(console.log.mock.calls[13][0]).toBe(
        '4. MU top rebounder and how many: Sam Hauser - 5'
      );
      expect(console.log.mock.calls[14][0]).toBe('   No winner ');
      expect(console.log.mock.calls[15][0]).toBe('');
      expect(console.log.mock.calls[16][0]).toBe(
        "Bonus. Predict Marquette's shooting percentage: 56"
      );
      expect(console.log.mock.calls[17][0]).toBe('   Bonus_Winner (56)');
      expect(console.log.mock.calls[18][0]).toBe('');
      expect(console.log.mock.calls[19][0]).toBe('');
      expect(console.log.mock.calls[20][0]).toBe('Game Totals:');
      expect(console.log.mock.calls[21][0]).toBe('----------------');
      expect(console.log.mock.calls[22][0]).toBe('Bonus_Winner - 3');
      expect(console.log.mock.calls[23][0]).toBe('Andrew - 2');
      expect(console.log.mock.calls[24][0]).toBe('Test - 1');
    });
  });
  describe('header', () => {
    test('return console log headers for output', () => {
      console.log = jest.fn();
      header();

      expect(console.log.mock.calls[0][0]).toBe('');
      expect(console.log.mock.calls[1][0]).toBe('');
      expect(console.log.mock.calls[2][0]).toBe('Results:');
      expect(console.log.mock.calls[3][0]).toBe('----------');
    });
  });
  describe('questionWinners', () => {
    test('return console log of question winners and answers', () => {
      console.log = jest.fn();
      questionWinners(results, key);

      expect(console.log.mock.calls[0][0]).toBe('1. Total Game Points: 167');
      expect(console.log.mock.calls[1][0]).toBe('   Test (160)');
      expect(console.log.mock.calls[2][0]).toBe('');
      expect(console.log.mock.calls[3][0]).toBe('2. MU Points: 89');
      expect(console.log.mock.calls[4][0]).toBe('   Andrew (80)');
      expect(console.log.mock.calls[5][0]).toBe('');
      expect(console.log.mock.calls[6][0]).toBe(
        '3. MU top scorer and how many: Markus Howard - 18'
      );
      expect(console.log.mock.calls[7][0]).toBe('   Andrew (16)');
      expect(console.log.mock.calls[8][0]).toBe('');
      expect(console.log.mock.calls[9][0]).toBe('4. MU top rebounder and how many: Sam Hauser - 5');
      expect(console.log.mock.calls[10][0]).toBe('   No winner ');
      expect(console.log.mock.calls[11][0]).toBe('');
      expect(console.log.mock.calls[12][0]).toBe(
        "Bonus. Predict Marquette's shooting percentage: 56"
      );
      expect(console.log.mock.calls[13][0]).toBe('   Bonus_Winner (56)');
      expect(console.log.mock.calls[14][0]).toBe('');
    });
    test('return console log of error summary if the key file was not set correctly', () => {
      const badKey = {
        wrongFormat: {
          text: 'Total Game Points:',
          answer: 167,
          type: TYPE.NUMBER,
        },
      };
      console.log = jest.fn();
      questionWinners(results, badKey);

      expect(console.log.mock.calls[0][0]).toBe(
        'Error with the following question: Total Game Points:'
      );
      expect(console.log.mock.calls[1][0]).toBe('Verify key.js file has been set correctly');
    });
    test('return no console log if the line being read is the url', () => {
      const badKey = {
        url: 'https://www.muscoop.com/index.php?topic=35990.0;all',
      };
      console.log = jest.fn();
      questionWinners(results, badKey);

      expect(console.log).not.toHaveBeenCalled();
    });
  });
  describe('summary', () => {
    test('return console log of summarized game total points for each username', () => {
      console.log = jest.fn();
      summary(results, key);

      expect(console.log.mock.calls[1][0]).toBe('Game Totals:');
      expect(console.log.mock.calls[2][0]).toBe('----------------');
      expect(console.log.mock.calls[3][0]).toBe('Bonus_Winner - 3');
      expect(console.log.mock.calls[4][0]).toBe('Andrew - 2');
      expect(console.log.mock.calls[5][0]).toBe('Test - 1');
    });
    test('return console log of summarized game total points for each username (no bonus winner)', () => {
      const results2 = [
        {
          answer: 167,
          username: ['Test'],
          prediction: 160,
        },
        {
          answer: 89,
          username: ['Andrew'],
          prediction: 80,
        },
        {
          answer: {
            player: ['Markus Howard'],
            number: 18,
          },
          username: ['Andrew'],
          prediction: 16,
        },
        {
          answer: {
            player: ['Sam Hauser'],
            number: 18,
          },
          username: ['No winner'],
        },
        {
          answer: 56,
          username: ['No winner'],
        },
      ];

      console.log = jest.fn();
      summary(results2, key);

      expect(console.log.mock.calls[1][0]).toBe('Game Totals:');
      expect(console.log.mock.calls[2][0]).toBe('----------------');
      expect(console.log.mock.calls[3][0]).toBe('Andrew - 2');
      expect(console.log.mock.calls[4][0]).toBe('Test - 1');
    });
  });
});
