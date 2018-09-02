function removeCurrentRecipe(){
  $("#currentRecipe").html('');
  $("#currentRecipe").css({'position': 'absolute','z-index': '0', 'height': '0', 'width': '0', 'clear': 'both', 'background-color':'white' });
};

function divGetOut(){
  $(".buttons").html(`<button type="button" onclick="divEnter()">Вход</button>
<button type="button" onclick="divRegistration()">Регистрация</button>`);
};

function findRecipe(){
  $('.name').each(function(index,elem) {
    var length = $('.name').length;
    let ac = $("#autocomplete").val();
    $.ajax({
    url: "https://raw.githubusercontent.com/katekosushkina/cooking.by/master/food.json",
  }).done(function(text) {
    let data = JSON.parse(text);
    data.tabs.map((tab, i)=>{
      tab.foodList.map((food, j)=>{
        var foodName = food.name;
        if (ac===foodName){
          $("#currentRecipe").empty();
          $("#currentRecipe").append(
              `<button type="button" onclick="removeCurrentRecipe()">назад</button>
                <div class="name">${food.name}
                  <i class="far fa-heart pic_${i}_${j}"></i> </div>
                <img src="${food.img}" class="foodImg">
              <div class="components"><b>${food.components.join('<br>')}</b>
              </div>
              <div class="recipe" style="border:1px solid black">${food.recipe}
              </div>
              <a href="#top" onclick="window.scrollTo(0,0);return!1;">Наверх</a>`)
              $("#currentRecipe").css({'position': 'absolute','z-index': '999999', 'height': '1000px', 'width': '100%', 'clear': 'both', 'background-color':'white' });
          return false;
          } else if(index===length-1){
            alert("Такого рецепта нет!")
          }
          index ++;
          });
      });
    });

  return false;
});

};
function divEnter(){
  $("#enterDiv").empty();
  $("#enterDiv").append(
            `<form>
  <div class="form-group">
    <label for="exampleInputEmail1">Email address</label>
    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
    </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Password</label>
    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
  </div>
  <button type="submit" class="btn btn-primary" id="enter">Submit</button>
</form>`);
    $("#enterDiv").css({'position': 'relative','z-index': '999999', 'height': '1000px', 'width': '100%', 'clear': 'both', 'background-color':'white','margin-top':'30px' });
};
function  divRegistration(){
  $("#enterDiv").empty();
  $("#enterDiv").append(
    `<form>
  <div class="form-row">
    <div class="form-group col-md-6">
      <label for="inputEmail4">Email</label>
      <input type="email" class="form-control" id="inputEmail4" placeholder="Email">
    </div>
    <div class="form-group col-md-6">
      <label for="inputPassword4">Password</label>
      <input type="password" class="form-control" id="inputPassword4" placeholder="Password">
    </div>
  </div>
  <div class="form-group">
    <label for="inputName">Name</label>
    <input type="text" class="form-control" id="inputName" placeholder="Kate Kosushkina">
  </div>
  <button type="submit" class="btn btn-primary" id="registration">Sign in</button>
</form>
`);
   $("#enterDiv").css({'position': 'relative','z-index': '999999', 'height': '1000px', 'width': '100%', 'clear': 'both', 'background-color':'white','margin-top':'30px' });
};

$(document).ready(function(){

  $("#autocomplete").focus();
  $("#autocomplete").keydown(function(e) {
    if(e.keyCode === 13) {
    findRecipe();
    }
  });
  let options = {
      source: ["Оливье","Цезарь","Борщ", "Холодник","Стейк","Карбонара"],
      minLength: 2
  };
  let selector = '#autocomplete';
  $(document).on('keydown.autocomplete', selector, function() {
      $(this).autocomplete(options);
  });

  $.ajax({
  url: "https://raw.githubusercontent.com/katekosushkina/cooking.by/master/food.json",
}).done(function(text) {
  let data = JSON.parse(text);
  data.tabs.map((tab, i)=>{
    let foodList = "";
    let activeClass = i===0?'active':'';
    $("#myTab").append(`
      <li class="nav-item">
        <a class="nav-link ${activeClass}" id="home-tab" data-toggle="tab"
        href="#tab${i}" role="tab" aria-controls="home" aria-selected="true">
        ${tab.name}</a>
      </li>`)
    tab.foodList.map((food, j)=>{
      foodList +=
      `<div class="cont" id="cont_${i}_${j}">
        <div class="name">${food.name}
          <i class="far fa-heart pic_${i}_${j}"></i> </div>
        <img src="${food.img}" class="foodImg">
      </div>`
    });
    $("#myTabContent").append(
      `<div class="tab-pane fade show ${activeClass}" id="tab${i}" role="tabpanel" aria-labelledby="home-tab">
        ${foodList}
      </div>`)
  });
});

$("body").on('click', ".nav", function(){
  removeCurrentRecipe();
});

$("body").on('click', ".fa-heart", function(){
  $(this).toggleClass('far').toggleClass('fas');
  let clas = $(this).attr("class");
  if ($(this).hasClass('fas')){
    localStorage.setItem(clas, true);
  } else {
    localStorage.removeItem(clas);
  }
})

$("#checkbox").on('click', function(){
  if ($(this).prop("checked")) {
  $(".far").closest('.cont').hide();
} else {
$(".far").closest('.cont').show();
}
})

$("body").on('click', ".foodImg", function(){
  let id = "#"+$(this).parent().attr('id');
  inf = ($(id).html());
  imgSrc = $(this).attr('src');
  $.ajax({
  url: "https://raw.githubusercontent.com/katekosushkina/cooking.by/master/food.json",
}).done(function(text) {
  let data = JSON.parse(text);
  data.tabs.map((tab, i)=>{
    tab.foodList.map((food, j)=>{
      let foodImg = food.img;
      if (imgSrc===foodImg){
            $("#currentRecipe").empty();
            $("#currentRecipe").append(
                `<button type="button" onclick="removeCurrentRecipe()">назад</button>
                ${inf}
                <div class="components"><b>${food.components.join('<br>')}</b>
                </div>
                <div class="recipe" style="border:1px solid black">${food.recipe}
                </div>
                <a href="#top" onclick="window.scrollTo(0,0);return!1;">Наверх</a>`)
                $("#currentRecipe").css({'position': 'absolute','z-index': '999999', 'height': '1000px', 'width': '100%', 'clear': 'both', 'background-color':'white' });
            }
        });
      });
  });

});
localStorage.setItem("kate.kosushkina@gmail.com", "kate");
localStorage.setItem('name', 'Kate Kosushkina');
console.log(localStorage.key("kate"));
$("body").on('click', "#enter", function(){
  let email = $("#exampleInputEmail1").val();
  let password = $("#exampleInputPassword1").val();
  var name1 = localStorage.getItem('name');
  if (localStorage.getItem(email) === password) {
      $(".buttons").html(`<button type="button" onclick="divGetOut()">Выход</button>
      <b>${name1}</b>`);
  }
});
$("body").on('click', "#registration", function(){
  let email = $("#inputEmail4").val();
  let password = $("#inputPassword4").val();
  localStorage.setItem(email, password);
  localStorage.setItem('name', name);
  $(".buttons").html('<button type="button" onclick="divGetOut()">Выход</button>');
});

});
