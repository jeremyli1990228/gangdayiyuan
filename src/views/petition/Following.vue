<template>
  <div class="page-container">
    <div class="breadcrumb">
      <div class="breadcrumb-arrow">
        <svg viewBox="0 0 24 24" fill="none" stroke="#999">
          <polyline points="15 18 9 12 15 6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <router-link to="/" class="breadcrumb-item">民生诉求</router-link>
      <span class="breadcrumb-separator">›</span>
      <span class="breadcrumb-item active">{{ pageTitle }}</span>
    </div>
    
    <div class="page-header">
      <h1 class="page-title">{{ pageTitle }}</h1>
      <div class="page-header-actions">
        <button class="btn btn-primary btn-search">
          <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="11" cy="11" r="8" stroke-width="2"/>
            <path d="M21 21L16.65 16.65" stroke-width="2"/>
          </svg>
          查询
        </button>
        <button class="btn btn-warning btn-reset">
          <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M3 12H21M3 6H21M3 18H15" stroke-width="2"/>
          </svg>
          重置
        </button>
      </div>
    </div>
    
    <div class="search-form">
      <div class="search-form-row">
        <div class="form-item">
          <label>工单编号</label>
          <input type="text" placeholder="请输入" class="form-input">
        </div>
        <div class="form-item">
          <label>反馈人</label>
          <input type="text" placeholder="请输入" class="form-input">
        </div>
        <div class="form-item">
          <label>工单状态</label>
          <select class="form-select">
            <option value="">请选择</option>
            <option value="pending">待处理</option>
            <option value="processing">处理中</option>
            <option value="resolved">已解决</option>
          </select>
        </div>
        <div class="form-item">
          <label>签收日期</label>
          <div class="date-inputs">
            <input type="text" placeholder="开始日期" class="form-input date-input">
            <span class="date-separator">至</span>
            <input type="text" placeholder="结束日期" class="form-input date-input">
          </div>
        </div>
      </div>
    </div>
    
    <div class="table-container">
      <div class="table-header">
        <div class="table-cell" style="width: 60px;">序号</div>
        <div class="table-cell" style="width: 160px;">工单编号</div>
        <div class="table-cell" style="width: 120px;">反馈人</div>
        <div class="table-cell" style="width: 120px;">工单分类</div>
        <div class="table-cell" style="width: 100px;">紧急程度</div>
        <div class="table-cell" style="width: 150px;">涉及科室</div>
        <div class="table-cell" style="width: 100px;">工单状态</div>
        <div class="table-cell" style="width: 120px;">签收日期</div>
        <div class="table-cell" style="width: 140px;">最后更新时间</div>
      </div>
      <div class="table-body">
        <div class="table-row" v-for="(item, index) in tableData" :key="index">
          <div class="table-cell" style="width: 60px;">{{ index + 1 }}</div>
          <div class="table-cell" style="width: 160px;">
            <router-link :to="`/petition/detail/${item.id}`" class="case-no-link">{{ item.caseNo }}</router-link>
          </div>
          <div class="table-cell" style="width: 120px;">{{ item.feedbackName }}</div>
          <div class="table-cell" style="width: 120px;">{{ item.category }}</div>
          <div class="table-cell" style="width: 100px;">
            <span class="urgency-tag" :class="item.urgencyClass">{{ item.urgency }}</span>
          </div>
          <div class="table-cell" style="width: 150px;">{{ item.department }}</div>
          <div class="table-cell" style="width: 100px;">
            <span class="status-tag" :class="item.statusClass">{{ item.status }}</span>
          </div>
          <div class="table-cell" style="width: 120px;">{{ item.signDate }}</div>
          <div class="table-cell" style="width: 140px;">{{ item.lastUpdateTime }}</div>
        </div>
      </div>
    </div>
    
    <div class="pagination">
      <div class="pagination-info">共 {{ tableData.length }} 条</div>
      <div class="pagination-right">
        <button class="page-btn" disabled>
          <svg viewBox="0 0 24 24" fill="none" stroke="#999">
            <polyline points="15 18 9 12 15 6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <button class="page-btn active">1</button>
        <button class="page-btn" disabled>
          <svg viewBox="0 0 24 24" fill="none" stroke="#999">
            <polyline points="9 18 15 12 9 6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const pageTitle = '我跟进的'

