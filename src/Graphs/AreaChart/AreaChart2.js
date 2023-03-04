import { useState } from "react";
import { Area, AreaChart, CartesianGrid, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import toCurrencyAmount from "../../Helpers/toCurrencyAmount";

const data = [
    {
      "name": "item-1",
      "uv": 4000,
      "pv": 2400,
      "amt": 2400
    },
    {
      "name": "item-2",
      "uv": 3000,
      "pv": 1398,
      "amt": 2210
    },
    {
      "name": "item-3",
      "uv": 2000,
      "pv": 9800,
      "amt": 2290
    },
    {
      "name": "item-4",
      "uv": 2780,
      "pv": 3908,
      "amt": 2000
    },
    {
      "name": "item-5",
      "uv": 1890,
      "pv": 4800,
      "amt": 2181
    },
    {
      "name": "item-6",
      "uv": 2390,
      "pv": 3800,
      "amt": 2500
    },
    {
      "name": "item-7",
      "uv": 3490,
      "pv": 4300,
      "amt": 2100
    }
  ]
  export function AreaChart2() {
      let [posData, setposData] = useState({});

    const CustomTooltip = (data) => {
        const { active, payload, label } = data;
        if (active && payload && payload.length) {
          return (
            <div
            //   style={{ backgroundColor: `${payload[0].payload.color}` }}
            style={{ backgroundColor: `#ffff` }}
              className={`relative outline-none rounded-[10px] min-w-[76px] min-h-[40px] flex flex-col items-center justify-between pb-[8px] gap-[1px]`}
            >
              <span
                className={`border-b w-full justify-center items-center flex flex-col text-[12px] leading-[18px] text-ibgy1 tracking-[0.19px]`}
              >
                {`${payload[0].payload.name}`}
                <span className="bg-ibwhite h-[1px] w-[74%]" />
              </span>
              <span
                className={`text-[12px] leading-[18px] text-ibgy1 tracking-[0.19px] pt-[5px]`}
              >{`$${toCurrencyAmount(payload[0].value)}`}</span>
              {/* <span
                className={`text-[12px] leading-[18px] text-ibgy1 tracking-[0.19px]`}
              >
                {payload[0]?.payload?.totalOrders} Orders
              </span> */}
              {/* <span
                style={{ backgroundColor: `${payload[0].payload.color}` }}
                className={`absolute left-[-6px] top-[25px] rotate-[45deg] w-[13px] h-[13px] rounded-[2px]`}
              /> */}
            </div>
          );
        }
        return null;
      };

    const formatYAxis = (tickitem) => {
      // tickitem comes as amount/value of that axis
      return `$${toCurrencyAmount(tickitem)}`;
    };

    return (
      <>
        <ResponsiveContainer width={'100%'} height={250} >
            <AreaChart data={data}
                          margin={{ top: 10, right: 15, left: 15, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#295D93" stopOpacity={0.9}/>
                    <stop offset="100%" stopColor="#8884d8" stopOpacity={0}/>
                  </linearGradient>
                  {/* <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                  </linearGradient> */}
                </defs>
                <XAxis axisLine={true} dataKey="name" />
                <YAxis 
                    axisLine={true}
                    tickLine={!true}
                    tick={{ show: false, fontSize: 14 }}
                    tickFormatter={formatYAxis} 
                />
                <Tooltip
                    content={<CustomTooltip data={data} />}
                    cursor={false}
                    position={{ x: posData.x - 12, y: posData.y - 80 }}
                    wrapperStyle={{ outline: 'none' }}
                  />
                <CartesianGrid strokeDasharray="0 3" yAxis={false}/>
                <Tooltip />
            <Area type="monotone" dataKey="uv" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
            {/* <Area type="monotone" dataKey="pv" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" /> */}
                        </AreaChart>
        </ResponsiveContainer>      
      </>
    )
  }