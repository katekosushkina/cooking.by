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
                </div>
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
  if ($("#checkbox").prop("checked")) {
  $(".far").closest('.cont').hide();
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
                <div class="name">${food.name}
                </div>
                <img src="${food.img}" class="foodImg">
                <div class="components"><b>${food.components.join('<br>')}</b>
                </div>
                <div class="recipe" style="border:1px solid black">${food.recipe}
                </div>
                <a href="#top" onclick="window.scrollTo(0,0);return!1;">Наверх</a>`)
                $("#currentRecipe").css({'position': 'absolute','z-index': '9999', 'height': '1000px', 'width': '100%', 'clear': 'both', 'background-color':'white' });
            }
        });
      });
  });

});
$("body").on('click', "#divEnter", function(){
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
});

$("body").on('click', "#divRegistration", function(){
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
});

localStorage.setItem("kate.kosushkina@gmail.com", "kate");
console.log(localStorage.key("kate"));

$("body").on('click', "#enter", function(){
  let email = $("#exampleInputEmail1").val();
  let password = $("#exampleInputPassword1").val();
  if (localStorage.getItem(email) === password) {
      $(".buttons").html(`<button type="button" id="getOut">Выход</button>
      <b>${email}</b>`);
  } else if (!(localStorage.getItem(email))) {
    alert("Такого пользователя нет!");
  }
  else {
     alert("Неправильный пароль!");
  }
});
$("body").on('click', "#registration", function(){
  let email = $("#inputEmail4").val();
  let password = $("#inputPassword4").val();
  if (!(localStorage.getItem(email))) {
      localStorage.setItem(email, password);
      alert("Регистрация успешно пройдена!");
      $(".buttons").html(`<button type="button" id="getOut">Выход</button>
      <b>${email}</b>`);
  }
  else {
     alert("Такой email уже зарагистрирован!");
  }

});
$("body").on('click', "#getOut", function(){
  $(".buttons").html(`<button type="button" id="divEnter">Вход</button>
  <button type="button" id="divRegistration">Регистрация</button>
  `);
});

$("body").on('click', "#addRecipe", function(){
  $("#currentRecipe").empty();
  $("#currentRecipe").append(
      `<button type="button" onclick="removeCurrentRecipe()">назад</button>
      <form>
          <div class="form-group">
            <label for="formGroupExampleInput">Введите название</label>
            <input type="text" class="form-control" id="formGroupExampleInput" placeholder="Название">
          </div>
          <div style="position:relative;">
                <a class='btn btn-primary' href='javascript:;'>
                  Загрузите картинку
                  <input type="file" style='position:absolute;z-index:2;top:0;left:0;filter: alpha(opacity=0);-ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";opacity:0;background-color:transparent;color:transparent;' name="file_source" size="40"  onchange='$("#upload-file-info").html($(this).val());'>
                </a>
                &nbsp;
                <span class='label label-info' id="upload-file-info"></span>
          </div>
          <div class="form-group">
            <label for="formGroupExampleInput2">Введите компоненты</label>
            <input type="text" class="form-control" id="formGroupExampleInput2" placeholder="Компоненты">
          </div>

          <div class="form-group">
            <label for="formGroupExampleInput2">Введите рецепт</label>
            <input type="text" class="form-control" id="formGroupExampleInput3" placeholder="Рецепт">
          </div>
     </form>
      <a href="#top" onclick="window.scrollTo(0,0);return!1;">Наверх</a>`)
      $("#currentRecipe").css({'position': 'absolute','z-index': '9999', 'height': '1000px', 'width': '100%', 'clear': 'both', 'background-color':'white' });

});
});
