import React from 'react';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryLegend, VictoryContainer } from 'victory';

export default function Visuals({ inhaleExhaleData }) {
  const colorScale = ['#0282bf', '#50CDFD']; // Colors for inhale and exhale

  return (
    <div
    style={{
      width: "100%", /* Set the container width to 100% */
      height: '100%',
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    }}
    >
      <VictoryChart
        domainPadding={{ x: 50 }}
        containerComponent={
        <VictoryContainer
          responsive={true}
        />}
      >
        <VictoryAxis
          domain={[1,5]}
          tickFormat={(tick) => `${tick}`} // Convert the tick values to strings
          label="Breathing Cycles"
          style={{
            tickLabels: { fontSize: 6 }, // Adjust font size for tick labels
            axisLabel: { fontSize: 6 }, // Adjust font size for axis label
          }}
        />
        <VictoryAxis
          dependentAxis
          domain={[0, 15]}
          tickFormat={(tick) => `${tick}s`}
          tickCount={5}
          label="Duration (seconds)"
          style={{
            tickLabels: { fontSize: 6 }, // Adjust font size for tick labels
            axisLabel: { fontSize: 6 }, // Adjust font size for axis label
          }}
        />
        <VictoryBar
          data={inhaleExhaleData}
          x="index"
          y="duration"
          barWidth={5}
          style={{
            data: {
              fill: ({ datum }) => (datum.phase === 'inhale' ? '#0282bf' : '#50CDFD'),
            },
          }}
        />
      <VictoryLegend
        x={300}
        y={100}
        orientation="horizontal"
        colorScale={colorScale}
        style={{
          labels: { fontSize: 8 }, // Adjust font size for legend labels
        }}
        data={[
          { name: 'Inhale', symbol: { fill: colorScale[0] } },
          { name: 'Exhale', symbol: { fill: colorScale[1] } },
        ]}
      />
      </VictoryChart>
      
    </div>
  );
}
