<template>
  <div class="page-container">
    <div class="breadcrumb">
      <div class="breadcrumb-arrow">
        <svg viewBox="0 0 24 24" fill="none" stroke="#999" xmlns="http://www.w3.org/2000/svg">
          <polyline points="15 18 9 12 15 6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <router-link to="/" class="breadcrumb-item">案件报备</router-link>
      <span class="breadcrumb-separator">›</span>
      <span class="breadcrumb-item active">所有报备</span>
    </div>
    
    <div class="page-header">
      <h1 class="page-title">报备记录</h1>
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
    
    <div class="search-form">
      <div class="form-item">
        <label>状态</label>
        <select class="form-select">
          <option value="">请选择</option>
        </select>
      </div>
    </div>
    
    <div class="table-container">
      <div class="table-header">
        <div class="table-cell" style="width: 80px;">序号</div>
        <div class="table-cell" style="width: 120px;">报备人</div>
        <div class="table-cell" style="width: 180px;">涉及科室</div>
        <div class="table-cell" style="width: 100px;">状态</div>
        <div class="table-cell" style="width: 140px;">创建时间</div>
        <div class="table-cell" style="width: 150px;">备注</div>
        <div class="table-cell" style="width: 100px;">操作</div>
      </div>
      <div class="table-body">
        <div v-if="tableData.length === 0" class="empty-state">
          <svg class="empty-icon" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M60 25 C30 25 20 45 20 60 C20 85 40 100 60 100 C80 100 100 85 100 60 C100 45 90 25 60 25 Z" fill="#f5f5f5"/>
            <path d="M40 55 L45 70 L75 45" fill="none" stroke="#d9d9d9" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <div class="empty-text">暂无数据</div>
        </div>
        <div class="table-row" v-for="(item, index) in tableData" :key="index">
          <div class="table-cell" style="width: 80px;">{{ index + 1 }}</div>
          <div class="table-cell" style="width: 120px;">{{ item.reporter }}</div>
          <div class="table-cell" style="width: 180px;">{{ item.department }}</div>
          <div class="table-cell" style="width: 100px;">
            <span class="status-tag" :class="item.statusClass">{{ item.status }}</span>
          </div>
          <div class="table-cell" style="width: 140px;">{{ item.createTime }}</div>
          <div class="table-cell" style="width: 150px;">{{ item.remark }}</div>
          <div class="table-cell" style="width: 100px;">
            <button class="btn btn-outline btn-view">查看</button>
          </div>
        </div>
      </div>
    </div>
    
    <div class="pagination">
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
  color: #1890ff;
  border: 1px solid #1890ff;
}

.btn-outline:hover {
  background-color: #e6f7ff;
}

.btn-view {
  height: 28px;
  padding: 0 12px;
  font-size: 12px;
}

.search-form {
  background-color: #fff;
  padding: 16px 20px;
  border-radius: 4px;
  margin-bottom: 16px;
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

.status-tag {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
}

.status-tag.success {
  background-color: #f6ffed;
  color: #52c41a;
  border: 1px solid #b7eb8f;
}

.status-tag.processing {
  background-color: #e6f7ff;
  color: #1890ff;
  border: 1px solid #91d5ff;
}

.status-tag.pending {
  background-color: #fff7e6;
  color: #fa8c16;
  border: 1px solid #ffd591;
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
