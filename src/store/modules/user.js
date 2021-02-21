export const namespaced = true

export const state = {
  state_str: '',
  name: '',
  dummyrosters: [
    {
      day: 1,
      times: [
        { time: 0, working: false, book: false },
        { time: 1, working: false, book: false },
        { time: 2, working: false, book: false },
        { time: 3, working: false, book: false },
        { time: 4, working: true, book: false },
        {
          time: 5,
          working: true,
          book: {
            isstart: true,
            isend: false,
            name: '王小美',
            type: '美甲保養'
          }
        },
        {
          time: 6,
          working: true,
          book: {
            isstart: false,
            isend: true,
            name: '王小美',
            type: '美甲保養'
          }
        },
        { time: 7, working: true, book: false },
        { time: 8, working: false, book: false },
        { time: 9, working: false, book: false },
        { time: 10, working: false, book: false },
        { time: 11, working: false, book: false },
        { time: 12, working: false, book: false },
        { time: 13, working: false, book: false },
        { time: 14, working: false, book: false }
      ]
    },
    {
      day: 2,
      times: [
        { time: 0, working: false, book: false },
        { time: 1, working: false, book: false },
        { time: 2, working: false, book: false },
        { time: 3, working: false, book: false },
        { time: 4, working: false, book: false },
        { time: 5, working: false, book: false },
        { time: 6, working: false, book: false },
        { time: 7, working: true, book: false },
        { time: 8, working: true, book: false },
        { time: 9, working: true, book: false },
        { time: 10, working: false, book: false },
        { time: 11, working: false, book: false },
        { time: 12, working: false, book: false },
        { time: 13, working: false, book: false },
        { time: 14, working: false, book: false }
      ]
    },
    {
      day: 3,
      times: [
        { time: 0, working: false, book: false },
        { time: 1, working: false, book: false },
        { time: 2, working: false, book: false },
        { time: 3, working: false, book: false },
        { time: 4, working: false, book: false },
        { time: 5, working: false, book: false },
        { time: 6, working: false, book: false },
        { time: 7, working: false, book: false },
        { time: 8, working: false, book: false },
        { time: 9, working: false, book: false },
        { time: 10, working: false, book: false },
        { time: 11, working: false, book: false },
        { time: 12, working: false, book: false },
        { time: 13, working: false, book: false },
        { time: 14, working: false, book: false }
      ]
    },
    {
      day: 4,
      times: [
        { time: 0, working: false, book: false },
        { time: 1, working: false, book: false },
        { time: 2, working: false, book: false },
        { time: 3, working: false, book: false },
        { time: 4, working: false, book: false },
        { time: 5, working: false, book: false },
        { time: 6, working: true, book: false },
        {
          time: 7,
          working: true,
          book: { isstart: true, isend: true, name: '王小明', type: '美甲保養' }
        },
        { time: 8, working: true, book: false },
        { time: 9, working: true, book: false },
        { time: 10, working: false, book: false },
        { time: 11, working: false, book: false },
        { time: 12, working: false, book: false },
        { time: 13, working: false, book: false },
        { time: 14, working: false, book: false }
      ]
    },
    {
      day: 5,
      times: [
        { time: 0, working: false, book: false },
        { time: 1, working: false, book: false },
        { time: 2, working: false, book: false },
        { time: 3, working: false, book: false },
        { time: 4, working: true, book: false },
        { time: 5, working: true, book: false },
        { time: 6, working: true, book: false },
        { time: 7, working: true, book: false },
        { time: 8, working: false, book: false },
        { time: 9, working: false, book: false },
        { time: 10, working: true, book: false },
        { time: 11, working: true, book: false },
        { time: 12, working: false, book: false },
        { time: 13, working: false, book: false },
        { time: 14, working: false, book: false }
      ]
    },
    {
      day: 6,
      times: [
        { time: 0, working: false, book: false },
        { time: 1, working: false, book: false },
        { time: 2, working: false, book: false },
        { time: 3, working: false, book: false },
        { time: 4, working: false, book: false },
        { time: 5, working: false, book: false },
        { time: 6, working: false, book: false },
        { time: 7, working: false, book: false },
        { time: 8, working: false, book: false },
        { time: 9, working: false, book: false },
        { time: 10, working: false, book: false },
        { time: 11, working: false, book: false },
        { time: 12, working: false, book: false },
        { time: 13, working: false, book: false },
        { time: 14, working: false, book: false }
      ]
    },
    {
      day: 7,
      times: [
        { time: 0, working: false, book: false },
        { time: 1, working: false, book: false },
        { time: 2, working: false, book: false },
        { time: 3, working: false, book: false },
        { time: 4, working: false, book: false },
        { time: 5, working: false, book: false },
        { time: 6, working: false, book: false },
        { time: 7, working: false, book: false },
        { time: 8, working: false, book: false },
        { time: 9, working: false, book: false },
        { time: 10, working: false, book: false },
        { time: 11, working: false, book: false },
        { time: 12, working: false, book: false },
        { time: 13, working: false, book: false },
        { time: 14, working: false, book: false }
      ]
    }
  ]
}

export const mutations = {
  SET_NAME(state, name) {
    state.name = name
  }
}

export const actions = {
  setName({ commit }, name) {
    commit('SET_NAME', name)
  }
}

export const getters = {
  getName: state => {
    return state.name
  }
}
