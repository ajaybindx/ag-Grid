var columnDefs = [{
    headerName: "Name",
    field: "name",
    sortable: true,
    filter: true
  },
  {
    headerName: "Department",
    field: "department",
    sortable: true,
    filter: true,
    //rowGroup: true
  },
  {
    headerName: "Date",
    field: "date",
    sortable: true,
    filter: 'agDateColumnFilter',
    filterParams: {
      // provide comparator function
      comparator: function(filterLocalDateAtMidnight, cellValue) {
          var dateAsString = cellValue;

          if (dateAsString == null) {
              return 0;
          }

          // In the example application, dates are stored as dd/mm/yyyy
          // We create a Date object for comparison against the filter date
          var dateParts = dateAsString.split('/');
          var day = Number(dateParts[2]);
          var month = Number(dateParts[1]) - 1;
          var year = Number(dateParts[0]);
          var cellDate = new Date(day, month, year);

          // Now that both parameters are Date objects, we can compare
          if (cellDate < filterLocalDateAtMidnight) {
              return -1;
          } else if (cellDate > filterLocalDateAtMidnight) {
              return 1;
          } else {
              return 0;
          }
      }
  }
  },
  {
    headerName: "Age",
    field: "age",
    sortable: true,
    filter: 'agNumberColumnFilter'
  },
  {
    headerName: "Cost",
    field: "cost",
    sortable: true,
    filter: 'agNumberColumnFilter'
  }
  

];

// specify the data
var rowData = [{
    name: 'Pawan',
    department: 'Sales',
    age: 25,
    cost: 20000,
    date:'10/8/2020'
  },
  {
    name: 'Sid',
    department: 'Prodction',
    age: 25,
    cost: 25000,
    date:'15/8/2020'
  },
  {
    name: 'Abhay',
    department: 'Sales',
    age: 24,
    cost: 10000,
    date:'10/7/2020'
  },
  {
    name: 'Rahul',
    department: 'Prodction',
    age: 27,
    cost: 25000,
    date:'17/5/2020'
  },
  {
    name: 'Ajay',
    department: 'Sales',
    age: 26,
    cost: 10000,
    date:'10/6/2020'
  },
  {
    name: 'AAA',
    department: 'Sales',
    age: 26,
    cost: 10000,
    date:'10/5/2020'
  },
  {
    name: 'BBB',
    department: 'Prodction',
    age: 26,
    cost: 10000,
    date:'10/8/2020'
  },
  {
    name: 'CCC',
    department: 'Sales',
    age: 26,
    cost: 10000,
    date:'10/7/2020'
  }

];

// let the grid know which columns and what data to use
var gridOptions = {
  columnDefs: columnDefs,
  rowData: rowData,
  rowSelection: 'multiple',
  // groupIncludeFooter: true,
  
  // onSelectionChanged: onSelectionChanged,
  // rowMultiSelectWithClick: true,
  onFilterChanged: onFilterChanged


};

// setup the grid after the page has finished loading
document.addEventListener('DOMContentLoaded', function () {
  var gridDiv = document.querySelector('#myGrid');
  new agGrid.Grid(gridDiv, gridOptions);
});

function onFilterChanged() {
  var array = [];
  gridOptions.api.forEachNodeAfterFilterAndSort(function (node) {
    array.push(node.data);
  });
  var total = array.reduce((a, c) => a + c.cost, 0);
  document.querySelector('#myTotal').innerHTML = total;
}



// row selection 

function onSelectionChanged() {
  var selectedRows = gridOptions.api.getSelectedRows();
  var selectedRowsString = '';
  var maxToShow = 5;
  var total = 0;

  selectedRows.forEach(function (selectedRow, index) {
    if (index >= maxToShow) {
      return;
    }

    if (index > 0) {
      selectedRowsString += ', ';
    }

    selectedRowsString += selectedRow.name;
    total += selectedRow.cost;
  });

  if (selectedRows.length > maxToShow) {
    var othersCount = selectedRows.length - maxToShow;
    selectedRowsString +=
      ' and ' + othersCount + ' other' + (othersCount !== 1 ? 's' : '');
  }

  document.querySelector('#myTotal').innerHTML = total;
}






// // Option 2: register aggFunc to grid called 'abc', then reference by name
// gridOptions.api.addAggFunc('mySum', myCustomAggFunc);
// colDefCost.aggFunc = 'mySum';


// // this is the function 2 and 3 above are using
// function myCustomAggFunc(values) {
//   var sum = 0;
//   values.forEach(function (value) {
//     sum += value;
//   });
//   return sum;
// }