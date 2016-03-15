//美洽在线客服
		var meChat = function() {
			//美洽初始化
			var obj = api.require('meChat');
			obj.initMeChat({
				appkey : '55c310d94eae358927000005'
			});
			//	指定分配客服与客服组
			obj.specifyAlloc({
				groupId : '',
				agentId : '25490'
			});
			//	添加规范化用户信息
			obj.addUserInfo({
				realName : $api.getStorage('lastUser'),
				job : $api.getStorage('nickname'),
				tel : $api.getStorage('phone')
			});
			//添加其他信息 ，键值对自定义
			obj.addOtherInfo({
				email : $api.getStorage('email'),
				imToken :  $api.getStorage('imToken'),
				id : $api.getStorage('id')
			});
			//	弹出美洽聊天界面
			obj.show();
		}