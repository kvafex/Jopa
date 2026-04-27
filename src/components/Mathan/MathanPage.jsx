import React from "react";

class MathanPage extends React.Component{
    render() {
        return (
        <div id="math" class="content">
            <input placeholder="formula" id="formula"></input>
            <input placeholder="number" id="number"></input>
            <input placeholder="epsilon" id="epsilon"></input>
            <button id="doMathBitch">doMathBitch</button>

            <div id="showMathValue"></div>
            <div id="showMathSum"></div>
            <div id="showLimit"></div>
            <div id="showConvergent"></div>
        </div>
        );
    }
}

export default MathanPage;