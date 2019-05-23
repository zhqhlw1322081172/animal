
let singletonDialog = (function(){
	class DialogWin{
		constructor(obj){
			
			let defaultObj = {
				"boxDom":null,
				"titleDom":null,
				"contentDom":null,
				"closeBtnDom":null,
				"width":"400",
				"height":"300",
				"left":0,
				"top":0,
				"borderWidth":1,
				"borderStyle":"solid",
				"borderColor":"black",
				"titleHeight":30,
				"titleColor":"gray"
			};
			for(let key in defaultObj){
				if(obj[key]==undefined){
					this[key] = defaultObj[key];
				}else{
					this[key] = obj[key];
				}
			}

			if(obj.left==undefined){
				let clientWidth = document.documentElement.clientWidth || document.body.clientWidth;
				this.left = (clientWidth-this.width)/2;
			}

			if(obj.top==undefined){
				let clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
				this.top = (clientHeight-this.height)/2;
			}

			this.createUI();
			this.addEvent();
		}

		createUI(){
			//容器
			this.boxDom = document.createElement("div");
			this.boxDom.style.cssText = `
				position:absolute;
				left:${this.left}px;
				top:${this.top}px;
				width:${this.width}px;
				height:${this.height}px;
				border:${this.borderWidth}px ${this.borderStyle} ${this.borderColor};
			`;
			document.body.appendChild(this.boxDom);
			//创建标题
			this.titleDom = document.createElement("div");
			this.titleDom.style.cssText=`
				box-sizing:border-box;
				width:100%;
				height:${this.titleHeight}px;
				background-color:${this.titleColor};
				border-bottom:${this.borderWidth}px ${this.borderStyle} ${this.borderColor};
			`;
			this.boxDom.appendChild(this.titleDom);
			//创建关闭按钮
			this.closeBtnDom = document.createElement("input");
			this.closeBtnDom.type="button";
			this.closeBtnDom.value="关闭";
			this.closeBtnDom.style.cssText=`float:right`;
			this.titleDom.appendChild(this.closeBtnDom);

			//创建内容的代码
			this.contentDom = document.createElement("div");
			this.contentDom.style.cssText=`
				width:100%;
				height:${this.height-this.titleHeight}px;
				`;
			this.boxDom.appendChild(this.contentDom);
		}

		addEvent(){
			this.titleDom.onmousedown = (event)=>{
				var evt = event || window.event;

				var offsetX = evt.offsetX;
				var offsetY = evt.offsetY;		

				document.body.onmousemove = (event)=>{
					var evt = event || window.event;
					this.boxDom.style.left = (evt.pageX-offsetX)+"px";
					this.boxDom.style.top = (evt.pageY-offsetY)+"px";
				}
			}

			document.body.onmouseup = function(){
				document.body.onmousemove = null;
			}

			this.closeBtnDom.onclick = ()=>{
				this.closeAnimate();
			}

			window.onresize = ()=>{
				this.changePos();

				this.boxDom.style.left = this.left+"px";
				this.boxDom.style.top = this.top+"px";
			
			}
		}

		changePos(){
			let clientWidth = document.documentElement.clientWidth || document.body.clientWidth;
			this.left = (clientWidth-this.width)/2;
			let clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
			this.top = (clientHeight-this.height)/2;
		}

		closeAnimate(){
			fadeOut(this.boxDom,1000,()=>{			
				this.boxDom.style.display = "none";
			}); 
		}
	}	

	let instance;//单例对象

	return {
		getInstance:function(obj){
			if(instance==undefined){
				instance = new DialogWin(obj);
			}else{
				instance.boxDom.style.display = "block";
				instance.boxDom.style.opacity = 1;
				instance.changePos();
				instance.boxDom.style.left = instance.left+"px";
				instance.boxDom.style.top = instance.top+"px";
			}
			return instance;
		}
	}
})();

