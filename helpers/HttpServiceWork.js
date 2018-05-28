import ServiceBase from 'ServiceBase'
import __config from '../etc/config'
class Service extends ServiceBase {
	constructor() {
		super()
		this.$$prefix = '';
    this.$$basePath = __config.workPath;
		this.$$path = {	
			//用户相关
      userInforSave:'r/user/saveUserInfor',
      userInforGet: 'r/user/getUserInfo',
			teamUsers	:	'r/user/listCompanyUser',
			teamCreate	:	'r/user/teamCreate',
			teamList	: 	'r/user/teamList',
      teamDeptList: 'r/user/teamDeptList',
      teamGet: 'r/user/getTeam',
			teamChange	: 	'r/user/teamChange',
      teamShare: 'r/user/teamShare',
      teamMembers: 'r/user/teamMembers',
			//项目
			projectList: 'r/project/myProjects',  //我的项目
			projectSearch:'r/project/search',
      projectCreate:'r/project/add', //创建项目
			projectGet: 'r/project/get',  //获取项目
			projectSave: 'r/project/save',  //保存项目	
			projectRemove:'r/project/remove',//删除项目
			projectFinish:'r/project/setProjectSts',//完成项目
			//任务
      taskAdd: 'r/task/add',
      taskList: 'r/task/list',
      taskRemove: 'r/task/remove',
      taskChangeStatus: 'r/task/changeStatus',
			//审核
      processListTeam:'r/process/listTeam',
      processStart: 'r/process/transact-start', //发起流程
      processSubmitInit:'r/process/transact-init',//提交流程
      processMyList: 'r/process/myprocess',//提交流程
      processGet:'r/process/transact-get',  //获取流程
      processAudit: 'r/process/transact',  //流程审核
      processHis:'r/process/process-his',//历史已完成流程


			//签到
      signIn:'r/sign/signin',
      signOut: 'r/sign/signout',
      signInfo:'r/sign/get',

      //自定义模板
      tmplGet: 'r/tmpl/get',
      tmplDataAdd:'r/tmpl/dataAdd',
      tmplDataSave: 'r/tmpl/dataSave',
      tmplDataGet:'r/tmpl/data',
      tmplDataNoteList:'r/note/list', //报告列表

      //共享文档
      docShareAddFolder: 'r/wx/doc/addFolder',
      docShareList:'r/wx/doc/list',
      docShareGet: 'r/wx/doc/get',
      docAddFile:'r/wx/doc/addFile',
      docFileRemove: 'r/wx/doc/remove',
      docFileMove:'r/wx/doc/move',
      docFileRename: 'r/wx/doc/rename',
      docListAllShare:'r/wx/doc/listAllShare',

			//工作日志


			//日程


			//公告
      annoPublish: 'r/anno/publish',

			//发布动态
      dynaPublish: 'r/wx/dyna/publish',
      dynaList: 'r/wx/dyna/mylist',
      dynaRemove: 'r/wx/dyna/remove',
      dynaLike: 'r/wx/dyna/like',
      dynaAddComment: 'r/wx/dyna/addComment',
      removeComment: 'r/wx/dyna/removeComment',
      
      //流量统计
      netFlow:'r/wx/net',
      netFlowListServer:'r/user/listWebNetStat',
      //Sumslack相关
      sumslackBind:'r/wx/service/bindSumslack',
      sumslackCheck: 'r/wx/service/bindSumslackCheck',
      
      //AI下拉框
      aiList:'r/wx/service/ai_thing',
      //首页
      myHome: 'r/wx/service/myHome'
			
			
        }
	}
  userInforGet(params) {
    return this.getRequest(this.$$path.userInforGet, params)
  }
  userInforSave(params) {
    return this.getRequest(this.$$path.userInforSave, params)
  }
  teamGet(params) {
    return this.getRequest(this.$$path.teamGet, params)
  }
	teamUsers(params){
		return this.getRequest(this.$$path.teamUsers,params)
	}
	teamCreate(params){
		return this.getRequest(this.$$path.teamCreate,params)
	}
	teamList(params){
		return this.getRequest(this.$$path.teamList,params)
	}
  teamDeptList(params) {
    return this.getRequest(this.$$path.teamDeptList, params)
  }
	teamChange(params){
		return this.getRequest(this.$$path.teamChange,params)
	}
  teamShare(params) {
    return this.getRequest(this.$$path.teamShare, params)
  }
  teamMembers(params) {
    return this.getRequest(this.$$path.teamMembers, params)
  }
  signInfo(params) {
    return this.getRequest(this.$$path.signInfo, params)
  }
  signIn(params) {
    return this.getRequest(this.$$path.signIn, params)
  }
  signOut(params) {
    return this.getRequest(this.$$path.signOut, params)
  }

