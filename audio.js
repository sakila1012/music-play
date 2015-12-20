(function(win){
	var tzAudio = {
		audioDom:null,//音乐对象
		songs:[],//音乐容器
		index:0,//播放音乐的起始位置
		init:function(){
			this.audioDom = document.createElement("audio");//创建一个音乐播放器
		},
		//添加音乐
		add:function(src){
			//this.audioDom.src = src;
			//将音乐放入到音乐容器中
			this.songs.push(src);
			//alert(this.songs.push(src))
			//初始化第一首
			this.audioDom.src = this.songs[this.index];
		},
		//播放音乐
		playMusic:function(index){
			this.audioDom.src = this.songs[this.index];
			this.audioDom.play();
		},
		play:function(){
			this.audioDom.play();
		},
		//暂停音乐
		stop:function(){
			this.audioDom.pause();
		},
		//时间控制
		time:function(callback){
			var $this = this;
			$this.audioDom.oncanplaythrough = function(){
				//获取音乐总时长
				var totalTime = this.duration;
				//格式化时间
				var timer = $this.formateTime(totalTime);
				//alert(time);
				//定义返回
				if(callback){
					var json = {
						duration:totalTime,
						time:timer
					};
					callback.call(json);
				}
			};
		},
		//格式化时间
		formateTime:function(time){
			var m = parseInt(time/60);
			var s = parseInt(time%60);
			var time = (m<10?("0"+m):m)+":"+(s<10?("0"+s):s);
			return time;
		},
		//静音
		shound:function(){
			
		},
		//进度条
		percent:function(callback){
			var $this = this;
			this.audioDom.ontimeupdate=function(){
				//计算音乐播放进度
				var per = (this.currentTime/this.duration)*100;
				//剩余播放时长
				var stime = this.duration - this.currentTime;
				var ctime = this.currentTime;
				//格式化时间
				var stimer = $this.formateTime(stime);
				var ctimer = $this.formateTime(ctime);
				//定义返回
				var json = {
					per:per,
					time:stimer,
					curtime:ctimer
				};
				if(callback)callback.call(json);
			}
			
		},
		//上一首
		prev:function(){
			this.index--;
			this.playMusic();
		},
		//下一首
		next:function(){
			this.index++;
			this.playMusic();
			
		}
	};
	//绑定到window对象
	win.audio = tzAudio;
})(window);