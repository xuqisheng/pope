/**
 * 文件上传下载
 * 
 * author:01113120
 * 
 * 需要配合jquery及jquery.form.js一起使用
 */
var Uploader = (function($) {
	
	var uploader = function(opt) {
		this.params = {
			id: "",
			otherValue:"",
			value: "",
			title: "",  // 文件名
			readOnly: false,	// 是否只读
			rootPath: "/emap",	// URL根路径
			uploadUrl: "/sys/crowdCommon/attr/upload.do",	// 上传的URL
			downloadUrl: "/sys/crowdCommon/attr/download.do", // 下载的URL
			removeUrl: "/sys/crowdCommon/attr/remove.do", // 删除的URL
			fileViewNameUrl: "/sys/crowdCommon/attr/getFileViewName.do", // 获取文件显示名称的URL
			allowSuffixs: [],	// 允许上传的格式
			propName: "上传",
			propExplain: "（请上传附件）",
			maxSize: 1024 * 1024 * 10,
			uploadedFunc: null,
			uploadedFunc_full: null
		};
		
		this.init(opt);
		this.render();
	};
	
	uploader.prototype = {
		init: function(opt) {
			copyPropertyVal(opt, this.params);
		},
		
		render: function() {
			var html = '';
			if (this.params.value == "" && !this.params.readOnly) {
				html += '<div class="file-upload-container">';
				html += '<a class="file-upload" href="javascript:void(0)"><input id="f_{{id}}" name="f_{{id}}" type="file">'+ this.params.propName +'</a>';
				html += '<span class="file-upload-info" style="margin-left:5px">{{propExplain}}</span></div>';
			} else {
				html += '<div class="file-upload-container"><a class="file-upload-success" id="down_{{id}}" href="javascript:void(0)" title="下载{{title}}">{{title}}</a>';
				if (!this.params.readOnly) {
					html += '<a style="margin-left:5px" href="javascript:void(0)" id="rmv_{{id}}" class="file-upload">删除</a>'; 
				}
				html += '</div><iframe style="display:none" id="ifr_{{id}}"></iframe>';
			}
			
			var viewHtml = html.render(this.params);
			if(this.params.id){
				$("#" + this.params.id).html(viewHtml);
			}else{
				$(this.params.otherValue).html(viewHtml);
			}
			this.bindEvent();
		},
		
		setValue: function(val) {
			if (val == null) return;
			
			var _this = this;
			var _url = this.params.rootPath + this.params.fileViewNameUrl + "?_=" + new Date().getTime();
			$.ajax({
                url: _url, cache: false, dataType: "json", type: "post", data: "wid=" + val,
                success: function(data) {
                	_this.params.value = val;
                	_this.params.title = data.wjxsmc;
                	_this.render();
            	}
            });
		},
		
		bindEvent: function() {
			var _this = this;
			
			// 文件上传
			$("#f_" + this.params.id).on("change", function() {
				var filePath = $(this).val();
				var index = filePath.lastIndexOf('.');
				var extName = filePath.substring(index + 1).toLowerCase();
				
				if (!_this.checkSize("f_" + _this.params.id)) return;
				
				var canUpload = false;
				if (_this.params.allowSuffixs.length == 0) { canUpload = true; }
				else {
					for (var i = 0; i < _this.params.allowSuffixs.length; i ++) {
						var suffix = _this.params.allowSuffixs[i];
						if (suffix.toLowerCase() == extName) {
							canUpload = true;
							break;
						}
					}
				}
				if (!canUpload) {
					alert("上传的文件格式有误！"); return;
				}
				
				// 上传
				var url = _this.params.rootPath + _this.params.uploadUrl + "?_=" + new Date().getTime();
				
				var form = jQuery('<form action="" method="POST" enctype="multipart/form-data"></form>');
				form.append($(this)); 
				form.ajaxSubmit({
				    type: 'post', dataType: 'json', url: url,
				    success:function(data) {
				    	if (_this.params.uploadedFunc_full != null) {
				    		_this.params.uploadedFunc_full(data);
				    	} else {
				    		_this.params.value = data.fileWids;
					    	_this.params.title = data.fileNames;
					    	_this.render();
					    	
					    	if (_this.params.uploadedFunc != null) {
					    		_this.params.uploadedFunc(data);
					    	}
				    	}
				    },
				    error:function(XmlHttpRequest,textStatus,errorThrown) {
				        console.log(XmlHttpRequest); console.log(textStatus); console.log(errorThrown);
				        alert("上传失败！");
				    }
				});
			});
			
			// 下载
			$("#down_" + this.params.id).on("click", function() {
				var url = _this.params.rootPath + _this.params.downloadUrl + "?wid=" + _this.params.value + "&_=" + new Date().getTime();
				$("#ifr_" + _this.params.id).attr("src", url);
			});

			// 删除
			$("#rmv_" + this.params.id).on("click", function() {
				var url = _this.params.rootPath + _this.params.removeUrl + "?_=" + new Date().getTime();
				$.ajax({
	                url: url, cache: false, dataType: "json", type: "post", data: "wid=" + _this.params.value,
	                success: function(data) {
	                	_this.params.value = "";
	                	_this.params.title = "";
	                	_this.render();
                	}
                });
			});
		},
		
		checkSize: function(id) {
			var tipMsg = "您的浏览器暂不支持计算上传文件的大小，建议使用Chrome、FireFox、IE浏览器。"; 
			
			var browserCfg = {};
			var ua = window.navigator.userAgent;
			if (ua.indexOf("MSIE") >= 1) {
				browserCfg.ie = true;
			} else if (ua.indexOf("Firefox") >= 1) {
				browserCfg.firefox = true;
			} else if (ua.indexOf("Chrome") >= 1) {
				browserCfg.chrome = true;
			}
			
			var obj_file = document.getElementById(id);
			if (obj_file.value == "") {
				alert("请先选择上传文件");
				return false;
			}
			
			try {
				var filesize = 0;
				if (browserCfg.firefox || browserCfg.chrome) {
					filesize = obj_file.files[0].size;
				} else if (browserCfg.ie) {
					var obj_img = document.getElementById('tempimg');
					obj_img.dynsrc = obj_file.value;
					filesize = obj_img.fileSize;
				} else {
					alert(tipMsg);
					return false;
				}
				if (filesize == -1) {
					alert(tipMsg);
					return false;
				} else if (filesize > this.params.maxSize) {
					alert("文件大小不符合要求!");
					return false;
				}
			} catch(e) {
				console.log(e);
			}
			return true;
		}
	};
	
	return uploader;
	
	/**
     * 参数复制
     * @param from
     * @param to
     */
    function copyPropertyVal(from, to) {
        for (var f in from) {
            for (var t in to) {
                if (f == t && from[f] != null) {
                    to[t] = from[f];
                    break;
                }
            }
        }
    }
}(jQuery));

//简易 Javascript 字符串模板  
function render(template, context) {
	var tokenReg = /(\\)?\{{([^\{\}\\]+)(\\)?\}}/g;
	return template.replace(tokenReg, function (word, slash1, token, slash2) {
		if (slash1 || slash2) {  
			return word.replace('\\', '');
		}
		var variables = token.replace(/\s/g, '').split('.');
		var currentObject = context;
		var i, length, variable;
		for (i = 0; i < variables.length; i ++) {
			variable = variables[i];
			currentObject = currentObject[variable];
			if (currentObject === undefined || currentObject === null) return '';
		}
		return currentObject;
	});
}
String.prototype.render = function (context) {
	return render(this, context);
};