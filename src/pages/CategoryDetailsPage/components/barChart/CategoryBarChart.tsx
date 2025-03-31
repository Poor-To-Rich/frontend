import { BarChart, Bar, XAxis, YAxis, LabelList, ResponsiveContainer } from 'recharts';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import CustomizedLabel from './CustomizedLabel';

const CategoryBarChart = () => {
  const monthlyBalances = [
    { month: 'January', amount: 12000 },
    { month: 'February', amount: 9000 },
    { month: 'March', amount: 15000 },
    { month: 'April', amount: 8000 },
    { month: 'May', amount: 11000 },
    { month: 'June', amount: 9500 },
    { month: 'July', amount: 1400 },
    { month: 'August', amount: 10000 },
    { month: 'September', amount: 1300000000 },
    { month: 'October', amount: 7000 },
    { month: 'November', amount: 12500 },
    { month: 'December', amount: 8500 },
  ];

  return (
    <Swiper
      spaceBetween={0}
      breakpoints={{
        0: { slidesPerView: 5 },
        380: { slidesPerView: 6 },
        500: { slidesPerView: 7 },
      }}>
      {monthlyBalances.map((item, index) => (
        <SwiperSlide key={index}>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={[item]} margin={{ top: 30, right: 20, bottom: 0, left: 20 }}>
              <XAxis
                type="category"
                dataKey="month"
                axisLine={false}
                tickLine={false}
                interval={0}
                tickFormatter={_ => `${index + 1}월`}
              />
              <YAxis type="number" dataKey="amount" hide domain={[1, 16000]} />
              <Bar
                dataKey="amount"
                fill="#ffcbc4"
                background={{ fill: '#f0f0f0', stroke: 'none', radius: 15 }}
                radius={15}
                barSize={25}>
                <LabelList dataKey="amount" position="top" fontSize={11} content={CustomizedLabel} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default CategoryBarChart;
