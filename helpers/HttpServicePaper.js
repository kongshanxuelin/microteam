import ServiceBase from 'ServiceBase'
import __config from '../etc/config'
class Service extends ServiceBase {
	constructor() {
		super()
		this.$$prefix = '';
    this.$$basePath = __config.paperPath;
		this.$$path = {	
      //试卷相关
      paperGet: 'paper/share.jhtml',
      paperGenImage: 'paper/genImage.jhtml'
			
			
        }
	}
  paperGet(params) {
    return this.getRequest(this.$$path.paperGet, params)
  }
  paperGenImage(params) {
    return this.getRequest(this.$$path.paperGenImage, params)
  }	
}

export default Service