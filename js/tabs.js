function removeCurrentRecipe(){
  $("#currentRecipe").html('');
  $("#currentRecipe").css({'position': 'absolute','z-index': '0', 'height': '0', 'width': '0', 'clear': 'both', 'background-color':'white' });
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
  $("#enter").empty();
  $("#enter").append(
            `<form>
  <div class="form-group">
    <label for="exampleInputEmail1">Email address</label>
    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Password</label>
    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
  </div>
  <div class="form-check">
    <input type="checkbox" class="form-check-input" id="exampleCheck1">
    <label class="form-check-label" for="exampleCheck1">Check me out</label>
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
</form>`)
          $("#enter").css({'position': 'relative','z-index': '999999', 'height': '1000px', 'width': '100%', 'clear': 'both', 'background-color':'white','margin-top':'30px' });
};
function  divRegistration(){
  $("#enter").empty();
  $("#enter").append(
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
    <label for="inputAddress">Address</label>
    <input type="text" class="form-control" id="inputAddress" placeholder="1234 Main St">
  </div>
  <div class="form-group">
    <label for="inputAddress2">Address 2</label>
    <input type="text" class="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor">
  </div>
  <div class="form-row">
    <div class="form-group col-md-6">
      <label for="inputCity">City</label>
      <input type="text" class="form-control" id="inputCity">
    </div>
    <div class="form-group col-md-4">
      <label for="inputState">State</label>
      <select id="inputState" class="form-control">
        <option selected>Choose...</option>
        <option>...</option>
      </select>
    </div>
    <div class="form-group col-md-2">
      <label for="inputZip">Zip</label>
      <input type="text" class="form-control" id="inputZip">
    </div>
  </div>
  <div class="form-group">
    <div class="form-check">
      <input class="form-check-input" type="checkbox" id="gridCheck">
      <label class="form-check-label" for="gridCheck">
        Check me out
      </label>
    </div>
  </div>
  <button type="submit" class="btn btn-primary">Sign in</button>
</form>
`)
   $("#enter").css({'position': 'relative','z-index': '999999', 'height': '1000px', 'width': '100%', 'clear': 'both', 'background-color':'white','margin-top':'30px' });
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

});
