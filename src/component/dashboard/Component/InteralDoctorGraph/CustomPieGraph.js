import { ResponsivePie } from '@nivo/pie';
import { Box } from '@chakra-ui/react';
import { useQuery } from 'react-query';
import api from '../../../api/api';

const CustomPieGraph = () => {
  const { data, isLoading, error } = useQuery('pie', () =>
    api.get('api/case/pie').then(res => res.data.data)
  );

  if (isLoading) return '';

  if (error) return 'LOADING...';

  return (
    <Box h={'40vh'}>
      <ResponsivePie
        data={data.map(item => {
          return {
            id:
              item.specialization === 'Internal Medicine'
                ? 'I.M'
                : item.specialization === 'Obstetrics and Gynecology'
                  ? 'OBGYN'
                  : item.specialization,
            label: item.specialization,
            value: item.value,
          };
        })}
        margin={{ top: 100, right: 100, bottom: 100, left: 100 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{
          from: 'color',
          modifiers: [['darker', 0.2]],
        }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: 'color' }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
          from: 'color',
          modifiers: [['darker', 2]],
        }}
      // legends={[
      //   {
      //     anchor: "top",
      //     direction: "column",
      //     justify: false,
      //     translateX: 0,
      //     translateY: 50,
      //     itemsSpacing: 12,
      //     itemWidth: 100,
      //     itemHeight: 10,
      //     itemTextColor: "#999",
      //     itemDirection: "left-to-right",
      //     itemOpacity: 1,
      //     symbolSize: 18,
      //     symbolShape: "circle",
      //     effects: [
      //       {
      //         on: "hover",
      //         style: {
      //           itemTextColor: "#000",
      //         },
      //       },
      //     ],
      //   },
      // ]}
      />
    </Box>
  );
};

export default CustomPieGraph;
