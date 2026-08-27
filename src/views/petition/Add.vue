<template>
  <div class="page-container">
    <div class="breadcrumb">
      <router-link to="/petition/all" class="breadcrumb-item">民生诉求</router-link>
      <span class="breadcrumb-separator">›</span>
      <span class="breadcrumb-item active">新增工单</span>
    </div>
    
    <div class="form-wrapper">
      <div id="section-1" class="form-section">
        <div class="section-title">01.患者信息</div>
        <div class="form-row">
          <div class="form-item">
            <label>患者姓名</label>
            <input type="text" placeholder="请输入患者姓名" class="form-input" v-model="formData.patientName">
          </div>
        </div>
        <div class="form-row">
          <div class="form-item">
            <label>病人号</label>
            <input type="text" placeholder="请输入病人号" class="form-input" v-model="formData.patientNo">
          </div>
        </div>
      </div>

      <div id="section-2" class="form-section">
        <div class="section-title">02.反馈人信息</div>
        <div class="form-row">
          <div class="form-item required">
            <label>反馈人（信访人）</label>
            <input type="text" placeholder="请输入反馈人姓名" class="form-input" v-model="formData.feedbackName">
          </div>
        </div>
        <div class="form-row">
          <div class="form-item required">
            <label>反馈人手机号</label>
            <input type="text" placeholder="请输入反馈人手机号" class="form-input" v-model="formData.feedbackPhone">
          </div>
        </div>
      </div>

      <div id="section-3" class="form-section">
        <div class="section-title">03.工单信息</div>
        <div class="form-row">
          <div class="form-item required">
            <label>签收日期</label>
            <input type="date" placeholder="请选择签收日期" class="form-input date-input" v-model="formData.signDate">
          </div>
        </div>
        <div class="form-row">
          <div class="form-item required">
            <label>工单平台来源</label>
            <input type="text" placeholder="请输入工单平台来源" class="form-input" v-model="formData.source">
          </div>
        </div>
        <div class="form-row">
          <div class="form-item required">
            <label>工单编号</label>
            <input type="text" placeholder="请输入工单编号" class="form-input" v-model="formData.ticketNo">
          </div>
        </div>
        <div class="form-row">
          <div class="form-item required">
            <label>工单分类</label>
            <select class="form-select" v-model="formData.category">
              <option value="">请选择</option>
              <option value="first">首件</option>
              <option value="repeat">重复件</option>
            </select>
          </div>
        </div>
        <div class="form-row">
          <div class="form-item required">
            <label>紧急程度</label>
            <select class="form-select" v-model="formData.urgency">
              <option value="">请选择</option>
              <option value="normal">常态</option>
              <option value="attention">关注</option>
              <option value="urgent">加急</option>
              <option value="public_opinion">舆情提醒</option>
            </select>
          </div>
        </div>
        <div class="form-row">
          <div class="form-item required">
            <label>诉求目的</label>
            <input type="text" placeholder="请输入诉求目的" class="form-input" v-model="formData.purpose">
          </div>
        </div>
        <div class="form-row">
          <div class="form-item required">
            <label>问题来源</label>
            <input type="text" placeholder="请输入问题来源" class="form-input" v-model="formData.problemSource">
          </div>
        </div>
        <div class="form-row">
          <div class="form-item required">
            <label>诉求（问题描述）</label>
            <textarea placeholder="请输入详细的问题描述" class="form-textarea" rows="6" v-model="formData.description"></textarea>
            <div class="textarea-footer">
              <span class="word-count">{{ (formData.description || '').length }}/2000</span>
            </div>
          </div>
        </div>
        <div class="form-row">
          <div class="form-item required">
            <label>涉及科室</label>
            <input type="text" placeholder="请输入涉及科室" class="form-input" v-model="formData.department">
          </div>
        </div>
        <div class="form-row">
          <div class="form-item">
            <label>涉及环节</label>
            <input type="text" placeholder="请输入涉及环节" class="form-input" v-model="formData.link">
          </div>
        </div>
      </div>

      <div id="section-4" class="form-section">
        <div class="section-title">04.答复与评价</div>
        <div class="form-row">
          <div class="form-item required">
            <label>工单答复时间</label>
            <input type="date" placeholder="请选择答复时间" class="form-input date-input" v-model="formData.replyTime">
          </div>
        </div>
        <div class="form-row">
          <div class="form-item required">
            <label>答复内容</label>
            <textarea placeholder="请输入答复内容" class="form-textarea" rows="4" v-model="formData.replyContent"></textarea>
            <div class="textarea-footer">
              <span class="word-count">{{ (formData.replyContent || '').length }}/2000</span>
            </div>
          </div>
        </div>
        <div class="form-row">
          <div class="form-item required radio-parent">
            <label>是否差评</label>
            <div class="radio-group">
              <label class="radio-item">
                <input type="radio" name="isBadReview" value="yes" v-model="formData.isBadReview">
                <span>是</span>
              </label>
              <label class="radio-item">
                <input type="radio" name="isBadReview" value="no" v-model="formData.isBadReview">
                <span>否</span>
              </label>
            </div>
          </div>
        </div>
        <div class="form-row" v-if="formData.isBadReview === 'yes'">
          <div class="form-item">
            <label>差评内容</label>
            <textarea placeholder="请输入差评内容" class="form-textarea" rows="3" v-model="formData.badReviewContent"></textarea>
            <div class="textarea-footer">
              <span class="word-count">{{ (formData.badReviewContent || '').length }}/2000</span>
            </div>
          </div>
        </div>
      </div>

      <div id="section-5" class="form-section">
        <div class="section-title">05.病历摘要</div>
        <div class="form-row" v-for="(record, index) in medicalRecords" :key="record.id">
          <div class="form-item">
            <div class="record-form-row">
              <input type="text" placeholder="请输入病历标题" class="form-input" v-model="record.title">
            </div>
            <div class="record-form-row">
              <textarea placeholder="请输入病历摘要内容" class="form-textarea" rows="3" v-model="record.content"></textarea>
            </div>
            <div class="textarea-footer">
              <span class="word-count">{{ (record.content || '').length }}/2000</span>
              <button class="btn-delete" @click="removeMedicalRecord(index)">删除</button>
            </div>
          </div>
        </div>
        <div class="form-row">
          <div class="form-item">
            <button class="btn-add-section" @click="addMedicalRecord">+ 添加病历摘要</button>
          </div>
        </div>
      </div>

      <div id="section-6" class="form-section">
        <div class="section-title">06.跟进记录</div>
        <div class="section-desc">根据案件类型分别记录跟进情况，每类支持添加多条记录</div>
        <div class="followup-modules">
          <div
            v-for="module in followupModules"
            :key="module.key"
            class="followup-module"
            :class="'module-' + module.key"
            :style="{ '--module-color': module.color, '--module-bg': module.bg, '--module-border': module.border }"
          >
            <div class="module-header">
              <div class="module-title">
                <span class="module-dot"></span>
                <span class="module-name">{{ module.label }}</span>
                <span class="module-count">{{ followupRecords[module.key].length }} 条</span>
              </div>
              <button class="btn-add-record" @click="addFollowupRecord(module.key)">
                <span class="add-icon">+</span>
                <span>添加</span>
              </button>
            </div>
            <div class="module-body" v-if="followupRecords[module.key].length > 0">
              <div
                v-for="(record, index) in followupRecords[module.key]"
                :key="record.id"
                class="record-item"
              >
                <div class="record-form-row">
                  <div class="form-item required">
                    <label>跟进类型</label>
                    <select class="form-select" v-model="record.type">
                      <option value="">请选择</option>
                      <option v-for="opt in module.typeOptions" :key="opt" :value="opt">{{ opt }}</option>
                    </select>
                  </div>
                </div>
                <div class="record-form-row">
                  <div class="form-item required">
                    <label>跟进日期</label>
                    <input type="date" placeholder="请选择日期" class="form-input date-input" v-model="record.date">
                  </div>
                </div>
                <div class="record-form-row">
                  <div class="form-item required">
                    <label>跟进描述</label>
                    <textarea
                      placeholder="请输入跟进描述"
                      class="form-textarea"
                      rows="3"
                      maxlength="2000"
                      v-model="record.description"
                    ></textarea>
                    <div class="textarea-footer">
                      <span class="word-count">{{ (record.description || '').length }}/2000</span>
                      <button class="btn-delete" @click="removeFollowupRecord(module.key, index)">删除</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="module-empty" v-else>
              <span>暂无跟进记录，点击右上角"添加"按钮新增</span>
            </div>
          </div>
        </div>
      </div>

      <div id="section-7" class="form-section">
        <div class="section-title">07.处理结果</div>
        <div class="section-desc">请按案件处理的实际情况进行勾选</div>
        <div class="form-row">
          <div class="form-item">
            <div class="checkbox-group">
              <label class="checkbox-item">
                <input type="checkbox" value="转诊" v-model="formData.processResults">
                <span>转诊</span>
              </label>
              <label class="checkbox-item">
                <input type="checkbox" value="病历质量改进" v-model="formData.processResults">
                <span>病历质量改进</span>
              </label>
              <label class="checkbox-item">
                <input type="checkbox" value="持续质量努力" v-model="formData.processResults">
                <span>持续质量努力</span>
              </label>
              <label class="checkbox-item">
                <input type="checkbox" value="有出现过医疗暴力" v-model="formData.processResults">
                <span>有出现过医疗暴力</span>
              </label>
              <label class="checkbox-item">
                <input type="checkbox" value="纠纷处理" v-model="formData.processResults">
                <span>纠纷处理</span>
              </label>
              <label class="checkbox-item">
                <input type="checkbox" value="经济损失" v-model="formData.processResults">
                <span>经济损失</span>
              </label>
              <label class="checkbox-item">
                <input type="checkbox" value="需进行鉴定" v-model="formData.processResults">
                <span>需进行鉴定</span>
              </label>
              <label class="checkbox-item">
                <input type="checkbox" value="存在行政处罚" v-model="formData.processResults">
                <span>存在行政处罚</span>
              </label>
              <label class="checkbox-item">
                <input type="checkbox" value="其他处理结果" v-model="formData.processResults">
                <span>其他处理结果</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <div id="section-8" class="form-section">
        <div class="section-title">08.上传附件（选填）</div>
        <div class="form-row" v-for="(file, index) in attachmentList" :key="file.id">
          <div class="form-item">
            <div class="attachment-item">
              <div class="attachment-info">
                <span class="attachment-icon">📎</span>
                <span class="attachment-name">{{ file.name }}</span>
              </div>
              <button class="btn-delete" @click="removeAttachment(index)">删除</button>
            </div>
          </div>
        </div>
        <div class="form-row">
          <div class="form-item">
            <div class="upload-area">
              <span class="upload-hint">支持扩展名为: xls, doc, docx, pdf, jpg</span>
              <div class="upload-buttons">
                <button class="btn-upload" @click="addAttachment">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" style="width:14px;height:14px;">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke-width="2"/>
                    <polyline points="17 8 12 3 7 8" stroke-width="2"/>
                    <line x1="12" y1="3" x2="12" y2="15" stroke-width="2"/>
                  </svg>
                  附件上传
                </button>
                <button class="btn-upload-outline" @click="addAttachment">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" style="width:14px;height:14px;">
                    <rect x="3" y="3" width="18" height="18" rx="2" stroke-width="2"/>
                    <path d="M3 9h18M9 21V9" stroke-width="2"/>
                  </svg>
                  拍照/相册
                </button>
                <button class="btn-add" @click="addAttachment">+ 添加</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="form-actions">
      <button class="btn btn-primary" @click="submitForm">提交工单</button>
      <button class="btn btn-outline" @click="saveDraft">保存草稿</button>
      <button class="btn btn-outline" @click="$router.back()">取消</button>
    </div>

    <div class="sidebar-nav">
      <div class="nav-item" @click="scrollToSection('section-1')">01.患者信息</div>
      <div class="nav-item" @click="scrollToSection('section-2')">02.反馈人信息</div>
      <div class="nav-item" @click="scrollToSection('section-3')">03.工单信息</div>
      <div class="nav-item" @click="scrollToSection('section-4')">04.答复与评价</div>
      <div class="nav-item" @click="scrollToSection('section-5')">05.病历摘要</div>
      <div class="nav-item" @click="scrollToSection('section-6')">06.跟进记录</div>
      <div class="nav-item" @click="scrollToSection('section-7')">07.处理结果</div>
      <div class="nav-item" @click="scrollToSection('section-8')">08.上传附件</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const formData = ref({
  patientName: '',
  patientNo: '',
  feedbackName: '',
  feedbackPhone: '',
  signDate: '',
  source: '',
  ticketNo: '',
  category: '',
  urgency: '',
  purpose: '',
  problemSource: '',
  description: '',
  department: '',
  link: '',
  replyTime: '',
  replyContent: '',
  isBadReview: '',
  badReviewContent: '',
  processResults: []
})

