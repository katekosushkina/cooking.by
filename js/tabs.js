$(document).ready(function(){

  $( "#autocomplete" ).focus();
  $.ajax({
  url: "https://raw.githubusercontent.com/katekosushkina/cooking.by/master/food.json",
}).done(function(text) {
  let data = JSON.parse(text);
  data.tabs.map((tab, i)=>{
    console.log(tab.name);
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
      `<div class="cont">
        <div class="name"> ${food.name}
          <i class="far fa-heart" id="pic_${i}_${j}"></i> </div>
        <img src="${food.img}">
      </div>`
    });
    $("#myTabContent").append(
      `<div class="tab-pane fade show ${activeClass}" id="tab${i}" role="tabpanel" aria-labelledby="home-tab">
        ${foodList}
      </div>`)
  });
});

$("body").on('click', ".fa-heart", function(){
  $(this).toggleClass('far').toggleClass('fas');
  let id = $(this).attr("id");
  if ($(this).hasClass('fas')){
    localStorage.setItem(id, true);
    console.log(id, localStorage.getItem(id))
  } else {
    localStorage.removeItem(id);
  }
})

$("#checkbox").on('click', function(){
  if ($(this).prop("checked")) {
  $(".far").closest('.cont').hide();
} else {
$(".far").closest('.cont').show();
}
})


});
