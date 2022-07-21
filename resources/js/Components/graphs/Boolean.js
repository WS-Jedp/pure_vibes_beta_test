import React from 'react'
import { PieChart, Pie, Cell } from 'recharts';

export const Boolean = ({ data }) => {

    const colors = {
        Yes: "#00C49F",
        No: "#d35151"
    }

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
      };

    return (
        <>
            <PieChart width={270} height={240} className="m-4">
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                >
                        {data.map((entry, index) => {
                            console.log(entry.name, " ppp")
                            return (
                                <Cell key={`cell-${index}`} fill={colors[entry.name] } />
                            )})
                        }
                </Pie>
            </PieChart>
            <div className="flex items-center">
                <p>Yes: </p>
                <div className="bg-green-500 w-3 h-3 mr-4"></div>
                <p>No: </p>
                <div className="bg-red-500 w-3 h-3"></div>
            </div>
        </>
    )
}
