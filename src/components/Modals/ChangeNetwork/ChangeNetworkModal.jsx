import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import Close from "../../../assets/img/icons/close.svg";
import Wrong from "../../../assets/img/Wrong.svg";
import { CHAIN_INFO, TESTNET_CHAIN_INFO } from "../../values";
import { useSelector } from "react-redux";
import { getAddEthereumChain } from "../../../wallet/chains";
import { useDispatch } from "react-redux";
import { setWrongNetwork } from "../../../store/reducers/generalSlice";
import ChangeNetworkLoader from "../../innercomponents/ChangeNetworkLoader";
import { ReactComponent as CloseComp } from "../../../assets/img/icons/close.svg";
import { useNavigate } from "react-router-dom";

function ChangeNetworkModal() {
  const handleClose = () => {
    dispatch(setWrongNetwork(false))
  };
  const from = useSelector((state) => state.general.from);
  const showWrong = useSelector((state) => state.general.wrongNetwork);
  const account = useSelector((state) => state.general.account);
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const testnet = useSelector((state) => state.general.testNet);
  const widget = useSelector((state) => state.general.widget);
  const navigate = useNavigate()

  async function switchNetwork() {
    setLoader(true);
    const info = testnet
      ? TESTNET_CHAIN_INFO[from?.key]
      : CHAIN_INFO[from?.key];
    const chainId = `0x${info.chainId.toString(16)}`;
    try {
      const success = await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId }],
      });
      navigate(testnet ? "/testnet/account" : "/account")
      dispatch(setWrongNetwork(false));
    } catch (error) {
      setLoader(false);
      console.log(error);
      try {
        const toHex = (num) => {
          return "0x" + num.toString(16);
        };
        const chain = getAddEthereumChain()[parseInt(chainId).toString()];

        const params = {
          chainId: chainId, // A 0x-prefixed hexadecimal string
          chainName: chain.name,
          nativeCurrency: {
            name: chain.nativeCurrency.name,
            symbol: chain.nativeCurrency.symbol, // 2-6 characters long
            decimals: chain.nativeCurrency.decimals,
          },
          rpcUrls: chain.rpc,
          blockExplorerUrls: [
            chain.explorers &&
            chain.explorers.length > 0 &&
            chain.explorers[0].url
              ? chain.explorers[0].url
              : chain.infoURL,
          ],
        };
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [params, account],
        });
        dispatch(setWrongNetwork(false));
        setLoader(false);
        navigate(testnet ? "/testnet/account" : "/account")
      } catch (error) {
        setLoader(false);
        console.log(error);
      }
    }
  }

  useEffect(() => {}, [showWrong]);

  return (
    <div>
      <Modal
        animation={false}
        show={showWrong}
        onHide={handleClose}
        className="nftWorng"
      >
        <Modal.Header className="border-0">
          <Modal.Title>Wrong Network</Modal.Title>
          <span className="CloseModal" onClick={handleClose}>
            {widget ? (
              <CloseComp className="svgWidget" />
            ) : (
              <img src={Close} alt="" />
            )}
          </span>
        </Modal.Header>
        <Modal.Body className="modalBody text-center">
          <div className="wrongNFT">
            <div className="nftWornTop">
              <span className="worngImg">
                <img src={Wrong} alt="Worng" />
              </span>
              <h3>Switch to {from?.key === "xDai" ? "Gnosis Chain" : from?.key} {testnet ? "TestNet" : "Mainnet"}</h3>
              <p className="">
                XP.NETWORK Bridge requires you to <br /> connect to the{" "}
                {from?.key === "xDai" ? "Gnosis Chain" : from?.key} {testnet ? "TestNet" : "Mainnet"}
              </p>
            </div>
            {loader && (
              <div className="switchingAcc">
                <ChangeNetworkLoader />
                <p className="">"Switching to" {testnet ? "TestNet" : "Mainnet"}</p>
                <p className="">Follow instructions in MetaMask</p>
              </div>
            )}
            {!loader && (
              <a onClick={() => switchNetwork()} className="switching">
                Switch Network
              </a>
            )}
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default ChangeNetworkModal;
