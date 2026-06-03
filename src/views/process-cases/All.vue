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
      <span class="breadcrumb-item active">所有案件</span>
    </div>
    
    <div class="page-header">
      <h1 class="page-title">所有案件</h1>
      <div class="page-header-actions">
        <button class="btn btn-primary btn-search">
          <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
            <circle cx="11" cy="11" r="8" stroke-width="2"/>
            <path d="M21 21L16.65 16.65" stroke-width="2"/>
          </svg>
          查询
        </button>
        <button class="btn btn-warning btn-reset">
          <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 12H21M3 6H21M3 18H15" stroke-width="2"/>
          </svg>
          重置
        </button>
        <button class="btn btn-outline btn-report">
          <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="#52c41a" xmlns="http://www.w3.org/2000/svg">
            <rect x="3" y="3" width="18" height="18" rx="2" stroke-width="2"/>
            <line x1="9" y1="9" x2="15" y2="9" stroke="#52c41a" stroke-width="2"/>
            <line x1="9" y1="15" x2="15" y2="15" stroke="#52c41a" stroke-width="2"/>
          </svg>
          案件汇总
        </button>
        <button class="btn btn-outline btn-import">
          <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="#52c41a" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke-width="2"/>
            <polyline points="7 10 12 15 17 10" stroke-width="2"/>
            <line x1="12" y1="15" x2="12" y2="3" stroke-width="2"/>
          </svg>
          导入案件
        </button>
      </div>
    </div>
    
    <div class="search-form">
      <div class="search-form-row">
        <div class="form-item">
          <label>案件编号</label>
          <input type="text" placeholder="请输入" class="form-input">
        </div>
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
      </div>
      <div class="search-form-row">
        <div class="form-item">
          <label>受理时间</label>
          <div class="date-inputs">
            <div class="date-input-wrapper">
              <svg class="date-icon" viewBox="0 0 24 24" fill="none" stroke="#999" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="4" width="18" height="18" rx="2" stroke-width="2"/>
                <line x1="16" y1="2" x2="16" y2="6" stroke-width="2"/>
                <line x1="8" y1="2" x2="8" y2="6" stroke-width="2"/>
                <line x1="3" y1="10" x2="21" y2="10" stroke-width="2"/>
              </svg>
              <input type="text" placeholder="开始日期" class="form-input date-input">
            </div>
            <span class="date-separator">至</span>
            <input type="text" placeholder="结束日期" class="form-input date-input">
          </div>
        </div>
        <div class="form-item">
          <label>受理类型</label>
          <select class="form-select">
            <option value="">请选择</option>
          </select>
        </div>
        <div class="form-item">
          <label>科室类别</label>
          <select class="form-select">
            <option value="">请选择</option>
          </select>
        </div>
        <div class="form-item">
          <label>涉及人员</label>
          <select class="form-select">
            <option value="">请选择</option>
          </select>
        </div>
        <div class="form-item expand-btn">
          <button class="btn btn-link">
            展开查询条件
            <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="#1890ff" xmlns="http://www.w3.org/2000/svg">
              <polyline points="6 9 12 15 18 9" stroke-width="2"/>
            </svg>
          </button>
        </div>
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
        <div class="table-cell" style="width: 100px;">案件状态</div>
        <div class="table-cell" style="width: 120px;">最新回复时间</div>
        <div class="table-cell" style="width: 120px;">受理时间</div>
        <div class="table-cell" style="width: 140px;">最后更新时间</div>
      </div>
      <div class="table-body">
        <div class="table-row" v-for="(item, index) in tableData" :key="index">
          <div class="table-cell checkbox-cell" style="width: 50px;">
            <input type="checkbox" class="checkbox">
          </div>
          <div class="table-cell" style="width: 60px;">{{ index + 1 }}</div>
          <div class="table-cell" style="width: 160px;">
            <span class="case-no" :class="item.caseNoClass">{{ item.caseNo }}</span>
          </div>
          <div class="table-cell" style="width: 100px;">{{ item.patientName }}</div>
          <div class="table-cell" style="width: 100px;">{{ item.feedbackPerson }}</div>
          <div class="table-cell" style="width: 100px;">{{ item.feedbackMethod }}</div>
          <div class="table-cell" style="width: 150px;">{{ item.department }}</div>
          <div class="table-cell" style="width: 80px;">{{ item.receiver }}</div>
          <div class="table-cell" style="width: 100px;">{{ item.caseType }}</div>
          <div class="table-cell" style="width: 100px;">
            <span class="status-tag" :class="item.statusClass">{{ item.caseStatus }}</span>
          </div>
          <div class="table-cell" style="width: 120px;">
            <span class="reply-time" :class="item.replyTimeClass">{{ item.replyTime }}</span>
          </div>
          <div class="table-cell" style="width: 120px;">{{ item.acceptTime }}</div>
          <div class="table-cell" style="width: 140px;">{{ item.lastUpdateTime }}</div>
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

