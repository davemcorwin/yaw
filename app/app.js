import choo from 'choo'
import * as models from './models'
import * as views from './views'
import l from './layout'

export default function() {

  const app = choo()

  Object
    .keys(models)
    .map(key => models[key])
    .forEach(app.model)

  app.router((route) => [
    route('/', l(views.projects)),
    route('/projects', l(views.projects), [
      route('/:project', l(views.project))
    ])
  ])

  return app.start()
}
