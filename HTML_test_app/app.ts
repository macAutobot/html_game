//function onload() {
    window.onload = () => {

        //var c = document.getElementById("myCanvas");
        //var ctx = c.getContext("2d");
        //ctx.fillStyle = "#FF0000";
        //ctx.fillRect(0, 0, 150, 75);

        //var ball = new Object();
        //var terr = new Object();
        //var bottomPaddle = new Object();
        var BACKGROUND_COLOR = "#9FF781";
        var myFPS = 120;

        // Map
        var rows = 10;
        var columns = 10;
        var canvas = document.getElementById("canvas");
        //var ctx = canvas.getContext('2d');
        //var context = canvas.getContext("2d");
        var TERR_WIDTH = 60;
        var TERR_HEIGHT = 50;
       /* var terr0 = {
            id: 0,
            xPos: 0,
            yPos: 0,
            xLen: TERR_WIDTH,
            yLen: TERR_HEIGHT,
            team: 0,
            color: TERR_COLOR
        };*/
        var TERRARRAY = [];

        // Colors
        var TERR_COLOR = "rgb(102, 102, 51)";
       /* var p1_colorPicker = document.getElementById("p1_colorPicker");
        var p2_colorPicker = document.getElementById("p2_colorPicker");
        var color1 = p1_colorPicker.options[p1_colorPicker.selectedIndex].value;
        var color2 = p2_colorPicker.options[p2_colorPicker.selectedIndex].value;
        var colorButton = document.getElementById("colorButton");
      */  //var TERR_ID = ["c0"];


        var aiColor = "green";

        // Players
        var player = {
            id: 0,
            AP: 0,
            color: "red",
            terr: 0,
            terrToWin: 75
        };
        var PLAYERARRAY = [];
        var numPlayers = 2;
        var playerNum = 0;

        //var TERRARRAY = ["terr0"];

        //Init trick, may not still need, will have to test
        var once = true;
        var firstTurn = true;
        //var terr2, terr3, terr4, terr5;
        //var aiAP, playerAP;

        //var p1_color = "red";
        //var p2_color = "blue";



        //Set players color from color selection
        function setPlayerColor() {
            var p1_colorPicker = document.getElementById("p1_colorPicker");
            var p2_colorPicker = document.getElementById("p2_colorPicker");
            var color1 = p1_colorPicker.options[p1_colorPicker.selectedIndex].value;
            var color2 = p2_colorPicker.options[p2_colorPicker.selectedIndex].value;
            var colorButton = document.getElementById("colorButton");

            //var defaultColor = "red";
            //onclick='p1_colorPicker.disabled = "disabled";p2_colorPicker.disabled="disabled"'

            //if (color1 == color2) {  //!colorButton.disabled

           // alert("hi colors");
            //colorButton.options[colorButton.disabled].innerHTML = "disabled";

            //if (color1 != color2) {
              //  document.getElementById("sameColor").style.visibility = "hidden";
               // colorButton.disabled = false;
                //if (once == false) {
                //    once = true;
                    //    colorButton.options[colorButton.insertAdjacentText("afterEnd", "")];

               // }
            //}
            //alert(color2);
                //colorButton.addEventListener('click', function (evt) {
            if (color1 == color2) {
            //    alert("hi colors_same");
                colorButton.disabled = true
                     document.getElementById("sameColorMesg").style.display = "block";
                document.getElementById("sameColorMesg").style.visibility = "visible";
                //alert(colorButton.disabled);
                    //colorButton.options[colorButton.set
                    //alert(p1_colorPicker.options[p1_colorPicker.selectedIndex].innerHTML);
                    //alert(color2);
                //alert("hi colors");
                    if (once) {
                        once = false;
                        ////////////////document.getElementById("sameColorMesg").style.visibility = "hidden";
                        ////colorButton.options[colorButton.insertAdjacentHTML("afterEnd", "Hey now!  You can't both be the same color, try again.")];
                        //p2_colorPicker.options[p2_colorPicker.insertAdjacentText("afterEnd", "Hey now!  You can't both be the same color, try again.")];

                    }
             


                    //if (color1 != "r") {
                        //p2_colorPicker.options[p2_colorPicker.insertAdjacentText("afterEnd", "no!")];// = "Blue"; 
                        //color2 = "r";
                    //} else {
                    //    color2 = "b";
                    //}

            } else {
                //alert("hi colors_diff");
                    //colorButton.options[p1_colorPicker.disabled].disabled = "disabled";
                    //p2_colorPicker.options[p2_colorPicker.disabled].disabled = "disabled";
                    colorButton.disabled = false;
                    /////////document.getElementById("sameColorMesg").style.visibility = "hidden";
                    document.getElementById("sameColorMesg").style.display = "none";
            
                }
            for (var i = 0; i < numPlayers; i++) {
                var COLORARRAY = [color1, color2];
                switch (COLORARRAY[i]) {
                    case 'r':
                        PLAYERARRAY[i].color = "red";
                        break;
                    case 'b':
                        PLAYERARRAY[i].color = "blue";
                        break;
                    case 'g':
                        PLAYERARRAY[i].color = "green";
                        break;
                    case 'p':
                        PLAYERARRAY[i].color = "pink";
                        break;
                    default:
                        PLAYERARRAY[i].color = "red";
            }
            /*switch (color2) {
                case 'r':
                    p2_color = "red";
                    break;
                case 'b':
                    p2_color = "blue";
                    break;
                case 'g':
                    p2_color = "green";
                    break;
                case 'p':
                    p2_color = "pink";
                    break;
                default:
                    p2_color = "red";
            }*/
                }
            //}


            }

        function initPlayers() {
            //alert("hi_init")
            for (var i = 0; i < numPlayers; i++) {
                PLAYERARRAY.push({
                    id: i,
                    AP: 5,
                    color: "red",
                    terr: 0,
                    terrToWin: 75
                });
            }
            //alert("bye_init")
            //3/21

//            setPlayerColor();

            //3/21
        }
        //3/21
        // Init all game objects
        function initGameObjects() {
            //document.getElementById("sameColorMesg").style.visibility = "hidden";
            //document.getElementById("sameColorMesg").style.display = "none";

            //3/21  
            // Init details of players
            initPlayers();
            //3/21
            //3/21

            //setPlayerColor();

            //3/21
        
            // Create an array of territory objects
            //3/21
            var terrNum = 0;
            for (var i = 0; i < rows; i++) {
                for (var j = 0; j < columns; j++) {
                    terrNum = (10 * i + j);
                    //var tempTerrName = "terr" + terrNum; 
                    // TERRARRAY.push(tempTerrName);
                    TERRARRAY.push({
                        //TERRARRAY[terrNum] = {
                        id: terrNum,
                        xPos: 0/*terr0.xPos*/ + 50 * i,
                        yPos: 0/*terr0.yPos*/ + 50 * j,
                        xLen: TERR_WIDTH,
                        yLen: TERR_HEIGHT,
                        team: 0,
                        color: TERR_COLOR
                    });

                }
            }


            // 3/21
            //Event Handlers:

               /*  Event handler example:
                var button = document.querySelector("button");
                function once() {
                    console.log("Done.");
                    button.removeEventListener("click", once);
                }
                button.addEventListener("click", once);
                
                */
             

            //var testButton = document.querySelector(".sameColor");
            //testButton.addEventListener("click", function () {
            //    alert("Button clicked.");
            //});

            // A territory is clicked on:
            canvas.addEventListener('click', function (evt) {
                var mousePos = getMousePos(canvas, evt);
                //var tempMath = (Math.ceil(mousePos.x / 50));
                // tempMath += 10 * (Math.ceil(mousePos.y / 50) - 1);
                //var message = 'Mouse position: ' + (Math.ceil(mousePos.x / 50)) + ',' + (Math.ceil(mousePos.y / 50) - 1) + 'or' + tempMath;
                conquer(canvas, mousePos);
                //writeMessage(canvas, ctx, message);
            }, false);


            // End Turn Button
            var turnButton = document.querySelector(".turn");
            turnButton.addEventListener("click", function (turnEnd) {
                turn();
                //alert("Button clicked.");
            });

            //3/21

        }

        function getMousePos(canvas, evt) {
            var rect = canvas.getBoundingClientRect();
            return {
                x: evt.clientX - rect.left,
                y: evt.clientY - rect.top
            };
        }

        /*function writeMessage(canvas, context, message) {
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.font = '18pt Calibri';
            context.fillStyle = 'black';
            context.fillText(message, 10, 25);
        }*/
        function updateScore(/*fight1or2, index, */otherPlayer) {
            var p1_land_to_win, p2_land_to_win;

            // If terrtory is controlled:
           // if (arguments[0]) {
                // If the current player is player 1 (playerNum = 0):
                if (!playerNum) {
                    //console.log(PLAYERARRAY[playerNum].AP);
                    console.log("player color is:" + PLAYERARRAY[playerNum].color + " playerNum is: " + playerNum + "player AP is:" + PLAYERARRAY[playerNum].AP);
                    // Until I write an update score I am doing it below:
                    console.log(document.getElementById("p1_AP").innerHTML);
                    document.getElementById("p1_AP").innerHTML = "AP: " + PLAYERARRAY[playerNum].AP;
                    document.getElementById("p2_AP").innerHTML = "AP: " + PLAYERARRAY[otherPlayer].AP;
                    document.getElementById("p1_terr").innerHTML = "Land: " + PLAYERARRAY[playerNum].terr;
                    document.getElementById("p2_terr").innerHTML = "Land: " + PLAYERARRAY[otherPlayer].terr;
                    p1_land_to_win = 75 - PLAYERARRAY[playerNum].terr;
                    p2_land_to_win = 75 - PLAYERARRAY[otherPlayer].terr;
                    document.getElementById("p1_terrToWin").innerHTML = "To Win: " + p1_land_to_win;
                    document.getElementById("p2_terrToWin").innerHTML = "To Win: " + p2_land_to_win;

                // If the current player is player 2 (playerNum = 1):
                } else {
                    console.log("player color is:" + PLAYERARRAY[playerNum].color + " playerNum is: " + playerNum + "player AP is:" + PLAYERARRAY[playerNum].AP);
                    // Until I write an update score I am doing it below:
                    console.log(document.getElementById("p2_AP").innerHTML);
                    document.getElementById("p2_AP").innerHTML = "AP: " + PLAYERARRAY[playerNum].AP;
                    document.getElementById("p1_AP").innerHTML = "AP: " + PLAYERARRAY[otherPlayer].AP;
                    document.getElementById("p2_terr").innerHTML = "Land: " + PLAYERARRAY[playerNum].terr;
                    document.getElementById("p1_terr").innerHTML = "Land: " + PLAYERARRAY[otherPlayer].terr;
                    p2_land_to_win = 75 - PLAYERARRAY[playerNum].terr;
                    p1_land_to_win = 75 - PLAYERARRAY[otherPlayer].terr;
                    document.getElementById("p1_terrToWin").innerHTML = "To Win: " + p1_land_to_win;
                    document.getElementById("p2_terrToWin").innerHTML = "To Win: " + p2_land_to_win;

                }
            // If terrtory is free:
            /*} else {
                //console.log(PLAYERARRAY[playerNum].AP);
                // If the current player is player 1 (playerNum = 0):
                if (!playerNum) {
  
                console.log("player color is:" + PLAYERARRAY[playerNum].color + "playerNum is: " + playerNum + "player ap is:" + PLAYERARRAY[playerNum].AP);
                document.getElementById("p1_AP").innerHTML = "AP: " + PLAYERARRAY[playerNum].AP;
                document.getElementById("p2_AP").innerHTML = "AP: " + PLAYERARRAY[otherPlayer].AP;
                document.getElementById("p1_terr").innerHTML = "Land: " + PLAYERARRAY[playerNum].terr;
                document.getElementById("p2_terr").innerHTML = "Land: " + PLAYERARRAY[otherPlayer].terr;
                p1_land_to_win = 75 - PLAYERARRAY[playerNum].terr;
                p2_land_to_win = 75 - PLAYERARRAY[otherPlayer].terr;
                document.getElementById("p1_terrToWin").innerHTML = "To Win: " + p1_land_to_win;
                document.getElementById("p2_terrToWin").innerHTML = "To Win: " + p2_land_to_win;

                    // If the current player is player 2 (playerNum = 1):
                } else {
                    console.log("player color is:" + PLAYERARRAY[playerNum].color + "playerNum is: " + playerNum + "player ap is:" + PLAYERARRAY[playerNum].AP);
                    document.getElementById("p2_AP").innerHTML = "AP: " + PLAYERARRAY[playerNum].AP;
                    document.getElementById("p1_AP").innerHTML = "AP: " + PLAYERARRAY[otherPlayer].AP;
                    document.getElementById("p2_terr").innerHTML = "Land: " + PLAYERARRAY[playerNum].terr;
                    document.getElementById("p1_terr").innerHTML = "Land: " + PLAYERARRAY[otherPlayer].terr;
                    p2_land_to_win = 75 - PLAYERARRAY[playerNum].terr;
                    p1_land_to_win = 75 - PLAYERARRAY[otherPlayer].terr;
                    document.getElementById("p1_terrToWin").innerHTML = "To Win: " + p1_land_to_win;
                    document.getElementById("p2_terrToWin").innerHTML = "To Win: " + p2_land_to_win;

                }
            }*/
        }

        function conquer(canvas, /*ctx,*/ mousePos) {
            var index = 10 * (Math.ceil(mousePos.x / 50)-1);
            index += (Math.ceil(mousePos.y / 50) - 1);
            //alert(PLAYERARRAY[playerNum].AP);
            if (PLAYERARRAY[playerNum].AP > 0) {
                //alert("conquer_in");
                var otherPlayer = (playerNum * (-1)) + 1;
                // If terrtory is controlled:
                if ((TERRARRAY[index].color == PLAYERARRAY[otherPlayer].color) && PLAYERARRAY[playerNum].AP > 1) {
                    TERRARRAY[index].color = PLAYERARRAY[playerNum].color;//"red";
                    PLAYERARRAY[playerNum].AP -= 2;
                    PLAYERARRAY[playerNum].terr += 1;
                    PLAYERARRAY[otherPlayer].terr -= 1;
                    updateScore(/*true, index,*/ otherPlayer);
                    
                } else {
                    // If terrtory is free:
                    if (TERRARRAY[index].color == TERR_COLOR) {
                       TERRARRAY[index].color = PLAYERARRAY[playerNum].color;//"red";
                       PLAYERARRAY[playerNum].terr += 1;
                       PLAYERARRAY[playerNum].AP -= 1;
                       updateScore(/*false, index, */otherPlayer);
                    }
                    // If terrtory is yours then do nothing
                }
                //3/21
                //alert(PLAYERARRAY[playerNum].AP);
                //3/21
            }

            // Testing the below line:
            //canvas.removeEventListener("click", );
            //for (var i = 0; i>rows; i++) {
                //if (i >= Math.ceil(mousePos.x)) {

                    //for (var j = 0; j>; j++) {
                      //  var index = (10 * i + j);
                  //  }
                //}
            //}
        }
        
        function drawTerritories() {
            // Get to id for my canvas 
            //var c = document.getElementById('myCanvas');
            // Check is canvas tag is supported
            if (canvas.getContext) {
                var ctx = canvas.getContext('2d');
               // if (c.getContext) {
                 //   var ctx = c.getContext('2d');
                for (var a = 0; a < rows; a++) {
                    for (var b = 0; b < columns; b++) {
                        var index = (10 * a + b);
                        // Get Territory color from TERRARRAY
                        ctx.fillStyle = TERRARRAY[index].color;
                        
                        //context.fillRect(x,y,width,height);
                        ctx.fillRect(TERRARRAY[index].xPos, TERRARRAY[index].yPos, TERRARRAY[index].xLen, TERRARRAY[index].yLen);
                       
                        // Add a border to each territory
                        // Red rectangle
                        // context.rect(x,y,width,height);
                        ctx.beginPath();
                        ctx.lineWidth = "2";
                        ctx.strokeStyle = "rgb(51, 51, 0)";
                        ctx.rect(TERRARRAY[index].xPos, TERRARRAY[index].yPos, TERRARRAY[index].xLen, TERRARRAY[index].yLen);
                        ctx.stroke();

                    }
                }
             
                //canvas.addEventListener('click', evet, false);

                //ctx.fillStyle = "rgb(0, 0, 200)";
                //ctx.fillRect(30, 30, 55, 50);
            } else {
            // Add code for browsers with no canvas support 
            }

        }



        //Object based Territory mapping
        //function drawTerritories() {
        //	context.fillStyle = terrColor;  //color for inside shapes
        //    context.fillRect(terr.x,terr.y,TERR_WIDTH,TERR_HEIGHT); // draw top paddle
        //}

       
       
        function getCursorPosition(canvas, event) {
            var rect = canvas.getBoundingClientRect();
            var x = event.clientX - rect.left;
            var y = event.clientY - rect.top;
            //alert("x: " + x + " y: " + y);
            console.log("x: " + x + " y: " + y);
        }

        ////////////


       // var once = true;
        function endTurn(value) {

           // if (once == true) {
               // playerAP = value;
                //aiAP = value;
            //} else {


            //} 


        }


        function computerAI() {


        
        }


/*        function newTerr(playerNum) {
            PLAYERARRAY[playerNum].terr = 0;
            for (var a = 0; a < rows; a++) {
                for (var b = 0; b < columns; b++) {
                    var index = (10 * a + b);
                    
            
                    if (PLAYERARRAY[playerNum].color == TERRARRAY[index].color) {
                        PLAYERARRAY[playerNum].terr += 1;
                      //  alert("huh1");

                    }
                    //alert("huh2");
                }
            }
            //alert(PLAYERARRAY[playerNum].terr);
            return PLAYERARRAY[playerNum].terr;
        }*/

        //Check if player has won
        function win(playerNum) {
            document.getElementById("winning").style.visibility = "hidden";
            document.getElementById("playAgainMesg").style.visibility = "hidden";
            //alert("huh2");
            for (var i = 0; i < numPlayers; i++) {
                //alert("huh");
                //var terr = [];
                //terr.push(newTerr(i));
                //newTerr(i)
                //alert("what");
                if (PLAYERARRAY[i].terr >= 75) {
                    //This means they won!
                    document.getElementById("winning").style.visibility = "visible";
                    document.getElementById("playAgainMesg").style.visibility = "visible";
                    document.getElementById("yes").style.visibility = "visible";
                    document.getElementById("no").style.visibility = "visible";
                    // Need to write code to make these button do something
                }

            }
            return PLAYERARRAY[playerNum].terr;
        }

        // This functions controls what happens in a turn
        function turn() {
            /* What should happen in a turn:
            1. Have player colors been selected? Check once at start of game
            2. Check is anyone won, end game if yes
            3. Update who's turn it is on screen
            4. Calculate and update curent player's AP
            5. Player claims land
            6. Player Clicks end turn
            */
            //alert("almost");
            // Check is players have picked colors
    //3/21        if (!document.getElementById("colorButton").disabled && (document.getElementById("p1_colorPicker").style.visibility == "disabled"))/*  color1 != color2)*/ {
     //3/21           alert("it works");

                // This defines which player's turn it is, either 0 or 1.
            playerNum = (playerNum * (-1)) + 1;
            var otherPlayer = (playerNum * (-1)) + 1;
            // show result of this on screen ^^^


            // Update the color and text of the center to match the current player:
            console.log(document.getElementById("whoTurn_a").innerHTML);
            //If it is player 1's turn
            if (!playerNum) {
                document.getElementById("whoTurn_a").innerHTML = "Player 1's";
                document.getElementById("whoTurn_a").style.color = PLAYERARRAY[playerNum].color;
                document.getElementById("whoTurn_b").style.color = PLAYERARRAY[playerNum].color;

            // If it is player 2's turn
            } else {
                document.getElementById("whoTurn_a").innerHTML = "Player 2's";
                document.getElementById("whoTurn_a").style.color = PLAYERARRAY[playerNum].color;
                document.getElementById("whoTurn_b").style.color = PLAYERARRAY[playerNum].color;

            }        

            //Check if someone won and return new AP earned
            //3/21



            var totalTerr = win(playerNum);
            // 3/21
            //var addAP = Math.ceil(terr[playerNum] / 2);
            var addAP = Math.ceil(totalTerr / 2);

            //alert(addAP);
            if (addAP < 3 && PLAYERARRAY[playerNum].AP < 3) {
                PLAYERARRAY[playerNum].AP = 3;
                //return addAP;
            } else {
                //return 3;
                //}
                //3/21

                //alert(totalTerr);

                // 3/21
                if (!firstTurn) {  // This keeps player 2 from getting free AP on their first turn
                    // Add new AP to current player at start of turn
                    PLAYERARRAY[playerNum].AP += addAP;
                } else {
                    firstTurn = false;
                }
            }
            updateScore(otherPlayer);
            // Test the next 2 line to update the score on the boards, commented out for now:
            //var endTurn = document.getElementById(".turn");
            //Here should 9once implemented right print the new text in the table cell I tell it to
            //turn.options[colorButton.insertAdjacentText("afterEnd", "")];


            //console.log("It's your turn, your ap is:");
            //console.log(PLAYERARRAY[playerNum].AP);
                // show result of this on screen ^^^
            //3/21
        } 


        function territoryGame() {
            //drawBackground();
            //drawTable();
            //setPlayerColor();
            //alert("hi1")
            drawTerritories();
            //3/21
            // Polling this for now, write an interuppt handler later:
            setPlayerColor();

            //3/21
        
            
            //alert("hi2")
            //3/21
//            initPlayers();
            //3/21
           // alert("hi1")
            //mouseDown();
            //alert("hi2")
            computerAI();
            //alert("hi3")
            //relMouseCoords(event);
            //alert("hi4")

//3/21
      //      turn();
        //    turn();
          
            //3/21
              //alert("hi5")



        }

        initGameObjects();
        window.setInterval(territoryGame, 1000 / myFPS); //start game loop

    };

/*

class Greeter {
    element: HTMLElement;
    span: HTMLElement;
    timerToken: number;

    constructor(element: HTMLElement) {
        this.element = element;
        this.element.innerHTML += "The time is: ";
        this.span = document.createElement('span');
        this.element.appendChild(this.span);
        this.span.innerText = new Date().toUTCString();
    }

    start() {
        this.timerToken = setInterval(() => this.span.innerHTML = new Date().toUTCString(), 500);
    }

    stop() {
        clearTimeout(this.timerToken);
    }

}*/

//window.onload = () => {
    //var el = document.getElementById('content');
    //var greeter = new Greeter(el);
    //greeter.start();
//};