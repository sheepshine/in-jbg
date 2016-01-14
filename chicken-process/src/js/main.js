/*点击评价*/
var sel_1_taste=0;
var sel_1_start=0;
var sel_1_taste_un=[];
var sel_1_taste_gd=[];
var GET_TAG='http://dishes.liziba.com/?c=card&a=arg';
var GET_CHICKEN='http://dishes.liziba.com/?c=card&a=home';
var POST_COMMENT='http://dishes.liziba.com/?c=card&a=evaluate';
var	GET_LIST='http://dishes.liziba.com/?c=card&a=evaluateList';
var POST_IMAGE='http://dishes.liziba.com/?c=card&a=image&id=evaluateId';
var POST_UPLOAD_CONTENT='http://dishes.liziba.com/?c=card&a=content&';
var PRAISE_TIL='http://dishes.liziba.com/?c=card&a=evaluate_praise&';
var PRAISE_CONTENT='http://dishes.liziba.com/?c=card&a=evaluate_child&';
var GET_SIGN='http://yd.liziba.com/oauth/weixin/OAuth?redirect_uri=&scope='
var templet1='<div class="sel-btn js-taste-sel"';
var templet2='<div class="sel-btn-quert js-taste-un-reason"';
var templet3='<div class="sel-btn-quert js-taste-gd-reason"';
function comment(){
	console.log('comment is running')
}
comment.prototype.loadtag=function(){
	var _that=this;
	this.loadtag=function(partid,warpid,templet,run){
		$.ajax({
			type: 'get',
			async: false,
			dataType: 'jsonp',
			data:{
				id:partid
			},
			url: GET_TAG,
			success: function(data) {
				var warp=$(warpid);
				var str='';
				for(var each in data.data){
					str=str+templet+'thisId='+each+'>'+data.data[each]+'</div>';
				}
				warp.html(str);
				//页面上的点击事件
				if(run){
					//等待dom加载完
					setTimeout(function(){
						comment_click.start_btn(".js-taste-start");
						comment_click.sel_btn(".js-taste-sel",true,sel_1_taste,'sel_1_taste');
						comment_click.sel_btn(".js-taste-un-reason",false,sel_1_taste_un,'sel_1_taste_un');
						comment_click.sel_btn(".js-taste-gd-reason",false,sel_1_taste_gd,'sel_1_taste_gd');
						comment_click.commit_btn();
					},200)
					
				}
				
			}
		});
	}
	this.loadChicken=function(chickenid){
		$.ajax({
			type: 'get',
			async: true,
			dataType: 'jsonp',
			data:{
				id:chickenid
			},
			url: GET_CHICKEN,
			success: function(data) {
				var warp=$("#processionTil");
				var warp2=$(".procession-ico");
				var str='<div class="warp"><div>送达</div><div>7:00</div></div>';
				var str2='<div class="ico0 nomargin"></div>';
				var num=1;
				for(var each in data.data){
					str=str+'<div class="warp"><div>'+data.data[each].post_name+'</div><div>'+data.data[each].time+'</div></div>';
					if(num==0){
						str2=str2+'<div class="ico'+num+' nomargin"></div>';
					}
					else{
						str2=str2+'<div class="ico'+num+'"></div>';
					}
					num++;
				}
				switch (num){
					case 1:
						$(".procession").css("width","0.4rem")
						break;
					case 2:
						$(".procession").css("width","2.306667rem")
						break;
					case 3:
						$(".procession").css("width","4.186667rem")
						break;
					case 4:
						$(".procession").css("width","6.053333rem")
						break;
					case 5:
						$(".procession").css("width","7.893333rem")
						break;
				}
				warp.html(str);
				warp2.html(str2);
				$("#chicken_weight").html(data.weight+'斤');
				// $("#processionTil").find(".warp").eq(0).find("div").eq(1).html("7:00")
				localStorage.processId=data.processId;
			}
		});
	}
	this.loadList=function(paget,ant){
		$.ajax({
			type: 'get',
			async: true,
			dataType: 'jsonp',
			data:{
				cardId:localStorage.cardId,
				page:paget
			},
			url: GET_LIST,
			success: function(data) {
				$(".get-more").html("加载更多");
				getlistCtr=0;
				var warp=$("#friendList");
				var str="";
				var str1='<div class="section heightauto friend-section"><div class="userinfo"><img class="userheadimg fl" src="'
				var str2='" /><div class="username fs32px fl"><div class="name fl">';
				var str3='</div><div class="start-warp fl">';
				var str3_1='<div class="sel-btn start nobor fl"></div>';
				var str3_2='<div class="sel-btn start nobor fl start-ava2"></div>'
				var str4='</div></div><div class="usertip fs20px fl">';
				var str5='</div></div><div class="content fs32px"><p>';
				var str6='</p><div class="photo"><a>';
				var str7='</a></div></div><div class="post-info fs26px"><span class="time fs26px fix-break fix-display-inblock">';
				var str8='</span><span class="address fs26px fix-break fix-display-inblock">李子坝梁山鸡</span><div class="praise praisebtn fr"';
				var str8_2='</span><span class="address fs26px fix-break fix-display-inblock">李子坝梁山鸡</span><div class="praise praisebtn start-ava fr"'
				var str8_1='"></div></div><div class="praise-info"><div class="praise"></div><div class="praise-list fs26px"><div class="praise-list-arr fs26px">'
				var str9='</div></div><div class="comment fs26px fix-display-inblock">';
				var str10='</div><div class="my-comment fs26px"><input /><button class="fs26px commitohers"';
				var str10_1='">发送</button> </div></div>';
				if(pageindex>data.pageCount&&ant){
					alert('没有更多内容了');
					return;
				}
				for(var each in data.data){
					/*修复bug，所以在此申明str8*/
					var str8='</span><span class="address fs26px fix-break fix-display-inblock">李子坝梁山鸡</span><div class="praise praisebtn fr"';
					var hasprase=false;
					var str_start="";
					var str_reason="";
					var str_praise="";
					var str_child="";
					var str_child_1='<div class="comment-item"><b class="comment-user">';
					var str_child_2=':</b><b class="comment-text">';
					var str_img="";
					var praiselength2=0;

					for(var i=0;i<data.data[each].score;i++){
						str_start=str_start+str3_1;
					}
					for(var i=0;i<5-data.data[each].score;i++){
						str_start=str_start+str3_2;
					}
					var strreson= data.data[each].reason;
					strsplit=strreson.split(","); //字符分割 
					for (i=0;i<strsplit.length ;i++ ) 
					{ 
					str_reason=str_reason+'<div>'+strsplit[i]+'</div>' //分割后的字符输出 
					} 
					var str_time=_that.getLocalTime(data.data[each].create_at);
					for(var _praise in data.data[each].praise){
						if(_praise==0){
							str_praise=data.data[each].praise[_praise].nickname;
						}else{
							str_praise=str_praise+','+data.data[each].praise[_praise].nickname;
						}
						
					}
					for(var _child in data.data[each].child){
						str_child=str_child+str_child_1+data.data[each].child[_child].nickname+str_child_2+data.data[each].child[_child].content+'</b></div>';
					}
					if(data.data[each].praise){
						var praiselength='等'+data.data[each].praise.length+'人觉得很赞';
						praiselength2=data.data[each].praise.length;
						for(var i=0;i<praiselength2;i++){
							if(data.data[each].praise[i].open_id==localStorage.openIdYSYCH){
								hasprase=true;
							}
						}

					}else{
						var praiselength=''
					}
					if(data.data[each].img){
						var iffour=false;
						if(data.data[each].img.length==4){
							iffour=true;
						}
						for(var i=0;i<data.data[each].img.length;i++){
							if(iffour&&i%2){
								str_img=str_img+'<img class="fix-imgfour-margin-r" src="'+data.data[each].img[i].url+'" />';
							}else{
								str_img=str_img+'<img src="'+data.data[each].img[i].url+'" />';
							}
							
							
						}
					}
					if(hasprase){
						str8=str8_2;
					}
					str=str+str1+data.data[each].avator+str2+data.data[each].nickname+str3+str_start+str4+str_reason+str5+data.data[each].content+str6+str_img+str7+str_time+str8+'thisidv="'+data.data[each].id+'"thispranum='+praiselength2+str8_1+str_praise+'</div>'+praiselength+str9+str_child+str10+'thisidv="'+data.data[each].id+str10_1;
				}
				if(ant){
					var oldtem=$("#friendList").html();
					str=oldtem+str;
				}
				$("#friendList").html(str);
				// var prasectr=1;
				setTimeout(function(){
					$(".praisebtn").tap(function(){
						// if(prasectr==0){
						// 	return false
						// }
						if($(this).is('.start-ava')){
							alert('你已经赞过啦~');
							return false;
						}
						prasectr=0;
						idvalue=$(this).attr('thisidv');
						hasprase=parseInt($(this).attr('thispranum'))+1;
						if(hasprase==1){
							var str2=localStorage.username+$(this).parent().next().find(".praise-list-arr").html();
						}else{
							var str2=localStorage.username+","+$(this).parent().next().find(".praise-list-arr").html();
						}
						var str='<div class="praise-list-arr fs26px">'+str2+'</div>等'+hasprase+'人觉得很赞';
						$(this).parent().next().find(".praise-list").html(str);
						comment_click.pariseothers(idvalue,hasprase,$(this));
						return false;
					})
					var parseotherCtr=0;
					$(".commitohers").tap(function(){
						if(parseotherCtr==1){
							return false;
						}
						parseotherCtr=1;
						idvalue=$(this).attr('thisidv');
						text=$(this).prev().val();
						if(!text){
							alert("请输入评论内容");
							parseotherCtr=0;
							return false;
						}
						var str_old=$(this).parent().prev().html();
						var str=str_old+'<div class="comment-item"><b class="comment-user fix-display-inblock">'+localStorage.username+':</b><b class="comment-text fix-display-inblock">'+text+'</b></div>'
						$(this).parent().prev().html(str);
						$(this).prev().val("");
						comment_click.parsecontent(idvalue,text);
						parseotherCtr=0;
						return false;
					})
				},200)
			}
		});
	}
	this.getLocalTime=function(nS){
			var now=new Date(parseInt(nS)*1000)
			var year=now.getYear()-100;     
          	var month=now.getMonth()+1;     
         	var date=now.getDate();     
          	var hour=now.getHours();     
          	var minute=now.getMinutes();     
          	var second=now.getSeconds();     
          	return "20"+year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second;  
	}
}
comment.prototype.click_comment=function(){
	var _that=this;
	this.sel_btn=function(obj,single,arr,name){
		var tasteObj=$(obj);
			tasteObj.tap(function(){
				if(single){
					tasteObj.removeClass("btn-ava");
				}else{
					if($(this).is('.btn-ava')){
						$(this).removeClass("btn-ava");
						_that.unshiftarr(arr,$(this).attr("thisId"));
						localStorage[name]=arr;
						return;
					}else{
						$(this).addClass("btn-ava");
					}
				} 
				$(this).addClass("btn-ava");
				if(single){
					arr=$(this).attr("thisId");
				}else{
					_that.pusharr(arr,$(this).attr("thisId"));
					localStorage[name]=arr;
				}
				localStorage[name]=arr;
				console.log(localStorage[name]);
				return false;
			})
		
	}
	this.start_btn=function(obj){
		var startObj=$(obj);
		var unconfort=$("#unconforta");
		var confort=$("#conforta");
		startObj.click(function(){
			var num=$(this).index();
			sel_1_start=num+1;
			if(num<4){
				unconfort.show();
				confort.hide();
			}else{
				unconfort.hide();
				confort.show();
			}
			console.log(sel_1_start);
			var numPlus=startObj.length-num;
			localStorage.sel_1_start=sel_1_start;
			for(var i=0;i<=num;i++){
				startObj.eq(i).addClass("start-ava");
			}
			for(var numPlus=0;i<=startObj.length;i++){
				startObj.eq(i).removeClass("start-ava");
			}
		})
	}
	this.commit_btn=function(){
		var ctr=1;
		var btn=$("#commitSubmit");
		btn.click(function(){
			var str="";
			var strtil={
				str1:'<div class="userinfo"><img class="userheadimg fl" src="',
				str2:'" /><div class="username fs32px fl"><div class="name fl fix-display-inblock">',
				str3:'</div><div class="start-warp fl">',
				str4:'<div class="sel-btn start nobor fl"></div>',
				str4_1:'<div class="sel-btn start nobor fl start-ava2"></div>',
				str5:'</div></div><div class="usertip fs20px fl">',
				str6:'</div></div><div class="content fs32px"><textarea class="conten-input fs32px" id="contentInput" placeholder="还有啥子想跟鸡哥说的，来这里整…"></textarea><div class="photo"><div class="uploadinputwarp"><input class="uploadbtn" id="uploadImgInput" name="imgFile" type="file" accept="image/*" /></div><input type="hidden" id="uploadId" name="id"><div class="uoploadimgwarp"><img src="images/upload.png" /></div></div></div><div class="post-info fs26px"><button class="fs32px" id="uploadCommit">提交</button></div>'
			}
			if(ctr==0){
				return false
			}
			/*验证评价*/
			var nedd1=$(".js-taste-sel").is(".btn-ava");
			var nedd2=$(".js-taste-start").is(".start-ava");
			var nedd3=$(".js-taste-un-reason").is(".btn-ava");
			var nedd3_1=$(".js-taste-gd-reason").is(".btn-ava");
			console.log((nedd1&&nedd2),nedd3,nedd3_1)
			if(!nedd1||!nedd2||(!nedd3&&!nedd3_1)){
				alert("请填写完整对鸡的评价哟~");
				return false;
			}
			btn.html("提交中……")
			ctr=0;
			var reasonTag=null;
			if(sel_1_start==5){
				reasonTag=localStorage.sel_1_taste_gd;
			}else{
				reasonTag=localStorage.sel_1_taste_un;
			}
			console.log(localStorage.sel_1_taste)
			$.ajax({
				type: 'get',
				async: true,
				dataType: 'jsonp',
				data:{
					openId:localStorage.openIdYSYCH,
					cardId:localStorage.cardId,
					nickname:localStorage.username,
					avator:localStorage.userUrl,
					size:localStorage.sel_1_taste,
					score:sel_1_start,
					reason:reasonTag
				},
				url: POST_COMMENT,
				success: function(data) {
					if(data.code!=0){
						alert(data.message);
						btn.html("提交评论");
						return false;
					}
					$('html, body').animate({scrollTop:0})
					ctr=1;
					var str_start="",str_reason="";
					strsplit=data.text.split(","); //字符分割 
					for (i=0;i<strsplit.length ;i++ ) 
					{ 
					str_reason=str_reason+'<div>'+strsplit[i]+'</div>' //分割后的字符输出 
					}
				
					for(var i=0;i<localStorage.sel_1_start;i++){
						str_start=str_start+strtil.str4;
					}
					for(var i=0;i<5-localStorage.sel_1_start;i++){
						str_start=str_start+strtil.str4_1;
					}

					str=str+strtil.str1+localStorage.userUrl+strtil.str2+localStorage.username+strtil.str3+str_start+strtil.str5+str_reason+strtil.str6;
					localStorage.evaluateId=data.evaluateId;
					$("#uploadId").val(data.evaluateId);
					$(".comment-one").hide();
					var uploadImg=$("#uploadImg");
					uploadImg.html(str);
					uploadImg.show();
					//提交图片和文字评论
					$("#uploadCommit").tap(function(){
						comment_click.uploadContent();
						return false;
					})
					$("#uploadImgInput").change(function(){
						comment_click.uploadImg($());
						return false;
					})

				}
			});
			
		})
	}
	this.uploadContent=function(){
		console.log("提交文字评论运行")
		$.ajax({
			type: 'get',
			async: true,
			dataType: 'jsonp',
			data:{
				content:$("#contentInput").val(),
				evaluateId:localStorage.evaluateId
			},
			url: POST_UPLOAD_CONTENT,
			success: function(data) {
				$("#uploadImg").hide();
				localStorage.evaluateId=data.evaluateId;
				comment_loadtag.loadList(1,false);
			}
		});
	}
	this.uploadImg=function(){
		// var dataPara = _that.getFormJson(frm);
		// console.log(dataPara)
		// var formData;
		// formData = new FormData();
		// formData.append('imgFile', $('input[name=imgFile]')['0'].files['0']);
		// formData.append('id', $("#uploadId").val());
	 //  	// var oImg=$('input[name=imgFile]')['0'].files['0'];
	 //  	console.log(formData)
	 //    $.ajax({
	 //        url: 'http://dishes.liziba.com/?c=card&a=image',
	 //        contentType:"multipart/form-data",
	 //        data: formData,
	 //        processData: false,
	 //        type: 'POST'
	 //    });
	 	oImg=$('input[name=imgFile]')['0'].files['0'];
	 	console.log(oImg)
	 	var str_tip='<div class="inuploading fs34px" id="inuploadingtip">上传中…</div>';
	 	$(".uoploadimgwarp").append(str_tip);
	 	$.ajaxFileUpload
            (
                {
                    url: 'http://dishes.liziba.com/?c=card&a=image&id='+localStorage.evaluateId+'&openid='+localStorage.openIdYSYCH, //用于文件上传的服务器端请求地址
                    secureuri: false, //是否需要安全协议，一般设置为false
                    fileElementId: 'uploadImgInput', //文件上传域的ID
                    dataType: 'json', //返回值类型 一般设置为json
                    success: function (data, status)  //服务器成功响应处理函数
                    {
                    	if(data.code==0){
                    		$("#inuploadingtip").remove();
	                    	var str=' <img src="'+data.url+'" />';
	                        $(".uoploadimgwarp").append(str);
	                        $("#uploadImgInput").on("change", function(){  
		                        _that.uploadImg();
		                    });  
                    	}else{
                    		alert(data.message)	
                    	}
                    	
                    },
                    error: function (data, status, e)//服务器响应失败处理函数
                    {
                        alert(e);
                    }
                }
            )
	  	
	}
	this.pariseothers=function(thisid,prlen,obj){
		$.ajax({
			type: 'get',
			async: true,
			dataType: 'jsonp',
			data:{
				openId:localStorage.openIdYSYCH,
				evaluateId:thisid,
				nickname:localStorage.username
			},
			url: PRAISE_TIL,
			success: function(data) {
				obj.addClass("start-ava");
			}
		});
	}
	this.parsecontent=function(thisid,text){
		$.ajax({
			type: 'get',
			async: true,
			dataType: 'jsonp',
			data:{
				openId:localStorage.openIdYSYCH,
				evaluateId:thisid,
				content:text,
				nickname:localStorage.username
			},
			url: PRAISE_CONTENT,
			success: function(data) {
				parseotherCtr=0;
				// comment_loadtag.loadList(1,false);
			}
		});
	}
	this.pusharr=function(arr,item){
		var u=arr.indexOf(item);
		if(u==-1){
			arr.push(item);
		}
	}
	this.unshiftarr=function(arr,item){
		arr.splice($.inArray(item,arr),1);
	}
	this.getFormJson=function(frm){
		var o = {};
	    var a = $(frm).serializeArray();
	    $.each(a, function () {
	        if (o[this.name] !== undefined) {
	            if (!o[this.name].push) {
	                o[this.name] = [o[this.name]];
	            }
	            o[this.name].push(this.value || '');
	        } else {
	            o[this.name] = this.value || '';
	        }
	    });
		return o;
	}
}

var comment_run=new comment();
var comment_click= new comment_run.click_comment();
var comment_loadtag= new comment_run.loadtag();


//数据读取
comment_loadtag.loadList(1,false);
comment_loadtag.loadtag(1,"#sel-one-date",templet1,false);
comment_loadtag.loadtag(2,"#sel-two-date",templet2,false);
comment_loadtag.loadtag(3,"#sel-three-date",templet3,true);
comment_loadtag.loadChicken(localStorage.cardId);
var pageindex=1;
var getlistCtr=0;
$(".get-more").tap(function(){
	if(getlistCtr==1){
		return false;
	}
	$(".get-more").html("加载中……");
	getlistCtr=1;
	pageindex++;
	comment_loadtag.loadList(pageindex,true);
	return false;
})
