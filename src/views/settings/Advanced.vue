<template>
  <div class="settings-container">
    <div class="breadcrumb">
      <router-link to="/" class="breadcrumb-item">首页</router-link>
      <span class="breadcrumb-separator">›</span>
      <span class="breadcrumb-item active">系统设置</span>
    </div>
    
    <div class="content-grid">
      <!-- 左侧导航 -->
      <div class="sidebar">
        <div class="menu-list">
          <div v-for="menu in menuList" 
               :key="menu.key"
               :class="['menu-item', {active: activeMenu === menu.key}]"
               @click="activeMenu = menu.key">
            <span class="menu-icon">{{ menu.icon }}</span>
            <span class="menu-name">{{ menu.name }}</span>
          </div>
        </div>
      </div>
      
      <!-- 右侧内容 -->
      <div class="main-content">
        <!-- 基本设置 -->
        <div v-if="activeMenu === 'basic'" class="settings-section">
          <div class="section-header">
            <h2 class="section-title">基本设置</h2>
          </div>
          
          <div class="settings-group">
            <h3 class="group-title">系统信息</h3>
            <div class="form-grid">
              <div class="form-item">
                <label class="form-label">系统名称</label>
                <input type="text" class="form-input" v-model="basicSettings.systemName" />
              </div>
              <div class="form-item">
                <label class="form-label">系统版本</label>
                <input type="text" class="form-input" v-model="basicSettings.version" disabled />
              </div>
              <div class="form-item full">
                <label class="form-label">系统Logo</label>
                <div class="logo-upload">
                  <div class="logo-preview">
                    <span class="logo-text">🏥</span>
                  </div>
                  <button class="btn btn-outline">更换Logo</button>
                </div>
              </div>
            </div>
          </div>
          
          <div class="settings-group">
            <h3 class="group-title">运行设置</h3>
            <div class="form-grid">
              <div class="form-item">
                <label class="form-label">会话超时（分钟）</label>
                <input type="number" class="form-input" v-model="basicSettings.sessionTimeout" />
              </div>
              <div class="form-item">
                <label class="form-label">数据备份周期</label>
                <select class="form-input" v-model="basicSettings.backupCycle">
                  <option value="daily">每日</option>
                  <option value="weekly">每周</option>
                  <option value="monthly">每月</option>
                </select>
              </div>
            </div>
          </div>
          
          <div class="actions-bar">
            <button class="btn btn-secondary">重置</button>
            <button class="btn btn-primary" @click="saveSettings">保存设置</button>
          </div>
        </div>
        
        <!-- 通知设置 -->
        <div v-if="activeMenu === 'notification'" class="settings-section">
          <div class="section-header">
            <h2 class="section-title">通知设置</h2>
          </div>
          
          <div class="settings-group">
            <h3 class="group-title">消息通知</h3>
            <div class="switch-list">
              <div class="switch-item">
                <div class="switch-info">
                  <h4 class="switch-title">站内消息通知</h4>
                  <p class="switch-desc">接收系统内的消息提醒</p>
                </div>
                <div :class="['switch', {active: notificationSettings.siteMessage}]" @click="toggleNotification('siteMessage')">
                  <div class="switch-knob"></div>
                </div>
              </div>
              <div class="switch-item">
                <div class="switch-info">
                  <h4 class="switch-title">邮件通知</h4>
                  <p class="switch-desc">通过邮件接收重要通知</p>
                </div>
                <div :class="['switch', {active: notificationSettings.email}]" @click="toggleNotification('email')">
                  <div class="switch-knob"></div>
                </div>
              </div>
              <div class="switch-item">
                <div class="switch-info">
                  <h4 class="switch-title">短信通知</h4>
                  <p class="switch-desc">通过短信接收紧急通知</p>
                </div>
                <div :class="['switch', {active: notificationSettings.sms}]" @click="toggleNotification('sms')">
                  <div class="switch-knob"></div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="settings-group">
            <h3 class="group-title">通知时机</h3>
            <div class="form-grid">
              <div class="form-item full">
                <label class="form-label">选择接收通知的时间</label>
                <div class="time-options">
                  <label v-for="option in timeOptions" :key="option.value" class="time-option">
                    <input type="checkbox" v-model="notificationSettings.times" :value="option.value" />
                    <span>{{ option.label }}</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
          
          <div class="actions-bar">
            <button class="btn btn-primary" @click="saveSettings">保存设置</button>
          </div>
        </div>
        
        <!-- 安全设置 -->
        <div v-if="activeMenu === 'security'" class="settings-section">
          <div class="section-header">
            <h2 class="section-title">安全设置</h2>
          </div>
          
          <div class="settings-group">
            <h3 class="group-title">密码策略</h3>
            <div class="form-grid">
              <div class="form-item">
                <label class="form-label">最小密码长度</label>
                <input type="number" class="form-input" v-model="securitySettings.minPasswordLength" />
              </div>
              <div class="form-item">
                <label class="form-label">密码复杂度</label>
                <select class="form-input" v-model="securitySettings.complexity">
                  <option value="low">低</option>
                  <option value="medium">中</option>
                  <option value="high">高</option>
                </select>
              </div>
              <div class="form-item">
                <label class="form-label">密码过期天数</label>
                <input type="number" class="form-input" v-model="securitySettings.passwordExpireDays" />
              </div>
              <div class="form-item">
                <label class="form-label">登录失败锁定次数</label>
                <input type="number" class="form-input" v-model="securitySettings.maxLoginAttempts" />
              </div>
            </div>
          </div>
          
          <div class="settings-group">
            <h3 class="group-title">操作日志</h3>
            <div class="log-preview">
              <div class="log-header">
                <span class="log-title">最近操作</span>
                <button class="btn-link">查看全部</button>
              </div>
              <div class="log-list">
                <div v-for="log in recentLogs" :key="log.id" class="log-item">
                  <span class="log-time">{{ log.time }}</span>
                  <span class="log-user">{{ log.user }}</span>
                  <span class="log-action">{{ log.action }}</span>
                  <span :class="['log-status', log.status]">{{ log.statusText }}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div class="actions-bar">
            <button class="btn btn-primary" @click="saveSettings">保存设置</button>
          </div>
        </div>
        
        <!-- 权限设置 -->
        <div v-if="activeMenu === 'permission'" class="settings-section">
          <div class="section-header">
            <h2 class="section-title">权限设置</h2>
            <button class="btn btn-primary" @click="showAddRole = true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M12 5v14M5 12h14" stroke-width="2" stroke-linecap="round"/>
              </svg>
              新建角色
            </button>
          </div>
          
          <div class="roles-grid">
            <div v-for="role in roles" :key="role.id" class="role-card">
              <div class="role-header">
                <div class="role-icon" :style="{background: role.color}">{{ role.icon }}</div>
                <div class="role-info">
                  <h3 class="role-name">{{ role.name }}</h3>
                  <p class="role-desc">{{ role.desc }}</p>
                </div>
                <button class="btn-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <circle cx="12" cy="12" r="1" stroke-width="2"/>
                    <circle cx="19" cy="12" r="1" stroke-width="2"/>
                    <circle cx="5" cy="12" r="1" stroke-width="2"/>
                  </svg>
                </button>
              </div>
              <div class="role-stats">
                <div class="stat">
                  <span class="stat-value">{{ role.userCount }}</span>
                  <span class="stat-label">用户</span>
                </div>
                <div class="stat">
                  <span class="stat-value">{{ role.permissionCount }}</span>
                  <span class="stat-label">权限</span>
                </div>
              </div>
              <div class="role-actions">
                <button class="btn btn-outline btn-sm">编辑权限</button>
                <button class="btn btn-outline btn-sm">查看用户</button>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 集成设置 -->
        <div v-if="activeMenu === 'integration'" class="settings-section">
          <div class="section-header">
            <h2 class="section-title">集成设置</h2>
          </div>
          
          <div class="integrations-list">
            <div v-for="integration in integrations" :key="integrations.id" class="integration-item">
              <div class="integration-icon" :style="{background: integration.bg}">
                {{ integration.icon }}
              </div>
              <div class="integration-info">
                <h3 class="integration-name">{{ integration.name }}</h3>
                <p class="integration-desc">{{ integration.desc }}</p>
              </div>
              <div class="integration-status">
                <span :class="['status-badge', integration.status]">{{ integration.statusText }}</span>
              </div>
              <button class="btn btn-outline">{{ integration.buttonText }}</button>
            </div>
          </div>
        </div>
        
        <!-- 关于 -->
        <div v-if="activeMenu === 'about'" class="settings-section about-section">
          <div class="about-content">
            <div class="about-logo">🏥</div>
            <h2 class="about-title">医院投诉管理系统</h2>
            <p class="about-version">版本 {{ basicSettings.version }}</p>
            <p class="about-desc">
              专业的医院投诉管理平台，致力于提升医疗服务质量，<br/>
              构建和谐医患关系。
            </p>
            <div class="about-links">
              <a href="#" class="about-link">使用文档</a>
              <a href="#" class="about-link">帮助中心</a>
              <a href="#" class="about-link">联系我们</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 新建角色弹窗 -->
    <div class="modal-overlay" v-if="showAddRole" @click.self="showAddRole = false">
      <div class="modal">
        <div class="modal-header">
          <h3 class="modal-title">新建角色</h3>
          <button class="modal-close" @click="showAddRole = false">×</button>
        </div>
        <div class="modal-body">
          <div class="form-item">
            <label class="form-label">角色名称</label>
            <input type="text" class="form-input" v-model="newRole.name" placeholder="请输入角色名称" />
          </div>
          <div class="form-item">
            <label class="form-label">角色描述</label>
            <textarea class="form-textarea" v-model="newRole.desc" placeholder="请输入角色描述"></textarea>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" @click="showAddRole = false">取消</button>
          <button class="btn btn-primary" @click="createRole">创建</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const activeMenu = ref('basic')
