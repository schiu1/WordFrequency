document.getElementById('calcButton').addEventListener('click', WordFrequency);

function WordFrequency(){
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

    //table
    const table = document.getElementById("tableOutput");
    while(table.hasChildNodes()){
        table.removeChild(table.firstChild);
    }
    const titleRow = document.createElement("tr");
    const titleWord = document.createElement("td");
    const titleCount = document.createElement("td");
    titleWord.innerHTML = "Word"; 
    titleCount.innerHTML = "Count";
    titleRow.appendChild(titleWord);
    titleRow.appendChild(titleCount);
    table.appendChild(titleRow);
    
    //chart
    const xValues = [];
    const yValues = [];
    
    for(const data of final){
        if (data[0] == ''){
            continue;
        }
        const newRow = document.createElement("tr");
        const newWord = document.createElement("td");
        const newCount = document.createElement("td");
        newWord.innerHTML = data[0]; 
        newCount.innerHTML = data[1];
        newRow.appendChild(newWord);
        newRow.appendChild(newCount);
        table.appendChild(newRow);

        xValues.push(data[0]);
        yValues.push(data[1]);
    }
    
    new Chart("chartOutput", {
        type: "pie",
        data: {
            labels: xValues,
            datasets: [{data: yValues}]
        }
    });
}