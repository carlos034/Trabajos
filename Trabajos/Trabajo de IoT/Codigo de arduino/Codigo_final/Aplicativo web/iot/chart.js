let chart1;
let chart2;

const getOptionChart1 = (voltageValue) => {
  return {
    tooltip: {
      formatter: '{a} <br/>{b} : {c}'
    },
    series: [{
      name: 'Voltaje',
      type: 'gauge',
      detail: {
        formatter: '{value}'
      },
      data: [{
        value: voltageValue,
        name: 'Voltaje'
      }],
      max: 4.2
    }]
  };
}

const getOptionChart2 = (ntuValue) => {
  return {
    tooltip: {
      formatter: '{a} <br/>{b} : {c}'
    },
    series: [{
      name: 'Turbidez',
      type: 'gauge',
      detail: {
        formatter: '{value}'
      },
      data: [{
        value: ntuValue,
        name: 'NTU'
      }],
      max: 3000
    }]
  };
}

const updateCharts = () => {
  fetch('http://localhost:3050/sensor-data')
    .then(response => response.json())
    .then(data => {
      // Obtener los valores del objeto data
      const voltage = data.voltage;
      const ntu = data.ntu;
      const timestamp = data.timestamp;
      const state = data.state;

      // Actualizar los gráficos con los nuevos valores
      chart1.setOption(getOptionChart1(voltage));
      chart2.setOption(getOptionChart2(ntu));

      // Actualizar el timestamp en el HTML
      document.getElementById('timestamp').innerText = new Date(timestamp).toLocaleString();
      document.getElementById('state').innerText = state;
    })
    .catch(error => console.error('Error al obtener datos del sensor:', error));
};

const initCharts = () => {
  chart1 = echarts.init(document.getElementById("chart1"));
  chart2 = echarts.init(document.getElementById("chart2"));

  chart1.setOption(getOptionChart1(0)); // Establecer un valor inicial
  chart2.setOption(getOptionChart2(0)); // Establecer un valor inicial
};



window.addEventListener("load", () => {
  initCharts();
  // Actualizar los gráficos cada segundo
  setInterval(updateCharts, 1000);
});
