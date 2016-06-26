import choo from 'choo'

export default (params) => {

  const chartData = (labels, data) => ({
    labels: labels,
    datasets: [{
      data: data,
      backgroundColor: [
        "#EF9A9A",
        "#B39DDB",
        "#90CAF9",
        "#A5D6A7",
        "#FFF59D",
        "#BCAAA4",
        "#B0BEC5"
      ],
      hoverBackgroundColor: [
        "#EF9A9A",
        "#B39DDB",
        "#90CAF9",
        "#A5D6A7",
        "#FFF59D",
        "#BCAAA4",
        "#B0BEC5"
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
