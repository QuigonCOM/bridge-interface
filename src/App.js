import { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./Global.css";
import "./Responsive.css";
import XpBridge from "./pages/XpBridge";
import Alert from "./components/Alert";
import { useDispatch, useSelector } from "react-redux";
import {
  setFrom,
  setGetFeaturedModal,
  setTestNet,
  setTo,
  setTronPopUp,
  setValidatorsInf,
} from "./store/reducers/generalSlice";
import ApproveLoader from "./components/innercomponents/ApproveLoader";
import { Modal } from "react-bootstrap";
import Error from "./components/innercomponents/Error";
import TronPopUp from "./components/innercomponents/TronPopUp";
import { chains } from "./components/values";
import About from "./components/innercomponents/About";
import Video from "./components/innercomponents/Video";
import { setClaimablesAlgorand } from "./wallet/helpers";
import Widget from "./components/Widget";
import TechnicalSupport from "./components/innercomponents/TechnicalSupport";
import TransferLoader from "./components/innercomponents/TransferLoader";
import TronConnectionErrMod from "./components/TronConnectionErrMod";
import star from "./assets/img/icons/featuredInactive.svg";
import GetFeatured from "./components/innercomponents/GetFeatured";
import TnProcess from "./components/innercomponents/processingModals/TnProcess";
import SuccessModal from "./components/Modals/SuccessModal";
import Settings from "./components/Settings";

import WSettings from "./components/Settings";

function App() {
  const dispatch = useDispatch();
  // const loader = useSelector(state => state.general.approveLoader)
  const algorandAccount = useSelector((state) => state.general.algorandAccount);
  // const error = useSelector(state => state.general.error)
  // const tronPopUp = useSelector(state => state.general.tronPopUp)
  // const nftsToWhitelist = useSelector(state => state.general.techModal)
  const state = useSelector((state) => state.general);

  const axios = require("axios");
  const widget = new URLSearchParams(window.location.search).get("widget");

  function handleClose() {
    dispatch(setTronPopUp(false));
  }

  const checkValidators = async () => {
    let res;
    try {
      res = await axios.get("https://bridgestatus.herokuapp.com/status");
    } catch (error) {
      console.error(error);
    }
    if (res?.data) dispatch(setValidatorsInf(res.data));
  };

  const showGetFeatured = () => {
    dispatch(setGetFeaturedModal(true));
  };

  useEffect(() => {
    dispatch(setTestNet(window.location.href.indexOf("testnet.") > 0));
  });

  useEffect(async () => {
    const from = new URLSearchParams(window.location.search).get("from");
    const to = new URLSearchParams(window.location.search).get("to");
    if (from !== to) {
      if (from) {
        const fromChain = chains.filter(
          (n) => n.text === from.replace("/", "")
        )[0];
        if (fromChain) {
          dispatch(setFrom(fromChain));
        }
      }
      if (to) {
        const toChain = chains.filter((n) => n.text === to.replace("/", ""))[0];
        if (toChain) {
          dispatch(setTo(toChain));
        }
      }
    }
    localStorage.removeItem("walletconnect")
  }, []);

  useEffect(async () => {
    if (algorandAccount) {
      try {
        setClaimablesAlgorand(algorandAccount);
      } catch (err) {
        console.log(err, "algorand claimables error");
      }
    }
  }, [algorandAccount]);

  useEffect(async () => {
    if (!state.validatorsInfo) await checkValidators();
  }, [state.validatorsInfo]);

  return (
    <div className={"App"}>
      {state.wsettings && <WSettings />}
      <About />
      <Video />
      <TechnicalSupport />
      {/* <TnProcess /> */}
      <SuccessModal />
      <TransferLoader />
      <TronConnectionErrMod />
      <ApproveLoader />
      <Error />
      <TronPopUp />
      <Widget />
      <GetFeatured />
      <XpBridge />
      <Alert />

      <div onClick={showGetFeatured} className="get-featured">
        <img src={star} alt="" />
        Get Featured
      </div>
    </div>
  );
}

export default App;
