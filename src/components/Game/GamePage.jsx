import React from "react";

class GamePage extends React.Component{
    render() {
        return (
        <div id="game" class="content">
            <h2 class="output">Жизнь бомжа</h2>
            <div>
                <span id="rpg-title" class="output"></span>
            </div>
            <div id="stats"></div>
            <div>
                <p id="rpg-description" class="output">

                </p>
            </div>
            <div class="flex_r">
            <div class="flex_c">
                <div class="output">MY ITEMS</div>
                <div id="items"></div>
            </div>
                <image width="500px" height="400px" id="rpg-image" src=""></image>
            </div>
                
            <div class="flex_r">
                
                <div class="flex_c" id="mathGame">
                    <input id="answer" type="text" placeholder="сходится?"/>
                    <div id="exercise"></div>
                    <button class="button1" id="sendAnswer">Ответить</button>
                </div>
            </div>
            <div id="exits" class="backgroundG">

            </div>
        </div>
        );
    }
}

export default GamePage;