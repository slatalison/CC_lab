var weather;
var api='https://api.openweathermap.org/data/2.5/forecast/daily?q=';
var input;
var apiKey='&appid=ad6e239ec0ac58d0a9836e942aac97eb';
var units='&cnt=16&units=metric';
var canvas;
var minY=[];
var maxY=[];
var evenY=[];
var drop=[];

function setup() {
  canvas=createCanvas(window.innerWidth - 90, 640);
  canvas.position(20,50);
  var button = select('#submit');
  button.mousePressed(weatherAsk);
  input = select('#city');
}

function weatherAsk() {
 
  var url = api + input.value() + apiKey + units;
  loadJSON(url, gotData);
  console.log(url);
}

function gotData(data) {
  
  weather = data;
  for(var i=0;i<weather.list.length;i++){
  var mintemp=weather.list[i].temp.min;
  var maxtemp=weather.list[i].temp.max;
  var eventemp=weather.list[i].temp.eve;
  minY[i]=map(mintemp,-5,40,height*0.8,0);
  maxY[i]=map(maxtemp,-5,40,height*0.8,0);
  evenY[i]=map(eventemp,-5,40,height*0.8,0);
  }
  
  for (var j = 0; j < 100; j++) {
    drop[j] = new Drop();
  }
}

function draw() {
  clear();

  if (weather) {
		var todaytemp = weather.list[0].temp.eve;
    var todayhumidity = weather.list[0].humidity;
    var tomorrowhumidity = weather.list[1].humidity;
    noStroke();
    fill(92,179,204,todayhumidity);
    ellipse(150, 130,todayhumidity * 10, todayhumidity * 10);
    fill(251,103,104,tomorrowhumidity);
    ellipse(150, 130,tomorrowhumidity * 10,tomorrowhumidity * 10);
    stroke(255);
    line(50,evenY[0]+190,width,evenY[0]+190);
    fill(255);
    noStroke();
    textSize(42);
    text(weather.city.name,50, 80);
    textSize(14);
    text("TODAY  "+floor(todaytemp)+"\u2103",52, 240);
    fill(255,80);
    text("Forecast: 16 Days/Daily ",52, 260);
    // text("humidity",0, 180);
    // text("today vs tomorrow",0, 200);
    
    
    for(var i=0;i<weather.list.length;i++){
    let position = 190;
    fill(255,150);
      noStroke();
    textSize(12);
    text(floor(weather.list[i].temp.eve), width*i/16 + 50,evenY[i]+215);   
    stroke(244, 62, 6,30);
      fill(239, 11, 72);
      ellipse(width*i/16+50,evenY[i]+position,5,5);       
    fill(239, 11, 72,5);
    beginShape();
      let margin = 50;
      vertex(50,evenY[0]+position);
      curveVertex(50,evenY[0]+position);
      curveVertex(width*1/16+margin,evenY[1]+position);
      curveVertex(width*2/16+margin,evenY[2]+position);
      curveVertex(width*3/16+margin,evenY[3]+position);
      curveVertex(width*4/16+margin,evenY[4]+position);
      curveVertex(width*5/16+margin,evenY[5]+position);
      curveVertex(width*6/16+margin,evenY[6]+position);
      curveVertex(width*7/16+margin,evenY[7]+position);
      curveVertex(width*8/16+margin,evenY[8]+position);
      curveVertex(width*9/16+margin,evenY[9]+position);
      curveVertex(width*10/16+margin,evenY[10]+position);
      curveVertex(width*11/16+margin,evenY[11]+position);
      curveVertex(width*12/16+margin,evenY[12]+position);
      curveVertex(width*13/16+margin,evenY[13]+position);
      curveVertex(width*14/16+margin,evenY[14]+position);
      curveVertex(width*15/16+margin,evenY[15]+position);
      curveVertex(width,evenY[0]+position);
      vertex(width,evenY[0]+position);
      endShape();
      
     // var checkrain=weather.list[0].weather.main;
     //  var Rain="Rain";
			// console.log(weather.list[i].weather[0].main);
       if (weather.list[i].weather[0].main=="Rain"){
        for (var j = drop.length - 1; j >= 0; j--) {
         drop[j].show();
         drop[j].fall();         
        }//end for loop j
         fill(255,30);
         noStroke();
         textSize(14);
         text("It will rain in the next 16 days.", 52,120); 
         //text("There will be rain in the next"+i+"16 days.", 0,100); 
     }//end if checkrain
    }  
}
}

function Drop() {
  this.x = random(0, width);
  this.x1 = random(0, width);
  this.x2 = random(0, width);
  this.y = random(-1000, 0);
  this.y1 = random(-1000, 0);
  this.y2 = random(-1000, 0);
  this.show = function() {
    stroke(255,15);
    line(this.x, this.y, this.x, this.y + random(15,22));
    line(this.x1, this.y1, this.x1, this.y1 + random(12,18));
    line(this.x2, this.y2, this.x2, this.y2 + random(12,18));
     if(this.y>height){
      this.y=0;
    }
  }; 
  this.fall = function() {
    this.y = this.y + 1;
  };
}
