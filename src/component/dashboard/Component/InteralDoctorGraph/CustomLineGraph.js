import { ResponsiveLine } from '@nivo/line';
import { useState, useEffect } from 'react';
import { CaseData, SpecializationData } from '../../Packages';
import { Box, Select } from '@chakra-ui/react';
import api from '../../../api/api';
import useAuth from '../../../context/AuthContext.js';

const CustomLineGraph = () => {
  const [lineGraphData, setLineGraphData] = useState();
  const [year, setYear] = useState([]);
  const [yr, setYr] = useState('2022');
  const { chartDat, getChartData } = useAuth();

  const configYear = () => {
    //CHANGES APPLY HERE
    //Configure dropdown year for dashboard of User UI
    const list = [];
    let year = new Date().getFullYear();
    for (let i = year; i > 2018; i--) {
      list.push(i);
    }
    setYear(list);
  };

  useEffect(() => {
    getChartData();
  }, []);

  return (
    <Box p={[0, 0, 4, 4]}>
      <Select border={2} width={40} placeholder="Select option">
        {year.map(value => {
          return (
            <option key={value} value={value}>
              {value}
            </option>
          );
        })}
      </Select>
      <Box h={['30vh', '40vh', '40vh', '40vh']}>
        <ResponsiveLine
          height={400}
          data={chartDat}
          margin={{ top: 60, right: 40, bottom: 60, left: 60 }}
          xScale={{ type: 'point' }}
          yFormat=" >-.0f"
          axisRight={null}
          // axisBottom={{
          //   orient: 'bottom',
          //   tickSize: 5,
          //   tickPadding: 5,
          //   tickRotation: 0,
          //   legendOffset: 50,
          //   legendPosition: 'middle',
          // }}
          axisLeft={{
            orient: 'left',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legendOffset: -50,
            legendPosition: 'middle',
          }}
          pointSize={5}
          pointColor={{ theme: 'background' }}
          pointBorderWidth={4}
          pointBorderColor={{ from: 'serieColor' }}
          pointLabelYOffset={-12}
          useMesh={true}
          curve="catmullRom"
          lineWidth={3}
          legends={[
            {
              anchor: 'top',
              direction: 'row',
              justify: false,
              translateX: 0,
              translateY: -50,
              itemsSpacing: 0,
              itemDirection: 'left-to-right',
              itemWidth: 170,
              itemHeight: 20,
              itemOpacity: 1,
              symbolSize: 14,
              symbolShape: 'circle',
              symbolBorderColor: 'rgba(0, 0, 0, .5)',
            },
          ]}
        />
      </Box>
    </Box>
  );
};

export default CustomLineGraph;
