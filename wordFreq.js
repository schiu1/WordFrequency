document.getElementById('calcButton').addEventListener('click', WordFrequency);

function resetCanvas(){
    const chartElem = document.getElementById('chartOutput')
    chartElem.remove();
    const newChart = document.createElement("canvas");
    newChart.id = "chartOutput";
    newChart.style = "width: 100%; max-width: 700px;";
    document.getElementById('output').appendChild(newChart);
}

function WordFrequency(){
    if (document.getElementById('inputText').value == ""){
        alert("Missing Text");
        return;
    }
    const text = document.getElementById('inputText').value.toLowerCase();
    const noPunc = text.replace(/[\,\.\!\?]/g,""); //regex means any characters that are , . ! or ?
    const words = noPunc.split(" ");
    const wordMap = new Map();
    for(const word of words){
        let keys = [...wordMap.keys()];
        if(keys.includes(word)){
            wordMap.set(word, wordMap.get(word) + 1);
        }
        else {
            wordMap.set(word, 1);
        }
    }
    //sort normally sorts in ascending order, but since I want descending order, 
    //i flip the comparison func to produce the opposite result every time

    //from what I saw, positive means flip it since it wants to be negative(ascending order),
    //but we can manipulate it to do the reverse thinking it'll keep sorting in ascending order
    //basically every positive would instead be negative and vice versa
    
    //if result is greater than 0, then right is sorted before left
    //if result is less than 0, then right is sorted after left
    const final = [...wordMap].sort((a, b) => b[1] - a[1]); 
    console.log(final);

    //remove old table
    const table = document.getElementById("tableOutput");
    while(table.hasChildNodes()){
        table.removeChild(table.firstChild);
    }

    //remove old chart
    resetCanvas();
    
    //table setup
    const titleRow = document.createElement("tr");
    const titleWord = document.createElement("td");
    const titleCount = document.createElement("td");
    titleWord.innerHTML = "Word"; 
    titleCount.innerHTML = "Count";
    titleRow.classList.add('rowType2');
    titleRow.appendChild(titleWord);
    titleRow.appendChild(titleCount);
    table.appendChild(titleRow);
    
    //chart setup
    const xValues = [];
    const yValues = [];
    const barColors = [];
    const colorOptions = ["red", "green", "blue", "orange", "brown"];
    let currColor = 0;
    

    let currRowType = 1;

    //loop to enter data
    let graphEntries = 0;
    let othersCount = 0;
    for(const data of final){
        if (data[0] == ''){
            continue;
        }

        const newRow = document.createElement("tr");
        const newWord = document.createElement("td");
        const newCount = document.createElement("td");
        newWord.innerHTML = data[0]; 
        newCount.innerHTML = data[1];
        newRow.classList.add('rowType' + currRowType);
        if(currRowType == 1){ currRowType++; }
        else{ currRowType--; }
        newRow.appendChild(newWord);
        newRow.appendChild(newCount);
        table.appendChild(newRow);

        if(graphEntries != 4){
    
            xValues.push(data[0]);
            yValues.push(data[1]);
            barColors.push(colorOptions[currColor]);
            currColor++;
            graphEntries++;
        }
        else{
            othersCount += data[1];
        }
    }

    //add the others chart 
    xValues.push("other");
    yValues.push(othersCount);
    barColors.push(colorOptions[currColor]);
    
    //display chart
    new Chart("chartOutput", {
        type: "pie",
        data: {
            labels: xValues,
            datasets: [{backgroundColor: barColors, data: yValues}]
        }
    });
}