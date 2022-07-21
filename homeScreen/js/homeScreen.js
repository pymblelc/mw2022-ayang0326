//Variables --------------------------------
var apikey = '622e9137dced170e8c83a238';
var url = 'https://ayangdailydrink-3299.restdb.io/rest/login';
var url2 = 'https://ayangdailydrink-3299.restdb.io/rest/dailydrinkcount';
var arrDrinkData = [''];


var visible = '';
var dateVisible = false;
var tDate = new Date();
var drinkGoalAmount = '';
var arrdrinkGoal = [
  {amount: 3000, name: '3L'},
  {amount: 4000, name: '4L'},
  {amount: 5000, name: '5L'},
];

var Goal = 0;
var goalCalc = 0;
var use ='';
var date = 0;

var arrLogin = [''];
var checkBev = false;
var checkGoal = false;
var arrUser =[];


var arrresult =[];
var total = 0;
var sdateVisible = false;
var stDate = new Date();
var sDate = '';

// -------------------------------*HOME PAGE JS CODES*  -------------------------------
//functions - homepage
$('#loginScreen').show();
$('#loginScreen').hide();
$('#statScreen').hide();
//
$('#statScreen').show();
//
hideAndShow();
datePicker(dateVisible, tDate);
slider();
getDrink(url2,apikey);
getSignUp(url,apikey);

// Hide/Show functions --------------------------------
function hideAndShow(){
  $('#drinkDisplayCoffee').hide();
$('#drinkDisplayJuice').hide();
$('#drinkDisplayTea').hide();
$('#drinkDisplayWater').hide();
$('#todayDate').hide();
$('#submitDate').hide();
$('#stodayDate').hide();
$('#ssubmitDate').hide();

$('#drinkGoal1').hide();
$('#drinkGoal2').hide();
$('#drinkGoal3').hide();
$('#goalReached').hide();


}

//date picker --------------------------------

function datePicker(dateVisible, tDate){
  var month = tDate.getMonth()+1;
  var day = tDate.getDate();

  var output = tDate.getFullYear() + '-' +
    (month<10 ? '0' : '') + month + '-' +
    (day<10 ? '0' : '') + day;
  $('#day').text(output);
  date = output;


  $('#day').click(function(){
    if (dateVisible === false){
      $('#todayDate').show();
      $('#submitDate').show();
      $('#day').hide();
      dateVisible = true;
    }
    else {
      $('#todayDate').hide();
      $('#submitDate').hide();
      $('#day').show();
      dateVisible = false;
    }
  });
  $('#submitDate').click(function(){
    //database will use
    //tDate = $('#todayDate').val();
    output = $('#todayDate').val();
    $('#todayDate').hide();
    $('#submitDate').hide();
    $('#day').text(output);
    $('#day').show();
    date = output;
    console.log(date);  

  });

  
  
  
}

//drink amount function --------------------------------


function checkDrink(drinkAmount, drinkGoalAmount){
  if(checkGoal === true && checkBev === true){
    drinkData(drinkAmount);
    drinkMeterSet(drinkGoalAmount, drinkAmount);
    return;
  };
  if(checkBev === false && checkGoal === false){
    console.log('both');
    return;
  }
  if(checkBev === false){
    console.log('Bev');
    return;
  }
  if(checkGoal === false){
    console.log('goal');
    return;
  }
 


};


$('#hundredMl').click(function(){
    var drinkAmount = 100;
    //CONSOLE
    console.log(date);
    checkDrink(drinkAmount, drinkGoalAmount)
    //var meterAmount = 10;
});
$('#twoFiftyMl').click(function(){
    var drinkAmount = 250;
    checkDrink(drinkAmount, drinkGoalAmount);
});
$('#sixHundredMl').click(function(){
  var drinkAmount = 600;
  //CONSOLE
  checkDrink(drinkAmount, drinkGoalAmount);
});
$('#eightFiftyMl').click(function(){
  var drinkAmount = 850;
  //CONSOLE
  checkDrink(drinkAmount, drinkGoalAmount);
});
$('#litre').click(function(){
  var drinkAmount = 1000;
  //CONSOLE
  checkDrink(drinkAmount, drinkGoalAmount);
});



