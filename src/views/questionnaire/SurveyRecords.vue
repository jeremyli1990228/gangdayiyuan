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
      <span class="breadcrumb-item active">答卷记录</span>
    </div>

    <div class="page-header">
      <h1 class="page-title">答卷记录</h1>
    </div>

    <div class="search-form">
      <div class="form-item">
        <label>患者姓名</label>
        <input type="text" placeholder="请输入姓名" class="form-input" v-model="searchForm.name">
      </div>
      <div class="form-item">
        <label>来源渠道</label>
        <select class="form-select" v-model="searchForm.source">
          <option value="">全部</option>
          <option value="link">链接</option>
          <option value="qrcode">二维码</option>
        </select>
      </div>
      <div class="form-item">
        <label>提交时间</label>
        <input type="date" class="form-input" style="width: 140px;" v-model="searchForm.startDate">
        <span style="margin: 0 8px; color: #999;">至</span>
        <input type="date" class="form-input" style="width: 140px;" v-model="searchForm.endDate">
      </div>
      <div class="form-item">
        <button class="btn btn-primary" @click="handleSearch">
          <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
            <circle cx="11" cy="11" r="8" stroke-width="2"/>
            <path d="M21 21L16.65 16.65" stroke-width="2" stroke-linecap="round"/>
          </svg>
          搜索
        </button>
        <button class="btn btn-secondary" @click="handleReset">重置</button>
      </div>
    </div>

    <div class="table-container">
      <div class="table-header">
        <div class="table-cell" style="width: 60px;">序号</div>
        <div class="table-cell" style="width: 100px;">患者姓名</div>
        <div class="table-cell" style="width: 120px;">病人号</div>
        <div class="table-cell" style="width: 100px;">来源渠道</div>
        <div class="table-cell" style="width: 120px;">整体满意度</div>
        <div class="table-cell" style="width: 150px;">提交时间</div>
        <div class="table-cell" style="flex: 1;">答卷内容</div>
        <div class="table-cell" style="width: 100px;">操作</div>
      </div>
      <div class="table-body">
        <div class="table-row" v-for="(item, index) in filteredRecords" :key="item.id">
          <div class="table-cell" style="width: 60px;">{{ index + 1 }}</div>
          <div class="table-cell" style="width: 100px;">{{ item.patientName }}</div>
          <div class="table-cell" style="width: 120px;">{{ item.patientNo }}</div>
          <div class="table-cell" style="width: 100px;">
            <span :class="['source-tag', item.source === 'qrcode' ? 'qrcode' : 'link']">
              {{ getSourceText(item.source) }}
            </span>
          </div>
          <div class="table-cell" style="width: 120px;">
            <div class="rating">
              <span class="rating-stars">{{ '★'.repeat(item.overallSatisfaction) }}{{ '☆'.repeat(5 - item.overallSatisfaction) }}</span>
            </div>
          </div>
          <div class="table-cell" style="width: 150px;">{{ item.submitTime }}</div>
          <div class="table-cell" style="flex: 1;">
            <span class="content-preview" @click="showDetail(item)">{{ getAnswerPreview(item.answers) }}</span>
          </div>
          <div class="table-cell" style="width: 100px;">
            <button class="action-link" @click="showDetail(item)">详情</button>
          </div>
        </div>
      </div>
    </div>

    <div class="pagination">
      <div class="pagination-info">共 {{ total }} 条记录</div>
      <div class="pagination-right">
        <select class="page-size-select" v-model="pageSize">
          <option value="10">10条/页</option>
          <option value="20">20条/页</option>
          <option value="50">50条/页</option>
        </select>
        <button class="page-btn" :disabled="currentPage === 1" @click="currentPage--">
          <svg viewBox="0 0 24 24" fill="none" stroke="#999" xmlns="http://www.w3.org/2000/svg">
            <polyline points="15 18 9 12 15 6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <button class="page-btn active">{{ currentPage }}</button>
        <button class="page-btn" :disabled="currentPage === totalPages" @click="currentPage++">
          <svg viewBox="0 0 24 24" fill="none" stroke="#999" xmlns="http://www.w3.org/2000/svg">
            <polyline points="9 18 15 12 9 6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
    </div>

    <div class="drawer-overlay" v-if="showDetailDrawer" @click="showDetailDrawer = false">
      <div class="drawer" @click.stop>
        <div class="drawer-header">
          <h3 class="drawer-title">答卷详情</h3>
          <button class="drawer-close" @click="showDetailDrawer = false">×</button>
        </div>
        <div class="drawer-body">
          <div class="detail-section">
            <div class="detail-title">基本信息</div>
            <div class="detail-grid">
              <div class="detail-item">
                <span class="detail-label">患者姓名：</span>
                <span class="detail-value">{{ currentRecord.patientName }}</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">病人号：</span>
                <span class="detail-value">{{ currentRecord.patientNo }}</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">联系电话：</span>
                <span class="detail-value">{{ currentRecord.phone || '-' }}</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">来源渠道：</span>
                <span :class="['source-tag', currentRecord.source === 'qrcode' ? 'qrcode' : 'link']">
                  {{ getSourceText(currentRecord.source) }}
                </span>
              </div>
              <div class="detail-item">
                <span class="detail-label">提交时间：</span>
                <span class="detail-value">{{ currentRecord.submitTime }}</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">就诊日期：</span>
                <span class="detail-value">{{ currentRecord.visitDate || '-' }}</span>
              </div>
            </div>
          </div>

          <div class="detail-section">
            <div class="detail-title">答卷内容</div>
            <div class="answers-list">
              <div class="answer-item" v-for="(answer, idx) in currentRecord.answers" :key="idx">
                <div class="answer-question">{{ idx + 1 }}. {{ answer.question }}</div>
                <div class="answer-value" v-if="answer.type === 'rating'">
                  <div class="rating">
                    <span class="rating-stars">{{ '★'.repeat(answer.value) }}{{ '☆'.repeat(5 - answer.value) }}</span>
                    <span class="rating-text">{{ getRatingText(answer.value) }}</span>
                  </div>
                </div>
                <div class="answer-value" v-else-if="answer.type === 'radio'">
                  {{ answer.value }}
                </div>
                <div class="answer-value" v-else-if="answer.type === 'checkbox'">
                  {{ answer.value.join('、') }}
                </div>
                <div class="answer-value" v-else>
                  {{ answer.value || '-' }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const showDetailDrawer = ref(false)
const currentRecord = ref({})
const currentPage = ref(1)
const totalPages = ref(5)
const total = ref(25)
const pageSize = ref(10)

const searchForm = ref({
  name: '',
  source: '',
  startDate: '',
  endDate: ''
})

const surveyRecords = ref([
  {
    id: 1,
    patientName: '张三',
    patientNo: 'P20260601001',
    phone: '13800138001',
    source: 'link',
    overallSatisfaction: 5,
    submitTime: '2026-06-07 09:30:00',
    visitDate: '2026-06-06',
    answers: [
      { question: '您对本次就医的整体满意度如何？', type: 'rating', value: 5 },
      { question: '您对医生诊疗服务的满意度？', type: 'rating', value: 5 },
      { question: '您对护士护理服务的满意度？', type: 'rating', value: 4 },
      { question: '您对医院环境的满意度？', type: 'rating', value: 4 },
      { question: '您是通过什么渠道了解我院的？', type: 'radio', value: '亲友推荐' },
      { question: '您认为我院哪些方面需要改进？（可多选）', type: 'checkbox', value: ['就医流程', '候诊时间'] },
      { question: '您对我院有什么建议或意见？', type: 'text', value: '希望能增加更多的自助设备，减少排队时间。' }
    ]
  },
  {
    id: 2,
    patientName: '李四',
    patientNo: 'P20260601002',
    phone: '13800138002',
    source: 'qrcode',
    overallSatisfaction: 4,
    submitTime: '2026-06-06 14:20:00',
    visitDate: '2026-06-05',
    answers: [
      { question: '您对本次就医的整体满意度如何？', type: 'rating', value: 4 },
      { question: '您对医生诊疗服务的满意度？', type: 'rating', value: 4 },
      { question: '您对护士护理服务的满意度？', type: 'rating', value: 5 },
      { question: '您对医院环境的满意度？', type: 'rating', value: 4 },
      { question: '您是通过什么渠道了解我院的？', type: 'radio', value: '微信公众号' },
      { question: '您认为我院哪些方面需要改进？（可多选）', type: 'checkbox', value: ['服务态度'] },
      { question: '您对我院有什么建议或意见？', type: 'text', value: '总体服务很好，继续保持。' }
    ]
  },
  {
    id: 3,
    patientName: '王五',
    patientNo: 'P20260601003',
    phone: '13800138003',
    source: 'link',
    overallSatisfaction: 3,
    submitTime: '2026-06-05 10:15:00',
    visitDate: '2026-06-04',
    answers: [
      { question: '您对本次就医的整体满意度如何？', type: 'rating', value: 3 },
      { question: '您对医生诊疗服务的满意度？', type: 'rating', value: 3 },
      { question: '您对护士护理服务的满意度？', type: 'rating', value: 4 },
      { question: '您对医院环境的满意度？', type: 'rating', value: 3 },
      { question: '您是通过什么渠道了解我院的？', type: 'radio', value: '网络搜索' },
      { question: '您认为我院哪些方面需要改进？（可多选）', type: 'checkbox', value: ['医疗质量', '就医流程', '收费标准'] },
      { question: '您对我院有什么建议或意见？', type: 'text', value: '希望能提高医疗质量，优化就医流程。' }
    ]
  },
  {
    id: 4,
    patientName: '赵六',
    patientNo: 'P20260601004',
    phone: '13800138004',
    source: 'qrcode',
    overallSatisfaction: 5,
    submitTime: '2026-06-04 16:45:00',
    visitDate: '2026-06-03',
    answers: [
      { question: '您对本次就医的整体满意度如何？', type: 'rating', value: 5 },
      { question: '您对医生诊疗服务的满意度？', type: 'rating', value: 5 },
      { question: '您对护士护理服务的满意度？', type: 'rating', value: 5 },
      { question: '您对医院环境的满意度？', type: 'rating', value: 5 },
      { question: '您是通过什么渠道了解我院的？', type: 'radio', value: '医院官网' },
      { question: '您认为我院哪些方面需要改进？（可多选）', type: 'checkbox', value: [] },
      { question: '您对我院有什么建议或意见？', type: 'text', value: '' }
    ]
  },
  {
    id: 5,
    patientName: '钱七',
    patientNo: 'P20260601005',
    phone: '13800138005',
    source: 'link',
    overallSatisfaction: 4,
    submitTime: '2026-06-03 11:30:00',
    visitDate: '2026-06-02',
    answers: [
      { question: '您对本次就医的整体满意度如何？', type: 'rating', value: 4 },
      { question: '您对医生诊疗服务的满意度？', type: 'rating', value: 4 },
      { question: '您对护士护理服务的满意度？', type: 'rating', value: 3 },
      { question: '您对医院环境的满意度？', type: 'rating', value: 4 },
      { question: '您是通过什么渠道了解我院的？', type: 'radio', value: '其他' },
      { question: '您认为我院哪些方面需要改进？（可多选）', type: 'checkbox', value: ['就医流程', '候诊时间'] },
      { question: '您对我院有什么建议或意见？', type: 'text', value: '希望能增加自助设备的数量，减少排队时间。' }
    ]
  }
])

const filteredRecords = computed(() => {
  let result = surveyRecords.value
  
  if (searchForm.value.name) {
    result = result.filter(item => 
      item.patientName.includes(searchForm.value.name)
    )
  }
  
  if (searchForm.value.source) {
    result = result.filter(item => 
      item.source === searchForm.value.source
    )
  }
  
  return result
})

const goBack = () => {
  router.push('/questionnaire/satisfaction')
}

const getSourceText = (source) => {
  return source === 'qrcode' ? '二维码' : '链接'
}

const getAnswerPreview = (answers) => {
  if (!answers || answers.length === 0) return '-'
  const firstAnswer = answers[0]
  if (firstAnswer.type === 'rating') {
    return `整体满意度: ${'★'.repeat(firstAnswer.value)}`
  }
  return String(firstAnswer.value)
}

const getRatingText = (rating) => {
  const texts = ['', '非常不满意', '不满意', '一般', '满意', '非常满意']
  return texts[rating] || ''
}

const showDetail = (item) => {
  currentRecord.value = { ...item }
  showDetailDrawer.value = true
}

const handleSearch = () => {
  console.log('搜索:', searchForm.value)
}

const handleReset = () => {
  searchForm.value = {
    name: '',
    source: '',
    startDate: '',
    endDate: ''
  }
}
</script>

<style scoped>
.page-container {
  padding: 20px;
  background-color: #f5f7fa;
  min-height: 100vh;
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
  color: #666;
  text-decoration: none;
  font-size: 14px;
}

.breadcrumb-item:hover {
  color: #1890ff;
}

.breadcrumb-item.active {
  color: #1890ff;
}

.breadcrumb-separator {
  margin: 0 8px;
  color: #999;
}

.page-header {
  margin-bottom: 20px;
}

.page-title {
  font-size: 20px;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.search-form {
  background: #fff;
  padding: 16px 20px;
  border-radius: 4px;
  margin-bottom: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}

.form-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.form-item label {
  font-size: 14px;
  color: #666;
  white-space: nowrap;
}

.form-input,
.form-select {
  height: 32px;
  padding: 0 12px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.3s;
}

.form-input:focus,
.form-select:focus {
  border-color: #1890ff;
}

.form-input {
  width: 150px;
}

.form-select {
  width: 120px;
  background: #fff;
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
  transition: all 0.3s;
}

.btn-primary {
  background: #1890ff;
  color: #fff;
}

.btn-primary:hover {
  background: #40a9ff;
}

.btn-secondary {
  background: #fff;
  color: #666;
  border: 1px solid #d9d9d9;
}

.btn-secondary:hover {
  color: #1890ff;
  border-color: #1890ff;
}

.btn-icon {
  width: 14px;
  height: 14px;
}

.table-container {
  background: #fff;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.table-header {
  display: flex;
  background: #fafafa;
  border-bottom: 1px solid #e8e8e8;
}

.table-body {
  max-height: 500px;
  overflow-y: auto;
}

.table-row {
  display: flex;
  border-bottom: 1px solid #f0f0f0;
  transition: background 0.3s;
}

.table-row:hover {
  background: #f5f7fa;
}

.table-cell {
  padding: 12px 16px;
  font-size: 14px;
  color: #333;
  display: flex;
  align-items: center;
}

.table-header .table-cell {
  font-weight: 600;
  color: #666;
}

.source-tag {
  padding: 4px 12px;
  border-radius: 2px;
  font-size: 12px;
  font-weight: 500;
}

.source-tag.link {
  background: #e6f7ff;
  color: #1890ff;
}

.source-tag.qrcode {
  background: #f6ffed;
  color: #52c41a;
}

.rating {
  display: flex;
  align-items: center;
  gap: 8px;
}

.rating-stars {
  color: #faad14;
  font-size: 14px;
}

.rating-text {
  font-size: 12px;
  color: #666;
}

.content-preview {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
  color: #1890ff;
}

.action-link {
  color: #1890ff;
  text-decoration: none;
  cursor: pointer;
  font-size: 14px;
  background: none;
  border: none;
  padding: 0;
}

.action-link:hover {
  color: #40a9ff;
}

.pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  background: #fff;
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
  gap: 12px;
}

.page-size-select {
  height: 32px;
  padding: 0 10px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-size: 14px;
  outline: none;
  background: #fff;
  cursor: pointer;
}

.page-btn {
  min-width: 32px;
  height: 32px;
  padding: 0 8px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  background: #fff;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s;
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
  background: #1890ff;
  color: #fff;
  border-color: #1890ff;
}

.page-btn:disabled {
  cursor: not-allowed;
  color: #d9d9d9;
}

.drawer-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: flex-end;
  z-index: 1000;
}

