<template>
  <div class="page-container">
    <div class="breadcrumb">
      <div class="breadcrumb-arrow">
        <svg viewBox="0 0 24 24" fill="none" stroke="#999" xmlns="http://www.w3.org/2000/svg">
          <polyline points="15 18 9 12 15 6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <router-link to="/" class="breadcrumb-item">案件报备</router-link>
      <span class="breadcrumb-separator">›</span>
      <span class="breadcrumb-item active">新增报备案件</span>
    </div>
    
    <div class="form-wrapper">
      <div id="section-1" class="form-section">
        <div class="section-title">01.患者信息</div>
        <div class="form-row">
          <div class="form-item required">
            <label>姓名</label>
            <input type="text" placeholder="请点击输入" class="form-input">
          </div>
        </div>
        <div class="form-row">
          <div class="form-item required">
            <label>病人号</label>
            <input type="text" placeholder="请点击输入" class="form-input">
          </div>
        </div>
        <div class="form-row">
          <div class="form-item">
            <label>年龄</label>
            <input type="text" placeholder="请点击输入" class="form-input">
          </div>
        </div>
        <div class="form-row">
          <div class="form-item">
            <label>性别（选填）</label>
            <div class="radio-group">
              <label class="radio-item">
                <input type="radio" name="patient-gender" value="男">
                <span>男</span>
              </label>
              <label class="radio-item">
                <input type="radio" name="patient-gender" value="女">
                <span>女</span>
              </label>
              <label class="radio-item">
                <input type="radio" name="patient-gender" value="保密">
                <span>保密</span>
              </label>
            </div>
          </div>
        </div>
        <div class="form-row">
          <div class="form-item">
            <label>联系方式</label>
            <input type="text" placeholder="请点击输入" class="form-input">
            <input type="text" placeholder="请点击输入" class="form-input">
            <div class="input-hint">输入后点击回车保存，最多输入3个</div>
          </div>
        </div>
        <div class="form-row">
          <div class="form-item">
            <label>邮箱/地址</label>
            <input type="text" placeholder="请点击输入" class="form-input">
          </div>
        </div>
      </div>

      <div id="section-2" class="form-section">
        <div class="section-title">02.反馈人信息</div>
        <div class="form-row">
          <div class="form-item required">
            <label>与患者关系</label>
            <select class="form-select">
              <option value="">请选择</option>
            </select>
          </div>
        </div>
        <div class="form-row">
          <div class="form-item required">
            <label>姓名</label>
            <input type="text" placeholder="请点击输入" class="form-input">
          </div>
        </div>
        <div class="form-row">
          <div class="form-item">
            <label>年龄</label>
            <input type="text" placeholder="请点击输入" class="form-input">
          </div>
        </div>
        <div class="form-row">
          <div class="form-item">
            <label>性别（选填）</label>
            <div class="radio-group">
              <label class="radio-item">
                <input type="radio" name="feedback-gender" value="男">
                <span>男</span>
              </label>
              <label class="radio-item">
                <input type="radio" name="feedback-gender" value="女">
                <span>女</span>
              </label>
              <label class="radio-item">
                <input type="radio" name="feedback-gender" value="保密">
                <span>保密</span>
              </label>
            </div>
          </div>
        </div>
        <div class="form-row">
          <div class="form-item">
            <label>联系方式</label>
            <input type="text" placeholder="请点击输入" class="form-input">
            <input type="text" placeholder="请点击输入" class="form-input">
            <div class="input-hint">输入后点击回车保存，最多输入3个</div>
          </div>
        </div>
        <div class="form-row">
          <div class="form-item">
            <label>邮箱/地址</label>
            <input type="text" placeholder="请点击输入" class="form-input">
          </div>
        </div>
      </div>

      <div id="section-3" class="form-section">
        <div class="section-title">03.原因及其诉求</div>
        <div class="form-row">
          <div class="form-item">
            <label>涉及环节</label>
            <select class="form-select">
              <option value="">请选择涉及环节</option>
            </select>
          </div>
        </div>
        <div class="form-row">
          <div class="form-item">
            <label>原因</label>
            <select class="form-select">
              <option value="">请选择</option>
            </select>
          </div>
        </div>
        <div class="form-row">
          <div class="form-item">
            <label>诉求</label>
            <select class="form-select">
              <option value="">请选择</option>
            </select>
          </div>
        </div>
        <div class="form-row">
          <div class="form-item required">
            <label>反馈时间</label>
            <div class="date-input-wrapper">
              <svg class="date-icon" viewBox="0 0 24 24" fill="none" stroke="#999" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="4" width="18" height="18" rx="2" stroke-width="2"/>
                <line x1="16" y1="2" x2="16" y2="6" stroke-width="2"/>
                <line x1="8" y1="2" x2="8" y2="6" stroke-width="2"/>
                <line x1="3" y1="10" x2="21" y2="10" stroke-width="2"/>
              </svg>
              <input type="text" placeholder="请选择日期：yyyy-MM-dd" class="form-input date-input">
            </div>
          </div>
        </div>
        <div class="form-row">
          <div class="form-item required">
            <label>反馈内容</label>
            <textarea placeholder="请点击输入" class="form-textarea" rows="6"></textarea>
            <div class="textarea-footer">
              <span class="word-count">0/2000</span>
              <button class="btn-add">+ 添加</button>
            </div>
          </div>
        </div>
      </div>

      <div id="section-4" class="form-section bg-light">
        <div class="section-title">04.反馈方式与涉及人员</div>
        <div class="form-row">
          <div class="form-item required">
            <label>反馈方式</label>
            <select class="form-select">
              <option value="">请选择</option>
            </select>
          </div>
        </div>
        <div class="form-row">
          <div class="form-item required">
            <label>涉及科室</label>
            <select class="form-select">
              <option value="">请选择</option>
            </select>
          </div>
        </div>
        <div class="form-row">
          <div class="form-item required">
            <label>科室类别</label>
            <select class="form-select">
              <option value="">请选择</option>
            </select>
          </div>
        </div>
        <div class="form-row">
          <div class="form-item">
            <label>涉及人员</label>
            <select class="form-select">
              <option value="">请选择</option>
            </select>
          </div>
        </div>
        <div class="form-row">
          <div class="form-item">
            <label>自定义涉及人员</label>
            <input type="text" placeholder="请填写自定义涉及对象，输入后点击回车保存" class="form-input">
          </div>
        </div>
      </div>

      <div id="section-5" class="form-section">
        <div class="section-title">05.上传附件（选填）</div>
        <div class="form-row">
          <div class="form-item">
            <label>类型</label>
            <select class="form-select">
              <option value="">请选择</option>
            </select>
          </div>
        </div>
        <div class="form-row">
          <div class="form-item">
            <div class="upload-area">
              <span class="upload-hint">支持扩展名：xls、doc、docx、pdf、jpg</span>
              <div class="upload-buttons">
                <button class="btn-upload">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg" style="width:14px;height:14px;">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke-width="2"/>
                    <polyline points="7 10 12 15 17 10" stroke-width="2"/>
                    <line x1="12" y1="15" x2="12" y2="3" stroke-width="2"/>
                  </svg>
                  附件上传
                </button>
                <button class="btn-upload-outline">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg" style="width:14px;height:14px;">
                    <rect x="3" y="3" width="18" height="18" rx="2" stroke-width="2"/>
                    <path d="M12 3v18M3 12h18" stroke-width="2"/>
                  </svg>
                  高拍仪拍照
                </button>
                <button class="btn-add">+ 添加</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="form-actions">
      <button class="btn btn-primary">保存</button>
    </div>

    <div class="sidebar-nav">
      <div class="nav-item active" @click="scrollToSection('section-1')">01.患者信息</div>
      <div class="nav-item" @click="scrollToSection('section-2')">02.反馈人信息</div>
      <div class="nav-item" @click="scrollToSection('section-3')">03.原因及其诉求</div>
      <div class="nav-item" @click="scrollToSection('section-4')">04.反馈方式与涉及人员</div>
      <div class="nav-item" @click="scrollToSection('section-5')">05.上传附件（选填）</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const activeSection = ref('section-1')

