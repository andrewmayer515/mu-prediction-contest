import create from 'zustand';
import { devtools } from 'zustand/middleware';

//---------------------------------------------------------------------

const useStore = create(
  devtools(set => ({
    questions: [
      {
        order: 1,
        type: 'number',
        answer: '',
      },
      {
        order: 2,
        type: 'number',
        answer: '',
      },
      {
        order: 3,
        type: 'number',
        answer: '',
      },
      {
        order: 4,
        type: 'number',
        answer: '',
      },
      {
        order: 5,
        type: 'number',
        answer: '',
      },
      {
        order: 6,
        type: 'number',
        answer: '',
      },
      {
        order: 7,
      },
      {
        order: 8,
      },
      {
        order: 9,
      },
      {
        order: 10,
      },
    ],
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
        'updateQuestion'
      ),
    importBoxscore: boxscore =>
      set(state => ({
        questions: state.questions.map(
          (item, index) => {
            return {
              ...item,
              answer: boxscore[index].result,
            };
          },
          false,
          'importBoxscore'
        ),
      })),
  }))
);

export default useStore;
