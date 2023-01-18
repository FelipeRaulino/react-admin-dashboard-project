import React from "react";
import { useGetCustomersQuery, } from "../../state/api";

function Customers() {
  const { data, } = useGetCustomersQuery();
  console.log(data,);
  return (
    <div>Customers</div>
  );
}

export default Customers;
