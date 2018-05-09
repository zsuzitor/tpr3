//1--обычная ячейка  2--А Б(путь и тд по краям уровень 1)   3-- потенциалы

var column=0;//4
var row=4;
var matrix=[];
var method=-1;


//старт страницы и начало работы
function page_start(){
	column=4;
	reload_ui(false);
	load_matr();
}
//создание пустой схемы ui по размерам() при ui=false стирает матрицу и создает заного пустую(только центральную матрицу)
function reload_ui(UI){
	var div=document.getElementById("main_div_tabl");
	
	div.innerHTML="";
	var tmp=column;
	column=0;
	for(var i=0;i<tmp;++i){
		add_column_f(UI,false);
	}
}


//внесение данных из ui в js
function save_matr(){
	for(var i=0;i<row;++i){
		for(var i2=0;i2<column;++i2){
			var div=document.getElementById("one_input_id"+i+"_"+i2)
			matrix[i][i2]=+div.value;
		}
	}	
}
//добавление в созданную ячейку значений в ui
function load_matr(){
	for(var i=0;i<row;++i){
		for(var i2=0;i2<column;++i2){
			var div=document.getElementById("one_input_id"+i+"_"+i2)
			div.value=matrix[i][i2];
		}
	}
}

//добавить строку
function add_row_f(){
	for(var i=0;i<column;++i){
	//обычне ячейки
	var div=document.getElementById("one_column_id"+i);
//div.innerHTML+=add_one_cell_ui(row,i,1);//"<input class='input_block' id='one_input_id"+row+"_"+i+"' type='text' type='number'>";
div.innerHTML+=add_one_cell_ui(row,i,1);
if(matrix[row]==undefined)
	matrix[row]=[];
matrix[row][i]=0;
}
row++;
}

function add_one_cell_ui(row,column,type){
	var res="";
	switch(type){
		case 1:
		res="<div class='input_block' id='input_block_id"+row+"_"+column+"'><input class='input_block' id='one_input_id"+row+"_"+column+"'  type='number'></div>";
		break;
		case 2:
		break;
	}
	return res;
}

//добавить столбец
function add_column_f(UI){
	var res="";
	var main_div=document.getElementById("main_div_tabl");
	res+="<div class='div_inline_block div_one_colum' id='one_column_id"+column+"'>";

	for(var i=0;i<row;++i){
		res+=add_one_cell_ui(i,column,1);
		if(matrix[i]==undefined)
			matrix[i]=[];
		if(!UI){
			matrix[i][column]=0;
		}
	}
	res+="</div>";
	column++;
	main_div.innerHTML+=res;
	
}


//кнопка удалить строку
function del_row(){
	row--;
	for(var i=0;i<column;++i){
		var div=document.getElementById("input_block_id"+row+"_"+i);
		div.remove();
	}
	matrix.splice(row,1);
}

//кнопка удалить столбец
function del_column(){
	column--;
	var div=document.getElementById("one_column_id"+column);
	div.remove();
	var bl=document.getElementById("one_inp_num_id"+column);
	if(bl!=null)
		bl.remove();
	for(var i=0;i<row;++i){
		matrix[i].splice(column,1);
	}
}
//кнопка добавить столбец
function add_column(){
	save_matr();
	
	add_column_f(false,true);
	load_matr();
}
//кнопка добавить строку
function add_row(){
	save_matr();
	add_row_f();
	load_matr();
}
//очистить все кроме цены в коде(матрица+ потенциалы)
function not_full_clear_matrix(){//full
	alert("not_full_clear_matrix");
}



//передавать параметры
function min_max_num(min){

	var mass=[];
	for(var i=1;i<arguments.length;++i)
		mass.push(arguments[i]);
	return min_max_in_mass(min,mass);

	function min_max_in_mass(min,mass){
		var res=null;
		for(var i=0;i<mass.length;++i){
			var num=mass[i];
if(mass[i] instanceof Array){//arguments[i] instanceof []||
	num=min_max_in_mass(min,mass[i]);
}
if(res==null)
	res=num;
else
	if(min){
		if(num<res)
			res=num;
	}
	else
		if(num>res)
			res=num;
	}
	return res;
}


}


document.addEventListener("DOMContentLoaded", page_start);


//-----------------------------------------------------------------------------------------


