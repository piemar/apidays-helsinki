import ChartsEmbedSDK from "@mongodb-js/charts-embed-dom";
import ChartInfo from "./ChartInfo";
import { useState, useEffect } from "react";

const appId = "data-tuuih";
const dataApiBaseUrl = "https://data.mongodb-api.com/app/data-tuuih/endpoint/data/v1";

const sdk = new ChartsEmbedSDK({
  baseUrl: "https://charts.mongodb.com/charts-pierre-petersson-demo-pro-hvvjx", // Optional: ~REPLACE~ with the Base URL from your Embed Chart dialog
});

const chart = sdk.createChart({
  chartId: "6462a492-36b3-4564-8f6d-adc5fc53bb79", // Optional: ~REPLACE~ with the Chart ID from your Embed Chart dialog
  height: "700px"
});

export default function Chart(props) {
  const [payload, setPayload] = useState({});
  const [accessToken, setAccessToken] = useState(null);
  const [show, setShow]=useState(false);
  let token = null;

  useEffect(() => {
    const render = async () => {
      await chart.render(document.getElementById("chart"));
      await chart.addEventListener("click", handleChartClick);
    };
    render().catch((e) => window.alert(e.message));

    const authenticate = async () => {
      const authUrl = `https://realm.mongodb.com/api/client/v2.0/app/${appId}/auth/providers/anon-user/login`
      // Authenticate with the server
      // Anonymous authentication must be enabled in app services
      const tokens = await fetch(authUrl).then(res => res.json());
      setAccessToken(tokens.access_token);
      token = tokens.access_token;
      }
    authenticate();
  }, []);

  const handleChartClick = async (payload) => {
    setPayload(payload);
    handleSubmit(payload, props);
  }

  const insertOneDataAPI = async (payload) => {
    console.log(payload.data.geopoint.value.coordinates[0]);
    console.log(payload.data.geopoint.value.coordinates[1]);
    // Make a call to the Data API
    const url = `${dataApiBaseUrl}/action/insertOne`;
    const data = {
      dataSource: "demo-cluster",
      database: "lordofthering",
      collection: "hints",
      document:  {
        timestamp: new Date().toISOString(),
        email: props.userEmail,
        location: {
          type: "Point",
          coordinates: [
            parseFloat(payload.data.geopoint.value.coordinates[0]),
            parseFloat(payload.data.geopoint.value.coordinates[1])
          ]
        }
      }

    };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/ejson",
        "Accept": "application/ejson",        
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(data)
    }).then(res => res.json());
    printResponse(response);
    console.log(response);
  };
  function printResponse(){
    chart.refresh();
  }

  async function handleSubmit(payload, props) {
    var requestOptions = {
      method: "POST",
      redirect: "follow"
    };
    console.log(payload, props, props.userEmail)
    var long=payload.data.geopoint.value.coordinates[0];
    var lat=payload.data.geopoint.value.coordinates[1];
    // Workaround as React not able to get props value
    var userEmail=document.getElementById("emailSpan").innerText;
    const response = await fetch('https://data.mongodb-api.com/app/pokemon-bpmfw/endpoint/hint?long='+long+'&lat='+lat+'&email='+userEmail, 
    requestOptions
    );
  
    const result = await response.json();
    console.log(result);
  }  
  return (
    <>
    <div id="chart"></div>
    
    <span id="emailSpan">{props.userEmail}</span>
    <button onClick={() => setShow(!show)}>Show Payload</button>
    {show && (
    <div id="info">
        <ul>
        <li>UserEmail: {props.userEmail}</li>
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
      )}
    </>

  )
}