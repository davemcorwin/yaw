import choo from 'choo'
import _ from 'lodash'

export default ({ feature }, __, send) => {

  const _updateFeature = attrs =>
    send('feature:update', { payload: { ...feature, ...attrs } })

  const updateFeature = _.debounce(_updateFeature, 300)

  const updateName = e => updateFeature({name: e.currentTarget.value})
  const updateScore = e => updateFeature({score: Number(e.currentTarget.value || 0)})
  const deleteFeature = () => send('feature:delete', { payload: { id: feature.id } })

  return choo.view`
    <div class="mui-row feature-row">
      <div class="mui-col-xs-7">
        <input
          class="left"
          type="text"
          oninput=${updateName}
          tabindex="-1"
          value=${feature.name}/>
      </div>
      <div class="mui-col-xs-4">
        <input
          class="mui--pull-right mui--text-right right"
          type="text"
          oninput=${updateScore}
          value=${feature.score}/>
      </div>
      <div class="mui-col-xs-1">
        <a
          class="delete-link mui--text-button"
          href="#"
          onclick=${deleteFeature}>
          x
        </a>
      </div>
    </div>
  `
}
