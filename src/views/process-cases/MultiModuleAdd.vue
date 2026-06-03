<template>
  <div class="page-container">
    <div class="breadcrumb">
      <router-link to="/" class="breadcrumb-item">首页</router-link>
      <span class="breadcrumb-separator">›</span>
      <span class="breadcrumb-item">多模块录入</span>
      <span class="breadcrumb-separator">›</span>
      <span class="breadcrumb-item active">投诉案件</span>
    </div>
    
    <div class="case-form">
      <!-- 模块切换 -->
      <div class="module-tabs">
        <button 
          v-for="tab in moduleTabs" 
          :key="tab.key"
          :class="['module-tab', { active: activeModule === tab.key }]"
          @click="activeModule = tab.key"
        >
          <svg class="tab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path :d="tab.icon" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span>{{ tab.name }}</span>
        </button>
      </div>
      
      <!-- 案件信息 -->
      <div class="form-card">
        <div class="card-header">
          <h3 class="card-title">案件信息</h3>
          <span class="module-badge" :class="activeModule">{{ getModuleName(activeModule) }}</span>
        </div>
        <div class="card-body">
          <div class="form-grid">
            <div class="form-item required">
              <label>案件编号</label>
              <input type="text" class="form-input" v-model="caseData.caseNo" placeholder="系统自动生成" readonly>
            </div>
            <div class="form-item required">
              <label>案件类型</label>
              <select class="form-select" v-model="caseData.caseType">
                <option value="">请选择</option>
                <option v-for="type in caseTypes" :key="type.value" :value="type.value">{{ type.label }}</option>
              </select>
            </div>
            <div class="form-item required">
              <label>投诉人姓名</label>
              <input type="text" class="form-input" v-model="caseData.complainant" placeholder="请输入">
            </div>
            <div class="form-item">
              <label>联系电话</label>
              <input type="tel" class="form-input" v-model="caseData.phone" placeholder="请输入">
            </div>
            <div class="form-item required">
              <label>被投诉科室</label>
              <select class="form-select" v-model="caseData.department">
                <option value="">请选择</option>
                <option v-for="dept in departments" :key="dept.value" :value="dept.value">{{ dept.label }}</option>
              </select>
            </div>
            <div class="form-item">
              <label>涉及人员</label>
              <input type="text" class="form-input" v-model="caseData.involvedPerson" placeholder="请输入">
            </div>
            <div class="form-item full-width">
              <label class="form-label">问题描述</label>
              <textarea class="form-textarea" v-model="caseData.description" placeholder="请详细描述问题..." maxlength="2000"></textarea>
              <div class="textarea-count">{{ caseData.description.length }}/2000</div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 患者信息 -->
      <div class="form-card">
        <div class="card-header">
          <h3 class="card-title">患者信息</h3>
        </div>
        <div class="card-body">
          <div class="form-grid">
            <div class="form-item">
              <label>患者姓名</label>
              <input type="text" class="form-input" v-model="caseData.patientName" placeholder="请输入">
            </div>
            <div class="form-item">
              <label>病人号</label>
              <input type="text" class="form-input" v-model="caseData.patientNo" placeholder="请输入">
            </div>
            <div class="form-item">
              <label>年龄</label>
              <input type="text" class="form-input" v-model="caseData.age" placeholder="请输入">
            </div>
            <div class="form-item">
              <label>性别</label>
              <div class="radio-group">
                <label class="radio-item">
                  <input type="radio" v-model="caseData.gender" value="男">
                  <span>男</span>
                </label>
                <label class="radio-item">
                  <input type="radio" v-model="caseData.gender" value="女">
                  <span>女</span>
                </label>
              </div>
            </div>
            <div class="form-item full-width">
              <label>就诊科室</label>
              <select class="form-select" v-model="caseData.visitDepartment">
                <option value="">请选择</option>
                <option v-for="dept in departments" :key="dept.value" :value="dept.value">{{ dept.label }}</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 案件处理记录 -->
      <div class="form-card">
        <div class="card-header">
          <h3 class="card-title">案件处理记录</h3>
          <button class="btn-link" @click="addRecord">+ 添加记录</button>
        </div>
        <div class="card-body">
          <div class="record-list">
            <div v-for="(record, index) in caseData.records" :key="index" class="record-item">
              <div class="record-header">
                <span class="record-date">{{ record.date }}</span>
                <span class="record-module">{{ getModuleName(record.module) }}</span>
                <button class="btn-delete" @click="removeRecord(index)">删除</button>
              </div>
              <div class="record-content">
                <div class="record-handler">处理人：{{ record.handler }}</div>
                <div class="record-result">{{ record.result }}</div>
              </div>
            </div>
          </div>
          <div class="empty-records" v-if="caseData.records.length === 0">
            <p>暂无处理记录</p>
          </div>
        </div>
      </div>
      
      <!-- 附件上传 -->
      <div class="form-card">
        <div class="card-header">
          <h3 class="card-title">附件上传</h3>
        </div>
        <div class="card-body">
          <div class="upload-list">
            <div v-for="(file, index) in caseData.files" :key="index" class="upload-item">
              <div class="file-info">
                <svg class="file-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" stroke-width="2"/>
                  <path d="M14 2v6h6" stroke-width="2"/>
                </svg>
                <div class="file-details">
                  <div class="file-name">{{ file.name }}</div>
                  <div class="file-meta">{{ file.uploader }} · {{ file.uploadTime }}</div>
                </div>
              </div>
              <button class="btn-delete" @click="removeFile(index)">删除</button>
            </div>
          </div>
          <button class="upload-btn" @click="triggerUpload">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M12 5v14M5 12h14" stroke-width="2" stroke-linecap="round"/>
            </svg>
            <span>上传附件</span>
          </button>
        </div>
      </div>
      
      <!-- 操作按钮 -->
      <div class="action-buttons">
        <button class="btn btn-secondary" @click="saveDraft">保存草稿</button>
        <button class="btn btn-primary" @click="submitCase">提交案件</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const activeModule = ref('complaint')

