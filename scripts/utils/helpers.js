exports.fromUNIX = timestamp => {
  var date = new Date(timestamp * 1000)
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  var year = date.getFullYear()
  var month = months[date.getMonth()]
  var day = date.getDate()
  var hour = date.getHours()
  var min = date.getMinutes()
  var sec = date.getSeconds()
  var time = day + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec

  return time
}