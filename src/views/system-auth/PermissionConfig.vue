<template>
  <div class="page-container">
    <div class="breadcrumb">
      <router-link to="/" class="breadcrumb-item">首页</router-link>
      <span class="breadcrumb-separator">›</span>
      <span class="breadcrumb-item">系统权限</span>
      <span class="breadcrumb-separator">›</span>
      <span class="breadcrumb-item active">权限配置</span>
    </div>
    
    <div class="permission-page">
      <!-- 角色列表 -->
      <div class="roles-section">
        <div class="section-header">
          <h3 class="section-title">角色管理</h3>
          <button class="btn btn-primary" @click="showRoleModal = true">+ 添加角色</button>
        </div>
        <div class="roles-list">
          <div 
            v-for="role in roles" 
            :key="role.id"
            :class="['role-item', { active: selectedRole?.id === role.id }]"
            @click="selectRole(role)"
          >
            <div class="role-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke-width="2"/>
                <circle cx="9" cy="7" r="4" stroke-width="2"/>
              </svg>
            </div>
            <div class="role-info">
              <div class="role-name">{{ role.name }}</div>
              <div class="role-desc">{{ role.description }}</div>
            </div>
            <div class="role-actions">
              <button class="btn-icon" @click.stop="editRole(role)">编辑</button>
              <button class="btn-icon danger" @click.stop="deleteRole(role)">删除</button>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 权限配置 -->
      <div class="permission-section" v-if="selectedRole">
        <div class="section-header">
          <h3 class="section-title">权限配置 - {{ selectedRole.name }}</h3>
        </div>
        
        <div class="permission-modules">
          <!-- 投诉管理权限 -->
          <div class="permission-module">
            <div class="module-header">
              <label class="module-check">
                <input type="checkbox" v-model="selectedRole.permissions.complaint" @change="toggleModule('complaint')">
                <span class="module-name">投诉管理</span>
              </label>
            </div>
            <div class="permission-items">
              <label class="permission-item">
                <input type="checkbox" v-model="selectedRole.permissions.complaintView" :disabled="!selectedRole.permissions.complaint">
                <span>查看</span>
              </label>
              <label class="permission-item">
                <input type="checkbox" v-model="selectedRole.permissions.complaintCreate" :disabled="!selectedRole.permissions.complaint">
                <span>新增</span>
              </label>
              <label class="permission-item">
                <input type="checkbox" v-model="selectedRole.permissions.complaintEdit" :disabled="!selectedRole.permissions.complaint">
                <span>编辑</span>
              </label>
              <label class="permission-item">
                <input type="checkbox" v-model="selectedRole.permissions.complaintDelete" :disabled="!selectedRole.permissions.complaint">
                <span>删除</span>
              </label>
              <label class="permission-item">
                <input type="checkbox" v-model="selectedRole.permissions.complaintExport" :disabled="!selectedRole.permissions.complaint">
                <span>导出</span>
              </label>
            </div>
          </div>
          
          <!-- 满意度调查权限 -->
          <div class="permission-module">
            <div class="module-header">
              <label class="module-check">
                <input type="checkbox" v-model="selectedRole.permissions.satisfaction" @change="toggleModule('satisfaction')">
                <span class="module-name">满意度调查</span>
              </label>
            </div>
            <div class="permission-items">
              <label class="permission-item">
                <input type="checkbox" v-model="selectedRole.permissions.satisfactionView" :disabled="!selectedRole.permissions.satisfaction">
                <span>查看</span>
              </label>
              <label class="permission-item">
                <input type="checkbox" v-model="selectedRole.permissions.satisfactionConfig" :disabled="!selectedRole.permissions.satisfaction">
                <span>配置</span>
              </label>
              <label class="permission-item">
                <input type="checkbox" v-model="selectedRole.permissions.satisfactionExport" :disabled="!selectedRole.permissions.satisfaction">
                <span>导出</span>
              </label>
            </div>
          </div>
          
          <!-- 多模块录入权限 -->
          <div class="permission-module">
            <div class="module-header">
              <label class="module-check">
                <input type="checkbox" v-model="selectedRole.permissions.multiModule" @change="toggleModule('multiModule')">
                <span class="module-name">多模块录入</span>
              </label>
            </div>
            <div class="permission-items">
              <label class="permission-item">
                <input type="checkbox" v-model="selectedRole.permissions.complaintModule" :disabled="!selectedRole.permissions.multiModule">
                <span>投诉模块</span>
              </label>
              <label class="permission-item">
                <input type="checkbox" v-model="selectedRole.permissions.petitionModule" :disabled="!selectedRole.permissions.multiModule">
                <span>理信模块</span>
              </label>
              <label class="permission-item">
                <input type="checkbox" v-model="selectedRole.permissions.letterModule" :disabled="!selectedRole.permissions.multiModule">
                <span>信访模块</span>
              </label>
              <label class="permission-item">
                <input type="checkbox" v-model="selectedRole.permissions.investigationModule" :disabled="!selectedRole.permissions.multiModule">
                <span>行政调查模块</span>
              </label>
            </div>
          </div>
          
          <!-- 通讯录权限 -->
          <div class="permission-module">
            <div class="module-header">
              <label class="module-check">
                <input type="checkbox" v-model="selectedRole.permissions.contacts" @change="toggleModule('contacts')">
                <span class="module-name">通讯录</span>
              </label>
            </div>
            <div class="permission-items">
              <label class="permission-item">
                <input type="checkbox" v-model="selectedRole.permissions.contactsView" :disabled="!selectedRole.permissions.contacts">
                <span>查看</span>
              </label>
              <label class="permission-item">
                <input type="checkbox" v-model="selectedRole.permissions.contactsManage" :disabled="!selectedRole.permissions.contacts">
                <span>管理</span>
              </label>
              <label class="permission-item">
                <input type="checkbox" v-model="selectedRole.permissions.contactsSync" :disabled="!selectedRole.permissions.contacts">
                <span>同步配置</span>
              </label>
            </div>
          </div>
          
          <!-- 数据统计权限 -->
          <div class="permission-module">
            <div class="module-header">
              <label class="module-check">
                <input type="checkbox" v-model="selectedRole.permissions.statistics" @change="toggleModule('statistics')">
                <span class="module-name">数据统计</span>
              </label>
            </div>
            <div class="permission-items">
              <label class="permission-item">
                <input type="checkbox" v-model="selectedRole.permissions.statisticsView" :disabled="!selectedRole.permissions.statistics">
                <span>查看</span>
              </label>
              <label class="permission-item">
                <input type="checkbox" v-model="selectedRole.permissions.statisticsExport" :disabled="!selectedRole.permissions.statistics">
                <span>导出</span>
              </label>
              <label class="permission-item">
                <input type="checkbox" v-model="selectedRole.permissions.exportCenter" :disabled="!selectedRole.permissions.statistics">
                <span>导出中心</span>
              </label>
            </div>
          </div>
          
          <!-- 系统设置权限 -->
          <div class="permission-module">
            <div class="module-header">
              <label class="module-check">
                <input type="checkbox" v-model="selectedRole.permissions.system" @change="toggleModule('system')">
                <span class="module-name">系统设置</span>
              </label>
            </div>
            <div class="permission-items">
              <label class="permission-item">
                <input type="checkbox" v-model="selectedRole.permissions.userManage" :disabled="!selectedRole.permissions.system">
                <span>用户管理</span>
              </label>
              <label class="permission-item">
                <input type="checkbox" v-model="selectedRole.permissions.roleManage" :disabled="!selectedRole.permissions.system">
                <span>角色管理</span>
              </label>
              <label class="permission-item">
                <input type="checkbox" v-model="selectedRole.permissions.permissionConfig" :disabled="!selectedRole.permissions.system">
                <span>权限配置</span>
              </label>
              <label class="permission-item">
                <input type="checkbox" v-model="selectedRole.permissions.departmentManage" :disabled="!selectedRole.permissions.system">
                <span>科室管理</span>
              </label>
            </div>
          </div>
        </div>
        
        <div class="permission-actions">
          <button class="btn btn-secondary" @click="cancelEdit">取消</button>
          <button class="btn btn-primary" @click="savePermissions">保存配置</button>
        </div>
      </div>
      
      <div class="no-selection" v-else>
        <p>请选择一个角色进行权限配置</p>
      </div>
    </div>
    
    <!-- 添加角色弹窗 -->
    <div class="modal-overlay" v-if="showRoleModal" @click="showRoleModal = false">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3>{{ editingRole ? '编辑角色' : '添加角色' }}</h3>
          <button class="close-btn" @click="showRoleModal = false">×</button>
        </div>
        <div class="modal-body">
          <div class="form-item">
            <label>角色名称</label>
            <input type="text" v-model="newRole.name" placeholder="请输入角色名称" class="form-input">
          </div>
          <div class="form-item">
            <label>角色描述</label>
            <textarea v-model="newRole.description" placeholder="请输入角色描述" class="form-textarea"></textarea>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" @click="showRoleModal = false">取消</button>
          <button class="btn btn-primary" @click="saveRole">{{ editingRole ? '保存' : '添加' }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const roles = ref([
  {
    id: 1,
    name: '系统管理员',
    description: '拥有系统所有权限',
    permissions: {
      complaint: true, complaintView: true, complaintCreate: true, complaintEdit: true, complaintDelete: true, complaintExport: true,
      satisfaction: true, satisfactionView: true, satisfactionConfig: true, satisfactionExport: true,
      multiModule: true, complaintModule: true, petitionModule: true, letterModule: true, investigationModule: true,
      contacts: true, contactsView: true, contactsManage: true, contactsSync: true,
      statistics: true, statisticsView: true, statisticsExport: true, exportCenter: true,
      system: true, userManage: true, roleManage: true, permissionConfig: true, departmentManage: true
    }
  },
  {
    id: 2,
    name: '投诉管理员',
    description: '负责投诉管理和满意度调查',
    permissions: {
      complaint: true, complaintView: true, complaintCreate: true, complaintEdit: true, complaintDelete: false, complaintExport: true,
      satisfaction: true, satisfactionView: true, satisfactionConfig: true, satisfactionExport: true,
      multiModule: true, complaintModule: true, petitionModule: false, letterModule: false, investigationModule: false,
      contacts: true, contactsView: true, contactsManage: false, contactsSync: false,
      statistics: true, statisticsView: true, statisticsExport: true, exportCenter: false,
      system: false, userManage: false, roleManage: false, permissionConfig: false, departmentManage: false
    }
  },
  {
    id: 3,
    name: '部门主管',
    description: '部门案件处理和统计查看',
    permissions: {
      complaint: true, complaintView: true, complaintCreate: true, complaintEdit: true, complaintDelete: false, complaintExport: true,
      satisfaction: true, satisfactionView: true, satisfactionConfig: false, satisfactionExport: false,
      multiModule: true, complaintModule: true, petitionModule: true, letterModule: true, investigationModule: true,
      contacts: true, contactsView: true, contactsManage: false, contactsSync: false,
      statistics: true, statisticsView: true, statisticsExport: true, exportCenter: false,
      system: false, userManage: false, roleManage: false, permissionConfig: false, departmentManage: false
    }
  },
  {
    id: 4,
    name: '普通用户',
    description: '基础查看和操作权限',
    permissions: {
      complaint: true, complaintView: true, complaintCreate: false, complaintEdit: false, complaintDelete: false, complaintExport: false,
      satisfaction: true, satisfactionView: true, satisfactionConfig: false, satisfactionExport: false,
      multiModule: false, complaintModule: false, petitionModule: false, letterModule: false, investigationModule: false,
      contacts: true, contactsView: true, contactsManage: false, contactsSync: false,
      statistics: true, statisticsView: true, statisticsExport: false, exportCenter: false,
      system: false, userManage: false, roleManage: false, permissionConfig: false, departmentManage: false
    }
  }
])

const selectedRole = ref(null)
const showRoleModal = ref(false)
const editingRole = ref(null)
const newRole = ref({ name: '', description: '' })

const selectRole = (role) => {
  selectedRole.value = JSON.parse(JSON.stringify(role))
}

const toggleModule = (module) => {
  if (!selectedRole.value.permissions[module]) {
    // 禁用该模块下的所有子权限
    Object.keys(selectedRole.value.permissions).forEach(key => {
      if (key.startsWith(module) && key !== module) {
        selectedRole.value.permissions[key] = false
      }
    })
  }
}

const editRole = (role) => {
  editingRole.value = role
  newRole.value = { name: role.name, description: role.description }
  showRoleModal.value = true
}

const deleteRole = (role) => {
  if (confirm(`确定要删除角色"${role.name}"吗？`)) {
    const index = roles.value.findIndex(r => r.id === role.id)
    if (index > -1) {
      roles.value.splice(index, 1)
    }
  }
}

const saveRole = () => {
  if (!newRole.value.name) {
    alert('请输入角色名称')
    return
  }
  
  if (editingRole.value) {
    editingRole.value.name = newRole.value.name
    editingRole.value.description = newRole.value.description
  } else {
    roles.value.push({
      id: Date.now(),
      name: newRole.value.name,
      description: newRole.value.description,
      permissions: {
        complaint: false, complaintView: false, complaintCreate: false, complaintEdit: false, complaintDelete: false, complaintExport: false,
        satisfaction: false, satisfactionView: false, satisfactionConfig: false, satisfactionExport: false,
        multiModule: false, complaintModule: false, petitionModule: false, letterModule: false, investigationModule: false,
        contacts: false, contactsView: false, contactsManage: false, contactsSync: false,
        statistics: false, statisticsView: false, statisticsExport: false, exportCenter: false,
        system: false, userManage: false, roleManage: false, permissionConfig: false, departmentManage: false
      }
    })
  }
  
  showRoleModal.value = false
  editingRole.value = null
  newRole.value = { name: '', description: '' }
}

const cancelEdit = () => {
  selectedRole.value = null
}

const savePermissions = () => {
  const index = roles.value.findIndex(r => r.id === selectedRole.value.id)
  if (index > -1) {
    roles.value[index] = JSON.parse(JSON.stringify(selectedRole.value))
  }
  alert('权限配置已保存')
}
</script>

<style scoped>
.page-container {
  padding: 20px;
  background-color: #f0f2f5;
  min-height: 100%;
}

.breadcrumb {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  font-size: 14px;
}

.breadcrumb-item {
  color: #666;
  text-decoration: none;
}

.breadcrumb-item:hover {
  color: #1890ff;
}

.breadcrumb-separator {
  margin: 0 8px;
  color: #999;
}

.breadcrumb-item.active {
  color: #333;
}

.permission-page {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 20px;
}

/* 角色列表 */
.roles-section {
  background: #fff;
  border-radius: 8px;
  padding: 20px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.section-title {
  font-size: 16px;
  font-weight: 500;
  color: #333;
  margin: 0;
}

.roles-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.role-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border: 2px solid #f0f0f0;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
}

.role-item:hover {
  border-color: #1890ff;
}

.role-item.active {
  border-color: #1890ff;
  background: #e6f7ff;
}

.role-icon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f5f5;
  border-radius: 8px;
}

