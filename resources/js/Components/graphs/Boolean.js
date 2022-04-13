import React from 'react'
import { PieChart, Pie, Cell } from 'recharts'

export const Boolean = ({data}) => {

    const colors = [
        "#8884d8",
        "#d35151"
    ]

    return (
        <PieChart width={270} height={240} className="m-4">
            <Pie
                data={data}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey={"value"}
                nameKey="name"
                label
                legendType='square'
            >
                {
                    data.map((entry, index) => (
                        <Cell key={`cell-${index}`} color={"#8884d8"} />
                    ))
                }
            </Pie>
        </PieChart>
    )
}