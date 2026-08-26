<template>
  <div class="page-container">
    <div class="breadcrumb">
      <div class="breadcrumb-arrow">
        <svg viewBox="0 0 24 24" fill="none" stroke="#999" xmlns="http://www.w3.org/2000/svg">
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
          <label>涉及科室</label>
          <input type="text" placeholder="请输入" class="form-input">
        </div>
        <div class="form-item">
          <label>工单状态</label>
          <select class="form-select">
            <option value="">请选择</option>
            <option value="pending">待处理</option>
            <option value="processing">处理中</option>
            <option value="resolved">已解决</option>
            <option value="closed">已归档</option>
          </select>
        </div>
      </div>
      <div class="search-form-row">
        <div class="form-item">
          <label>签收日期</label>
          <div class="date-inputs">
            <div class="date-input-wrapper">
              <svg class="date-icon" viewBox="0 0 24 24" fill="none" stroke="#999">
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
          <label>工单分类</label>
          <select class="form-select">
            <option value="">请选择</option>
            <option value="first">首件</option>
            <option value="repeat">重复件</option>
          </select>
        </div>
        <div class="form-item">
          <label>紧急程度</label>
          <select class="form-select">
            <option value="">请选择</option>
            <option value="normal">常态</option>
            <option value="attention">关注</option>
            <option value="urgent">加急</option>
            <option value="public_opinion">舆情提醒</option>
          </select>
        </div>
        <div class="form-item expand-btn">
          <button class="btn btn-link">
            展开查询条件
            <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="#1890ff">
              <polyline points="6 9 12 15 18 9" stroke-width="2"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
    
    <div class="table-container">
      <div class="table-header">
        <div class="table-cell checkbox-cell" style="width: 50px;">
          <input type="checkbox" class="checkbox" @change="toggleSelectAll">
        </div>
        <div class="table-cell" style="width: 60px;">序号</div>
        <div class="table-cell" style="width: 160px;">工单编号</div>
        <div class="table-cell" style="width: 120px;">反馈人</div>
        <div class="table-cell" style="width: 130px;">反馈人手机号</div>
        <div class="table-cell" style="width: 120px;">工单来源</div>
        <div class="table-cell" style="width: 120px;">工单分类</div>
        <div class="table-cell" style="width: 100px;">紧急程度</div>
        <div class="table-cell" style="width: 150px;">涉及科室</div>
        <div class="table-cell" style="width: 100px;">工单状态</div>
        <div class="table-cell" style="width: 120px;">签收日期</div>
        <div class="table-cell" style="width: 140px;">最后更新时间</div>
      </div>
      <div class="table-body">
        <div class="table-row" v-for="(item, index) in tableData" :key="index">
          <div class="table-cell checkbox-cell" style="width: 50px;">
            <input type="checkbox" class="checkbox" v-model="selectedIds" :value="item.id">
          </div>
          <div class="table-cell" style="width: 60px;">{{ index + 1 }}</div>
          <div class="table-cell" style="width: 160px;">
            <router-link :to="`/petition/detail/${item.id}`" class="case-no-link" :class="item.caseNoClass">{{ item.caseNo }}</router-link>
          </div>
          <div class="table-cell" style="width: 120px;">{{ item.feedbackName }}</div>
          <div class="table-cell" style="width: 130px;">{{ item.feedbackPhone }}</div>
          <div class="table-cell" style="width: 120px;">{{ item.source }}</div>
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
      <div class="pagination-info">共 {{ total }} 条</div>
      <div class="pagination-right">
        <select class="page-size-select">
          <option value="10">10条/页</option>
          <option value="20">20条/页</option>
          <option value="50">50条/页</option>
        </select>
        <button class="page-btn" :disabled="currentPage === 1" @click="currentPage--">
          <svg viewBox="0 0 24 24" fill="none" stroke="#999">
            <polyline points="15 18 9 12 15 6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <button v-for="page in totalPages" :key="page" class="page-btn" :class="{ active: page === currentPage }" @click="currentPage = page">{{ page }}</button>
        <button class="page-btn" :disabled="currentPage === totalPages" @click="currentPage++">
          <svg viewBox="0 0 24 24" fill="none" stroke="#999">
            <polyline points="9 18 15 12 9 6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <div class="page-jump">
          前往 <input type="number" class="page-input" v-model.number="currentPage" min="1" :max="totalPages"> 页
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const pageTitle = '有效性判定'
const selectedIds = ref([])
const currentPage = ref(1)
const pageSize = ref(10)

