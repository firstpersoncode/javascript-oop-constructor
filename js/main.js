window.addEventListener("load", function(){

	function Player(el,name){
		var pokeEl = document.getElementById('poke-ball');
		var me = this,
		el = document.getElementById(el),
		totalDamage = Math.floor(Math.random() * (30 - 10 + 1)) + 10;

		this.name = name;

		this.hitpoints = 100;

		this.message = {

			show: function(say,hit){
				var bubbleHit = hit;



				var bubble = el.getAttribute("data-message"),
				bubbleTalk = document.getElementById(bubble);

				if(bubbleHit === "hit-target"){
					bubbleTalk.className = "message target-class";
				}


				bubbleTalk.style.opacity = "1";
				bubbleTalk.style.bottom = "50%";

				bubbleTalk.innerHTML = say;

				setTimeout(function(){
					bubbleTalk.style.opacity = "0";
					bubbleTalk.style.bottom = "45%";
					bubbleTalk.className = "message";
				},1000);
			}
		};

		this.bar = function bar() {
			var barHp = el.getAttribute("data-bar"),
			displayBar = document.getElementById(barHp).children[0];
			setTimeout(function(){
				el.style.animationPlayState = "running";
				el.style.opacity = "0.5";
				if (me.hitpoints <= 10){
					displayBar.style.width = "0%";

				}else{
					displayBar.style.width = me.hitpoints+"%";
				}
			},800);
			setTimeout(function(){
				el.style.animationPlayState = "paused";
				el.style.opacity = "1";
				if (me.hitpoints <= 10){
					el.style.opacity = "0.2";
				}else{
					el.style.opacity = "1";
				}
			},1500);
		}

		this.stat = function stat(target) {
			el.addEventListener("mouseenter",showStat);

			function showStat() {
				me.message.show("HP: "+me.hitpoints+"<br> Attack "+target.name+" ?");
			}

		}

		this.pokeBall = function pokeBall(target) {

			if(target.hitpoints <= 50){
				pokeEl.style.opacity = "1";
			}else{
				pokeEl.style.opacity = "0";
			}

			pokeEl.addEventListener("click",function(){
				pokeEl.style.animationPlayState = "running";
				setTimeout(function(){
					pokeEl.className = "ready open-poke";
					setTimeout(function(){
						document.getElementById("after").style.display = "block";
						el.className = "player ball";
						setTimeout(function(){
							pokeEl.style.background = "url(./img/ball.png) center no-repeat";
							me.message.show("Fuck you");
							setTimeout(function(){
								me.message.show("Can you just..");
								setTimeout(function(){
									me.message.show("fucking leave me alone ?");
									setTimeout(function(){
										me.message.show("just let us be free");
										setTimeout(function(){
											me.message.show("the fuck is wrong with you ? suce ma bite !");
										},1000);
									},1000);
								},1000);
							},1000);
						},1000);
					});
				},1000);

			});
		}

		this.attack = function attack(target) {

			el.addEventListener("click",attacking);

			function attacking(){


				target.hitpoints -= totalDamage;
				console.log(me.name+" attack with "+totalDamage+"!");
				me.message.show(me.name+" attack");
				target.bar();
				if(el.getAttribute("data-bar") == "bar-one"){
					el.style.background = "url(./img/bulba.gif) center no-repeat";
					setTimeout(function(){
						el.style.background = "url(./img/bulba-copy.png) center no-repeat";
					},1500);
				}else{
					el.style.background = "url(./img/ivy.gif) center no-repeat";
					setTimeout(function(){

						el.style.background = "url(./img/ivy-copy.png) center no-repeat";
					},1500);
				}
				document.getElementById("after").style.display = "block";
				setTimeout(function(){
					if(target.hitpoints <= 10){
						console.log(target.name+" already dead");
						target.message.show(target.name+" already dead");
						document.getElementById("after").style.display = "block";
					}else{
						target.message.show(+totalDamage+"!","hit-target");
						console.log("hit "+target.name+" and has "+target.hitpoints+" hp left");
						document.getElementById("after").style.display = "none";
					}

					me.pokeBall(target);

				},2000);
			}
		}
	}


	var p1 = new Player("player-one","Bulba");
	var p2 = new Player("player-two","Ivy");


	p1.attack(p2);
	p2.attack(p1);

	p1.stat(p2);
	p2.stat(p1);

	document.getElementsByClassName("container")[0].style.width = "100%";
	document.getElementsByClassName("container")[0].style.height = "100%";





},false);



$(window).on('load',function(){
	$('.loading').fadeOut(1000);
});
