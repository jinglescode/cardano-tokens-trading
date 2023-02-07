import { useState, useRef, useEffect } from "react";
import { ConnectionStates } from "@/types/connectionStates";
import { TradeStates } from "@/types/tradeStates";
import { useBroadcasting } from "./useBroadcasting";
import useTrade from "@/contexts/trade";
import { largestFirstMultiAsset, UTxO } from "@meshsdk/core";
import type { Unit, Quantity } from "@meshsdk/core";
import { useWallet } from "@meshsdk/react";

export const useTrading = () => {
  const { userAddressOrHandler } = useTrade();
  const { connected, wallet } = useWallet();

  const [connectionState, setConnectionState] = useState(ConnectionStates.init);
  const [tradeState, setTradeState] = useState({
    // state: TradeStates.init,
    usersTrades: {},
    usersState: {},
    usersSelectedUtxos: {},
    usersChangeAddress: {},
    numParticipants: 0,
    tradeAddresses: {},
  });
  // const [user, setUser] = useState({ userId: "", isHost: false });

  const user = useRef({ userId: "", isHost: false });
  const [userMicActive, setUserMicActive] = useState(false);

  const { btnMute, joinRoom, endSession, sendMessage } = useBroadcasting({
    setUserMicActive,
    setConnectionState,
    receiveMessage,
    userJoinOrLeft,
    setHostNumParticipants,
  });

  useEffect(() => {
    if (connected && userAddressOrHandler != "") {
      setConnectionState(ConnectionStates.readyToConnect);
    }
  }, [connected, userAddressOrHandler]);

  function openTradeRoom() {
    let roomId = userAddressOrHandler;
    let userId = userAddressOrHandler;
    if (userId.includes("addr_")) {
      // let r = (Math.random() + 1).toString(36).substring(7); // todo
      let r = "jingles";
      roomId = r;
      userId = r;
      let _user = { ...user.current };
      _user.userId = r;
      _user.isHost = true;
      // setUser(_user);
      user.current = _user;
    }
    const isBroadcaster = true;
    joinRoom(userId, roomId, isBroadcaster);
  }

  function joinTradeRoom({ roomId }) {
    const isBroadcaster = false;
    joinRoom(userAddressOrHandler, roomId, isBroadcaster);
    // let _user = { ...user };
    // _user.userId = userAddressOrHandler;
    // _user.isHost = false;
    // setUser(_user);
    let _user = { ...user.current };
    _user.userId = userAddressOrHandler;
    _user.isHost = false;
    user.current = _user;
  }

  function receiveMessage(event) {
    if (event.data.type == "updateTradeState") {
      setTradeState(event.data.payload.tradeState);
    }
    if (event.data.type == "updateTradeAsset") {
      updateTradeAsset({
        fromUserId: event.extra.userId,
        asset: event.data.payload.asset,
        quantity: event.data.payload.quantity,
      });
    }
    if (event.data.type == "userJoinOrLeft") {
      userJoinOrLeft(event.data.payload.userId, event.data.payload.isJoined);
    }
    if (event.data.type == "userUpdateState") {
      if (event.data.payload.state == TradeStates.accepted) {
        userAcceptTrade({
          userId: event.data.payload.userId,
          utxos: event.data.payload.utxos,
          changeAddress: event.data.payload.changeAddress,
        });
      }
    }
  }

  function updateTradeAsset({
    asset,
    quantity,
    fromUserId,
  }: {
    asset: { unit: string };
    quantity: number;
    fromUserId?: string;
  }) {
    let _userId = user.current.userId;
    if (fromUserId) {
      _userId = fromUserId;
    }

    // if is host, update state and send message
    if (user.current.isHost) {
      let _tradeState = { ...tradeState };
      if (!(_userId in _tradeState.usersTrades)) {
        _tradeState.usersTrades[_userId] = {};
      }
      if (!(asset.unit in _tradeState.usersTrades[_userId])) {
        _tradeState.usersTrades[_userId][asset.unit] = asset;
      }
      if (quantity == 0) {
        delete _tradeState.usersTrades[_userId][asset.unit];
      } else {
        _tradeState.usersTrades[_userId][asset.unit].quantity = quantity;
      }

      // update all states to offering
      for (let userId in _tradeState.usersState) {
        _tradeState.usersState[userId] = TradeStates.offering;
      }
      broadcastTradeState(_tradeState);
    }
    // else if is not host, send message
    else {
      sendMessage({
        type: "updateTradeAsset",
        payload: { asset, quantity },
      });
    }
  }

  function userJoinOrLeft(userId, isJoined) {
    console.log("userJoinOrLeft", userId, isJoined, user);
    if (user.current.isHost) {
      let _tradeState = { ...tradeState };
      if (isJoined) {
        _tradeState.numParticipants += 1;
        _tradeState.usersTrades[userId] = {};
        _tradeState.usersState[userId] = TradeStates.offering;
      } else {
        _tradeState.numParticipants -= 1;
        delete _tradeState.usersTrades[userId];
        delete _tradeState.usersState[userId];
      }
      // update all states to offering
      for (let userId in _tradeState.usersState) {
        _tradeState.usersState[userId] = TradeStates.offering;
      }
      broadcastTradeState(_tradeState);
    } else {
      sendMessage({
        type: "userJoinOrLeft",
        payload: { userId, isJoined },
      });
    }
  }

  function setHostNumParticipants(num) {
    // let _tradeState = { ...tradeState };
    // _tradeState.numParticipants = num;
    // broadcastTradeState(_tradeState);
  }

  function broadcastTradeState(tradeState) {
    setTradeState(tradeState);
    sendMessage({
      type: "updateTradeState",
      payload: { tradeState },
    });
  }

  async function userAcceptTrade({
    userId,
    utxos,
    changeAddress,
  }: {
    userId?: string;
    utxos?: UTxO[];
    changeAddress?: string;
  }) {
    let _userId = user.current.userId;
    if (userId) {
      _userId = userId;
    }

    // get utxos
    if (utxos == undefined) {
      const walletUtxos = await wallet.getUtxos();

      // get assets
      const assetMap = new Map<Unit, Quantity>();
      Object.keys(tradeState.usersTrades[_userId]).map((unit) => {
        assetMap.set(
          unit,
          tradeState.usersTrades[_userId][unit].quantity.toString()
        );
      });
      console.log("assetMap", assetMap);
      const selectedUtxos = largestFirstMultiAsset(assetMap, walletUtxos, true);
      console.log("selectedUtxos", selectedUtxos);
      utxos = selectedUtxos;

      changeAddress = await wallet.getChangeAddress();
    }

    if (user.current.isHost) {
      let _tradeState = { ...tradeState };
      _tradeState.usersState[_userId] = TradeStates.accepted;
      _tradeState.usersSelectedUtxos[_userId] = utxos;
      _tradeState.usersChangeAddress[_userId] = changeAddress;
      broadcastTradeState(_tradeState);
    } else {
      sendMessage({
        type: "userUpdateState",
        payload: {
          userId: _userId,
          utxos: utxos,
          changeAddress: changeAddress,
          state: TradeStates.accepted,
        },
      });
    }
  }

  return {
    btnMute,
    userMicActive,
    connectionState,
    tradeState,
    user,
    endSession,
    openTradeRoom,
    joinTradeRoom,
    updateTradeAsset,
    userAcceptTrade,
  };
};
