# tableCSV

tableCSV is a Javascript plugin that allows you to save a HTML table as a .csv file
  - Accounts for commas, quotes, and new lines


### Usage
```html
<script type="text/javascript" src="path/to/tableCSV.min.js"></script>
<script type="text/javascript">
    var newTableCSV = new tableCSV(document.getElementById("csvTable"));  //Constructs the tableCSV object
    var csvAsString = newTableCSV.toCSVText();                            //Returns a raw string in the CSV format
    newTableCSV.saveCSV("output");                                        //Downloads CSV as "output.csv"
</script>
```

License
----

MIT