.drawer {
  width: 600px;
  height: 100vh;
  background: #fff;
  display: flex;
  flex-direction: column;
  box-shadow: -2px 0 8px rgba(0, 0, 0, 0.15);
}

.drawer-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  border-bottom: 1px solid #f0f0f0;
}

.drawer-title {
  font-size: 16px;
  font-weight: 600;
  margin: 0;
}

.drawer-close {
  width: 32px;
  height: 32px;
  border: none;
  background: none;
  font-size: 20px;
  color: #999;
  cursor: pointer;
}

.drawer-body {
  flex: 1;
  padding: 24px;
  overflow-y: auto;
}

.detail-section {
  margin-bottom: 24px;
}

.detail-title {
  font-size: 14px;
  font-weight: 600;
  color: #333;
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid #f0f0f0;
}

.detail-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.detail-item {
  display: flex;
  align-items: center;
}

.detail-label {
  color: #666;
  font-size: 14px;
}

.detail-value {
  color: #333;
  font-size: 14px;
}

.answers-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.answer-item {
  padding-bottom: 16px;
  border-bottom: 1px solid #f0f0f0;
}

.answer-item:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.answer-question {
  font-size: 14px;
  color: #333;
  font-weight: 500;
  margin-bottom: 8px;
}

.answer-value {
  font-size: 14px;
  color: #666;
  line-height: 1.6;
}
</style>
