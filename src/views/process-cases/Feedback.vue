<template>
  <div class="page-container">
    <div class="breadcrumb">
      <router-link to="/" class="breadcrumb-item">首页</router-link>
      <span class="breadcrumb-separator">›</span>
      <span class="breadcrumb-item">处理案件</span>
      <span class="breadcrumb-separator">›</span>
      <span class="breadcrumb-item active">结案反馈</span>
    </div>
    
    <div class="feedback-page">
      <!-- 案件信息 -->
      <div class="case-info-card">
        <div class="card-header">
          <h3 class="card-title">案件信息</h3>
          <span class="case-status" :class="caseData.status">{{ getStatusText(caseData.status) }}</span>
        </div>
        <div class="card-body">
          <div class="info-grid">
            <div class="info-item">
              <label class="info-label">案件编号</label>
              <div class="info-value">{{ caseData.caseNo }}</div>
            </div>
            <div class="info-item">
              <label class="info-label">案件类型</label>
              <div class="info-value">{{ caseData.caseType }}</div>
            </div>
            <div class="info-item">
              <label class="info-label">投诉人</label>
              <div class="info-value">{{ caseData.complainant }}</div>
            </div>
            <div class="info-item">
              <label class="info-label">被投诉科室</label>
              <div class="info-value">{{ caseData.department }}</div>
            </div>
            <div class="info-item full-width">
              <label class="info-label">案件标题</label>
              <div class="info-value">{{ caseData.title }}</div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 处理结果 -->
      <div class="result-card">
        <div class="card-header">
          <h3 class="card-title">处理结果</h3>
        </div>
        <div class="card-body">
          <div class="result-content">
            <div class="result-item">
              <label class="result-label">处理措施</label>
              <div class="result-value">{{ caseData.result || '暂无处理措施' }}</div>
            </div>
            <div class="result-item">
              <label class="result-label">处理时间</label>
              <div class="result-value">{{ caseData.handleTime || '待处理' }}</div>
            </div>
            <div class="result-item">
              <label class="result-label">处理人</label>
              <div class="result-value">{{ caseData.handler || '待分配' }}</div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 发送反馈 -->
      <div class="send-feedback-card">
        <div class="card-header">
          <h3 class="card-title">发送反馈</h3>
          <span class="required-tip">* 为必填项</span>
        </div>
        <div class="card-body">
          <!-- 主送人 -->
          <div class="form-item required">
            <label class="form-label">主送人</label>
            <div class="recipient-selector">
              <div class="recipient-list">
                <div 
                  v-for="(recipient, index) in mainRecipients" 
                  :key="index"
                  class="recipient-tag"
                >
                  <span>{{ recipient.name }}</span>
                  <button class="remove-btn" @click="removeMainRecipient(index)">×</button>
                </div>
              </div>
              <button class="add-recipient-btn" @click="showMainRecipientPicker = true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M12 5v14M5 12h14" stroke-width="2" stroke-linecap="round"/>
                </svg>
                添加主送人
              </button>
            </div>
          </div>
          
          <!-- 抄送人 -->
          <div class="form-item">
            <label class="form-label">抄送人</label>
            <div class="recipient-selector">
              <div class="recipient-list">
                <div 
                  v-for="(recipient, index) in ccRecipients" 
                  :key="index"
                  class="recipient-tag cc"
                >
                  <span>{{ recipient.name }}</span>
                  <button class="remove-btn" @click="removeCcRecipient(index)">×</button>
                </div>
              </div>
              <button class="add-recipient-btn" @click="showCcRecipientPicker = true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M12 5v14M5 12h14" stroke-width="2" stroke-linecap="round"/>
                </svg>
                添加抄送人
              </button>
            </div>
          </div>
          
          <!-- 反馈内容 -->
          <div class="form-item required">
            <label class="form-label">反馈内容</label>
            <textarea 
              class="feedback-textarea" 
              v-model="feedbackContent"
              placeholder="请输入反馈内容..."
              maxlength="2000"
            ></textarea>
            <div class="textarea-count">{{ feedbackContent.length }}/2000</div>
          </div>
          
          <!-- 发送选项 -->
          <div class="form-item">
            <label class="form-label">发送方式</label>
            <div class="send-options">
              <label class="send-option">
                <input type="checkbox" v-model="sendOptions.email" checked>
                <span>邮件</span>
              </label>
              <label class="send-option">
                <input type="checkbox" v-model="sendOptions.sms">
                <span>短信</span>
              </label>
              <label class="send-option">
                <input type="checkbox" v-model="sendOptions.wechat">
                <span>微信公众号</span>
              </label>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 操作按钮 -->
      <div class="action-buttons">
        <button class="btn btn-secondary" @click="saveDraft">保存草稿</button>
        <button class="btn btn-primary" @click="sendFeedback" :disabled="!canSend">发送反馈</button>
      </div>
    </div>
    
    <!-- 主送人选择器 -->
    <div class="picker-overlay" v-if="showMainRecipientPicker" @click="showMainRecipientPicker = false">
      <div class="picker-container" @click.stop>
        <div class="picker-header">
          <button class="picker-cancel" @click="showMainRecipientPicker = false">取消</button>
          <span class="picker-title">选择主送人</span>
          <button class="picker-confirm" @click="confirmMainRecipient">确定</button>
        </div>
        <div class="picker-body">
          <div class="search-box">
            <input type="text" v-model="recipientSearch" placeholder="搜索人员...">
          </div>
          <div class="recipient-list-picker">
            <div 
              v-for="person in filteredRecipients" 
              :key="person.id"
              :class="['recipient-option', { selected: selectedMainRecipients.includes(person.id) }]"
              @click="toggleMainRecipient(person)"
            >
              <div class="person-info">
                <div class="person-name">{{ person.name }}</div>
                <div class="person-dept">{{ person.department }}</div>
              </div>
              <div class="check-icon" v-if="selectedMainRecipients.includes(person.id)">✓</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 抄送人选择器 -->
    <div class="picker-overlay" v-if="showCcRecipientPicker" @click="showCcRecipientPicker = false">
      <div class="picker-container" @click.stop>
        <div class="picker-header">
          <button class="picker-cancel" @click="showCcRecipientPicker = false">取消</button>
          <span class="picker-title">选择抄送人</span>
          <button class="picker-confirm" @click="confirmCcRecipient">确定</button>
        </div>
        <div class="picker-body">
          <div class="search-box">
            <input type="text" v-model="recipientSearch" placeholder="搜索人员...">
          </div>
          <div class="recipient-list-picker">
            <div 
              v-for="person in filteredRecipients" 
              :key="person.id"
              :class="['recipient-option', { selected: selectedCcRecipients.includes(person.id) }]"
              @click="toggleCcRecipient(person)"
            >
              <div class="person-info">
                <div class="person-name">{{ person.name }}</div>
                <div class="person-dept">{{ person.department }}</div>
              </div>
              <div class="check-icon" v-if="selectedCcRecipients.includes(person.id)">✓</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 发送成功弹窗 -->
    <div class="success-modal" v-if="showSuccess">
      <div class="success-content">
        <div class="success-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="#52c41a">
            <circle cx="12" cy="12" r="10" stroke-width="2"/>
            <path d="M9 12L11 14L15 10" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <div class="success-title">发送成功</div>
        <div class="success-text">反馈已发送至主送人和抄送人</div>
        <button class="success-btn" @click="goBack">返回</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 案件数据