// 病历摘要
const medicalRecords = ref([])
let medicalRecordIdCounter = 0
const addMedicalRecord = () => {
  medicalRecordIdCounter += 1
  medicalRecords.value.push({
    id: `med_${Date.now()}_${medicalRecordIdCounter}`,
    title: '',
    content: ''
  })
}
const removeMedicalRecord = (index) => {
  medicalRecords.value.splice(index, 1)
}

// 跟进记录模块
const followupModules = ref([
  {
    key: 'complaint',
    label: '投诉',
    color: '#1890ff',
    bg: '#e6f7ff',
    border: '#91d5ff',
    typeOptions: ['电话沟通', '现场协调', '面谈约谈', '书面回复', '其他']
  },
  {
    key: 'petition',
    label: '信访',
    color: '#722ed1',
    bg: '#f9f0ff',
    border: '#d3adf7',
    typeOptions: ['接待来访', '电话回复', '书面答复', '实地走访', '其他']
  },
  {
    key: 'claim',
    label: '理赔',
    color: '#fa8c16',
    bg: '#fff7e6',
    border: '#ffd591',
    typeOptions: ['案件审核', '协商谈判', '协议签订', '款项支付', '其他']
  },
  {
    key: 'investigation',
    label: '行政调查',
    color: '#52c41a',
    bg: '#f6ffed',
    border: '#b7eb8f',
    typeOptions: ['现场调查', '资料调取', '询问笔录', '专家评审', '其他']
  }
])

