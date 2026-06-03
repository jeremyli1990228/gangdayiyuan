<template>
  <div class="h5-page">
    <!-- 顶部导航 -->
    <div class="h5-header">
      <button class="back-btn" @click="goBack">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M15 18L9 12L15 6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
      <h1 class="h5-title">投诉建议</h1>
    </div>

    <!-- 表单内容 -->
    <div class="h5-content">
      <!-- 患者信息（自动带入） -->
      <div class="info-card" v-if="patientInfo.name">
        <div class="info-row">
          <span class="info-label">患者姓名</span>
          <span class="info-value">{{ patientInfo.name }}</span>
        </div>
        <div class="info-row">
          <span class="info-label">病人号</span>
          <span class="info-value">{{ patientInfo.patientNo }}</span>
        </div>
        <div class="auto-save-tip" v-if="lastSaveTime">
          <span class="save-icon">💾</span>
          已自动保存于 {{ lastSaveTime }}
        </div>
      </div>

      <!-- 表单 -->
      <div class="form-section">
        <div class="form-item required">
          <label class="form-label">问题种类</label>
          <div class="radio-group">
            <label class="radio-item" v-for="item in categories" :key="item.value">
              <input type="radio" v-model="formData.category" :value="item.value">
              <span class="radio-text">{{ item.label }}</span>
            </label>
          </div>
        </div>

        <div class="form-item required">
          <label class="form-label">问题类型</label>
          <div class="cascade-select" @click="showTypePicker = true">
            <span :class="['select-text', formData.type ? '' : 'placeholder']">
              {{ formData.type || '请选择问题类型' }}
            </span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M9 18L15 12L9 6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
        </div>

        <div class="form-item required">
          <label class="form-label">问题描述</label>
          <textarea class="form-textarea" v-model="formData.description" placeholder="请详细描述您的问题..." maxlength="500"></textarea>
          <div class="textarea-count">{{ formData.description.length }}/500</div>
        </div>

        <div class="form-item">
          <label class="form-label">上传图片</label>
          <div class="upload-grid">
            <div class="upload-item" v-for="(img, index) in formData.images" :key="index">
              <img :src="img" alt="上传图片">
              <button class="remove-btn" @click="removeImage(index)">×</button>
            </div>
            <div class="upload-add" v-if="formData.images.length < 9" @click="addImage">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M12 5v14M5 12h14" stroke-width="2" stroke-linecap="round"/>
              </svg>
              <span>添加图片</span>
            </div>
          </div>
          <div class="upload-tip">最多上传9张图片</div>
        </div>

        <div class="form-item">
          <label class="form-label">联系方式</label>
          <input type="tel" class="form-input" v-model="formData.phone" placeholder="请输入手机号码">
        </div>
      </div>
    </div>

    <!-- 提交按钮 -->
    <div class="h5-footer">
      <button class="submit-btn" @click="submitForm">提交</button>
    </div>

    <!-- 类型选择器 -->
    <div class="picker-overlay" v-if="showTypePicker" @click="showTypePicker = false">
      <div class="picker-container" @click.stop>
        <div class="picker-header">
          <button class="picker-cancel" @click="showTypePicker = false">取消</button>
          <span class="picker-title">选择问题类型</span>
          <button class="picker-confirm" @click="confirmType">确定</button>
        </div>
        <div class="picker-body">
          <div class="picker-column">
            <div :class="['picker-item', tempType.level1 === item.value ? 'active' : '']" 
                 v-for="item in typeOptions" 
                 :key="item.value"
                 @click="selectLevel1(item.value)">
              {{ item.label }}
            </div>
          </div>
          <div class="picker-column" v-if="level2Options.length">
            <div :class="['picker-item', tempType.level2 === item.value ? 'active' : '']" 
                 v-for="item in level2Options" 
                 :key="item.value"
                 @click="selectLevel2(item.value)">
              {{ item.label }}
            </div>
          </div>
        </div>
      </div>
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
        <div class="success-title">提交成功</div>
        <div class="success-text">您的投诉建议已提交，我们会尽快处理</div>
        <div class="success-case">案件编号：{{ caseNo }}</div>
        <button class="success-btn" @click="goBack">返回</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const showTypePicker = ref(false)
const showSuccess = ref(false)
const caseNo = ref('')
const autoSaveTimer = ref(null)
const lastSaveTime = ref('')

// 从URL参数获取患者信息
const patientInfo = ref({
  name: route.query.patientName || '',
  patientNo: route.query.patientNo || '',
  phone: route.query.phone || '',
  visitDate: route.query.visitDate || ''
})

const formData = ref({
  category: 'complaint',
  type: '',
  description: '',
  images: [],
  phone: ''
})

const tempType = ref({
  level1: '',
  level2: ''
})

// 监听表单数据变化，自动保存
watch(formData, (newVal) => {
  saveToLocalStorage()
}, { deep: true })

// 保存到本地存储
const saveToLocalStorage = () => {
  const data = {
    patientInfo: patientInfo.value,
    formData: formData.value,
    lastSaveTime: new Date().toLocaleString('zh-CN')
  }
  localStorage.setItem('h5_complaint_draft', JSON.stringify(data))
  lastSaveTime.value = data.lastSaveTime
}

