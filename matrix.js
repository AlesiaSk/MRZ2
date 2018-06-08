var T1 = 0;
var Tn = 0;
var modTime = document.getElementById("modTime").value;
var sumTime = document.getElementById("sumTime").value;
var subTime = document.getElementById("subTime").value; 
var compTime = document.getElementById("compTime").value;
var sqTime = document.getElementById("sqTime").value;
var multTime = document.getElementById("multTime").value; 

function randomNum() {
    min = -1;
    max = 1;
    return (Math.random() * (max - min) + min).toFixed(3);
 }

function matrixGen(x, y){

    var array = new Array(x);
    for (var i = 0; i < x; i++){
        array[i] = new Array(y);
    }
    for (var i = 0; i < x; i++){
        for (var j = 0; j < y; j++){
            array[i][j] = randomNum();
        }
    }
    
    return array;
}

function getT1(time, row, col){
   
    T1 += time * row * col;
    Tn += Math.ceil((time * row * col)/procEl);
}

function getMod(array, size1, size2, procEl, modTime){

    var arrayMod = new Array(size1);
    for (var i = 0; i < size1; i++){
        arrayMod[i] = new Array(size2);
    }  
   
    for (var i = 0; i < size1; i++){
        for (var j = 0; j < size2; j++){
            arrayMod[i][j] = Math.abs(array[i][j]);
        }
    }
    T1 += parseInt(modTime * size1 * size2);
    console.log(T1);
    Tn += Math.ceil((modTime * size1 * size2)/procEl);
    console.log("tn");
    console.log(Tn);
    return arrayMod;  

} 

function mult(a,b, procEl, multTime){
    console.log(T1);
    T1 += parseInt(multTime * 1);
    Tn += Math.ceil((multTime * 1)/procEl);
    return (a*b).toFixed(3);
}

function toPow(a, pow1, procEl, sqTime){
    console.log(T1);
    T1 += parseInt(sqTime * 1);
    Tn += Math.ceil((sqTime * 1)/procEl);
    return Math.pow(a, pow1).toFixed(3);
}

function sub(a,b, procEl, subTime){
    console.log(T1);
    T1 += parseInt(subTime * 1);
    Tn += Math.ceil((subTime * 1)/procEl);
    return (a-b).toFixed(3);
}
function sum1(a,b, procEl, sumTime){
    console.log(T1);
    T1 += parseInt(sumTime * 1);
    Tn += Math.ceil((sumTime * 1)/procEl);
    return (a+b).toFixed(3);
}
function getD(A, B, p, m , q, procEl, modTime, sumTime, subTime, compTime, sqTime, multTime){
    
    var D = [];
    var Amod = getMod(A, p, m, procEl, modTime);
    var Bmod = getMod(B, m, q, procEl, modTime);
    for (var k = 0; k < m; k++){
        D.push([]);
        for (var i = 0; i < p; i++){
            D[k].push([]);
            for (var j = 0; j < q; j++){
                if (Amod[i][k] <= Bmod[k][j]){
                    D[k][i].push([]);
                    D[k][i][j] = mult(A[i][k], B[k][j], procEl, multTime);
                    T1 += parseInt(compTime * 1);
                    Tn += Math.ceil((compTime * 1)/procEl);
                }
                else if (B[k][j] == 0){
                    D[k][i].push([]);
                    D[k][i][j] = sum1(toPow(A[i][k], 2, procEl, sqTime), B[k][j], procEl, sumTime);
                    T1 += parseInt(compTime * 1);
                    Tn += Math.ceil((compTime * 1)/procEl);
                }
                else{
                    D[k][i].push([]);
                    D[k][i][j] = sub(toPow(A[i][k], 2, procEl, subTime), Math.abs(mult(A[i][k], B[k][j], procEl, multTime)), procEl, subTime);
                    T1 += parseInt(modTime * 1);
                    Tn += Math.ceil((modTime * 1)/procEl);
                }
            }
        }
    }
    return D;
}

function sum(kArray, procEl, sumTime){
    var C = [];
    if (kArray.length != 1) 
    {    
        if (kArray.length > 2 * procEl)
        {
            for (var i = 0; i < 2 * procEl; i += 2)
            {
                var firstSummand = parseFloat(kArray[i]);
                var secondSummand = parseFloat(kArray[i + 1]);
                var tempRes = (firstSummand + secondSummand).toFixed(3);
                C.push(tempRes);
                T1 += parseInt(sumTime * 1);
                Tn += Math.ceil((sumTime * 1)/procEl);          
            }
            for (var i = 2 * procEl; i < kArray.length; i++){
                C.push(kArray[i]);
            }
        }
        
        else
        {
            var ost = kArray.length % 2;    
            if (ost == 1)
            {
                C.push(kArray[kArray.length - 1]);
            }
        
            for (var i = 0; i < (kArray.length - ost); i += 2)
            {
                var firstSummand = parseFloat(kArray[i]);
                var secondSummand = parseFloat(kArray[i + 1]);
                var tempRes = (firstSummand + secondSummand).toFixed(3);
                C.push(tempRes);
                T1 += parseInt(sumTime * 1);
                Tn += Math.ceil((sumTime * 1)/procEl);           
            }               
        }
        return sum(C, procEl, sumTime);
    }
    else
    {
        return kArray[0];

    }

}

function getC( p, q, m, D, procEl,sumTime){
    var C = matrixGen(p, q);

    for (var i; i < p; i++){
        for (var j = 0; j < q; j++){
            var kArray = [];
            for (var k = 0; k < D.length(); k++){
                kArray.push(parseFloat(D[k][i][j]));
            }
            C[i][j] = sum(kArray, procEl, sumTime);
        }
    }
    return C;
}