const showAddRole = ref(false)

const menuList = ref([
  { key: 'basic', name: '基本设置', icon: '⚙️' },
  { key: 'notification', name: '通知设置', icon: '🔔' },
  { key: 'security', name: '安全设置', icon: '🔒' },
  { key: 'permission', name: '权限设置', icon: '👥' },
  { key: 'integration', name: '集成设置', icon: '🔗' },
  { key: 'about', name: '关于', icon: 'ℹ️' }
])

const basicSettings = ref({
  systemName: '医院投诉管理系统',
  version: 'v2.1.0',
  sessionTimeout: 30,
  backupCycle: 'daily'
})

const notificationSettings = ref({
  siteMessage: true,
  email: true,
  sms: false,
  times: ['workday', 'worktime']
})

const timeOptions = ref([
  { value: 'always', label: '全天24小时' },
  { value: 'workday', label: '工作日' },
  { value: 'worktime', label: '工作时间（9:00-18:00）' },
  { value: 'never', label: '从不接收' }
])

const securitySettings = ref({
  minPasswordLength: 8,
  complexity: 'medium',
  passwordExpireDays: 90,
  maxLoginAttempts: 5
})

const recentLogs = ref([
  { id: 1, time: '10:32', user: '张小明', action: '修改系统设置', status: 'success', statusText: '成功' },
  { id: 2, time: '10:15', user: '李主管', action: '删除用户', status: 'success', statusText: '成功' },
  { id: 3, time: '09:45', user: '王主任', action: '导出数据', status: 'warning', statusText: '部分成功' },
  { id: 4, time: '09:20', user: '系统', action: '自动备份', status: 'success', statusText: '成功' },
  { id: 5, time: '08:30', user: '管理员', action: '登录系统', status: 'success', statusText: '成功' }
])