// 从本地存储恢复数据
const loadFromLocalStorage = () => {
  const saved = localStorage.getItem('h5_complaint_draft')
  if (saved) {
    try {
      const data = JSON.parse(saved)
      if (data.patientInfo) {
        patientInfo.value = { ...patientInfo.value, ...data.patientInfo }
      }
      if (data.formData) {
        formData.value = { ...formData.value, ...data.formData }
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
  localStorage.removeItem('h5_complaint_draft')
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

const categories = ref([
  { label: '投诉', value: 'complaint' },
  { label: '建议', value: 'suggestion' },
  { label: '咨询', value: 'consult' }
])

const typeOptions = ref([
  { label: '服务态度', value: 'service', children: [
    { label: '医护态度', value: 'medical' },
    { label: '护士态度', value: 'nurse' },
    { label: '行政人员态度', value: 'admin' }
  ]},
  { label: '医疗质量', value: 'quality', children: [
    { label: '诊断问题', value: 'diagnosis' },
    { label: '治疗效果', value: 'treatment' },
    { label: '用药问题', value: 'medicine' }
  ]},
  { label: '就医流程', value: 'process', children: [
    { label: '挂号困难', value: 'register' },
    { label: '候诊时间长', value: 'waiting' },
    { label: '缴费不便', value: 'payment' }
  ]},
  { label: '环境卫生', value: 'environment', children: [
    { label: '病房卫生', value: 'ward' },
    { label: '公共区域', value: 'public' },
    { label: '设施设备', value: 'facility' }
  ]},
  { label: '其他', value: 'other', children: [] }
])

const level2Options = computed(() => {
  const selected = typeOptions.value.find(t => t.value === tempType.value.level1)
  return selected?.children || []
})

const selectLevel1 = (value) => {
  tempType.value.level1 = value
  tempType.value.level2 = ''
}

const selectLevel2 = (value) => {
  tempType.value.level2 = value
}

const confirmType = () => {
  const level1 = typeOptions.value.find(t => t.value === tempType.value.level1)
  const level2 = level1?.children?.find(c => c.value === tempType.value.level2)
  if (level1) {
    formData.value.type = level2 ? `${level1.label} - ${level2.label}` : level1.label
  }
  showTypePicker.value = false
}

const addImage = () => {
  // 模拟添加图片
  if (formData.value.images.length < 9) {
    formData.value.images.push('https://via.placeholder.com/100')
  }
}

const removeImage = (index) => {
  formData.value.images.splice(index, 1)
}

const submitForm = () => {
  if (!formData.value.type || !formData.value.description) {
    alert('请填写完整信息')
    return
  }
  
  // 构建完整的提交数据，包含患者信息关联
  const submitData = {
    patientInfo: patientInfo.value,
    complaintInfo: formData.value,
    submitTime: new Date().toISOString(),
    source: 'mobile_h5'
  }
  
  console.log('提交数据:', submitData)
  
  // 清除本地存储的草稿
  clearLocalStorage()
  
  caseNo.value = 'TS' + Date.now()
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

.h5-content {
  flex: 1;
  padding: 12px;
  overflow-y: auto;
}

.info-card {
  background: #fff;
  border-radius: 8px;
  padding: 12px 16px;
  margin-bottom: 12px;
}

.info-row {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  font-size: 14px;
}

.info-label {
  color: #999;
}

.info-value {
  color: #333;
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

.form-section {
  background: #fff;
  border-radius: 8px;
  padding: 16px;
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
  margin-bottom: 12px;
}

.radio-group {
  display: flex;
  gap: 16px;
}

.radio-item {
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
}

.radio-item input {
  width: 18px;
  height: 18px;
}

.radio-text {
  font-size: 14px;
  color: #333;
}

.cascade-select {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  padding: 0 12px;
  background: #f5f5f5;
  border-radius: 4px;
}

.select-text {
  font-size: 14px;
  color: #333;
}

.select-text.placeholder {
  color: #999;
}

.cascade-select svg {
  width: 16px;
  height: 16px;
  color: #999;
}

.form-textarea {
  width: 100%;
  min-height: 120px;
  padding: 12px;
  background: #f5f5f5;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  resize: vertical;
  outline: none;
}

.textarea-count {
  text-align: right;
  font-size: 12px;
  color: #999;
  margin-top: 4px;
}

.upload-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
}

.upload-item {
  position: relative;
  aspect-ratio: 1;
  border-radius: 4px;
  overflow: hidden;
}

.upload-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.remove-btn {
  position: absolute;
  top: 4px;
  right: 4px;
  width: 20px;
  height: 20px;
  background: rgba(0, 0, 0, 0.5);
  border: none;
  border-radius: 50%;
  color: #fff;
  font-size: 14px;
  cursor: pointer;
}

.upload-add {
  aspect-ratio: 1;
  background: #f5f5f5;
  border: 1px dashed #d9d9d9;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  cursor: pointer;
}

.upload-add svg {
  width: 24px;
  height: 24px;
  color: #999;
}

.upload-add span {
  font-size: 12px;
  color: #999;
}

.upload-tip {
  font-size: 12px;
  color: #999;
  margin-top: 8px;
}

.form-input {
  width: 100%;
  height: 40px;
  padding: 0 12px;
  background: #f5f5f5;
  border: none;
  border-radius: 4px;
  font-size: 14px;
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
  background: #fff;
  border-radius: 12px 12px 0 0;
}

.picker-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid #f0f0f0;
}

.picker-cancel,
.picker-confirm {
  background: none;
  border: none;
  font-size: 14px;
  color: #999;
  cursor: pointer;
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
  display: flex;
  height: 240px;
}

.picker-column {
  flex: 1;
  overflow-y: auto;
}

.picker-item {
  padding: 12px 16px;
  font-size: 14px;
  color: #333;
  cursor: pointer;
}

.picker-item.active {
  background: #e6f7ff;
  color: #1890ff;
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

.success-case {
  font-size: 13px;
  color: #999;
  margin-top: 12px;
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
