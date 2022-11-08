import React from "react";
import { Modal } from "react-bootstrap";
import "./TransferLoader.css";

export default function TransferLoader() {
    return (
        <>
            <Modal.Header className="border-0">
                <Modal.Title>
                    <div className="transfer-loader__animation">
                        <Animation />
                    </div>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="transfer-loader__body">
                <div className="transfer-loader__title">
                    Transaction Processing
                </div>
                <div className="transfer-loader__text">
                    Departure and destination chain transactions take time,
                    especially in periods of heavy congestion.
                </div>
                <div className="transfer-loader__sub">💙 Please be patient</div>
            </Modal.Body>
        </>
    );
}

function Animation() {
    return (
        <div className="center">
            <div className="wave"></div>
            <div className="wave"></div>
            <div className="wave"></div>
            <div className="wave"></div>
            <div className="wave"></div>
            <div className="wave"></div>
            <div className="wave"></div>
            <div className="wave"></div>
            <div className="wave"></div>
            <div className="wave"></div>
        </div>
    );
}
