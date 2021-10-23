document.addEventListener("DOMContentLoaded", function() {


	let counter = 0 //compteur de balles aspirées

	let canvas = document.querySelector("canvas")
	canvas.height = window.innerHeight
	canvas.width = window.innerWidth
	let h = canvas.height
	let w = canvas.width
	let c = canvas.getContext("2d")

	//balles
	let balls = []
	for (let i=0; i<1000; i++){
		let ball = {
			x : Math.random() * w*0.8,
			y : Math.random() *	 h*0.8,
			r: 5,
			sx: Math.random()*1,
			sy: Math.random()*1,
			color: "whitesmoke" //getRandomColor()
		}
		balls.push(ball)

	}

	//aspirateur
	let mouseCollider = {
		x : 0,
		y : 0,
		r: 30,
		color: "lightyellow"
	}
	
	//-----------------------------------------------------------------MOUSE POS
	let mouse = { x: 0, y: 0}
	document.addEventListener("mousemove",function(){
		mouse.x = event.pageX
		mouse.y = event.pageY
	})
	//-----------------------------------------------------------UPDATE
	setInterval(function(){
		
		c.clearRect(0,0,w,h)

		if(counter == balls.length)
			console.log("GG")

		//mouseCollider Affichage
		c.beginPath()
		c.arc(mouseCollider.x,mouseCollider.y,mouseCollider.r,0,Math.PI*2)
		c.fillStyle = mouseCollider.color
		c.fill()

		//position cercle jaune	
		mouseCollider.x = mouse.x -5
		mouseCollider.y = mouse.y -5

		for(let ball of balls){
			c.beginPath()
			c.arc(ball.x,ball.y,ball.r,0,Math.PI*2)
			c.fillStyle = ball.color
			c.fill()
			
			//calcul distance 
			let distance = Math.sqrt((ball.x- mouseCollider.x)*(ball.x- mouseCollider.x) + (ball.y- mouseCollider.y)*(ball.y- mouseCollider.y));
			
			//collisions murs
			if(ball.x-ball.r <= 10 || ball.x+ball.r >= w){
				ball.x -= ball.sx
				ball.sx = -ball.sx
			}			
			if(ball.y-ball.r <= 10 || ball.y+ball.r >= h){
				ball.y -= ball.sy
				ball.sy = -ball.sy
			}
			
			//collisions balles
			if(circleInstersect(ball.x,ball.y,ball.r,mouseCollider.x,mouseCollider.y,mouseCollider.r)){
				ball.color = "orangered"
				

				ball.sx = -(ball.x - mouse.x)/50				
				ball.sy = -(ball.y - mouse.y)/50

				ball.x += ball.sx
				ball.y += ball.sy

				if(distance <= ball.r + mouseCollider.r){
					ball.x = -100
					ball.y = -100
					counter++
				}
			}
			else{
				ball.x += ball.sx
				ball.y +=ball.sy
			}

			

		}

		

		

	},10)

	function getRandomColor() {
		var letters = '0123456789ABCDEF';
		var color = '#';
		for (var i = 0; i < 6; i++) {
			color += letters[Math.floor(Math.random() * 16)];
		}
		return color;
	}

	function circleInstersect(x1,y1,r1,x2,y2,r2){
		let distance = Math.sqrt((x1- x2)*(x1- x2) + (y1- y2)*(y1- y2));
		if(distance <= r1+r2+100)
			return true
		else
			return false
	}


})

