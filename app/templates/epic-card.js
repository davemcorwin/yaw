import choo from 'choo'
import _ from 'lodash'
import featureRow from './feature-row'

export default ({epic, project}, state, send) => {
  const features = _
    .chain(state.feature.features)
    .filter({epic: epic.id})
    .sortBy('id')
    .value()

  const epicScore = _.sumBy(features, 'score')

  const _updateEpic = attrs =>
    send('epic:update', { payload: { ...epic, ...attrs } })

  const updateEpic = _.debounce(_updateEpic, 300)

  const updateName = e => updateEpic({name: e.currentTarget.value})
  const addFeature = () => send('feature:add', { payload: { project: project.id, epic: epic.id } })
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
                oninput=${updateName}
                tabindex="-1"
                value=${epic.name}/>
            </div>
            <div class="mui-col-xs-3 mui--text-right">
              <span class="mui--text-headline">${epicScore}</span>
            </div>
          </div>
          <div class="feature-cards">
            ${features.map(feature => featureRow({ feature }, state, send))}
            <div class="mui-row">
              <div class="mui-col-xs-1 mui-col-xs-offset-11 feature-row">
                <button class="mui-btn mui-btn--raised mui-btn--small mui--pull-right feature-add" onclick=${addFeature}>Add</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
}
