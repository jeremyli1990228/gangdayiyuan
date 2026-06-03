<template>
  <div class="page-container">
    <div class="breadcrumb">
      <div class="breadcrumb-arrow" @click="goBack">
        <svg viewBox="0 0 24 24" fill="none" stroke="#999" xmlns="http://www.w3.org/2000/svg">
          <polyline points="15 18 9 12 15 6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <span class="breadcrumb-item">问卷调查</span>
      <span class="breadcrumb-separator">›</span>
      <span class="breadcrumb-item active">满意度调查</span>
    </div>
    
    <div class="page-header">
      <h1 class="page-title">满意度调查</h1>
      <div class="page-header-actions">
        <button class="btn btn-primary">
          <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
            <circle cx="11" cy="11" r="8" stroke-width="2"/>
            <path d="M21 21L16.65 16.65" stroke-width="2"/>
          </svg>
          查询
        </button>
        <button class="btn btn-secondary">
          <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 11H5M19 11C20.1046 11 21 11.8954 21 13V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V13C3 11.8954 3.89543 11 5 11M19 11V9C19 7.89543 18.1046 7 17 7M5 11V9C5 7.89543 5.89543 7 7 7" stroke-width="2"/>
          </svg>
          答卷统计
        </button>
        <button class="btn btn-success">
          <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 4v16m8-8H4" stroke-width="2" stroke-linecap="round"/>
          </svg>
          新增问卷
        </button>
      </div>
    </div>
    
    <div class="search-form">
      <div class="form-item">
        <label>问卷标题</label>
        <input type="text" placeholder="请输入" class="form-input">
      </div>
    </div>
    
    <div class="table-container">
      <div class="table-header">
        <div class="table-cell" style="width: 60px;">序号</div>
        <div class="table-cell" style="width: 140px;">问卷编号</div>
        <div class="table-cell" style="width: 200px;">问卷标题</div>
        <div class="table-cell" style="width: 120px;">考核对象</div>
        <div class="table-cell" style="width: 100px;">科室类型</div>
        <div class="table-cell" style="width: 120px;">创建人</div>
        <div class="table-cell" style="width: 160px;">统计截至时间</div>
        <div class="table-cell" style="width: 160px;">创建时间</div>
        <div class="table-cell" style="width: 150px;">操作</div>
      </div>
      <div class="table-body">
        <div class="table-row">
          <div class="table-cell" style="width: 60px;">1</div>
          <div class="table-cell" style="width: 140px;">20231022001</div>
          <div class="table-cell" style="width: 200px;">医疗服务改善问卷调查</div>
          <div class="table-cell" style="width: 120px;">医院</div>
          <div class="table-cell" style="width: 100px;">住院</div>
          <div class="table-cell" style="width: 120px;">PRO_ADMIN</div>
          <div class="table-cell" style="width: 160px;">2023-10-22 12:29:06</div>
          <div class="table-cell" style="width: 160px;">2023-10-22 12:29:06</div>
          <div class="table-cell" style="width: 150px;">
            <button class="action-btn edit">
              <svg viewBox="0 0 24 24" fill="none" stroke="#1890ff" xmlns="http://www.w3.org/2000/svg">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke-width="2"/>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke-width="2"/>
              </svg>
              <span>编辑</span>
            </button>
            <button class="action-btn">
              <svg viewBox="0 0 24 24" fill="none" stroke="#1890ff" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke-width="2"/>
                <polyline points="14 2 14 8 20 8" stroke-width="2"/>
                <line x1="16" y1="13" x2="8" y2="13" stroke-width="2"/>
                <line x1="16" y1="17" x2="8" y2="17" stroke-width="2"/>
                <polyline points="10 9 9 9 8 9" stroke-width="2"/>
              </svg>
              <span>答卷记录</span>
            </button>
            <button class="action-btn">
              <svg viewBox="0 0 24 24" fill="none" stroke="#1890ff" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke-width="2"/>
                <polyline points="7 10 12 15 17 10" stroke-width="2"/>
                <line x1="12" y1="15" x2="12" y2="3" stroke-width="2"/>
              </svg>
              <span>导入</span>
            </button>
            <button class="action-btn delete">
              <svg viewBox="0 0 24 24" fill="none" stroke="#ff4d4f" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 6h18M19 6v14c0 1.1-.9 2-2 2H7c-1.1 0-2-.9-2-2V6m3 0V4c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2v2" stroke-width="2"/>
              </svg>
              <span>删除</span>
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <div class="pagination">
      <div class="pagination-info">共 1 条</div>
      <div class="pagination-right">
        <select class="page-size-select">
          <option value="10">10条/页</option>
          <option value="20">20条/页</option>
          <option value="50">50条/页</option>
        </select>
        <button class="page-btn" disabled>
          <svg viewBox="0 0 24 24" fill="none" stroke="#999" xmlns="http://www.w3.org/2000/svg">
            <polyline points="15 18 9 12 15 6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <button class="page-btn active">1</button>
        <button class="page-btn" disabled>
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
const goBack = () => {
  window.history.back()
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

.btn-secondary {
  background-color: #fff;
  color: #1890ff;
  border: 1px solid #1890ff;
}

.btn-secondary:hover {
  background-color: #e6f7ff;
}

.btn-success {
  background-color: #52c41a;
  color: #fff;
}

.btn-success:hover {
  background-color: #73d13d;
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
  gap: 12px;
}

.form-item label {
  font-size: 14px;
  color: #333;
  white-space: nowrap;
  font-weight: 500;
}

.form-input {
  width: 300px;
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

.action-btn {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  background: none;
  border: none;
  color: #1890ff;
  font-size: 12px;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.2s;
  margin-right: 8px;
}

.action-btn:hover {
  background-color: #e6f7ff;
}

.action-btn svg {
  width: 12px;
  height: 12px;
}

.action-btn.delete {
  color: #ff4d4f;
}

.action-btn.delete:hover {
  background-color: #fff2f0;
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