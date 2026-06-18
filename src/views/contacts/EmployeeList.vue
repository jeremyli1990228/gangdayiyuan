<template>
  <div class="page-container">
    <div class="breadcrumb">
      <div class="breadcrumb-arrow" @click="goBack">
        <svg viewBox="0 0 24 24" fill="none" stroke="#999" xmlns="http://www.w3.org/2000/svg">
          <polyline points="15 18 9 12 15 6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <span class="breadcrumb-item">通讯录</span>
      <span class="breadcrumb-separator">›</span>
      <span class="breadcrumb-item active">员工列表</span>
    </div>
    
    <div class="page-header">
      <h1 class="page-title">员工列表</h1>
      <div class="header-actions">
        <button class="btn btn-primary">
          <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
            <circle cx="11" cy="11" r="8" stroke-width="2"/>
            <path d="M21 21L16.65 16.65" stroke-width="2"/>
          </svg>
          查询
        </button>
        <button class="btn btn-primary">
          <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 5v14M5 12h14" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          新增员工
        </button>
        <button class="btn btn-primary">
          <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M14 10l4 4m0 0l-4 4m4-4H4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          导入员工
        </button>
        <button class="btn btn-success" @click="openSyncModal">
          <svg class="btn-icon btn-icon-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M23 4v6h-6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M1 20v-6h6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          更新同步
        </button>
      </div>
    </div>
    
    <div class="search-form">
      <div class="form-row">
        <div class="form-item">
          <label>员工姓名</label>
          <input type="text" placeholder="请输入" class="form-input"/>
        </div>
        <div class="form-item">
          <label>部门选择</label>
          <select class="form-select">
            <option value="">请选择</option>
          </select>
        </div>
      </div>
    </div>
    
    <div class="table-section">
      <div class="table-container">
        <div class="table-wrapper">
          <div class="table-header">
            <div class="table-cell" style="width: 60px;">序号</div>
            <div class="table-cell" style="width: 100px;">工号</div>
            <div class="table-cell" style="width: 100px;">姓名</div>
            <div class="table-cell" style="width: 150px;">邮箱</div>
            <div class="table-cell" style="width: 120px;">联系方式</div>
            <div class="table-cell" style="width: 120px;">备用电话</div>
            <div class="table-cell" style="width: 120px;">部门</div>
            <div class="table-cell" style="width: 100px;">职务</div>
            <div class="table-cell" style="width: 80px;">状态</div>
            <div class="table-cell" style="width: 100px;">角色</div>
            <div class="table-cell" style="width: 120px;">员工组</div>
            <div class="table-cell" style="width: 80px;">操作</div>
          </div>
          <div class="table-body">
            <div class="table-row">
              <div class="table-cell" style="width: 60px;">1</div>
              <div class="table-cell" style="width: 100px;">TEST001</div>
              <div class="table-cell" style="width: 100px;">付世平</div>
              <div class="table-cell" style="width: 150px;">SKURA2028@163.COM</div>
              <div class="table-cell" style="width: 120px;">18875150647</div>
              <div class="table-cell" style="width: 120px;"></div>
              <div class="table-cell" style="width: 120px;">测试部门一</div>
              <div class="table-cell" style="width: 100px;">行政</div>
              <div class="table-cell" style="width: 80px;">在职</div>
              <div class="table-cell" style="width: 100px;">
                <span class="role-tag">PRO员工</span>
                <span class="role-tag">管理员</span>
                <span class="role-tag">PRO管理员</span>
              </div>
              <div class="table-cell" style="width: 120px;">测试服务组</div>
              <div class="table-cell" style="width: 80px;">
                <a href="#" class="action-link">编辑</a>
              </div>
            </div>
            <div class="table-row">
              <div class="table-cell" style="width: 60px;">2</div>
              <div class="table-cell" style="width: 100px;">TEST002</div>
              <div class="table-cell" style="width: 100px;">王小明</div>
              <div class="table-cell" style="width: 150px;">123.qq.com</div>
              <div class="table-cell" style="width: 120px;">18875263245</div>
              <div class="table-cell" style="width: 120px;"></div>
              <div class="table-cell" style="width: 120px;">医疗改善部</div>
              <div class="table-cell" style="width: 100px;">行政</div>
              <div class="table-cell" style="width: 80px;">在职</div>
              <div class="table-cell" style="width: 100px;">
                <span class="role-tag">科室主任</span>
              </div>
              <div class="table-cell" style="width: 120px;">医疗关系组</div>
              <div class="table-cell" style="width: 80px;">
                <a href="#" class="action-link">编辑</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="pagination">
        <div class="pagination-info">共 2 条</div>
        <select class="pagination-select">
          <option>10条/页</option>
          <option>20条/页</option>
          <option>50条/页</option>
        </select>
        <div class="pagination-buttons">
          <button class="pagination-btn" disabled>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
              <polyline points="15 18 9 12 15 6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          <button class="pagination-btn active">1</button>
          <button class="pagination-btn" disabled>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
              <polyline points="9 18 15 12 9 6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
        <div class="pagination-jump">
          前往
          <input type="text" class="jump-input" value="1"/>
          页
        </div>
      </div>
    </div>

    <div v-if="showSyncModal" class="modal-mask" @click.self="closeSyncModal">
      <div class="modal-content">
        <div class="modal-header">
          <span class="modal-title">通讯录更新同步</span>
          <span class="modal-close" @click="closeSyncModal">×</span>
        </div>
        <div class="modal-body">
          <div class="sync-intro">
            <svg class="sync-intro-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M23 4v6h-6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M1 20v-6h6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <div>
              <div class="sync-intro-title">与第三方系统同步最新通讯录</div>
              <div class="sync-intro-desc">点击下方"开始同步"按钮，系统将从第三方人事/组织架构系统拉取最新员工信息，比对并更新本系统通讯录，确保人员信息及时、准确。</div>
            </div>
          </div>

          <div v-if="syncStatus === 'idle'" class="sync-info">
            <div class="sync-info-row">
              <span class="sync-info-label">上次同步时间</span>
              <span class="sync-info-value">2026-06-18 09:15:32</span>
            </div>
            <div class="sync-info-row">
              <span class="sync-info-label">同步方式</span>
              <span class="sync-info-value">手动触发（全量比对）</span>
            </div>
            <div class="sync-info-row">
              <span class="sync-info-label">待同步范围</span>
              <span class="sync-info-value">全部门 / 全体员工</span>
            </div>
          </div>

          <div v-if="syncStatus === 'syncing'" class="sync-progress">
            <div class="sync-progress-bar">
              <div class="sync-progress-fill" :style="{ width: syncProgress + '%' }"></div>
            </div>
            <div class="sync-progress-text">正在同步中… 已完成 {{ syncProgress }}%</div>
            <div class="sync-step-text">{{ syncStepText }}</div>
          </div>

          <div v-if="syncStatus === 'done'" class="sync-result">
            <div class="sync-result-success">
              <svg class="sync-result-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" stroke-width="2"/>
                <polyline points="9 12 11 14 15 10" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span>同步完成！</span>
            </div>
            <div class="sync-result-grid">
              <div class="sync-result-item">
                <div class="sync-result-num">+12</div>
                <div class="sync-result-label">新增员工</div>
              </div>
              <div class="sync-result-item">
                <div class="sync-result-num">28</div>
                <div class="sync-result-label">信息已更新</div>
              </div>
              <div class="sync-result-item">
                <div class="sync-result-num">-3</div>
                <div class="sync-result-label">已离职/停用</div>
              </div>
              <div class="sync-result-item">
                <div class="sync-result-num">1,286</div>
                <div class="sync-result-label">员工总数</div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button v-if="syncStatus === 'idle'" class="btn btn-default" @click="closeSyncModal">取消</button>
          <button v-if="syncStatus === 'idle'" class="btn btn-success" @click="startSync">开始同步</button>
          <button v-if="syncStatus === 'syncing'" class="btn btn-default" disabled>同步中…</button>
          <button v-if="syncStatus === 'done'" class="btn btn-default" @click="closeSyncModal">关闭</button>
          <button v-if="syncStatus === 'done'" class="btn btn-primary" @click="refreshList">刷新列表</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const goBack = () => {
  window.history.back()
}

