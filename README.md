# tableGroup
javaScript实现的列表加载组件，适应于PC端

# 调用示例
HTML代码：<div id="jstable"></div>

JS调用示例：
	var titleparams = [
    {title: '记账时间', name: 'createdateonly'}, 
    {title: '交易时间', name: 'trxdate'}, 
		{title: '商户订单号', name: 'merchantorderid'}, 
		{title: '业务类型', name: 'desc'}, 
		{title: '收入', name: 'income'}, 
		{title: '扩展信息',name: 'extinfo'}
	];

	var params = {
		id: "jstable", //表格生成的ID
		getUrl: "", //查询url
		queryParams: _searchParam, //查询参数
		title: titleparams //表头列表
	}
	tableGroup(params);

# 参数说明
	id: "jstable", //表格生成的ID
	getUrl: "", //查询url
	queryParams: _searchParam, //查询参数
	title: titleparams //表头列表
	
	其中titleparams中的title对应列表标题名，name对应后台数据库返回的json字段名
