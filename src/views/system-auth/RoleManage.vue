<template>
  <div class="page-container">
    <div class="breadcrumb">
      <div class="breadcrumb-arrow" @click="goBack">
        <svg viewBox="0 0 24 24" fill="none" stroke="#999" xmlns="http://www.w3.org/2000/svg">
          <polyline points="15 18 9 12 15 6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <span class="breadcrumb-item">系统权限</span>
      <span class="breadcrumb-separator">›</span>
      <span class="breadcrumb-item active">角色管理</span>
    </div>
    
    <div class="page-header">
      <h1 class="page-title">角色管理</h1>
      <div class="header-actions">
        <button class="btn btn-primary">
          <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
            <circle cx="11" cy="11" r="8" stroke-width="2"/>
            <path d="M21 21L16.65 16.65" stroke-width="2"/>
          </svg>
          查询
        </button>
        <button class="btn btn-success">
          <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 5v14M5 12h14" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          新增
        </button>
      </div>
    </div>
    
    <div class="search-form">
      <div class="form-row">
        <div class="form-item">
          <label>角色名称</label>
          <input type="text" class="form-input" style="width: 250px;"/>
        </div>
      </div>
    </div>
    
    <div class="table-section">
      <div class="table-container">
      <div class="table-wrapper">
        <div class="table-header">
          <div class="table-cell" style="width: 80px;">序号</div>
          <div class="table-cell" style="width: 200px;">角色名称</div>
          <div class="table-cell" style="width: 200px;">角色标识</div>
          <div class="table-cell" style="width: 250px;">角色描述</div>
          <div class="table-cell" style="width: 200px;">创建时间</div>
          <div class="table-cell" style="width: 220px;">操作</div>
        </div>
        <div class="table-body">
          <div class="table-row">
            <div class="table-cell" style="width: 80px;">1</div>
            <div class="table-cell" style="width: 200px;">PRO员工</div>
            <div class="table-cell" style="width: 200px;">PRO_STAFF</div>
            <div class="table-cell" style="width: 250px;">PRO员工</div>
            <div class="table-cell" style="width: 200px;">2020-05-15 21:38:40</div>
            <div class="table-cell" style="width: 220px;">
              <a href="#" class="action-link edit">编辑</a>
              <a href="#" class="action-link delete">删除</a>
              <a href="#" class="action-link permission">权限</a>
            </div>
          </div>
          <div class="table-row">
            <div class="table-cell" style="width: 80px;">2</div>
            <div class="table-cell" style="width: 200px;">普通科室员工</div>
            <div class="table-cell" style="width: 200px;">STAFF</div>
            <div class="table-cell" style="width: 250px;">普通科室员工</div>
            <div class="table-cell" style="width: 200px;">2020-05-15 21:41:14</div>
            <div class="table-cell" style="width: 220px;">
              <a href="#" class="action-link edit">编辑</a>
              <a href="#" class="action-link delete">删除</a>
              <a href="#" class="action-link permission">权限</a>
            </div>
          </div>
          <div class="table-row">
            <div class="table-cell" style="width: 80px;">3</div>
            <div class="table-cell" style="width: 200px;">科室主任</div>
            <div class="table-cell" style="width: 200px;">DEPT_DIRECTOR</div>
            <div class="table-cell" style="width: 250px;">科室主任</div>
            <div class="table-cell" style="width: 200px;">2020-09-15 15:04:16</div>
            <div class="table-cell" style="width: 220px;">
              <a href="#" class="action-link edit">编辑</a>
              <a href="#" class="action-link delete">删除</a>
              <a href="#" class="action-link permission">权限</a>
            </div>
          </div>
          <div class="table-row">
            <div class="table-cell" style="width: 80px;">4</div>
            <div class="table-cell" style="width: 200px;">院领导</div>
            <div class="table-cell" style="width: 200px;">LEADER</div>
            <div class="table-cell" style="width: 250px;">院领导</div>
            <div class="table-cell" style="width: 200px;">2020-09-15 15:04:55</div>
            <div class="table-cell" style="width: 220px;">
              <a href="#" class="action-link edit">编辑</a>
              <a href="#" class="action-link delete">删除</a>
              <a href="#" class="action-link permission">权限</a>
            </div>
          </div>
          <div class="table-row">
            <div class="table-cell" style="width: 80px;">5</div>
            <div class="table-cell" style="width: 200px;">管理员</div>
            <div class="table-cell" style="width: 200px;">ROLE_ADMIN</div>
            <div class="table-cell" style="width: 250px;">管理员</div>
            <div class="table-cell" style="width: 200px;">2017-10-29 15:45:51</div>
            <div class="table-cell" style="width: 220px;">
              <a href="#" class="action-link edit">编辑</a>
              <a href="#" class="action-link delete">删除</a>
              <a href="#" class="action-link permission">权限</a>
            </div>
          </div>
          <div class="table-row">
            <div class="table-cell" style="width: 80px;">6</div>
            <div class="table-cell" style="width: 200px;">PRO管理员</div>
            <div class="table-cell" style="width: 200px;">PRO_ADMIN</div>
            <div class="table-cell" style="width: 250px;">PRO管理员</div>
            <div class="table-cell" style="width: 200px;">2020-05-15 21:38:01</div>
            <div class="table-cell" style="width: 220px;">
              <a href="#" class="action-link edit">编辑</a>
              <a href="#" class="action-link delete">删除</a>
              <a href="#" class="action-link permission">权限</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    
      <div class="pagination">
        <div class="pagination-info">共 6 条</div>
        <select class="pagination-select">
          <option selected>10条/页</option>
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
  background-color: #10b981;
  color: #fff;
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
  min-width: 1100px;
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

.action-link {
  font-size: 14px;
  text-decoration: none;
  margin-right: 16px;
}

.action-link.edit {
  color: #1890ff;
}

.action-link.delete {
  color: #f5222d;
}

.action-link.permission {
  color: #1890ff;
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
</style>