import React from 'react';
import { useSelector } from "react-redux";

import { ethers } from 'ethers';

function JoinForm() {

  const system = useSelector(state => state.system);

  const joinGame = async () => {
    const fee = (await system.contract.getFee()) / 10**18;
    system.transfer.join({
      value: ethers.utils.parseEther(fee.toString())
    });
  }

  return (
    <div>
      <button className="join-btn" onClick={() => { joinGame() }}>JOIN with 1 AVAX</button>
    </div>
  );
}

export default JoinForm;

