import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import AxiosInstance from "../api";

export default function BasicPie() {
  const [data, setData] = React.useState([]);
  const [companyCount, setCompanyCount] = React.useState({});

  // Function to fetch data
  const getData = async () => {
    try {
      const appResponse = await AxiosInstance.get("api/applications");
      console.log("app response from pie --------->", appResponse.data);

      // Assuming the response data has a structure like this:
      // [{ label: 'Category A', value: 10 }, { label: 'Category B', value: 20 }]
      setData(appResponse.data);
    } catch (error) {
      console.log("error from pie ----------->", error);
    }
  };

  const gettingStatics = () => {
    data.reduce((acc, item) => {
      acc[item.company_name] = (acc[item.company_name] || 0) + 1;
      return acc;
    });
  };

  // Fetch data on component mount
  React.useEffect(() => {
    getData();

    const count = data.reduce((acc, item) => {
      // Increment the count for the company_name
      acc[item.company_name] = (acc[item.company_name] || 0) + 1;
      console.log("acc is ------------>", acc);
      return acc;
    }, {});

    const dict = {
      company_name: 123,
    };

    setCompanyCount(count);
  }, []);

  const dataTest = {
    Applied: 3,
    Interview: 3,
    Offer: 2,
    Rejected: 3,
  };

  console.log("company count is ---------->", companyCount);
  console.log("company count is 00---------->", companyCount["Meta"]);
  console.log("applied_status_stats ---------->", data["applied_status_stats"]);
  const companyDict = data.reduce((acc, item) => {
    return item.applied_status_stats
  }, {});

  console.log("888888888888888888888", companyDict);
  // Output: { 21: 'Meta', 20: 'Meta', 19: 'Google' }

  // Output: { 21: 'Meta', 20: 'Meta', 19: 'Google' }

  return (
    <>
      <PieChart
        series={[
          // {
          //   data: data.map((item, index) => ({
          //     id: index,
          //     value: companyCount["Meta"], // Assume the response has `value` field
          //     label: companyCount.company_name, // Assume the response has `label` field
          //   })),
          // },
          {
            data: Object.entries(companyDict).map(([key, value]) => ({
              id: key,
              value: value,
              label: key,
            })),
          },
        ]}
        width={400}
        height={200}
      />
      <ul>{/* Loop through the dictionary */}</ul>
    </>
  );
}
