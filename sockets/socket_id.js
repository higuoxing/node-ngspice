module.exports = {
  socket_id_process: async (data) => {
    console.log('socket-id:' + data.socket_id);
    console.log('client: connection success');
    return { data: 'server: connection success' };
  }
}
