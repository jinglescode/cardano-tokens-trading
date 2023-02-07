import { ConnectionStates } from "@/types/connectionStates";
import { useRef, useState } from "react";
import RTCMultiConnection from "rtcmulticonnection";

export const useBroadcasting = ({
  setUserMicActive,
  setConnectionState,
  receiveMessage,
  userJoinOrLeft,
  setHostNumParticipants,
}) => {
  const connection = useRef(null);
  const btnMute = useRef();
  const userMicActive = useRef(false);
  // const [userMicActive, setUserMicActive] = useState(false);

  if (connection.current == null) {
    connection.current = new RTCMultiConnection();

    connection.current.enableLogs = false;

    connection.current.iceServers = [
      {
        urls: [
          "stun:stun.l.google.com:19302",
          "stun:stun1.l.google.com:19302",
          "stun:stun2.l.google.com:19302",
          "stun:stun.l.google.com:19302?transport=udp",
        ],
      },
    ];

    // its mandatory in v3
    connection.current.enableScalableBroadcast = true;

    // each relaying-user should serve only 1 users
    connection.current.maxRelayLimitPerUser = 5;

    // we don't need to keep room-opened
    // scalable-broadcast.js will handle stuff itself.
    connection.current.autoCloseEntireSession = true;

    connection.current.socketURL = "https://muazkhan.com:9001/";

    connection.current.socketMessageEvent = "mesh-broadcast";
  }

  // user need to connect server, so that others can reach him.
  connection.current.connectSocket(function (socket) {
    socket.on("logs", function (log) {
      console.log("connectSocket log", log);
    });

    // this event is emitted when a broadcast is already created.
    socket.on("join-broadcaster", function (hintsToJoinBroadcast) {
      console.log("join-broadcaster", hintsToJoinBroadcast);

      connection.current.session = hintsToJoinBroadcast.typeOfStreams;
      connection.current.sdpConstraints.mandatory = {
        OfferToReceiveVideo: !!connection.current.session.video,
        OfferToReceiveAudio: !!connection.current.session.audio,
      };
      connection.current.broadcastId = hintsToJoinBroadcast.broadcastId;
      connection.current.join(hintsToJoinBroadcast.userid);

      console.log(33, "join-broadcaster");
    });

    socket.on("rejoin-broadcast", function (broadcastId) {
      console.log("rejoin-broadcast", broadcastId);

      connection.current.attachStreams = [];
      socket.emit(
        "check-broadcast-presence",
        broadcastId,
        function (isBroadcastExists) {
          if (!isBroadcastExists) {
            // the first person (i.e. real-broadcaster) MUST set his user-id
            connection.current.userid = broadcastId;
          }

          socket.emit("join-broadcast", {
            broadcastId: broadcastId,
            userid: connection.current.userid,
            typeOfStreams: connection.current.session,
          });
        }
      );
    });

    socket.on("broadcast-stopped", function (broadcastId) {
      // alert('Broadcast has been stopped.');
      // location.reload();
      console.error("broadcast-stopped", broadcastId);
      // setConnectState(broadcasting_status["broadcasting_ended"]);
      console.log("broadcasting_status", ["broadcasting_ended"]);
    });

    // this event is emitted when a broadcast is absent.
    socket.on("start-broadcasting", function (typeOfStreams) {
      console.log("start-broadcasting", typeOfStreams);

      // host i.e. sender should always use this!
      connection.current.sdpConstraints.mandatory = {
        OfferToReceiveVideo: false,
        OfferToReceiveAudio: true,
      };
      connection.current.session = typeOfStreams;

      // "open" method here will capture media-stream
      // we can skip this function always; it is totally optional here.
      // we can use "connection.getUserMediaHandler" instead
      connection.current.open(connection.current.userid);
    });

    socket.on("end-user-broadcast", function (res) {
      console.log(res);
    });

    // socket.on("broadcast-message", function (messagePayload) {
    //   console.log("broadcast-message", messagePayload);
    // });

    connection.current.onmessage = function (event) {
      console.log("onmessage", event);
      receiveMessage(event);
    };
  });

  connection.current.onstream = function (event) {
    console.log(event);
    console.log(connection.current.isInitiator, event.type);
    if (connection.current.isInitiator && event.type !== "local") {
      console.log(1221);
      return;
    }

    connection.current.isUpperUserLeft = false;

    if (connection.current.isInitiator == false && event.type === "remote") {
      // he is merely relaying the media
      connection.current.dontCaptureUserMedia = true;
      connection.current.attachStreams = [event.stream];
      connection.current.sdpConstraints.mandatory = {
        OfferToReceiveAudio: false,
        OfferToReceiveVideo: false,
      };

      connection.current.getSocket(function (socket) {
        console.log("getSocket", socket);
        socket.emit("can-relay-broadcast");

        if (connection.current.DetectRTC.browser.name === "Chrome") {
          connection.current.getAllParticipants().forEach(function (p) {
            console.log(1111, p);
            if (p + "" != event.userid + "") {
              var peer = connection.current.peers[p].peer;
              peer.getLocalStreams().forEach(function (localStream) {
                peer.removeStream(localStream);
              });
              event.stream.getTracks().forEach(function (track) {
                peer.addTrack(track, event.stream);
              });
              connection.current.dontAttachStream = true;
              connection.current.renegotiate(p);
              connection.current.dontAttachStream = false;
            }
          });
        }

        if (connection.current.DetectRTC.browser.name === "Firefox") {
          // Firefox is NOT supporting removeStream method
          // that's why using alternative hack.
          // NOTE: Firefox seems unable to replace-tracks of the remote-media-stream
          // need to ask all deeper nodes to rejoin
          connection.current.getAllParticipants().forEach(function (p) {
            if (p + "" != event.userid + "") {
              connection.current.replaceTrack(event.stream, p);
            }
          });
        }
      });
    }

    console.log(
      connection.current.socketMessageEvent,
      connection.current.sessionid
    );
  };

  function joinRoom(userId, broadcastId, broadcaster) {
    // setConnectState(broadcasting_status["making_broadcasting_connection"]);
    console.log("broadcasting_status", ["making_broadcasting_connection"]);
    setConnectionState(ConnectionStates.connecting);

    connection.current.extra.broadcastId = broadcastId;
    connection.current.extra.userId = userId;

    connection.current.session = {
      audio: false,
      video: false,
      oneway: true,
      data: true,
    };

    connection.current.mediaConstraints = {
      audio: false,
      video: false,
    };

    if (broadcaster) {
      userId = broadcastId;
    }

    connection.current.connectSocket(function () {
      connection.current.changeUserId(userId, function () {
        console.log("userid:" + connection.current.userid);

        connection.current.getSocket(function (socket) {
          socket.emit(
            "check-broadcast-presence",
            broadcastId,
            function (isBroadcastExists) {
              if (!isBroadcastExists) {
                // the first person (i.e. real-broadcaster) MUST set his user-id
                // connection.current.userid = broadcastId;
              }

              console.log(
                "check-broadcast-presence",
                broadcastId,
                isBroadcastExists
              );

              socket.emit("join-broadcast", {
                broadcastId: broadcastId,
                userid: userId,
                typeOfStreams: connection.current.session,
              });
            }
          );
        });

        // if (btnMute.current) {
        btnMute.current.addEventListener("click", () => {
          console.log("btnMute clicked", userMicActive, userMicActive.current);
          if (userMicActive.current == false) {
            connection.current.streamEvents
              .selectFirst({ local: true })
              .stream.unmute("audio");
            setUserMicActive(true);
            userMicActive.current = true;
            // userMicActive = false;
          } else {
            connection.current.streamEvents
              .selectFirst({ local: true })
              .stream.mute("audio");
            setUserMicActive(false);
            userMicActive.current = false;
            // userMicActive = true;
          }
        });
        // }

        setTimeout(function () {
          if (broadcaster) {
            // setConnectState(broadcasting_status["is_broadcasting"]);
            console.log("broadcasting_status", ["is_broadcasting"]);
            setConnectionState(ConnectionStates.broadcasting);
            userJoinOrLeft(connection.current.userid, true);
          } else {
            // setConnectState(broadcasting_status["is_receiving_broadcast"]);
            console.log("broadcasting_status", ["is_receiving_broadcast"]);
            setConnectionState(ConnectionStates.connected);
            userJoinOrLeft(connection.current.userid, true);
          }
        }, 3000);
      });
    });
  }

  function endSession() {
    console.log("endSession");
    connection.current.attachStreams.forEach(function (stream) {
      stream.stop();
    });
    connection.current.closeSocket();
  }

  function sendMessage(message) {
    connection.current.send(message);
  }

  connection.current.onstreamended = function () {
    console.log("onstreamended");
  };

  connection.current.onleave = function (event) {
    if (event.userid !== connection.current.userid) return;

    console.log("onleave", connection.current.userid, event);

    connection.current.getSocket(function (socket) {
      socket.emit("can-not-relay-broadcast");
      connection.current.isUpperUserLeft = true;
    });
  };

  connection.current.onNumberOfBroadcastViewersUpdated = function (event) {
    if (!connection.current.isInitiator) return;
    console.log("numberOfBroadcastViewers", event.numberOfBroadcastViewers);
    // setHostNumParticipants(event.numberOfBroadcastViewers);
  };

  return { btnMute, userMicActive, joinRoom, endSession, sendMessage };
};
