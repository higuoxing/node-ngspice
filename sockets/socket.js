module.exports = {
  socket_router: (socket) => {
    // begin to load page signal
    socket.emit('loading-page', { load: 'loading-page' });

    // socket router
    socket.on('event-test', (data) => {
      console.log(data);
    });

    socket.on('socket-id', (data) => {
      console.log('connection succeed');
      console.log('socket-id:' + data.socket_id);
    });
  },
}
