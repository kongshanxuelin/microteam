import ServiceBase from 'ServiceBase'
import __config from '../etc/config'
class Service extends ServiceBase {
	constructor() {
		super()
		this.$$prefix = ''
		this.$$path = {	

			checkLogin	: 'auth/wx_checkLogin.jhtml',

			//用户相关
			teamUsers	:	'r/user/listCompanyUser',
			//项目
			bindEmailSave:'wx/bindEmailSave.jhtml',

			//任务

			//审核

			//签到

			//工作日志


			//日程


			//公告

			

			taskLastTime: 'task/lasttime.jhtml', 
			listTask	: 'task/listMyTask.jhtml',
			addTask		: 'task/addPlainTask.jhtml',
			removeTask	: 'task/removeTask.jhtml',
			prepay		: 'pay/prePay.jhtml',
			uploadFile	: 'task/uploadFile.jhtml',
			addPayThank	: 'pay/addPayThank.jhtml',
			listPayThank: 'pay/listPayThank.jhtml',

			//feedback
			fb_list		: 'feedback/list.jhtml',
			fb_add		: 'feedback/addFeedback.jhtml',
			fb_remove	: 'feedback/removeFeedback.jhtml',
			fb_reply	: 'feedback/addReply.jhtml'
			
        }
	}
	teamUsers(params){
		return this.getRequest(__config.workPath + this.$$path.teamUsers,params)
	}
	
	bindEmailSave(params) {
		return this.getRequest(this.$$path.bindEmailSave,params)
	}

	getEmailCode(params) {
		return this.getRequest(this.$$path.getEmailCode,params)
	}

	checkLogin(params) {
		return this.getRequest(this.$$path.checkLogin,params)
	}

	listTask(params) {
		return this.getRequest(this.$$path.listTask,params)
	}

	addTask(params) {
		return this.postRequest(this.$$path.addTask,params)
	}

	removeTask(params) {
		return this.postRequest(this.$$path.removeTask,params)
	}

	prePay(params){
		return this.getRequest(this.$$path.prepay,params)
	}

	addPayThank(params){
		return this.getRequest(this.$$path.addPayThank,params)
	}

	listPayThank(params){
		return this.getRequest(this.$$path.listPayThank,params)
	}

	//feedback
	fb_list(params){
		return this.getRequest(this.$$path.fb_list,params)
	}
	fb_add(params){
		return this.getRequest(this.$$path.fb_add,params)
	}
	fb_remove(params){
		return this.getRequest(this.$$path.fb_remove,params)
	}
	fb_reply(params){
		return this.getRequest(this.$$path.fb_reply,params)
	}

	putCartByUser(id, params) {
		return this.putRequest(`${this.$$path.cart}/${id}`, params)
	}

	delCartByUser(id) {
		return this.deleteRequest(`${this.$$path.cart}/${id}`)
	}

	clearCartByUser() {
		return this.postRequest(`${this.$$path.cart}/clear`)
	}

	deleteAddress(id, params) {
		return this.deleteRequest(`${this.$$path.address}/${id}`)
	}
	
}

export default Service