$(document).ready(function() {
	"use strict";
	var ENDPOINT = "http://localhost:3000/tasks";
	function taskEndpoint(taskId) {
		return ENDPOINT + "/" + taskId;
	}

	function showPanel(panelName) {
		var ALL_PANELS = ["emptyPanel", "readPanel", "updatePanel", "createPanel"];
		_.forEach(ALL_PANELS, function(nextValue) {
			$("#"+nextValue).hide();
		});
		$("#"+panelName).show();
	}

	function listTasks() {
		return $.ajax(ENDPOINT, {
			method: "GET",
			dataType: "json"
		});
	}
	function readTask(taskId) {
		return $.ajax(taskEndpoint(taskId), {
			method: "GET",
			dataType: "json"
		});
	}
	function showTaskView(task) {
		$("#readPanel .task-title").text(task.title);
		$("#readPanel .task-description").text(task.description);
		showPanel("readPanel");
	}
	function reloadTasks() {
		listTasks().then(function(response) {
			function addTaskToList(task) {
				var newItem = $("<li />");
				newItem.text(task.title);
				newItem.addClass("list-group-item");
				newItem.attr("data-task-id", task.id);
				$("#tasksList").append(newItem);
			}
			$("#tasksList").html("");
			_.forEach(response, addTaskToList);
		});
	}
	var taskId;
	function attachHandlers() {
		$(document).on("click", "#tasksList [data-task-id]", function() {
			taskId = $(this).attr("data-task-id");
			readTask(taskId).then(showTaskView);
		});
		$(".task-action-cancel").click(function() {
			showPanel("emptyPanel");
		});
		
		$(document).on("click", "#addTaskButton", function(){
			showPanel('createPanel');
		});
		
		$(document).on("click", "#readPanel .task-action-remove", function(){
			$.ajax(taskEndpoint(taskId), {
				method: "DELETE"
			});
		});
		
		$(document).on("click", "#readPanel .task-action-ok", function(){
			showPanel('updatePanel');
		});
		
		$(document).on("click", "#updatePanel .task-action-ok", function(){
			$.ajax(taskEndpoint(taskId), {
				method: "PUT",
				contentType: "application/json; charset=utf-8",
				data: JSON.stringify({
					title: $("#updatePanel [name='title']").val(),
					description: $("#updatePanel [name='description']").val()
				}),
				dataType: "json"
			})
			location.reload();
		});
	
		
		$(document).on("click", "#createPanel .task-action-ok", function() {

			var task = {
					title: $("#createPanel [name='title']").val(),
					description: $("#createPanel [name='description']").val()
				};
				$.ajax(ENDPOINT, {
					method: "POST",
					contentType: "application/json; charset=utf-8",
					data: JSON.stringify(task),
					dataType: "json"
				});
				location.reload();
		});
	}
	attachHandlers();
	reloadTasks();
});
