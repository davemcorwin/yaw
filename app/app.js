import choo from 'choo'
import _ from 'lodash'
import * as models from './models'
import * as v from './views'
import * as p from './views/project'
import * as l from './layouts'

export default function() {

  // Create the app
  const app = choo()

  // Load all models
  _.forOwn(models, app.model)

  // Create routes
  const home = l.dashboard()

  app.router('/404', route => [
    route('/', home, [
      route('/dashboard',    l.dashboard(), [
        route('/scoping',    l.dashboard()),
        route('/planning',   l.dashboard()),
        route('/allocating', l.dashboard()),
        route('/reviewing',  l.dashboard())
      ]),
      route('/projects',     l.project(p.scoping), [
        route('/:project',     l.project(p.scoping), [
          route('/scoping',    l.project(p.scoping)),
          route('/planning',   l.project(p.planning)),
          route('/allocating', l.project(p.allocating)),
          route('/reviewing',  l.project(p.reviewing))
        ])
      ])
    ]),
    route('/404', v.fourohfour)
  ])

  // Return the app
  return app.start()
}
