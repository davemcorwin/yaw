import choo from 'choo'
import _ from 'lodash'
import { onload } from '../utils'

export default ({ feature }, __, send) => {

  const _updateFeature = attrs =>
    send('feature:update', { payload: { ...feature, ...attrs } })

  const updateFeature = _.debounce(_updateFeature, 300)

  const updateName = e => updateFeature({name: e.currentTarget.value})
  const updateScore = e => updateFeature({score: Number(e.currentTarget.value || 0)})
  const deleteFeature = () => send('feature:delete', { payload: { id: feature.id } })

  return onload(choo.view`
    <div class="row">
      <div class="column column-70">
        <input
          class="editable left"
          type="text"
          oninput=${updateName}
          tabindex="-1"
          value=${feature.name}/>
      </div>
      <div class="column column-20">
        <input
          class="editable"
          type="text"
          oninput=${updateScore}
          value=${feature.score}/>
      </div>
      <div class="column column-10">
        <a
          class="delete-link"
          href="#"
          onclick=${deleteFeature}>
          x
        </a>
      </div>
    </div>
  `,
  tree => tree.querySelector('input.left').focus()
  )
}
