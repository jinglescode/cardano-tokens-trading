import { useEffect, useRef } from "react";
import RTCMultiConnection from "rtcmulticonnection";

// const useBroadcasting = () => {
//   // const videoRef = useRef();
//   // const btnJoin = useRef();

//   var connection = new RTCMultiConnection();

//   // connection.iceServers = [
//   //   {
//   //     urls: [
//   //       "stun:stun.l.google.com:19302",
//   //       "stun:stun1.l.google.com:19302",
//   //       "stun:stun2.l.google.com:19302",
//   //       "stun:stun.l.google.com:19302?transport=udp",
//   //     ],
//   //   },
//   // ];

//   // its mandatory in v3
//   connection.enableScalableBroadcast = true;

//   // each relaying-user should serve only 1 users
//   connection.maxRelayLimitPerUser = 1;

//   // we don't need to keep room-opened
//   // scalable-broadcast.js will handle stuff itself.
//   connection.autoCloseEntireSession = true;

//   // connection.socketURL = 'https://rtcmulticonnection.herokuapp.com:443/';
//   connection.socketURL = "https://muazkhan.com:9001/";

//   connection.socketMessageEvent = "scalable-media-broadcast-demo";

//   connection.onstream = function (event) {
//     console.log(event);
//     console.log(connection.isInitiator, event.type);
//     if (connection.isInitiator && event.type !== "local") {
//       return;
//     }

//     connection.isUpperUserLeft = false;

//     // videoRef.current.srcObject = event.stream;

//     if (connection.isInitiator == false && event.type === "remote") {
//       // he is merely relaying the media
//       connection.dontCaptureUserMedia = true;
//       connection.attachStreams = [event.stream];
//       connection.sdpConstraints.mandatory = {
//         OfferToReceiveAudio: false,
//         OfferToReceiveVideo: false,
//       };

//       connection.getSocket(function (socket) {
//         socket.emit("can-relay-broadcast");

//         if (connection.DetectRTC.browser.name === "Chrome") {
//           connection.getAllParticipants().forEach(function (p) {
//             if (p + "" != event.userid + "") {
//               var peer = connection.peers[p].peer;
//               peer.getLocalStreams().forEach(function (localStream) {
//                 peer.removeStream(localStream);
//               });
//               event.stream.getTracks().forEach(function (track) {
//                 peer.addTrack(track, event.stream);
//               });
//               connection.dontAttachStream = true;
//               connection.renegotiate(p);
//               connection.dontAttachStream = false;
//             }
//           });
//         }

//         if (connection.DetectRTC.browser.name === "Firefox") {
//           // Firefox is NOT supporting removeStream method
//           // that's why using alternative hack.
//           // NOTE: Firefox seems unable to replace-tracks of the remote-media-stream
//           // need to ask all deeper nodes to rejoin
//           connection.getAllParticipants().forEach(function (p) {
//             if (p + "" != event.userid + "") {
//               connection.replaceTrack(event.stream, p);
//             }
//           });
//         }

//         // // Firefox seems UN_ABLE to record remote MediaStream
//         // // WebAudio solution merely records audio
//         // // so recording is skipped for Firefox.
//         // if (connection.DetectRTC.browser.name === "Chrome") {
//         //   repeatedlyRecordStream(event.stream);
//         // }
//       });
//     }
//   };

//   connection.onstreamended = function () {};

//   connection.onleave = function (event) {
//     console.log("onleave", event);

//     // if (event.userid !== videoPreview.userid) return;

//     // connection.getSocket(function (socket) {
//     //   socket.emit("can-not-relay-broadcast");

//     //   connection.isUpperUserLeft = true;

