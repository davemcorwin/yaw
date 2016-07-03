export default (tmplt, onload) => {
  if (onload) {
    require('on-load')(tmplt, onload(tmplt))
  }
  return tmplt
}