const caseData = ref({
  caseNo: 'TS202401001',
  caseType: '投诉',
  complainant: '李四',
  department: '门诊部',
  title: '关于门诊就诊等候时间过长的投诉',
  status: 'completed',
  result: '已对门诊就诊流程进行优化，增加了窗口数量',
  handleTime: '2024-01-18 15:30',
  handler: '张三'
})

// 主送人列表
const mainRecipients = ref([
  { id: 1, name: '王主任', department: '门诊部' },
  { id: 2, name: '李科长', department: '医务科' }
])

// 抄送人列表
const ccRecipients = ref([
  { id: 3, name: '张院长', department: '院办' }
])

// 反馈内容
const feedbackContent = ref('')

// 发送选项
const sendOptions = ref({
  email: true,
  sms: false,
  wechat: true
})

// 选择器状态
const showMainRecipientPicker = ref(false)
const showCcRecipientPicker = ref(false)
const recipientSearch = ref('')
const selectedMainRecipients = ref([])
const selectedCcRecipients = ref([])

// 所有可选人员
const allRecipients = ref([
  { id: 1, name: '王主任', department: '门诊部', email: 'wang@hku-sz.com', phone: '138****1234' },
  { id: 2, name: '李科长', department: '医务科', email: 'li@hku-sz.com', phone: '139****5678' },
  { id: 3, name: '张院长', department: '院办', email: 'zhang@hku-sz.com', phone: '137****9012' },
  { id: 4, name: '赵护士长', department: '护理部', email: 'zhao@hku-sz.com', phone: '136****3456' },
  { id: 5, name: '孙医生', department: '内科', email: 'sun@hku-sz.com', phone: '135****7890' },
  { id: 6, name: '周主管', department: '信息中心', email: 'zhou@hku-sz.com', phone: '134****2345' }
])

