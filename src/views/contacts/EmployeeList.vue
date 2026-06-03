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
</style>
