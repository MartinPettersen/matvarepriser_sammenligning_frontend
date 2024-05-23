import { PricePoint, StorePrice } from '@/app/utils/types'
import React from 'react'
import { Line } from 'react-chartjs-2'
import 'chart.js/auto'

type Props = {
    storePrices: StorePrice[]
}

const Chart = ({storePrices}: Props) => {
    const datae = storePrices[0]["price_history"]
    console.log("The datae")
    console.log(typeof(datae))
    //console.log(datae)
    const dates = []
    const price_data = []

    for (let i = 0; i < datae.length; i++){
        console.log(datae[i])
        dates.push(datae[i]["date"].substr(0, 10))
        price_data.push(datae[i]["price"])
    }

 //   console.log(dates)
  //  console.log(price_data)
    const test_data = {
        labels: dates,
        datasets: [
            {
                label: 'My Firsts dataset',
                backgroundColor: 'rgba(75,192,192,0.2)',
                borderColor: 'rgba(75,192,192,1)',
                data: price_data,
            },
        ],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
            }
        }
    }

  return (
    <Line data={test_data} options={options} />
  )
}

export default Chart