const followupRecords = ref({
  complaint: [],
  petition: [],
  claim: [],
  investigation: []
})

let recordIdCounter = 0
const createEmptyRecord = () => {
  recordIdCounter += 1
  return {
    id: `rec_${Date.now()}_${recordIdCounter}`,
    type: '',
    date: '',
    description: ''
  }
}

const addFollowupRecord = (key) => {
  followupRecords.value[key].push(createEmptyRecord())
}

const removeFollowupRecord = (key, index) => {
  followupRecords.value[key].splice(index, 1)
}

// 附件
const attachmentList = ref([])
let attachmentIdCounter = 0
const addAttachment = () => {
  attachmentIdCounter += 1
  attachmentList.value.push({
    id: `att_${Date.now()}_${attachmentIdCounter}`,
    name: `附件_${attachmentIdCounter}.pdf`
  })
}
const removeAttachment = (index) => {
  attachmentList.value.splice(index, 1)
}

const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

const submitForm = () => {
  const missingFields = []
  if (!formData.value.feedbackName) missingFields.push('反馈人')
  if (!formData.value.feedbackPhone) missingFields.push('反馈人手机号')
  if (!formData.value.signDate) missingFields.push('签收日期')
  if (!formData.value.source) missingFields.push('工单平台来源')
  if (!formData.value.ticketNo) missingFields.push('工单编号')
  if (!formData.value.category) missingFields.push('工单分类')
  if (!formData.value.urgency) missingFields.push('紧急程度')
  if (!formData.value.purpose) missingFields.push('诉求目的')
  if (!formData.value.problemSource) missingFields.push('问题来源')
  if (!formData.value.description) missingFields.push('诉求（问题描述）')
  if (!formData.value.department) missingFields.push('涉及科室')
  if (!formData.value.replyTime) missingFields.push('工单答复时间')
  if (!formData.value.replyContent) missingFields.push('答复内容')
  if (!formData.value.isBadReview) missingFields.push('是否差评')
  
  if (missingFields.length > 0) {
    alert('请填写以下必填项：\n' + missingFields.join('、'))
    return
  }
  alert('工单提交成功！')
}

