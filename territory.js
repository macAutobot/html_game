//test
function color_sel(colr,colorPicker)
{
	var colr = "Blue"
	switch(colorPicker.selectedIndex) {
		case 0:
			colr = "Red"
			break;
		case 1:
			colr = "Blue"
			break;
		case 2:
			colr = "Green"
			break;
		default:
			colr = "Pink"
	}
}

function doc_write(colorPicker)
{
	rows = 10
	columns = 10
	str = ""
	for(i = 0; i < rows; i++){
	   str += '<tr>'
	   for (j = 0; j < columns; j++){
			switch(colorPicker.selectedIndex) {
			case 0:
				str += '<td onclick="this.style.background=&#39;red&#39;;">' +  '<center>' + (10*i + j) + '</center>' + '</td>'
				break;
			case 1:
				str += '<td onclick="this.style.background=&#39;blue&#39;;' + '">' +  '<center>' + (10*i + j) + '</center>' + '</td>'
				break;
			case 2:
				str += '<td onclick="this.style.background=&#39;green&#39;;' + '">' +  '<center>' + (10*i + j) + '</center>' + '</td>'
				break;
			default:
				str += '<td onclick="this.style.background=&#39;pink&#39;;' + '">' +  '<center>' + (10*i + j) + '</center>' + '</td>'
			}

	  }
	   str += '</tr>'
	}
	str += '</table>'
	document.write(str)
}

function mouseDown() {
	//alert ("in mousedown")
    document.getElementById("c99").style.cssText = "background-color:pink";
}

function onload ()
{
	function loop_game(){
	color_sel();
	doc_write();
	mouseDown();	
	}
	window.setInterval(color_sel, 1000 /  60);
	window.setInterval(doc_write, 1000 /  60);
	window.setInterval(mouseDown, 1000 /  60);
}
