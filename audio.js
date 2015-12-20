(function(win){
	var tzAudio = {
		audioDom:null,//���ֶ���
		songs:[],//��������
		index:0,//�������ֵ���ʼλ��
		init:function(){
			this.audioDom = document.createElement("audio");//����һ�����ֲ�����
		},
		//�������
		add:function(src){
			//this.audioDom.src = src;
			//�����ַ��뵽����������
			this.songs.push(src);
			//alert(this.songs.push(src))
			//��ʼ����һ��
			this.audioDom.src = this.songs[this.index];
		},
		//��������
		playMusic:function(index){
			this.audioDom.src = this.songs[this.index];
			this.audioDom.play();
		},
		play:function(){
			this.audioDom.play();
		},
		//��ͣ����
		stop:function(){
			this.audioDom.pause();
		},
		//ʱ�����
		time:function(callback){
			var $this = this;
			$this.audioDom.oncanplaythrough = function(){
				//��ȡ������ʱ��
				var totalTime = this.duration;
				//��ʽ��ʱ��
				var timer = $this.formateTime(totalTime);
				//alert(time);
				//���巵��
				if(callback){
					var json = {
						duration:totalTime,
						time:timer
					};
					callback.call(json);
				}
			};
		},
		//��ʽ��ʱ��
		formateTime:function(time){
			var m = parseInt(time/60);
			var s = parseInt(time%60);
			var time = (m<10?("0"+m):m)+":"+(s<10?("0"+s):s);
			return time;
		},
		//����
		shound:function(){
			
		},
		//������
		percent:function(callback){
			var $this = this;
			this.audioDom.ontimeupdate=function(){
				//�������ֲ��Ž���
				var per = (this.currentTime/this.duration)*100;
				//ʣ�ಥ��ʱ��
				var stime = this.duration - this.currentTime;
				var ctime = this.currentTime;
				//��ʽ��ʱ��
				var stimer = $this.formateTime(stime);
				var ctimer = $this.formateTime(ctime);
				//���巵��
				var json = {
					per:per,
					time:stimer,
					curtime:ctimer
				};
				if(callback)callback.call(json);
			}
			
		},
		//��һ��
		prev:function(){
			this.index--;
			this.playMusic();
		},
		//��һ��
		next:function(){
			this.index++;
			this.playMusic();
			
		}
	};
	//�󶨵�window����
	win.audio = tzAudio;
})(window);