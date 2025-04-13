import React from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Cell
} from "recharts";

const CustomBarChart = ({ data, xAxisKey }) => {
    
    const getBarColor = (index) => {
        const colors = ["#FF8042", "#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
        return colors[index % colors.length];
    };

    const CustomTooltip = ({ active, payload }) => {
        if(active && payload && payload.length) {
            return (
                <div className="bg-white p-2 rounded shadow-lg">
                    <p className="label">{`${xAxisKey}: ${payload[0].payload[xAxisKey]}`}</p>
                    <p className="label">{`Amount: ${payload[0].value}`}</p>
                </div>
            )
        }
        return null;
    }

    return (
        <div className="bg-white mt-6">
  <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
            <CartesianGrid stroke="none" />
            <XAxis dataKey={xAxisKey} tick={{ fontSize: 12, fill: "#555" }} />
            <YAxis tick={{ fontSize: 12, fill: "#555" }} stroke="none" />
            <Tooltip content={CustomTooltip} />
            <Bar
                dataKey="amount"
                fill="#FF8042"
                radius={[10, 10, 0, 0]}
                activeDot={{ r: 8, fill: "yellow" }}
                activeStyle={{ fill: "green" }}
            >
                {data.map((entry, index) => (
                <Cell key={index} fill={getBarColor(index)} />
                ))}
            </Bar>
            </BarChart>
        </ResponsiveContainer>
        </div>

    )
}

export default CustomBarChart;