module.exports = {
  socket_router: (socket) => {
    // socket router
    socket.on('event-test', (data) => {
      console.log(data);
    });
  },
}
