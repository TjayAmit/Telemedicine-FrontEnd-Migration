import { ResponsiveLine } from "@nivo/line";
import { useState, useEffect } from "react";
import {
  CaseData,
  SpecializationData
} from '../../Pages/ComponentData/CaseData'
import { Box, Select } from "@chakra-ui/react";

const ExternalDoctorLineGraph = () => {
  const [lineGraphData, setLineGraphData] = useState([]);
  const [year, setYear] = useState([]);
  const [yr, setYr] = useState("2022");

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

  const configLineGraph = () => {
    //CHANGE APPLY HERE TO DISPLAY DATA IN LINE GRAPH FOR EVERY SPECIALIZATION
    let list = [];

    SpecializationData.forEach((specialization) => {
      const groups = {};
      CaseData.filter(
        (data) => data.specialization === specialization.specialization
      )
        .filter((e) => parseInt(yr) === parseInt(e.date.substring(0, 4)))
        .forEach(function (val) {
          const dates = new Date(val.date);
          const date = dates.toLocaleString("en-us", { month: "short" });
          if (date in groups) {
            groups[date].push(val._id);
          } else {
            groups[date] = new Array(val._id);
          }
        });
      list.push({
        id: specialization.specialization,
        color: "hsl(169, 100%, 94%)",
        data: [
          groups?.Jan ? { x: "Jan", y: groups.Jan.length } : { x: "Jan", y: 0 },
          groups?.Feb ? { x: "Feb", y: groups.Feb.length } : { x: "Feb", y: 0 },
          groups?.Mar ? { x: "Mar", y: groups.Mar.length } : { x: "Mar", y: 0 },
          groups?.Apr ? { x: "Apr", y: groups.Apr.length } : { x: "Apr", y: 0 },
          groups?.May ? { x: "May", y: groups.May.length } : { x: "May", y: 0 },
          groups?.Jun ? { x: "Jun", y: groups.Jun.length } : { x: "Jun", y: 0 },
          groups?.Jul ? { x: "Jul", y: groups.Jul.length } : { x: "Jul", y: 0 },
          groups?.Aug ? { x: "Aug", y: groups.Aug.length } : { x: "Aug", y: 0 },
          groups?.Sep ? { x: "Sep", y: groups.Sep.length } : { x: "Sep", y: 0 },
          groups?.Oct ? { x: "Oct", y: groups.Oct.length } : { x: "Oct", y: 0 },
          groups?.Nov ? { x: "Nov", y: groups.Nov.length } : { x: "Nov", y: 0 },
          groups?.Dec ? { x: "Dec", y: groups.Dec.length } : { x: "Dec", y: 0 },
        ],
      });
    });

    setLineGraphData(list);
  };

  useEffect(() => {
    configYear();
    configLineGraph();
  }, []);

  return (
    <Box p={5}>
      <Select border={2} width={40} placeholder="Select option">
        {year.map((value) => {
          return (
            <option key={value} value={value}>
              {value}
            </option>
          );
        })}
      </Select>
      <Box h={"40vh"}>
        <ResponsiveLine
          data={lineGraphData}
          margin={{ top: 60, right: 40, bottom: 60, left: 60 }}
          xScale={{ type: "point" }}
          yFormat=" >-.0f"
          axisTop={null}
          axisRight={null}
          axisBottom={{
            orient: "bottom",
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legendOffset: 50,
            legendPosition: "middle",
          }}
          axisLeft={{
            orient: "left",
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legendOffset: -50,
            legendPosition: "middle",
          }}
          pointSize={5}
          pointColor={{ theme: "background" }}
          pointBorderWidth={4}
          pointBorderColor={{ from: "serieColor" }}
          pointLabelYOffset={-12}
          useMesh={true}
          curve="catmullRom"
          lineWidth={3}
          legends={[
            {
              anchor: "top",
              direction: "row",
              justify: false,
              translateX: 0,
              translateY: -50,
              itemsSpacing: 0,
              itemDirection: "left-to-right",
              itemWidth: 170,
              itemHeight: 20,
              itemOpacity: 1,
              symbolSize: 14,
              symbolShape: "circle",
              symbolBorderColor: "rgba(0, 0, 0, .5)",
            },
          ]}
        />
      </Box>
    </Box>
  );
};

export default ExternalDoctorLineGraph;
