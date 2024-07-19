import React from 'react'
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from 'recharts';

const TimeChart = ({ data }) => {
  return (
    <>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data}>
          <XAxis dataKey="time" />
          <Tooltip />
          <Bar dataKey="posts" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </>
  )
}

export default TimeChart