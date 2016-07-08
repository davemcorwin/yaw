
export default (view, params, state, send, layouts) =>
  layout({ ...params, child: view }, state, send)
