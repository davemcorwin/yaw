import { idGen } from '../utils'

const nextId = idGen()

export default {
  namespace: 'project',
  state: {
    projects: [
      {
        id: nextId(),
        slug: 'cashup',
        name: 'CashUp',
        stage: 'scoping'
      },
      {
        id: nextId(),
        slug: 'wilson',
        name: 'Wilson',
        stage: 'scoping'
      }
    ],
  }
}
