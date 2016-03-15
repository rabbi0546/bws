function login_WinOpenFrame(name, url, bgColor) {

	var header = $api.dom('#aui-header');
	apiready = function() {
		api.parseTapmode();
		$api.fixIos7Bar(header);
		api.setStatusBarStyle({
			style:'light'
            });
		$api.fixStatusBar(header);
		var headerPos = $api.offset(header);
		var body_h = $api.offset($api.dom('body')).h;

		rect = {
			x : 0,
			y : headerPos.h,
			w : 'auto',
			h : api.winHeight - headerPos.h
		};
		api.openFrame({
			name : name,
			url : url,
			bounces : true,
			vScrollBarEnabled : true,
			hScrollBarEnabled : false,
			bgColor : 'rgba(255,255,255,1)' || bgColor,
			rect : rect
		});
		//按返回键两次退出应用
		back();
	};
	//关闭窗口函数

}

