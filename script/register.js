/* 用户注册后与token 关联. */
function register() {
	/* 可选的基本思路:
	 1.用户表中新增一个字段.
	 2. 获取token.
	 3. 将token 与 新用户关联,一并存到用户表中.
	 */
	/* 1.获取 imToken. */
	var photo = $api.getStorage('new_Logo_Selected');
	var username = $api.val($api.byId('username'));
	var password = $api.val($api.byId('userPwd'));
	var userEmail = $api.val($api.byId('userEmail'));
	var appKeyIM = "82hegw5uh4hex";
	var appSecretIM = "IHmh0ztIJH";
	var userIdIM =  Math.floor(Math.random() * 1000000000);
	var nameIm = username;
	var portraitUriIM = photo;
	if ((username.length = 11 && password.length >= 6) && userEmail) {
		//JSON.stringify(bodyParam) -----将json数据转换成为字符串类型传输  //body："" //请求体（字符串类型）
		api.showProgress({
			title : '注册中...',
			modal : false
		});
		ajaxToRongCloud(appKeyIM, appSecretIM, userIdIM, nameIm, portraitUriIM, function(ret, err) {
			if (ret && ret.token) {
				/* 2.将 imToekn 与 新用户关联. */
				var model = api.require('model');
				model.config({
					appId : "A6995045649271",
					appKey : "C9C29F89-BCCD-501A-F46D-137CAB6FC4B4"
				});
				model.insert({
					class : 'user',
					value : {
						username : username,
						password : password,
						email : userEmail,
						emailVerified : true,
						nickname : ret.userId,
						imToken : ret.token,
						photo:photo
					}
				}, function(ret, err) {
					var msg = "";
					api.hideProgress();
					if (ret) {
					if(ret.username){
					api.toast({
                            msg : '注册成功'
                        }, function(ret, err) {
                            api.closeWin({});
                        });
					}
						
					}
					if (ret.error) {
						api.toast({
                            msg : '用户名被占用！'
                        }, function(ret, err) {
                            api.closeWin({});
                        });
					}
					//alert(msg);
				});
			}
		});
	}

}

//========离开用户名输入框的时候检查是否用户账号被注册======>>>>>
function checkUserNameConflict(obj) {
	var username = $api.val($api.byId('username'));
	var model = api.require('model');
//	model.config({
//		appId : "A6995045649271",
//		appKey : "C9C29F89-BCCD-501A-F46D-137CAB6FC4B4"
//	});
	var query = api.require('query');
	query.createQuery({
	}, function(ret, err) {
		var queryId = ret.qid;
		//alert(JSON.stringify(ret));
		query.whereEqual({
			qid : queryId,
			column : 'username',
			value : username
		});

		model.findAll({
			class : 'user',
			qid : queryId
		}, function(ret, err) {
			if(ret){
				//alert(JSON.stringify(ret));
				if(ret.length > 0){
				api.toast({
	                msg:'用户名已注册！'
                });
				}
			}
			if(err){
				//alert(JSON.stringify(err));
			}
		});
	});

}