//drink data function--------------------------------
function drinkData(drinkAmount){
  //casewhere used to check which div is visible
    switch (visible){
      case 'c': 
        var tempDrink = {Date: date, Name: 'coffee', Cups: 1, Amount: drinkAmount, User: use, Goal: Goal};
        addDrink(tempDrink, url2, apikey);
      break;
      case 'w': 
        var tempDrink = {Date: date, Name: 'water', Cups: 1, Amount: drinkAmount, User: use, Goal: Goal};
        addDrink(tempDrink, url2, apikey);
      break;
      case 't': 
        var tempDrink = {Date: date, Name: 'tea', Cups: 1, Amount: drinkAmount, User: use, Goal: Goal};
        addDrink(tempDrink, url2, apikey);
      break;
      case 'j': 
        var tempDrink = {Date: date, Name: 'juice', Cups: 1, Amount: drinkAmount, User: use, Goal: Goal};
        addDrink(tempDrink, url2, apikey);
      break;
    }
}


//REST.DB functons-------------------------------
function addDrink(tempDrink, url2, apikey){
  getDrink(url2, apikey);
  var settings = {
    "async": true,
    "crossDomain": true,
    "url": url2,
    "method": "POST",
    "headers": {
        "content-type": "application/json",
        "x-apikey": apikey,
        "cache-control": "no-cache"
    },
    "processData": false,
    "data": JSON.stringify(tempDrink)
  }
  $.ajax(settings).done(function () {

      
  });
 }
function getDrink(url2,apikey){
  var settings = {
      "async": true,
      "crossDomain": true,
      "url": url2,
      "method": "GET",
      "headers": {
          "content-type": "application/json",
          "x-apikey": apikey,
          "cache-control": "no-cache"
      }
  }


  $.ajax(settings).done(function (response2) {
      //console.log(response);
      //for(var i=0; i<response.length; i++){
          arrDrinkData = response2;
      //}
  });
}


//drink bar--------------------------------
  //drinkGoal changing (flex ammount)
  $('#drinkGoal').mouseover(function(){
    $('#drinkGoal1').show();
    $('#drinkGoal2').show();
    $('#drinkGoal3').show();
  });
  $('#drinkGoal').mouseleave(function(){
    $('#drinkGoal1').hide();
    $('#drinkGoal2').hide();
    $('#drinkGoal3').hide();
  });
    //click functions
  $('#drinkGoal1').click(function(){
    checkGoal = true;
    drinkGoalAmount = '0';
    $('#drinkGoaltxt').text(arrdrinkGoal[0].name);
  });
  $('#drinkGoal2').click(function(){
    checkGoal = true;
    drinkGoalAmount = '1';
    $('#drinkGoaltxt').text(arrdrinkGoal[1].name);
  });
  $('#drinkGoal3').click(function(){
    checkGoal = true;
    drinkGoalAmount = '2';
    $('#drinkGoaltxt').text(arrdrinkGoal[2].name);
  });
  
  
  function drinkMeterSet(drinkGoalAmount,drinkAmount){
    switch(drinkGoalAmount){
      case '0':
        Goal = 3000;
        drinkMeterMoveAmount(drinkAmount);
        
      break;
  
      case '1':
        Goal = 4000;
        drinkMeterMoveAmount(drinkAmount);
        console.log(Goal);
  
      break;
  
      case '2':
        Goal = 5000;
        drinkMeterMoveAmount(drinkAmount);
      break;
    }
  }
  
  function drinkMeterMoveAmount(drinkAmount){
    switch(drinkAmount){
      case 100:
          goalCalc = 340/(Goal/100) + goalCalc;
          console.log(goalCalc);
          $("#drinkMeter").css({width: goalCalc + 'px'});
          break;
  
      case 250:
        goalCalc = 340/(Goal/250) + goalCalc;
        console.log(goalCalc);
        $("#drinkMeter").css({width: goalCalc + 'px'});
      break;
  
      case 600:
        goalCalc = 340/(Goal/600) + goalCalc;
        console.log(goalCalc);
        $("#drinkMeter").css({width: goalCalc + 'px'});
      break;
  
      case 850:
        goalCalc = 340/(Goal/850) + goalCalc;
        console.log(goalCalc);
        $("#drinkMeter").css({width: goalCalc + 'px'});
      break;
  
      case 1000:
        goalCalc = 340/(Goal/1000) + goalCalc;
        console.log(goalCalc);
        $("#drinkMeter").css({width: goalCalc + 'px'});
      break;
    }
    //
    if(goalCalc >= 340){
      $('#goalReached').show();
      $("#drinkMeter").css({width: '340px'});

    } 
  
  }
  $('#gYes').click(function(){
    $('#goalReached').hide();
  });

  $('#gNo').click(function(){
    $('#goalReached').hide();
    getDrink(url2, apikey);
    $('#statScreen').show();
    $('#loginScreen').hide();
  });










