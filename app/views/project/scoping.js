import choo from 'choo'
import * as t from '../../templates'

export default (params, state, send) => {

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

  const project = params.project
  const epics   = projectEpics(state, project)
  const projectScore = _.sumBy(epics, epic => epicTotal(state, epic))

  const labels = epics.map(epic => epic.name)
  const data = epics.map(epic => epicTotal(state, epic))

  const addEpic = () => send('epic:add', { payload: { project: project.id } })

  return choo.view`
    <div class="mui-row">
      <div class="mui-col-xs-10">
        <div class="mui--text-display2 mui--text-right">${projectScore}</div>
        <div class="tab-content">
          <div class="flex-container">
            ${epics.map(epic => t.epicCard({epic, project}, state, send))}
          </div>
        </div>
        <div class="mui-row">
          <div class="mui-col-xs-12 mui-col-lg-6">
            <div class="epic-cards">

            </div>
            <button class="mui-btn mui-btn--fab mui-btn--primary mui--pull-right" onclick=${addEpic}>+</button>
          </div>
          <div class="mui-col-xs-12 mui-col-lg-6">
            <div class="mui-panel epic-cards" style="width: 100%">
              ${t.pieChart({name: 'foo', labels, data})}
            </div>
          </div>
        </div>
      </div>
    </div>
    `
}