const filteredRecipients = computed(() => {
  if (!recipientSearch.value) return allRecipients.value
  const query = recipientSearch.value.toLowerCase()
  return allRecipients.value.filter(person => 
    person.name.toLowerCase().includes(query) ||
    person.department.toLowerCase().includes(query)
  )
})

const canSend = computed(() => {
  return mainRecipients.value.length > 0 && feedbackContent.value.trim().length > 0
})

const showSuccess = ref(false)

const getStatusText = (status) => {
  const statusMap = {
    pending: '待处理',
    processing: '处理中',
    completed: '已完成',
    closed: '已关闭'
  }
  return statusMap[status] || status
}

const removeMainRecipient = (index) => {
  mainRecipients.value.splice(index, 1)
}

const removeCcRecipient = (index) => {
  ccRecipients.value.splice(index, 1)
}

const toggleMainRecipient = (person) => {
  const index = selectedMainRecipients.value.indexOf(person.id)
  if (index > -1) {
    selectedMainRecipients.value.splice(index, 1)
  } else {
    selectedMainRecipients.value.push(person.id)
  }
}

const toggleCcRecipient = (person) => {
  const index = selectedCcRecipients.value.indexOf(person.id)
  if (index > -1) {
    selectedCcRecipients.value.splice(index, 1)
  } else {
    selectedCcRecipients.value.push(person.id)
  }
}

const confirmMainRecipient = () => {
  const selected = allRecipients.value.filter(p => selectedMainRecipients.value.includes(p.id))
  mainRecipients.value = selected
  showMainRecipientPicker.value = false
  selectedMainRecipients.value = []
  recipientSearch.value = ''
}

const confirmCcRecipient = () => {
  const selected = allRecipients.value.filter(p => selectedCcRecipients.value.includes(p.id))
  ccRecipients.value = selected
  showCcRecipientPicker.value = false
  selectedCcRecipients.value = []
  recipientSearch.value = ''
}

const saveDraft = () => {
  alert('草稿已保存')
}

const sendFeedback = () => {
  if (!canSend.value) return
  
  // 构建发送数据
  const sendData = {
    caseNo: caseData.value.caseNo,
    mainRecipients: mainRecipients.value,
    ccRecipients: ccRecipients.value,
    content: feedbackContent.value,
    sendOptions: sendOptions.value,
    sendTime: new Date().toISOString()
  }
  
  console.log('发送反馈:', sendData)
  showSuccess.value = true
}

const goBack = () => {
  router.back()
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
  margin-bottom: 20px;
  font-size: 14px;
}

.breadcrumb-item {
  color: #666;
  text-decoration: none;
}

.breadcrumb-item:hover {
  color: #1890ff;
}

.breadcrumb-separator {
  margin: 0 8px;
  color: #999;
}

.breadcrumb-item.active {
  color: #333;
}

.feedback-page {
  max-width: 900px;
}

.case-info-card,
.result-card,
.send-feedback-card {
  background: #fff;
  border-radius: 8px;
  margin-bottom: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid #f0f0f0;
}

.card-title {
  font-size: 16px;
  font-weight: 500;
  color: #333;
  margin: 0;
}

.case-status {
  padding: 4px 12px;
  border-radius: 4px;
  font-size: 13px;
}

.case-status.completed {
  background: #f6ffed;
  color: #52c41a;
}

.case-status.pending {
  background: #fff7e6;
  color: #fa8c16;
}

.case-status.processing {
  background: #e6f7ff;
  color: #1890ff;
}

.required-tip {
  font-size: 12px;
  color: #999;
}