const tableData = ref([
  {
    id: '001',
    caseNo: 'MZSS20260801001',
    feedbackName: '张三',
    feedbackPhone: '138****1234',
    source: '政府平台',
    category: '首件',
    urgency: '关注',
    urgencyClass: 'attention',
    department: '门诊部',
    status: '处理中',
    statusClass: 'processing',
    signDate: '2026-08-01',
    lastUpdateTime: '2026-08-15 10:30:00',
    caseNoClass: 'blue'
  },
  {
    id: '002',
    caseNo: 'MZSS20260802002',
    feedbackName: '李四',
    feedbackPhone: '139****5678',
    source: '热线电话',
    category: '重复件',
    urgency: '加急',
    urgencyClass: 'urgent',
    department: '财务科',
    status: '待处理',
    statusClass: 'pending',
    signDate: '2026-08-02',
    lastUpdateTime: '2026-08-10 14:20:00',
    caseNoClass: 'red'
  },
  {
    id: '003',
    caseNo: 'MZSS20260803003',
    feedbackName: '王五',
    feedbackPhone: '137****9012',
    source: '来访',
    category: '首件',
    urgency: '常态',
    urgencyClass: 'normal',
    department: '内科',
    status: '已解决',
    statusClass: 'success',
    signDate: '2026-08-03',
    lastUpdateTime: '2026-08-12 09:15:00',
    caseNoClass: ''
  }
])

const total = ref(tableData.value.length)
const totalPages = computed(() => Math.ceil(total.value / pageSize.value))

const toggleSelectAll = (e) => {
  if (e.target.checked) {
    selectedIds.value = tableData.value.map(item => item.id)
  } else {
    selectedIds.value = []
  }
}
</script>

