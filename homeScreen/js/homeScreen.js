//Variables --------------------------------
var apikey = '622e9137dced170e8c83a238';
var url = 'https://ayangdailydrink-3299.restdb.io/rest/login';
var url2 = 'https://ayangdailydrink-3299.restdb.io/rest/dailydrinkcount';

//two collections within database
var arrDrinkData = [''];
var arrLogin = [''];


//home page date
var visible = '';
var dateVisible = false;
var tDate = new Date();

//drink Goals set
var drinkGoalAmount = '';
var arrdrinkGoal = [
  { amount: 3000, name: '3L' },
  { amount: 4000, name: '4L' },
  { amount: 5000, name: '5L' },
];
var Goal = 0;
var goalCalc = 0;
var use = '';
var date = 0;

//checking flags
var checkBev = false;
var checkGoal = false;


//stats page
var arrUser = [];
var arrresult = [];

//stat date setting
var sdateVisible = false;
var stDate = new Date();
var sDate = '';
var time = 0;

//for stat calculation
var total = 0;
var twater = 0;
var tcoffee = 0;
var ttea = 0;
var tjuice = 0;
var calcwater = 0;
var calccoffee = 0;
var calctea = 0;
var calcjuice = 0;
// -------------------------------*HOME PAGE JS CODES*  -------------------------------
//functions - homepage
datePicker(dateVisible, tDate);
slider();
getDrink(url2, apikey);
getSignUp(url, apikey);
loading(5);

// Hide/Show hs --------------------------------

//screens
$('#loginScreen').show();
$('#statScreen').hide();

//centre button
$('#drinkDisplayCoffee').hide();
$('#drinkDisplayJuice').hide();
$('#drinkDisplayTea').hide();
$('#drinkDisplayWater').hide();

//dates
$('#todayDate').hide();
$('#submitDate').hide();
$('#stodayDate').hide();
$('#ssubmitDate').hide();

//drink goals
$('#drinkGoal1').hide();
$('#drinkGoal2').hide();
$('#drinkGoal3').hide();
$('#goalReached').hide();

//errors and loading
$('#errorCheck').hide();
$('#loading').hide();



// Loading function ------------------------------
function loading(trans) {
  //reset
  $("#loadingMeter").css({ transition: 0 + 'px' });
  $("#loadingMeter").css({ width: 0 + 'px' });
  //show lading screen
  $('#loading').show();
  $("#loadingMeter").css({ transition: trans + 'px' }); //sec
  $("#loadingMeter").css({ width: 200 + 'px' }); //move to full width
  //delay
  time = trans * 1000 + 50;
  setTimeout(Fhide, time);
  //hide function
  function Fhide() {
    $('#loading').hide()
  };
}

//date picker --------------------------------
function datePicker(dateVisible, tDate) {
  //get current date (automatically)
  var month = tDate.getMonth() + 1;
  var day = tDate.getDate();

  //set variable date to found output
  var output = tDate.getFullYear() + '-' +
    (month < 10 ? '0' : '') + month + '-' +
    (day < 10 ? '0' : '') + day;
  $('#day').text(output);
  date = output;

  //ClickF
  $('#day').click(function () {
    if (dateVisible === false) {
      //open
      $('#todayDate').show();
      $('#submitDate').show();
      $('#day').hide();
      dateVisible = true;
    }
    else {
      //close
      $('#todayDate').hide();
      $('#submitDate').hide();
      $('#day').show();
      dateVisible = false;
    }
  });

  $('#submitDate').click(function () {
    //database will use
    //tDate = $('#todayDate').val();
    //show full date
    output = $('#todayDate').val();
    $('#todayDate').hide();
    $('#submitDate').hide();
    $('#day').text(output);
    $('#day').show();
    date = output;
    console.log(date);

  });




}

//check----------------------------------------------
function checkDrink(drinkAmount, drinkGoalAmount) {

  if (checkGoal === true && checkBev === true) {
    //only start all functions if true 
    drinkMeterSet(drinkGoalAmount); //set meter
    drinkData(drinkAmount); //upload to database
    drinkMeterMoveAmount(drinkAmount); //move drink meter 
    getDrink(url2, apikey); //get datbase
    loading(2);
    return;
  };
  if (checkBev === false || checkGoal === false) {
    //display error box
    console.log('both');
    $('#errorCheck').show();
    return;
  }

};

//close error box
$('#Eok').click(function () {
  $('#errorCheck').hide();
});

//drink amount function --------------------------------

