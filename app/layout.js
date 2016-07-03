import choo from 'choo'
import * as t from './templates'

export default (child) => (params, state, send) => choo.view`
  <div>
    ${t.sideNav(params, state, send)}
    ${t.nav(params, state, send)}
    <div>
      ${child(params, state, send)}
    </div>
    <footer>
      <div>
        Made with ♥ by Dave!
      </div>
    </footer>
  </div>
`