const moduleTabs = [
  { key: 'complaint', name: '投诉', icon: 'M21 15A2 2 0 0 1 19 17H7L3 21V5C3 3.895 3.895 3 5 3H19C20.105 3 21 3.895 21 5V15Z' },
  { key: 'petition', name: '理信', icon: 'M3 8l9-6 9 6M3 8v14l9 6 9-6V8M3 8l9 6 9-6' },
  { key: 'letter', name: '信访', icon: 'M3 8l9-6 9 6v12a2 2 0 01-2 2H5a2 2 0 01-2-2V8z M9 22V12h6v10' },
  { key: 'investigation', name: '行政调查', icon: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z' }
]

const caseTypes = [
  { value: 'service', label: '服务态度' },
  { value: 'quality', label: '医疗质量' },
  { value: 'process', label: '就医流程' },
  { value: 'environment', label: '环境卫生' },
  { value: 'other', label: '其他' }
]

const departments = [
  { value: 'outpatient', label: '门诊部' },
  { value: 'emergency', label: '急诊部' },
  { value: 'surgery', label: '外科' },
  { value: 'internal', label: '内科' },
  { value: 'pediatrics', label: '儿科' },
  { value: 'gynecology', label: '妇科' }
]

const caseData = ref({
  caseNo: 'AUTO-2024-001',
  caseType: '',
  complainant: '',
  phone: '',
  department: '',
  involvedPerson: '',
  description: '',
  patientName: '',
  patientNo: '',
  age: '',
  gender: '男',
  visitDepartment: '',
  records: [],
  files: []
})

const getModuleName = (key) => {
  const tab = moduleTabs.find(t => t.key === key)
  return tab ? tab.name : key
}

const addRecord = () => {
  caseData.value.records.push({
    module: activeModule.value,
    date: new Date().toLocaleString('zh-CN'),
    handler: '当前用户',
    result: ''
  })
}

const removeRecord = (index) => {
  caseData.value.records.splice(index, 1)
}

const removeFile = (index) => {
  caseData.value.files.splice(index, 1)
}

const triggerUpload = () => {
  // 模拟上传
  caseData.value.files.push({
    name: '附件_' + (caseData.value.files.length + 1) + '.pdf',
    uploader: '当前用户',
    uploadTime: new Date().toLocaleString('zh-CN')
  })
}

const saveDraft = () => {
  alert('草稿已保存')
}

const submitCase = () => {
  if (!caseData.value.caseType || !caseData.value.complainant || !caseData.value.department) {
    alert('请填写必填项')
    return
  }
  
  const submitData = {
    ...caseData.value,
    currentModule: activeModule.value,
    submitTime: new Date().toISOString()
  }
  
  console.log('提交案件:', submitData)
  alert('案件提交成功')
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

.case-form {
  max-width: 1000px;
}

/* 模块切换标签 */
.module-tabs {
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
  background: #fff;
  padding: 16px 20px;
  border-radius: 8px;
}

.module-tab {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 16px;
  border: 2px solid #d9d9d9;
  background: #fff;
  border-radius: 6px;
  font-size: 14px;
  color: #666;
  cursor: pointer;
  transition: all 0.2s;
}

.module-tab:hover {
  border-color: #1890ff;
  color: #1890ff;
}

.module-tab.active {
  border-color: #1890ff;
  background: #e6f7ff;
  color: #1890ff;
}

.tab-icon {
  width: 20px;
  height: 20px;
}

/* 表单卡片 */
.form-card {
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

.module-badge {
  padding: 4px 12px;
  border-radius: 4px;
  font-size: 13px;
  font-weight: 500;
}

.module-badge.complaint {
  background: #fff1f0;
  color: #ff4d4f;
}

.module-badge.petition {
  background: #fff7e6;
  color: #fa8c16;
}

.module-badge.letter {
  background: #e6f7ff;
  color: #1890ff;
}

.module-badge.investigation {
  background: #f6ffed;
  color: #52c41a;
}

.btn-link {
  background: none;
  border: none;
  color: #1890ff;
  font-size: 14px;
  cursor: pointer;
}

.card-body {
  padding: 20px;
}

/* 表单网格 */
.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.form-item {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-item.full-width {
  grid-column: span 2;
}

.form-item label {
  font-size: 14px;
  color: #333;
}

.form-item.required label::before {
  content: '*';
  color: #ff4d4f;
  margin-right: 4px;
}

.form-input,
.form-select {
  height: 36px;
  padding: 0 12px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-size: 14px;
  outline: none;
}

.form-input:focus,
.form-select:focus {
  border-color: #1890ff;
}

.form-textarea {
  min-height: 100px;
  padding: 12px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-size: 14px;
  resize: vertical;
  outline: none;
}

.form-textarea:focus {
  border-color: #1890ff;
}

.textarea-count {
  text-align: right;
  font-size: 12px;
  color: #999;
  margin-top: 4px;
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

/* 处理记录 */
.record-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.record-item {
  padding: 16px;
  background: #fafafa;
  border-radius: 6px;
}

.record-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
}

.record-date {
  font-size: 13px;
  color: #999;
}

.record-module {
  padding: 2px 8px;
  background: #e6f7ff;
  color: #1890ff;
  border-radius: 4px;
  font-size: 12px;
}

.record-content {
  padding-left: 12px;
}

.record-handler {
  font-size: 13px;
  color: #666;
  margin-bottom: 4px;
}

.record-result {
  font-size: 14px;
  color: #333;
}

.btn-delete {
  margin-left: auto;
  background: none;
  border: none;
  color: #ff4d4f;
  font-size: 13px;
  cursor: pointer;
}

.empty-records {
  text-align: center;
  padding: 40px 20px;
  color: #999;
}

/* 附件上传 */
.upload-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 16px;
}

.upload-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  background: #fafafa;
  border-radius: 6px;
}

.file-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.file-icon {
  width: 32px;
  height: 32px;
  color: #1890ff;
}

.file-details {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.file-name {
  font-size: 14px;
  color: #333;
}

.file-meta {
  font-size: 12px;
  color: #999;
}

.upload-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  height: 80px;
  border: 2px dashed #d9d9d9;
  background: none;
  border-radius: 6px;
  color: #1890ff;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
}

.upload-btn:hover {
  border-color: #1890ff;
  background: #e6f7ff;
}

.upload-btn svg {
  width: 24px;
  height: 24px;
}

/* 操作按钮 */
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

@media (max-width: 768px) {
  .module-tabs {
    flex-direction: column;
  }
  
  .form-grid {
    grid-template-columns: 1fr;
  }
  
  .form-item.full-width {
    grid-column: span 1;
  }
}
</style>