$('#hundredMl').click(function () {
  var drinkAmount = 100;
  //CONSOLE
  console.log(date);
  checkDrink(drinkAmount, drinkGoalAmount); //run function, submit to database

  //var meterAmount = 10;
});
$('#twoFiftyMl').click(function () {
  var drinkAmount = 250;
  checkDrink(drinkAmount, drinkGoalAmount);//run function, submit to database

});
$('#sixHundredMl').click(function () {
  var drinkAmount = 600;
  //CONSOLE
  checkDrink(drinkAmount, drinkGoalAmount);//run function, submit to database

});
$('#eightFiftyMl').click(function () {
  var drinkAmount = 850;
  //CONSOLE
  checkDrink(drinkAmount, drinkGoalAmount);//run function, submit to database

});
$('#litre').click(function () {
  var drinkAmount = 1000;
  //CONSOLE
  checkDrink(drinkAmount, drinkGoalAmount);//run function, submit to database

});



//drink data function--------------------------------
function drinkData(drinkAmount) {
  //casewhere used to check which div is visible
  switch (visible) {
    case 'c': //coffee
      var tempDrink = { Date: date, Name: 'coffee', Cups: 1, Amount: drinkAmount, User: use, Goal: Goal };
      addDrink(tempDrink, url2, apikey); //database add function
      break;
    case 'w': //water
      var tempDrink = { Date: date, Name: 'water', Cups: 1, Amount: drinkAmount, User: use, Goal: Goal };
      addDrink(tempDrink, url2, apikey); //database add function
      break;
    case 't': //tea
      var tempDrink = { Date: date, Name: 'tea', Cups: 1, Amount: drinkAmount, User: use, Goal: Goal };
      addDrink(tempDrink, url2, apikey); //database add function
      break;
    case 'j': //juice
      var tempDrink = { Date: date, Name: 'juice', Cups: 1, Amount: drinkAmount, User: use, Goal: Goal };
      addDrink(tempDrink, url2, apikey); //database add function
      break;
  }
}

//REST.DB functons-------------------------------
function addDrink(tempDrink, url2, apikey) {
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
function getDrink(url2, apikey) {
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
    arrDrinkData = response2; //submit to databse
    console.log(arrDrinkData); 

    //}
  });
}


//drink bar--------------------------------
//drinkGoal changing (flex ammount), highlight rather that click function
$('#drinkGoal').mouseover(function () {
  $('#drinkGoal1').show();
  $('#drinkGoal2').show();
  $('#drinkGoal3').show();
});
$('#drinkGoal').mouseleave(function () {
  $('#drinkGoal1').hide();
  $('#drinkGoal2').hide();
  $('#drinkGoal3').hide();
});

//click functions
$('#drinkGoal1').click(function () {
  checkGoal = true; 
  drinkGoalAmount = '0'; //case
  $('#drinkGoaltxt').text(arrdrinkGoal[0].name); //setgoal
});
$('#drinkGoal2').click(function () {
  checkGoal = true;
  drinkGoalAmount = '1'; //case
  $('#drinkGoaltxt').text(arrdrinkGoal[1].name); //setgoal
});
$('#drinkGoal3').click(function () {
  checkGoal = true;
  drinkGoalAmount = '2'; //case
  $('#drinkGoaltxt').text(arrdrinkGoal[2].name); //setgoal
});

//casewhere meter set
function drinkMeterSet(drinkGoalAmount) {
  switch (drinkGoalAmount) {
    case '0':
      Goal = 3000; //set goal
      // drinkMeterMoveAmount(drinkAmount);

      break;

    case '1':
      Goal = 4000; //set goal
      // drinkMeterMoveAmount(drinkAmount);

      break;

    case '2':
      Goal = 5000; //set goal
      // drinkMeterMoveAmount(drinkAmount);
      break;
  }
}
//DATA FUNCTION----------------!!!!!
function drinkMeterMoveAmount(drinkAmount) {
  switch (drinkAmount) {
    case 100: //ml
      goalCalc = 340 / (Goal / 100) + goalCalc; // drink meter / (goal/input amount) + already exisiting 
      console.log(goalCalc);
      $("#drinkMeter").css({ width: goalCalc + 'px' }); //change meter width
      break;

//repeat with other cases
    case 250:
      goalCalc = 340 / (Goal / 250) + goalCalc;
      console.log(goalCalc);
      $("#drinkMeter").css({ width: goalCalc + 'px' });
      break;

    case 600:
      goalCalc = 340 / (Goal / 600) + goalCalc;
      console.log(goalCalc);
      $("#drinkMeter").css({ width: goalCalc + 'px' });
      break;

    case 850:
      goalCalc = 340 / (Goal / 850) + goalCalc;
      console.log(goalCalc);
      $("#drinkMeter").css({ width: goalCalc + 'px' });
      break;

    case 1000:
      goalCalc = 340 / (Goal / 1000) + goalCalc;
      console.log(goalCalc);
      $("#drinkMeter").css({ width: goalCalc + 'px' });
      break;
  }
  //if it's larger that 340, will overlfow  so set to 340 exactly
  if (goalCalc >= 340) {
    $('#goalReached').show();
    $("#drinkMeter").css({ width: '340px' });

  }

}

