var tableCSV = (function(){
    var csvArray = [];
    var csvString = "";

    function tableCSV(element) {

        for(var i = 0; i<element.children.length; i++){
            var childElement = element.children[i];
            if(childElement.nodeName=="THEAD" || childElement.nodeName=="TBODY" || childElement.nodeName=="TFOOT"){
                for(var j = 0; j<childElement.children.length; j++){
                    var innerChildElement = childElement.children[j];
                    if(innerChildElement.nodeName=="TR"){
                        var innerRow = [];
                        for(var k = 0; k<innerChildElement.children.length; k++){
                            var innerCell = innerChildElement.children[k];
                            if(innerCell.nodeName=="TH" || innerCell.nodeName=="TD"){
                                innerRow.push(escapeCSV(innerCell.innerText));
                            }
                        }
                        csvArray.push(innerRow.join(","));
                    }
                }
            } else{
                if(childElement.nodeName=="TR"){
                    var row=[];
                    for(var j = 0; j<childElement.children.length;j++){
                        var cell = childElement.children[j];
                        if(cell.nodeName=="TH" || cell.nodeName=="TD"){
                            row.push(escapeCSV(cell.innerText));
                        }
                    }
                    csvArray.push(row.join(","));
                }
            }
        }
        csvString = csvArray.join("\n");
    }

    function escapeCSV(text){
        var escapeText = text.replace(/"/g, '""');
        if (escapeText.search(/("|,|\n)/g) >= 0)
            escapeText = '"' + escapeText + '"';
        return(escapeText);
    }

    tableCSV.prototype.toCSVText = function(){
        return (csvString);
    }

    tableCSV.prototype.saveCSV = function(filename){
        var csvBlob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
        if (navigator.msSaveBlob) { // IE 10+
            navigator.msSaveBlob(csvBlob, filename+".csv");
        } else {
            var link = document.createElement("a");
            if (link.download !== undefined) { // feature detection
                // Browsers that support HTML5 download attribute
                var url = URL.createObjectURL(csvBlob);
                link.setAttribute("href", url);
                link.setAttribute("download", filename+".csv");
                link.style.visibility = 'hidden';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        }
        return;
    }

    return tableCSV;
})();
