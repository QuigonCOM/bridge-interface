import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import Close from "../../assets/img/icons/close.svg";
import { ReactComponent as CloseComp } from "../../assets/img/icons/close.svg";
import ChangeNetworkModal from "../Modals/ChangeNetwork/ChangeNetworkModal"
import { useDispatch, useSelector } from "react-redux";
import { setQrCodeString, setShowAbout, setShowVideo, setWalletsModal, setWrongNetwork } from "../../store/reducers/generalSlice";
import MaiarModal from "../MaiarModal";
import WalletList from "./WalletList";
import { useNavigate } from "react-router-dom";
import { chainsConfig } from "../values";
import { useWeb3React } from "@web3-react/core";

function ConnectWallet() {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const from = useSelector((state) => state.general.from);
  const to = useSelector((state) => state.general.to);
  const [show, setShow] = useState();
  const qrCodeString = useSelector((state) => state.general.qrCodeString);
  const qrCodeImage = useSelector((state) => state.general.qrCodeImage);
  const elrondAccount = useSelector(state => state.general.elrondAccount)
  const tezosAccount = useSelector(state => state.general.tezosAccount)
  const algorandAccount = useSelector(state => state.general.algorandAccount)
  const evmAccount = useSelector(state => state.general.account)
  const tronAccount = useSelector(state => state.general.tronWallet)
  const testnet = useSelector(state => state.general.testNet)
  const { chainId } = useWeb3React()
  const connected = (elrondAccount || tezosAccount || algorandAccount || evmAccount || tronAccount) ? true : false

  const handleClose = () => {
    setShow(false);
    dispatch(setWalletsModal(false))
    if (qrCodeImage) {
      dispatch(setQrCodeString(""));
    }
  };
  const walletsModal = useSelector(state => state.general.walletsModal)
  const widget = useSelector((state) => state.general.widget);

 

  const handleShow = () => {
    if(from && to && !connected){
      setShow(true)
    }
    else if(connected && to && from && from.chainId === chainId){
      navigate(testnet ? "/testnet/account" : "/account")
    }
    else if(connected && to && from && from.chainId !== chainId){
      dispatch(setWrongNetwork(true))
    }
  };

  function handleAboutClick() {
    dispatch(setShowAbout(true))
}
function handleVideoClick() {
    dispatch(setShowVideo(true))
}

  return (
    <div>
      <ChangeNetworkModal />
      <div onClick={handleShow} className={from && to ? "connect-wallet__button" : "connect-wallet__button--disabled"}>
        Continue bridging -&gt;
      </div>
      <div id="aboutnft" className="aboutNft">
          <div onClick={() => handleVideoClick()} className="about-btn about-video">Learn how to use NFT bridge</div>
          <div onClick={() => handleAboutClick()} className="about-btn about-text">What is NFT</div>
      </div>
      {!qrCodeString ? (
        <Modal
          show={show || walletsModal}
          onHide={handleClose}
          animation={false}
          className="ChainModal"
        >
          <Modal.Header>
            <Modal.Title>Connect Wallet</Modal.Title>
            <span className="CloseModal" onClick={handleClose}>
              {widget ? (
                <CloseComp className="svgWidget" />
              ) : (
                <img src={Close} alt="" />
              )}
            </span>
          </Modal.Header>
          <Modal.Body>
            <div className="walletListBox">
              <WalletList connected={handleClose} />
            </div>
          </Modal.Body>
        </Modal>
      ) : (
        <MaiarModal
          handleClose={handleClose}
          strQR={qrCodeImage}
          qrCodeString={qrCodeString}
          show={show}
        />
      )}
    </div>
  );
}
//
export default ConnectWallet;
