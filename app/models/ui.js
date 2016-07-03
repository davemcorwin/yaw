export default {
  namespace: 'ui',
  state: {
    showSidenav: false
  },
  reducers: {
    hideSidenav: (_, state) => ({ ...state, showSidenav: false }),
    showSidenav: (_, state) => ({ ...state, showSidenav: true })
  }
}
