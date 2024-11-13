import React from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

// import EVMWallet from "./EVMWallet";
import TezosWallet from "./TezosWallet";
// import AlgorandWallet from "./AlgorandWallet";
import TronWallet from "./TronWallet";
// import ElrondWallet from "./ElrondWallet";
// import USBWallet from "./USBWallet";
import VeChainWallet from "./VeChainWallet";
import PropTypes from "prop-types";
import CosmosWallet from "./CosmosWallet";
// import HederaWallet from "./HederaWallet";
import Unstoppables from "./Unstoppables";
import { sortWallet } from "./WalletListHelper";
import TonWallet from "./TONWallet/TonWallet";
import TonKeeper from "./TONWallet/TonKeeper";
import TonHub from "./TONWallet/TonHub";
import BitKeep from "./EVMWallet/BitKeep";
import WalletConnect from "./EVMWallet/WalletConnect";
import MetaMask from "./EVMWallet/MetaMask";
import TrustWallet from "./EVMWallet/TrustWallet";
import Martioan from "./APTOSWallet/Martioan";
import Petra from "./APTOSWallet/Petra";
import Pontem from "./APTOSWallet/Pontem";
import NearWallet from "./NEARWallet/NearWallet";
import WalletSelector from "./NEARWallet/WalletSelector";
// import Solana from "./SOLWallet";
import Phantom from "./SOLWallet/Phantom";
import Solflare from "./SOLWallet/Solflare";
import OKXWallet from "./EVMWallet/OKXWallet";
import MyAlgo from "./ALGOWallet/MyAlgo";
import AlgoSigner from "./ALGOWallet/AlgoSigner";
import Pera from "./ALGOWallet/Pera";
import XPortal from "./MultiversXWallet/XPortal";
import MultiversXDeFi from "./MultiversXWallet/MultiversXDeFi";
import HederaWallet from "./HederaWallet/Hashpack";
import IcpWallet from "./IcpWallet";
import CasperWallet from "./CasperWallet/casperWallet";
import { isMobile } from "../../utils";

