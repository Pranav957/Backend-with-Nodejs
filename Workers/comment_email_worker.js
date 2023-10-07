const queue=require('../config/kue');
const commentMailer=require('../Mailers/commentsMailer');

queue.process('emails',function(job,done){
    console.log('emails worker is processing',job.data);
  commentMailer.newComment(job.data);
  done();
});