//     //   if (allRecordedBlobs.length) {
//     //     // playing lats recorded blob
//     //     var lastBlob = allRecordedBlobs[allRecordedBlobs.length - 1];
//     //     videoPreview.src = URL.createObjectURL(lastBlob);
//     //     videoPreview.play();
//     //     allRecordedBlobs = [];
//     //   } else if (connection.currentRecorder) {
//     //     var recorder = connection.currentRecorder;
//     //     connection.currentRecorder = null;
//     //     recorder.stopRecording(function () {
//     //       if (!connection.isUpperUserLeft) return;

//     //       videoPreview.src = URL.createObjectURL(recorder.getBlob());
//     //       videoPreview.play();
//     //     });
//     //   }

//     //   if (connection.currentRecorder) {
//     //     connection.currentRecorder.stopRecording();
//     //     connection.currentRecorder = null;
//     //   }
//     // });
//   };

//   connection.onNumberOfBroadcastViewersUpdated = function (event) {
//     if (!connection.isInitiator) return;

//     console.log(event.numberOfBroadcastViewers);

//     // setNumParticipants(event.numberOfBroadcastViewers);
//   };

//   function joinRoom(userId, broadcastId, broadcaster, callback) {
// setConnectState(broadcasting_status["making_broadcasting_connection"]);

//     connection.connectSocket(function () {
//       connection.changeUserId(userId, function () {
//         console.log("userid:" + connection.userid);

//         // user need to connect server, so that others can reach him.
//         connection.connectSocket(function (socket) {
//           socket.on("logs", function (log) {
//             console.log(log);
//           });

//           console.log(77, broadcaster);
//           if (broadcaster) {
// setConnectState(broadcasting_status["is_broadcasting"]);
//           } else {
// setConnectState(broadcasting_status["is_receiving_broadcast"]);
//           }

//           // this event is emitted when a broadcast is already created.
//           socket.on("join-broadcaster", function (hintsToJoinBroadcast) {
//             console.log("join-broadcaster", hintsToJoinBroadcast);

//             connection.session = hintsToJoinBroadcast.typeOfStreams;
//             connection.sdpConstraints.mandatory = {
//               OfferToReceiveVideo: !!connection.session.video,
//               OfferToReceiveAudio: !!connection.session.audio,
//             };
//             connection.broadcastId = hintsToJoinBroadcast.broadcastId;
//             connection.join(hintsToJoinBroadcast.userid);
//           });

//           socket.on("rejoin-broadcast", function (broadcastId) {
//             console.log("rejoin-broadcast", broadcastId);

//             connection.attachStreams = [];
//             socket.emit(
//               "check-broadcast-presence",
//               broadcastId,
//               function (isBroadcastExists) {
//                 if (!isBroadcastExists) {
//                   // the first person (i.e. real-broadcaster) MUST set his user-id
//                   connection.userid = broadcastId;
//                 }

//                 socket.emit("join-broadcast", {
//                   broadcastId: broadcastId,
//                   userid: connection.userid,
//                   typeOfStreams: connection.session,
//                 });
//               }
//             );
//           });

//           socket.on("broadcast-stopped", function (broadcastId) {
//             // alert('Broadcast has been stopped.');
//             // location.reload();
//             console.error("broadcast-stopped", broadcastId);
//             // alert("This broadcast has been stopped.");
// setConnectState(broadcasting_status["broadcasting_ended"]);
//           });

//           // this event is emitted when a broadcast is absent.
//           if (broadcaster) {
//             socket.on("start-broadcasting", function (typeOfStreams) {
//               console.log("start-broadcasting", typeOfStreams);

//               // host i.e. sender should always use this!
//               connection.sdpConstraints.mandatory = {
//                 OfferToReceiveVideo: false,
//                 OfferToReceiveAudio: false,
//               };
//               connection.session = typeOfStreams;

//               // "open" method here will capture media-stream
//               // we can skip this function always; it is totally optional here.
//               // we can use "connection.getUserMediaHandler" instead
//               connection.open(connection.userid);
//             });
//           }
//         });

//         //////////// JOIN

//         connection.extra.broadcastId = broadcastId;

