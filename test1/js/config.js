
var defaultRecord = {
	id: 0,
	configName: "",
	sources: [""],
	output: "",
	columns: [
		{
			column: "",
			value: "",
			rules: ""
		}
	]
};
var queueVm = new Vue({
	el: '#config',
	data: {
		records: [
			{
				id: 0,
				configName: "a1",
				sources: ["a.xlsx"],
				output: "a1.xlsx",
				columns: [
					{
						column: "a1",
						value: "a.a1",
						rules: ["greater than (1)"]
					}, {
						column: "c2",
						value: "a.b2",
						rules: ["apply expression (b1+2)"]
					}
				]
			}, {
				id: 1,
				configName: "c",
				sources: ["a.xlsx", "b.xlsx"],
				output: "c.xlsx",
				columns: [
					{
						column: "c1",
						value: "a.a1",
						rules: ["greater than (1)"]
					}, {
						column: "c2",
						value: "b.b1",
						rules: ["apply expression (b1+2)"]
					}, {
						column: "",
						value: "",
						rules: ["(a) map (b) on (a.a3=b.b3)"]
					},
				]
			}
		],

		selectedRecord: defaultRecord,
		action: "",
		rules: ["greater than (1)", "apply expression (b1+2)", "(a) map (b) on (a.a3=b.b3)","greater than (1)", "apply expression (b1+2)", "(a) map (b) on (a.a3=b.b3)"]

	},
	computed: {


	},
	mounted: function () {


	},
	methods: {
		checkEmp: function (str) {
			return str.length > 0;
		},
		save: function () {
			$('#selectedRecord').modal('hide');
			for (let index = 0; index < this.records.length; index++) {
				const element = this.records[index];
				if (element.id == this.selectedRecord.id) {

					this.records[index] = this.selectedRecord;
					this.$forceUpdate();
				}
				return;
			}
		}, update: function (item) {
			this.selectedRecord = JSON.parse(JSON.stringify(item));
			$('#selectedRecord').modal('show');

		},
		doQueue: function () {
			var self = this;
			var queue = {
				pictureNum: this.picNum,
				studentPath: this.path,
				studentComment: this.comment,
				teacherID: this.teacherID
			};
			var src = "doQueue.action";
			$.ajax({
				url: src,
				method: 'POST',
				dataType: 'json',
				data: JSON.stringify(queue),
				contentType: "application/json",
				success: function (result) {
					if (result.error) {
						alert("排队失败");
						self.result = "排队失败";
						self.success = false;
					} else {
						self.result = "您已进入队列";
						self.success = true;
						self.hasQueued = true;
					}
				}
			});
		}
	}
});

