import choo from 'choo'
import _ from 'lodash'

export default (params, state, send) => choo.view`
  <div style="width: ${state.ui.showSidenav ? '200px' : '0'}" class="sidenav">
    <a href="#" class="closebtn" onclick=${() => send('ui:hideSidenav')}>X</a>
    ${_.map(state.project.projects, prj => choo.view`<a href="/projects/${prj.slug}">${prj.name}</a>`)}
  </div>
`