//         connection.session = {
//           audio: true,
//           video: true,
//           oneway: true,
//         };

//         connection.getSocket(function (socket) {
//           socket.emit(
//             "check-broadcast-presence",
//             broadcastId,
//             function (isBroadcastExists) {
//               if (!isBroadcastExists) {
//                 // the first person (i.e. real-broadcaster) MUST set his user-id
//                 connection.userid = broadcastId;
//               }

//               console.log(
//                 "check-broadcast-presence",
//                 broadcastId,
//                 isBroadcastExists
//               );

//               socket.emit("join-broadcast", {
//                 broadcastId: broadcastId,
//                 userid: connection.userid,
//                 typeOfStreams: connection.session,
//               });

//               callback();
//             }
//           );
//         });
//       });
//     });

//     if (broadcaster) {
//       // btnJoin.current.addEventListener("click", () => {
//       //   connection.attachStreams.forEach(function (stream) {
//       //     console.log(77778);
//       //     stream.stop();
//       //   });
//       //   connection.closeSocket();
//   // setConnectState(broadcasting_status["broadcasting_ended"]);
//       // });
//     }
//   }

//   // function joinRoom() {
//   //   console.log(1222);

//   // // user need to connect server, so that others can reach him.
//   // connection.connectSocket(function (socket) {
//   //   socket.on("logs", function (log) {
//   //     console.log(log);
//   //   });

//   //   // this event is emitted when a broadcast is already created.
//   //   socket.on("join-broadcaster", function (hintsToJoinBroadcast) {
//   //     console.log("join-broadcaster", hintsToJoinBroadcast);

//   //     connection.session = hintsToJoinBroadcast.typeOfStreams;
//   //     connection.sdpConstraints.mandatory = {
//   //       OfferToReceiveVideo: !!connection.session.video,
//   //       OfferToReceiveAudio: !!connection.session.audio,
//   //     };
//   //     connection.broadcastId = hintsToJoinBroadcast.broadcastId;
//   //     connection.join(hintsToJoinBroadcast.userid);
//   //   });

//   //   socket.on("rejoin-broadcast", function (broadcastId) {
//   //     console.log("rejoin-broadcast", broadcastId);

//   //     connection.attachStreams = [];
//   //     socket.emit("check-broadcast-presence", broadcastId, function (
//   //       isBroadcastExists
//   //     ) {
//   //       if (!isBroadcastExists) {
//   //         // the first person (i.e. real-broadcaster) MUST set his user-id
//   //         connection.userid = broadcastId;
//   //       }

//   //       socket.emit("join-broadcast", {
//   //         broadcastId: broadcastId,
//   //         userid: connection.userid,
//   //         typeOfStreams: connection.session,
//   //       });
//   //     });
//   //   });

//   //   socket.on("broadcast-stopped", function (broadcastId) {
//   //     // alert('Broadcast has been stopped.');
//   //     // location.reload();
//   //     console.error("broadcast-stopped", broadcastId);
//   //     alert("This broadcast has been stopped.");
//   //   });

//   //   // this event is emitted when a broadcast is absent.
//   //   socket.on("start-broadcasting", function (typeOfStreams) {
//   //     console.log("start-broadcasting", typeOfStreams);

//   //     // host i.e. sender should always use this!
//   //     connection.sdpConstraints.mandatory = {
//   //       OfferToReceiveVideo: false,
//   //       OfferToReceiveAudio: false,
//   //     };
//   //     connection.session = typeOfStreams;

//   //     // "open" method here will capture media-stream
//   //     // we can skip this function always; it is totally optional here.
//   //     // we can use "connection.getUserMediaHandler" instead
//   //     connection.open(connection.userid);
//   //   });
//   // });

//   // //////////// JOIN

//   // let broadcastId = "streambroadcast_testttt";

//   // connection.extra.broadcastId = broadcastId;

