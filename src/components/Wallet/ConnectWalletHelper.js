/* eslint-disable no-debugger */
/* eslint-disable valid-typeof */

import { injected, getAlgoConnector, web3Modal } from "../../wallet/connectors";
import store from "../../store/store";

import { WalletConnectConnector } from "@web3-react/walletconnect-connector";

import {
    setTronWallet,
    setTronLink,
    setMetaMask,
    setTronLoginError,
    setError,
    setTronPopUp,
    setWC,
    setAccount,
    setRedirectModal,
    setTransferLoaderModal,
} from "../../store/reducers/generalSlice";

import { MainNetRpcUri, TestNetRpcUri } from "xp.network";
import { switchNetwork } from "../../services/chains/evm/evmService";
import { promisify } from "../../utils";
import { adaptToWalletSelector } from "./NEARWallet/utils";
import { setupWalletSelector } from "@near-wallet-selector/core";
import { setupSender } from "@near-wallet-selector/sender";
import { Connex } from "@vechain/connex";
import * as thor from "web3-providers-connex";
import { ethers } from "ethers";

export const wallets = [
    "MetaMask",
    "WalletConnect",
    "Trust Wallet",
    "MyAlgo",
    "AlgoSigner",
    "Algorand Wallet",
    "TronLink",
    "Temple Wallet",
    "Beacon",
    "Maiar",
    "Maiar Extension",
    "Ledger",
    "Trezor",
    "Hashpack",
];

const { modalError } = store.getState();

export const connectUnstoppable = async (close) => {
    close();
    try {
        const provider = await web3Modal.connect();
        return provider.selectedAddress;
    } catch (error) {
        console.log(error);
    }
};

export const connectMetaMask = async (
    activate,
    from,
    to,
    chainId,
    navigate
) => {
    const mobile = window.innerWidth <= 600;
    try {
        if (!window.ethereum && mobile) {
            const event = window.location.pathname === "/crossroads";
            const link = `dapp://${window.location.host}${event ? "/crossroads" : ""
                }?to=${to}&from=${from}/`;
            window.open(link);
        }
        //d/
        if (!mobile && !window.safeLocalStorage?.getItem("XP_MM_CONNECTED"))
            await window.ethereum.request({
                method: "wallet_requestPermissions",
                params: [
                    {
                        eth_accounts: {},
                    },
                ],
            });

        if (to) {
            if (
                window.ethereum?.chainId ||
                chainId !== `0x${from?.chainId.toString(16)}`
            ) {
                await switchNetwork(from);
            }
        }

        await activate(injected);
        !mobile && window.safeLocalStorage?.setItem("XP_MM_CONNECTED", "true");
        store.dispatch(setMetaMask(true));
        if (from && to && navigate) {
            navigate();
        }
        return true;
    } catch (ex) {
        if (ex.code !== 4001) {
            store.dispatch(setError(ex));
        }
        if (ex.data) {
            console.log(ex.data.message);
        } else console.log(ex);
        return false;
    }
};

export const connectAlgoSigner = async (testnet) => {
    if (typeof window.AlgoSigner !== undefined) {
        try {
            await window.AlgoSigner.connect();
            const algo = await window.AlgoSigner.accounts({
                ledger: testnet ? "TestNet" : "MainNet",
            });
            // store.dispatch(setAlgoSigner(true));
            // store.dispatch(setAlgorandAccount(address));
            const address = algo[0].address;
            const signer = {
                address: algo[0],
                algoSigner: window.AlgoSigner,
                ledger: testnet ? "TestNet" : "MainNet",
            };
            // store.dispatch(setSigner(signer));
            return { signer, address };
        } catch (e) {
            console.error(e);
            return JSON.stringify(e, null, 2);
        }
    } else {
        console.log("Algo Signer not installed.");
        return false;
    }
};

export const connectTrustWallet = async (activate, from, chainId) => {
    const rpc = MainNetRpcUri[from.toUpperCase()];

    try {
        const walletConnect = new WalletConnectConnector({
            rpc: {
                [chainId]: rpc,
            },
            chainId,
            qrcode: true,
        });
        walletConnect.networkId = chainId;
        await activate(walletConnect, undefined, true);
        store.dispatch(setWC(walletConnect));
        return true;
    } catch (error) {
        store.dispatch(setError(error));
        if (error.data) {
            console.log(error.data.message);
        } else console.log(error);
        return false;
    }
};

export const onWalletConnect = async (activate, from, testnet, chainId) => {
    const key = from.toUpperCase();
    const rpc = testnet ? TestNetRpcUri[key] : MainNetRpcUri[key];
    try {
        const walletConnect = new WalletConnectConnector({
            rpc: {
                [chainId]: rpc,
                network: testnet ? "testnet" : "mainnet",
            },
            chainId,
            qrcode: true,
        });
        walletConnect.networkId = chainId;
        await activate(walletConnect, undefined, true);
        const account = await walletConnect.getAccount();
        store.dispatch(setAccount(account));
        store.dispatch(setWC(walletConnect));
        return true;
    } catch (error) {
        store.dispatch(setError(error));
        if (error.data) {
            console.log(error.data.message);
        } else console.log(error);
        return false;
    }
};

