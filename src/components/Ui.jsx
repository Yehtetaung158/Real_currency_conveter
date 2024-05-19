import React, { useState } from "react";
import { useGetRateQuery } from "../store/service/endpoint/exchangeEndpoint";
import { Formik } from "formik";

const Ui = () => {
  const { data, error, isLoading } = useGetRateQuery();

  const [currencyData, setCurrencyData] = useState({
    fromCurrency: "USD",
    toCurrency: "MMK",
    amount: 1,
    result: "..............",
  });
  const currncyUnit = data?.conversion_rates;
  if (data) {
    console.log(
      currncyUnit[currencyData.fromCurrency],
      currncyUnit[currencyData.toCurrency]
    );
  }

  const amounthandle = (e) => {
    if (0 < e.target.value) {
      setCurrencyData((pre) => ({ ...pre, [e.target.name]: e.target.value }));
    }
  };
  const currencyhandle = (e) => {
    setCurrencyData((pre) => ({ ...pre, [e.target.name]: e.target.value }));
  };

  const handleForm = (e) => {
    e.preventDefault();
    if (data) {
      let rate =
        currncyUnit[currencyData.toCurrency] /
        currncyUnit[currencyData.fromCurrency];
      let convert = currencyData.amount * rate;
      setCurrencyData((pre) => ({ ...pre, result: convert.toFixed(3) }));
      console.log(convert);
    }
  };

  return (
    <div>
      <form onSubmit={handleForm}>
        <div className="mx-auto flex justify-center m-2 items-center w-[430px] h-[932px] bg-blue-700 text-2xl">
          <div className=" flex gap-10 flex-col w-11/12">
            <div className=" text-white">
              <h1>ဗဟိုဘဏ်၏ ငွေလွှဲနှုံးများကို တိုက်ရိုက်ကြည့်ရှုနိုင်သည် </h1>
            </div>
            <div className=" flex gap-2 justify-between bg-blue-300 w-[390px] h-[80px] py-2 rounded-lg">
              <div className=" flex justify-center w-3/7 py-2">
                <select
                  name="fromCurrency"
                  value={currencyData.fromCurrency}
                  onChange={currencyhandle}
                  className="w-5/6 px-12 rounded-lg"
                >
                  {/* <option selected value={currncyUnit?.USD}>
                    USD
                  </option> */}
                  {currncyUnit && (
                    <>
                      {Object.entries(currncyUnit)?.map(([key, value]) => (
                        <option value={key} key={value + Math.random(1, 40)}>
                          {key}
                        </option>
                      ))}
                    </>
                  )}
                </select>
              </div>
              <div>to</div>
              <div className=" w-3/7 py-2 flex justify-center  ">
                <select
                  name="toCurrency"
                  value={currencyData.toCurrency}
                  onChange={currencyhandle}
                  className=" w-5/6  flex flex-col px-12 rounded-lg"
                >
                  {/* <option selected value={currncyUnit?.MMK}>
                    MMK 
                  </option> */}
                  {currncyUnit && (
                    <>
                      {Object.entries(currncyUnit)?.map(([key, value]) => (
                        <option value={key} key={value + Math.random(1, 30)}>
                          {key}
                        </option>
                      ))}
                    </>
                  )}
                </select>
              </div>
            </div>

            <div
              className=" flex gap-2
 bg-blue-300 w-[390px] h-[80px] py-2 px-4 items-center rounded-lg"
            >
              <p className=" w-1/3">Amount</p>
              <input
                name="amount"
                value={currencyData.amount}
                onChange={amounthandle}
                className=" rounded-md w-2/3"
                type="number"
              />
            </div>

            <div
              className=" flex flex-col gap-2
 bg-blue-300 w-[390px] h-[120px] px-4 items-center justify-center rounded-lg"
            >
                {" "}
                <p className=" w-4/5 flex justify-center rounded-lg bg-white px-2 py-3">
                  {currencyData.amount} {currencyData?.fromCurrency} ={" "}
                  {currencyData?.result} {currencyData?.toCurrency}
                </p>
            </div>
            <div
              className=" flex flex-col gap-2
 bg-blue-300 w-[390px] h-[120px] py-2 px-4 items-center rounded-lg"
            >
              <ul>
                <p>1 USD = {currncyUnit?.MMK} MMk</p>
                <li>1 usd = {currncyUnit?.BHD} BHD</li>
                <li>1 usd = {currncyUnit?.SGD} SGD</li>
                {/* <li>1 usd = {currncyUnit?.EUR} EUR</li> */}
              </ul>
            </div>

            <button className=" w-[390px] bg-white py-4" type="submit">
              Convertor
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Ui;
