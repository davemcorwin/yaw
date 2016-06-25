import choo  from 'choo'
import _     from 'lodash'
import Chart from 'chart.js'

const projectEpics = (state, project) => state.epic.epics.filter(epic => epic.project === project.id)
const epicFeatures = (state, epic) => state.feature.features.filter(feature => feature.epic === epic.id)
const epicTotal = (state, epic) => epicFeatures(state, epic).reduce((featureTotal, feature) => featureTotal + feature.score, 0)

export default (params, state, send) =>  {
  const project = state.project.projects.find(prj => prj.slug === params.project)
  const epics   = projectEpics(state, project)
  const projectScore = epics.reduce((total, epic) => total + epicTotal(state, epic), 0)

  const labels = epics.map(epic => epic.name)
  const data = epics.map(epic => epicTotal(state, epic))

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
            ${epics.map(epic => epicCard({epic, project}, state, send))}
          </div>
          <button class="mui-btn mui-btn--fab mui-btn--primary mui--pull-right">+</button>
        </main>
      </div>
      <div class="mui-col-xs-12 mui-col-lg-6">
        <aside>
          <div style="width: 100%">
            ${pieChart({name: 'foo', labels, data})}
          </div>
        </aside>
      </div>
    </div>
  `
}

const epicCard = ({epic, project}, state, send) => {
  const features = state.feature.features
    .filter(feature => feature.epic === epic.id)
    .sort((a,b) => a.id - b.id)
  const epicScore = features.reduce((total, feature) => total + feature.score, 0)
  return choo.view`
    <div class="mui-row">
      <div class="mui-col-xs-12">
        <div class="mui-panel hoverable epic-card">
          <div class="mui-row">
            <div class="mui-col-xs-10">
              <span class="mui--text-display1">${epic.name}</span>
            </div>
            <div class="mui-col-xs-2 mui--text-right">
              <span class="mui--text-display1">${epicScore}</span>
            </div>
          </div>
          <div class="feature-cards">
            ${features.map(feature => featureCard(feature, state, send))}
          </div>
          <button class="mui-btn mui-btn--flat mui-btn--primary mui--pull-right" onclick=${() => send('feature:add', { payload: { project: project.id, epic: epic.id } })}>Add</button>
        </div>
      </div>
    </div>
  `
}

const featureCard = (feature, state, send) => {

  const _updateFeature = attrs =>
    send('feature:update', { payload: { ...feature, ...attrs } })

  const updateFeature = _.debounce(_updateFeature, 300)

  return choo.view`
    <div class="mui-row feature-row">
      <div class="mui-col-xs-8">
        <input
          type="text"
          oninput=${e => updateFeature({name: e.currentTarget.value})}
          value=${feature.name}/>
      </div>
      <div class="mui-col-xs-4">
        <input
          class="mui--pull-right mui--text-center right"
          type="text"
          oninput=${e => updateFeature({score: Number(e.currentTarget.value || 0)})}
          value=${feature.score}/>
      </div>
    </div>
  `
}

const pieChart = (params) => {

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

  const chart = () => {
    new Chart(
      document.getElementById(params.name),
      { type: 'pie', data: chartData(params.labels, params.data) }
    )
  }

  // Hacky hack
  setTimeout(chart, 50)

  return choo.view`<canvas id=${params.name}></canvas>`
}