//dropdown centre button-------------------------------------
//*NOTE* THIS IS PLAIN JS CODE, NOT JQUERY
function myFunction() {
    document.getElementById("differentDrinks").classList.toggle("show");
}
// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
      var dropdowns = document.getElementsByClassName("drinkContent");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }

}}}


 // hide/showClick functions for centre button--------------------------------
$('#coffee').click(function(){
    $('#drinkDisplayDrink').hide();
    $('#drinkDisplayJuice').hide();
    $('#drinkDisplayTea').hide();
    $('#drinkDisplayWater').hide();
    $('#drinkDisplayCoffee').show();
    visible ='c';
    checkBev = true;
});
$('#water').click(function(){
  $('#drinkDisplayDrink').hide();
  $('#drinkDisplayJuice').hide();
  $('#drinkDisplayTea').hide();
  $('#drinkDisplayCoffee').hide();
  $('#drinkDisplayWater').show();
  visible ='w';
  checkBev = true;
});
$('#tea').click(function(){
    $('#drinkDisplayDrink').hide();
    $('#drinkDisplayJuice').hide();
    $('#drinkDisplayCoffee').hide();
    $('#drinkDisplayWater').hide();
    $('#drinkDisplayTea').show();
    visible ='t';
    checkBev = true;
});
$('#juice').click(function(){
    $('#drinkDisplayDrink').hide();
    $('#drinkDisplayCoffee').hide();
    $('#drinkDisplayTea').hide();
    $('#drinkDisplayWater').hide();
    $('#drinkDisplayJuice').show();
    visible ='j';
    checkBev = true;
});

//Navigation - sliders -------------------------------

$('#naviCloseBtn').hide();

//change size of div to imitate sliding
function slider(){
  $('#naviBtn').click(function(){
    $('#naviCloseBtn').show();
    $('#todayDate').hide();
    $('#submitDate').hide();
    $("#navigation").css({
      width: "250px"}
      );
      $('#day').show();
  });
  
  $('#naviCloseBtn').click(function(){
    $('#naviCloseBtn').hide();
    $("#navigation").css({
      width: "0px"}
      );
  });
  
 
}

 //access new html
 $('#stats').click(function(){
  console.log(arrDrinkData);
  console.log(arrUser);
  getDrink(url2, apikey);
  $('#statScreen').show();
  $('#loginScreen').hide();
  $("#navigation").css({
    width: "0px"}
    );
  

  
});
$('#home').click(function(){
  $('#loginScreen').hide();
  $('#statScreen').hide();
  $("#navigation").css({
    width: "0px"}
    );
});


$('#signOut').click(function(){
  $('#loginScreen').show();
  $('#statScreen').hide();

  $("#navigation").css({
    width: "0px"}
    );
});




