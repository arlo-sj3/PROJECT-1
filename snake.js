$(document).ready(function(){
  $.get('https://g-spoon.herokuapp.com/food/trivia/random',function(data){
    console.log(data)
  })
})
