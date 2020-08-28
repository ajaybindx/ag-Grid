
function doGet(e) {
  return HtmlService.createTemplateFromFile('index').evaluate();
}
// use full variables
var objArr= [];

 function test(){
 var ss = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet1");
  var lr = ss.getLastRow();
  var lc = ss.getLastColumn();
  var range = lr + ":" + lc

  var data = ss.getDataRange().getValues();
 console.log(data[1]);
}
function myFunction() {

  var ss = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet1");
  var lr = ss.getLastRow();
  var lc = ss.getLastColumn();
  var range = lr + ":" + lc

  var data = ss.getDataRange().getValues();
// console.log(data)
//  to create column defination    
var columnDefs = columnDefsfn(data[0],data[1]);


  var final_array = [];
  for (var i = 1; i < data.length ; i++) {
    var row = data[i];
    var obj = {};
       for( var j=0;j<objArr.length;j++)
        {
              if(j==0)
                {
                   obj[objArr[j]] =  convertDate('"'+row[j]+'"');
//console.log(obj[objArr[j]]);
                 }
              else
                {
                 
                         obj[objArr[j]]=row[j];
                     
                }
         }


    final_array.push(obj);
  }

// console.log(final_array);


  var rowData = final_array;

  var gridOptions = {
    columnDefs: columnDefs,
    defaultColDef: {
                 resizable: true,
                 minWidth: 80,
                 flex: 1,
                 filterParams: { buttons: ['reset', 'apply'],debounceMs: 200 }

                   },
    rowData: rowData,
    pagination: true,
    paginationPageSize: 10,
    domLayout: 'autoHeight',

  };
  
  //console.log(gridOptions);

  return JSON.stringify(gridOptions);

}

//     step 1:


function columnDefsfn(colHd,sample)
{

//var columndef=colHd.reduce((acc, cur) => ({ ...acc, [cur]: cur }), {})
 
var columndef=[]
  colHd.forEach(ele => columndef.push({ headerName:ele,field:ele,sortable: true,filter: true }));


  for(var i=0;i<columndef.length;i++){
       objArr.push(columndef[i]["field"]);
   

      if(typeof(sample[i])=="number")
      {
      columndef[i]["filter"] = 'agNumberColumnFilter';
      }
     

}

//console.log(objArr)

return columndef;

}

// date mod 
function convertDate(str) {
  var date = new Date(str);
  var   mm = ("0" + (date.getMonth() + 1)).slice(-2);
  var   dd = ("0" + date.getDate()).slice(-2);

  return [dd,mm,date.getFullYear()].join("/");


}




