import choo from 'choo'

export default (params, state, send) => choo.view`
  <header class="navigation" role="banner">
    <div class="nav-item left">
      <a href="#" class="nav-link" onclick=${() => send('ui:showSidenav')}>Projects</a>
      <a href="#" class="nav-link">+</a>
    </div>
    <div class="nav-item">
      <a href="/" class="nav-link">Yaw</a>
    </div>
    <div class="nav-item right">
      <a href="#" class="nav-link">Dave<span class="mui-caret"></span></a>
    </div>
  </header>
`
