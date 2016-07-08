import choo from 'choo'
import classnames from 'classnames'
import _ from 'lodash'
import appLayout from './app'

export default child => appLayout((params, state, send) => {

  const projects = state.project.projects
  const stages = ['scoping', 'planning', 'allocating', 'reviewing']
  const navStage = _.chain(state.app.location)
                    .split('/')
                    .last()
                    .value() || 'scoping'
  const stageProjects = _.filter(projects, { stage: navStage })

  return choo.view`
    <div class="dashboard-view">

      <section class="row tab-row">
        ${_.map(stages, stage => choo.view`
          <div class="column">
            <a href="/dashboard/${stage}" class="tab-link ${classnames({'active': navStage === stage})}">
              ${_.capitalize(stage)} (${_.filter(projects, { stage }).length})
            </a>
          </div>
        `)}
      </section>

      <main class="tab-content">
        <div class="flex-container">
          ${_.map(stageProjects, projectCard)}
        </div>
      </main>
    </div>
  `
})

const projectCard = project => choo.view`
  <div class="card project-card">
    <a href="/projects/${project.slug}">
      <h3>${project.name}</h3>
    </a>
  </div>
`
