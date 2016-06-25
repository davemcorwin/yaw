import choo from 'choo'
import Chart from 'chart.js'

const chartData = (labels, data) => ({
  labels: labels,
  datasets: [{
    data: data,
    backgroundColor: [
        "#FF6384",
        "#36A2EB",
        "#FFCE56"
    ],
    hoverBackgroundColor: [
        "#FF6384",
        "#36A2EB",
        "#FFCE56"
    ]
  }]
})

const projectEpics = (state, project) => state.epic.epics.filter(epic => epic.project === project.id)
const epicFeatures = (state, epic) => state.feature.features.filter(feature => feature.epic === epic.id)
const epicTotal = (state, epic) => epicFeatures(state, epic).reduce((featureTotal, feature) => featureTotal + feature.score, 0)

export default (params, state, send) =>  {
  const project = state.project.projects.find(prj => prj.slug === params.project)
  const epics   = projectEpics(state, project)
  const projectScore = epics.reduce((total, epic) => total + epicTotal(state, epic), 0)

  // const foobar = (ctx) => {
  //   const chart = new Chart(ctx.firstElementChild,{ type: 'pie', data: data })
  //   console.log(ctx)
  //   return ctx
  // }

  const labels = epics.map(epic => epic.name)
  const data = epics.map(epic => epicTotal(state, epic))

  setTimeout(() => {
    new Chart(document.getElementById("foo"),{ type: 'pie', data: chartData(labels, data) })
  }, 100)

  return choo.view`
    <div class="mui-row">
      <div class="mui-col-xs-12 mui-col-lg-6">
        <main>
          <div class="mui-row">
            <div class="mui-col-xs-8">
              <div class="mui--text-display2">${project.name}</div>
            </div>
            <div class="mui-col-xs-4">
              <div class="mui--text-display2 mui--text-right">${projectScore}</div>
            </div>
          </div>
          <div class="epic-cards">
            ${epics.map(epic => epicCard(epic, state, send))}
          </div>
        </main>
      </div>
      <div class="mui-col-xs-12 mui-col-lg-6">
        <aside>
          <canvas id="foo" width="400" height="400"></canvas>
        </aside>
      </div>
    </div>
  `
}

const epicCard = (params, state, send) => {
  const features = state.feature.features
    .filter(feature => feature.epic === params.id)
    .sort((a,b) => a.id - b.id)
  const epicScore = features.reduce((total, feature) => total + feature.score, 0)
  return choo.view`
    <div class="mui-row">
      <div class="mui-col-xs-12">
        <div class="mui-panel hoverable epic-card">
          <div class="mui-row">
            <div class="mui-col-xs-10">
              <span class="mui--text-display1">${params.name}</span>
            </div>
            <div class="mui-col-xs-2 mui--text-right">
              <span class="mui--text-display1">${epicScore}</span>
            </div>
          </div>
          <div class="feature-cards">
            ${features.map(feature => featureCard(feature, state, send))}
          </div>
        </div>
      </div>
    </div>
  `
}

const featureCard = (params, state, send) => {
  return choo.view`
    <div class="mui-row">
      <div class="mui-col-xs-8">${params.name}</div>
      <div class="mui-col-xs-4">
        <input
          type="number"
          onkeyup=${(e) => send('feature:update', { id: params.id, score: Number(e.currentTarget.value || 0) })}
          value=${params.score}/>
      </div>
    </div>
  `
}