.role-item.active .role-icon {
  background: #1890ff;
}

.role-icon svg {
  width: 20px;
  height: 20px;
}

.role-item.active .role-icon svg {
  color: #fff;
}

.role-info {
  flex: 1;
}

.role-name {
  font-size: 14px;
  font-weight: 500;
  color: #333;
  margin-bottom: 4px;
}

.role-desc {
  font-size: 12px;
  color: #999;
}

.role-actions {
  display: flex;
  gap: 8px;
}

.btn-icon {
  padding: 4px 8px;
  background: none;
  border: none;
  color: #1890ff;
  font-size: 12px;
  cursor: pointer;
}

.btn-icon.danger {
  color: #ff4d4f;
}

/* 权限配置 */
.permission-section {
  background: #fff;
  border-radius: 8px;
  padding: 20px;
}

.permission-modules {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.permission-module {
  border: 1px solid #f0f0f0;
  border-radius: 6px;
  overflow: hidden;
}

.module-header {
  padding: 12px 16px;
  background: #fafafa;
  border-bottom: 1px solid #f0f0f0;
}

.module-check {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.module-check input {
  width: 18px;
  height: 18px;
}

.module-name {
  font-size: 14px;
  font-weight: 500;
  color: #333;
}

.permission-items {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  padding: 12px 16px;
}

.permission-item {
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
}

.permission-item input {
  width: 16px;
  height: 16px;
}

.permission-item input:disabled + span {
  color: #d9d9d9;
}

.permission-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 24px;
  padding-top: 20px;
  border-top: 1px solid #f0f0f0;
}

.no-selection {
  background: #fff;
  border-radius: 8px;
  padding: 60px 20px;
  text-align: center;
  color: #999;
}

/* 按钮样式 */
.btn {
  height: 36px;
  padding: 0 16px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-secondary {
  background: #f5f5f5;
  color: #666;
}

.btn-secondary:hover {
  background: #e5e5e5;
}

.btn-primary {
  background: #1890ff;
  color: #fff;
}

.btn-primary:hover {
  background: #40a9ff;
}

/* 弹窗样式 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  width: 480px;
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #f0f0f0;
}

.modal-header h3 {
  font-size: 16px;
  font-weight: 500;
  margin: 0;
}

.close-btn {
  width: 32px;
  height: 32px;
  border: none;
  background: none;
  font-size: 24px;
  color: #999;
  cursor: pointer;
}

.modal-body {
  padding: 20px;
}

.form-item {
  margin-bottom: 16px;
}

.form-item:last-child {
  margin-bottom: 0;
}

.form-item label {
  display: block;
  font-size: 14px;
  color: #333;
  margin-bottom: 6px;
}

.form-input {
  width: 100%;
  height: 36px;
  padding: 0 12px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-size: 14px;
  outline: none;
}

.form-textarea {
  width: 100%;
  min-height: 80px;
  padding: 12px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-size: 14px;
  resize: vertical;
  outline: none;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 16px 20px;
  border-top: 1px solid #f0f0f0;
}

@media (max-width: 1024px) {
  .permission-page {
    grid-template-columns: 1fr;
  }
}
</style>
