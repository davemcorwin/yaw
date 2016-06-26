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
        tags: [
          'owner', 'admin', 'app', 'api', 'dw'
        ]
      }
    ],
  }
}
