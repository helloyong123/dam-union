let api = '/api';
export default async(url = '', data = {}, type = 'GET', method = 'fetch') => {
  type = type.toUpperCase();
  if(!url.startsWith('http')){
    url = api + url;
  }
  let dataStr = ''; //数据拼接字符串
  Object.keys(data).forEach(key => {
    dataStr += key + '=' + data[key] + '&';
  })
  if (type == 'GET') {
    if (dataStr !== '') {
      dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
      //请求里加上随机数,避免数据从缓存里面取
      url = url + '?' + dataStr + '&t=' + Date.now();
    }else{
      url = url + '?t=' + Date.now();
    }
  }

  if (window.fetch && method == 'fetch') {
    let requestConfig = {
      credentials: 'include',
      method: type,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      mode: "cors",
      cache: "force-cache"
    }

    if (type == 'POST') {
      //请求里加上随机数,避免数据从缓存里面取
      url = url + '?t=' + Date.now()
      Object.defineProperty(requestConfig, 'body', {
        //value: JSON.stringify(data)
        value: dataStr
      })
    }

    try {
      const response = await fetch(url, requestConfig);
      const responseJson = await response.json();
      return responseJson
    } catch (error) {
      throw new Error(error)
    }
  } else {
    return new Promise((resolve, reject) => {
      let requestObj;
      if (window.XMLHttpRequest) {
        requestObj = new XMLHttpRequest();
      } else {
        requestObj = new ActiveXObject;
      }

      let sendData = '';
      if (type == 'POST') {
        sendData = JSON.stringify(data);
      }

      requestObj.open(type, url, true);
      requestObj.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      requestObj.send(sendData);

      requestObj.onreadystatechange = () => {
        if (requestObj.readyState == 4) {
          if (requestObj.status == 200) {
            let obj = requestObj.response
            if (typeof obj !== 'object') {
              obj = JSON.parse(obj);
            }
            resolve(obj)
          } else {
            reject(requestObj)
          }
        }
      }
    })
  }
}