const showSyncModal = ref(false)
const syncStatus = ref('idle')
const syncProgress = ref(0)
const syncStepText = ref('')

const openSyncModal = () => {
  showSyncModal.value = true
  syncStatus.value = 'idle'
  syncProgress.value = 0
}

const closeSyncModal = () => {
  showSyncModal.value = false
}

const refreshList = () => {
  closeSyncModal()
  window.location.reload()
}

const startSync = () => {
  syncStatus.value = 'syncing'
  syncProgress.value = 0
  const steps = [
    '正在连接第三方系统接口…',
    '拉取最新员工信息…',
    '逐人比对信息差异…',
    '更新新增/变动的员工…',
    '标记离职及停用员工…',
    '同步完成，数据已写入本地'
  ]
  const timer = setInterval(() => {
    syncProgress.value += 10
    const stepIndex = Math.min(
      Math.floor(syncProgress.value / (100 / steps.length)),
      steps.length - 1
    )
    syncStepText.value = steps[stepIndex]
    if (syncProgress.value >= 100) {
      clearInterval(timer)
      syncStatus.value = 'done'
    }
  }, 300)
}
</script>

<style scoped>
.page-container {
  padding: 24px;
  background-color: #f0f2f5;
  min-height: 100%;
}

.breadcrumb {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  font-size: 14px;
  padding-bottom: 12px;
  border-bottom: 1px solid #f0f0f0;
}

