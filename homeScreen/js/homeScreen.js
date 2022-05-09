//Variables --------------------------------
var apikey = '622e9137dced170e8c83a238';
var url = 'https://ayangdailydrink-3299.restdb.io/rest/dailydrinkcount';
var arrDailyDrinkData = [
    {name: "Coffee", cups: 0, amount: 0, order: 0},
    {name: "Water", cups: 0, amount: 0, order: 1},
    {name: "Tea", cups: 0, amount: 0, order: 2},
    {name: "Juice", cups: 0, amount: 0, order: 3},
    {name: "total", cups: 0, amount: 0, order: 4}
];


var visible = '';
var dateVisible = false;
var todayDate = 0;
/*var drinkGoal = [
  {amount: 1000, name: '1 Litre'},
  {amount: 1500, name: '1.5 Litres'},
  {amount: 2000, name: '2 Litres'},
  {amount: 2500, name: '2.5 Litres'},
  {amount: 3000, name: '3 Litres'},
  {amount: 3500, name: '3.5 Litres'},
  {amount: 4000, name: '4 Litres'},
];
var setGoal = 0;*/
// Hide/Show functions --------------------------------

$('#drinkDisplayCoffee').hide();
$('#drinkDisplayJuice').hide();
$('#drinkDisplayTea').hide();
$('#drinkDisplayWater').hide();
$('#todayDate').hide();
$('#submitDate').hide();


//date picker --------------------------------

$('#month').click(function(){
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
  todayDate = $('#todayDate').val();
  $('#todayDate').hide();
  $('#submitDate').hide();
  $('#day').text(todayDate);
  $('#day').show();
});

//drink ammount function --------------------------------
$('#hundredMl').click(function(){
    var drinkAmount = 100;
    drinkData(drinkAmount);
    console.log(arrDailyDrinkData);
    //var meterAmount = 10;
});
$('#twoFiftyMl').click(function(){
    var drinkAmount = 250;
    drinkData(drinkAmount);
  console.log(arrDailyDrinkData);
});
$('#sixHundredMl').click(function(){
  var drinkAmount = 600;
  drinkData(drinkAmount);
  console.log(arrDailyDrinkData);
});
$('#eightFiftyMl').click(function(){
  var drinkAmount = 850;
  drinkData(drinkAmount);
  console.log(arrDailyDrinkData);
});
$('#litre').click(function(){
  var drinkAmount = 1000;
  drinkData(drinkAmount);
  console.log(arrDailyDrinkData);
});

//drink bar
$('#drinkGoal').click(function(){

  
});

  //drink data function
function drinkData(drinkAmount){
  //drink ammount will be chosen
  arrDailyDrinkData[4].amount +=drinkAmount;
  arrDailyDrinkData[4].cups +=1;
  //casewhere used to check which div is visible
    switch (visible){
      case 'c': 
        arrDailyDrinkData[0].amount +=drinkAmount;
        arrDailyDrinkData[0].cups +=1;
        var tempDrink = {Name: 'coffee', Cups: 1, Amount: drinkAmount, Date: todayDate };
        addDrink(tempDrink, url, apikey);
        //$("#drinkMeter").css({ width: "+=100%"});

      break;
      case 'w': 
        arrDailyDrinkData[1].amount +=drinkAmount;
        arrDailyDrinkData[1].cups +=1;
        var tempDrink= {Name: 'water', Cups: 1, Amount: drinkAmount, Date: todayDate };
        addDrink(tempDrink, url, apikey);
      break;
      case 't': 
        arrDailyDrinkData[2].amount +=drinkAmount;
        arrDailyDrinkData[2].cups +=1;
        var tempDrink= {Name: 'tea', Cups: 1, Amount: drinkAmount, Date: todayDate  };
        addDrink(tempDrink, url, apikey);
      break;
      case 'j': 
        arrDailyDrinkData[3].amount +=drinkAmount;
        arrDailyDrinkData[3].cups +=1;
        var tempDrink= {Name: 'juice', Cups: 1, Amount: drinkAmount, Date: todayDate };
        addDrink(tempDrink, url, apikey);
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

//REST.DB functons-------------------------------
function addDrink(item, url, apikey){
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
      console.log('Item successfully added');
      console.log(response);
  });
}



//Navigation - sliders -------------------------------

$('#naviCloseBtn').hide();

//change size of div to imitate sliding
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

//access new html
$('#stats').click(function(){
  location.href='../test/test.html?';
});


$('#user').click(function(){
  location.href='../login/login.html?';
});
