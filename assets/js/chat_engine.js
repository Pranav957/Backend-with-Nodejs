console.log('___________________________recievd control x**************************');
class chatEngine{
    constructor(chatBoxId,userEmail){
        this.chatBoxId=$(`#${chatBoxId}`);
        this.userEmail=userEmail;
        this.socket=io.connect('http://localhost:5000');
        // this.socket=io.connect('http://3.91.92.93/:5000');
        

        if(this.userEmail)
          this.connectionHandler();
    }

    connectionHandler(){

        let self=this;

        this.socket.on('connect',function(){
            console.log('connection established using sockets...!');
            
                self.socket.emit('join_room',{
                    user_email:self.userEmail,
                    chatroom:'codial'
                });

                self.socket.on('user_joined',function(data){
                    console.log('a user joined!',data);
                });

                $('#send-message').click(function(){
                  
                    let msg=$('#chat-message-input').val();
                    console.log(msg);

                    if(msg!='')
                    {
                        console.log('**************',msg)
                        self.socket.emit('send_message',{
                            message:msg,
                            user_email:self.userEmail,
                            chatroom:'codial'
                        });
                    }
                });

                // $(document).ready(function() {
                //     // Event listener for the send message button
                //     $('#send-message').click(function() {
                //         let msg = $('#chat-message-input').val();
                
                //         if (msg !== '') {
                //             // Emit a socket event to send the message
                //             self.socket.emit('send_message', {
                //                 message: msg,
                //                 user_email: self.userEmail,
                //                 chatroom: 'codial'
                //             });
                //         }
                //     });
                // });
                

                self.socket.on('receive_message',function(data){

                    console.log('message received',data.message);

                    let newMessage=$('<li>');

                    let messageType='other-message';

                    if(data.user_email==self.userEmail)
                       messageType='self-message';

                      newMessage.append($('<span>',{
                        'html':data.message
                      })) ;

                      newMessage.append($('<sub>',{
                        'html':data.user_email
                      })) ;
                   
                      newMessage.addClass(messageType);

                      $('#chat-messages-list').append(newMessage);
                });
            
        });

    }
}