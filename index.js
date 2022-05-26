const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
// io.on('connection', (socket) => {
// 	console.log(socket.id) 
// });  

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});


io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    if (!io.sockets.adapter.rooms.get(data)) {
      socket.join(data);
      console.log(data + ":" + io.sockets.adapter.rooms.get(data).size);
    } else if (io.sockets.adapter.rooms.get(data).size < 4) {
      socket.join(data);
      console.log(data + ":" + io.sockets.adapter.rooms.get(data).size);
    } else {
      console.log("FULL");
    }
  });


  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
    // console.log(data);
  });

  socket.on("disconnect", (socket) => {
    console.log("Disconnected");
  });
});

// ID
// var socket = io('http://192.168.10.10:3000');
// var socketConnected = false;

// socket.on('connect', function() {
//   socketConnected = true;
//   console.log('Connected! ID: ' + socket.id);
// });

// socket.on('disconnect', function() {
//   socketConnected = false;
//   console.log('Disconnected!');
// });


// post 
// const postGame = async (req, res) => {
//   try {
//     const games = await Game.find({});
//     console.log(games);

//     if (!games.length) {
//       const newGame = await Game.create({
//         id: bookidgen("GAME", 9999, 999999),
//       });
//       const game = await Game.findOneAndUpdate(
        
//         { id: newGame.id },
//         {

//           $push: {
//             players: { id: req.body.id },

//           },
//         },
//         { new: true }
//       );
//       res.json({
//         message: "You joined a game",
//         data: game,
//         status: true,
//       });
//     } else {
//       let count = 0;
//       let a;
//       for (let i = 0; i < games.length; i++) {
//         if (games[i].players.length < 4) {
//           count = 1;
//           a = games[i];
//           break;
//         }
//       }
//       if (count == 1) {
//         const newGame = await Game.findOneAndUpdate(
//           { id: a.id },
//           {
//             $push: {
//               players: { id: req.body.id },
//             },
//           },
//           {
//             new: true,
//           }
//         );
//         res.json({
//           message: "You joined a game",
//           data: newGame,
//           status: true,
//         });
//       } else {
//         const newGame = await Game.create({
//           id: bookidgen("GAME", 9999, 999999),
//         });
//         const game = await Game.findOneAndUpdate(
//           { id: newGame.id },
//           {
//             $push: {
//               players: { id: req.body.id },
//             },
//           },
//           { new: true }
//         );
//         res.json({
//           message: "You joined a game",
//           data: game,
//           status: true,
//         });
//       }
//     }
//   } catch (error) {
//     res.json({ message: error.message, status: false });
//   }
// };



server.listen(3001, () => {
  console.log("SERVER IS RUNNING");
});
//io.sockets.adapter.rooms