const roles = ref([
  { id: 1, name: '超级管理员', desc: '拥有系统所有权限', icon: '👑', color: 'linear-gradient(135deg, #722ed1, #b37feb)', userCount: 2, permissionCount: 128 },
  { id: 2, name: '科室主任', desc: '管理本科室投诉案件', icon: '👨‍⚕️', color: 'linear-gradient(135deg, #1890ff, #69c0ff)', userCount: 15, permissionCount: 45 },
  { id: 3, name: '普通员工', desc: '处理分配的案件', icon: '👤', color: 'linear-gradient(135deg, #52c41a, #95de64)', userCount: 48, permissionCount: 18 },
  { id: 4, name: '访客', desc: '仅可查看公开信息', icon: '👀', color: 'linear-gradient(135deg, #faad14, #ffc53d)', userCount: 10, permissionCount: 5 }
])

const integrations = ref([
  { id: 1, name: '短信服务', desc: '用于发送短信通知', icon: '📱', bg: '#e6f7ff', status: 'connected', statusText: '已连接', buttonText: '配置' },
  { id: 2, name: '邮件服务', desc: '用于发送邮件通知', icon: '📧', bg: '#f6ffed', status: 'connected', statusText: '已连接', buttonText: '配置' },
  { id: 3, name: '微信公众号', desc: '对接医院公众号', icon: '💬', bg: '#fff7e6', status: 'disconnected', statusText: '未连接', buttonText: '连接' },
  { id: 4, name: 'HIS系统', desc: '对接医院HIS系统', icon: '🏥', bg: '#fff1f0', status: 'connected', statusText: '已连接', buttonText: '配置' },
  { id: 5, name: 'OA系统', desc: '对接医院OA系统', icon: '📋', bg: '#f9f0ff', status: 'disconnected', statusText: '未连接', buttonText: '连接' }
])

