

// todo: rewrite as Primus
function enterRoom(data, socket, io, clientList = []) {
  console.log("A user joined", data.user);
  const list = clientList.push({ name: data.user, id: socket.id });
  socket.join("whaleSpace");
  io.emit("currentUserList", clientList);
  return list;
}


module.exports = {
  enterRoom
};