import React from "react";
import {
  connectAlgoSigner,
  connectMyAlgo,
  connectAlgoWallet,
} from "./ConnectWalletHelper";
import AlgorandWalletIcon from "../../assets/img/wallet/AlgorandWallet.svg";
import MyAlgoBlue from "../../assets/img/wallet/MyAlgoBlue.svg";
import AlgoSignerIcon from "../../assets/img/wallet/Algo Signer.png";
import { useSelector } from "react-redux";
import { id } from "ethers/lib/utils";

export default function AlgorandWallet({ wallet, close }) {
  const OFF = { opacity: 0.6, pointerEvents: "none" };
  const from = useSelector((state) => state.general.from);
  const testnet = useSelector((state) => state.general.testNet);

  const connectionHandler = wallet => {
    switch (wallet) {
      case "MyAlgo":
        connectMyAlgo()
        close()
        break;
      case "AlgoSigner":
        connectAlgoSigner(testnet)
        close()
        break;
      case "Algorand Wallet":
        connectAlgoWallet()
        close()
        break;
      default:
        break;
    }
  }

  const getStyle = () => {
    if(!from){
      return {}
    }
    else if(from && from.text === "Algorand"){
      return {}
    }
    else return OFF
  }

  return wallet === "MyAlgo" ? (
    <li
      style={getStyle()}
      // style={{pointerEvents: "none", opacity: '0.6'}}
      onClick={() => connectionHandler("MyAlgo")}
      className="wllListItem algo"
      data-wallet="MyAlgo"
    >
      <img src={MyAlgoBlue} alt="" /><p>MyAlgo</p>
    </li>
  ) : wallet === "AlgoSigner" ? (
    <li
      style={getStyle()}
      // style={{pointerEvents: "none", opacity: '0.6'}}
      onClick={() => connectionHandler("AlgoSigner")}
      data-wallet="AlgoSigner"
      className="wllListItem algo"
    >
      <img src={AlgoSignerIcon} alt="Algor Signer Icon" /><p>Algo Signer</p>
    </li>
  ) : (
    <li
      style={{pointerEvents: "none", opacity: '0.6'}}
      onClick={() => connectionHandler("Algorand Wallet")}
      // style={OFF}
      data-wallet="Algorand Wallet"
      className="wllListItem algo"
    >
      <img src={AlgorandWalletIcon} alt="Algor Wallet Icon" /><p>Algorand Wallet</p>
    </li>
  );
}