const tableData = ref([
  {
    caseNo: '000157420231022001',
    patientName: '张小明',
    feedbackPerson: '刘小红',
    feedbackMethod: '来访',
    department: '测试部门-医疗政...',
    receiver: '付世平',
    caseType: '表扬',
    caseStatus: '已结案',
    statusClass: 'success',
    replyTime: '10-22 15:48',
    replyTimeClass: 'success',
    acceptTime: '2023-10-24 00:00:00',
    lastUpdateTime: '2026-06-01 01:15:51',
    caseNoClass: ''
  },
  {
    caseNo: '000157420231022004',
    patientName: '张小明',
    feedbackPerson: '张晓红',
    feedbackMethod: '来函',
    department: '测试部门-门诊',
    receiver: '付世平',
    caseType: '投诉',
    caseStatus: '跟进中',
    statusClass: 'processing',
    replyTime: '无新回复',
    replyTimeClass: 'warning',
    acceptTime: '2023-10-22 15:45:21',
    lastUpdateTime: '2023-10-22 15:45:21',
    caseNoClass: 'blue'
  },
  {
    caseNo: '0001574320231022003',
    patientName: '宁溪',
    feedbackPerson: '宁城',
    feedbackMethod: '信访件',
    department: '门诊',
    receiver: '付世平',
    caseType: '表扬',
    caseStatus: '已结案',
    statusClass: 'success',
    replyTime: '无新回复',
    replyTimeClass: 'warning',
    acceptTime: '2023-10-22 13:39:59',
    lastUpdateTime: '2023-10-22 13:20:05',
    caseNoClass: ''
  },
  {
    caseNo: '000157420231022002',
    patientName: '宁小刀',
    feedbackPerson: '宁宁',
    feedbackMethod: '来电',
    department: '测试部门一',
    receiver: '付世平',
    caseType: '表扬',
    caseStatus: '审批中',
    statusClass: 'pending',
    replyTime: '无新回复',
    replyTimeClass: 'warning',
    acceptTime: '2023-10-22 12:37:44',
    lastUpdateTime: '2023-10-22 14:17:15',
    caseNoClass: 'blue'
  },
  {
    caseNo: '00015720231022001',
    patientName: '王小明',
    feedbackPerson: '张晓红',
    feedbackMethod: '来访',
    department: '门诊',
    receiver: '付世平',
    caseType: '投诉',
    caseStatus: '跟进中',
    statusClass: 'processing',
    replyTime: '10-22 12:36',
    replyTimeClass: 'success',
    acceptTime: '2023-10-20 13:10:42',
    lastUpdateTime: '2023-10-22 12:36:20',
    caseNoClass: 'red'
  }
])

const total = ref(5)
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
  margin-bottom: 16px;
}

.search-form-row:last-child {
  margin-bottom: 0;
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
  width: 200px;
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

.date-input-wrapper {
  position: relative;
}

.date-icon {
  position: absolute;
  left: 8px;
  top: 50%;
  transform: translateY(-50%);
  width: 14px;
  height: 14px;
}

.form-input.date-input {
  width: 140px;
  padding-left: 28px;
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

.date-inputs {
  display: flex;
  align-items: center;
  gap: 8px;
}

.date-separator {
  color: #666;
  font-size: 14px;
  line-height: 32px;
}

.expand-btn {
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

.btn-outline {
  background-color: #fff;
  color: #666;
  border: 1px solid #d9d9d9;
}

.btn-outline:hover {
  border-color: #1890ff;
  color: #1890ff;
}

.btn-link {
  background: none;
  border: none;
  color: #1890ff;
  padding: 0;
  font-size: 14px;
}

.btn-link:hover {
  text-decoration: underline;
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

.case-no.blue {
  color: #1890ff;
}

.case-no.red {
  color: #f5222d;
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

.reply-time {
  font-size: 13px;
}

.reply-time.success {
  color: #52c41a;
}

.reply-time.warning {
  color: #faad14;
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
