import axios from 'axios';

const Util = {
  // imgPath: 'http://127.0.0.1:8011/img/',
  // apiPath: 'http://127.0.0.1:8010/'
  imgPath: 'http://47.107.255.197:8011/img/',
  apiPath: 'http://47.107.255.197:8010/'
};

// 获取今天时间戳
Util.getTodayTime = ()=> {
  const date = new Date();
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);
  return date.getTime();
};

// 获取上一天日期
Util.prevDay =  (timestamp = (new Date()).getTime())=> {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = date.getMonth() + 1 < 10 ?
    '0' + (date.getMonth() + 1) :
    date.getMonth() + 1;
  const day = date.getDate() < 10 ?
    '0' + date.getDate() :
    date.getDate();
  return year + '' + month + '' + day;
};

Util.ajax = axios.create({
  baseURL: Util.apiPath
});

Util.ajax.interceptors.response.use(res => {
  return res.data;
});

export default Util;
