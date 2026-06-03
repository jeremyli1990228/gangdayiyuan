<template>
  <div class="h5-page">
    <!-- 顶部导航 -->
    <div class="h5-header">
      <button class="back-btn" @click="goBack">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M15 18L9 12L15 6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
      <h1 class="h5-title">满意度调查</h1>
    </div>

    <!-- 患者信息确认 -->
    <div class="info-card" v-if="patientInfo.name">
      <div class="info-title">患者信息确认</div>
      <div class="info-row">
        <span class="info-label">患者姓名</span>
        <input type="text" class="info-input" v-model="patientInfo.name">
      </div>
      <div class="info-row">
        <span class="info-label">病人号</span>
        <input type="text" class="info-input" v-model="patientInfo.patientNo">
      </div>
      <div class="auto-save-tip" v-if="lastSaveTime">
        <span class="save-icon">💾</span>
        已自动保存于 {{ lastSaveTime }}
      </div>
    </div>

    <!-- 问卷内容 -->
    <div class="h5-content">
      <div class="survey-form">
        <div class="survey-title">感谢您对香港大学深圳医院的信任，为了提升服务质量，请您花费几分钟时间填写此问卷。</div>
        
        <div class="question-item" v-for="(question, qIndex) in questions" :key="qIndex">
          <div class="question-title">
            <span class="question-number">{{ qIndex + 1 }}.</span>
            <span>{{ question.title }}</span>
            <span class="required-mark" v-if="question.required">*</span>
          </div>
          
          <!-- 单选题 -->
          <div class="question-options" v-if="question.type === 'radio'">
            <label class="option-item" v-for="(option, oIndex) in question.options" :key="oIndex">
              <input type="radio" :name="'q' + qIndex" :value="option.value" v-model="question.answer">
              <span class="option-text">{{ option.label }}</span>
            </label>
          </div>
          
          <!-- 多选题 -->
          <div class="question-options" v-if="question.type === 'checkbox'">
            <label class="option-item" v-for="(option, oIndex) in question.options" :key="oIndex">
              <input type="checkbox" :value="option.value" v-model="question.answers">
              <span class="option-text">{{ option.label }}</span>
            </label>
          </div>
          
          <!-- 评分题 -->
          <div class="question-rating" v-if="question.type === 'rating'">
            <span v-for="i in 5" :key="i" :class="['rating-star', i <= question.answer ? 'active' : '']" @click="question.answer = i">★</span>
            <span class="rating-text">{{ getRatingText(question.answer) }}</span>
          </div>
          
          <!-- 开放性问题 -->
          <textarea class="question-textarea" v-if="question.type === 'text'" v-model="question.answer" :placeholder="question.placeholder"></textarea>
        </div>
      </div>
    </div>

    <!-- 提交按钮 -->
    <div class="h5-footer">
      <button class="submit-btn" @click="submitSurvey">提交问卷</button>
    </div>

    <!-- 提交成功弹窗 -->
    <div class="success-modal" v-if="showSuccess">
      <div class="success-content">
        <div class="success-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="#52c41a">
            <circle cx="12" cy="12" r="10" stroke-width="2"/>
            <path d="M9 12L11 14L15 10" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <div class="success-title">感谢您的参与</div>
        <div class="success-text">您的意见对我们非常重要</div>
        <button class="success-btn" @click="goBack">返回</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const showSuccess = ref(false)
const autoSaveTimer = ref(null)
const lastSaveTime = ref('')

// 从URL参数获取患者信息
const patientInfo = ref({
  name: route.query.patientName || '',
  patientNo: route.query.patientNo || '',
  phone: route.query.phone || '',
  visitDate: route.query.visitDate || ''
})

// 监听患者信息变化，自动保存
watch(patientInfo, (newVal) => {
  saveToLocalStorage()
}, { deep: true })

// 保存到本地存储
const saveToLocalStorage = () => {
  const data = {
    patientInfo: patientInfo.value,
    answers: answers.value,
    lastSaveTime: new Date().toLocaleString('zh-CN')
  }
  localStorage.setItem('h5_satisfaction_draft', JSON.stringify(data))
  lastSaveTime.value = data.lastSaveTime
}

// 从本地存储恢复数据
const loadFromLocalStorage = () => {
  const saved = localStorage.getItem('h5_satisfaction_draft')
  if (saved) {
    try {
      const data = JSON.parse(saved)
      if (data.patientInfo) {
        patientInfo.value = { ...patientInfo.value, ...data.patientInfo }
      }
      if (data.answers) {
        answers.value = data.answers
      }
      if (data.lastSaveTime) {
        lastSaveTime.value = data.lastSaveTime
      }
      return true
    } catch (e) {
      console.error('加载保存数据失败:', e)
    }
  }
  return false
}

// 清除本地存储
const clearLocalStorage = () => {
  localStorage.removeItem('h5_satisfaction_draft')
}

// 自动保存定时器
const startAutoSave = () => {
  autoSaveTimer.value = setInterval(() => {
    saveToLocalStorage()
  }, 120000) // 2分钟自动保存一次
}

onMounted(() => {
  // 尝试从本地存储恢复数据
  loadFromLocalStorage()
  // 启动自动保存
  startAutoSave()
})

onUnmounted(() => {
  // 清除定时器
  if (autoSaveTimer.value) {
    clearInterval(autoSaveTimer.value)
  }
})

