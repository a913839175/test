<template>
    <div class="tags" v-if="showTags">
        <ul>
            <li class="tags-li" v-for="(item,index) in tagsList" :title="item.title" :class="{'active': isActive(item.name)}"
                :key="index">
                <router-link :to="item.path" class="tags-li-title">
                    {{item.title}}
                </router-link>
                <span class="tags-li-icon" @click="closeTags(index)"><i :class="item.name === 'standardloadmanage'? '' : 'el-icon-close'"></i></span>
            </li>
        </ul>
        <div class="tags-close-box">
            <el-dropdown @command="handleTags">
                <el-button size="mini" type="primary">
                    标签选项<i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu size="small" slot="dropdown">
                    <el-dropdown-item command="other">关闭其他</el-dropdown-item>
                    <el-dropdown-item command="all">关闭所有</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
    import bus from './bus';
    export default {
        data() {
            return {
                tagsList: [{
                    title: '管理员管理',
                    path: '/user',
                    name: 'user'
                }]
            }
        },
        methods: {
            isActive(name) {
                return name === this.$route.name;
            },
            // 关闭单个标签
            closeTags(index) {
                const delItem = this.tagsList.splice(index, 1)[0];
                const item = this.tagsList[index] ? this.tagsList[index] : this.tagsList[index - 1];
                if (item) {
                    delItem.name === this.$route.name && this.$router.push(item.path);
                } else {
                    this.$router.push('/');
                }
            },
            // 关闭全部标签
            closeAll() {
                // 保留首页
                this.tagsList = [{
                    title: '管理员管理',
                    path: '/user',
                    name: 'user'
                }];
                this.$router.push('/user');
            },
            // 关闭其他标签
            closeOther() {
                const curItem = this.tagsList.filter(item => {
                    return item.path === this.$route.fullPath;
                })
                // 保留首页
                this.tagsList = [{
                    title: '管理员管理',
                    path: '/user',
                    name: 'user'
                }];

                if (curItem[0].name !== 'user') {
                    this.tagsList.push(curItem[0]);
                }
                // 调转到当前路由
                this.$router.push(curItem[0].path);
            },
            // 设置标签
            setTags(route) {
                console.log("标签route")
                console.log(route)
                // console.log('设置标签')
                // console.log(this.tagsList)
                // console.log(route)
                // 判断是否重复
                const isExist = this.tagsList.some(item => {
                    return item.name === route.name;
                })
                console.log(isExist)
                if (!isExist) {
                    // 当标签超过8个删除第一个
                    if (this.tagsList.length >= 8) {
                        this.tagsList.shift();
                    }
                    this.tagsList.push({
                        title: route.meta.title,
                        path: route.fullPath,
                        name: route.matched[1].components.default.name
                    })
                }
                bus.$emit('tags', this.tagsList);
            },
            handleTags(command) {
                command === 'other' ? this.closeOther() : this.closeAll();
            }
        },
        computed: {
            showTags() {
                return this.tagsList.length > 0;
            }
        },
        watch: {
            $route(newValue, oldValue) {
                this.setTags(newValue);
            }
        },
        created() {
            this.setTags(this.$route);
        },
        mounted() {
           console.log(this.tagsList)
        },
    }

</script>


<style>
    .tags {
        position: relative;
        height: 30px;
        overflow: hidden;
        background: #fff;
        padding-right: 120px;
        box-shadow: 0 5px 10px #ddd;
    }

    .tags ul {
        box-sizing: border-box;
        width: 100%;
        height: 100%;
    }

    .tags-li {
        float: left;
        margin: 3px 5px 2px 3px;
        border-radius: 3px;
        font-size: 12px;
        overflow: hidden;
        cursor: pointer;
        height: 23px;
        line-height: 23px;
        border: 1px solid #e9eaec;
        background: #fff;
        padding: 0 5px 0 12px;
        vertical-align: middle;
        color: #666;
        -webkit-transition: all .3s ease-in;
        -moz-transition: all .3s ease-in;
        transition: all .3s ease-in;
    }

    .tags-li:not(.active):hover {
        background: #f8f8f8;
    }
    .tags-li.active {
        color: #fff;
    }

    .tags-li-title {
        float: left;
        max-width: 80px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        margin-right: 5px;
        color: #666;
    }

    .tags-li.active .tags-li-title {
        color: #fff;
    }

    .tags-close-box {
        position: absolute;
        right: 0;
        top: 0;
        box-sizing: border-box;
        padding-top: 1px;
        text-align: center;
        width: 110px;
        height: 30px;
        background: #fff;
        box-shadow: -3px 0 15px 3px rgba(0, 0, 0, .1);
        z-index: 10;
    }

    /* 自定义样式 */
    .tags-li.active {
        /* border: 1px solid #009688 !important; */
        /* background-color: #009688 !important; */
    }

</style>
