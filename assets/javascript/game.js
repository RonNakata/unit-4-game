// The gladiators
var swordsman = {
    name:"swordsman",
    health:120, 
    attackPower:8,
    baseAP:8,
    counterAP:8

};
var archer = {
    name:"archer",
    health:100, 
    attackPower:10,
    baseAP:10,
    counterAP:10

};
var barbarian = {
    name:"barbarian",
    health:150, 
    attackPower:15,
    baseAP:15,
    counterAP:14

};
var orc = {
    name:"orc",
    health:180, 
    attackPower:20,
    baseAP:20,
    counterAP:25

};

// var for string of name of chosen character
var chosenchar="";
// var for strig of name of chosen current opponent
var chosenopp="";
// var to store the chosen current opponents div for later removal
var oppdiv={};
// var to store how many opponents have been defeated
var numdefeated=0;
//keep track of how many selections were made
var pickCount=0;

// Function to populate health on screen
function popHealth(){
    $('#h1').text(swordsman.health);
    $('#h2').text(archer.health);
    $('#h3').text(barbarian.health);
    $('#h4').text(orc.health);    
}


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
    numdefeated++;
}

function youlose() {
    $('#attackmessage1').text("You lose.");
    $('#attackmessage2').html("<button type=\"button\" id=\"btn_reload\">Restart</button>");
}

function youwin() {
    $('#attackmessage1').text("You have defeated all opponents & win the game.");
    $('#attackmessage2').html("<button type=\"button\" id=\"btn_reload\">Restart</button>");
}


$(document).ready(function() {

    // populate beginning health
    popHealth();

    // Restart the game when dynamically generated reset button appears
    $(document).on ("click", "#btn_reload", function(){
        console.log("is this doing anything??");
        location.reload(true); 
    
    });

// Function for when gladiator's are clicked on
    $('[class="choices"]').click(function() {
// First click, moves choice to char and sets char in global var
        if (pickCount===0) {
            pickCount++;
            $(this).appendTo('.character');
            chosenchar=($(this).attr("id"));
        }
// second click move choice to opponent field and sets oppponent global var
        else if (pickCount===1) {
            pickCount++;
            oppdiv=this;
            $(this).appendTo('.opponent');
            chosenopp=($(this).attr("id"));
        }
// don't let another selection be made until second pick is defeated
        else if ( (pickCount===2) && (numdefeated===1) ) {
            pickCount++;
            oppdiv=this;
            $(this).appendTo('.opponent');
            chosenopp=($(this).attr("id"));
        }
// last selection can only be made after previous two are defeated
        else if ( (pickCount===3) && (numdefeated===2) ) {
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
        if ( window[chosenopp].health > 0 ) {
        window[chosenchar].health=(window[chosenchar].health - window[chosenopp].counterAP)
        }
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

        if ( (window[chosenopp].health <= 0) && (window[chosenchar].health >0) ) {
            oppdiv.remove();
            defeated();
            if(pickCount===4){
                youwin();
            }
        }

    });

});

    


