export default {
  namespace: 'feature',
  state: {
    features: [
      {
        id: 1,
        project: 1,
        epic: 1,
        slug: 'log-in',
        name: 'Log In',
        score: 10,
        tags: []
      },
      {
        id: 2,
        project: 1,
        epic: 1,
        slug: 'log-out',
        name: 'Log Out',
        score: 10,
        tags: []
      },
      {
        id: 3,
        project: 1,
        epic: 1,
        slug: 'sign-up',
        name: 'Sign Up',
        score: 12,
        tags: []
      },
      {
        id: 4,
        project: 1,
        epic: 2,
        slug: 'receive-safe',
        name: 'Receive Safe',
        score: 0,
        tags: []
      },
      {
        id: 5,
        project: 1,
        epic: 2,
        slug: 'receive-setup-instructions',
        name: 'Receive Setup Instructions',
        score: 0,
        tags: []
      },
      {
        id: 6,
        project: 1,
        epic: 2,
        slug: 'confirm-safe-connection',
        name: 'Confirm Safe Connection',
        score: 0,
        tags: []
      },
      {
        id: 7,
        project: 1,
        epic: 3,
        slug: 'view-total-cash-balance-and-flow',
        name: 'View Total Cash Balance',
        score: 0,
        tags: []
      },
      {
        id: 8,
        project: 1,
        epic: 3,
        slug: 'view-cash-balance-and-flow-by-location',
        name: 'View Cash Balance By Location',
        score: 0,
        tags: []
      },
      {
        id: 9,
        project: 1,
        epic: 3,
        slug: 'view-cash-balance-and-flow-by-safe',
        name: 'View Cash Balance By Safe',
        score: 0,
        tags: []
      }
    ]
  },
  reducers: {
    update: (action, state) => {
      const idx = state.features.findIndex(feature => feature.id === action.id)
      const feature = state.features.splice(idx, 1)[0]
      return { ...state, features: [ ...state.features, { ...feature, score: action.score } ] }
    }
  }
}
