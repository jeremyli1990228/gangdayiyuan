<template>
  <div class="page-container">
    <div class="breadcrumb">
      <div class="breadcrumb-arrow" @click="goBack">
        <svg viewBox="0 0 24 24" fill="none" stroke="#999" xmlns="http://www.w3.org/2000/svg">
          <polyline points="15 18 9 12 15 6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <span class="breadcrumb-item">我的案件</span>
      <span class="breadcrumb-separator">›</span>
      <span class="breadcrumb-item active">抄送我的</span>
    </div>

    <h1 class="page-title">抄送我的</h1>

    <div class="search-form">
      <div class="form-row">
        <div class="form-item">
          <label>发起人</label>
          <input type="text" v-model="searchForm.initiator" placeholder="请输入" class="form-input">
        </div>
        <div class="form-item">
          <label>案件编号</label>
          <input type="text" v-model="searchForm.caseNo" placeholder="请输入" class="form-input">
        </div>
        <div class="form-item">
          <label>抄送时间</label>
          <div class="date-inputs">
            <input type="text" v-model="searchForm.startDate" placeholder="开始日期" class="form-input date-input">
            <span class="date-separator">至</span>
            <input type="text" v-model="searchForm.endDate" placeholder="结束日期" class="form-input date-input">
          </div>
        </div>
        <div class="form-actions">
          <button class="btn btn-primary" @click="handleSearch">
            <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
              <circle cx="11" cy="11" r="8" stroke-width="2"/>
              <path d="M21 21L16.65 16.65" stroke-width="2"/>
            </svg>
            查询
          </button>
          <button class="btn btn-warning" @click="handleReset">
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
        <div class="table-col" style="width: 60px;">序号</div>
        <div class="table-col" style="width: 160px;">抄送时间</div>
        <div class="table-col" style="width: 100px;">发起人</div>
        <div class="table-col" style="width: 180px;">案件编号</div>
        <div class="table-col" style="width: 140px;">转办类型</div>
        <div class="table-col" style="flex: 1;">转办说明</div>
        <div class="table-col" style="width: 120px;">操作</div>
      </div>
      <div class="table-body">
        <div class="table-row" v-for="(item, index) in pagedData" :key="index">
          <div class="table-col" style="width: 60px;">{{ (currentPage - 1) * pageSize + index + 1 }}</div>
          <div class="table-col" style="width: 160px;">{{ item.copyTime }}</div>
          <div class="table-col" style="width: 100px;">{{ item.initiator }}</div>
          <div class="table-col" style="width: 180px;">
            <span class="case-no" :class="{ 'highlight': item.isHighlight }">{{ item.caseNo }}</span>
          </div>
          <div class="table-col" style="width: 140px;">
            <span class="transfer-type" :class="item.typeClass">{{ item.transferType }}</span>
          </div>
          <div class="table-col" style="flex: 1; color: #666;">{{ item.description }}</div>
          <div class="table-col" style="width: 120px;">
            <a class="action-link" @click="viewDetail(item)">案件详情</a>
          </div>
        </div>
        <div class="table-empty" v-if="filteredData.length === 0">
          <span>暂无数据</span>
        </div>
      </div>
    </div>

    <div class="pagination">
      <div class="pagination-info">共 {{ filteredData.length }} 条</div>
      <div class="pagination-right">
        <select class="page-size-select" v-model.number="pageSize">
          <option value="10">10条/页</option>
          <option value="20">20条/页</option>
          <option value="50">50条/页</option>
        </select>
        <button class="page-btn" :disabled="currentPage === 1" @click="currentPage--">‹</button>
        <button class="page-btn active">{{ currentPage }}</button>
        <button class="page-btn" :disabled="currentPage >= totalPages" @click="currentPage++">›</button>
        <div class="page-jump">
          前往 <input type="number" class="page-input" v-model.number="jumpPage" @keyup.enter="jumpToPage"> 页
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const goBack = () => { window.history.back() }

const searchForm = reactive({
  initiator: '',
  caseNo: '',
  startDate: '',
  endDate: ''
})

const tableData = ref([
  {
    copyTime: '2026-08-07 11:31',
    initiator: '付世平',
    caseNo: '0001582220260807001',
    transferType: '案件转办请求',
    typeClass: 'type-transfer',
    description: '测一下一下转办，抄送人人',
    isHighlight: false
  },
  {
    copyTime: '2026-08-06 10:24',
    initiator: '付世平',
    caseNo: '0001586220260805001',
    transferType: '转办知悉请求',
    typeClass: 'type-notice',
    description: '测试一哈转办知悉的抄送',
    isHighlight: false
  },
  {
    copyTime: '2026-08-06 10:22',
    initiator: '付世平',
    caseNo: '0001586420260805002',
    transferType: '案件转办请求',
    typeClass: 'type-transfer',
    description: '测试一下案件转力抄送',
    isHighlight: false
  }
])

const currentPage = ref(1)
const pageSize = ref(10)
const jumpPage = ref(1)

const filteredData = computed(() => {
  return tableData.value.filter(item => {
    if (searchForm.initiator && !item.initiator.includes(searchForm.initiator)) return false
    if (searchForm.caseNo && !item.caseNo.includes(searchForm.caseNo)) return false
    if (searchForm.startDate && item.copyTime < searchForm.startDate) return false
    if (searchForm.endDate && item.copyTime > searchForm.endDate + ' 23:59:59') return false
    return true
  })
})

const totalPages = computed(() => Math.ceil(filteredData.value.length / pageSize.value) || 1)

const pagedData = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  return filteredData.value.slice(start, start + pageSize.value)
})

const handleSearch = () => {
  currentPage.value = 1
}

const handleReset = () => {
  searchForm.initiator = ''
  searchForm.caseNo = ''
  searchForm.startDate = ''
  searchForm.endDate = ''
  currentPage.value = 1
}

const jumpToPage = () => {
  if (jumpPage.value >= 1 && jumpPage.value <= totalPages.value) {
    currentPage.value = jumpPage.value
  }
}

const viewDetail = (item) => {
  router.push({ path: '/process-cases/detail/' + item.caseNo })
}
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

.breadcrumb-arrow svg { width: 16px; height: 16px; }
.breadcrumb-item { color: #333; font-size: 14px; }
.breadcrumb-item.active { color: #666; }
.breadcrumb-separator { margin: 0 8px; color: #999; }

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

.table-col {
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

.table-row .table-col {
  font-weight: 400;
  color: #666;
  display: flex;
  align-items: center;
  font-size: 14px;
}

.case-no {
  color: #666;
}

.case-no.highlight {
  color: #1890ff;
}

.transfer-type {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
}

.transfer-type.type-transfer {
  background-color: #e6f7ff;
  color: #1890ff;
  border: 1px solid #91d5ff;
}

.transfer-type.type-notice {
  background-color: #f6ffed;
  color: #52c41a;
  border: 1px solid #b7eb8f;
}

.action-link {
  color: #1890ff;
  cursor: pointer;
  text-decoration: none;
  font-size: 14px;
}

.action-link:hover {
  text-decoration: underline;
}

.table-empty {
  padding: 60px 0;
  text-align: center;
  color: #999;
  font-size: 14px;
}

.pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background-color: #fff;
  margin-top: 16px;
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