.card-body {
  padding: 20px;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.info-item.full-width {
  grid-column: span 2;
}

.info-label {
  font-size: 13px;
  color: #999;
}

.info-value {
  font-size: 14px;
  color: #333;
}

.result-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.result-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.result-label {
  font-size: 13px;
  color: #999;
}

.result-value {
  font-size: 14px;
  color: #333;
}

.form-item {
  margin-bottom: 20px;
}

.form-item:last-child {
  margin-bottom: 0;
}

.form-item.required .form-label::before {
  content: '*';
  color: #ff4d4f;
  margin-right: 4px;
}

.form-label {
  display: block;
  font-size: 14px;
  color: #333;
  margin-bottom: 8px;
}

.recipient-selector {
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  padding: 12px;
  background: #fff;
}

.recipient-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 12px;
}

.recipient-tag {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background: #e6f7ff;
  border-radius: 4px;
  font-size: 13px;
  color: #1890ff;
}

.recipient-tag.cc {
  background: #f9f0ff;
  color: #722ed1;
}

.remove-btn {
  width: 16px;
  height: 16px;
  border: none;
  background: rgba(0, 0, 0, 0.1);
  color: inherit;
  border-radius: 50%;
  cursor: pointer;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.add-recipient-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 12px;
  border: 1px dashed #d9d9d9;
  background: none;
  border-radius: 4px;
  color: #1890ff;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s;
}

.add-recipient-btn:hover {
  border-color: #1890ff;
}

.add-recipient-btn svg {
  width: 14px;
  height: 14px;
}

.feedback-textarea {
  width: 100%;
  min-height: 120px;
  padding: 12px;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  font-size: 14px;
  resize: vertical;
  outline: none;
  transition: border-color 0.2s;
}

.feedback-textarea:focus {
  border-color: #1890ff;
}

.textarea-count {
  text-align: right;
  font-size: 12px;
  color: #999;
  margin-top: 4px;
}

.send-options {
  display: flex;
  gap: 20px;
}

.send-option {
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  font-size: 14px;
}

.send-option input {
  width: 16px;
  height: 16px;
}

.action-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 24px;
}

.btn {
  height: 40px;
  padding: 0 24px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-secondary {
  background: #f5f5f5;
  color: #666;
}

.btn-secondary:hover {
  background: #e5e5e5;
}

.btn-primary {
  background: #1890ff;
  color: #fff;
}

.btn-primary:hover {
  background: #40a9ff;
}

.btn-primary:disabled {
  background: #d9d9d9;
  cursor: not-allowed;
}

/* 选择器样式 */
.picker-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: flex-end;
  z-index: 1000;
}

.picker-container {
  width: 100%;
  max-height: 70vh;
  background: #fff;
  border-radius: 16px 16px 0 0;
  display: flex;
  flex-direction: column;
}

.picker-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid #f0f0f0;
}

.picker-cancel,
.picker-confirm {
  background: none;
  border: none;
  font-size: 15px;
  cursor: pointer;
}

.picker-cancel {
  color: #999;
}

.picker-confirm {
  color: #1890ff;
}

.picker-title {
  font-size: 16px;
  font-weight: 500;
  color: #333;
}

.picker-body {
  flex: 1;
  overflow-y: auto;
}

.search-box {
  padding: 12px 20px;
  border-bottom: 1px solid #f0f0f0;
}

.search-box input {
  width: 100%;
  height: 40px;
  padding: 0 16px;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  font-size: 14px;
  outline: none;
}

.recipient-list-picker {
  padding: 12px 20px;
}

.recipient-option {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s;
  margin-bottom: 8px;
}

.recipient-option:hover {
  background: #f5f5f5;
}

.recipient-option.selected {
  background: #e6f7ff;
}

.person-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.person-name {
  font-size: 15px;
  color: #333;
}

.person-dept {
  font-size: 13px;
  color: #999;
}

.check-icon {
  width: 24px;
  height: 24px;
  background: #1890ff;
  color: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
}

/* 成功弹窗 */
.success-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
}

.success-content {
  width: 320px;
  background: #fff;
  border-radius: 12px;
  padding: 32px 24px;
  text-align: center;
}

.success-icon svg {
  width: 64px;
  height: 64px;
}

.success-title {
  font-size: 18px;
  font-weight: 500;
  color: #333;
  margin-top: 16px;
}

.success-text {
  font-size: 14px;
  color: #666;
  margin-top: 8px;
}

.success-btn {
  width: 100%;
  height: 44px;
  background: #1890ff;
  border: none;
  border-radius: 22px;
  color: #fff;
  font-size: 15px;
  margin-top: 24px;
  cursor: pointer;
}
</style>