// -------------------------------*LOGIN PAGE JS CODES*  -------------------------------
getSignUp(url,apikey);
//hide show functions
$('#loginError').hide();
$('#signUpError').hide();
$('#signUpErrorP').hide();
$('#signUpErrorE').hide();
$('#signUpErrorU').hide();

/*
$('#Fname').hide();
$('#profile').hide();
$('#Lname').hide();
$('#username').hide();
$('#sex').hide();
$('#height').hide();
$('#weight').hide();
$('#goalsReached').hide();
*/

$('#signUp').hide();

//buttons

$('#loginSignUp').click(function(){
  $('#login').hide();
  $('#signUp').show();
  

});
$('#signUpLogin').click(function(){
  $('#login').show();
  $('#signUp').hide();
  $('#loginError').hide();

});
 $('#signUpSubmit').click(function(){
  validateSignUp(arrLogin);
  $('#loginScreen').hide();
  $('#phoneScreen').show();


  
 });
 $('#loginSubmit').click(function(){
   login(arrLogin);
 });

 


 function validateSignUp(arrLogin){
  var rePassword = $('#signUpCheckPassword').val();
  var username = $('#signUpUsername').val();
  var password = $('#signUpPassword').val();
  var fname = $('#signUpFname').val();
  var lname = $('#signUpLname').val();

  $('#signUpError').hide();
  $('#signUpErrorP').hide();
  $('#signUpErrorE').hide();
  var found = true;

  //$('#loginUsername').val('');
  //$('#loginPassword').val('');


  if (fname == ''){
    $('#signUpErrorE').show();
    return;
  }
  if (lname -= ''){
    $('#signUpErrorE').show();
    return;
  }
  if (username == ''){
    $('#signUpErrorE').show();
    return;
  }
  if (password == ''){
    $('#signUpErrorE').show();
    return;
  }
  if (rePassword == ''){
    $('#signUpErrorE').show();
    return;
  }
  if (password != rePassword){
    $('#signUpErrorP').show();
    return;
  }
  for (var i = 0; i < arrLogin.length; i++) {
    if (arrLogin[i].Username == $('#signUpUsername').val()){
      $('#signUpError').show();
      console.log('n');
      return;
    }
  }
  if (found === true){
    use = username;
    console.log(use);
    var tempSignup= {
      Fname: $('#signUpFname').val(), 
      Lname:  $('#signUpLname').val(), 
      Username: $('#signUpUsername').val(), 
      Password: $('#signUpPassword').val(), 
      Cpassword:  $('#signUpCheckPassword').val()
    }
    addSignUp(tempSignup, url, apikey);  
   
   $('#signUpCheckPassword').val();
   $('#signUpUsername').val('');
  $('#signUpPassword').val('');
   $('#signUpFname').val('');
   $('#signUpLname').val('');
    $('#login').show();
    $('#signUp').hide();

    return;

    
  }
 }


 
 function login() {
  //---- getting values from inputs
  var username = $('#loginUsername').val();
  var password = $('#loginPassword').val();
  var found = false; //---- find if user exists

  //---- loop over arrUsers to find correct user and password
  for (var i = 0; i < arrLogin.length; i++) {
      //---- checks if the username exists and whether the password matches
      if (arrLogin[i].Username == username && arrLogin[i].Password == password && arrLogin[i].Cpassword == password) {
         found = true;
         $('#loginUsername').val('');
         $('#loginPassword').val('');
         $('#loginError').hide();
         use = username;
         $('#loginScreen').hide();
         console.log(use);
  
          break; //---- breaking out of loop

      }
  }

  if (found === false) {
      //---- red text to show that username or password is incorrect
      $('#loginUsername').val('');
      $('#loginPassword').val('');
      $('#loginError').show();
  }
}


