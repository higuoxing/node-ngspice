module.exports = {
  socket_processor: (socket) => {
    // do nothing
    socket.emit('event-test', { data: 'test' });

    socket.on('event-test', (data) => {
      console.log(data);
    });
  },
}
