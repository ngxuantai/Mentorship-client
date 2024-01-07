import {getMonth} from 'date-fns';
import {useEffect, useState} from 'react';
import Chart from 'react-apexcharts';
import 'svgmap/dist/svgMap.min.css';

import learningProgressApi from '../../../../api/learningProgress';
import menteeApplicationApi from '../../../../api/menteeApplication';
import YearPicker from '../../../../components/YearPicker';
import {PlanType} from '../../../../constants';
import {useUserStore} from '../../../../store/userStore';

export default function MenteeChart() {
  const {user} = useUserStore();
  const [year, setYear] = useState(new Date().getFullYear());
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [standard, setStandard] = useState([]);
  const [lite, setLite] = useState([]);
  const [pro, setPro] = useState([]);
  const borderColor = '#F3F4F6';
  const labelColor = '#6B7280';

  const mappingChartData = (data) => {
    const liteData = filterDataByPlanName(data, PlanType.LITE);
    const standardData = filterDataByPlanName(data, PlanType.STANDARD);
    const proData = filterDataByPlanName(data, PlanType.PRO);
    console.log('mappingChartData', {liteData, standardData, proData});
    setLite(liteData);
    setStandard(standardData);
    setPro(proData);
    getTotal(data);

    return chartData;
  };

  const getTotal = (data) => {
    const sum = data.reduce((acc, i) => {
      return acc + 1;
    }, 0);
    setTotal(sum);
  };
  const filterDataByPlanName = (data, planName) => {
    const d = data
      .filter((item) => item.application.plan.name === planName)
      .reduce((acc, item) => {
        const month = getMonth(item.startDate);
        acc[month] = acc[month] + 1;
        return acc;
      }, new Array(12).fill(0));
    return d;
  };

  useEffect(() => {
    const fetchData = async () => {
      const payments = await learningProgressApi.getLearningProgressByMentorId(
        user.id,
        year
      );
      const paymentWithApplication = await Promise.all(
        payments.map(async (payment) => {
          const application =
            await menteeApplicationApi.getMenteeApplicationById(
              payment.applicationId
            );
          return {
            ...payment,
            application,
          };
        })
      );
      mappingChartData(paymentWithApplication);
    };
    if (user) {
      fetchData();
    }
  }, [year, user]);

  const options = {
    chart: {
      type: 'bar',
      fontFamily: 'Inter, sans-serif',
      foreColor: labelColor,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        endingShape: 'rounded',
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent'],
    },
    grid: {
      show: true,
      borderColor: borderColor,
      strokeDashArray: 1,
      padding: {
        left: 35,
        bottom: 15,
      },
    },
    xaxis: {
      categories: [
        'Tháng 1',
        'Tháng 2',
        'Tháng 3',
        'Tháng 4',
        'Tháng 5',
        'Tháng 6',
        'Tháng 7',
        'Tháng 8',
        'Tháng 9',
        'Tháng 10',
        'Tháng 11',
        'Tháng 12',
      ],
      labels: {
        style: {
          colors: [labelColor],
          fontSize: '14px',
          fontWeight: 500,
        },
      },
      axisBorder: {
        color: borderColor,
      },
      axisTicks: {
        color: borderColor,
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: [labelColor],
          fontSize: '14px',
          fontWeight: 500,
        },
        labels: {
          style: {
            colors: [labelColor],
            fontSize: '14px',
            fontWeight: 500,
          },
        },
        formatter: function (value) {
          return `${value} học viên`;
        },
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      style: {
        fontSize: '14px',
        fontFamily: 'Inter, sans-serif',
      },
    },
  };

  const series = [
    {
      name: 'Gói lite',
      data: lite,
      color: '#007BFF',
    },
    {
      name: 'Gói standard',
      data: standard,
      color: '#28A745',
    },
    {
      name: 'Gói pro',

      // data: pro
      data: [23, 12, 43, 24, 44, 12],
      color: '#DC3545',
    },
  ];

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '90%',
        margin: '0 auto',
      }}
    >
      <h3 style={{fontWeight: 'bold'}}>Số học viên</h3>

      <YearPicker value={year} onChange={(e) => setYear(e.target.value)} />
      <h4 style={{alignSelf: 'flex-end'}}>
        Tổng cộng <strong>{total} học viên</strong>
      </h4>
      <Chart height={420} options={options} series={series} type="bar" />
    </div>
  );
}