const saveDraft = () => {
  const draftData = {
    formData: formData.value,
    medicalRecords: medicalRecords.value,
    followupRecords: followupRecords.value,
    attachmentList: attachmentList.value
  }
  localStorage.setItem('petition_add_draft', JSON.stringify(draftData))
  alert('草稿保存成功')
}
</script>

<style scoped>
.page-container {
  padding: 20px;
  background-color: #f0f2f5;
  min-height: 100%;
  position: relative;
}

.breadcrumb {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  font-size: 14px;
  position: sticky;
  top: 56px;
  background-color: #f0f2f5;
  z-index: 10;
}

.breadcrumb-item {
  color: #666;
  text-decoration: none;
}

.breadcrumb-item:hover {
  color: #1890ff;
}

.breadcrumb-item.active {
  color: #333;
}

.breadcrumb-separator {
  margin: 0 8px;
  color: #999;
}

.form-wrapper {
  background-color: #fff;
  border-radius: 4px;
  padding: 24px;
  max-width: 800px;
  margin-right: 220px;
  margin-bottom: 100px;
}

.form-section {
  margin-bottom: 32px;
  padding-bottom: 24px;
  border-bottom: 1px solid #f0f0f0;
}

.form-section:last-child {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}

.section-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin-bottom: 20px;
  padding-left: 8px;
  border-left: 3px solid #1890ff;
}

