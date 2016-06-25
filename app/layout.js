import choo from 'choo'

export default (child) => (params, state, send) => choo.view`
  <div>
    <header class="mui-appbar mui--z1">
      <div class="mui-container">
        <table width="100%">
          <tr class="mui--appbar-height">
            <td><a href="/" class="mui--text-title">Yaw</a></td>
            <td align="right">
              <ul class="mui-list--inline mui--text-body2">
                <li><a href="#">Dave<span class="mui-caret"></span></a></li>
              </ul>
            </td>
          </tr>
        </table>
      </div>
    </header>
    <div id="content-wrapper" class="mui-container">
      <div class="mui--appbar-height"></div>
      ${child(params, state, send)}
    </div>
    <footer>
      <div class="mui-container mui--text-center">
        Made with ♥ by Dave!
      </div>
    </footer>
  </div>
`
