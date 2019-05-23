
/*
	父子  父选择器>子选择器
	群组
	孩子
*/

// Select.getElements("#box>a");//获取id为box的a标签

class Select{
	static getElements(str){
		if(str.charAt(0)=="#"){
			let index = str.indexOf(">");
			if(index>1 && index<str.length-1){//用空格
				let boxDom = document.getElementById(str.substring(1,index));
				let arr = [];
				for(let i=0;i<boxDom.children.length;i++){
					if(boxDom.children[i].tagName.toLowerCase()==str.substring(index+1)){
						arr.push(boxDom.children[i]);
					}
				}
				return arr;
			}else{//无空格
				return document.getElementById(str.substring(1));
			}
		}else if(str.charAt(0)=="."){
			return document.getElementsByClassName(str.substring(1));
		}else{
			return document.getElementsByTagName(str);
		}
	}

}