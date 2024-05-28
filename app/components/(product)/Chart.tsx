import { PricePoint, StorePrice } from '@/app/utils/types'
import React from 'react'
import { Line } from 'react-chartjs-2'
import 'chart.js/auto'

type Props = {
    storePrices: StorePrice[]
}

const Chart = ({storePrices}: Props) => {

    const datasets_temp = []

    let dates = []
    for (let j = 0; j <storePrices.length; j++){
        const datae = storePrices[j]["price_history"]
        const price_data = []

        dates = []
        for (let i = 0; i < datae.length; i++){
            dates.push(datae[i]["date"].substr(0, 10))
            price_data.push(datae[i]["price"])
        }
        const dataset = {
            label: storePrices[j]["store"],
            backgroundColor: `rgba(${0 + (30 *j)},${60 - (0 *j)},${190 - (30 *j)},0.2)`,
            borderColor: `rgba(${0 + (30 *j)},${60 - (0 *j)},${190 - (30 *j)},1)`,
            data: price_data,
        }

        datasets_temp.push(dataset)
    }

    const test_data = {
        labels: dates,
        datasets: datasets_temp,
    };

    const options = {
        scales: {
           
        }
    }

  return (
    <Line data={test_data} options={options} />
  )
}

export default Chart