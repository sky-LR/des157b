(function(){
    "use strict";

    const table = document.querySelector('table');

    async function getData(){
        const meals = await fetch('data/data.json');
        const data = await meals.json();
        const values = Object.values(data);
        console.log(outputHTML(values));

        table.innerHTML = outputHTML(values);
    }

    function outputHTML(data){
        //create a tr for the day
        //create a td for each meal within the day
        //deal with verticality in css

        let html = '';


        data.forEach( function(eachDay){
            html += "<tr>";
            html += `<th>${eachDay.name}</th>`

                if(eachDay.meal1){
                    html += `<td> <h3 class="mealName">${eachDay.meal1.name}</h3>`
                    html += `<p class="mealDesc">${eachDay.meal1.description}<p></td>`
                }
                if(eachDay.meal2){
                    html += `<td> <h3 class="mealName">${eachDay.meal2.name}</h3>`
                    html += `<p class="mealDesc">${eachDay.meal2.description}<p></td>`
                }
                if(eachDay.meal3){
                    html += `<td> <h3 class="mealName">${eachDay.meal3.name}</h3>`
                    html += `<p class="mealDesc">${eachDay.meal3.description}<p></td>`
                }

                html += "</tr>";
        })

        return html;
    }

    getData();
}())