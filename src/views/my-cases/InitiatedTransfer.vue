<template>
  <div class="page-container">
    <div class="breadcrumb">
      <router-link to="/" class="breadcrumb-item">首页</router-link>
      <span class="breadcrumb-separator">›</span>
      <span class="breadcrumb-item">我的案件</span>
      <span class="breadcrumb-separator">›</span>
      <span class="breadcrumb-item active">我发起的转办</span>
    </div>
    <h1 class="page-title">我发起的转办</h1>
    
    <div class="search-form">
      <div class="form-row">
        <div class="form-item">
          <label>患者姓名</label>
          <input type="text" placeholder="请输入" class="form-input">
        </div>
        <div class="form-item">
          <label>涉及科室</label>
          <select class="form-select">
            <option value="">请选择</option>
          </select>
        </div>
        <div class="form-item">
          <label>案件状态</label>
          <select class="form-select">
            <option value="">请选择</option>
          </select>
        </div>
        <div class="form-item">
          <label>创建时间</label>
          <div class="date-inputs">
            <input type="text" placeholder="开始日期" class="form-input date-input">
            <span class="date-separator">至</span>
            <input type="text" placeholder="结束日期" class="form-input date-input">
          </div>
        </div>
        <div class="form-actions">
          <button class="btn btn-primary">
            <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
              <circle cx="11" cy="11" r="8" stroke-width="2"/>
              <path d="M21 21L16.65 16.65" stroke-width="2"/>
            </svg>
            查询
          </button>
          <button class="btn btn-warning">
            <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 12H21M3 6H21M3 18H15" stroke-width="2"/>
            </svg>
            重置
          </button>
        </div>
      </div>
    </div>
    
    <div class="table-container">
      <div class="table-header">
        <div class="table-cell" style="width: 60px;">序号</div>
        <div class="table-cell" style="width: 150px;">案件编号</div>
        <div class="table-cell" style="width: 150px;">转办时间</div>
        <div class="table-cell" style="width: 150px;">转办说明</div>
        <div class="table-cell" style="width: 150px;">回复内容</div>
        <div class="table-cell" style="width: 150px;">回复剩余有效期</div>
        <div class="table-cell">操作</div>
      </div>
      <div class="table-body">
        <div class="table-row" v-for="(item, index) in tableData" :key="index">
          <div class="table-cell" style="width: 60px;">{{ index + 1 }}</div>
          <div class="table-cell" style="width: 150px;">
            <span class="case-number">{{ item.caseNumber }}</span>
          </div>
          <div class="table-cell" style="width: 150px;">{{ item.transferTime }}</div>
          <div class="table-cell" style="width: 150px;">{{ item.transferDesc }}</div>
          <div class="table-cell" style="width: 150px;">{{ item.replyContent }}</div>
          <div class="table-cell" style="width: 150px;">
            <span v-if="item.expiry" class="status-tag" :class="item.expiryClass">{{ item.expiry }}</span>
          </div>
          <div class="table-cell">
            <button class="btn-action" style="color: #1890ff; border-color: #1890ff;">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg" style="width:14px;height:14px;">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke-width="2"/>
              </svg>
              查看回复
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <div class="pagination">
      <div class="pagination-info">共 {{ totalCount }} 条</div>
      <div class="pagination-right">
        <select class="page-size-select">
          <option value="10">10条/页</option>
        </select>
        <button class="page-btn" disabled>‹</button>
        <button class="page-btn active">1</button>
        <button class="page-btn">›</button>
        <div class="page-jump">
          前往 <input type="number" class="page-input" value="1"> 页
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const tableData = ref([
  {
    caseNumber: '000157420231022001',
    transferTime: '2023-10-22 16:38:37',
    transferDesc: '水电费',
    replyContent: '',
    expiry: '',
    expiryClass: ''
  },
  {
    caseNumber: '000157420231022001',
    transferTime: '2023-10-22 16:38:20',
    transferDesc: '水电费',
    replyContent: '',
    expiry: '',
    expiryClass: ''
  },
  {
    caseNumber: '000157420231022001',
    transferTime: '2023-10-22 16:37:56',
    transferDesc: '水电费',
    replyContent: '',
    expiry: '',
    expiryClass: ''
  },
  {
    caseNumber: '000157420231022003',
    transferTime: '2023-10-22 15:46:24',
    transferDesc: '请求协助',
    replyContent: '情况属实',
    expiry: '已回复',
    expiryClass: 'completed'
  },
  {
    caseNumber: '00015721023102001',
    transferTime: '2023-10-22 12:35:17',
    transferDesc: '有效性判定请求',
    replyContent: '已知悉，内容属实。请尽快回复患者。',
    expiry: '已回复',
    expiryClass: 'completed'
  },
  {
    caseNumber: '00015721023102001',
    transferTime: '2023-10-22 12:10:44',
    transferDesc: '请协助处理案件',
    replyContent: '',
    expiry: '超时944天5时16分',
    expiryClass: 'overdue'
  }
])

