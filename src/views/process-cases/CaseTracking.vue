<template>
  <div class="case-tracking-container">
    <div class="breadcrumb">
      <router-link to="/" class="breadcrumb-item">首页</router-link>
      <span class="breadcrumb-separator">›</span>
      <span class="breadcrumb-item">处理案件</span>
      <span class="breadcrumb-separator">›</span>
      <span class="breadcrumb-item active">案件闭环管理</span>
    </div>
    
    <!-- 案件详情卡片 -->
    <div class="detail-card">
      <div class="detail-header">
        <div class="case-id">
          <span class="case-label">案件编号</span>
          <span class="case-value">{{ currentCase.caseNo }}</span>
        </div>
        <div class="case-status-badge" :class="currentCase.status">
          {{ getStatusText(currentCase.status) }}
        </div>
      </div>
      
      <div class="detail-body">
        <div class="detail-section">
          <h3 class="section-title">基本信息</h3>
          <div class="info-grid">
            <div class="info-item">
              <span class="info-label">案件类型</span>
              <span class="info-value">{{ currentCase.type }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">投诉人</span>
              <span class="info-value">{{ currentCase.complainant }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">联系电话</span>
              <span class="info-value">{{ currentCase.phone }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">涉及科室</span>
              <span class="info-value">{{ currentCase.department }}</span>
            </div>
            <div class="info-item full-width">
              <span class="info-label">案件描述</span>
              <span class="info-value">{{ currentCase.description }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 处理流程时间线 -->
    <div class="timeline-card">
      <div class="timeline-header">
        <h3 class="timeline-title">处理流程</h3>
        <div class="timeline-progress">
          <div class="progress-bar">
            <div class="progress-fill" :style="{width: progressPercent + '%'}"></div>
          </div>
          <span class="progress-text">{{ currentStep }}/{{ totalSteps }} 已完成</span>
        </div>
      </div>
      
      <div class="timeline">
        <div v-for="(step, index) in timelineSteps" 
             :key="index"
             :class="['timeline-item', step.status]">
          <div class="timeline-node">
            <div class="node-icon">
              <svg v-if="step.status === 'completed'" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M20 6L9 17L4 12" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <svg v-else-if="step.status === 'current'" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="12" cy="12" r="8" stroke-width="2"/>
              </svg>
              <div v-else class="pending-dot"></div>
            </div>
            <div v-if="index < timelineSteps.length - 1" class="timeline-line"></div>
          </div>
          
          <div class="timeline-content">
            <div class="timeline-step-header">
              <h4 class="step-name">{{ step.name }}</h4>
              <span class="step-time" v-if="step.time">{{ step.time }}</span>
            </div>
            <div class="step-details" v-if="step.operator || step.content">
              <div class="step-operator" v-if="step.operator">
                <span class="operator-label">处理人：</span>
                <span class="operator-name">{{ step.operator }}</span>
              </div>
              <div class="step-content" v-if="step.content">
                {{ step.content }}
              </div>
            </div>
            <div class="step-actions" v-if="step.status === 'current' && canOperate">
              <button class="btn-action" @click="handleCurrentStep">
                {{ getStepActionText(step.key) }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 当前操作区 -->
    <div class="operation-card" v-if="showOperationPanel">
      <div class="operation-header">
        <h3 class="operation-title">{{ currentOperationTitle }}</h3>
      </div>
      <div class="operation-body">
        <div class="form-item">
          <label class="form-label">处理意见</label>
          <textarea class="form-textarea" v-model="operationForm.remark" placeholder="请输入处理意见..."></textarea>
        </div>
        
        <div class="form-item" v-if="currentStepKey === 'transfer'">
          <label class="form-label">转办科室</label>
          <select class="form-select" v-model="operationForm.transferDept">
            <option value="">请选择</option>
            <option value="门诊部">门诊部</option>
            <option value="急诊部">急诊部</option>
            <option value="内科">内科</option>
            <option value="外科">外科</option>
            <option value="医务科">医务科</option>
          </select>
        </div>
        
        <div class="form-item" v-if="currentStepKey === 'verify'">
          <label class="form-label">验收评价</label>
          <div class="rating-buttons">
            <button v-for="rating in [1,2,3,4,5]" 
                    :key="rating"
                    :class="['rating-btn', {active: operationForm.rating === rating}]"
                    @click="operationForm.rating = rating">
              {{ rating }}星
            </button>
          </div>
        </div>
        
        <div class="form-item" v-if="currentStepKey === 'reply'">
          <label class="form-label">回复内容</label>
          <textarea class="form-textarea" v-model="operationForm.reply" placeholder="请输入回复内容..."></textarea>
        </div>
        
        <div class="operation-actions">
          <button class="btn btn-secondary" @click="cancelOperation">取消</button>
          <button class="btn btn-primary" @click="submitOperation">提交</button>
        </div>
      </div>
    </div>
    
    <!-- 相关案件 -->
    <div class="related-card">
      <div class="related-header">
        <h3 class="related-title">相关案件</h3>
        <button class="btn-link">查看更多</button>
      </div>
      <div class="related-list">
        <div v-for="item in relatedCases" 
             :key="item.id"
             class="related-item">
          <div class="related-info">
            <span class="related-no">{{ item.caseNo }}</span>
            <span class="related-title">{{ item.title }}</span>
          </div>
          <span class="related-status" :class="item.status">
            {{ getStatusText(item.status) }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const currentCase = ref({
  caseNo: 'TS2024010089',
  status: 'processing',
  type: '投诉',
  complainant: '王先生',
  phone: '138****5678',
  department: '门诊部',
  description: '关于门诊医生服务态度问题，患者在2024年1月15日就诊时，认为医生问诊时间过短，没有充分了解病情就开具处方，希望医院能够改进。'
})

const timelineSteps = ref([
  {
    key: 'register',
    name: '案件登记',
    status: 'completed',
    time: '2024-01-15 09:32',
    operator: '张小明',
    content: '案件已登记，等待分配处理人'
  },
  {
    key: 'assign',
    name: '任务分配',
    status: 'completed',
    time: '2024-01-15 10:15',
    operator: '李主管',
    content: '已分配给门诊部主任处理'
  },
  {
    key: 'handle',
    name: '科室处理',
    status: 'current',
    time: null,
    operator: null,
    content: null
  },
  {
    key: 'reply',
    name: '回复投诉人',
    status: 'pending',
    time: null,
    operator: null,
    content: null
  },
  {
    key: 'verify',
    name: '验收评价',
    status: 'pending',
    time: null,
    operator: null,
    content: null
  },
  {
    key: 'close',
    name: '案件结案',
    status: 'pending',
    time: null,
    operator: null,
    content: null
  }
])

const relatedCases = ref([
  { id: 1, caseNo: 'TS2024010065', title: '类似服务态度问题', status: 'completed' },
  { id: 2, caseNo: 'TS2024010072', title: '门诊流程优化建议', status: 'processing' }
])

const operationForm = ref({
  remark: '',
  transferDept: '',
  rating: 0,
  reply: ''
})

const showOperationPanel = ref(false)
const currentStepKey = ref('')

const currentStep = computed(() => {
  return timelineSteps.value.filter(s => s.status !== 'pending').length
})

const totalSteps = computed(() => timelineSteps.value.length)

const progressPercent = computed(() => {
  return ((currentStep.value - 1) / totalSteps.value) * 100
})

const canOperate = computed(() => {
  return true
})

const currentOperationTitle = computed(() => {
  const map = {
    'register': '登记案件',
    'assign': '分配任务',
    'handle': '处理案件',
    'reply': '回复投诉人',
    'verify': '验收评价',
    'close': '结案'
  }
  return map[currentStepKey.value] || '处理'
})

const getStatusText = (status) => {
  const map = {
    'pending': '待处理',
    'processing': '处理中',
    'completed': '已完成',
    'closed': '已结案'
  }
  return map[status] || status
}

const getStepActionText = (key) => {
  const map = {
    'register': '登记',
    'assign': '分配',
    'handle': '处理',
    'reply': '回复',
    'verify': '验收',
    'close': '结案'
  }
  return map[key] || '操作'
}

const handleCurrentStep = () => {
  const currentStepObj = timelineSteps.value.find(s => s.status === 'current')
  if (currentStepObj) {
    currentStepKey.value = currentStepObj.key
    showOperationPanel.value = true
  }
}

const cancelOperation = () => {
  showOperationPanel.value = false
  operationForm.value = {
    remark: '',
    transferDept: '',
    rating: 0,
    reply: ''
  }
}

const submitOperation = () => {
  const currentIndex = timelineSteps.value.findIndex(s => s.status === 'current')
  if (currentIndex !== -1) {
    const step = timelineSteps.value[currentIndex]
    step.status = 'completed'
    step.operator = '当前用户'
    step.time = new Date().toLocaleString('zh-CN')
    step.content = operationForm.value.remark || '已处理'
    
    if (currentIndex + 1 < timelineSteps.value.length) {
      timelineSteps.value[currentIndex + 1].status = 'current'
    } else {
      currentCase.value.status = 'closed'
    }
  }
  
  cancelOperation()
  alert('操作成功！')
}
</script>

<style scoped>
.case-tracking-container {
  padding: 20px;
  background-color: #f0f2f5;
  min-height: 100vh;
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

/* 卡片样式 */
.detail-card, .timeline-card, .operation-card, .related-card {
  background: #fff;
  border-radius: 12px;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}

.detail-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #f0f0f0;
}

.case-id {
  display: flex;
  align-items: center;
  gap: 12px;
}

.case-label {
  font-size: 14px;
  color: #666;
}

.case-value {
  font-size: 18px;
  font-weight: 600;
  color: #333;
}

.case-status-badge {
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
}

.case-status-badge.pending {
  background: #fff7e6;
  color: #fa8c16;
}

.case-status-badge.processing {
  background: #e6f7ff;
  color: #1890ff;
}

.case-status-badge.completed {
  background: #f6ffed;
  color: #52c41a;
}

.case-status-badge.closed {
  background: #f0f0f0;
  color: #666;
}

.detail-body {
  padding: 20px;
}

.detail-section {
  margin-bottom: 24px;
}

.detail-section:last-child {
  margin-bottom: 0;
}

.section-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin: 0 0 16px 0;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.info-item.full-width {
  grid-column: span 3;
}

.info-label {
  font-size: 13px;
  color: #999;
}

.info-value {
  font-size: 14px;
  color: #333;
  line-height: 1.6;
}

/* 时间线样式 */
.timeline-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #f0f0f0;
}

.timeline-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.timeline-progress {
  display: flex;
  align-items: center;
  gap: 12px;
}

.progress-bar {
  width: 200px;
  height: 6px;
  background: #f0f0f0;
  border-radius: 3px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #1890ff, #52c41a);
  border-radius: 3px;
  transition: width 0.6s ease;
}

.progress-text {
  font-size: 13px;
  color: #666;
}

.timeline {
  padding: 20px 30px;
}

.timeline-item {
  display: flex;
  gap: 20px;
  margin-bottom: 32px;
  position: relative;
}

.timeline-item:last-child {
  margin-bottom: 0;
}

.timeline-node {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.node-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f0f0f0;
  color: #999;
  z-index: 1;
  flex-shrink: 0;
}

.timeline-item.completed .node-icon {
  background: #f6ffed;
  color: #52c41a;
}

.timeline-item.current .node-icon {
  background: #e6f7ff;
  color: #1890ff;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(24, 144, 255, 0.4); }
  50% { box-shadow: 0 0 0 10px rgba(24, 144, 255, 0); }
}

.pending-dot {
  width: 16px;
  height: 16px;
  background: #d9d9d9;
  border-radius: 50%;
}

.timeline-line {
  width: 2px;
  flex: 1;
  margin-top: 12px;
  background: #f0f0f0;
}

.timeline-item.completed .timeline-line {
  background: #52c41a;
}

.timeline-content {
  flex: 1;
  padding-top: 8px;
}

.timeline-step-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.step-name {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.timeline-item.pending .step-name {
  color: #999;
}

.step-time {
  font-size: 13px;
  color: #999;
}

.step-details {
  margin-bottom: 12px;
}

.step-operator {
  font-size: 14px;
  color: #666;
  margin-bottom: 6px;
}

.step-content {
  font-size: 14px;
  color: #333;
  line-height: 1.6;
}

.step-actions {
  margin-top: 12px;
}

.btn-action {
  padding: 8px 20px;
  background: #1890ff;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-action:hover {
  background: #40a9ff;
}

/* 操作面板 */
.operation-header {
  padding: 20px;
  border-bottom: 1px solid #f0f0f0;
}

.operation-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.operation-body {
  padding: 20px;
}

.form-item {
  margin-bottom: 20px;
}

.form-item:last-child {
  margin-bottom: 0;
}

.form-label {
  display: block;
  font-size: 14px;
  color: #333;
  margin-bottom: 8px;
}

.form-textarea {
  width: 100%;
  min-height: 100px;
  padding: 12px;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  font-size: 14px;
  resize: vertical;
  outline: none;
  box-sizing: border-box;
}

.form-textarea:focus {
  border-color: #1890ff;
}

.form-select {
  width: 100%;
  height: 40px;
  padding: 0 12px;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  font-size: 14px;
  outline: none;
}

.form-select:focus {
  border-color: #1890ff;
}

.rating-buttons {
  display: flex;
  gap: 12px;
}

.rating-btn {
  flex: 1;
  height: 44px;
  border: 2px solid #d9d9d9;
  background: #fff;
  border-radius: 8px;
  font-size: 15px;
  color: #666;
  cursor: pointer;
  transition: all 0.2s;
}

.rating-btn:hover {
  border-color: #faad14;
  color: #faad14;
}

.rating-btn.active {
  border-color: #faad14;
  background: #fff7e6;
  color: #faad14;
}

.operation-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 24px;
  padding-top: 20px;
  border-top: 1px solid #f0f0f0;
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

/* 相关案件 */
.related-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #f0f0f0;
}

.related-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.btn-link {
  background: none;
  border: none;
  color: #1890ff;
  font-size: 14px;
  cursor: pointer;
}

.btn-link:hover {
  text-decoration: underline;
}

.related-list {
  padding: 0 20px;
}

.related-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid #f0f0f0;
}

.related-item:last-child {
  border-bottom: none;
}

.related-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.related-no {
  font-size: 14px;
  color: #1890ff;
  font-weight: 500;
}

.related-title {
  font-size: 14px;
  color: #333;
}

.related-status {
  padding: 4px 12px;
  border-radius: 4px;
  font-size: 12px;
}

.related-status.completed {
  background: #f6ffed;
  color: #52c41a;
}

.related-status.processing {
  background: #e6f7ff;
  color: #1890ff;
}

/* 响应式 */
@media (max-width: 768px) {
  .info-grid {
    grid-template-columns: 1fr;
  }
  
  .info-item.full-width {
    grid-column: span 1;
  }
  
  .timeline-progress {
    flex-direction: column;
    gap: 8px;
  }
  
  .progress-bar {
    width: 150px;
  }
}
</style>
