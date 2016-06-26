import _ from 'lodash'
import { idGen } from '../utils'

const nextId = idGen()

export default {
  namespace: 'epic',
  state: {
    epics: [
      {
        id: nextId(),
        project: 1,
        name: 'User Management'
      },
      {
        id: nextId(),
        project: 1,
        name: 'Onboarding'
      },
      {
        id: nextId(),
        project: 1,
        name: 'Dashboard'
      }
    ]
  },
  reducers: {
    update: ({ payload: { id, ...attrs } }, state) => {
      const epic = _.remove(state.epics, { id: id })[0]
      return { ...state, epics: [ ...state.epics, { ...epic, ...attrs } ] }
    },
    add: ({ payload }, state) => {
      return { ...state, epics: _.concat(state.epics, { id: nextId(), ...payload, name: 'New Epic' }) }
    },
    delete: ({ payload: { id } }, state) => {
      return { ...state, epics: _.reject(state.epics, { id: id }) }
    }
  }
}
