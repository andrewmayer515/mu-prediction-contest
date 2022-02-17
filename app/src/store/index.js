import create from 'zustand';
import { devtools } from 'zustand/middleware';

//---------------------------------------------------------------------

const useStore = create(
  devtools(set => ({
    questions: [
      {
        order: 1,
        text: 'Total Game Points:',
        type: 'number',
        answer: '',
      },
      {
        order: 2,
        text: 'MU Points:',
        type: 'number',
        answer: '',
      },
      {
        order: 3,
        text: 'Opponent Points:',
        type: 'number',
        answer: '',
      },
      {
        order: 4,
        text: "TO's forced by MU:",
        type: 'number',
        answer: '',
      },
      {
        order: 5,
        text: "TO's forced by Opponent:",
        type: 'number',
        answer: '',
      },
      {
        order: 6,
        text: 'MU total made 3s:',
        type: 'number',
        answer: '',
      },
      {
        order: 7,
        text: 'MU top scorer and how many:',
        type: 'playerNumber',
        answer: {
          player: [],
          number: '',
        },
      },
      {
        order: 8,
        text: 'MU top assist man and how many:',
        type: 'playerNumber',
        answer: {
          player: [],
          number: '',
        },
      },
      {
        order: 9,
        text: 'MU top rebounder and how many:',
        type: 'playerNumber',
        answer: {
          player: [],
          number: '',
        },
      },
      {
        order: 10,
        text: 'MU top 3-point shooter and how many:',
        type: 'playerNumber',
        answer: {
          player: [],
          number: '',
        },
      },
    ],
    url: '',
    updateQuestion: question =>
      set(
        state => ({
          questions: state.questions.map(item => {
            if (item.order === question.order) {
              return {
                ...item,
                answer: question.answer,
              };
            }
            return item;
          }),
        }),
        false,
        'UPDATE_QUESTION'
      ),
    importBoxscore: boxscore =>
      set(
        state => ({
          questions: state.questions.map((item, index) => {
            return {
              ...item,
              answer: boxscore[index].result,
            };
          }),
        }),
        false,
        'IMPORT_BOXSCORE'
      ),
    updateURL: url => set(() => ({ url }), false, 'UPDATE_URL'),
  }))
);

export default useStore;
