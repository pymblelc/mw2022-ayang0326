//Variables --------------------------------
var apikey = '622e9137dced170e8c83a238';
var url = 'https://ayangdailydrink-3299.restdb.io/rest/login';
var arrDailyDrinkData = [
    {name: "Coffee", cups: 0, amount: 0, order: 0},
    {name: "Water", cups: 0, amount: 0, order: 1},
    {name: "Tea", cups: 0, amount: 0, order: 2},
    {name: "Juice", cups: 0, amount: 0, order: 3},
    {name: "total", cups: 0, amount: 0, order: 4}
];

var visible = '';
var dateVisible = false;
var tDate = new Date();
var drinkGoalAmount = '';
var arrdrinkGoal = [
  {amount: 3000, name: '3L'},
  {amount: 4000, name: '4L'},
  {amount: 5000, name: '5L'},
];
var setGoal = 0;
var Goal = '';
var arrLogin = [''];
var goalCalc = 0;

// -------------------------------*HOME PAGE JS CODES*  -------------------------------
//functions - homepage
hideAndShow();
datePicker(dateVisible, tDate);
slider();

// Hide/Show functions --------------------------------
function hideAndShow(){
  $('#drinkDisplayCoffee').hide();
$('#drinkDisplayJuice').hide();
$('#drinkDisplayTea').hide();
$('#drinkDisplayWater').hide();
$('#todayDate').hide();
$('#submitDate').hide();

$('#drinkGoal1').hide();
$('#drinkGoal2').hide();
$('#drinkGoal3').hide();

}

//date picker --------------------------------
function datePicker(dateVisible, tDate){
  var month = tDate.getMonth()+1;
  var day = tDate.getDate();

  var output = tDate.getFullYear() + '-' +
    (month<10 ? '0' : '') + month + '-' +
    (day<10 ? '0' : '') + day;
  $('#day').text(output);


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
    output = $('#todayDate').val()
    $('#todayDate').hide();
    $('#submitDate').hide();
    $('#day').text(output);
    $('#day').show();

  });

  
  
  
}

