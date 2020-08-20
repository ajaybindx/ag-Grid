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




    // aggFunc: mySum,
    // enableValue: true
  }
];

// specify the data
var rowData = [{
    name: 'Pawan',
    department: 'Sales',
    age: 25,
    cost: 20000
  },
  {
    name: 'Sid',
    department: 'Prodction',
    age: 25,
    cost: 25000
  },
  {
    name: 'Abhay',
    department: 'Sales',
    age: 24,
    cost: 10000
  },
  {
    name: 'Rahul',
    department: 'Prodction',
    age: 27,
    cost: 25000
  },
  {
    name: 'Ajay',
    department: 'Sales',
    age: 26,
    cost: 10000
  }
];

// let the grid know which columns and what data to use
var gridOptions = {
  columnDefs: columnDefs,
  rowData: rowData,
  rowSelection: 'multiple',
  onSelectionChanged: onSelectionChanged,
  rowMultiSelectWithClick: true,
  onFilterChanged: function (e) {
    console.log('onFilterChanged', e);
    console.log('gridApi.getFilterModel() =>', e.api.getFilterModel());
  }


};

// setup the grid after the page has finished loading
document.addEventListener('DOMContentLoaded', function () {
  var gridDiv = document.querySelector('#myGrid');
  new agGrid.Grid(gridDiv, gridOptions);
});

function onFilterChanged() {
  var changedRows = gridOptions.api.afterDataChange()
  changedRows.reduce((acc, cur) => acc + cur.cost, 0);
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






// Option 2: register aggFunc to grid called 'abc', then reference by name
gridOptions.api.addAggFunc('mySum', myCustomAggFunc);
colDefCost.aggFunc = 'mySum';


// this is the function 2 and 3 above are using
function myCustomAggFunc(values) {
  var sum = 0;
  values.forEach(function (value) {
    sum += value;
  });
  return sum;
}