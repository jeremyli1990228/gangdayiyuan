<template>
  <div class="page-container">
    <!-- 面包屑导航 -->
    <div class="breadcrumb">
      <span class="breadcrumb-item">
        <svg class="breadcrumb-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </span>
      <span class="breadcrumb-separator">/</span>
      <span class="breadcrumb-item">系统权限</span>
      <span class="breadcrumb-separator">/</span>
      <span class="breadcrumb-item active">功能权限</span>
    </div>

    <!-- 页面标题 -->
    <div class="page-header">
      <h1 class="page-title">功能权限</h1>
    </div>

    <div class="permission-container">
      <!-- 角色选择 -->
      <div class="role-panel">
        <div class="panel-header">
          <h3 class="panel-title">选择角色</h3>
        </div>
        <div class="panel-body">
          <div :class="['role-item', selectedRole === role.id ? 'active' : '']" 
               v-for="role in roles" 
               :key="role.id"
               @click="selectRole(role.id)">
            <span class="role-name">{{ role.name }}</span>
            <span class="role-count">{{ role.userCount }}人</span>
          </div>
        </div>
      </div>

      <!-- 权限配置 -->
      <div class="permission-panel">
        <div class="panel-header">
          <h3 class="panel-title">权限配置</h3>
          <div class="panel-actions">
            <button class="btn btn-secondary" @click="expandAll">展开全部</button>
            <button class="btn btn-secondary" @click="collapseAll">收起全部</button>
          </div>
        </div>
        <div class="panel-body">
          <div class="permission-group" v-for="group in permissions" :key="group.key">
            <div class="group-header" @click="group.expanded = !group.expanded">
              <svg :class="['expand-icon', group.expanded ? 'expanded' : '']" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M9 18L15 12L9 6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <label class="checkbox-wrapper">
                <input type="checkbox" :checked="isGroupChecked(group)" @change="toggleGroup(group)" @click.stop>
                <span class="checkbox-custom"></span>
              </label>
              <span class="group-title">{{ group.title }}</span>
            </div>
            <div class="group-items" v-if="group.expanded">
              <div class="permission-item" v-for="item in group.items" :key="item.key">
                <label class="checkbox-wrapper">
                  <input type="checkbox" v-model="item.checked">
                  <span class="checkbox-custom"></span>
                </label>
                <span class="item-name">{{ item.name }}</span>
                <span class="item-desc">{{ item.desc }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="panel-footer">
          <button class="btn btn-primary" @click="savePermissions">
            <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H16L21 8V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M17 21V13H7V21" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M7 3V8H15" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            保存权限
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const selectedRole = ref(1)

const roles = ref([
  { id: 1, name: '管理员', userCount: 2 },
  { id: 2, name: '部门主管', userCount: 5 },
  { id: 3, name: '普通员工', userCount: 15 },
  { id: 4, name: '实习生', userCount: 3 }
])

const permissions = ref([
  {
    key: 'complaint',
    title: '投诉管理',
    expanded: true,
    items: [
      { key: 'complaint-view', name: '查看投诉', desc: '查看投诉列表和详情', checked: true },
      { key: 'complaint-handle', name: '处理投诉', desc: '处理待办投诉', checked: true },
      { key: 'complaint-export', name: '导出投诉', desc: '导出投诉数据', checked: true },
      { key: 'complaint-statistics', name: '投诉统计', desc: '查看投诉统计数据', checked: true },
      { key: 'complaint-settings', name: '投诉设置', desc: '配置投诉相关设置', checked: false }
    ]
  },
  {
    key: 'satisfaction',
    title: '满意度调查',
    expanded: true,
    items: [
      { key: 'satisfaction-view', name: '查看调查', desc: '查看满意度调查数据', checked: true },
      { key: 'satisfaction-export', name: '导出调查', desc: '导出满意度调查数据', checked: true },
      { key: 'satisfaction-settings', name: '调查设置', desc: '配置满意度调查设置', checked: false }
    ]
  },
  {
    key: 'statistics',
    title: '数据统计',
    expanded: false,
    items: [
      { key: 'statistics-view', name: '查看统计', desc: '查看全部统计数据', checked: true },
      { key: 'statistics-dept', name: '部门统计', desc: '查看本部门统计数据', checked: true },
      { key: 'statistics-export', name: '导出统计', desc: '导出统计报表', checked: true }
    ]
  },
  {
    key: 'case',
    title: '案件管理',
    expanded: false,
    items: [
      { key: 'case-view', name: '查看案件', desc: '查看全部案件', checked: true },
      { key: 'case-add', name: '新增案件', desc: '新增案件记录', checked: true },
      { key: 'case-edit', name: '编辑案件', desc: '编辑案件信息', checked: true },
      { key: 'case-delete', name: '删除案件', desc: '删除案件记录', checked: false },
      { key: 'case-transfer', name: '转办案件', desc: '转办案件给他人', checked: true }
    ]
  },
  {
    key: 'report',
    title: '案件报备',
    expanded: false,
    items: [
      { key: 'report-view', name: '查看报备', desc: '查看全部报备', checked: true },
      { key: 'report-add', name: '新增报备', desc: '新增案件报备', checked: true },
      { key: 'report-export', name: '导出报备', desc: '导出报备数据', checked: true }
    ]
  },
  {
    key: 'system',
    title: '系统管理',
    expanded: false,
    items: [
      { key: 'system-user', name: '用户管理', desc: '管理系统用户', checked: false },
      { key: 'system-role', name: '角色管理', desc: '管理角色权限', checked: false },
      { key: 'system-menu', name: '菜单管理', desc: '管理系统菜单', checked: false },
      { key: 'system-log', name: '日志查看', desc: '查看系统日志', checked: true }
    ]
  }
])

const selectRole = (roleId) => {
  selectedRole.value = roleId
  // 根据角色加载对应权限配置
}

const isGroupChecked = (group) => {
  return group.items.every(item => item.checked)
}

const toggleGroup = (group) => {
  const checked = !isGroupChecked(group)
  group.items.forEach(item => item.checked = checked)
}

const expandAll = () => {
  permissions.value.forEach(group => group.expanded = true)
}

const collapseAll = () => {
  permissions.value.forEach(group => group.expanded = false)
}

const savePermissions = () => {
  alert('权限保存成功！')
}
</script>

<style scoped>
.page-container {
  padding: 20px;
  background: #f5f7fa;
  min-height: 100vh;
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
  font-size: 14px;
}

.breadcrumb-icon {
  width: 16px;
  height: 16px;
  color: #666;
}

.breadcrumb-item {
  color: #666;
}

.breadcrumb-item.active {
  color: #1890ff;
}

.breadcrumb-separator {
  color: #999;
}

.page-header {
  margin-bottom: 20px;
}

.page-title {
  font-size: 20px;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.permission-container {
  display: flex;
  gap: 20px;
}

.role-panel {
  width: 240px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.permission-panel {
  flex: 1;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
}

.panel-header {
  padding: 16px 20px;
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.panel-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.panel-actions {
  display: flex;
  gap: 8px;
}

.panel-body {
  flex: 1;
  padding: 16px 20px;
  overflow-y: auto;
}

.panel-footer {
  padding: 16px 20px;
  border-top: 1px solid #f0f0f0;
  display: flex;
  justify-content: flex-end;
}

.role-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
}

.role-item:hover {
  background: #f5f7fa;
}

.role-item.active {
  background: #e6f7ff;
}

.role-name {
  font-size: 14px;
  color: #333;
}

.role-count {
  font-size: 12px;
  color: #999;
}

.permission-group {
  margin-bottom: 16px;
}

.group-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: #fafafa;
  border-radius: 4px;
  cursor: pointer;
}

.expand-icon {
  width: 16px;
  height: 16px;
  color: #999;
  transition: transform 0.3s;
}

.expand-icon.expanded {
  transform: rotate(90deg);
}

.checkbox-wrapper {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.checkbox-wrapper input {
  display: none;
}

.checkbox-custom {
  width: 16px;
  height: 16px;
  border: 1px solid #d9d9d9;
  border-radius: 2px;
  position: relative;
  transition: all 0.3s;
}

.checkbox-wrapper input:checked + .checkbox-custom {
  background: #1890ff;
  border-color: #1890ff;
}

.checkbox-wrapper input:checked + .checkbox-custom::after {
  content: '';
  position: absolute;
  left: 5px;
  top: 2px;
  width: 4px;
  height: 8px;
  border: solid #fff;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.group-title {
  font-size: 14px;
  font-weight: 500;
  color: #333;
}

.group-items {
  padding: 8px 0 8px 36px;
}

.permission-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
}

.item-name {
  font-size: 14px;
  color: #333;
}

.item-desc {
  font-size: 12px;
  color: #999;
  margin-left: auto;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 32px;
  padding: 0 16px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-primary {
  background: #1890ff;
  color: #fff;
}

.btn-primary:hover {
  background: #40a9ff;
}

.btn-secondary {
  background: #fff;
  color: #666;
  border: 1px solid #d9d9d9;
}

.btn-secondary:hover {
  color: #1890ff;
  border-color: #1890ff;
}

.btn-icon {
  width: 14px;
  height: 14px;
}
</style>
