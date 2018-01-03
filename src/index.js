const electron = require('electron')
const path = require('path')
const BrowserWindow = electron.remote.BrowserWindow
const axios = require('axios')
const ipc = electron.ipcRenderer 



const notifyBtn = document.getElementById('notifyBtn')
const notifyBtn1 = document.getElementById('notifyBtn1')
var price = document.querySelector('h1')
var price1 = document.getElementById('price1')
var price2 = document.getElementById('price2')
var price2 = document.getElementById('price2')
var targetPrice = document.getElementById('targetPrice')
var targetPrice1 = document.getElementById('targetPrice1')
var targetPriceVal;
var targetPriceVal1;
const notification = {
    title:'BTC Alert',
    body:'BTC just beat your target price!',
    icon: path.join(__dirname, '../assets/images/btc.png')
}



function getBTC() {
    axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC&tsyms=USD')
    .then(res => {
        const cryptos = res.data.BTC.USD
        price.innerHTML = '$'+cryptos.toLocaleString('en')

        
        if (targetPrice.innerHTML != '' && targetPriceVal < res.data.BTC.USD) {
            const myNotification = new window.Notification(notification.title, notification)
        }

    })
}
function getBTCINR() {
    axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC&tsyms=INR')
    .then(res => {
        const cryptos = res.data.BTC.INR
        price1.innerHTML = '₹'+cryptos.toLocaleString('en')
            
        

    })
}

function getETCUSD() {
    axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=ETC&tsyms=USD')
    .then(res => {
        const cryptos = res.data.ETC.USD
        price2.innerHTML = '$'+cryptos.toLocaleString('en')

    })
}

function getLTCUSD() {
    axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=LTC&tsyms=USD')
    .then(res => {
        const cryptos = res.data.LTC.USD
        price3.innerHTML = '$'+cryptos.toLocaleString('en')

    })
}

getLTCUSD();
setInterval(getLTCUSD,10000);

getETCUSD();
setInterval(getETCUSD,10000);

getBTCINR();
setInterval(getBTCINR,10000);

getBTC();
setInterval(getBTC,10000);

notifyBtn.addEventListener('click', function (event) {
  const modalPath = path.join('file://', __dirname, 'add.html')
  let win = new BrowserWindow(
      { 
          frame: false,
          transparent:true,
          alwaysOnTop:true,
          width: 400, 
          height: 200 
      })
  win.on('close', function () { win = null })
  win.loadURL(modalPath)
  win.show()
})


ipc.on('targetPriceVal',function(event,arg){
    targetPriceVal = Number(arg)
    targetPrice.innerHTML = '$'+targetPriceVal.toLocaleString('en')
})