.form-row {
  margin-bottom: 16px;
}

.form-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-item label {
  font-size: 14px;
  color: #333;
  font-weight: 500;
}

.form-item.required label::before {
  content: '*';
  color: #ff4d4f;
  margin-right: 4px;
}

/* 清除单选/复选框内部选项 label 前面的星号 */
.form-item.required .radio-item::before,
.form-item.required label.radio-item::before {
  content: none !important;
  display: none !important;
}

.form-input {
  width: 100%;
  height: 36px;
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
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%23999' stroke-width='2'%3E%3Crect x='3' y='4' width='18' height='18' rx='2'/%3E%3Cline x1='16' y1='2' x2='16' y2='6'/%3E%3Cline x1='8' y1='2' x2='8' y2='6'/%3E%3Cline x1='3' y1='10' x2='21' y2='10'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
}

.form-select {
  width: 100%;
  height: 36px;
  padding: 0 12px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-size: 14px;
  outline: none;
  background-color: #fff;
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  padding-right: 32px;
  box-sizing: border-box;
}

.form-select:focus {
  border-color: #1890ff;
}

.form-textarea {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-size: 14px;
  outline: none;
  resize: none;
  transition: border-color 0.2s;
  box-sizing: border-box;
}

.form-textarea:focus {
  border-color: #1890ff;
}

.textarea-footer {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 4px;
}

.word-count {
  font-size: 12px;
  color: #999;
}

.radio-group {
  display: flex;
  gap: 24px;
}

.radio-item {
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  font-size: 14px;
  color: #666;
}

.radio-item input[type="radio"] {
  width: 16px;
  height: 16px;
  cursor: pointer;
}

.btn-add-section {
  width: 100%;
  height: 80px;
  border: 1px dashed #d9d9d9;
  border-radius: 4px;
  background-color: #fafafa;
  color: #999;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-add-section:hover {
  border-color: #1890ff;
  color: #1890ff;
  background-color: #e6f7ff;
}

.upload-area {
  padding: 20px;
  border: 1px dashed #d9d9d9;
  border-radius: 4px;
  background-color: #fafafa;
}

.upload-hint {
  font-size: 12px;
  color: #999;
  margin-bottom: 12px;
  display: block;
}

.btn-upload {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 32px;
  padding: 0 16px;
  background-color: #1890ff;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
}

.btn-upload:hover {
  background-color: #40a9ff;
}

.section-desc {
  font-size: 13px;
  color: #999;
  margin-bottom: 16px;
}

.record-form-row {
  margin-bottom: 12px;
}

.record-form-row:last-child {
  margin-bottom: 0;
}

