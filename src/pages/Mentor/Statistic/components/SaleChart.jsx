import { getMonth } from "date-fns";
import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import menteeApplicationApi from "../../../../api/menteeApplication";
import paymentApi from "../../../../api/payment";
import YearPicker from "../../../../components/YearPicker";
import { PlanType } from "../../../../constants";
import { useUserStore } from "../../../../store/userStore";
import formatCurrency from "../../../../utils/currency";

export default function SalesChart() {
  const { user } = useUserStore();
  const [year, setYear] = useState(new Date().getFullYear());
  const [total, setTotal] = useState(0);
  const [standard, setStandard] = useState([]);
  const [lite, setLite] = useState([]);
  const [pro, setPro] = useState([]);

  const mappingChartData = (data) => {
    const liteData = filterDataByPlanName(data, PlanType.LITE);
    const standardData = filterDataByPlanName(data, PlanType.STANDARD);
    const proData = filterDataByPlanName(data, PlanType.PRO);
    setLite(liteData);
    setStandard(standardData);
    setPro(proData);
    getTotal(data);
    // const chartData = data.reduce((acc, item) => {
    //   const month = getMonth(item.createdAt);
    //   acc[month] = acc[month] + item.price;
    //   return acc;
    // }, new Array(12).fill(0));
    return chartData;
  };
  const getTotal = (data) => {
    const sum = data.reduce((acc, i) => {
      return acc + i.price;
    }, 0);
    setTotal(sum);
  };
  const filterDataByPlanName = (data, planName) => {
    const d = data
      .filter((item) => item.application.plan.name === planName)
      .reduce((acc, item) => {
        const month = getMonth(item.createdAt);
        acc[month] = acc[month] + item.price;
        return acc;
      }, new Array(12).fill(0));
    return d;
  };

  useEffect(() => {
    const fetchData = async () => {
      const payments = await paymentApi.getPaymentsByMentorId(user.id, year);
      const paymentWithApplication = await Promise.all(
        payments.map(async (payment) => {
          const application =
            await menteeApplicationApi.getMenteeApplicationById(
              payment.menteeApplicationId
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

  const borderColor = "#F3F4F6";
  const labelColor = "#6B7280";
  const opacityFrom = 0.45;
  const opacityTo = 0;

  const options = {
    stroke: {
      curve: "smooth",
    },
    chart: {
      type: "area",
      fontFamily: "Inter, sans-serif",
      foreColor: labelColor,
      toolbar: {
        show: false,
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        opacityFrom,
        opacityTo,
        type: "vertical",
      },
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      style: {
        fontSize: "14px",
        fontFamily: "Inter, sans-serif",
      },
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
    markers: {
      size: 5,
      strokeColors: "#ffffff",
      hover: {
        size: undefined,
        sizeOffset: 3,
      },
    },
    xaxis: {
      categories: [
        "Tháng 1",
        "Tháng 2",
        "Tháng 3",
        "Tháng 4",
        "Tháng 5",
        "Tháng 6",
        "Tháng 7",
        "Tháng 8",
        "Tháng 9",
        "Tháng 10",
        "Tháng 11",
        "Tháng 12",
      ],
      labels: {
        style: {
          colors: [labelColor],
          fontSize: "14px",
          fontWeight: 500,
        },
      },
      axisBorder: {
        color: borderColor,
      },
      axisTicks: {
        color: borderColor,
      },
      crosshairs: {
        show: true,
        position: "back",
        stroke: {
          color: borderColor,
          width: 1,
          dashArray: 10,
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: [labelColor],
          fontSize: "14px",
          fontWeight: 500,
        },
        formatter: function (value) {
          return formatCurrency(value);
        },
      },
    },
    legend: {
      fontSize: "14px",
      fontWeight: 500,
      fontFamily: "Inter, sans-serif",
      labels: {
        colors: [labelColor],
      },
      itemMargin: {
        horizontal: 10,
      },
    },
    responsive: [
      {
        breakpoint: 1024,
        options: {
          xaxis: {
            labels: {
              show: false,
            },
          },
        },
      },
    ],
  };
  const series = [
    {
      name: "Gói lite",
      data: lite,
      color: "#007BFF",
    },
    {
      name: "Gói standard",
      data: standard,
      color: "#28A745",
    },
    {
      name: "Gói pro",

      // data: pro
      data: [6218, 6156, 6526, 6356, 6256, 6056],
      color: "#DC3545",
    },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <h3 style={{ fontWeight: "bold" }}>Báo cáo doanh thu</h3>
      <YearPicker value={year} onChange={(e) => setYear(e.target.value)} />
      <h4 style={{ alignSelf: "flex-end" }}>
        Tổng cộng <strong>{formatCurrency(total)}</strong>
      </h4>
      <Chart height={420} options={options} series={series} type="area" />;
    </div>
  );
}
