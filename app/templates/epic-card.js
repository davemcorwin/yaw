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
    <div class="card epic-card">
      <div class="container">
        <div class="delete-link-wrapper">
          <a class="delete-link" href="#" onclick=${deleteEpic}>x</a>
        </div>
        <div class="row">
          <div class="column column-90">
            <input
              class="editable"
              type="text"
              oninput=${updateName}
              tabindex="-1"
              value=${epic.name}/>
          </div>
          <div class="column column-10">
            <span>${epicScore}</span>
          </div>
        </div>

        ${features.map(feature => featureRow({ feature }, state, send))}

        <div class="row">
          <div class="add-button column">
            <button class="button button-clear" onclick=${addFeature}>Add</button>
          </div>
        </div>
      </div>

    </div>
  `
}
