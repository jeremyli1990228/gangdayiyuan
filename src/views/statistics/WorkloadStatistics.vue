<template>
  <div class="page-container">
    <div class="breadcrumb">
      <div class="breadcrumb-arrow" @click="goBack">
        <svg viewBox="0 0 24 24" fill="none" stroke="#999" xmlns="http://www.w3.org/2000/svg">
          <polyline points="15 18 9 12 15 6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <span class="breadcrumb-item">数据统计</span>
      <span class="breadcrumb-separator">›</span>
      <span class="breadcrumb-item active">工作量统计</span>
    </div>
    
    <div class="page-header">
      <h1 class="page-title">工作量统计</h1>
      <button class="btn btn-primary" style="margin-left: auto;">
        <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
          <circle cx="11" cy="11" r="8" stroke-width="2"/>
          <path d="M21 21L16.65 16.65" stroke-width="2"/>
        </svg>
        查询
      </button>
    </div>
    
    <div class="search-form">
      <div class="form-row">
        <div class="form-item">
          <label>统计时间段</label>
          <div class="date-range">
            <input type="text" placeholder="开始日期" class="form-input date-input">
            <span class="date-separator">至</span>
            <input type="text" placeholder="结束日期" class="form-input date-input">
          </div>
        </div>
      </div>
    </div>
    
    <div class="table-section">
      <div class="section-header">
        <span class="section-title">统计表单</span>
        <a href="#" class="download-link">
          <svg viewBox="0 0 24 24" fill="none" stroke="#1890ff" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke-width="2"/>
            <polyline points="7 10 12 15 17 10" stroke-width="2"/>
            <line x1="12" y1="15" x2="12" y2="3" stroke-width="2"/>
          </svg>
          导出数据
        </a>
      </div>
      <div class="table-container">
        <div class="table-header">
          <div class="table-cell" style="width: 120px;">员工工号</div>
          <div class="table-cell" style="width: 120px;">员工姓名</div>
          <div class="table-cell" style="width: 120px;">投诉案件数</div>
          <div class="table-cell" style="width: 120px;">感谢案件数</div>
          <div class="table-cell" style="width: 120px;">建议案件数</div>
          <div class="table-cell" style="width: 120px;">其他案件数</div>
        </div>
        <div class="table-body">
          <div class="empty-row">
            <span>暂无数据</span>
          </div>
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
  margin-bottom: 16px;
}

.page-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 0;
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
  height: 32px;
  padding: 0 12px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-size: 14px;
  outline: none;
  box-sizing: border-box;
}

.date-input {
  width: 140px;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 24 24' fill='none' stroke='%23999' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='3' y='4' width='18' height='18' rx='2' stroke-width='2'/%3E%3Cline x1='16' y1='2' x2='16' y2='6' stroke-width='2'/%3E%3Cline x1='8' y1='2' x2='8' y2='6' stroke-width='2'/%3E%3Cline x1='3' y1='10' x2='21' y2='10' stroke-width='2'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 8px center;
  background-size: 16px;
}

.date-range {
  display: flex;
  align-items: center;
  gap: 8px;
}

.date-separator {
  color: #999;
}

.table-section {
  background-color: #fff;
  border-radius: 4px;
  padding: 16px 20px;
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid #f0f0f0;
}

.section-title {
  font-size: 14px;
  font-weight: 600;
  color: #333;
}

.download-link {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  color: #1890ff;
  font-size: 12px;
  text-decoration: none;
}

.download-link svg {
  width: 12px;
  height: 12px;
}

.table-container {
  border: 1px solid #f0f0f0;
  border-radius: 4px;
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
  padding: 16px;
}

.empty-row {
  text-align: center;
  color: #999;
  font-size: 14px;
  padding: 40px 0;
}
</style>