<template>
  <div class="sidebar">
    <el-menu
      class="sidebar-el-menu"
      :default-active="onRoutes"
      :collapse="collapse"
      background-color="#393D49"
      text-color="#FFFFFF"
      active-text-color="#FFFFFF"
      unique-opened
      router
    >
      <template v-for="item in items">
        <template v-if="item.subs">
          <el-submenu :index="item.index" :key="item.index">
            <template slot="title">
              <i :class="item.icon"></i>
              <span>{{item.name}}</span>
            </template>
            <template v-for="subItem in item.subs">
              <el-submenu v-if="subItem.subs" :index="subItem.url" :key="subItem.url">
                <template slot="title">{{ subItem.name }}</template>
                <el-menu-item
                  v-for="(threeItem,i) in subItem.subs"
                  :key="i"
                  :index="threeItem.url"
                >{{ threeItem.name }}</el-menu-item>
              </el-submenu>
              <el-menu-item
                v-else
                :index="subItem.url"
                :key="subItem.url"
              >&nbsp;&nbsp;&nbsp;&nbsp; {{ subItem.name }}</el-menu-item>
            </template>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="item.index" :key="item.index">
            <i :class="item.icon"></i>
            <span slot="title">{{ item.name }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
import bus from "./bus";
import authApi from "@/api";
export default {
  name: "NavMenu",
  data() {
    return {
      collapse: false,
      items: []
    };
  },
  computed: {
    onRoutes() {
      return this.$route.path.replace("/", "");
    }
  },
  created() {
    var self = this;
    console.log(self.$store.getters.Authorization);
    // 通过 Event Bus 进行组件间通信，来折叠侧边栏
    bus.$on("collapse", msg => {
      this.collapse = msg;
    });
    var params = {};
    // 接口
    authApi.getMenu(params).then(response => {
      console.log("response");
      console.log(response);
     self.items = [
        {

          subs: [{
              url: "user",
              name: "管理员管理"
          },{
              url: "1111",
              name: "角色管理"
          },{
              url: "2222",
              name: "菜单管理"
          },{
              url: "3333",
              name: "SQL监控"
          },{
              url: "4444",
              name: "定时任务"
          },{
              url: "5555",
              name: "参数管理"
          },{
              url: "6666",
              name: "文件上传"
          },{
              url: "7777",
              name: "字典管理"
          },{
              url: "8888",
              name: "域维护"
          },{
              url: "9999",
              name: "系统日志"
          },{
              url: "1212",
              name: "API接口"
          },{
              url: "1313",
              name: "API接口（封装）"
          },{
              url: "1414",
              name: "部门管理"
          }],
          icon: "fa fa-cog",
          index: "1",
          name: "系统管理"
        },
        {

          subs: [],
          icon: "fa fa-diamond",
          index: "2",
          name: "测试目录"
        },
        {

          subs: [],
          icon: "fa fa-clipboard",
          index: "3",
          name: "BI首页"
        },
        {

          subs: [],
          icon: "fa fa-ravelry",
          index: "4",
          name: "信用地图"
        },
        {

          subs: [],
          icon: "fa fa-cubes",
          index: "5",
          name: "前端素材"
        },
        {

          subs: [],
          icon: "fa fa-file-code-o",
          index: "6",
          name: "标签"
        },{

          subs: [],
          icon: "el-icon-lx-copy",
          index: "7",
          name: "事前承诺"
        },{

          subs: [],
          icon: "fa fa-eye",
          index: "8",
          name: "项目概览"
        },{

          subs: [],
          icon: "el-icon-lx-calendar",
          index: "9",
          name: "事中监管"
        },{

          subs: [],
          icon: "fa fa-circle-thin",
          index: "10",
          name: "项目地图"
        },{

          subs: [],
          icon: "el-icon-lx-favor",
          index: "11",
          name: "事后评价"
        },{

          subs: [],
          icon: "fa fa-sitemap",
          index: "12",
          name: "审批监管"
        },{

          subs: [],
          icon: "fa fa-university",
          index: "13",
          name: "企业监管"
        },{

          subs: [],
          icon: "fa fa-address-book",
          index: "14",
          name: "中介监管"
        },{

          subs: [],
          icon: "fa fa-area-chart",
          index: "15",
          name: "专项分析"
        },{

          subs: [],
          icon: "el-icon-lx-calendar",
          index: "16",
          name: "模型管理"
        }
      ]
      console.log(self.items)
    });
  }
};
</script>

<style scoped>
.sidebar {
  display: block;
  position: absolute;
  left: 0;
  top: 70px;
  bottom: 0;
  overflow-y: scroll;
}

.sidebar::-webkit-scrollbar {
  width: 0;
}

.sidebar-el-menu:not(.el-menu--collapse) {
  width: 250px;
}

.sidebar > ul {
  height: 100%;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

.el-menu-item.is-active {
  background-color: #009688 !important;
}
</style>