const questions = ref([
  {
    title: '您对本次就医的整体满意度如何？',
    type: 'rating',
    required: true,
    answer: 0
  },
  {
    title: '您对医生诊疗服务的满意度？',
    type: 'rating',
    required: true,
    answer: 0
  },
  {
    title: '您对护士护理服务的满意度？',
    type: 'rating',
    required: true,
    answer: 0
  },
  {
    title: '您对医院环境的满意度？',
    type: 'rating',
    required: true,
    answer: 0
  },
  {
    title: '您是通过什么渠道了解我院的？',
    type: 'radio',
    required: true,
    answer: '',
    options: [
      { label: '亲友推荐', value: 'recommend' },
      { label: '网络搜索', value: 'search' },
      { label: '微信公众号', value: 'wechat' },
      { label: '医院官网', value: 'website' },
      { label: '其他', value: 'other' }
    ]
  },
  {
    title: '您认为我院哪些方面需要改进？（可多选）',
    type: 'checkbox',
    required: false,
    answers: [],
    options: [
      { label: '就医流程', value: 'process' },
      { label: '服务态度', value: 'attitude' },
      { label: '医疗技术', value: 'technology' },
      { label: '就诊环境', value: 'environment' },
      { label: '收费标准', value: 'price' },
      { label: '候诊时间', value: 'waiting' }
    ]
  },
  {
    title: '您对我院有什么建议或意见？',
    type: 'text',
    required: false,
    answer: '',
    placeholder: '请输入您的建议或意见（选填）'
  }
])

const getRatingText = (rating) => {
  const texts = ['', '非常不满意', '不满意', '一般', '满意', '非常满意']
  return texts[rating] || ''
}

const submitSurvey = () => {
  // 验证必填项
  for (const question of questions.value) {
    if (question.required) {
      if (question.type === 'rating' && question.answer === 0) {
        alert('请完成所有必填项')
        return
      }
      if ((question.type === 'radio' || question.type === 'text') && !question.answer) {
        alert('请完成所有必填项')
        return
      }
    }
  }
  
  // 构建完整的提交数据，包含患者信息关联
  const submitData = {
    patientInfo: patientInfo.value,
    surveyAnswers: questions.value.map(q => ({
      question: q.title,
      answer: q.answer,
      answers: q.answers || []
    })),
    submitTime: new Date().toISOString(),
    source: 'mobile_h5'
  }
  
  console.log('提交数据:', submitData)
  
  // 清除本地存储的草稿
  clearLocalStorage()
  
  showSuccess.value = true
}

const goBack = () => {
  router.back()
}
</script>

<style scoped>
.h5-page {
  min-height: 100vh;
  background: #f5f5f5;
  display: flex;
  flex-direction: column;
}

.h5-header {
  height: 44px;
  background: #1890ff;
  display: flex;
  align-items: center;
  padding: 0 16px;
  position: sticky;
  top: 0;
  z-index: 100;
}

.back-btn {
  width: 32px;
  height: 32px;
  background: none;
  border: none;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.back-btn svg {
  width: 20px;
  height: 20px;
  color: #fff;
}

.h5-title {
  flex: 1;
  text-align: center;
  font-size: 17px;
  font-weight: 500;
  color: #fff;
  margin: 0;
  margin-right: 32px;
}

.info-card {
  background: #fff;
  margin: 12px;
  border-radius: 8px;
  padding: 16px;
}

.info-title {
  font-size: 14px;
  font-weight: 500;
  color: #333;
  margin-bottom: 12px;
}

.info-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
}

.info-label {
  font-size: 14px;
  color: #666;
}

.info-input {
  flex: 1;
  height: 32px;
  padding: 0 12px;
  background: #f5f5f5;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  text-align: right;
  outline: none;
}

.auto-save-tip {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: #52c41a;
  margin-top: 8px;
  padding-top: 8px;
  border-top: 1px solid #f0f0f0;
}

.save-icon {
  font-size: 14px;
}

.h5-content {
  flex: 1;
  padding: 12px;
  overflow-y: auto;
}

.survey-form {
  background: #fff;
  border-radius: 8px;
  padding: 16px;
}

.survey-title {
  font-size: 14px;
  color: #666;
  line-height: 1.6;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid #f0f0f0;
}

.question-item {
  margin-bottom: 24px;
}

.question-title {
  font-size: 14px;
  color: #333;
  line-height: 1.6;
  margin-bottom: 12px;
}

.question-number {
  color: #1890ff;
  font-weight: 500;
}

.required-mark {
  color: #ff4d4f;
  margin-left: 4px;
}

.question-options {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.option-item {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.option-item input {
  width: 18px;
  height: 18px;
}

.option-text {
  font-size: 14px;
  color: #333;
}

.question-rating {
  display: flex;
  align-items: center;
  gap: 8px;
}

.rating-star {
  font-size: 28px;
  color: #d9d9d9;
  cursor: pointer;
}

.rating-star.active {
  color: #faad14;
}

.rating-text {
  font-size: 13px;
  color: #1890ff;
  margin-left: 8px;
}

.question-textarea {
  width: 100%;
  min-height: 80px;
  padding: 12px;
  background: #f5f5f5;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  resize: vertical;
  outline: none;
}

.h5-footer {
  padding: 12px 16px;
  background: #fff;
}

.submit-btn {
  width: 100%;
  height: 44px;
  background: #1890ff;
  border: none;
  border-radius: 22px;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
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
  z-index: 1000;
}

.success-content {
  width: 280px;
  background: #fff;
  border-radius: 12px;
  padding: 32px 24px;
  text-align: center;
}

.success-icon svg {
  width: 48px;
  height: 48px;
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
  height: 40px;
  background: #1890ff;
  border: none;
  border-radius: 20px;
  color: #fff;
  font-size: 14px;
  margin-top: 24px;
  cursor: pointer;
}
</style>
