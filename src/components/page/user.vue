<template>
  <div class="userz">
    <el-row>
      <el-col :span="24">
        <el-card shadow="hover">
          <div class="container-content" ref="containercontent" :style="{height:height}">
            <div ref="containercontent2" :style="{height2:height2}">
              <el-dialog title="新增" :visible.sync="dialogVisible" width="50%">
                <el-form :rules="rules" ref="user" :model="user">
                  <el-row>
                    <div class="form-group">
                      <el-col :span="3">
                        <div class="alignright">用户名</div>
                      </el-col>
                      <el-col :span="16">
                        <el-form-item prop="username">
                          <el-input placeholder="请输入内容" v-model="user.username"></el-input>
                        </el-form-item>
                      </el-col>
                    </div>
                  </el-row>
                  <el-row>
                    <div class="form-group">
                      <el-col :span="3">
                        <div class="alignright">所属域</div>
                      </el-col>
                      <el-col :span="16">
                        <el-form-item prop="domainName">
                          <el-select v-model="user.domainName" placeholder="请选择">
                            <el-option
                              v-for="item in options"
                              :key="item.domainId"
                              :label="item.domainName"
                              :value="item.domainId+'/'+item.domainName"
                            ></el-option>
                          </el-select>
                        </el-form-item>
                        <!-- <el-input placeholder="请输入内容"></el-input> -->
                      </el-col>
                    </div>
                  </el-row>
                  <el-row>
                    <div class="form-group">
                      <el-col :span="3">
                        <div class="alignright">所属部门</div>
                      </el-col>
                      <el-col :span="16">
                        <el-input
                          :readonly="true"
                          placeholder="所属部门"
                          v-model="user.deptName"
                          @click.native="ssbm()"
                        ></el-input>
                      </el-col>
                    </div>
                  </el-row>
                  <el-row>
                    <div class="form-group">
                      <el-col :span="3">
                        <div class="alignright">密码</div>
                      </el-col>
                      <el-col :span="16">
                        <el-form-item prop="password">
                          <el-input placeholder="密码" v-model="user.password"></el-input>
                        </el-form-item>
                      </el-col>
                    </div>
                  </el-row>
                  <el-row>
                    <div class="form-group">
                      <el-col :span="3">
                        <div class="alignright">邮箱</div>
                      </el-col>
                      <el-col :span="16">
                        <el-form-item prop="email">
                          <el-input placeholder="邮箱" v-model="user.email"></el-input>
                        </el-form-item>
                      </el-col>
                    </div>
                  </el-row>
                  <el-row>
                    <div class="form-group">
                      <el-col :span="3">
                        <div class="alignright">手机号</div>
                      </el-col>
                      <el-col :span="16">
                        <el-form-item prop="mobile">
                          <el-input placeholder="手机号" v-model="user.mobile"></el-input>
                        </el-form-item>
                      </el-col>
                    </div>
                  </el-row>
                  <el-row>
                    <div class="form-group">
                      <el-col :span="3">
                        <div class="alignright">角色</div>
                      </el-col>
                      <el-col :span="16">
                          <el-checkbox-group v-model="user.roleIdList">
                            <el-row>
                              <el-col :span="6">
                                <el-checkbox label="1">广州研发</el-checkbox>
                              </el-col>
                              <el-col :span="6">
                                <el-checkbox label="2">系统管理员</el-checkbox>
                              </el-col>
                              <el-col :span="6">
                                <el-checkbox label="3">测试</el-checkbox>
                              </el-col>
                              <el-col :span="6">
                                <el-checkbox label="4">德清</el-checkbox>
                              </el-col>
                            </el-row>
                            <el-row>
                              <el-col :span="6">
                                <el-checkbox label="5">部门</el-checkbox>
                              </el-col>
                              <el-col :span="6">
                                <el-checkbox label="6">佛山</el-checkbox>
                              </el-col>
                              <el-col :span="6">
                                <el-checkbox label="7">发改局</el-checkbox>
                              </el-col>
                              <el-col :span="6">
                                <el-checkbox label="9">领导小组</el-checkbox>
                              </el-col>
                            </el-row>
                          </el-checkbox-group>
                      </el-col>
                    </div>
                  </el-row>
                  <el-row>
                    <div class="form-group">
                      <el-col :span="3">
                        <div class="alignright">状态</div>
                      </el-col>
                      <el-col :span="16">
                        <el-radio-group v-model="user.status">
                          <el-radio label="0">禁用</el-radio>
                          <el-radio label="1">正常</el-radio>
                        </el-radio-group>
                      </el-col>
                    </div>
                  </el-row>
                </el-form>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogVisible = false">取 消</el-button>
                  <el-button type="primary" @click="usersave('user')">确 定</el-button>
                </span>
              </el-dialog>
              <el-dialog title="部门" :visible.sync="dialogVisible2" width="50%">
                <el-tree :props="props1" :load="loadNode1" lazy @node-click="handleNodeClick"></el-tree>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogVisible2 = false">取 消</el-button>
                  <el-button type="primary" @click="dialogVisible2 = false">确 定</el-button>
                </span>
              </el-dialog>
              <el-dialog title="修改" :visible.sync="dialogVisible3" width="50%">
                <el-row>
                  <div class="form-group">
                    <el-col :span="3">
                      <div class="alignright">用户名</div>
                    </el-col>
                    <el-col :span="16">
                      <el-input placeholder="请输入内容" v-model="userchange.username"></el-input>
                    </el-col>
                  </div>
                </el-row>
                <el-row>
                  <div class="form-group">
                    <el-col :span="3">
                      <div class="alignright">所属域</div>
                    </el-col>
                    <el-col :span="16">
                      <el-select v-model="userchange.domainName" placeholder="请选择">
                        <el-option
                          v-for="item in options"
                          :key="item.domainId"
                          :label="item.domainName"
                          :value="item.domainId+'/'+item.domainName"
                        ></el-option>
                      </el-select>
                      <!-- <el-input placeholder="请输入内容"></el-input> -->
                    </el-col>
                  </div>
                </el-row>
                <el-row>
                  <div class="form-group">
                    <el-col :span="3">
                      <div class="alignright">所属部门</div>
                    </el-col>
                    <el-col :span="16">
                      <el-input
                        :readonly="true"
                        placeholder="所属部门"
                        v-model="userchange.deptName"
                        @click.native="ssbm()"
                      ></el-input>
                    </el-col>
                  </div>
                </el-row>
                <el-row>
                  <div class="form-group">
                    <el-col :span="3">
                      <div class="alignright">密码</div>
                    </el-col>
                    <el-col :span="16">
                      <el-input placeholder="密码" v-model="userchange.password"></el-input>
                    </el-col>
                  </div>
                </el-row>
                <el-row>
                  <div class="form-group">
                    <el-col :span="3">
                      <div class="alignright">邮箱</div>
                    </el-col>
                    <el-col :span="16">
                      <el-input placeholder="邮箱" v-model="userchange.email"></el-input>
                    </el-col>
                  </div>
                </el-row>
                <el-row>
                  <div class="form-group">
                    <el-col :span="3">
                      <div class="alignright">手机号</div>
                    </el-col>
                    <el-col :span="16">
                      <el-input placeholder="手机号" v-model="userchange.mobile"></el-input>
                    </el-col>
                  </div>
                </el-row>
                <el-row>
                  <div class="form-group">
                    <el-col :span="3">
                      <div class="alignright">角色</div>
                    </el-col>
                    <el-col :span="16">
                      <el-checkbox-group v-model="userchange.roleIdList">
                        <el-row>
                          <el-col :span="6">
                            <el-checkbox label="1">广州研发</el-checkbox>
                          </el-col>
                          <el-col :span="6">
                            <el-checkbox label="2">系统管理员</el-checkbox>
                          </el-col>
                          <el-col :span="6">
                            <el-checkbox label="3">测试</el-checkbox>
                          </el-col>
                          <el-col :span="6">
                            <el-checkbox label="4">德清</el-checkbox>
                          </el-col>
                        </el-row>
                        <el-row>
                          <el-col :span="6">
                            <el-checkbox label="5">部门</el-checkbox>
                          </el-col>
                          <el-col :span="6">
                            <el-checkbox label="6">佛山</el-checkbox>
                          </el-col>
                          <el-col :span="6">
                            <el-checkbox label="7">发改局</el-checkbox>
                          </el-col>
                          <el-col :span="6">
                            <el-checkbox label="9">领导小组</el-checkbox>
                          </el-col>
                        </el-row>
                      </el-checkbox-group>
                    </el-col>
                  </div>
                </el-row>
                <el-row>
                  <div class="form-group">
                    <el-col :span="3">
                      <div class="alignright">状态</div>
                    </el-col>
                    <el-col :span="16">
                      <el-radio-group v-model="userchange.status">
                        <el-radio label="0">禁用</el-radio>
                        <el-radio label="1">正常</el-radio>
                      </el-radio-group>
                    </el-col>
                  </div>
                </el-row>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogVisible = false">取 消</el-button>
                  <el-button type="primary" @click="usersavexiugai()">确 定</el-button>
                </span>
              </el-dialog>
              <div>
                <div class="sinput_chaxun">
                  <input
                    type="text"
                    autocomplete="off"
                    placeholder="请输入用户名"
                    class="el-input__inner"
                    v-model="username"
                  >
                </div>
                <div class="sinput_anniu marl10">
                  <el-button type="primary" plain @click.native="search()">查询</el-button>
                </div>
                <div class="sinput_anniu marl10">
                  <el-button type="primary" @click.native="newcreate()">
                    <i class="el-icon-plus"></i>
                    <span class="padl3">新增</span>
                  </el-button>
                </div>
                <div class="sinput_anniu marl10">
                  <el-button type="primary" @click.native="modifythe()">
                    <i class="el-icon-edit-outline"></i>
                    <span class="padl3">修改</span>
                  </el-button>
                </div>
                <div class="sinput_anniu marl10">
                  <el-button type="primary" @click.native="del()">
                    <i class="el-icon-delete"></i>
                    <span class="padl3">删除</span>
                  </el-button>
                </div>
              </div>
              <div class="tablemar20">
                <el-table
                  :data="tableData"
                  style="width: 100%"
                  border
                  v-loading="loading"
                  ref="multipleTable"
                  @selection-change="handleSelectionChange"
                >
                  <el-table-column type="selection" width="55"></el-table-column>
                  <el-table-column prop="username" label="用户名"></el-table-column>
                  <el-table-column prop="realname" label="姓名"></el-table-column>
                  <el-table-column prop="deptName" label="所属部门"></el-table-column>
                  <el-table-column prop="domainName" label="所属域" width="210"></el-table-column>
                  <el-table-column prop="mobile" label="手机号"></el-table-column>
                  <el-table-column label="状态">
                    <template slot-scope="scope">
                      <div class="redcontent" v-if="scope.row.status == 1">
                        <el-button type="success">正常</el-button>
                      </div>
                      <div class="redcontent" v-if="scope.row.status == 0">
                        <el-button type="info">禁用</el-button>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column prop="createTime" label="创建时间"></el-table-column>
                </el-table>
              </div>
              <div class="right">
                <el-pagination
                  @current-change="handleCurrentChange"
                  :current-page="currentPage"
                  :page-size="pagesize"
                  layout="total, prev, pager, next, jumper"
                  :total="total"
                ></el-pagination>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// 引入api接口调用，@ 表示src根目录下