//   // connection.session = {
//   //   audio: true,
//   //   video: true,
//   //   oneway: true,
//   // };

//   // connection.getSocket(function (socket) {
//   //   socket.emit("check-broadcast-presence", broadcastId, function (
//   //     isBroadcastExists
//   //   ) {
//   //     if (!isBroadcastExists) {
//   //       // the first person (i.e. real-broadcaster) MUST set his user-id
//   //       connection.userid = broadcastId;
//   //     }

//   //     console.log("check-broadcast-presence", broadcastId, isBroadcastExists);

//   //     socket.emit("join-broadcast", {
//   //       broadcastId: broadcastId,
//   //       userid: connection.userid,
//   //       typeOfStreams: connection.session,
//   //     });
//   //   });
//   // });
//   // }

//   return [joinRoom];
// };

const useBroadcasting = (setNumParticipants, setConnectState, setUserMute) => {
  // const videoRef = useRef();
  // const btnJoin = useRef();
  // const btnMute = useRef();
  const connection = useRef(null);

  let userMicActive = true;

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

    connection.current.socketURL =
      "https://rtcmulticonnection.herokuapp.com:443/";
    // connection.current.socketURL = "https://muazkhan.com:9001/";

    connection.current.socketMessageEvent = "scalable-media-broadcast-demo";
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
    });

    // this event is emitted when a broadcast is absent.
    socket.on("start-broadcasting", function (typeOfStreams) {
      console.log("start-broadcasting", typeOfStreams);

      // host i.e. sender should always use this!
      connection.current.sdpConstraints.mandatory = {
        OfferToReceiveVideo: false,
        OfferToReceiveAudio: false,
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
  });

  connection.current.onstream = function (event) {
    console.log(event);
    console.log(connection.current.isInitiator, event.type);
    if (connection.current.isInitiator && event.type !== "local") {
      console.log(1221);
      return;
    }

    connection.current.isUpperUserLeft = false;
    // videoRef.current.srcObject = event.stream;
    // videoPreview.srcObject = event.stream;
    // videoPreview.play();

    // videoPreview.userid = event.userid;

    // if (event.type === 'local') {
    //     videoPreview.muted = true;
    // }

    // videoRef.current.muted = true;

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

    connection.current.extra.broadcastId = broadcastId;

    connection.current.session = {
      audio: true,
      video: true,
      oneway: true,
    };

    if (broadcaster) {
      userId = broadcastId;
    } else {
      userId = userId + "_v";
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
                connection.current.userid = broadcastId;
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

        if (broadcaster) {
          // btnJoin.current.addEventListener("click", () => {
          //   endSession();
          //   // setConnectState(broadcasting_status["broadcasting_ended"]);
          // });
          // btnMute.current.addEventListener("click", () => {
          //   if (userMicActive) {
          //     connection.current.streamEvents
          //       .selectFirst({ local: true })
          //       .stream.mute("audio");
          //   } else {
          //     connection.current.streamEvents
          //       .selectFirst({ local: true })
          //       .stream.unmute("audio");
          //   }
          //   userMicActive = !userMicActive;
          //   setUserMute(userMicActive);
          // });
        }

        setTimeout(function () {
          if (broadcaster) {
            // setConnectState(broadcasting_status["is_broadcasting"]);
          } else {
            // setConnectState(broadcasting_status["is_receiving_broadcast"]);
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
    // setNumParticipants(event.numberOfBroadcastViewers);
  };

  return [joinRoom, endSession];
};

export default function RTC({ userId, roomId, isBroadcaster }) {
  const [joinRoom, endSession] = useBroadcasting();

  useEffect(() => {
    console.log("load");
  }, []);

  function connectRoom() {
    console.log("connectRoom", isBroadcaster, userId, roomId);
    joinRoom(userId, roomId, isBroadcaster);
  }

  return (
    <>
      <button onClick={() => connectRoom()}>join</button>
    </>
  );
}
