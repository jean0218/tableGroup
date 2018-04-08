function tableGroup(param) {
    var id = param.id;
    var _idObj = document.getElementById(id),
        _currentPage = 1, //当前页
        _totalPage = 1; //总页数
    renderPage(_idObj, param, _currentPage);

    //翻页
    var _objPage = document.querySelector('.pagination');
    EventUtil.addHandler(_objPage, "click", function(event) {
      event.preventDefault();
      event = EventUtil.getEvent(event); //获取事件对象
      var target = EventUtil.getTarget(event); //获取事件对象目标
      switch (target.parentNode.className) {
        case 'home'://首页
          _currentPage = 1;
          break;
        case 'previous'://上一页
          if (_currentPage == 1){

          }else{
            _currentPage--;
          }        
          break;
        case 'next'://下一页
          if(_currentPage < _totalPage){
            _currentPage++;
          }        
          break;
        case 'end'://尾页
          _currentPage = _totalPage;
          break;
      }
      console.log('当前页',_currentPage);
      _idObj = document.getElementById(id)
      renderPage(_idObj,param,_currentPage);
      _objPage = document.querySelector('.pagination');
    })
}

function renderPage(idObj, param, currentPage) { //获取数据渲染表格
    var data;
    var _getTableData = $.ajax({ //获取表格数据
        url: param.getUrl,
        type: 'POST',
        dataType: 'json',
        data: param.queryParams
    });
    _getTableData.then(function(result) {
        //渲染table
        var _htmlString = [];
        if (result.status == 'success') {
            var _totalPage = result.data.totalcount % param.queryParams.pagesize; //总页数
            _htmlString.push(getTableHtml(param, result.data.datalist))
            var _pageHtml = '';
            if (_totalPage > 1) {
                _pageHtml = getTablePageHtml(param, currentPage, _totalPage);
            }
            _htmlString.push(_pageHtml);
            idObj.innerHTML = _htmlString.join('');
        }
    });
}

function getTableHtml(param, data) {
    var id = param.id,
        titleArr = param.title,
        tableClass = param.tableClass ? param.tableClass : 'table';

    var _htmlTableString = [],
        _htmlTheadString = [],
        _htmlTbodyString = [],
        _htmlTrString = [],
        _htmlTdString = [];

    //表格
    titleArr.map(function(item) {
        _htmlTheadString.push('<th>' + item.title + '</th>');
    })
    data.map(function(item) {
        _htmlTdString = [];
        titleArr.map(function(itemtd) {
            _htmlTdString.push('<td>' + item[itemtd.name] + '</td>')
        })
        _htmlTrString.push('<tr>' + _htmlTdString.join('') + '</tr>');
    })
    _htmlTbodyString = '<tbody>' + _htmlTrString.join('') + '</tbody>';
    _htmlTheadString = '<thead><tr>' + _htmlTheadString.join('') + '</tr></thead>';
    _htmlTableString.push('<table class="' + tableClass + '">');
    _htmlTableString.push(_htmlTheadString);
    _htmlTableString.push(_htmlTbodyString);
    _htmlTableString.push('</table>');
    _htmlTableString = _htmlTableString.join('');
    return _htmlTableString;
}

function getTablePageHtml(param, currentPage, totalpage) { //分页
    var pageClass = param.pageClass ? param.pageClass : 'table-pagination',
        _htmlPageString = [];
    _htmlPageString.push('<nav class="' + pageClass + '">');
    _htmlPageString.push('<ul class="pagination">');
    _htmlPageString.push('<li class="home"><a href="#">首页</a></li>');
    _htmlPageString.push('<li class="previous"><a href="#">上一页</a></li>');
    _htmlPageString.push('<li class="infor"><span class="active">第' + currentPage + '页</span>&nbsp;&nbsp;<span class="total">共' + totalpage + '页</span></li>');
    _htmlPageString.push('<li class="next"><a href="#">下一页</a></li>');
    _htmlPageString.push('<li class="end"><a href="#">尾页</a></li>');
    _htmlPageString.push('</ul></nav>');
    _htmlPageString = _htmlPageString.join('');
    return _htmlPageString;
}


//-------------------------------------------------------------------------------------------------------------------
// 跨浏览器的事件、事件对象处理程序
//-------------------------------------------------------------------------------------------------------------------
var EventUtil = { // 
    addHandler: function(element, type, handler) {
        if (element.addEventListener) { //IE9、Firefox,Safari,Chrome和Opera支持DOM2级事件处理程序
            element.addEventListener(type, handler, false);
        } else if (element.attachEvent) { //IE,Opera
            element.attachEvent("on" + type, handler);
        } else { //DOM0级
            element["on" + type] = handler;
        }
    },
    removeHandler: function(element, type, handler) {
        if (element.removeEventListenter) {
            element.removeEventListenter(type, handler, false);
        } else if (element.detachEvent) {
            element.detachEvent("on" + type, handler);
        } else {
            element["on" + type] = null;
        }
    },
    getEvent: function(event) {
        return event ? event : window.event;
    },
    getTarget: function(event) {
        return event.target || event.srcElement;
    },
    preventDefault: function(event) {
        if (event.preventDefault) {
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    },
    stopPropagation: function(event) {
        if (event.stopPropagation) {
            event.stopPropagation();
        } else {
            event.cancelBubble = true;
        }
    }
};