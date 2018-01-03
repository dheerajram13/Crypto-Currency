const electron = require('electron')
const path = require('path')
const remote = electron.remote
const ipc = electron.ipcRenderer 

const closeBtn  = document.getElementById('closeBtn')

closeBtn.addEventListener('click',function(event){
    var window = remote.getCurrentWindow();
    window.close()
})

const updateBtn = document.getElementById('updateBtn')

updateBtn.addEventListener('click', function () {
  ipc.send('update-notify-value', document.getElementById('notifyVal').value)

  // Close this window
  var window = remote.getCurrentWindow();
  window.close();
})


const closeBtn1  = document.getElementById('closeBtn1')

closeBtn1.addEventListener('click',function(event){
    var window = remote.getCurrentWindow();
    window.close()
})

const updateBtn1 = document.getElementById('updateBtn1')

updateBtn1.addEventListener('click', function () {
  ipc.send('update-notify-value1', document.getElementById('notifyVal1').value)

  var window = remote.getCurrentWindow();
  window.close();
})