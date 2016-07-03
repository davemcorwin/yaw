import choo from 'choo'
import classnames from 'classnames'

export default child => (params, state, send) => {

  const hideSidenav = () => send('ui:hideSidenav')
  const showSidenav = () => send('ui:showSidenav')
  const projects = state.project.projects
  const isShowSidenav = state.ui.showSidenav

  return choo.view`
    <div>

      <div class="sidenav ${classnames({active: isShowSidenav})}">
        <a href="#" class="closebtn" onclick=${hideSidenav}>X</a>
        ${_.map(projects, prj => choo.view`<a href="/projects/${prj.slug}">${prj.name}</a>`)}
      </div>

      <div class="wrapper">

        <nav role="banner">
          <div class="nav-item left">
            <a href="#" class="nav-link" onclick=${showSidenav}>Projects</a>
            <a href="#" class="nav-link">+</a>
          </div>
          <div class="nav-item">
            <a href="/" class="nav-link">Yaw</a>
          </div>
          <div class="nav-item right">
            <a href="#" class="nav-link">Dave</a>
          </div>
        </nav>

        <div class="content">
          ${child(params, state, send)}
        </div>

        <footer>
          <p>Made with ♥ by Dave!</p>
        </footer>
      </div>
    </div>
  `
}
