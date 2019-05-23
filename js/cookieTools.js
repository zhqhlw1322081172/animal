
//添加cookie
//参数：
//键：
//值
//保质期（单位：天）
//path
//domain

function addCookie(key,value,dayCount,path,domain) {
	var d = new Date();
	d.setDate(d.getDate()+dayCount);

	var str = key+"="+escape(value)+";expires="+d.toGMTString();	

	if(path!=undefined){
		str += "path="+path;
	}

	if(domain!=undefined){
		str += "domain="+domain;
	}

	document.cookie = str;
	
}

//获取cookie
//参数：
//键
//返回值：键对应的值

function getCookie(key){

	//1、获取cookie
	var str = unescape(document.cookie);//username=jzm; userpass=123; 

	//2、分割成数组
	var arr = str.split("; ");

	//3、循环数组进行比较（查找）
	for(var i in arr){
		if(arr[i].indexOf(key+"=")==0){
			return arr[i].substring(key.length+1);
		}
	}

	return null;
}

//删除cookie
//参数：
//键

function removeCookie(key){
	addCookie(key,"",-1);
}