//drink amount function --------------------------------
$('#hundredMl').click(function(){
    var drinkAmount = 100;
    drinkData(drinkAmount);
    //CONSOLE
    console.log(arrDailyDrinkData);
    drinkMeterSet(drinkGoalAmount, drinkAmount);
    //var meterAmount = 10;
});
$('#twoFiftyMl').click(function(){
    var drinkAmount = 250;
    drinkData(drinkAmount);
    //CONSOLE
  console.log(arrDailyDrinkData);
  drinkMeterSet(drinkGoalAmount, drinkAmount);
});
$('#sixHundredMl').click(function(){
  var drinkAmount = 600;
  drinkData(drinkAmount);
  //CONSOLE
  console.log(arrDailyDrinkData);
  drinkMeterSet(drinkGoalAmount, drinkAmount);
});
$('#eightFiftyMl').click(function(){
  var drinkAmount = 850;
  drinkData(drinkAmount);
  //CONSOLE
  console.log(arrDailyDrinkData);
  drinkMeterSet(drinkGoalAmount, drinkAmount);
});
$('#litre').click(function(){
  var drinkAmount = 1000;
  drinkData(drinkAmount);
  //CONSOLE
  console.log(arrDailyDrinkData);
  drinkMeterSet(drinkGoalAmount, drinkAmount);
});

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
  drinkGoalAmount = '0';
  $('#drinkGoaltxt').text(arrdrinkGoal[0].name);
});
$('#drinkGoal2').click(function(){
  drinkGoalAmount = '1';
  $('#drinkGoaltxt').text(arrdrinkGoal[1].name);
});
$('#drinkGoal3').click(function(){
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
  if(goalCalc >= 340){
    alert('goalreached');
    $("#drinkMeter").css({width: '340px'});
  } 

}

//drink data function--------------------------------
function drinkData(drinkAmount){
  //drink ammount will be chosen
  arrDailyDrinkData[4].amount +=drinkAmount;
  arrDailyDrinkData[4].cups +=1;
  //casewhere used to check which div is visible
    switch (visible){
      case 'c': 
        arrDailyDrinkData[0].amount +=drinkAmount;
        arrDailyDrinkData[0].cups +=1;
        //var tempDrink = {Name: 'coffee', Cups: 1, Amount: drinkAmount, Date: todayDate };
        //addDrink(tempDrink, url, apikey);
        //$("#drinkMeter").css({ width: "+=100%"});

      break;
      case 'w': 
        arrDailyDrinkData[1].amount +=drinkAmount;
        arrDailyDrinkData[1].cups +=1;
      break;
      case 't': 
        arrDailyDrinkData[2].amount +=drinkAmount;
        arrDailyDrinkData[2].cups +=1;
      break;
      case 'j': 
        arrDailyDrinkData[3].amount +=drinkAmount;
        arrDailyDrinkData[3].cups +=1;
      break;
    }
}
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
});
$('#water').click(function(){
  $('#drinkDisplayDrink').hide();
  $('#drinkDisplayJuice').hide();
  $('#drinkDisplayTea').hide();
  $('#drinkDisplayCoffee').hide();
  $('#drinkDisplayWater').show();
  visible ='w';
});
$('#tea').click(function(){
    $('#drinkDisplayDrink').hide();
    $('#drinkDisplayJuice').hide();
    $('#drinkDisplayCoffee').hide();
    $('#drinkDisplayWater').hide();
    $('#drinkDisplayTea').show();
    visible ='t';
});
$('#juice').click(function(){
    $('#drinkDisplayDrink').hide();
    $('#drinkDisplayCoffee').hide();
    $('#drinkDisplayTea').hide();
    $('#drinkDisplayWater').hide();
    $('#drinkDisplayJuice').show();
    visible ='j';
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
  location.href='../stats.html?';
});
$('#user').click(function(){
  location.href='../index.html?';
});
$('#home').click(function(){
  location.href='../home.html';
});





// -------------------------------*LOGIN PAGE JS CODES*  -------------------------------

//hide show functions


$('#loginError').hide();
$('#signUpError').hide();
$('#signUpErrorP').hide();
$('#signUpErrorE').hide();
$('#signUpErrorU').hide();

$('#Fname').hide();
$('#profile').hide();
$('#Lname').hide();
$('#username').hide();
$('#sex').hide();
$('#height').hide();
$('#weight').hide();
$('#goalsReached').hide();

$('#signUp').hide();

//
$('#login').hide();
$('#signUp').show();

//buttons

$('#loginSignUp').click(function(){
  $('#login').hide();
  $('#signUp').show();

});
$('#signUpLogin').click(function(){
  $('#login').show();
  $('#signUp').hide();

});
 $('#signUpSubmit').click(function(){
  validateSignUp(arrLogin);

  
 });
 $('#loginSubmit').click(function(){
   login(arrLogin);
 });

 //suig
 getSignUp(url,apikey);
 console.log(getSignUp);


 


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
  for (var i = 0; i < arrLogin.length; i++) {
    if (arrLogin[i].Username == $('#signUpUsername').val()){
      $('#signUpErrorU').show();
      console.log('n');
      return;
    }
  }

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
    console.log('use');
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
  if (found === true){
    var tempSignup= {
      Fname: $('#signUpFname').val(), 
      Lname:  $('#signUpLname').val(), 
      Username: $('#signUpUsername').val().toLowerCase(), 
      Password: $('#signUpPassword').val(), 
      Cpassword:  $('#signUpCheckPassword').val()

    }
    addSignUp(tempSignup, url, apikey);  
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
         location.href='../home.html'
         $('#loginUsername').val('');
         $('#loginPassword').val('');
         $('#loginError').hide();
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
          console.log(response);
      //}
  });
}