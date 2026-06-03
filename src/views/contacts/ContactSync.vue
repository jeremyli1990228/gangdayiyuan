<template>
  <div class="page-container">
    <div class="breadcrumb">
      <router-link to="/" class="breadcrumb-item">首页</router-link>
      <span class="breadcrumb-separator">›</span>
      <span class="breadcrumb-item">通讯录</span>
      <span class="breadcrumb-separator">›</span>
      <span class="breadcrumb-item active">通讯录更新配置</span>
    </div>
    
    <div class="config-page">
      <!-- 更新配置 -->
      <div class="config-card">
        <div class="card-header">
          <h3 class="card-title">更新配置</h3>
        </div>
        <div class="card-body">
          <div class="config-item">
            <div class="config-info">
              <label class="config-label">自动更新</label>
              <p class="config-desc">自动从医院系统同步通讯录数据</p>
            </div>
            <div class="switch-wrapper">
              <input type="checkbox" id="autoUpdate" v-model="config.autoUpdate" class="switch-input">
              <label for="autoUpdate" class="switch-label"></label>
            </div>
          </div>
          
          <div class="config-item">
            <div class="config-info">
              <label class="config-label">更新频率</label>
              <p class="config-desc">设置自动同步的时间间隔</p>
            </div>
            <select v-model="config.frequency" class="config-select" :disabled="!config.autoUpdate">
              <option value="daily">每日</option>
              <option value="weekly">每周</option>
              <option value="monthly">每月</option>
            </select>
          </div>
          
          <div class="config-item">
            <div class="config-info">
              <label class="config-label">更新时间</label>
              <p class="config-desc">设置自动同步的具体时间</p>
            </div>
            <input type="time" v-model="config.updateTime" class="config-time" :disabled="!config.autoUpdate">
          </div>
          
          <div class="config-item">
            <div class="config-info">
              <label class="config-label">数据范围</label>
              <p class="config-desc">选择需要同步的数据类型</p>
            </div>
            <div class="checkbox-group">
              <label class="checkbox-item">
                <input type="checkbox" v-model="config.dataScope.employees" :disabled="!config.autoUpdate">
                <span>员工数据</span>
              </label>
              <label class="checkbox-item">
                <input type="checkbox" v-model="config.dataScope.departments" :disabled="!config.autoUpdate">
                <span>部门数据</span>
              </label>
              <label class="checkbox-item">
                <input type="checkbox" v-model="config.dataScope.patients" :disabled="!config.autoUpdate">
                <span>患者数据</span>
              </label>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 数据源配置 -->
      <div class="config-card">
        <div class="card-header">
          <h3 class="card-title">数据源配置</h3>
        </div>
        <div class="card-body">
          <div class="config-item">
            <label class="config-label">数据源类型</label>
            <select v-model="config.dataSource.type" class="config-select">
              <option value="api">API接口</option>
              <option value="database">数据库</option>
              <option value="file">文件导入</option>
            </select>
          </div>
          
          <div class="config-item" v-if="config.dataSource.type === 'api'">
            <label class="config-label">API地址</label>
            <input type="text" v-model="config.dataSource.apiUrl" placeholder="请输入API地址" class="config-input">
          </div>
          
          <div class="config-item" v-if="config.dataSource.type === 'database'">
            <label class="config-label">数据库连接</label>
            <input type="text" v-model="config.dataSource.dbConnection" placeholder="请输入数据库连接字符串" class="config-input">
          </div>
          
          <div class="config-item" v-if="config.dataSource.type === 'file'">
            <label class="config-label">文件路径</label>
            <input type="text" v-model="config.dataSource.filePath" placeholder="请输入文件路径" class="config-input">
          </div>
          
          <div class="config-item">
            <label class="config-label">数据映射</label>
            <div class="mapping-table">
              <div class="mapping-header">
                <span class="mapping-col">源字段</span>
                <span class="mapping-arrow"></span>
                <span class="mapping-col">目标字段</span>
              </div>
              <div class="mapping-row" v-for="(mapping, index) in config.dataSource.mappings" :key="index">
                <input type="text" v-model="mapping.source" placeholder="源字段" class="mapping-input">
                <span class="mapping-arrow">→</span>
                <input type="text" v-model="mapping.target" placeholder="目标字段" class="mapping-input">
                <button class="mapping-remove" @click="removeMapping(index)">×</button>
              </div>
              <button class="add-mapping-btn" @click="addMapping">+ 添加映射</button>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 最后同步信息 -->
      <div class="config-card">
        <div class="card-header">
          <h3 class="card-title">同步状态</h3>
        </div>
        <div class="card-body">
          <div class="sync-info">
            <div class="sync-item">
              <label>最后同步时间</label>
              <span class="sync-value">{{ syncStatus.lastSyncTime || '从未同步' }}</span>
            </div>
            <div class="sync-item">
              <label>同步状态</label>
              <span class="sync-value" :class="syncStatus.status">{{ getStatusText(syncStatus.status) }}</span>
            </div>
            <div class="sync-item">
              <label>数据记录数</label>
              <span class="sync-value">{{ syncStatus.recordCount || 0 }} 条</span>
            </div>
          </div>
          
          <div class="sync-actions">
            <button class="btn btn-secondary" @click="syncNow" :disabled="syncStatus.status === 'syncing'">
              <span v-if="syncStatus.status === 'syncing'">同步中...</span>
              <span v-else>立即同步</span>
            </button>
            <button class="btn btn-secondary" @click="viewSyncLog">查看日志</button>
          </div>
        </div>
      </div>
      
      <!-- 操作按钮 -->
      <div class="action-buttons">
        <button class="btn btn-secondary" @click="resetConfig">重置</button>
        <button class="btn btn-primary" @click="saveConfig">保存配置</button>
      </div>
    </div>
    
    <!-- 同步日志弹窗 -->
    <div class="log-modal" v-if="showLogModal" @click="showLogModal = false">
      <div class="log-container" @click.stop>
        <div class="log-header">
          <h3>同步日志</h3>
          <button class="close-btn" @click="showLogModal = false">×</button>
        </div>
        <div class="log-body">
          <div class="log-list">
            <div v-for="log in syncLogs" :key="log.id" class="log-item">
              <div class="log-time">{{ log.time }}</div>
              <div class="log-content">
                <span class="log-status" :class="log.status">{{ log.statusText }}</span>
                {{ log.message }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const config = ref({
  autoUpdate: true,
  frequency: 'daily',
  updateTime: '02:00',
  dataScope: {
    employees: true,
    departments: true,
    patients: false
  },
  dataSource: {
    type: 'api',
    apiUrl: 'https://hospital-api.hku-sz.com/contacts',
    dbConnection: '',
    filePath: '',
    mappings: [
      { source: 'employee_id', target: '员工编号' },
      { source: 'employee_name', target: '员工姓名' },
      { source: 'department', target: '部门' },
      { source: 'phone', target: '电话' },
      { source: 'email', target: '邮箱' }
    ]
  }
})

const syncStatus = ref({
  lastSyncTime: '2024-01-18 02:00:00',
  status: 'success',
  recordCount: 1523
})

const syncLogs = ref([
  { id: 1, time: '2024-01-18 02:00:00', status: 'success', statusText: '成功', message: '同步员工数据 1500 条' },
  { id: 2, time: '2024-01-17 02:00:00', status: 'success', statusText: '成功', message: '同步员工数据 1498 条' },
  { id: 3, time: '2024-01-16 02:00:00', status: 'error', statusText: '失败', message: 'API连接超时' },
  { id: 4, time: '2024-01-15 02:00:00', status: 'success', statusText: '成功', message: '同步员工数据 1495 条' }
])

const showLogModal = ref(false)

const getStatusText = (status) => {
  const statusMap = {
    success: '同步成功',
    error: '同步失败',
    syncing: '同步中',
    idle: '待同步'
  }
  return statusMap[status] || status
}

const addMapping = () => {
  config.value.dataSource.mappings.push({ source: '', target: '' })
}

const removeMapping = (index) => {
  config.value.dataSource.mappings.splice(index, 1)
}

const syncNow = () => {
  syncStatus.value.status = 'syncing'
  // 模拟同步
  setTimeout(() => {
    syncStatus.value.status = 'success'
    syncStatus.value.lastSyncTime = new Date().toLocaleString('zh-CN')
    syncStatus.value.recordCount = 1525
    alert('同步成功')
  }, 2000)
}

const viewSyncLog = () => {
  showLogModal.value = true
}

const resetConfig = () => {
  if (confirm('确定要重置所有配置吗？')) {
    alert('配置已重置')
  }
}

const saveConfig = () => {
  console.log('保存配置:', config.value)
  alert('配置已保存')
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

.config-page {
  max-width: 900px;
}

.config-card {
  background: #fff;
  border-radius: 8px;
  margin-bottom: 20px;
}

.card-header {
  padding: 16px 20px;
  border-bottom: 1px solid #f0f0f0;
}

.card-title {
  font-size: 16px;
  font-weight: 500;
  color: #333;
  margin: 0;
}

.card-body {
  padding: 20px;
}

.config-item {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 16px 0;
  border-bottom: 1px solid #f0f0f0;
}

.config-item:last-child {
  border-bottom: none;
}

.config-info {
  flex: 1;
}

.config-label {
  font-size: 14px;
  color: #333;
  margin-bottom: 4px;
  display: block;
}

.config-desc {
  font-size: 13px;
  color: #999;
  margin: 0;
}

.config-select,
.config-time,
.config-input {
  height: 36px;
  padding: 0 12px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-size: 14px;
  outline: none;
  min-width: 200px;
}

.config-input {
  width: 300px;
}

.config-select:focus,
.config-time:focus,
.config-input:focus {
  border-color: #1890ff;
}

/* 开关样式 */
.switch-wrapper {
  position: relative;
}

.switch-input {
  display: none;
}

.switch-label {
  display: block;
  width: 48px;
  height: 24px;
  background: #d9d9d9;
  border-radius: 12px;
  cursor: pointer;
  position: relative;
  transition: background 0.2s;
}

.switch-label::after {
  content: '';
  position: absolute;
  top: 2px;
  left: 2px;
  width: 20px;
  height: 20px;
  background: #fff;
  border-radius: 50%;
  transition: transform 0.2s;
}

.switch-input:checked + .switch-label {
  background: #1890ff;
}

.switch-input:checked + .switch-label::after {
  transform: translateX(24px);
}

/* 复选框组 */
.checkbox-group {
  display: flex;
  gap: 20px;
}

.checkbox-item {
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
}

.checkbox-item input {
  width: 16px;
  height: 16px;
}

/* 映射表格 */
.mapping-table {
  flex: 1;
  max-width: 500px;
}

.mapping-header,
.mapping-row {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
}

.mapping-col {
  flex: 1;
  font-size: 13px;
  color: #666;
}

.mapping-arrow {
  color: #999;
}

.mapping-input {
  flex: 1;
  height: 32px;
  padding: 0 10px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-size: 13px;
}

.mapping-remove {
  width: 24px;
  height: 24px;
  border: none;
  background: #ff4d4f;
  color: #fff;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.add-mapping-btn {
  width: 100%;
  height: 32px;
  border: 1px dashed #d9d9d9;
  background: none;
  color: #1890ff;
  border-radius: 4px;
  cursor: pointer;
  font-size: 13px;
}

/* 同步状态 */
.sync-info {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 20px;
}

.sync-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.sync-item label {
  font-size: 13px;
  color: #999;
}

.sync-value {
  font-size: 14px;
  color: #333;
}

.sync-value.success {
  color: #52c41a;
}

.sync-value.error {
  color: #ff4d4f;
}

.sync-actions {
  display: flex;
  gap: 12px;
}

.btn {
  height: 36px;
  padding: 0 20px;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
  background: #fff;
}

.btn-secondary:hover {
  border-color: #1890ff;
  color: #1890ff;
}

.btn-primary {
  background: #1890ff;
  border-color: #1890ff;
  color: #fff;
}

.btn-primary:hover {
  background: #40a9ff;
}

.btn:disabled {
  background: #f5f5f5;
  color: #999;
  cursor: not-allowed;
}

.action-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 24px;
}

/* 日志弹窗 */
.log-modal {
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

.log-container {
  width: 700px;
  max-width: 90%;
  max-height: 80vh;
  background: #fff;
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

.log-header h3 {
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

.log-body {
  padding: 20px;
  max-height: 60vh;
  overflow-y: auto;
}

.log-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.log-item {
  padding: 12px;
  background: #fafafa;
  border-radius: 6px;
}

.log-time {
  font-size: 12px;
  color: #999;
  margin-bottom: 6px;
}

.log-content {
  font-size: 14px;
  color: #333;
}

.log-status {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
  margin-right: 8px;
}

.log-status.success {
  background: #f6ffed;
  color: #52c41a;
}

.log-status.error {
  background: #fff1f0;
  color: #ff4d4f;
}
</style>
