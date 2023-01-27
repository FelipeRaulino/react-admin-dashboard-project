import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { ResponsivePie } from "@nivo/pie";
import { useGetSalesQuery } from "../state/api";

function BreakdownChart({ isDashboard = false }) {
  const theme = useTheme();

  const colors = [
    theme.palette.secondary[500],
    theme.palette.secondary[300],
    theme.palette.secondary[300],
    theme.palette.secondary[500]
  ];

  const { data, isLoading } = useGetSalesQuery();

  if (!data && isLoading) return "Loading...";

  const formattedData = Object.entries(data.salesByCategory).map(
    ([category, totalSales], i) => ({
      id: category,
      label: category,
      value: totalSales,
      color: colors[i],
    })
  );

  return (
    <Box
      height={isDashboard ? "400px" : "100%"}
      minHeight={isDashboard ? "325px" : undefined}
      minWidth={isDashboard ? "325px" : undefined}
      position="relative"
    >
      {data && !isLoading ? (
        <ResponsivePie
          data={formattedData}
          theme={{
            axis: {
              domain: {
                line: {
                  stroke: theme.palette.secondary[200],
                },
              },
              legend: {
                text: {
                  fill: theme.palette.secondary[200],
                },
              },
              ticks: {
                line: {
                  stroke: theme.palette.secondary[200],
                  strokeWidth: 1,
                },
                text: {
                  fill: theme.palette.secondary[200],
                },
              },
            },
            legends: {
              text: {
                fill: theme.palette.secondary[200],
              },
            },
            tooltip: {
              container: {
                color: theme.palette.primary.main,
              },
            },
          }}
          margin={
            isDashboard
              ? {
                top: 40, right: 80, bottom: 50, left: 100,
              }
              : {
                top: 40, right: 80, bottom: 80, left: 80,
              }
          }
          colors={{ datum: "data.color" }}
          sortByValue
          innerRadius={0.45}
          padAngle={0.7}
          cornerRadius={3}
          activeOuterRadiusOffset={8}
          borderWidth={1}
          borderColor={{
            from: "color",
            modifiers: [
              [
                "darker",
                0.2
              ]
            ],
          }}
          enableArcLinkLabels={!isDashboard}
          arcLinkLabelsSkipAngle={10}
          arcLinkLabelsTextColor={theme.palette.secondary[200]}
          arcLinkLabelsThickness={2}
          arcLinkLabelsColor={{ from: "color" }}
          arcLabelsSkipAngle={10}
          arcLabelsTextColor={{
            from: "color",
            modifiers: [
              [
                "darker",
                2
              ]
            ],
          }}
          legends={[
            {
              anchor: "bottom",
              direction: "row",
              justify: false,
              translateX: isDashboard ? 20 : 0,
              translateY: isDashboard ? 50 : 56,
              itemsSpacing: 0,
              itemWidth: 85,
              itemHeight: 18,
              itemTextColor: "#999",
              itemDirection: "left-to-right",
              itemOpacity: 1,
              symbolSize: 18,
              symbolShape: "circle",
              effects: [
                {
                  on: "hover",
                  style: {
                    itemTextColor: theme.palette.primary[500],
                  },
                }
              ],
            }
          ]}
        />
      ) : <>Loading...</>}
      <Box
        position="absolute"
        top="50%"
        left="50%"
        color={theme.palette.secondary[400]}
        textAlign="center"
        pointerEvents="none"
        sx={{
          transform: isDashboard
            ? "translate(-75%, -170%)"
            : "translate(-50%, -100%)",
        }}
      >
        <Typography variant="h6">
          {!isDashboard && `Total: ${data.yearlySalesTotal}`}
        </Typography>
      </Box>
    </Box>
  );
}

export default BreakdownChart;
