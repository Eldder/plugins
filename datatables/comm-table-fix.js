function FixedTable() {
  this.lengthMenu = '<button type="button" class="btn btn-primary btn-datatable-addtion" style="display:none;">添加</button>';
  this.iDisplayLength = 10;
}

FixedTable.prototype.baseCreatedRow = function (nRow, aData, iDataIndex) { };

FixedTable.prototype.initComplete = function () { };

FixedTable.prototype.columnDefs = [
  {
    "targets": 0,
    "render": function (data, type, row, meta) {
      return meta.row + 1 + '<div class="icheck-primary">'
      + '<input type="checkbox" value="" id="check2">'
      + '<label for="check2"></label>'
      + '</div>';
    },
  }
];

// tablecover
// tableurls = {"tables": "", "colums": "", "delete": "", "details": "", "updates": "", "next": {"href":"","key":""}}
// tablekey 数据表key
// columns 数据列
// createdrow 数据行操作回调
// modal 对应内容弹框-用户显示数据详情或编辑
function makeupDataTables(tablecover, tableurls, tablekey, columns = null, createdrow = null, columnDefs = [], initComplete = null) {
  var tableinfo = null;
  function baseCreatedRow(nRow, aData, iDataIndex) { }

  if (null == columns && !tableurls.columns) {
    return console.log(tablecover + " 缺少初始化表格的信息");
  } else if (tableurls.columns) {
    $.ajax({
      url: tableurls.columns,
      type: "post",
      data: {},
      processData: false,
      contentType: false,
      success: function (result) {
        if (result.code == 0) {
          if (undefined != result.tableinfo) {
            $(".index-table-classname").text(result.tableinfo.className);
            $(".index-table-title").text(result.tableinfo.title);
            tableinfo = tableinfo;
          }
          columns = result.data;
          if (undefined != columns[0]['columnoptions']) {
            columns.forEach(function (item, index) {
              item['columnoptions'] = item.columnoptions.split(',');
              columns[index] = item;
            });
          }
          initDataTables(tablecover, tableurls.tables, columns, tablekey);
        }
      },
      error: function (e) {
        // alert("错误！！");
      }
    });
  } else if (null != columns) {
    initDataTables(tablecover, tableurls.tables, columns, tablekey, columnDefs);
  } else {
    return console.log(tablecover + " 缺少初始化表格的信息");
  }

  function initDataTables(tablecover, tablehost, columns, tablekey, columnDefs) {
    $(tablecover).dataTable({
      iDisplayLength: 10,
      lengthChange: true,
      searching: true, //是否显示搜索框
      errMode: "none",
      language: {
        info: "显示第 _START_ 至 _END_ 项结果，共 _TOTAL_ 项",
        sInfoEmpty: "显示第 0 至 0 项结果，共 0 项",
        sInfoFiltered: "(由 _MAX_ 项结果过滤)",
        sEmptyTable: "表中数据为空",
        zeroRecords: "没有对应的数据",
        oPaginate: {
          sFirst: "首页",
          sLast: "尾页",
          sNext: "下一页",
          sPrevious: "上一页"
        },
        lengthMenu: '<button type="button" class="btn btn-outline-primary btn-datatable-addtion" style="display:none;">添加</button>'
      },
      processing: true,
      serverSide: true,
      columns: columns,
      ajax: {
        url: tablehost,
        type: 'POST',
        beforeSend: function (xhr) {
          xhr.setRequestHeader("Authorization", "Basic bmVvd2F5Oe4lb3dheQ==");
          xhr.setRequestHeader("Authtoken", sessionStorage.getItem("token"));
        },
        data: function (data) {
          return JSON.stringify(data);
        },
        dataType: "json",
        processData: false,
        contentType: 'application/json;charset=UTF-8'
      },
      columnDefs: columnDefs,
      fnCreatedRow: null == createdrow ? baseCreatedRow : createdrow,
      fnPreDrawCallback: null == initComplete ? function () { } : initComplete,
    });
  }
}