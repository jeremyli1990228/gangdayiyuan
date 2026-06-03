<template>
  <div class="page-container">
    <div class="breadcrumb">
      <div class="breadcrumb-arrow">
        <svg viewBox="0 0 24 24" fill="none" stroke="#999" xmlns="http://www.w3.org/2000/svg">
          <polyline points="15 18 9 12 15 6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <router-link to="/" class="breadcrumb-item">处理案件</router-link>
      <span class="breadcrumb-separator">›</span>
      <span class="breadcrumb-item active">草稿箱</span>
    </div>
    
    <div class="page-header">
      <h1 class="page-title">草稿箱</h1>
      <div class="page-header-actions">
        <button class="btn btn-primary">
          <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
            <circle cx="11" cy="11" r="8" stroke-width="2"/>
            <path d="M21 21L16.65 16.65" stroke-width="2"/>
          </svg>
          查询
        </button>
      </div>
    </div>
    
    <div class="table-container">
      <div class="table-header">
        <div class="table-cell checkbox-cell" style="width: 50px;">
          <input type="checkbox" class="checkbox">
        </div>
        <div class="table-cell" style="width: 60px;">序号</div>
        <div class="table-cell" style="width: 160px;">案件编号</div>
        <div class="table-cell" style="width: 100px;">患者姓名</div>
        <div class="table-cell" style="width: 100px;">反馈人</div>
        <div class="table-cell" style="width: 100px;">反馈方式</div>
        <div class="table-cell" style="width: 150px;">涉及科室</div>
        <div class="table-cell" style="width: 80px;">受理人</div>
        <div class="table-cell" style="width: 100px;">案件类型</div>
        <div class="table-cell" style="width: 120px;">受理时间</div>
        <div class="table-cell" style="width: 140px;">操作</div>
      </div>
      <div class="table-body">
        <div class="table-row" v-for="(item, index) in tableData" :key="index">
          <div class="table-cell checkbox-cell" style="width: 50px;">
            <input type="checkbox" class="checkbox">
          </div>
          <div class="table-cell" style="width: 60px;">{{ index + 1 }}</div>
          <div class="table-cell" style="width: 160px;">
            <span class="case-no">{{ item.caseNo }}</span>
          </div>
          <div class="table-cell" style="width: 100px;">{{ item.patientName }}</div>
          <div class="table-cell" style="width: 100px;">{{ item.feedbackPerson }}</div>
          <div class="table-cell" style="width: 100px;">{{ item.feedbackMethod }}</div>
          <div class="table-cell" style="width: 150px;">{{ item.department }}</div>
          <div class="table-cell" style="width: 80px;">{{ item.receiver }}</div>
          <div class="table-cell" style="width: 100px;">{{ item.caseType }}</div>
          <div class="table-cell" style="width: 120px;">{{ item.createTime }}</div>
          <div class="table-cell" style="width: 140px;">
            <button class="btn btn-primary btn-edit">编辑</button>
            <button class="btn btn-outline btn-delete">删除</button>
          </div>
        </div>
      </div>
      <div v-if="tableData.length === 0" class="empty-state">
        <svg class="empty-icon" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="30" y="20" width="60" height="80" rx="4" fill="#f0f0f0" stroke="#e0e0e0" stroke-width="2"/>
          <path d="M40 35 L50 35 L50 50 L40 50 Z M70 35 L80 35 L80 65 L70 65 Z" fill="#e0e0e0"/>
          <path d="M45 60 L50 55 L60 70 L70 50 L75 55" fill="none" stroke="#d0d0d0" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <div class="empty-text">暂无数据</div>
      </div>
    </div>
    
    <div class="pagination" v-if="tableData.length > 0">
      <div class="pagination-info">共 {{ total }} 条</div>
      <div class="pagination-right">
        <select class="page-size-select">
          <option value="10">10条/页</option>
        </select>
        <button class="page-btn" disabled>
          <svg viewBox="0 0 24 24" fill="none" stroke="#999" xmlns="http://www.w3.org/2000/svg">
            <polyline points="15 18 9 12 15 6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <button class="page-btn active">1</button>
        <button class="page-btn">
          <svg viewBox="0 0 24 24" fill="none" stroke="#999" xmlns="http://www.w3.org/2000/svg">
            <polyline points="9 18 15 12 9 6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <div class="page-jump">
          前往 <input type="number" class="page-input" value="1"> 页
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const tableData = ref([])

const total = ref(0)
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

.btn-outline {
  background-color: #fff;
  color: #666;
  border: 1px solid #d9d9d9;
}

.btn-outline:hover {
  border-color: #1890ff;
  color: #1890ff;
}

.btn-edit,
.btn-delete {
  margin-right: 8px;
  height: 28px;
  padding: 0 12px;
  font-size: 12px;
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

.checkbox-cell {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.checkbox {
  width: 16px;
  height: 16px;
  cursor: pointer;
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

.case-no {
  color: #666;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 20px;
}

.empty-icon {
  width: 120px;
  height: 120px;
  margin-bottom: 16px;
}

.empty-text {
  font-size: 14px;
  color: #999;
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
  padding: 0 8px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  background-color: #fff;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
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