//the pop up close
$('#gYes').click(function () {
  $('#goalReached').hide();
});

//set to stat screen
$('#gNo').click(function () {
  $('#goalReached').hide();
  console.log(arrDrinkData);
  console.log(arrUser);
  getDrink(url2, apikey);

  $('#statScreen').show();
  $('#loginScreen').hide();
  loading(5);
});



//dropdown centre button-------------------------------------
//*NOTE* THIS IS PLAIN JS CODE, NOT JQUERY

function myFunction() {
  document.getElementById("differentDrinks").classList.toggle("show");
}
// Close the dropdown menu if the user clicks outside of it
window.onclick = function (event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("drinkContent");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }

    }
  }
}


// hide/showClick functions for centre button--------------------------------
$('#coffee').click(function () {
  $('#drinkDisplayDrink').hide();
  $('#drinkDisplayJuice').hide();
  $('#drinkDisplayTea').hide();
  $('#drinkDisplayWater').hide();
  $('#drinkDisplayCoffee').show();
  visible = 'c';
  checkBev = true;
});
$('#water').click(function () {
  $('#drinkDisplayDrink').hide();
  $('#drinkDisplayJuice').hide();
  $('#drinkDisplayTea').hide();
  $('#drinkDisplayCoffee').hide();
  $('#drinkDisplayWater').show();
  visible = 'w';
  checkBev = true;
});
$('#tea').click(function () {
  $('#drinkDisplayDrink').hide();
  $('#drinkDisplayJuice').hide();
  $('#drinkDisplayCoffee').hide();
  $('#drinkDisplayWater').hide();
  $('#drinkDisplayTea').show();
  visible = 't';
  checkBev = true;
});
$('#juice').click(function () {
  $('#drinkDisplayDrink').hide();
  $('#drinkDisplayCoffee').hide();
  $('#drinkDisplayTea').hide();
  $('#drinkDisplayWater').hide();
  $('#drinkDisplayJuice').show();
  visible = 'j';
  checkBev = true;
});

//Navigation - sliders -------------------------------

$('#naviCloseBtn').hide();

//change size of div to imitate sliding
//DATA FUNCTION----------------!!!!!
function slider() {
  //open sliderrrrrrrr
  $('#naviBtn').click(function () {
    $('#naviCloseBtn').show();
    $('#todayDate').hide();
    $('#submitDate').hide();
    $("#navigation").css({
      width: "250px"
    }
    );
    $('#day').show();
  });

  $('#naviCloseBtn').click(function () {
    //close sliderrrrrrrrr
    $('#naviCloseBtn').hide();
    $("#navigation").css({
      width: "0px"
    }
    );
  });

}

//access new hpage
$('#stats').click(function () {
  console.log(arrDrinkData);
  console.log(arrUser);
  //also re-get the data since there may be updates
  getDrink(url2, apikey);
  $('#statScreen').show();
  $('#loginScreen').hide();
  $("#navigation").css({
    width: "0px"
  }
  );
  loading(5);


});
$('#home').click(function () {
  $('#loginScreen').hide();
  $('#statScreen').hide();
  $("#navigation").css({
    width: "0px"
  }
  );
  loading(5);
});

$('#signOut').click(function () {
  $('#loginScreen').show();
  $('#statScreen').hide();

  $("#navigation").css({
    width: "0px"
  }
  );
});




// -------------------------------*LOGIN PAGE JS CODES*  -------------------------------
//hide show functions
$('#loginError').hide();
$('#signUpError').hide();
$('#signUpErrorP').hide();
$('#signUpErrorE').hide();
$('#signUpErrorU').hide();
$('#signUp').hide();

//buttons
$('#loginSignUp').click(function () { // show signup
  $('#login').hide();
  $('#signUp').show();


});
$('#signUpLogin').click(function () { //show login
  $('#login').show();
  $('#signUp').hide();
  $('#loginError').hide();

});
$('#signUpSubmit').click(function () { //run function for signup
  validateSignUp(arrLogin);
});
$('#loginSubmit').click(function () { //run function with login
  login(arrLogin);
});