.breadcrumb-arrow {
  width: 32px;
  height: 32px;
  background-color: #e6f7ff;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  cursor: pointer;
}

.breadcrumb-arrow svg {
  width: 16px;
  height: 16px;
}

.breadcrumb-item {
  color: #333;
  text-decoration: none;
  font-size: 14px;
}

.breadcrumb-item.active {
  color: #666;
}

.breadcrumb-separator {
  margin: 0 8px;
  color: #999;
}

.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.page-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.header-actions {
  display: flex;
  gap: 12px;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  height: 32px;
  padding: 0 16px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
}

.btn-icon {
  width: 14px;
  height: 14px;
}

.btn-primary {
  background-color: #1890ff;
  color: #fff;
}

.btn-success {
  background-color: #52c41a;
  color: #fff;
}

.btn-success:hover {
  background-color: #73d13d;
}

.btn-default {
  background-color: #fff;
  color: #333;
  border: 1px solid #d9d9d9;
}

.btn-default:hover:not(:disabled) {
  border-color: #1890ff;
  color: #1890ff;
}

.btn-default:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.btn-icon-spin {
  width: 14px;
  height: 14px;
}

.search-form {
  background-color: #fff;
  padding: 16px 20px;
  border-radius: 4px;
  margin-bottom: 16px;
}

.form-row {
  display: flex;
  gap: 40px;
}

.form-item {
  display: flex;
  align-items: center;
  gap: 12px;
}

.form-item label {
  font-size: 14px;
  color: #333;
  white-space: nowrap;
  font-weight: 500;
}

.form-input {
  width: 250px;
  height: 32px;
  padding: 0 12px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-size: 14px;
  outline: none;
  box-sizing: border-box;
}

.form-select {
  width: 200px;
  height: 32px;
  padding: 0 12px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-size: 14px;
  outline: none;
  background-color: #fff;
  cursor: pointer;
}

.table-section {
  background-color: #fff;
  border-radius: 4px;
  padding: 16px 20px;
}

.table-container {
  border: 1px solid #f0f0f0;
  border-radius: 4px;
  overflow-x: auto;
}

.table-wrapper {
  min-width: 1200px;
}

.table-header {
  display: flex;
  background-color: #fafafa;
  padding: 12px 16px;
}

.table-cell {
  font-size: 14px;
  font-weight: 600;
  color: #333;
  text-align: left;
  flex-shrink: 0;
}

.table-body {
  padding: 0;
}

.table-row {
  display: flex;
  padding: 12px 16px;
  border-bottom: 1px solid #f0f0f0;
}