.checkbox-group {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.checkbox-item {
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  font-size: 14px;
  color: #666;
}

.checkbox-item input[type="checkbox"] {
  width: 16px;
  height: 16px;
  cursor: pointer;
}

.btn-add {
  background: none;
  border: none;
  color: #1890ff;
  font-size: 14px;
  cursor: pointer;
  padding: 0;
}

.btn-add:hover {
  text-decoration: underline;
}

.btn-upload-outline {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 32px;
  padding: 0 16px;
  background-color: #fff;
  color: #1890ff;
  border: 1px solid #1890ff;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-upload-outline:hover {
  background-color: #e6f7ff;
}

.upload-buttons {
  display: flex;
  gap: 12px;
}

.btn-delete {
  background: none;
  border: none;
  color: #ff4d4f;
  font-size: 13px;
  cursor: pointer;
  padding: 0;
  transition: all 0.2s;
}

.btn-delete:hover {
  color: #cf1322;
  text-decoration: underline;
}

.attachment-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 12px;
  background-color: #fafafa;
  border: 1px solid #f0f0f0;
  border-radius: 4px;
}

.attachment-info {
  display: flex;
  align-items: center;
  gap: 8px;
}

.attachment-icon {
  font-size: 16px;
}

.attachment-name {
  font-size: 14px;
  color: #333;
}

/* 跟进记录模块样式 */
.followup-modules {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 8px;
}

.followup-module {
  border: 1px solid var(--module-border, #d9d9d9);
  border-left: 4px solid var(--module-color, #1890ff);
  border-radius: 6px;
  background-color: #fff;
  overflow: hidden;
  transition: box-shadow 0.2s;
}

.followup-module:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.module-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background-color: var(--module-bg, #fafafa);
  border-bottom: 1px solid var(--module-border, #f0f0f0);
}

.module-title {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 15px;
  font-weight: 600;
  color: var(--module-color, #333);
}

.module-dot {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: var(--module-color, #1890ff);
  box-shadow: 0 0 0 3px var(--module-bg, #fafafa), 0 0 0 4px var(--module-color, #1890ff);
}

.module-name {
  font-size: 15px;
  font-weight: 600;
}

.module-count {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 24px;
  height: 20px;
  padding: 0 8px;
  font-size: 12px;
  font-weight: 500;
  color: var(--module-color, #1890ff);
  background-color: #fff;
  border: 1px solid var(--module-border, #d9d9d9);
  border-radius: 10px;
}

.btn-add-record {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  height: 30px;
  padding: 0 12px;
  background-color: var(--module-color, #1890ff);
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-add-record:hover {
  opacity: 0.85;
  transform: translateY(-1px);
}

.add-icon {
  font-size: 16px;
  font-weight: 600;
  line-height: 1;
}

.module-body {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.record-item {
  position: relative;
  padding: 16px;
  background-color: var(--module-bg, #fafafa);
  border: 1px dashed var(--module-border, #d9d9d9);
  border-radius: 4px;
}

.record-item::before {
  content: '';
  position: absolute;
  top: 16px;
  left: -1px;
  width: 3px;
  height: 20px;
  background-color: var(--module-color, #1890ff);
  border-radius: 0 2px 2px 0;
}

.module-empty {
  padding: 24px 16px;
  text-align: center;
  font-size: 13px;
  color: #999;
  background-color: #fafafa;
}

.form-actions {
  position: fixed;
  bottom: 0;
  left: 220px;
  right: 0;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 16px 40px;
  background-color: #fff;
  border-top: 1px solid #f0f0f0;
  z-index: 50;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  height: 36px;
  padding: 0 24px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-primary {
  background-color: #1890ff;
  color: #fff;
}

.btn-primary:hover {
  background-color: #40a9ff;
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

.sidebar-nav {
  position: fixed;
  right: 20px;
  top: 120px;
  width: 180px;
  background-color: #fff;
  border-radius: 4px;
  padding: 12px 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.nav-item {
  padding: 10px 16px;
  font-size: 13px;
  color: #666;
  cursor: pointer;
  transition: all 0.2s;
}

.nav-item:hover {
  background-color: #f5f5f5;
  color: #1890ff;
}

@media (max-width: 768px) {
  .form-actions {
    left: 0;
    flex-direction: column;
    gap: 8px;
    padding: 12px;
  }
  
  .form-actions .btn {
    width: 100%;
  }
  
  .sidebar-nav {
    display: none;
  }
  
  .form-wrapper {
    margin-right: 0;
  }
}
</style>
