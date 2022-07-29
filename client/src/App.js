import React, { useState, useEffect } from "react";
import { UserContext } from "./UserContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./Home";
import Register from "./Register";
import Doctor from "./Doctor";
import Patient from "./Patient";
import healthify_contract from "./contract/Healthify_Contract.json";

import "./assets/scss/style.scss";

let Web3 = require("web3");


function App() {
  const [address, setAddress] = useState();
  const [web3, setWeb3] = useState(undefined);
  const [contract, setContract] = useState([]);

  useEffect(() => {
    const connectWallet = async function () {
      if (window.ethereum) {
        let web3 = new Web3(window.ethereum);
        try {
          const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
          
          const contr = new web3.eth.Contract(
            healthify_contract,
            "0x4AFfa4c6e3dBFF8D5cd43ce688B2f2f2eeA64B3f"
          );
          
          setWeb3(web3);
          
          setAddress(accounts[0]);
          setContract(contr);
          
        } catch (error) {
          console.log(`⚠️ ${error}.`);
        }
      } else {
        console.log("⚠️ Please install the Metamask Wallet extension .");
      }
    };

    connectWallet();
  }, []);

  return (
    <>
      <Router>
        <Switch>
          <UserContext.Provider value={{ address, web3, contract }}>
            <Route path="/" exact component={Home} />
            <Route path="/register" exact component={Register} />
            <Route path="/patient" exact component={Patient} />
            <Route path="/doctor" exact component={Doctor} />
          </UserContext.Provider>
        </Switch>
      </Router>
    </>
  );
}

export default App;