//REST.DB functons-------------------------------
function addSignUp(item, url, apikey){
  getSignUp(url, apikey);
  var settings = {
    "async": true,
    "crossDomain": true,
    "url": url,
    "method": "POST",
    "headers": {
        "content-type": "application/json",
        "x-apikey": apikey,
        "cache-control": "no-cache"
    },
    "processData": false,
    "data": JSON.stringify(item)
  }
  $.ajax(settings).done(function (response) {
    // arrUers = response;
      console.log('login information added');
      console.log(response);
  });
 }
function getSignUp(url,apikey){
  var settings = {
      "async": true,
      "crossDomain": true,
      "url": url,
      "method": "GET",
      "headers": {
          "content-type": "application/json",
          "x-apikey": apikey,
          "cache-control": "no-cache"
      }
  }


  $.ajax(settings).done(function (response) {
      //console.log(response);
      //for(var i=0; i<response.length; i++){
          arrLogin= response;
      //}
  });
}







//STATS PAGE
$('#monthPg').hide();
//$('#dayPg').hide();

///Date ------------

sdatePicker(sdateVisible, stDate);
pageSetter();

function sdatePicker(sdateVisible, stDate){
  var month = stDate.getMonth()+1;
  var day = stDate.getDate();

  var soutput = stDate.getFullYear() + '-' +
    (month<10 ? '0' : '') + month + '-' +
    (day<10 ? '0' : '') + day;
  $('#sday').text(soutput);
  sdate = soutput;


  $('#sday').click(function(){
    if (sdateVisible === false){
      $('#stodayDate').show();
      $('#ssubmitDate').show();
      $('#sday').hide();
      sdateVisible = true;
    }
    else {
      $('#stodayDate').hide();
      $('#ssubmitDate').hide();
      $('#sday').show();
      sdateVisible = false;
    }
  });
  $('#ssubmitDate').click(function(){

    //database will use
    //tDate = $('#todayDate').val();
    soutput = $('#stodayDate').val();
    $('#stodayDate').hide();
    $('#ssubmitDate').hide();
    $('#sday').text(soutput);
    $('#sday').show();
    sdate = soutput;
    addAmount();

  });

  //-----
  
  
}



function pageSetter(){
  $('#btnDay').click(function(){
    plusUser(arrDrinkData);
    addAmount();
    $('#dayPg').show();
    $('#monthPg').hide();

  });
  $('#btnMonth').click(function(){
    $('#monthPg').show();
    $('#dayPg').hide();

  });
}


function selectionSortAmount(inputArr) { 
  var n = inputArr.length;
      
  for(let i = 0; i < n; i++) {
      // Finding the smallest number in the subarray
      let min = i;
      for(let j = i+1; j < n; j++){
          if(inputArr[j].Amount < inputArr[min].Amount) {
              min=j; 
          }
       }
       if (min != i) {
           // Swapping the elements
           let tmp = inputArr[i]; 
           inputArr[i] = inputArr[min];
           inputArr[min] = tmp;      
      }
  }
  return inputArr;
};


function plusDrink(arrUser){
  arrresult = [];
  for(var i = 0; i < arrUser.length; ++i){
   // console.log(arrDrinkData[i].Date);
    if(arrUser[i].Date == sdate){
      arrresult.push(arrUser[i]);
    }
  }
  return arrUser;
};



function plusUser(arrDrinkData){
  console.log(use);
  arrUser = [];
  for(var i = 0; i < arrDrinkData.length; ++i){
   // console.log(arrDrinkData[i].Date);
    if(arrDrinkData[i].User == use){
      arrUser.push(arrDrinkData[i]);
    }
  }
  console.log(arrUser);
  return arrDrinkData;
};

function addAmount(){
  plusDrink(arrUser);
  selectionSortAmount(arrresult);
  console.log(arrresult);
  console.log(use);
  for(var i = 0; i < arrresult.length; ++i){
   
    total = total + arrresult[i].Amount;
    console.log(total);
   }
};




//DAY
//$("#drinkMeter").css({width: goalCalc + 'px'});