  tmplGet(params) {
    return this.getRequest(this.$$path.tmplGet, params)
  }
  tmplDataAdd(params) {
    return this.getRequest(this.$$path.tmplDataAdd, params)
  }
  tmplDataSave(params) {
    return this.getRequest(this.$$path.tmplDataSave, params)
  }
  tmplDataGet(params) {
    return this.getRequest(this.$$path.tmplDataGet, params)
  }
  tmplDataNoteList(params) {
    return this.getRequest(this.$$path.tmplDataNoteList, params)
  }

	projectList(params){
		return this.getRequest(this.$$path.projectList,params)
	}
	projectSearch(params){
		return this.getRequest(this.$$path.projectSearch,params)
	}
    projectCreate(params){
		return this.getRequest(this.$$path.projectCreate,params)
	}
	projectGet(params){
		return this.getRequest(this.$$path.projectGet,params)
	}
	projectSave(params){
		return this.getRequest(this.$$path.projectSave,params)
	}	
	projectRemove(params){
		return this.getRequest(this.$$path.projectRemove,params)
	}	
	projectFinish(params){
		return this.getRequest(this.$$path.projectFinish,params)
	}	

  docShareAddFolder(params) {
    return this.getRequest(this.$$path.docShareAddFolder, params)
  }	
  docShareList(params) {
    return this.getRequest(this.$$path.docShareList, params)
  }	
  docShareGet(params) {
    return this.getRequest(this.$$path.docShareGet, params)
  }	
  docAddFile(params) {
    return this.getRequest(this.$$path.docAddFile, params)
  }	
  docFileRemove(params) {
    return this.getRequest(this.$$path.docFileRemove, params)
  }	
  docFileMove(params) {
    return this.getRequest(this.$$path.docFileMove, params)
  }	
  docFileRename(params) {
    return this.getRequest(this.$$path.docFileRename, params)
  }	
  docListAllShare(params) {
    return this.getRequest(this.$$path.docListAllShare, params)
  }	

  dynaPublish(params) {
    return this.postRequest(this.$$path.dynaPublish, params)
  }	
  dynaList(params) {
    return this.getRequest(this.$$path.dynaList, params)
  }	
  dynaLike(params) {
    return this.getRequest(this.$$path.dynaLike, params)
  }	
  dynaAddComment(params) {
    return this.getRequest(this.$$path.dynaAddComment, params)
  }	
  removeComment(params) {
    return this.getRequest(this.$$path.removeComment, params)
  }	
  dynaRemove(params) {
    return this.getRequest(this.$$path.dynaRemove, params)
  }	
  myHome(params) {
    return this.getRequest(this.$$path.myHome, params)
  }	
  taskAdd(params) {
    return this.getRequest(this.$$path.taskAdd, params)
  }	
  taskList(params) {
    return this.getRequest(this.$$path.taskList, params)
  }	
  taskRemove(params) {
    return this.getRequest(this.$$path.taskRemove, params)
  }	
  taskChangeStatus(params) {
    return this.getRequest(this.$$path.taskChangeStatus, params)
  }	

  processListTeam(params) {
    return this.getRequest(this.$$path.processListTeam, params)
  }	
  processStart(params) {
    return this.getRequest(this.$$path.processStart, params)
  }	
  processSubmitInit(params) {
    return this.getRequest(this.$$path.processSubmitInit, params)
  }	
  processMyList(params) {
    return this.getRequest(this.$$path.processMyList, params)
  }	
  processGet(params) {
    return this.getRequest(this.$$path.processGet, params)
  }	
  processAudit(params) {
    return this.getRequest(this.$$path.processAudit, params)
  }	
  processHis(params) {
    return this.getRequest(this.$$path.processHis, params)
  }	

  netFlow(params) {
    return this.getRequest(this.$$path.netFlow, params)
  }	
  netFlowListServer(params) {
    return this.getRequest(this.$$path.netFlowListServer, params)
  }	
  annoPublish(params) {
    return this.getRequest(this.$$path.annoPublish, params)
  }	
  sumslackBind(params) {
    return this.getRequest(this.$$path.sumslackBind, params)
  }	
  aiList(params) {
    return this.getRequest(this.$$path.aiList, params)
  }	
  
  sumslackCheck(params) {
    return this.getRequest(this.$$path.sumslackCheck, params)
  }	
}

export default Service