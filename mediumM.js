var eq1 = new Array();
eq1[0] = "x^2 - 2x + 1 = 0";
eq1[1] = "2x^2 - 8x + 8 = 0";
eq1[2] = "x^2 - 6x + 11 = 2";
eq1[3] = "x^2 - 49 = 0";
eq1[4] = "x^2 - 25 = 0";
eq1[5] = "x^2 + 4 = 4x";
eq1[6] = "x^2 - 8x + 24 = 8";
eq1[7] = "7x^2 - 14x + 7 = 0";
eq1[8] = "5x^2 + 20x + 20 = 0";
eq1[9] = "x^2 - 16x + 52 = -12";
eq1[10] = "5x^2 - 125 = 0";
eq1[11] = "3x^2 - 102 = 6";

var ans1 = new Array();
ans1[0] = 1;
ans1[1] = 2;
ans1[2] = 3;
ans1[3] = 7;
ans1[4] = 5;
ans1[5] = 2;
ans1[6] = 4;
ans1[7] = 1;
ans1[8] = 2;
ans1[9] = 8;
ans1[10] = 5;
ans1[11] = 6;

var temp1 = true;
var temp2 = true;
var temp3 = true;

var store = new Array();

//vars are used to set an interval in which the animations move
var plc1 = null;
var plc2 = null;
var plc3 = null;

var lives = 3;

var b1 = false;
var b2 = false;
var b3 = false;

//variables used to store integers that will determine how many times a life will be decreased based on the value of the integer
let ixr1 = 1;
let ixr2 = 1;
let ixr3 = 1;

function check() 
{
  document.getElementById("livesC").innerHTML = lives;
  if (lives == 0) change("over.html");
}

setInterval(check, 1);

function change(nextPage) {
  if (nextPage == "over.html" || nextPage == "win.html") 
  {
    if (window.localStorage.getItem("next-page") === null)
      window.localStorage.setItem("next-page", window.location.href);
  }
  location.replace(nextPage);
}

function output(ranIn, num) 
{
  let ques1 = eq1[ranIn];
  let radioButton = [];
  radioButton[0] = ans1[ranIn];
  if (radioButton[0] >= 5)
    radioButton[1] = Math.floor(Math.random() * radioButton[0]);
  else
    radioButton[1] = Math.floor(Math.random() * (9 - radioButton[0])) + (radioButton[0] + 1);

  if(radioButton[0] + 1 <= 9 && radioButton[0] + 1 != radioButton[1])
    radioButton[2] = radioButton[0] + 1;
  else 
    radioButton[2] = radioButton[0] - 1;

  let rand1 = Math.floor(Math.random() * 3);
  let rand2 = 0;
  
  if (rand1 < 2) 
    rand2 = rand1 + 1;
  else 
    rand2 = rand1 - 1;
  let rand3 = 3 - rand1 - rand2;

  document.getElementById("medQues" + num).innerHTML = ques1;
  document.getElementById("medAns1" + num).innerHTML = radioButton[rand1];
  document.getElementById("medAns2" + num).innerHTML = radioButton[rand2];
  document.getElementById("medAns3" + num).innerHTML = radioButton[rand3];
  
  let rands = [rand1, rand2, rand3];

  setInterval(function () {
      checkButton(radioButton, num);
  }, 15)
}

function checkButton(radioButton, num) 
{
    let correct = 0;
    for(let i = 1; i < 4; i++)
    {
      if(document.getElementById("medAns" + i + num).innerHTML == radioButton[0])
        correct = i;
    }
        
    let bool = false;
    if (document.getElementById("ans" + correct + num).checked)
    {
      bool = true;
      addScore();
      if (store.length != 12) 
      {
        document.getElementById("myAnimation" + num).style.borderWidth = "thick";
        document.getElementById("myAnimation" + num).style.borderColor = "green";
        setTimeout(function light() {
          motion("myAnimation" + num, num, "checks" + num);
          document.getElementById("myAnimation" + num).style.borderWidth = "1px";
          document.getElementById("myAnimation" + num).style.borderColor = "black";
        }, 500);
      }
      if (store.length == 12) 
      {
        document.getElementById("myAnimation" + num).style.visibility = "hidden";
        document.getElementById("checks" + num).style.visibility = "hidden";
        if (num == 1) 
          b1 = true;
        if (num == 2) 
          b2 = true;
        if (num == 3) 
          b3 = true;
      }

      if(store.length==12 && b1==true && b2==true && b3==true)
        change("win.html");
      else if(store.length==12 && b1==true && b2!=true && b3!=true && document.getElementById("myAnimation2").style.visibility == "hidden" && document.getElementById("myAnimation3").style.visibility == "hidden")
        change("over.html");
      else if(store.length==12 && b2==true && b1!=true && b3!=true && document.getElementById("myAnimation1").style.visibility == "hidden" && document.getElementById("myAnimation3").style.visibility == "hidden")
        change("over.html");
      else if(store.length==12 && b3==true && b1!=true && b2!=true && document.getElementById("myAnimation2").style.visibility == "hidden" && document.getElementById("myAnimation1").style.visibility == "hidden")
        change("over.html");
      else if(store.length==12 && b1==true && b2==true && b3!=true && document.getElementById("myAnimation3").style.visibility == "hidden")
        change("over.html");
      else if(store.length==12 && b3==true && b1==true && b2!=true && document.getElementById("myAnimation2").style.visibility == "hidden" && document.getElementById("myAnimation3").style.visibility == "hidden")
        change("over.html");
      else if(store.length==12 && b2==true && b3==true && b1!=true && document.getElementById("myAnimation1").style.visibility == "hidden" && document.getElementById("myAnimation1").style.visibility == "hidden")
        change("over.html");

      //https://stackoverflow.com/questions/15784554/how-to-uncheck-radio-button-javascript
      let elements = document.getElementsByTagName("input");
      for (let i = 0; i < elements.length; i++) 
      {
        if (elements[i].type == "radio") 
          elements[i].checked = false;
      }
      return;
    }
    else if(correct == 1 && (document.getElementById("ans" + 2 + num).checked || document.getElementById("ans" + 3 + num).checked) && bool==false) 
    {        
        if(ixr1==1) 
        {
          if(num==1)
            temp1= false;
          if(num==2)
            temp2= false;
          if(num==3)
            temp3= false;
          lives--;
        }
        ixr1++;
        hide(num);
    }
    else if(correct == 2 && (document.getElementById("ans" + 1 + num).checked || document.getElementById("ans" + 3 + num).checked)  && bool==false) 
    {        
        if(ixr2==1) 
        {
          if(num==1)
            temp1= false;
          if(num==2)
            temp2= false;
          if(num==3)
            temp3= false;
          lives--;
        }
        ixr2++;
        hide(num);     
         
    }
    else if(correct == 3 && (document.getElementById("ans" + 2 + num).checked || document.getElementById("ans" + 1 + num).checked) && bool==false) 
    {
      if(ixr3==1) 
      {
          if(num==1)
            temp1= false;
          if(num==2)
            temp2= false;
          if(num==3)
            temp3= false;
          lives--;
      }
      ixr3++;
      hide(num);
      
    }
    if(lives < 0) 
      lives = 0;
}