function start_math(type){
	save_matr();
	for(var i=0;i<matrix.length;++i)
		matrix[i].push(i+1);
	matrix.sort((a, b) =>{
		var s_a=sum_mass(a);
		var s_b=sum_mass(b);
		if (s_a < s_b) return 1;
		if (s_a > s_b) return -1;
	});
	var div_number=document.getElementById("div_tabl_name");
	//var mass_number=[];
	var str_for_number="";
	for(var i=0;i<matrix.length;++i)
		//mass_number.push(matrix[i].splice(matrix[i].length-1,1));
	str_for_number+="<div class='output_block' id='output_block_id_name_"+i+"'><label>"+matrix[i].splice(matrix[i].length-1,1)+"</label></div>";
	div_number.innerHTML=str_for_number;
	load_matr();
	var div=document.getElementById("div_for_math");
	var mass_line=[];
	var summ_matrix=0;
	var max_1={num:null,val:null};
	var max_2={num:null,val:null};
	for(var i=0;i<matrix.length;++i){
		var sum_line=0;
		for(var i2=0;i2<matrix[i].length;++i2){
			sum_line+=+matrix[i][i2];
			summ_matrix+=+matrix[i][i2];
		}
		if(max_1.num==null||max_1.val<sum_line){
			max_1.num=i;
			max_1.val=sum_line;
		}

		mass_line.push(sum_line);
	}
	var res2="<div class='div_one_colum div_inline_block'>";
	var res="<div class='div_one_colum div_inline_block'>";
	for(var i=0;i<mass_line.length;++i){
		res2+="<div class='output_block' id='output_block_id_divis_"+i+"'><label>";
		var tmp=mass_line[i]/summ_matrix;
		res2+=tmp;
		res2+="</label></div>";
		res+="<div class='output_block' id='output_block_id_sum_"+i+"'><label>";
		res+=mass_line[i];
		res+="</label></div>";
		if(max_2.num==null||max_2.val<tmp){
			max_2.num=i;
			max_2.val=tmp;
		}
	}
	res2+='</div>';
	res+='</div>';
	res+=res2;

	//load_matr();
	div.innerHTML=res;
	document.getElementById("output_block_id_sum_"+max_1.num).style='border:3px solid red;';
	document.getElementById("output_block_id_divis_"+max_2.num).style='border:3px solid red;';
	// var mass_line_sort=mass_line.slice();
	// mass_line_sort.sort((a, b) =>{
	// 	if (a < b) return 1;
	// 	if (a > b) return -1;
	// });
	// res="<div class='div_one_colum div_inline_block'>";
	// var count_spl=0;



//не учитывает последний элемент
function sum_mass(m){
	var res=0;
	for(var i=0;i<m.length-1;++i)
		res+=m[i];
	return res;
}

	// for(var i=0;i<mass_line.length;++i){

	// 	br:

	// 	for(var i2=0;i2<mass_line_sort.length;++i2)
	// 		if(mass_line[i]==mass_line_sort[i2]){
	// 			res+="<div class='output_block' id='output_block_id_num_"+i2+"'><label>";
	// 			res+=i2+1+count_spl;
	// 			res+="</label></div>";
	// 			mass_line_sort.splice(i2,1);
	// 			count_spl++;
	// 			break br;
	// 		}
	// 	}
		// res+='</div>';
		// div.innerHTML+=res;
	}



// function insert_ui_name(){
// 	var div_out_name=document.getElementById("div_output_name_column");
// 	var res="";
// 	res+="<div class='div_inline_block'>";
// 	for(var i=0;i<column;++i){
// 		res+="<div class='div_name_col_block div_inline_block output_block_name output_block'><label>F "+i+"</label></div>";
// 	}
// 	res+="</div>";
// 	res+="<div class='main_div_for_name div_inline_block'>";
// 	for(var i=0;i<arguments.length;++i){

// 		if(arguments[i]=="f")
// 			for(var i2=0;i2<column;++i2)
// 				res+="<div class='div_name_col_block div_inline_block output_block_name output_block'><label>F` "+i2+"</label></div>";
// 			else if (arguments[i]=="eq")
// 				for(var i2=0;i2<column;++i2)
// 					res+="<div class='div_name_col_block div_inline_block output_block_name output_block'><label>e "+i2+"q"+i2+"</label></div>";
// 				else
// 					res+="<div class='div_name_col_block div_inline_block output_block_name output_block'><label>"+arguments[i]+"</label></div>";
// 			}
// 			res+="</div>";
// 			div_out_name.innerHTML=res;
// 		}



//------------------------------------------------

function loadFile(files) {
	var file = files[0];
	if(file) {
		var reader = new FileReader();
		reader.onload = function (e) {  
			var text = e.target.result;
			var arr = text.split(',');
			row=+arr[0];
			column=+arr[1];
			arr.splice(0,2);
			matrix=[];
			var num=0;
			for(var i=0;i<row;++i){
				for(var i2=0;i2<column;++i2){
					if(matrix[i]==undefined)
						matrix[i]=[];
					matrix[i][i2]=arr[num];
					num++;
				}
			}
			reload_ui(true);
			load_matr();
		};
		reader.readAsText(file);
	}
}
function saveFile() {

	save_matr();
	var str=""+row+","+column+",";
	for(var i=0; i<row; i++) {
		for(var j=0; j<column; j++) {
			str+=matrix[i][j]+",";
		}
	}
	str[str.length-1]="";
				//сохранение файла
				var pom=document.createElement('a');
				pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(str));
				pom.setAttribute('download', 'example.txt');
				pom.click();
			}