const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    activeSection.value = sectionId
  }
}

const handleScroll = () => {
  const sections = ['section-1', 'section-2', 'section-3', 'section-4', 'section-5']
  for (let i = sections.length - 1; i >= 0; i--) {
    const element = document.getElementById(sections[i])
    if (element && element.getBoundingClientRect().top <= 150) {
      activeSection.value = sections[i]
      break
    }
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.page-container {
  padding: 24px;
  background-color: #f0f2f5;
  min-height: 100%;
  position: relative;
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
  color: #333;
  text-decoration: none;
  font-size: 14px;
}

.breadcrumb-item:hover {
  color: #1890ff;
}

.breadcrumb-item.active {
  color: #666;
}

.breadcrumb-separator {
  margin: 0 8px;
  color: #999;
}

.form-wrapper {
  background-color: #fff;
  border-radius: 4px;
  padding: 24px;
  max-width: 500px;
  margin-right: 220px;
  margin-bottom: 100px;
}

.form-section {
  margin-bottom: 32px;
  padding-bottom: 24px;
  border-bottom: 1px solid #e8e8e8;
}

.form-section:last-child {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}

.form-section.bg-light {
  background-color: #fafafa;
  padding: 20px;
  margin-bottom: 24px;
  border-radius: 4px;
  border-bottom: none;
}

.form-section.bg-light .form-row {
  margin-bottom: 12px;
}

.form-section.bg-light .form-row:last-child {
  margin-bottom: 0;
}

.section-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin-bottom: 20px;
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

.date-input-wrapper {
  position: relative;
}

.date-icon {
  position: absolute;
  left: 8px;
  top: 50%;
  transform: translateY(-50%);
  width: 14px;
  height: 14px;
}

.form-input.date-input {
  padding-left: 28px;
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
  justify-content: space-between;
  align-items: center;
  margin-top: 4px;
}

.word-count {
  font-size: 12px;
  color: #999;
}

.input-hint {
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

.upload-buttons {
  display: flex;
  gap: 12px;
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
  transition: all 0.2s;
}

.btn-upload:hover {
  background-color: #40a9ff;
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

.nav-item.active {
  background-color: #e6f7ff;
  color: #1890ff;
}
</style>
