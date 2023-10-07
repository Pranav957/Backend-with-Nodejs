//configuration of websocket server
module.exports.chatSocket=function(socketServer){
    let io=require('socket.io')(socketServer, {
        cors: {
          origin: 'http://localhost:8001',
          methods: ['GET', 'POST']
 } });
    io.sockets.on('connection',function(socket){
        console.log('new connection received',socket.id);

        socket.on('disconnect',function(){
            console.log('socket disconnected!');
        });

        socket.on('join_room',function(data){
            console.log('Joining request Received',data);
           
            socket.join(data.chatroom);

            io.in(data.chatroom).emit('user_joined',data);
        });

        socket.on('send_message',function(data){
            console.log('message received ',data.message);
            io.in(data.chatroom).emit('receive_message',data);
        });
    });
}