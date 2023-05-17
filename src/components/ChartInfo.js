import ChartsEmbedSDK from "@mongodb-js/charts-embed-dom";
import { useState, useEffect } from "react";


export default function ChartInfo() {
  const [payload, setPayload] = useState({});
  const [accessToken, setAccessToken] = useState(null);
 return (
    <>
      <div id="chart"></div>
      <div id="info">
        <ul>
          <li>Access Token: {accessToken}</li>
          <li>Role: {payload?.target?.role}</li>
          <li>Type: {payload?.target?.type}</li>
          <li>Fill: {payload?.target?.fill}</li>
          <li>x.label: {payload?.data?.x?.label}</li>
          {/* <li>x.value: {payload?.data?.x?.value}</li> */}
          <li>y.label: {payload?.data?.y?.label}</li>
          {/* <li>y.value: {payload?.data?.y?.value}</li> */}
          <li>color.label: {payload?.data?.color?.label}</li>
          <li>color.value: {payload?.data?.color?.value}</li>
        </ul>

        <div id="payload">
          <pre>{JSON.stringify(payload, null, 2)}</pre>
        </div>
      </div>


    </>
  )
}