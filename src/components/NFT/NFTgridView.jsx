import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import NFTempty from '../innercomponents/NFTempty';
import Missing from '../innercomponents/Missing';
import BigLoader from "../../components/innercomponents/BigLoader"
import NFTcard from './NFTcard';
import {  } from "../../wallet/helpers.js" 


function NFTgridView() {
    const nfts = useSelector(state => state.general.NFTList)
    const algorandClaimables = useSelector(state => state.general.algorandClaimables)
    const nftsPlace = window.innerWidth <= 600 ? 2 : 6
    const placeholders = new Array(nfts ? nftsPlace - nfts.length >= 0 ? nftsPlace - nfts.length : 0 : 0).fill(0)
    const loader = useSelector(state => state.general.bigLoader)


    return (
        <div className="nftListBox">
                { loader ? <BigLoader />
                :
                    <div className="nft-list__wrapper">
                        { algorandClaimables && 
                        algorandClaimables.map((nft, index) => <NFTcard nft={nft} index={index} key={`nft-${index}`} claimables={true} />)
                        }
                        { nfts?.length ? 
                        nfts.map((nft, index) => <NFTcard nft={nft} index={index} key={`nft-${index}`} />)
                        : 
                        <NFTempty /> }
                        { nfts.length > 0 && nfts?.length < nftsPlace ? placeholders.map((n, index) => <Missing key={`missing-${index}-component`}/>) : ''}
                    </div>
                }
        </div>
    )
}

export default NFTgridView;