export default function WalletList({ connected, input, discount }) {
  const from = useSelector((state) => state.general.from);
  const location = useLocation();

  const walletComponents = [
    {
      Component: (
        <MetaMask wallet={"MetaMask"} key="metamask" close={connected} />
      ),
      name: "MetaMask",
      type: "EVM",
      mobile: true,
      desktop: true,
      order: 1,
      keyName: "MetaMask",
      isDisabled: false,
    },
    {
      Component: <Unstoppables key="wallet-index-21" close={connected} />,
      name: "Unstoppable Domains",
      mobile: true,
      desktop: true,
      order: 14,
      type: "EVM",
      keyName: "Unstoppable Domains",
      isDisabled: true,
    },
    {
      Component: (
        <OKXWallet wallet={"OKX Wallet"} key="okx-wallet" close={connected} />
      ),
      name: "OKX Wallet",
      type: "EVM",
      mobile: true,
      desktop: true,
      order: 2,
      keyName: "OKX Wallet",
      isDisabled: true,
    },
    {
      Component: (
        <TrustWallet
          wallet={"Trust Wallet"}
          key="trust-wallet"
          close={connected}
        />
      ),
      name: "Trust Wallet",
      type: "EVM",
      mobile: true,
      desktop: false,
      order: 2,
      keyName: "Trust Wallet",
      isDisabled: true,
    },
    {
      Component: (
        <BitKeep
          wallet={"BitKeep"}
          key="bitKeep"
          close={connected}
          discount={discount}
        />
      ),
      name: "BitKeep",
      type: "EVM",
      mobile: true,
      desktop: true,
      order: 1,
      keyName: "BitKeep",
      isDisabled: true,
    },
    {
      Component: (
        <WalletConnect
          wallet={"WalletConnect"}
          key="wallet-connect"
          close={connected}
        />
      ),
      name: "WalletConnect",
      type: "EVM",
      mobile: true,
      desktop: true,
      order: 1,
      keyName: "WalletConnect",
      isDisabled: true,
    },

    {
      Component: (
        <TezosWallet
          wallet={"TempleWallet"}
          key="wallet-index-7"
          close={connected}
        />
      ),
      name: "Temple Wallet",
      type: "Tezos",
      mobile: true,
      desktop: true,
      order: 4,
      keyName: "Temple Wallet",
      isDisabled: false,
    },
    {
      Component: (
        <TezosWallet wallet={"Beacon"} key="wallet-index-8" close={connected} />
      ),
      name: "Beacon",
      type: "Tezos",
      mobile: true,
      desktop: true,
      order: 5,

      keyName: "Beacon",
      isDisabled: true,
    },
    {
      Component: <XPortal wallet={"xPortal"} key="wallet-index-9" />,
      name: "xPortal",
      type: "Elrond",
      mobile: true,
      desktop: true,
      order: 6,
      keyName: "xPortal",
      isDisabled: true,
    },
    {
      Component: <MultiversXDeFi wallet={undefined} key="wallet-index-10" />,
      name: "MultiversX DeFi Wallet",
      type: "Elrond",
      mobile: false,
      desktop: true,
      order: 7,
      keyName: "MultiversX DeFi Wallet",
      isDisabled: false,
    },
    {
      Component: (
        <MyAlgo wallet={"MyAlgo"} key="wallet-index-3" close={connected} />
      ),
      name: "MyAlgo",
      type: "Algorand",
      mobile: false,
      desktop: true,
      order: 8,
      keyName: "MyAlgo",
      isDisabled: true,
    },
    {
      Component: (
        <AlgoSigner
          wallet={"AlgoSigner"}
          key="wallet-index-4"
          close={connected}
        />
      ),
      name: "AlgoSigner",
      type: "Algorand",
      mobile: false,
      desktop: true,
      order: 9,
      keyName: "AlgoSigner",
      isDisabled: true,
    },
    {
      Component: (
        <Pera wallet={undefined} key="wallet-index-5" close={connected} />
      ),
      name: "Pera Wallet",
      type: "Algorand",
      mobile: true,
      desktop: true,
      order: 10,
      keyName: "Pera Wallet",
      isDisabled: true,
    },
    {
      Component: <TronWallet key="wallet-index-6" close={connected} />,
      name: "TronLink",
      type: "Tron",
      mobile: true,
      desktop: true,
      order: 11,
      keyName: "TronLink",
      isDisabled: true,
    },
    {
      Component: <VeChainWallet key="wallet-index-14" close={connected} />,
      name: "Sync2",
      type: "VeChain",
      mobile: true,
      desktop: true,
      order: 12,
      keyName: "Sync2",
      isDisabled: true,
    },
    {
      Component: (
        <VeChainWallet
          key="wallet-index-15"
          wallet={"VeChainThor"}
          close={connected}
        />
      ),
      name: "VeChainThor",
      type: "VeChain",
      mobile: true,
      desktop: false,
      order: 13,
      keyName: "VeChainThor",
      isDisabled: true,
    },
    {
      Component: (
        <CosmosWallet
          key="wallet-index-16"
          wallet={"Keplr"}
          close={connected}
        />
      ),
      name: "Keplr",
      type: "Cosmos",
      mobile: true,
      desktop: true,
      order: 14,
      keyName: "Keplr",
      isDisabled: true,
    },
    {
      Component: (
        <CosmosWallet key="wallet-index-17" wallet={"Fina"} close={connected} />
      ),
      name: "Fina",
      type: "Cosmos",
      mobile: false,
      desktop: false,
      order: 14,
      keyName: "Fina",
      isDisabled: true,
    },
    {
      Component: <TonKeeper key="TonKeeper" close={connected} />,
      name: "TonKeeper",
      mobile: true,
      desktop: true,
      order: 14,
      type: "TON",
      keyName: "TonKeeper",
      isDisabled: true,
    },
    {
      Component: <TonHub key="TonHub" close={connected} />,
      name: "TonHub",
      mobile: true,
      desktop: true,
      order: 14,
      type: "TON",
      keyName: "TonHub",
      isDisabled: true,
    },
    {
      Component: <TonWallet key="TonWallet" close={connected} />,
      name: "Ton Wallet",
      mobile: false,
      desktop: true,
      order: 14,
      type: "TON",
      keyName: "Ton Wallet",
      isDisabled: false,
    },
    {
      Component: (
        <HederaWallet
          key="wallet-index-13"
          close={connected}
          wallet={"Hashpack"}
        />
      ),
      name: "Hashpack",
      keyName: "Hashpack",
      mobile: true,
      desktop: true,
      order: 17,
      type: "Hedera",
      isDisabled: false,
    },

    {
      Component: <Martioan key="martian" close={connected} />,
      name: "Martian",
      keyName: "Martian",

      mobile: false,
      desktop: false,
      order: 19,
      type: "APTOS",
      isDisabled: true,
    },
    {
      Component: <Petra key="petra" close={connected} />,
      name: "Petra",
      keyName: "Petra",

      mobile: false,
      desktop: true,
      order: 20,
      type: "APTOS",
      isDisabled: true,
    },
    {
      Component: <Pontem key="pontem" close={connected} />,
      name: "Pontem",
      keyName: "Pontem",
      mobile: false,
      desktop: false,
      order: 19,
      type: "APTOS",
      isDisabled: true,
    },
    {
      Component: <NearWallet key="near" close={connected} />,
      name: "NearWallet",
      mobile: true,
      desktop: true,
      order: 888,
      type: "NEAR",
      keyName: "NearWallet",
      isDisabled: true,
    },
    {
      Component: <WalletSelector key="near1" close={connected} />,
      name: "WalletSelector",
      mobile: true,
      desktop: true,
      order: 888,
      type: "NEAR",
      keyName: "Wallet Selector",
      isDisabled: true,
    },
    {
      Component: <Phantom key="Phantom" close={connected} />,
      name: "Phantom",
      mobile: true,
      desktop: true,
      order: 889,
      type: "Solana",
      keyName: "Phantom",
      isDisabled: true,
    },
    {
      Component: <Solflare key="Solflare" close={connected} />,
      name: "Solflare",
      mobile: true,
      desktop: true,
      order: 889,
      type: "Solana",
      keyName: "Solflare",
      isDisabled: true,
    },
    {
      Component: <IcpWallet key="ICP" close={connected} />,
      name: "DFINITY",
      mobile: false,
      desktop: true,
      order: 1,
      type: "DFINITY",
      keyName: "ICPPlug",
      isDisabled: true,
    },
    {
      Component: <CasperWallet key="Casper" close={connected} />,
      name: "Casper",
      mobile: true,
      desktop: true,
      order: 223,
      type: "Casper",
      keyName: "Casper",
      isDisabled: false,
    },

    ////////////!!!!
    // {
    //     Component: (
    //         <USBWallet
    //             wallet={"Ledger"}
    //             key="wallet-index-11"
    //             connected={connected}
    //         />
    //     ),
    //     name: "Ledger",
    //     mobile: false,
    //     desktop: true,
    //     order: 15,
    //     type: "USB",
    // },
    // {
    //     Component: (
    //         <USBWallet key="wallet-index-12" connected={connected} />
    //     ),
    //     name: "Trezor",
    //     mobile: false,
    //     desktop: true,
    //     order: 16,
    //     type: "USB",
    // },
  ];

  // const filteredWallets = input
  // ? walletComponents
  //       .sort((a, b) => b.order - a.order)
  //       .filter((wallet) =>
  //           wallet.name.toLowerCase().includes(input.toLowerCase())
  //       )
  // : from
  // ? sortWallet(walletComponents)
  // : walletComponents.sort((a, b) => a.order - b.order);

  const filteredWallets = input
    ? walletComponents
        .sort((a, b) => b.order - a.order)
        .filter(
          (wallet) =>
            wallet.keyName.toLowerCase().includes(input.toLowerCase()) &&
            !wallet.isDisabled,
        )
    : from
    ? sortWallet(walletComponents)
    : walletComponents
        .filter((wallet) => !wallet.isDisabled)
        .sort((a, b) => a.order - b.order);

  switch (location.pathname) {
    case "/deposits":
      return (
        <ul className="walletList scrollSty">
          {window.innerWidth < 600
            ? walletComponents
                .filter((e) => e.type === "EVM" || e.type === "Skale")
                .filter((wallet) => wallet.mobile)
                .map((wallet) => wallet.Component)
            : walletComponents
                .filter((e) => e.type === "EVM" || e.type === "Skale")
                .filter((wallet) => wallet.desktop)
                .map((wallet) => wallet.Component)}
        </ul>
      );

    default:
      return (
        <ul className="walletList scrollSty">
          {isMobile.any()
            ? filteredWallets
                .filter((wallet) => wallet.mobile)
                .map((wallet) => wallet.Component)
            : filteredWallets
                .filter((wallet) => wallet.desktop)
                .map((wallet) => {
                  return wallet.Component;
                })}
        </ul>
      );
  }
}
//  WalletList({ search, connected, input })
WalletList.propTypes = {
  connected: PropTypes.any,
  discount: PropTypes.bool,
  input: PropTypes.string,
};
