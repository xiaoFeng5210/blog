var APP_ID = 'zcsiEI7vHUyK7wmeGAPbtMmq-gzGzoHsz';
var APP_KEY = 'tbIV996X4BlLf2EnhWRXTAcz';

AV.init({
  appId: APP_ID,
  appKey: APP_KEY
});


var query = new AV.Query('Message');
query.find()
  .then(
    function (messages) {
      let array = messages.map((item)=> item.attributes )
      array.forEach((item)=>{
        let li = document.createElement('li')
        li.innerText = `${item.name}: ${item.content}`
        let messageList = document.querySelector('#messageList')
        messageList.appendChild(li)
      })
    } 
  )

let myForm = document.querySelector('#postMessageForm')

myForm.addEventListener('submit', function(e){
  e.preventDefault()
  let content = myForm.querySelector('input[name=content]').value
  let name = myForm.querySelector('input[name=name]').value
  var Message = AV.Object.extend('Message');
  var message = new Message();
  message.save({
    'name': name,
    'content': content
  }).then(function(object) {
    let li = document.createElement('li')
    li.innerText = `${object.attributes.name}: ${object.attributes.content}`
    let messageList = document.querySelector('#messageList')
    messageList.appendChild(li)
    myForm.querySelector('input[name=content]').value = ''
    console.log(object)
  })
})

/*
// 创建 TestObject 表
var X = AV.Object.extend('Frank2');
// 在表中创建一行数据
var o = new X();
// 数据内容是 words: 'Hello World!' 保存
// 如果保存成功，则运行 alert('')
o.save({
  xxxxxxxxxx: 'Fuck World!'
}).then(function() {
  console.log(arguments[0])
})
*/