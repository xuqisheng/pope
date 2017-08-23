<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<%@ include file="/jsp/public/top.jsp"%>
</head>
<body>
	<div class="main">
		<%@ include file="/jsp/public/header.jsp"%>
		<%@ include file="/jsp/public/left.jsp"%>
		<div class="main-content">
			<div class="position">
				<ol class="breadcrumb">
					<li><a href="#"><i class="icon icon-home"></i> 位置</a></li>
					<li><a href="#">任务管理</a></li>
					<li class="active">项目任务</li>
				</ol>
			</div>
			<div class="wrapper">
				<div class="panel">
					<div class="panel-body">
						<form action="#" method="post">
							<div class="search">
								<input type="text" class="text" name="topic"
									placeholder="送样人/样品批次号/样品编号" class="queryCondition"> &nbsp;
								<button class="btn btn-primary btnQuery" type="button" id="btnQuery">查询</button>
							</div>
						</form>
					</div>
				</div>
				<div class="panel">
					<div class="panel-body">
					<div class="pull-right">
							<button class="btn btn-primary btnQuery" id="btnSubmit" style="display:none;">提交审核</button>
					</div>
						<br> <br>
						<table class="table table-bordered datatable table-hover"
							id="mainTable">
							<thead>
								<tr>
								<th class="text-center" style="width: 80px;"><input
										type="checkbox" name="selAll" /></th>
									<th class="text-center">任务名称</th>
									<th class="text-center">责任人</th>
									<th class="text-center">计划开始时间</th>
									<th class="text-center">计划结束时间</th>
									<th class="text-center">实际开始时间</th>
									<th class="text-center">实际结束时间</th>
									<th class="text-center">分析项目</th>
									<th class="text-center">任务审核人</th>
									<th class="text-center">任务状态</th>
									<th data-width="160px" class="text-center">操作</th>
								</tr>
							</thead>
							<tbody id="tblUserInfo">
							</tbody>
						</table>
						<div class="pull-right">
							<div id='pageInfo' class="pagination"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	
	<script id="tblUserInfoTpl" type="text/x-jquery-tmpl">
				
			</script>
	<script type="text/javascript">	
		var buttonsPermission="${buttons}";
	</script>
	<script type="text/javascript"
		src="${pageContext.request.contextPath}/static/pageJs/task/taskInfo.js"></script>
</body>
</html>