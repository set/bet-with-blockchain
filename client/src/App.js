import { useEffect, useState } from 'react';
import './App.css';

import JoinForm from "./components/JoinForm";

import { setUser, setContract, setTransfer, setError } from './store/system';
import { useSelector, useDispatch } from 'react-redux'

import { ethers } from 'ethers';
import ContractJson from './artifacts/contracts/BetWithBlockchain.sol/BetWithBlockchain.json';

// SET REAL CONTRACT ADDRESS
var ContractAddress = "0xDD967DDF11F89CDbba9071FB8dE2b1b9Ce2D2004";

function App() {
  const [fee, setFee] = useState('0');
  const [count, setCount] = useState(0);
  const dispatch = useDispatch();
  const error = useSelector(state => state.system.error);

  useEffect(() => {
    if( typeof window.ethereum !== 'undefined' ) {
      fetchData();
    } else {
      alert('You must install MetaMask to use this app.');
    }
  },[]);

  async function fetchData() {
      const c = new ethers.Contract(
        ContractAddress,
        ContractJson.abi,
        new ethers.providers.Web3Provider(window.ethereum),
      );
      dispatch(setContract(c));
      setInterval(async () => {
        const getFee = await c.getFee();
        setFee(ethers.utils.formatEther(getFee));
        const getCount = await c.getCount();
        setCount(getCount);
      }, 100);

      const t = new ethers.Contract(
        ContractAddress,
        ContractJson.abi,
        (new ethers.providers.Web3Provider(window.ethereum)).getSigner(),
      );
      dispatch(setTransfer(t));
      // const cc = await c.getCreated();
      // setCreatedCount(cc);
  }

  return (
    <div className="App">
      <MetaMaskAuth />
      <div className="header">
        <div>
          <h1>Betting Platform with AVAX</h1>
          <h3>Bet for 1 AVAX and WIN 25 AVAX</h3>
          <p>You can buy tickets to join game. When 30 tickets sold, system will draw lots and send 25 AVAX to the winner person automatically and then the game will restart. The more tickets you buy, the better your chances.</p>
          <p className="player-info">1 ticket = {fee} AVAX</p>
          <p className="player-info">Players in game for current loop: {count}/30</p>
        </div>
      </div>
      { !error && <JoinForm /> }
      <a href="#" target="_blank">Verified Contract</a>
    </div>
  );
}

function MetaMaskAuth() {

  const user = useSelector(state => state.system.user);
  const error = useSelector(state => state.system.error);
  const dispatch = useDispatch();

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  async function checkIfWalletIsConnected() {
    if (window.ethereum) {
      try {
        // check if the chain to connect to is installed
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0xA86A' }], // chainId must be in hexadecimal numbers
        });

        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });

        if (accounts.length > 0) {
          dispatch(setUser(accounts[0]));
          return;
        }
      } catch (error) {
        // dispatch(setError("You must add and Switch Avalance C-CHAIN Network on Metamask!"));
      }
    }
  }

  if( error.length ) return <p style={{backgroundColor: "black", color: "white", fontWeight: "bold", padding: "10px"}}>{error}</p>

  return user.length ? <div>
    Connected with <Address />
  </div> : <Connect />
}

function Connect() {
  const dispatch = useDispatch();

  return (
    <button className="button" onClick={async () => {
      if (!window.ethereum) {
        alert("Get MetaMask!");
        return;
      }
    
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
    
      dispatch(setUser(accounts[0]));
    }}>
      Connect to MetaMask
    </button>
  );
}

function Address() {
  const user = useSelector(state => state.system.user);
  return (
    <span className="address">{user.substring(0, 5)}…{user.substring(user.length - 4)}</span>
  );
}

export default App;