function validateSignUp(arrLogin) {
  //temp vars
  var rePassword = $('#signUpCheckPassword').val();
  var username = $('#signUpUsername').val();
  var password = $('#signUpPassword').val();
  var fname = $('#signUpFname').val();
  var lname = $('#signUpLname').val();

  //hideshow
  $('#signUpError').hide();
  $('#signUpErrorP').hide();
  $('#signUpErrorE').hide();
  var found = true;

  //$('#loginUsername').val('');
  //$('#loginPassword').val('');


  if (fname == '') {
    $('#signUpErrorE').show(); //empty
    return;
  }
  if (lname -= '') {
    $('#signUpErrorE').show(); //empty
    return;
  }
  if (username == '') {
    $('#signUpErrorE').show(); //empty
    return;
  }
  if (password == '') {
    $('#signUpErrorE').show(); //empty
    return;
  }
  if (rePassword == '') {
    $('#signUpErrorE').show(); //empty
    return;
  }
  if (password != rePassword) {
    $('#signUpErrorP').show(); //not repeated password check
    return;
  }
  for (var i = 0; i < arrLogin.length; i++) { //repeated username
    if (arrLogin[i].Username == $('#signUpUsername').val()) {
      $('#signUpError').show();
      console.log('n');
      return;
    }
  }

  //if everything is well
  if (found === true) {

    use = username; //set username
    console.log(use);
    var tempSignup = {
      Fname: $('#signUpFname').val(),
      Lname: $('#signUpLname').val(),
      Username: $('#signUpUsername').val(),
      Password: $('#signUpPassword').val(),
      Cpassword: $('#signUpCheckPassword').val()
    }
    //add to database 
    addSignUp(tempSignup, url, apikey);

    //reset
    $('#signUpCheckPassword').val();
    $('#signUpUsername').val('');
    $('#signUpPassword').val('');
    $('#signUpFname').val('');
    $('#signUpLname').val('');
    $('#login').show();
    $('#signUp').hide();

    $('#loginScreen').hide();

    return;


  }
}


function login() {
  //temp var
  var username = $('#loginUsername').val();
  var password = $('#loginPassword').val();
  var found = false; //find if user exists

  //find correct user and password
  for (var i = 0; i < arrLogin.length; i++) {
    //checks if the username exists and whether the password matches
    if (arrLogin[i].Username == username && arrLogin[i].Password == password && arrLogin[i].Cpassword == password) {
      found = true;
      $('#loginUsername').val('');
      $('#loginPassword').val('');
      $('#loginError').hide();
      use = username;
      $('#loginScreen').hide();
      console.log(use);

      break; 

    }
  }

  if (found === false) {
    //red text to show that username or password is incorrect
    $('#loginUsername').val('');
    $('#loginPassword').val('');
    $('#loginError').show();
  }
}


//REST.DB functons-------------------------------

function addSignUp(item, url, apikey) {
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
function getSignUp(url, apikey) {
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
    arrLogin = response;
    console.log(arrLogin);
    //}
  });
}








//STATS PAGE -------------------------------------------------

///Date ------------

sdatePicker(sdateVisible, stDate);

