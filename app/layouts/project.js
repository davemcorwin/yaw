import choo from 'choo'
import classnames from 'classnames'
import _ from 'lodash'
import appLayout from './app'

export default child => appLayout((params, state, send) => {

  const project = _.find(state.project.projects, { slug: params.project })
  const stages = ['scoping', 'planning', 'allocating', 'reviewing']
  const navStage = _.split(state.app.location, '/')[-1]

  return choo.view`
    <div class="project-view">

      <h2 class="project-header">${project.name}</h2>

      <aside>
        ${_.map(stages, stage => choo.view`
          <a
            href="/projects/${project.slug}/${stage}"
            class="${classnames({'active': navStage === stage})}">

            ${_.capitalize(stage)}
          </a>
        `)}
      </aside>

      <main>
        ${child({ ...params, project }, state, send)}
      </main>
    </div>
  `
})
