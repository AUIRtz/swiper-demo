let $slides = $('#slides') //出错环节
let $images = $slides.children('img') //出错环节
let $buttons = $('#buttons > button')
let current = 0
fakeImages()
$slides.css({transform: 'translateX(-500px)'})
bindEvents()
$('#previous').on('click',() =>{
    gotoSlide(current+1)
})
$('#next').on('click',() =>{
    gotoSlide(current+1)
})
function bindEvents(){
    $('#buttons').on('click','button',(aim) =>{
        let $button = $(aim.currentTarget)
        let index = $button.index()
        gotoSlide(index)
    })
}
function gotoSlide(index){ //错误环节 忘记了用到外面作用域index变量
  if(index > $buttons.length - 1){
    index = 0
  }else if(index < 0){
    index = $buttons.length - 1
  }
  console.log('current', 'index')
  console.log(current, index)
    if(current === $images.length - 1 && index === 0){
    $slides.css({transform: `translateX(${-($buttons.length+1) * 500}px)`})
    .one('transitionend',() =>{
      $slides.hide()
      $slides.offset() //出错环节。。。总是忘记添加括号
      $slides.css({transform: `translateX(${-(index+1) * 500}px)`}).show()
    })
  }else if(current === 0 && index === $buttons.length - 1){  //出错环节 是else if/else if/else if 重要的事情说三遍，而不是if else
    $slides.css({transform: 'translateX(0px)'})
    .one('transitionend',() =>{
      $slides.hide()
      .offset() //出错环节。。。总是忘记添加括号
      $slides.css({transform: `translateX(${-(index+1) * 500}px)`}).show()
    })
  }else{
    $slides.css({transform: `translateX(${-(index+1) * 500}px)`})
  }
  current = index
  }

function fakeImages(){
  let $firstCopy = $images.eq(0).clone(true)
  $slides.append($firstCopy)
  let $lastCopy = $images.eq($images.length - 1).clone(true)
  $slides.prepend($lastCopy)
}
