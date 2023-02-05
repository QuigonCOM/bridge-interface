import Ethereum from "../assets/img/chain/Etherium.svg";
import Ton from "../assets/img/chain/ton.svg";
import Elrond from "../assets/img/chain/multiverseX.png";

import Binance from "../assets/img/chain/Binance.svg";
import Cardano from "../assets/img/chain/Cardano.svg";
import Algorand from "../assets/img/chain/Algarand.svg";
import Tron from "../assets/img/chain/Tron.svg";
import Polygon from "../assets/img/chain/Polygon.svg";
import Avalanche from "../assets/img/chain/Avalanche.svg";
import Fantom from "../assets/img/chain/Fantom.svg";
import Gnosis from "../assets/img/chain/Gnosis.png";
import Solana from "../assets/img/chain/Solana.svg";
import Fuse from "../assets/img/chain/Fuse.svg";
import Velas from "../assets/img/chain/velas.svg";
import Tezos from "../assets/img/chain/Tezos.svg";
import Iotex from "../assets/img/chain/iotx.svg";
import One from "../assets/img/chain/One.svg";
import Aurora from "../assets/img/chain/aurora.svg";
import GT from "../assets/img/chain/GateChain.svg";
import VET from "../assets/img/chain/Vechain.png";

import SCRT from "../assets/img/chain/secret.svg";
import CKB from "../assets/img/chain/godwoken.svg";
import HBAR from "../assets/img/chain/Hedera.svg";
import SKL from "../assets/img/chain/SFUEL.svg";
import Moon from "../assets/img/chain/Moonbeam.svg";
import Abey from "../assets/img/chain/Abey.svg";
import Caduceus from "../assets/img/chain/caduceus.svg";
import Aptos from "../assets/img/chain/aptos.svg";
import InternetComputer from "../assets/img/chain/InternetComputer.svg";
import near from "../assets/img/wallet/NearWallet.svg";
import okx from "../assets/img/chain/okx.svg";
import arbitrum from "../assets/img/chain/arbitrum.svg";
import brise from "../assets/img/chain/brise.png";

export const EVM = "EVM";
export const ELROND = "MultiversX";
export const TEZOS = "TEZOS";

export const stagingWNFT = "https://staging-nft.xp.network";
export const wnft = [
  "https://wnfts.xp.network",
  "https://nft.xp.network",
  "https://bridge-wnftapi",
];

export const wnftPattern =
  "(wnfts.xp.network|nft.xp.network|staging-nft.xp.network|bridge-wnftapi)";

export const biz =
  window.location.hostname.includes("localhost") ||
  window.location.hostname.includes("staging") ||
  window.location.hostname.includes("development") ||
  window.location.hostname.includes("temporary") ||
  window.location.hostname.includes("10.0.0");

export const BridgeModes = {
  Staging: "staging",
  TestNet: "testnet",
  CheckWallet: "checkWallet",
};
export const getChainObject = (nonce) =>
  chains.find((chain) => chain.nonce === nonce);