.table-row:last-child {
  border-bottom: none;
}

.table-row .table-cell {
  font-weight: normal;
}

.role-tag {
  display: inline-block;
  padding: 2px 8px;
  background-color: #e6f7ff;
  color: #1890ff;
  border-radius: 4px;
  font-size: 12px;
  margin-bottom: 4px;
}

.action-link {
  color: #1890ff;
  font-size: 14px;
  text-decoration: none;
}

.pagination {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 16px;
  margin-top: 20px;
  padding-top: 16px;
  border-top: 1px solid #f0f0f0;
}

.pagination-info {
  font-size: 14px;
  color: #666;
}

.pagination-select {
  height: 32px;
  padding: 0 12px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  background-color: #fff;
  font-size: 14px;
}

.pagination-buttons {
  display: flex;
  gap: 8px;
}

.pagination-btn {
  width: 32px;
  height: 32px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  background-color: #fff;
  color: #333;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pagination-btn:hover:not(:disabled) {
  border-color: #1890ff;
  color: #1890ff;
}

.pagination-btn.active {
  background-color: #1890ff;
  border-color: #1890ff;
  color: #fff;
}

.pagination-btn:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.pagination-btn svg {
  width: 14px;
  height: 14px;
}

.pagination-jump {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #666;
}

.jump-input {
  width: 56px;
  height: 32px;
  padding: 0 8px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  text-align: center;
  font-size: 14px;
}

.modal-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  width: 520px;
  max-width: 90%;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  overflow: hidden;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  border-bottom: 1px solid #f0f0f0;
}

.modal-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
}

.modal-close {
  font-size: 24px;
  color: #999;
  cursor: pointer;
  line-height: 1;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-close:hover {
  color: #333;
}

.modal-body {
  padding: 20px 24px;
}

.modal-footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
  padding: 12px 24px;
  border-top: 1px solid #f0f0f0;
  background-color: #fafafa;
}

.sync-intro {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 14px 16px;
  background-color: #e6f7ff;
  border: 1px solid #bae7ff;
  border-radius: 6px;
  margin-bottom: 16px;
}

.sync-intro-icon {
  width: 20px;
  height: 20px;
  color: #1890ff;
  flex-shrink: 0;
  margin-top: 2px;
}

.sync-intro-title {
  font-size: 14px;
  font-weight: 600;
  color: #1890ff;
  margin-bottom: 4px;
}

.sync-intro-desc {
  font-size: 13px;
  color: #555;
  line-height: 1.6;
}

.sync-info {
  background-color: #fafafa;
  border: 1px solid #f0f0f0;
  border-radius: 6px;
  padding: 14px 16px;
}

.sync-info-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 0;
}

.sync-info-label {
  font-size: 13px;
  color: #888;
}

.sync-info-value {
  font-size: 13px;
  color: #333;
  font-weight: 500;
}

.sync-progress {
  padding: 8px 0;
}

.sync-progress-bar {
  width: 100%;
  height: 8px;
  background-color: #f0f0f0;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 10px;
}

.sync-progress-fill {
  height: 100%;
  background-color: #1890ff;
  border-radius: 4px;
  transition: width 0.3s ease;
}

.sync-progress-text {
  font-size: 14px;
  color: #1890ff;
  font-weight: 600;
  margin-bottom: 4px;
}

.sync-step-text {
  font-size: 12px;
  color: #888;
}

.sync-result {
  padding: 8px 0;
}

.sync-result-success {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 16px;
  font-weight: 600;
  color: #52c41a;
  margin-bottom: 16px;
}

.sync-result-icon {
  width: 22px;
  height: 22px;
  color: #52c41a;
}

.sync-result-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}

.sync-result-item {
  background-color: #fafafa;
  border: 1px solid #f0f0f0;
  border-radius: 6px;
  padding: 12px 8px;
  text-align: center;
}

.sync-result-num {
  font-size: 18px;
  font-weight: 700;
  color: #1890ff;
  margin-bottom: 4px;
}

.sync-result-label {
  font-size: 12px;
  color: #888;
}
</style>
