import React from 'react'
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from 'recharts'
import CustomTooltip from './CustomTooltip'
import CustomLegend from './CustomLegend'

function CustomPieChart({
    data,
    label,
    totalAmt,
    colors,
    showTextAnchor
}) {
  return (
    <ResponsiveContainer width="100%" height={380}>
    <PieChart>
      <Pie
        data={data}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={130}
        labelLine={false}
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
        ))}
      </Pie>
      <Tooltip content={<CustomTooltip />} />
      <Legend content={<CustomLegend />} />

        {showTextAnchor && (
            <>
            <text
                x="50%"
                y="50%"
                dy={-25}
                textAnchor="middle"
                fill="#000"
                fontSize="14px"
                
            >
                {label}
            </text>
            <text
                x="50%"
                y="50%"
                dy={8}
                textAnchor="middle"
                fill="#333"
                fontSize="24px"
                fontWeight="semi-bold"
            >
                {totalAmt}
            </text>
        </>
        )}

    </PieChart>
  </ResponsiveContainer>
  )
}

export default CustomPieChart