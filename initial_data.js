// Структура данных одного дня:
// [День{ date, exercises: [Упражнение{reps: [Подход]}] }]

export let INITIAL_DATA = {
  daysList: [1, 2],
  days: {
    1: {
      date: "2016-05-08",
      exercises: [1]
    },
    2: {
      date: "2016-04-06",
      exercises: [2, 3]
    }
  },
  exercises: {
    1: {
      name: "Эллипс 1",
      type: "mins",
      reps: [1]
    },
    2: {
      name: "Эллипс 2",
      type: "mins",
      reps: [2]
    },
    3: {
      name: "Пресс",
      reps: [3, 4, 5]
    }
  },
  reps: {
    1: {n: 5},
    2: {n: 5},
    3: {n: 20},
    4: {n: 20},
    5: {n: 20}
  }
};
