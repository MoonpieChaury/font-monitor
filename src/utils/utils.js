//存放公共函数方法

//时间戳转时间日期格式
const timestampToTime = function(timestamp) {
  let date = new Date(timestamp);
  let Y = date.getFullYear() + "年";
  let M = (date.getMonth() + 1) + "月";
  let D = date.getDate() + "日 ";
  let h = (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";
  let m = (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) + ":";
  let s = (date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds());
  return Y + M + D + h + m + s;
};

//小数转百分比
const decimalToPercentage = function(decimal) {
  return (decimal * 100).toFixed(2) + "%";
};

const getDetailInfo = function(data) {
  let equi = data.brand + " / " + data.model;
  let date = timestampToTime(data.stm);
  let system = data.fr_rom ? data.fr_rom : "unknown";
  let client = data.ver ? data.ver : "unknown";
  let network = data.net ? data.net : "未知网络类型";
  let operator = data.isp ? data.isp : "未知运营商";
  let country = data.country ? data.country : "unknown";
  let province = data.province ? data.province : "unknown";
  let city = data.city ? data.city : "unknown";
  let locale = country + " > " + province + " > " + city;
  let obj = {
    "equi": ["设备", equi],
    "system": ["操作系统", system],
    "date": ["上报时间", date],
    "dpi": ["分辨率", data.dsp],
    "client": ["客户端", client],
    "network": ["网络类型", network],
    "operator": ["运营商", operator],
    "locale": ["地域", locale],
    "ip": ["用户IP", data.sip],
    "uid": ["用户ID", data.uid],
    "UA": ["UA", data.ua]
  };
  return obj;
};

export {
  timestampToTime,
  decimalToPercentage,
  getDetailInfo
};
