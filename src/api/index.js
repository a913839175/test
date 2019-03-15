import * as utils from '../utils';



export default {
    //登陆
    login: params => {
        return utils.postData(`/api/sys/login`, params);
    },
    //获取左侧菜单 
    getMenu: params => {
        return utils.getData(`/api/sys/menu/nav`, params);
    },
    // logout: params => {
    //     return utils.postData(`/api/sys/logout.do`, params);
    // },
    //获取管理人员列表 
    userlist: params => {
        return utils.getData(`/api/sys/user/list`, params);
    }, 
    //获取所属域 
    sysdomainlistAll: params => {
        return utils.getData(`/api/sys/sysdomain/listAll`, params);
    },
    //获取所属域部门 
    deptlist: params => {
        return utils.postData(`/api/sys/dept/list`, params);
    },
    //新增的管理人员 
    usersave: params => {
        return utils.postJSON(`/api/sys/user/save`, params);
    },
    //删除的管理人员 
    userdelete: params => {
        return utils.postJSON(`/api/sys/user/delete`, params);
    }, 
    //删除的管理人员 
    userupdate: params => {
        return utils.postJSON(`/api/sys/user/update`, params);
    }      
};


