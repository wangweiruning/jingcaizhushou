$(function(){

        //获取当前页面编号
		var nowpage = 0;

		//入场动画数组
		var inAnimateArr = [function(){},function(){},function(){},function(){}];
		//出场动画数组
		var outAnimateArr = [function(){},function(){},function(){},function(){}];

		//函数截流
		var lock = true;

		//在这里设计所有的进场、出场动画
		inAnimateArr[0] = function(){
			console.log("我是0号页面的进场动画");
			//velocity函数中，如果第二个参数（动画时间）是0，就表示瞬移过去
			//reverse这个写法是velocity新增的，就是方便你先瞬移到某个地方然后以动画形式进行反向运动。
			$(".logo").show().velocity({
				"rotateY" : "360deg",
				"rotateX":"720deg",
				"translateZ":"200px"
			},0).velocity("reverse",1000);

			$("h1 em").velocity({
				"opacity" : "1"
			},0);

			$("h1").show().velocity({//delay（）延迟执行
				"translateZ" : "500px"
			},0).delay(400).velocity("reverse",1000);

			$("h3").show().velocity({
				"translateZ" : "500px"
			},0).delay(600).velocity("reverse",1000,function(){
				lock = true;
			});
			$(".yuan_one").show().velocity(
				{"left":"1200px","translateZ" : "100px"},0).delay(600).velocity("reverse",1000);
		}
		outAnimateArr[0] = function(){
			// console.log("我是0号页面的出场动画");

			$(".logo").fadeOut();
			$("h1 em").each(function(i){
				$(this).delay(i * 60).velocity({
					"translateZ" : "500px"
				},400,function(){
					$(this).velocity({"translateZ" : "0px" ,"opacity":"0"},0);
				})
			});
			$("h3").fadeOut();

			$(".yuan_one").velocity({
					"translateZ" : "500px"
				},400,function(){
					$(this).velocity({"translateZ" : "0px" ,"opacity":"0"},0);
				})
		}








		inAnimateArr[1] = function(){
			// console.log("我是1号页面的进场动画")

			$(".clock").show().velocity({
				"rotateY" : "-180deg",
				"translateZ" : "400px",
				"scale" : "0.1"
			},0)
			.velocity({
				"rotateY" : "0deg",
				"translateZ" : "0px",
				"scale" : "1"
			},1000)
			.velocity({
				"translateZ" : "500px"
			},600,function(){
				//让一个元素为下次动画做好准备
				$(this).velocity({"translateZ" : "0"},0);
				$(this).hide();
				lock = true;
			});

			$(".banben").show().velocity({
				"scale" : "0.001",
				"translateZ" : "0"
			},0)
			.delay(1300).velocity({
				"scale" : "1",
				"opacity":"1",
				"translateZ" : "100px"
			},400);
		}


		outAnimateArr[1] = function(){
/*			console.log("我是1号页面的出场动画")*/
			$(".banben").velocity({
				"translateZ" : "500px"
			},500);
		}










		inAnimateArr[2] = function(){
			$(".cent").show();
			// console.log("我是2号页面的进场动画")
			$(".tupian1").show().velocity({
			    "rotateY" : "180deg",
				"rotateX":"360deg",
				"translateZ":"500px",
				// "opacity":"1"
			},0).velocity("reverse",1000);
			$(".tupian2").show().velocity({
			    "left" : "800px",
				"rotateX":"360deg",
				"translateZ":"200px",
				// "opacity":"1"
			},0).delay(300).velocity("reverse",1000);
			$(".tupian3").show().velocity({
			    "rotateY" : "180deg",
				"rotateX":"360deg",
				"translateZ":"500px",
				// "opacity":"1"
			},0).velocity("reverse",1000);
			$(".tupian4").show().velocity({
			    "top" : "-1200px",
			    "right":"-500px"
				// "opacity":"1"
			},0).delay(600).velocity("reverse",1000,function(){
				lock = true;
			});
			$(".more").show().velocity({//delay（）延迟执行
				"translateZ" : "500px"
			},0).delay(400).velocity("reverse",1000);
			$(".more em").velocity({
				"opacity" : "1"
			},0);
		}
		outAnimateArr[2] = function(){
			// console.log("我是2号页面的出场动画");
			$(".tupian1").fadeOut();
			$(".tupian2").fadeOut();
			$(".tupian3").fadeOut();
		    $(".tupian4").fadeOut();
		    $(".more em").each(function(i){
				$(this).delay(i * 50).velocity({
					"translateZ" : "500px"
				},400,function(){
					$(this).velocity({"translateZ" : "0px" ,"opacity":"0"},0);
				})
			});

		}







		inAnimateArr[3] = function(){
			console.log("我是3号页面的进场动画")
			lock = true;
		}
		outAnimateArr[3] = function(){
			console.log("我是3号页面的出场动画");
			lock = true;
		}













		//页面一开始就应该执行0号页面的入场动画
		inAnimateArr[0]();

		//鼠标滚轮事件监听
		$(document).mousewheel(function(event,delta){
			if(!lock) return;
			//阻止默认事件
			event.preventDefault();
			//备份一下老信号量
			var oldpage = nowpage;
			//得到鼠标滚动方向，信号量改变
			nowpage -= delta;
			if(nowpage > 3){
				nowpage = 0;
			}else if(nowpage < 0){
				nowpage = 0;
			}
			//看看信号量有没有改变
			if(oldpage != nowpage){
				//在动画数组中，调用响应的函数执行
				//下面的两条语句非常关键，从动画数组中，挑一个运行：
				outAnimateArr[oldpage]();
				inAnimateArr[nowpage]();

				//小圆点改变
				$(".circles ol li").eq(nowpage).addClass("cur").siblings().removeClass("cur");

				//信号量改变，函数节流
				lock = false;
			}
		})
})