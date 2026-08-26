<template>
  <div class="page-container">
    <div class="breadcrumb">
      <router-link to="/petition/all" class="breadcrumb-item">民生诉求</router-link>
      <span class="breadcrumb-separator">›</span>
      <span class="breadcrumb-item active">新增案件</span>
    </div>
    
    <div class="form-wrapper">
      <div id="section-1" class="form-section">
        <div class="section-title">01.患者信息</div>
        <div class="form-row">
          <div class="form-item required">
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
            <input type="text" placeholder="请选择签收日期" class="form-input date-input" v-model="formData.signDate">
          </div>
        </div>
        <div class="form-row">
          <div class="form-item required">
            <label>工单平台来源</label>
            <select class="form-select" v-model="formData.source">
              <option value="">请选择</option>
              <option value="government">政府平台</option>
              <option value="hotline">热线电话</option>
              <option value="visit">来访</option>
              <option value="letter">来信</option>
              <option value="email">邮件</option>
            </select>
          </div>
        </div>
        <div class="form-row">
          <div class="form-item required">
            <label>工单分类</label>
            <select class="form-select" v-model="formData.category">
              <option value="">请选择</option>
              <option value="medical_service">医疗服务</option>
              <option value="medical_quality">医疗质量</option>
              <option value="charging">收费问题</option>
              <option value="experience">就医体验</option>
              <option value="other">其他</option>
            </select>
          </div>
        </div>
        <div class="form-row">
          <div class="form-item required">
            <label>紧急程度</label>
            <select class="form-select" v-model="formData.urgency">
              <option value="">请选择</option>
              <option value="normal">普通</option>
              <option value="urgent">紧急</option>
              <option value="critical">特急</option>
            </select>
          </div>
        </div>
        <div class="form-row">
          <div class="form-item">
            <label>诉求目的</label>
            <input type="text" placeholder="请输入诉求目的" class="form-input" v-model="formData.purpose">
          </div>
        </div>
        <div class="form-row">
          <div class="form-item">
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
            <select class="form-select" v-model="formData.department">
              <option value="">请选择</option>
              <option value="internal">内科</option>
              <option value="surgery">外科</option>
              <option value="pediatrics">儿科</option>
              <option value="obstetrics">妇产科</option>
              <option value="emergency">急诊室</option>
              <option value="outpatient">门诊部</option>
              <option value="finance">财务科</option>
              <option value="other">其他</option>
            </select>
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
          <div class="form-item">
            <label>工单答复时间</label>
            <input type="text" placeholder="请选择答复时间" class="form-input date-input" v-model="formData.replyTime">
          </div>
        </div>
        <div class="form-row">
          <div class="form-item">
            <label>答复内容</label>
            <textarea placeholder="请输入答复内容" class="form-textarea" rows="4" v-model="formData.replyContent"></textarea>
            <div class="textarea-footer">
              <span class="word-count">{{ (formData.replyContent || '').length }}/2000</span>
            </div>
          </div>
        </div>
        <div class="form-row">
          <div class="form-item">
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
        <div class="form-row">
          <div class="form-item">
            <button class="btn-add-section">+ 添加病历摘要</button>
          </div>
        </div>
      </div>

      <div id="section-6" class="form-section">
        <div class="section-title">06.跟进记录</div>
        <div class="form-row">
          <div class="form-item">
            <button class="btn-add-section">+ 添加跟进记录</button>
          </div>
        </div>
      </div>

      <div id="section-7" class="form-section">
        <div class="section-title">07.处理结果</div>
        <div class="form-row">
          <div class="form-item">
            <button class="btn-add-section">+ 添加处理结果</button>
          </div>
        </div>
      </div>

      <div id="section-8" class="form-section">
        <div class="section-title">08.上传附件（选填）</div>
        <div class="form-row">
          <div class="form-item">
            <div class="upload-area">
              <span class="upload-hint">支持扩展名为: xls, doc, docx, pdf, jpg</span>
              <button class="btn-upload">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" style="width:14px;height:14px;">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke-width="2"/>
                  <polyline points="17 8 12 3 7 8" stroke-width="2"/>
                  <line x1="12" y1="3" x2="12" y2="15" stroke-width="2"/>
                </svg>
                附件上传
              </button>
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
  category: '',
  urgency: '',
  purpose: '',
  problemSource: '',
  description: '',
  department: '',
  link: '',
  replyTime: '',
  replyContent: '',
  isBadReview: 'no',
  badReviewContent: ''
})

const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

const submitForm = () => {
  if (!formData.value.patientName || !formData.value.feedbackName || !formData.value.feedbackPhone) {
    alert('请填写必填项')
    return
  }
  alert('工单提交成功！')
}

const saveDraft = () => {
  localStorage.setItem('petition_add_draft', JSON.stringify(formData.value))
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
