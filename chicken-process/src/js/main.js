/*点击评价*/
var sel_1_taste=0;
var sel_1_start=0;
var sel_1_taste_un=[];
var sel_1_taste_gd=[];
function comment(){
	console.log('run')
}
comment.prototype.click_comment=function(){
	var _that=this;
	this.sel_btn=function(obj,single,arr){
		var tasteObj=$(obj);
			tasteObj.tap(function(){
				if(single){
					tasteObj.removeClass("btn-ava");
				}else if($(this).hasClass('btn-ava')){
					$(this).removeClass("btn-ava");
					_that.unshiftarr(arr,$(this).index())
					return;
				}
				$(this).addClass("btn-ava");
				if(single){
					arr=$(this).index();
				}else{
					_that.pusharr(arr,$(this).index())
				}
				console.log(arr)
			})
		
	}
	this.start_btn=function(obj){
		var startObj=$(obj);
		startObj.tap(function(){
			var num=$(this).index();
			sel_1_start=num;
			console.log(sel_1_start);
			var numPlus=startObj.length-num;
			for(var i=0;i<=num;i++){
				startObj.eq(i).addClass("start-ava");

			}
			for(var numPlus=0;i<=startObj.length;i++){
				startObj.eq(i).removeClass("start-ava");
			}
		})
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
}

var comment_run=new comment();
var comment_click= new comment_run.click_comment();
comment_click.start_btn(".js-taste-start")
comment_click.sel_btn(".js-taste-sel",true,sel_1_taste);
comment_click.sel_btn(".js-taste-un-reason",false,sel_1_taste_un);
comment_click.sel_btn(".js-taste-gd-reason",false,sel_1_taste_gd);


// var comment={
// 	click_comment:function(){
		
// 	}
// }