function hide(num) 
{
  document.getElementById("myAnimation" + num).style.borderWidth = "thick";
  document.getElementById("myAnimation" + num).style.borderColor = "red";
  setTimeout(function disap() {
    document.getElementById("myAnimation" + num).style.visibility = "hidden";
    document.getElementById("checks" + num).style.visibility = "hidden";
  }, 500);
}

function addScore() 
{
  if (window.localStorage.getItem("score") === null)
    window.localStorage.setItem("score", 0);
  if (window.localStorage.getItem("high-score") === null)
    window.localStorage.setItem("high-score", 0);

  let score = window.localStorage.getItem("score");
  score++;
  window.localStorage.setItem("score", score);

  if(parseInt(window.localStorage.getItem("high-score")) <= parseInt(window.localStorage.getItem("score")))
    window.localStorage.setItem("high-score", window.localStorage.getItem("score"));
}

function displayScore()
{
  document.getElementById("score").innerHTML = window.localStorage.getItem("score");
  if(window.localStorage.getItem("high-score") === null)
    window.localStorage.setItem("high-score", 0);
  document.getElementById("high-score").innerHTML = window.localStorage.getItem("high-score");
}

function newPage() 
{
  change(window.localStorage.getItem("next-page"));
}

function reset()
{
  if((window.location.href).includes('index.html') || !(window.location.href).includes('html'))
		window.localStorage.clear();
}

function moveBlock()
{
  window.localStorage.setItem("score", 0);
  document.getElementById("start").disabled = true;
  setTimeout(function start() {
    motion("myAnimation1", 1, "checks1");
  }, 200);
  setTimeout(function start() {
    motion("myAnimation2", 2, "checks2");
  }, 300);
  setTimeout(function start() {
    motion("myAnimation3", 3, "checks3");
  }, 400);
}

function motion(str, num, checksStr) 
{
  let inx = Math.floor(Math.random() * 12);
  while (store.includes(inx)) 
    inx = Math.floor(Math.random() * 12);
  store.push(inx);

  output(inx, num);
  let coor = 190;

  let elem = document.getElementById(str);
  elem.style.visibility = "visible";
  let obj = document.getElementById(checksStr);
  obj.style.visibility = "visible";

  let randPos;
  if (num == 1) 
  {
    clearInterval(plc1);
    plc1 = setInterval(border, 30);
    randPos = Math.random() * 16 + 3;
    obj.style.left = randPos + "%";
  }
  if (num == 2) 
  {
    clearInterval(plc2);
    plc2 = setInterval(border, 30);
    randPos = Math.random() * 16 + 38;
    obj.style.left = randPos + "%";
  }
  if (num == 3) 
  {
    clearInterval(plc3);
    plc3 = setInterval(border, 30);
    randPos = Math.random() * 16 + 70;
    obj.style.left = randPos + "%";
  }

  let pos = randPos + "%";
  elem.style.left = pos;

  obj.style.position = "absolute";
  obj.style.top = "200px";
  let liv = true;
  function border()
  {
    if (coor == 550) 
    {
      elem.style.visibility = "hidden";
      obj.style.visibility = "hidden";

      if (num == 1) 
        clearInterval(plc1);
      if (num == 2) 
        clearInterval(plc2);
      if (num == 3) 
        clearInterval(plc3);

      if (liv == true) 
      {
        if (num == 1 && temp1 == true)
        {
          lives--;
          temp1 = false;
        }
        if (num == 2 && temp2 == true) 
        {
          lives--;
          temp2 = false;
        }
                 
        if (num == 3 && temp3 == true) 
        {
          lives--;
          temp2 = false;
        }
          
        if (lives == 0) 
          change("over.html");
        liv = false;
      }
    } 
    else 
    {
      coor++;
      elem.style.top = coor + "px";
    }
  }
}
reset();