<style scoped>
.page-container { padding: 24px; background-color: #f0f2f5; min-height: 100%; }
.breadcrumb { display: flex; align-items: center; margin-bottom: 16px; font-size: 14px; padding-bottom: 12px; border-bottom: 1px solid #f0f0f0; }
.breadcrumb-arrow { width: 32px; height: 32px; background-color: #e6f7ff; border-radius: 4px; display: flex; align-items: center; justify-content: center; margin-right: 12px; cursor: pointer; }
.breadcrumb-arrow svg { width: 16px; height: 16px; }
.breadcrumb-item { color: #333; text-decoration: none; font-size: 14px; }
.breadcrumb-item:hover { color: #1890ff; }
.breadcrumb-item.active { color: #666; }
.breadcrumb-separator { margin: 0 8px; color: #999; }
.page-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; }
.page-title { font-size: 18px; font-weight: 600; color: #333; margin: 0; }
.page-header-actions { display: flex; align-items: center; gap: 12px; }
.search-form { background-color: #fff; padding: 20px 24px; border-radius: 4px; margin-bottom: 16px; }
.search-form-row { display: flex; align-items: center; gap: 20px; margin-bottom: 16px; }
.search-form-row:last-child { margin-bottom: 0; }
.form-item { display: flex; align-items: center; gap: 8px; }
.form-item label { font-size: 14px; color: #333; white-space: nowrap; font-weight: 500; line-height: 32px; }
.form-input { width: 200px; height: 32px; padding: 0 12px; border: 1px solid #d9d9d9; border-radius: 4px; font-size: 14px; outline: none; transition: border-color 0.2s; box-sizing: border-box; }
.form-input:focus { border-color: #1890ff; }
.date-input-wrapper { position: relative; }
.date-icon { position: absolute; left: 8px; top: 50%; transform: translateY(-50%); width: 14px; height: 14px; }
.form-input.date-input { width: 140px; padding-left: 28px; }
.form-select { width: 200px; height: 32px; padding: 0 12px; border: 1px solid #d9d9d9; border-radius: 4px; font-size: 14px; outline: none; background-color: #fff; cursor: pointer; appearance: none; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 8px center; padding-right: 28px; box-sizing: border-box; }
.form-select:focus { border-color: #1890ff; }
.date-inputs { display: flex; align-items: center; gap: 8px; }
.date-separator { color: #666; font-size: 14px; line-height: 32px; }
.expand-btn { margin-left: auto; }
.btn { display: inline-flex; align-items: center; justify-content: center; gap: 6px; height: 32px; padding: 0 16px; border: none; border-radius: 4px; font-size: 14px; cursor: pointer; transition: all 0.2s; }
.btn-icon { width: 14px; height: 14px; }
.btn-primary { background-color: #1890ff; color: #fff; }
.btn-primary:hover { background-color: #40a9ff; }
.btn-warning { background-color: #faad14; color: #fff; }
.btn-warning:hover { background-color: #ffc53d; }
.btn-link { background: none; border: none; color: #1890ff; padding: 0; font-size: 14px; }
.btn-link:hover { text-decoration: underline; }
.table-container { background-color: #fff; border-radius: 4px; overflow: hidden; }
.table-header { display: flex; background-color: #fafafa; border-bottom: 1px solid #f0f0f0; padding: 12px 16px; }
.table-cell { font-size: 14px; font-weight: 600; color: #333; text-align: left; flex-shrink: 0; }
.checkbox-cell { display: flex; align-items: center; justify-content: flex-start; }
.checkbox { width: 16px; height: 16px; cursor: pointer; }
.table-body { background-color: #fff; }
.table-row { display: flex; border-bottom: 1px solid #f0f0f0; padding: 12px 16px; transition: background-color 0.2s; }
.table-row:hover { background-color: #fafafa; }
.table-row:last-child { border-bottom: none; }
.table-row .table-cell { font-weight: 400; color: #666; display: flex; align-items: center; font-size: 14px; }
.case-no-link { color: #666; text-decoration: none; cursor: pointer; }
.case-no-link:hover { text-decoration: underline; color: #1890ff; }
.case-no-link.blue { color: #1890ff; }
.case-no-link.red { color: #f5222d; }
.status-tag { display: inline-block; padding: 2px 8px; border-radius: 4px; font-size: 12px; }
.status-tag.pending { background-color: #fff7e6; color: #fa8c16; border: 1px solid #ffd591; }
.status-tag.processing { background-color: #e6f7ff; color: #1890ff; border: 1px solid #91d5ff; }
.status-tag.success { background-color: #f6ffed; color: #52c41a; border: 1px solid #b7eb8f; }
.status-tag.archived { background-color: #f5f5f5; color: #8c8c8c; border: 1px solid #d9d9d9; }
.urgency-tag { display: inline-block; padding: 2px 8px; border-radius: 4px; font-size: 12px; }
.urgency-tag.normal { background-color: #f0f0f0; color: #666; border: 1px solid #d9d9d9; }
.urgency-tag.attention { background-color: #e6f7ff; color: #1890ff; border: 1px solid #91d5ff; }
.urgency-tag.urgent { background-color: #fff7e6; color: #fa8c16; border: 1px solid #ffd591; }
.urgency-tag.critical { background-color: #fff1f0; color: #ff4d4f; border: 1px solid #ffa39e; }
.pagination { display: flex; justify-content: flex-end; align-items: center; padding: 20px 0; gap: 12px; }
.pagination-info { font-size: 14px; color: #666; margin-right: auto; }
.pagination-right { display: flex; align-items: center; gap: 10px; }
.page-size-select { height: 32px; padding: 0 10px; border: 1px solid #d9d9d9; border-radius: 4px; font-size: 14px; outline: none; background-color: #fff; cursor: pointer; }
.page-btn { min-width: 32px; height: 32px; padding: 0 8px; border: 1px solid #d9d9d9; border-radius: 4px; background-color: #fff; font-size: 14px; cursor: pointer; transition: all 0.2s; display: flex; align-items: center; justify-content: center; }
.page-btn svg { width: 14px; height: 14px; }
.page-btn:hover:not(:disabled) { color: #1890ff; border-color: #1890ff; }
.page-btn.active { background-color: #1890ff; color: #fff; border-color: #1890ff; }
.page-btn:disabled { cursor: not-allowed; color: #d9d9d9; }
.page-jump { display: flex; align-items: center; gap: 8px; font-size: 14px; color: #666; }
.page-input { width: 60px; height: 32px; padding: 0 8px; border: 1px solid #d9d9d9; border-radius: 4px; font-size: 14px; text-align: center; outline: none; }
.page-input:focus { border-color: #1890ff; }
</style>
