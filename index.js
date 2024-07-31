var colors = ['blue','red','green','yellow']
var gamepattern = []
var userclickedpatt = []
function nextseq(){
    userclickedpatt = []
    $(document).unbind()
    level++;
    $('h1').text('Level ' + level)
    var randomNum = Math.round((Math.random()*3))
    var randchosencol = colors[randomNum]
    gamepattern.push(randchosencol)
    $('#' + randchosencol).fadeOut(1).fadeIn(1)
    console.log(gamepattern + "Random HANDLER")
    playAnim(randchosencol)
    playSound(randchosencol)

}
$('.btns').on("click",function(){
    var userchosencol = this.getAttribute('id')
    userclickedpatt.push(userchosencol)
    console.log(userclickedpatt + "BTN HANDLER")
    playSound(userchosencol)
    playAnim(userchosencol)
    checkans(userclickedpatt.length-1)
})
function playSound(name){
    sound = new Audio('sounds/' + name + '.mp3')
    sound.play()   
}
function playAnim(chosencolor){
    var clicked = $('#'+chosencolor)
    clicked.addClass('pressed')
    console.log(clicked.attr('class'))

    setTimeout(function(){
        clicked.removeClass('pressed')
    },200)
}
var toggler = false
var level = 0
if (toggler===false){
    $(document).on('keypress',function(e){
        if (e.key == "a"){
           nextseq() 
           toggler = true
        }   
    })        
}
function checkans(currentLevel){
    if (gamepattern[currentLevel] == userclickedpatt[currentLevel]){

        if (gamepattern.length==userclickedpatt.length) {
            
            setTimeout(function(){nextseq()},1000)
        }      
    }
    else{
        playSound("wrong");
        $("body").addClass("wrong");
        setTimeout(function () {
            $("body").removeClass("wrong");
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart");
        gamepattern= []
        toggler = false
        level = 0
        if (toggler===false){
            $(document).on('keypress',function(e){
                nextseq() 
                toggler = true
                
            })
        }    
    }
}