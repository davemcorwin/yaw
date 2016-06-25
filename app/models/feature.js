import _ from 'lodash'

let featureId = 1
const nextId = () => featureId++

export default {
  namespace: 'feature',
  state: {
    features: [
      {
        id: nextId(),
        project: 1,
        epic: 1,
        name: 'Log In',
        score: 10,
      },
      {
        id: nextId(),
        project: 1,
        epic: 1,
        name: 'Log Out',
        score: 10,
      },
      {
        id: nextId(),
        project: 1,
        epic: 1,
        name: 'Sign Up',
        score: 12,
      },
      {
        id: nextId(),
        project: 1,
        epic: 2,
        name: 'Receive Safe',
        score: 0,
      },
      {
        id: nextId(),
        project: 1,
        epic: 2,
        name: 'Receive Setup Instructions',
        score: 0,
      },
      {
        id: nextId(),
        project: 1,
        epic: 2,
        name: 'Confirm Safe Connection',
        score: 0,
      },
      {
        id: nextId(),
        project: 1,
        epic: 3,
        name: 'View Total Cash Balance',
        score: 0,
      },
      {
        id: nextId(),
        project: 1,
        epic: 3,
        name: 'View Cash Balance By Location',
        score: 0,
      },
      {
        id: nextId(),
        project: 1,
        epic: 3,
        name: 'View Cash Balance By Safe',
        score: 0,
      }
    ]
  },
  reducers: {
    update: ({ payload: { id, ...attrs } }, state) => {
      const feature = _.remove(state.features, { id: id })[0]
      return { ...state, features: [ ...state.features, { ...feature, ...attrs } ] }
    },
    add: ({ payload }, state) => {
      return { ...state, features: [ ...state.features, { id: nextId(), ...payload, name: 'New Feature', score: 0 } ] }
    }
  }
}