import api from "@/api";
import * as utils from "@/utils";
import { validatePhone, validateEMail } from "static/js/validate";
export default {
  // 组件名称
  name: "user",
  components: {
    // ZTree
  },
  data() {
    return {
      screenHeight: document.documentElement.clientHeight, //屏幕高度
      height: 0,
      height2: 0,
      tableData: [],
      currentPage: 1,
      total: 0,
      pagesize: 8,
      loading: false,
      username: "",
      multipleSelection: [],
      dialogVisible: false,
      bbb: "",
      dialogVisible2: false,
      options: [],
      value: "",
      props1: {
        label: "name",
        children: "zones",
        isLeaf: "leaf"
      },
      rules: {
        username: [
          { required: true, message: "用户名不能为空", trigger: "blur" }
        ],
        domainName: [{ required: true, message: "请选择域", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          {
            validator: validateEMail,
            message: "请输入正确的邮箱格式",
            trigger: "blur"
          }
        ],
        mobile: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { validator: validatePhone, message: "手机号码格式", trigger: "blur" }
        ],
        roleIdList: [{ required: true, message: "请选择角色", trigger: "blur" }]
      },
      user: {
        username: "",
        domainName: "",
        deptName: "",
        password: "",
        email: "",
        mobile: "",
        roleIdList: [],
        status: "1",
        deptName: "",
        deptId: ""
      },
      userchange: {
        username: "",
        domainId: "",
        domainName: "",
        deptName: "",
        password: "",
        email: "",
        mobile: "",
        roleIdList: [],
        status: "",
        deptName: "",
        deptId: ""
      },
      dialogVisible3: false
    };
  },
  created() {},
  watch: {
    height2(val) {
      var self = this;
      self.heightchange(val);
    }
  },
  computed: {
    data() {}
  },
  methods: {
    //改变page时触发的事件
    handleCurrentChange(val) {
      var self = this;
      self.currentPage = val;
      self.userlist();
    },
    //高度监控
    heightchange: function(val) {
      var self = this;
      if (val) {
        var containercontent = val;
      } else {
        var containercontent = self.$refs.containercontent2.offsetHeight;
      }
      console.log(containercontent, self.screenHeight);
      if (containercontent <= self.screenHeight - 162) {
        self.height = self.screenHeight - 162 + "px";
      } else {
        self.height = containercontent + "px";
      }
    },
    //list数据渲染
    userlist: function() {
      var self = this;
      var params = {
        limit: self.pagesize,
        page: self.currentPage,
        order: "asc",
        username: self.username
      };
      self.loading = true;
      api.userlist(params).then(response => {
        self.loading = false;
        self.total = response.page.totalCount;
        self.tableData = response.page.list;
        console.log(self.tableData);
        console.log(response.page.list);
      });
    },
    listAll: function() {
      var self = this;
      api.sysdomainlistAll().then(response => {
        self.options = response;
      });
    },
    deptlistall: function() {
      var self = this;
      api.deptlist().then(response => {
        self.deptlistalldata = response;
      });
    },
    //查询按钮
    search: function() {
      var self = this;
      self.currentPage = 1;
      self.userlist();
    },
    //修改
    modifythe: function() {
      var self = this;
      if (this.multipleSelection.length == 0) {
        this.$message({
          message: "至少选择一条数据",
          type: "warning"
        });
        return;
      } else if (this.multipleSelection.length > 1) {
        this.$message({
          message: "只能选择一条数据",
          type: "warning"
        });
        return;
      }
      console.log(self.multipleSelection[0]);
      self.userchange.username = self.multipleSelection[0].username;
      self.userchange.domainName = self.multipleSelection[0].domainName;
      self.userchange.deptName = self.multipleSelection[0].deptName;
      self.userchange.domainId = self.multipleSelection[0].domainId;
      self.userchange.password = self.multipleSelection[0].password;
      self.userchange.email = self.multipleSelection[0].email;
      self.userchange.mobile = self.multipleSelection[0].mobile;
      self.userchange.roleIdList = self.multipleSelection[0].roleIdList;
      self.userchange.status = self.multipleSelection[0].status.toString();
      self.userchange.deptName = self.multipleSelection[0].deptName;
      self.userchange.deptId = self.multipleSelection[0].deptId;
      self.dialogVisible3 = true;
    },
    //删除
    del: function() {
      var self = this;
      if (this.multipleSelection.length == 0) {
        this.$message({
          message: "至少选择一条数据",
          type: "warning"
        });
        return;
      }
      var newarr = [];
      self.multipleSelection.forEach((item, v) => {
        newarr.push(item.userId);
      });
      api.userdelete(newarr).then(response => {
        if (response.data.code == 0) {
          this.$message({
            message: "删除成功",
            type: "warning"
          });
        } else {
          this.$message({
            message: response.data.msg,
            type: "warning"
          });
        }
        self.userlist();
      });
    },
    //复选框按钮点击时事件
    handleSelectionChange: function(val) {
      this.multipleSelection = val;
      //console.log(this.multipleSelection);
    },
    //弹出部门树
    ssbm: function() {
      var self = this;
      self.dialogVisible2 = true;
    },
    usersavexiugai: function() {
      var self = this;
      var self = this;
      var params = {
        deptId: self.userchange.deptId,
        deptName: self.userchange.deptName,
        domainId: self.userchange.domainId,
        domainName: self.userchange.domainName,
        email: self.userchange.email,
        mobile: self.userchange.mobile,
        password: self.userchange.password,
        roleIdList: self.userchange.roleIdList,
        status: self.userchange.status,
        username: self.userchange.username
      };
      // console.log(self.userchange.domainName)
      if (self.userchange.domainName.indexOf("/") > -1) {
        params.domainName = self.user.domainName.split("/")[1];
        params.domainId = self.user.domainName.split("/")[0];
        // console.log(self.userchange.domainName)
      }
      api.userupdate(params).then(response => {
        if (response.data.code == 0) {
          this.$message({
            message: "修改成功",
            type: "success"
          });
          self.userlist();
        } else {
          this.$message({
            message: response.data.msg,
            type: "success"
          });
        }
        self.userlist();
      });
      self.dialogVisible3 = false;
    },
    //部门树
    loadNode1(node, resolve) {
      var self = this;

      if (node.level === 0) {
        var params = {
          name: "",
          parentId: ""
        };
      } else {
        var params = {
          name: node.data.name,
          parentId: node.data.deptId
        };
        self.localparams = params;
      }
      api.deptlist(params).then(response => {
        // self.deptlistalldata = response
        if (node.level === 0) {
          // 如果是第一次加载数据，直接返回数据
          node.data = response;
          resolve(response);
        } else {
          // 如果非第一次加载数据，将返回数据拼接到操作节点的childList属性中
          node.data.childList = response;
          resolve(response);
        }
      });
    },
    handleNodeClick: function(data) {
      var self = this;
      self.user.deptName = data.name;
      self.user.deptId = data.deptId;
    },
    newcreate() {
      var self = this;
      self.dialogVisible = true;
    },
    usersave(formName) {
      var self = this;
      var params = {
        deptId: self.user.deptId,
        deptName: self.user.deptName,
        domainId: self.user.domainName.split("/")[0],
        domainName: self.user.domainName.split("/")[1],
        email: self.user.email,
        mobile: self.user.mobile,
        password: self.user.password,
        roleIdList: self.user.roleIdList,
        status: self.user.status,
        username: self.user.username
      };
      self.$refs[formName].validate(valid => {
        if (valid) {
          console.log("true")
          api.usersave(params).then(response => {
            if (response.data.code == 0) {
              console.log("111222333");
              this.$message({
                message: "添加成功",
                type: "success"
              });
              self.userlist();
              self.dialogVisible = false;
            } else {
              this.$message({
                message: response.data.msg,
                type: "success"
              });
            }
          });
        } else {
          console.log("false")
          return false;
        }
      });
    }
  },
  mounted() {
    var self = this;
    var heighttimeout = setTimeout(function() {
      self.heightchange();
      window.clearTimeout(heighttimeout);
    }, 800);
    self.userlist();
    self.listAll();
    self.deptlistall();
  }
};
</script>
<style lang="css">
/* 引入样式文件,省略文件后缀名 */
@import "./user";
</style>
