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
        route('/:project/:stage', projectStageHandler, [
          route('/:epic', projectEpicHandler)
      ])
    ]),
    route('/404', v.fourohfour)
  ])

  // Route handlers
  const projectStageHandler = (params, state, send) => {
    const project = _.find(state.project.projects, { slug: params.project })
    const stage = params.stage || 'scoping'
    const view = p[stage]

    if (!project || !view)
      return v.fourohfour(params, state, send)

    return withLayout(view, { ...params, project, stage }, state, send, [l.app, l.project])
  }

  // const projectEpic = (params, state, send) =>


  // Return the app
  return app.start()
}
