import choo from 'choo'
import classnames from 'classnames'
import _ from 'lodash'
import * as p from '../project'

export default ({ project, stage, child }, state, send) => choo.view`
    <div class="project-view">

      <h3 class="project-header">${project.name}</h3>

      <div class="project-container">

        <aside>
          ${_.map(_.keys(p), stg => choo.view`
            <a
              href="/projects/${project.slug}/${stg}"
              class="${classnames({'active': stage === stg})}">

              ${_.capitalize(stg)}
            </a>
          `)}
          <div class="filler"> </div>
        </aside>

        <main>
          ${child({ ...params, project }, state, send)}
        </main>
      </div>
    </div>
  `
