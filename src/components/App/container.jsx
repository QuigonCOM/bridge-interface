/* eslint-disable no-debugger */
import React, { useEffect } from "react";

import PropTypes from "prop-types";

import { compose } from "redux";
import { useDispatch } from "react-redux";
import { withNearConnection } from "../Wallet/NEARWallet/withNearConnection";
import { withEVMConnection } from "../Wallet/EVMWallet/withEVMConnection";
import { withHederaConnection } from "../Wallet/HederaWallet/withHederaConnection";
import { withTronConnection } from "../Wallet/withTronConnection";
import { withServices } from "./hocs/withServices";

import { BridgeModes } from "../values";
import {
  setTestNet,
  setStaging,
  setCheckWallet,
} from "../../store/reducers/generalSlice";

import { useNavigate } from "react-router";

const Container = ({ children, serviceContainer, setContainer }) => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      let network;

      const event = window.location.pathname === "/crossroads";
      const eventMinting = window.location.pathname.includes("/minting");
      const eventUtilityMinting = window.location.pathname.includes("/utility-bridge-minting");

      if (!event) {
        if (window.location.pathname.includes(BridgeModes.Staging)) {
          network = BridgeModes.Staging;
          dispatch(setStaging(true));
        } else if (window.location.pathname.includes(BridgeModes.TestNet)) {
          network = BridgeModes.TestNet;
          dispatch(setTestNet(true));
        }
      }
      const params = new URLSearchParams(window.location.search);

      let checkWallet = params.get(BridgeModes.CheckWallet.toLowerCase());
      checkWallet = !checkWallet
        ? params.get(BridgeModes.CheckWallet)
        : checkWallet;

      const bridge = await serviceContainer?.bridge?.init(network);
      checkWallet && bridge.setCheckWallet(checkWallet);

      if (!event && !eventMinting && !eventUtilityMinting) {
        setContainer({ ...serviceContainer, bridge });

        const query = window.location.search;

        dispatch(setCheckWallet(checkWallet));
        navigate(`/${network ? network + "/" : ""}${query || ""}`);
      }
    })();
  }, []);

  return <>{children}</>;
};

Container.propTypes = {
  children: PropTypes.any,
  serviceContainer: PropTypes.object,
  setContainer: PropTypes.func,
};

export default compose(
  withServices,
  withNearConnection,
  withEVMConnection,
  withHederaConnection,
  withTronConnection
)(Container);