//EXACTLY SAME AS BEFORE BUTTTTTTT ITS WITH AN s IN FRONT FOR STATS
function sdatePicker(sdateVisible, stDate) {
  var month = stDate.getMonth() + 1;
  var day = stDate.getDate();

  var soutput = stDate.getFullYear() + '-' +
    (month < 10 ? '0' : '') + month + '-' +
    (day < 10 ? '0' : '') + day;
  $('#sday').text(soutput);
  sdate = soutput;


  $('#sday').click(function () {
    if (sdateVisible === false) {
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
  $('#ssubmitDate').click(function () {

    //database will use
    //tDate = $('#todayDate').val();
    soutput = $('#stodayDate').val();
    $('#stodayDate').hide();
    $('#ssubmitDate').hide();
    $('#sday').text(soutput);
    $('#sday').show();
    sdate = soutput;

  });

}

$('#btnDay').click(function () {
  $('#dayPg').show();
  $('#monthPg').hide();
  sgoal = 0;
  total = 0;
  twater = 0;
  tcoffee = 0;
  ttea = 0;
  tjuice = 0;

  //calcualations whoo
  plusUser(arrDrinkData);

  addAmount();
  console.log('result', arrresult)
  addName()


});

//DATA FUNCTION----------------!!!!!
function selectionSortAmount(inputArr) {
  var n = inputArr.length;

  for (let i = 0; i < n; i++) {
    // Finding the smallest number in the subarray
    let min = i;
    for (let j = i + 1; j < n; j++) {
      if (inputArr[j].Amount < inputArr[min].Amount) {
        min = j;
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

//DATA FUNCTION----------------!!!!!
function plusDate(arrUser) {
  arrresult = [];
  for (var i = 0; i < arrUser.length; ++i) {
    // console.log(arrDrinkData[i].Date);
    if (arrUser[i].Date == sdate) {
      arrresult.push(arrUser[i]);
    }
  }
  return arrUser;
};

//DATA FUNCTION----------------!!!!!
function plusUser(arrDrinkData) {
  console.log(use);
  arrUser = [];
  for (var i = 0; i < arrDrinkData.length; ++i) {
    // console.log(arrDrinkData[i].Date);
    if (arrDrinkData[i].User == use) {
      arrUser.push(arrDrinkData[i]);
    }
  }
  return arrDrinkData;
};






function addAmount() {
  plusDate(arrUser); // sort and push 1 
  selectionSortAmount(arrresult); // sort and push 2
  console.log('arrresult', arrresult); 
  console.log('use', use);

  //add everything together
  for (var i = 0; i < arrresult.length; ++i) {

    total = total + arrresult[i].Amount;

    console.log('total', total);

// find goal
    console.log(arrresult[i].Goal);
    sgoal = arrresult[i].Goal;


  }

  //reset 
  $("#sdrinkMeter").css({ width: 0 + 'px' });
  $('#sdrinkGoal').text(('0%'));
  $('#stotalBevStat').text((0 + 'ML'));

  console.log(sgoal);
  goalCalc = 0;
  goalCalc = 340 / (sgoal / total); //more calc
  $('#stotalBevStat').text((total + 'ML'));


  //literally the same code as drink metter
  if (goalCalc < 340) {
    $("#sdrinkMeter").css({ width: goalCalc + 'px' });
    $('#sdrinkGoal').text((goalCalc / 340) * 100 + '%');
    return;
  }

  if (goalCalc >= 340) {
    $("#sdrinkMeter").css({ width: '340px' });
    console.log('340');
    $('#sdrinkGoal').text('Met!!');
    return;
  }




  // ;

};

//same as addAmount only there is a specific sort

function addName() {
  //find and add
  for (var i = 0; i < arrresult.length; ++i) {
    if (arrresult[i].Name == 'water') {
      twater = twater + arrresult[i].Amount;
      console.log('w', twater);

    }
    if (arrresult[i].Name == 'coffee') {
      tcoffee = tcoffee + arrresult[i].Amount;
      console.log("c", tcoffee);

    }
    if (arrresult[i].Name == 'tea') {
      ttea = ttea + arrresult[i].Amount;
      console.log('t', ttea);

    }
    if (arrresult[i].Name == 'juice') {
      tjuice = tjuice + arrresult[i].Amount;
      console.log('j', tjuice);

    }
  }

  //reset
  $("#sWaterMeter").css({ width: 0 + 'px' });
  $('#sWaterCups').text('0px');
  $("#sCoffeeMeter").css({ width: 0 + 'px' });
  $('#sCoffeeCups').text('0px');
  $("#sTeaMeter").css({ width: 0 + 'px' });
  $('#sTeaCups').text('0px');
  $("#sJuiceMeter").css({ width: 0 + 'px' });
  $('#sJuiceCups').text('0px');
  console.log(total);
  calcwater = 0;
  calccoffee = 0;
  calctea = 0;
  calcjuice = 0;

  //maths
  calcwater = 340 / (total / twater);
  $("#sWaterMeter").css({ width: calcwater + 'px' });
  $('#sWaterCups').text(twater);

  calccoffee = 340 / (total / tcoffee);
  $("#sCoffeeMeter").css({ width: calccoffee + 'px' });
  $('#sCoffeeCups').text(tcoffee);

  calctea = 340 / (total / ttea);
  $("#sTeaMeter").css({ width: calctea + 'px' });
  $('#sTeaCups').text(ttea);

  calcjuice = 340 / (total / tjuice);
  $("#sJuiceMeter").css({ width: calcjuice + 'px' });
  $('#sJuiceCups').text(tjuice);



//move dat bar
  if (calcwater >= 340) {
    $("#sWaterMeter").css({ width: '340px' });
    return;
  }
  if (calccoffee >= 340) {
    $("#sCoffeeMeter").css({ width: '340px' });
    return;
  }
  if (calctea >= 340) {
    $("#sTeaMeter").css({ width: '340px' });
    return;
  }
  if (calcjuice >= 340) {
    $("#sJuiceMeter").css({ width: '340px' });
    return;
  }



};

//slay