// The gladiators
var swordsman = {
    name:"swordsman",
    health:100, 
    attackPower:5,
    baseAP:5, 
    counterAP:15,
    image:"swordsman.png",
    selected:false,
    opponent:false,
    id:"h1"
};
var archer = {
    name:"archer",
    health:120, 
    attackPower:10,
    baseAP:10,
    counterAP:20,
    image:"archer.png",
    selected:false,
    opponent:false,
    id:"h2"
};
var barbarian = {
    name:"barbarian",
    health:140, 
    attackPower:15,
    baseAP:15,
    counterAP:25,
    image:"barbarian.png",
    selected:false,
    opponent:false,
    id:"h3"
};
var orc = {
    name:"orc",
    health:160, 
    attackPower:20,
    baseAP:20,
    counterAP:30,
    image:"orc.png",
    selected:false,
    opponent:false,
    id:"h3"
};
 
var chosenchar="";
var chosenopp="";
var oppdiv={};

// Function to populate health on screen
function popHealth(){
    $('#h1').text(swordsman.health);
    $('#h2').text(archer.health);
    $('#h3').text(barbarian.health);
    $('#h4').text(orc.health);    
}

// populate beginning health
popHealth();

// Function to display damage messages
function damagemessage() {
    yourdamagenum=(window[chosenchar].attackPower);
    enemydamagenum=(window[chosenopp].counterAP);
    $('#attackmessage1').text("You have attacked " + chosenopp + " for " + yourdamagenum);
    $('#attackmessage2').text(chosenopp + " has attacked you for " + enemydamagenum);
}

// Function for self explanatory messages
function defeated() {
    $('#attackmessage1').text("You have defeated " + chosenopp + ".");
    $('#attackmessage2').text("Please select another opponent.");
}

function youlose() {
    $('#attackmessage1').text("You lose.");
    $('#attackmessage2').html("<button type=\"button\" id=\"btn_reload\">Restart</button>");
}

function youwin() {
    $('#attackmessage1').text("You have defeated all opponents & win the game.");
    $('#attackmessage2').html("<button type=\"button\" id=\"btn_reload\">Restart</button>");
}



var pickCount=0;

$(document).ready(function() {

// First click, moves choice to char and sets char in global var
    $('[class="choices"]').click(function() {
        if (pickCount===0) {
            pickCount++;
            $(this).appendTo('.character');
            chosenchar=($(this).attr("id"));
        }
// subsequent clicks move choice to opponent field and sets oppponent global var
        else {
            pickCount++;
            oppdiv=this;
            $(this).appendTo('.opponent');
            chosenopp=($(this).attr("id"));
        }

    });

// Clicking the attack button 
    $('#attackButton').click(function() {

        if ( (window[chosenchar].health > 0) && (window[chosenopp].health > 0)) {

        // Opponent health decrements by character attack
        window[chosenopp].health=(window[chosenopp].health - window[chosenchar].attackPower)
        // Character health decrements by opponent counterattack
        window[chosenchar].health=(window[chosenchar].health - window[chosenopp].counterAP)
        //triger damage message
        damagemessage();
        // increase your attack power by base ap
        window[chosenchar].attackPower=(window[chosenchar].attackPower+window[chosenchar].baseAP)
        // Update health display
        popHealth();

        }

        if ( window[chosenchar].health <= 0 ) {
            youlose();
        }

        if ( window[chosenopp].health <= 0 ) {
            oppdiv.remove();
            defeated();
            if(pickCount===4){
                youwin();
            }
        }

    });

});

    // Restart the game
    $("#btn_reload").click(function(){
        console.log("is this doing anything??");
        // location.reload(true); 
    
    });