export const chains = [
  {
    type: "EVM",
    key: "Ethereum",
    text: "Ethereum",
    value: "Ethereum",
    nonce: 5,
    chainId: 1,
    tnChainId: 3,
    order: 8,
    image: { avatar: true, src: Ethereum },
    maintenance: false,
    testNet: true,
    mainnet: true,
  },
  {
    type: "EVM",
    key: "BSC",
    text: "BSC",
    value: "BSC",
    nonce: 4,
    chainId: 56,
    tnChainId: 97,
    order: 10,
    image: { avatar: true, src: Binance },
    maintenance: false,
    testNet: true,
    mainnet: true,
  },
  {
    type: "Tron",
    key: "Tron",
    text: "Tron",
    value: "Tron",
    nonce: 9,
    order: 12,
    image: { avatar: true, src: Tron },
    maintenance: false,
    testNet: true,
    mainnet: true,
    updated: false,
  },
  {
    type: "Elrond",
    key: "Elrond",
    text: ELROND,
    value: "Elrond",
    nonce: 2,
    order: 15,
    image: { avatar: true, src: Elrond },
    maintenance: false,
    testNet: false,
    mainnet: true,
  },
  {
    type: "EVM",
    key: "Polygon",
    text: "Polygon",
    value: "Polygon",
    nonce: 7,
    chainId: 137,
    tnChainId: 80001,
    order: 9,
    image: { avatar: true, src: Polygon },
    maintenance: false,
    testNet: true,
    mainnet: true,
  },
  {
    type: "EVM",
    key: "Avalanche",
    text: "Avalanche",
    value: "Avalanche",
    nonce: 6,
    chainId: 43114,
    tnChainId: 43113,
    order: 11,
    image: { avatar: true, src: Avalanche },
    maintenance: false,
    testNet: true,
    mainnet: true,
  },
  {
    type: "EVM",
    key: "Fantom",
    text: "Fantom",
    value: "Fantom",
    nonce: 8,
    chainId: 250,
    tnChainId: 4002,
    order: 16,
    image: { avatar: true, src: Fantom },
    maintenance: false,
    testNet: true,
    mainnet: true,
    newChain: false,
  },
  {
    type: "Algorand",
    key: "Algorand",
    text: "Algorand",
    value: "Algorand",
    nonce: 15,
    order: 13,
    image: { avatar: true, src: Algorand },
    maintenance: false,
    testNet: true,
    mainnet: true,
    updated: false,
  },
  {
    type: "EVM",
    key: "xDai",
    text: "Gnosis",
    value: "xDai",
    nonce: 14,
    chainId: 100,
    order: 17,
    image: { avatar: true, src: Gnosis },
    maintenance: false,
    testNet: false,
    mainnet: true,
  },
  {
    type: "Solana",
    key: "Solana",
    text: "Solana",
    value: "Solana",
    chainId: undefined,
    order: 20,
    nonce: 26,
    coming: true,
    image: { avatar: true, src: Solana },
    maintenance: false,
    testNet: false,
    mainnet: false,
  },
  {
    type: "Cardano",
    key: "Cardano",
    text: "Cardano",
    value: "Cardano",
    chainId: undefined,
    order: 21,
    coming: true,
    image: { avatar: true, src: Cardano },
    maintenance: false,
    testNet: false,
    mainnet: false,
  },
  {
    type: "TON",
    key: "TON",
    text: "TON",
    value: "TON",
    chainId: undefined,
    order: 5,
    nonce: 27,
    coming: !biz,
    image: { avatar: true, src: Ton },
    maintenance: false,
    testNet: false,
    mainnet: biz,
    newChain: biz,
  },
  {
    type: "EVM",
    key: "Fuse",
    text: "Fuse",
    value: "Fuse",
    nonce: 16,
    chainId: 122,
    order: 21,
    image: { avatar: true, src: Fuse },
    maintenance: false,
    testNet: false,
    mainnet: true,
  },
  {
    type: "EVM",
    key: "Velas",
    text: "Velas",
    value: "Velas",
    nonce: 19,
    chainId: 106,
    tnChainId: 0x6f,
    order: 20,
    image: { avatar: true, src: Velas },
    newChain: false,
    maintenance: false,
    testNet: true,
    mainnet: true,
  },
  {
    type: "Tezos",
    key: "Tezos",
    text: "Tezos",
    value: "Tezos",
    nonce: 18,
    order: 12,
    image: { avatar: true, src: Tezos },
    newChain: false,
    coming: false,
    maintenance: false,
    testNet: true,
    mainnet: true,
  },
  {
    type: "EVM",
    key: "Iotex",
    text: "Iotex",
    value: "Iotex",
    nonce: 20,
    chainId: 4689,
    tnChainId: 0x1252,
    order: 20,
    image: { avatar: true, src: Iotex },
    coming: false,
    maintenance: false,
    testNet: true,
    mainnet: true,
  },
  {
    type: "EVM",
    key: "Harmony",
    text: "Harmony",
    value: "Harmony",
    nonce: 12,
    chainId: 1666600000,
    tnChainId: 1666700000,
    order: 6,
    image: { avatar: true, src: One },
    maintenance: false,
    testNet: false,
    mainnet: true,
    newChain: false,
  },
  {
    type: "EVM",
    key: "Aurora",
    text: "Aurora",
    value: "Aurora",
    nonce: 21,
    chainId: 1313161554,
    tnChainId: 1313161555,
    order: 7,
    image: { avatar: true, src: Aurora },
    maintenance: false,
    testNet: true,
    mainnet: true,
    newChain: false,
  },
  {
    type: "EVM",
    key: "Godwoken",
    text: "Godwoken",
    value: "Godwoken",
    nonce: 22,
    chainId: 71402,
    tnChainId: 0x116e9,
    order: 4,
    image: { avatar: true, src: CKB },
    maintenance: false,
    testNet: true,
    mainnet: true,
    newChain: false,
  },
  {
    type: "EVM",
    key: "GateChain",
    text: "GateChain",
    value: "GateChain",
    nonce: 23,
    tnChainId: 85,
    chainId: 86,
    order: 19,
    image: { avatar: true, src: GT },
    maintenance: false,
    testNet: false,
    mainnet: true,
    newChain: false,
  },
  {
    type: "EVM",
    key: "Moonbeam",
    text: "Moonbeam",
    value: "Moonbeam",
    nonce: 32,
    order: 3,
    chainId: 1284,
    tnChainId: 1287,
    image: { avatar: true, src: Moon },
    testNet: true,
    mainnet: true,
    newChain: true,
    coming: false,
  },
  {
    type: "EVM",
    key: "Abeychain",
    text: "Abeychain",
    value: "Abeychain",
    nonce: 33,
    order: 5,
    chainId: 179,
    tnChainId: 178,
    image: { avatar: true, src: Abey },
    testNet: biz,
    mainnet: biz,
    newChain: biz,
    coming: !biz,
  },
  {
    type: "VeChain",
    key: "VeChain",
    text: "VeChain",
    value: "VeChain",
    nonce: 25,
    tnChainId: 39,
    chainId: undefined,
    order: 5,
    image: { avatar: true, src: VET },
    maintenance: false,
    mainnet: true,
    testNet: false,
    newChain: false,
  },
  {
    type: "Cosmos",
    key: "Secret",
    text: "Secret",
    value: "Secret",
    nonce: 24,
    order: 9,
    tnChainId: "pulsar-2",
    chainId: "secret-4",
    image: { avatar: true, src: SCRT },
    mainnet: biz,
    testNet: false,
    test: false,
    newChain: biz,
    coming: !biz,
  },
  {
    type: "Hedera",
    key: "Hedera",
    text: "Hedera",
    nonce: 29,
    order: 0,
    image: { avatar: true, src: HBAR },
    testNet: false,
    mainnet: false,
    // newChain: true,
    coming: true,
  },
  {
    type: "EVM",
    key: "Skale",
    text: "SKALE",
    nonce: 30,
    order: 8,
    chainId: 1564830818,
    tnChainId: 0x63e1ef9,
    image: { avatar: true, src: SKL },
    testNet: true,
    mainnet: true,
    newChain: true,
    coming: false,
  },
  {
    type: "EVM",
    key: "Caduceus",
    text: "Caduceus",
    value: "Caduceus",
    nonce: 35,
    order: 2,
    chainId: 256256,
    tnChainId: 512512,
    image: { avatar: true, src: Caduceus },
    testNet: true,
    mainnet: true,
    newChain: true,
    coming: false,
  },
  {
    type: "EVM",
    key: "Internet Computer",
    text: "Internet Computer",
    nonce: 30,
    order: 0,
    chainId: 1564830818,
    tnChainId: 1305754875840118,
    image: { avatar: true, src: InternetComputer },
    testNet: false,
    mainnet: false,
    // newChain: true,
    coming: true,
  },
  {
    type: "APTOS",
    key: "APTOS",
    text: "APTOS",
    nonce: 0x22,
    order: 0,
    image: { avatar: true, src: Aptos },
    testNet: false,
    mainnet: false,
    coming: false,
  },
  {
    type: "NEAR",
    key: "NEAR",
    text: "NEAR",
    value: "NEAR",
    nonce: 31,
    order: 0,
    image: { avatar: true, src: near },
    testNet: false,
    mainnet: false,
    coming: true,
  },
  {
    type: "EVM",
    key: "OKC",
    text: "OKC",
    value: "OKC",
    nonce: 0x24,
    order: 1,
    image: { avatar: true, src: okx },
    testNet: true,
    mainnet: true,
    coming: false,
    newChain: true,
    chainId: 66,
    tnChainId: 65,
  },
  {
    type: "EVM",
    key: "Arbitrum",
    text: "Arbitrum",
    value: "Arbitrum",
    nonce: 0x25,
    order: -1,
    image: { avatar: true, src: arbitrum },
    testNet: false,
    mainnet: false,
    coming: false,
    newChain: false,
    chainId: 42161,
    tnChainId: 421613,
  },
  {
    type: "EVM",
    key: "Bitgert",
    text: "Bitgert",
    value: "Bitgert",
    nonce: 0x26,
    order: -2,
    image: { avatar: true, src: brise },
    testNet: false,
    mainnet: false,
    coming: false,
    newChain: true,
    chainId: 3250,
    tnChainId: 64668,
  },
];