const totalCount = ref(6)
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

.breadcrumb-item.active {
  color: #333;
}

.breadcrumb-separator {
  margin: 0 8px;
  color: #999;
}

.page-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 0 0 20px 0;
}

.search-form {
  background-color: #fff;
  padding: 16px 20px;
  border-radius: 4px;
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.form-row {
  display: flex;
  align-items: center;
  gap: 24px;
}

.form-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.form-item label {
  font-size: 14px;
  color: #333;
  white-space: nowrap;
  font-weight: 500;
  line-height: 32px;
}

.form-input {
  width: 180px;
  height: 32px;
  padding: 0 12px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s;
  box-sizing: border-box;
}

.form-input:focus {
  border-color: #1890ff;
}

.form-input.date-input {
  width: 140px;
}

.form-select {
  width: 180px;
  height: 32px;
  padding: 0 12px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-size: 14px;
  outline: none;
  background-color: #fff;
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 8px center;
  padding-right: 28px;
  box-sizing: border-box;
}

.form-select:focus {
  border-color: #1890ff;
}

.date-inputs {
  display: flex;
  align-items: center;
  gap: 8px;
}

.date-separator {
  color: #999;
  font-size: 14px;
  line-height: 32px;
}

.form-actions {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-left: auto;
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
  transition: all 0.2s;
}

.btn-icon {
  width: 14px;
  height: 14px;
}

.btn-primary {
  background-color: #1890ff;
  color: #fff;
}

.btn-primary:hover {
  background-color: #40a9ff;
}

.btn-warning {
  background-color: #faad14;
  color: #fff;
}

.btn-warning:hover {
  background-color: #ffc53d;
}

.table-container {
  background-color: #fff;
  border-radius: 4px;
  overflow: hidden;
}

.table-header {
  display: flex;
  background-color: #fafafa;
  border-bottom: 1px solid #f0f0f0;
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
  background-color: #fff;
}

.table-row {
  display: flex;
  border-bottom: 1px solid #f0f0f0;
  padding: 12px 16px;
  transition: background-color 0.2s;
}

.table-row:hover {
  background-color: #fafafa;
}

.table-row:last-child {
  border-bottom: none;
}

.table-row .table-cell {
  font-weight: 400;
  color: #666;
  display: flex;
  align-items: center;
  font-size: 14px;
}

.case-number {
  color: #1890ff;
  cursor: pointer;
}

.status-tag {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
}

.status-tag.completed {
  background-color: #f6ffed;
  color: #52c41a;
  border: 1px solid #b7eb8f;
}

.status-tag.overdue {
  background-color: #fff2f0;
  color: #ff4d4f;
  border: 1px solid #ffa39e;
}

.btn-action {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  height: 28px;
  padding: 0 10px;
  border: 1px solid;
  border-radius: 4px;
  background-color: #fff;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-action:hover {
  opacity: 0.7;
}

.pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background-color: #fff;
  margin-top: 20px;
  border-radius: 4px;
}

.pagination-info {
  font-size: 14px;
  color: #666;
}

.pagination-right {
  display: flex;
  align-items: center;
  gap: 10px;
}

.page-size-select {
  height: 32px;
  padding: 0 10px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-size: 14px;
  outline: none;
  background-color: #fff;
  cursor: pointer;
}

.page-btn {
  min-width: 32px;
  height: 32px;
  padding: 0 10px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  background-color: #fff;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
}

.page-btn:hover:not(:disabled) {
  color: #1890ff;
  border-color: #1890ff;
}

.page-btn.active {
  background-color: #1890ff;
  color: #fff;
  border-color: #1890ff;
}

.page-btn:disabled {
  cursor: not-allowed;
  color: #d9d9d9;
}

.page-jump {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #666;
}

.page-input {
  width: 60px;
  height: 32px;
  padding: 0 8px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-size: 14px;
  text-align: center;
  outline: none;
}

.page-input:focus {
  border-color: #1890ff;
}
</style>