const newRole = ref({
  name: '',
  desc: ''
})

const toggleNotification = (key) => {
  notificationSettings.value[key] = !notificationSettings.value[key]
}

const saveSettings = () => {
  alert('设置已保存')
}

const createRole = () => {
  if (!newRole.value.name) {
    alert('请输入角色名称')
    return
  }
  roles.value.push({
    id: Date.now(),
    name: newRole.value.name,
    desc: newRole.value.desc || '暂无描述',
    icon: '🆕',
    color: 'linear-gradient(135deg, #13c2c2, #6eddd5)',
    userCount: 0,
    permissionCount: 0
  })
  showAddRole.value = false
  newRole.value = { name: '', desc: '' }
}
</script>

<style scoped>
.settings-container {
  padding: 20px;
  background-color: #f0f2f5;
  min-height: 100vh;
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

.content-grid {
  display: grid;
  grid-template-columns: 220px 1fr;
  gap: 20px;
}

/* 侧边栏 */
.sidebar {
  background: #fff;
  border-radius: 12px;
  padding: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  height: fit-content;
}

.menu-list {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s;
}

.menu-item:hover {
  background: #f5f5f5;
}

.menu-item.active {
  background: #e6f7ff;
}

.menu-icon {
  font-size: 18px;
}

.menu-name {
  font-size: 14px;
  color: #333;
}

.menu-item.active .menu-name {
  color: #1890ff;
  font-weight: 500;
}

/* 主内容 */
.main-content {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  min-height: 500px;
}

.settings-section {
  padding: 24px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid #f0f0f0;
}

.section-title {
  font-size: 20px;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.settings-group {
  margin-bottom: 32px;
}

.settings-group:last-child {
  margin-bottom: 0;
}

.group-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin: 0 0 16px 0;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.form-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-item.full {
  grid-column: span 2;
}

.form-label {
  font-size: 14px;
  color: #666;
  font-weight: 500;
}

.form-input {
  height: 44px;
  padding: 0 14px;
  border: 1px solid #d9d9d9;
  border-radius: 10px;
  font-size: 14px;
  outline: none;
  transition: all 0.2s;
}

.form-input:focus {
  border-color: #1890ff;
  box-shadow: 0 0 0 3px rgba(24, 144, 255, 0.1);
}

.form-input:disabled {
  background: #f5f5f5;
  color: #999;
  cursor: not-allowed;
}

.form-textarea {
  min-height: 100px;
  padding: 12px 14px;
  border: 1px solid #d9d9d9;
  border-radius: 10px;
  font-size: 14px;
  outline: none;
  resize: vertical;
  transition: all 0.2s;
}

.form-textarea:focus {
  border-color: #1890ff;
  box-shadow: 0 0 0 3px rgba(24, 144, 255, 0.1);
}

/* Logo上传 */
.logo-upload {
  display: flex;
  gap: 16px;
  align-items: center;
}

.logo-preview {
  width: 80px;
  height: 80px;
  background: #f5f5f5;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-text {
  font-size: 36px;
}

/* 开关 */
.switch-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.switch-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background: #fafafa;
  border-radius: 12px;
}

.switch-info {
  flex: 1;
}

.switch-title {
  font-size: 15px;
  font-weight: 600;
  color: #333;
  margin: 0 0 4px 0;
}

.switch-desc {
  font-size: 13px;
  color: #999;
  margin: 0;
}

.switch {
  width: 48px;
  height: 28px;
  background: #d9d9d9;
  border-radius: 14px;
  position: relative;
  cursor: pointer;
  transition: all 0.2s;
}

.switch.active {
  background: #1890ff;
}

.switch-knob {
  width: 22px;
  height: 22px;
  background: #fff;
  border-radius: 50%;
  position: absolute;
  top: 3px;
  left: 3px;
  transition: all 0.2s;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.switch.active .switch-knob {
  left: 23px;
}

/* 时间选项 */
.time-options {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.time-option {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  background: #fafafa;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s;
}

.time-option:hover {
  background: #f0f0f0;
}

.time-option input {
  width: 18px;
  height: 18px;
  cursor: pointer;
}

.time-option span {
  font-size: 14px;
  color: #333;
}

/* 操作日志 */
.log-preview {
  background: #fafafa;
  border-radius: 12px;
  overflow: hidden;
}

.log-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid #f0f0f0;
}

.log-title {
  font-size: 14px;
  font-weight: 600;
  color: #333;
}

.btn-link {
  background: none;
  border: none;
  color: #1890ff;
  font-size: 14px;
  cursor: pointer;
}

.btn-link:hover {
  text-decoration: underline;
}

.log-list {
  padding: 12px 20px;
}

.log-item {
  display: grid;
  grid-template-columns: 80px 100px 1fr auto;
  gap: 12px;
  padding: 10px 0;
  font-size: 14px;
  border-bottom: 1px solid #f0f0f0;
}

.log-item:last-child {
  border-bottom: none;
}

.log-time {
  color: #999;
}

.log-user {
  color: #333;
  font-weight: 500;
}

.log-action {
  color: #666;
}

.log-status {
  padding: 2px 10px;
  border-radius: 12px;
  font-size: 12px;
}

.log-status.success {
  background: #f6ffed;
  color: #52c41a;
}

.log-status.warning {
  background: #fff7e6;
  color: #faad14;
}

/* 角色卡片 */
.roles-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.role-card {
  background: #fafafa;
  border-radius: 14px;
  padding: 20px;
}

.role-header {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 16px;
}

.role-icon {
  width: 56px;
  height: 56px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  flex-shrink: 0;
}

.role-info {
  flex: 1;
}

.role-name {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin: 0 0 4px 0;
}

.role-desc {
  font-size: 13px;
  color: #999;
  margin: 0;
}

.btn-icon {
  width: 36px;
  height: 36px;
  border: none;
  background: transparent;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.btn-icon:hover {
  background: #f0f0f0;
}

.btn-icon svg {
  width: 18px;
  height: 18px;
  color: #999;
}

.role-stats {
  display: flex;
  gap: 24px;
  padding: 16px 0;
  border-top: 1px solid #f0f0f0;
  border-bottom: 1px solid #f0f0f0;
  margin-bottom: 16px;
}

.stat {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.stat-value {
  font-size: 24px;
  font-weight: 600;
  color: #333;
}

.stat-label {
  font-size: 13px;
  color: #999;
}

.role-actions {
  display: flex;
  gap: 8px;
}

/* 集成列表 */
.integrations-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.integration-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px;
  background: #fafafa;
  border-radius: 14px;
}

.integration-icon {
  width: 56px;
  height: 56px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  flex-shrink: 0;
}

.integration-info {
  flex: 1;
}

.integration-name {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin: 0 0 4px 0;
}

.integration-desc {
  font-size: 13px;
  color: #999;
  margin: 0;
}

.status-badge {
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 500;
}

.status-badge.connected {
  background: #f6ffed;
  color: #52c41a;
}

.status-badge.disconnected {
  background: #f5f5f5;
  color: #999;
}

/* 关于 */
.about-section {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 500px;
}

.about-content {
  text-align: center;
}

.about-logo {
  font-size: 72px;
  margin-bottom: 24px;
}

.about-title {
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin: 0 0 8px 0;
}

.about-version {
  font-size: 16px;
  color: #999;
  margin: 0 0 24px 0;
}

.about-desc {
  font-size: 15px;
  color: #666;
  line-height: 1.8;
  margin: 0 0 32px 0;
}

.about-links {
  display: flex;
  justify-content: center;
  gap: 24px;
}

.about-link {
  color: #1890ff;
  text-decoration: none;
  font-size: 14px;
}

.about-link:hover {
  text-decoration: underline;
}

/* 按钮 */
.btn {
  height: 44px;
  padding: 0 20px;
  border: none;
  border-radius: 10px;
  font-size: 14px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s;
}

.btn-primary {
  background: #1890ff;
  color: #fff;
}

.btn-primary:hover {
  background: #40a9ff;
}

.btn-secondary {
  background: #f5f5f5;
  color: #666;
}

.btn-secondary:hover {
  background: #e5e5e5;
}

.btn-outline {
  background: #fff;
  border: 1px solid #d9d9d9;
  color: #666;
}

.btn-outline:hover {
  border-color: #1890ff;
  color: #1890ff;
}

.btn-sm {
  height: 36px;
  padding: 0 16px;
  font-size: 13px;
}

.actions-bar {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding-top: 24px;
  border-top: 1px solid #f0f0f0;
}

/* 弹窗 */
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
  padding: 20px;
}

.modal {
  background: #fff;
  border-radius: 16px;
  max-width: 500px;
  width: 100%;
  overflow: hidden;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid #f0f0f0;
}

.modal-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.modal-close {
  width: 36px;
  height: 36px;
  border: none;
  background: #f5f5f5;
  border-radius: 50%;
  font-size: 24px;
  color: #999;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.modal-close:hover {
  background: #e5e5e5;
  color: #666;
}

.modal-body {
  padding: 24px;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 20px 24px;
  border-top: 1px solid #f0f0f0;
}

/* 响应式 */
@media (max-width: 1024px) {
  .content-grid {
    grid-template-columns: 1fr;
  }
  
  .sidebar {
    display: none;
  }
}

@media (max-width: 768px) {
  .form-grid {
    grid-template-columns: 1fr;
  }
  
  .form-item.full {
    grid-column: span 1;
  }
  
  .roles-grid {
    grid-template-columns: 1fr;
  }
  
  .log-item {
    grid-template-columns: 1fr;
    gap: 8px;
  }
}
</style>