const tableData = ref([
  {
    id: '001',
    caseNo: 'MZSS20260801001',
    feedbackName: '张三',
    category: '医疗服务',
    urgency: '紧急',
    urgencyClass: 'urgent',
    department: '门诊部',
    status: '处理中',
    statusClass: 'processing',
    signDate: '2026-08-01',
    lastUpdateTime: '2026-08-15 10:30'
  },
  {
    id: '002',
    caseNo: 'MZSS20260802002',
    feedbackName: '李四',
    category: '收费问题',
    urgency: '普通',
    urgencyClass: 'normal',
    department: '财务科',
    status: '待处理',
    statusClass: 'pending',
    signDate: '2026-08-02',
    lastUpdateTime: '2026-08-10 14:20'
  }
])
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

.breadcrumb-item:hover {
  color: #1890ff;
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

.page-header-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.search-form {
  background-color: #fff;
  padding: 20px 24px;
  border-radius: 4px;
  margin-bottom: 16px;
}

.search-form-row {
  display: flex;
  align-items: center;
  gap: 20px;
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
}

.form-input {
  width: 180px;
  height: 32px;
  padding: 0 12px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-size: 14px;
  outline: none;
  box-sizing: border-box;
}

.form-input:focus {
  border-color: #1890ff;
}

.form-input.date-input {
  width: 120px;
}

.form-select {
  width: 150px;
  height: 32px;
  padding: 0 12px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-size: 14px;
  outline: none;
  background-color: #fff;
  cursor: pointer;
  padding-right: 28px;
  box-sizing: border-box;
}

.date-inputs {
  display: flex;
  align-items: center;
  gap: 8px;
}

.date-separator {
  color: #666;
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
}

.table-body {
  background-color: #fff;
}

.table-row {
  display: flex;
  border-bottom: 1px solid #f0f0f0;
  padding: 12px 16px;
}

.table-row:hover {
  background-color: #fafafa;
}

.table-row .table-cell {
  font-weight: 400;
  color: #666;
  display: flex;
  align-items: center;
  font-size: 14px;
}

.case-no-link {
  color: #1890ff;
  text-decoration: none;
  cursor: pointer;
}

.case-no-link:hover {
  text-decoration: underline;
}

.status-tag {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
}

.status-tag.pending {
  background-color: #fff7e6;
  color: #fa8c16;
  border: 1px solid #ffd591;
}

.status-tag.processing {
  background-color: #e6f7ff;
  color: #1890ff;
  border: 1px solid #91d5ff;
}

.status-tag.success {
  background-color: #f6ffed;
  color: #52c41a;
  border: 1px solid #b7eb8f;
}

.urgency-tag {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
}

.urgency-tag.normal {
  background-color: #f0f0f0;
  color: #666;
  border: 1px solid #d9d9d9;
}

.urgency-tag.urgent {
  background-color: #fff7e6;
  color: #fa8c16;
  border: 1px solid #ffd591;
}

.urgency-tag.critical {
  background-color: #fff1f0;
  color: #ff4d4f;
  border: 1px solid #ffa39e;
}

.pagination {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 20px 0;
  gap: 12px;
}

.pagination-info {
  font-size: 14px;
  color: #666;
  margin-right: auto;
}

.pagination-right {
  display: flex;
  align-items: center;
  gap: 10px;
}

.page-btn {
  min-width: 32px;
  height: 32px;
  padding: 0 8px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  background-color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.page-btn svg {
  width: 14px;
  height: 14px;
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
</style>