function createTable(){
	var body=document.querySelector("body"),
		table=document.querySelector("table"),
		height=60,
		width=1000,
		rows= 1,
		columns=5,
		tableRow = "",
		tableData = "",
		tableHeader = "",
		firstTable = document.querySelector("table");

	table=document.createElement("table");
	table.setAttribute("width",width);
	table.setAttribute("border","1px")
	table.setAttribute("bordercolor","black");
	table.setAttribute("align","center");

	tableRow=document.createElement("tr");
	tableHeader=document.createElement("th");
	tableHeader.setAttribute("rowspan","2");
	text=document.createTextNode("A");
	tableHeader.appendChild(text);
	tableRow.appendChild(tableHeader);

    tableHeader=document.createElement("th");
	tableHeader.setAttribute("rowspan","2");
	text=document.createTextNode("B");
	tableHeader.appendChild(text);
    tableRow.appendChild(tableHeader);
    
    tableHeader=document.createElement("th");
	tableHeader.setAttribute("rowspan","2");
	text=document.createTextNode("D");
	tableHeader.appendChild(text);
    tableRow.appendChild(tableHeader);
    
    tableHeader=document.createElement("th");
	tableHeader.setAttribute("rowspan","2");
	text=document.createTextNode("C");
	tableHeader.appendChild(text);
	tableRow.appendChild(tableHeader);
	
	tableHeader=document.createElement("th");
	tableHeader.setAttribute("rowspan","2");
	text=document.createTextNode("Result");
	tableHeader.appendChild(text);
	tableRow.appendChild(tableHeader);

	table.appendChild(tableRow);
	tableRow=document.createElement("tr");

	

	table.appendChild(tableRow);

	for (var rowNum = 0; rowNum < rows; rowNum++){
		tableRow = document.createElement("tr");
		for (var colNum = 0; colNum < columns; colNum++){
			tableData=document.createElement("td");
			tableData.id = ((rowNum + 1) + "." + (colNum+1));
			tableRow.appendChild(tableData);
			tableData.setAttribute("height",height);
		}
		table.appendChild(tableRow);
	}

	table.appendChild(tableRow);

	if (firstTable == null) {
		return body.appendChild(table);
	} else {
		var newTable = body.appendChild(table);
		return document.body.replaceChild(newTable, firstTable);
	}
}

function main(){

    var p = document.getElementById("P").value;
    var m = document.getElementById("M").value;
    var q = document.getElementById("Q").value;
    var modTime = parseInt(document.getElementById("modTime").value);
    var sumTime = parseInt(document.getElementById("sumTime").value);
    var subTime = parseInt(document.getElementById("subTime").value); 
    var compTime = parseInt(document.getElementById("compTime").value);
    var sqTime = parseInt(document.getElementById("sqTime").value);
    var multTime = parseInt(document.getElementById("multTime").value); 
    var procEl = parseInt(document.getElementById("Elem").value); 
    
    

    var A = matrixGen(p, m);
    var B = matrixGen(m, q);
    var D = getD(A, B, p, m, q, procEl, modTime, sumTime, subTime, compTime, sqTime, multTime);
    var C = getC(p, q, m, D, procEl, sumTime);
    console.log(T1);

    createTable(1);
    for ( var i = 0; i < p; i++){
        for (var j = 0; j < m; j++){
            if (i == (p - 1) && j == m -1){
                document.getElementById( 1 +"."+ 1).innerHTML += "<p> i = "+i+", j = "+j+", element = "+A[i][j]+".</p>";
            }
            else{
            document.getElementById( 1 +"."+ 1).innerHTML += "<p> i = "+i+", j = "+j+", element = "+A[i][j]+",</p>";
            }
        }
    }
    for ( var i = 0; i < m; i++){
        for (var j = 0; j < q; j++){
            if (i == (m - 1) && j == q - 1){
                document.getElementById( 1 +"."+ 2).innerHTML += "<p> i = "+i+", j = "+j+", element = "+B[i][j]+".</p>";
            }
            else{
            document.getElementById( 1 +"."+ 2).innerHTML += "<p> i = "+i+", j = "+j+", element = "+B[i][j]+",</p>";
            }
        }
    }

    for ( var k = 0; k < D.length; k++){
        for (var i = 0; i < D[k].length; i++){
            for(var j = 0; j < D[k][i].length; j++){

                if (k == (D.length - 1) && j == (D[k][i].length - 1) && i == D[k].length -1){
                    document.getElementById( 1 +"."+ 3).innerHTML += "<p>  k = "+k+", i = "+i+", j = "+j+", element = "+D[k][i][j]+".</p>";
                }
                else{
                    document.getElementById( 1 +"."+ 3).innerHTML += "<p>  k = "+k+", i = "+i+", j = "+j+", element = "+D[k][i][j]+",</p>";
                }
            }
        }
    }
   
    for ( var i = 0; i < p; i++){
        for (var j = 0; j < q; j++){
            if (i == (p - 1) && j == q - 1){
                document.getElementById( 1 +"."+ 4).innerHTML += "<p> i = "+i+", j = "+j+", element = "+C[i][j]+".</p>";
            }
            else{
            document.getElementById( 1 +"."+ 4).innerHTML += "<p> i = "+i+", j = "+j+", element = "+C[i][j]+",</p>";
            }
        }
    }
    console.log(T1);
    var Ky = (T1/Tn).toFixed(3);
    var e = (Ky/procEl).toFixed(3);
    document.getElementById( 1 +"."+ 5).innerHTML += "<p> T1 = "+T1+"</p><p> Tn = "+Tn+"</p><p> Ky = "+Ky+"</p><p> e = "+e+"</p>";
    T1 = 0;
    Tn = 0;
       
}
