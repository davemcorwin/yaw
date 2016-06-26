import choo  from 'choo'
import _     from 'lodash'
import Chart from 'chart.js'
import * as t from '../templates'

const projectEpics = (state, project) => _
  .chain(state.epic.epics)
  .filter({project: project.id})
  .sortBy('id')
  .value()

const epicFeatures = (state, epic) => _
  .chain(state.feature.features)
  .filter({epic: epic.id})
  .sortBy('id')
  .value()

const epicTotal = (state, epic) => _.sumBy(epicFeatures(state, epic), 'score')

export default (params, state, send) =>  {
  const project = _.find(state.project.projects, { slug: params.project })
  const epics   = projectEpics(state, project)
  const projectScore = _.sumBy(epics, epic => epicTotal(state, epic))

  const labels = epics.map(epic => epic.name)
  const data = epics.map(epic => epicTotal(state, epic))

  return choo.view`
    <main>
      <div class="mui-row">
        <div class="mui-col-xs-4">
          <div class="mui--text-display2">${project.name}</div>
        </div>
        <div class="mui-col-xs-2">
          <div class="mui--text-display2 mui--text-right">${projectScore}</div>
        </div>
      </div>
      <div class="mui-row">
        <div class="mui-col-xs-12 mui-col-lg-6">
          <div class="epic-cards">
            ${epics.map(epic => epicCard({epic, project}, state, send))}
          </div>
          <button class="mui-btn mui-btn--fab mui-btn--primary mui--pull-right" onclick=${() => send('epic:add', { payload: { project: project.id } })}>+</button>
        </div>
        <div class="mui-col-xs-12 mui-col-lg-6">
          <div class="mui-panel epic-cards" style="width: 100%">
            ${t.pieChart({name: 'foo', labels, data})}
          </div>
        </div>
      </div>
    </main>
  `
}

const epicCard = ({epic, project}, state, send) => {
  const features = state.feature.features
    .filter(feature => feature.epic === epic.id)
    .sort((a,b) => a.id - b.id)
  const epicScore = features.reduce((total, feature) => total + feature.score, 0)

  const _updateEpic = attrs =>
    send('epic:update', { payload: { ...epic, ...attrs } })

  const updateEpic = _.debounce(_updateEpic, 300)

  const deleteEpic = () => send('epic:delete', { payload: { id: epic.id } })

  return choo.view`
    <div class="mui-row">
      <div class="mui-col-xs-12">
        <div class="mui-panel hoverable epic-card">
          <div class="delete-link-wrapper">
            <a class="delete-link mui--text-button mui--pull-right" href="#" onclick=${deleteEpic}>x</a>
          </div>
          <div class="mui-row feature-row">
            <div class="mui-col-xs-9">
              <input
                class="mui--text-headline left"
                type="text"
                oninput=${e => updateEpic({name: e.currentTarget.value})}
                tabindex="-1"
                value=${epic.name}/>
            </div>
            <div class="mui-col-xs-3 mui--text-right">
              <span class="mui--text-headline">${epicScore}</span>
            </div>
          </div>
          <div class="feature-cards">
            ${features.map(feature => t.featureRow({ feature }, state, send))}
            <div class="mui-row">
              <div class="mui-col-xs-1 mui-col-xs-offset-11 feature-row">
                <button class="mui-btn mui-btn--raised mui-btn--small mui--pull-right feature-add" onclick=${() => send('feature:add', { payload: { project: project.id, epic: epic.id } })}>Add</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
}