/*const onClientConnect = (maiarProvider) => {
    return {
        onClientLogin: async () => {
            const add = await maiarProvider.getAddress();
            store.dispatch(setConfirmMaiarMob(true));
            store.dispatch(setElrondAccount(add));

            store.dispatch(setMaiarProvider(maiarProvider));
            store.dispatch(setSigner(maiarProvider));
            store.dispatch(setOnMaiar(true));
            store.dispatch(setStep(2));
        },
        onClientLogout: async () => {
            store.dispatch(setQrCodeString(""));
        },
    };
};
const generateQR = async (text) => {
    try {
        const QR = await QRCode.toDataURL(text);
        return QR;
    } catch (err) {
        console.error(err);
    }
};
// Elrond blockchain connection ( Maiar )
/*export const connectMaiar = async () => {
    // debugger
    const provider = new ProxyProvider("https://gateway.elrond.com");
    const maiarProvider = new WalletConnectProvider(
        provider,
        "https://bridge.walletconnect.org/"
    );
    try {
        await maiarProvider.init();
        maiarProvider.onClientConnect = onClientConnect(maiarProvider);
        const qrCodeString = await maiarProvider.login();
        store.dispatch(setQrCodeString(qrCodeString));
        const qr = await generateQR(qrCodeString);
        store.dispatch(setQrImage(qr));
    } catch (error) {
        store.dispatch(setError(error));
        if (error.data) {
            console.log(error.data.message);
        } else console.log(error);
    }
};*/

// Tron blockchain connection ( TronLink )
export const connectTronlink = async () => {
    const {
        general: { factory },
    } = store.getState();
    if (window.innerWidth <= 600 && !window.tronWeb) {
        store.dispatch(setTronPopUp(true));
    } else {
        try {
            try {
                const accounts = await window.tronLink.request({
                    method: "tron_requestAccounts",
                });

                if (!accounts) {
                    store.dispatch(setTronLoginError("loggedOut"));
                }
            } catch (err) {
                console.log(err);
                if (!window.tronWeb) {
                    store.dispatch(setTronLoginError("noTronWeb"));
                }
            }

            if (window.tronLink && window.tronWeb.defaultAddress.base58) {
                console.log(window.tronLink);
                const publicAddress = window.tronWeb.defaultAddress.base58;

                await factory
                    .setProvider(9, window.tronWeb)
                    .catch((e) => console.log(e, "e"));

                store.dispatch(setTronWallet(publicAddress));
                store.dispatch(setTronLink(true));
                return true;
            }
        } catch (error) {
            if (!modalError) {
                store.dispatch(setError(error));
                if (error.data) {
                    console.log(error.data.message);
                } else console.log(error);
            }
            return false;
        }
    }
};

// Algorand blockchain connection ( Algo Wallet )
export const connectAlgoWallet = async () => {
    let connector = getAlgoConnector();
    if (!connector.connected) {
        connector.createSession();
    }
};

export const connectKeplr = async (testnet, chain) => {
    const chainId = testnet ? chain.tnChainId : chain.chainId;
    const key = chain.key.toUpperCase();
    const isMobile = window.innerWidth <= 600;

    if (window.keplr) {
        try {
            await window.keplr.enable(chainId);
            const offlineSigner = window.keplr.getOfflineSigner(chainId);

            const accounts = await offlineSigner.getAccounts();

            const { address } = accounts[0];

            const secretjs = await promisify(() => import("secretjs"));
            const signer = new secretjs.SecretNetworkClient({
                url: testnet ? TestNetRpcUri[key] : "https://rpc.ankr.com/http/scrt_cosmos",
                chainId,
                wallet: offlineSigner,
                walletAddress: address,
            });
            return signer;
        } catch (error) {
            console.error(error);
            return false;
        }
    } else {
        if (isMobile) {
            store.dispatch(setRedirectModal("Keplr"));
        } else
            store.dispatch(
                setError({
                    message: "Please install Keplr extension",
                })
            );
        return false;
    }
};

export const connectCasperWallet = async () => {
    const { CasperWalletProvider } = window;
    const account = {};

    if (!CasperWalletProvider) {
        return store.dispatch(
            setError({
                link: {
                    href:
                        "https://chrome.google.com/webstore/detail/casper-wallet/abkahkcbhngaebpcgfmhkoioedceoigp",
                    text: "here",
                },
                message: "Install Casper Wallet",
            })
        );
    }

    const provider = CasperWalletProvider();

    const connection = await provider.requestConnection(); //boolean

    if (!connection) return store.dispatch(setError({ message: "Could not establish a connection" }));

    account.address = await provider.getActivePublicKey();
    account.signer = provider;

    return account.signer
}

export const connectMyNearWallet = async (contract, chainWrapper) => {
    try {
        if (!window.near) {
            store.dispatch(
                setError({
                    message: "Please install Sender Wallet extension",
                })
            );
            store.dispatch(setTransferLoaderModal(false));
            return false
        }
        const selector = await setupWalletSelector({
            network: window.location.pathname.includes("testnet")
                ? "testnet"
                : "mainnet",
            debug: true,
            modules: [
                setupSender(),
            ],
        })
        const wallet = await selector.wallet("sender");
        await wallet.signIn({ contractId: contract });
        return adaptToWalletSelector(
            wallet,
            chainWrapper.chain.getProvider(),
        )
    } catch (error) {
        console.error(error);
        return false;
    }
};


export const connectVeChainWallet = async () => {
    const testnet = window.location.pathname.includes("testnet")
    const account = {};
    const connex = new Connex({
        node: testnet ? TestNetRpcUri.VECHAIN : MainNetRpcUri.VECHAIN,
        network: testnet ? "test" : "main",
    });

    const connection = await connex.vendor
        .sign("cert", {
            purpose: "identification",
            payload: {
                type: "text",
                content: "Sign certificate to continue bridging",
            },
        })
        .link("https://connex.vecha.in/{certid}")
        .request();

    account.address = connection?.annex?.signer;

    const provider = thor.ethers.modifyProvider(
        new ethers.providers.Web3Provider(
            new thor.ConnexProvider({
                connex,
            })
        )
    );
    const signer = await provider.getSigner(account.address);
    account.signer = signer;
    return account;
};