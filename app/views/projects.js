import choo from 'choo'

export default (params, state, send) => choo.view`
  <main>
    <div class="mui-row">
      ${state.project.projects.map(prj => projectCard(prj))}
    </div>
    <button class="mui-btn mui-btn--fab mui-btn--primary mui--pull-right">+</button>
  </main>
`

const projectCard = (params, state, send) => choo.view`
  <div class="mui-col-xs-12 mui-col-md-6 mui-col-lg-4">
    <a href="/projects/${params.slug}">
      <div class="mui-panel hoverable mui--text-center">
        <h3>${params.name}</h3>
      </div>
    </a>
  </div>
`
