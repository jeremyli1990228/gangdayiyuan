<template>
  <div class="page-container">
    <!-- 面包屑导航 -->
    <div class="breadcrumb">
      <span class="breadcrumb-item">
        <svg class="breadcrumb-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </span>
      <span class="breadcrumb-separator">/</span>
      <span class="breadcrumb-item">投诉管理</span>
      <span class="breadcrumb-separator">/</span>
      <span class="breadcrumb-item active">反馈设置</span>
    </div>

    <!-- 页面标题 -->
    <div class="page-header">
      <h1 class="page-title">反馈设置</h1>
    </div>

    <!-- 基础设置 -->
    <div class="settings-card">
      <div class="card-header">
        <h3 class="card-title">基础设置</h3>
      </div>
      <div class="card-body">
        <div class="settings-row">
          <div class="settings-item">
            <label class="settings-label">投诉时效（天）</label>
            <div class="settings-input-group">
              <input type="number" class="form-input" v-model="settings.complaintDeadline" min="1">
              <span class="input-tip">超过此时效未处理将自动标记为超期</span>
            </div>
          </div>
        </div>
        <div class="settings-row">
          <div class="settings-item">
            <label class="settings-label">评价时限（天）</label>
            <div class="settings-input-group">
              <input type="number" class="form-input" v-model="settings.ratingDeadline" min="1">
              <span class="input-tip">处理完成后，患者可评价的有效期限</span>
            </div>
          </div>
        </div>
        <div class="settings-row">
          <div class="settings-item">
            <label class="settings-label">自动催促</label>
            <div class="settings-input-group">
              <div class="switch-wrapper">
                <span :class="['switch', settings.autoRemind ? 'active' : '']" @click="settings.autoRemind = !settings.autoRemind">
                  <span class="switch-dot"></span>
                </span>
                <span class="switch-text">{{ settings.autoRemind ? '开启' : '关闭' }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="settings-row" v-if="settings.autoRemind">
          <div class="settings-item">
            <label class="settings-label">催促间隔（天）</label>
            <div class="settings-input-group">
              <input type="number" class="form-input" v-model="settings.remindInterval" min="1">
              <span class="input-tip">每隔几天发送一次催促提醒</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 通知设置 -->
    <div class="settings-card">
      <div class="card-header">
        <h3 class="card-title">通知设置</h3>
      </div>
      <div class="card-body">
        <div class="settings-row">
          <div class="settings-item">
            <label class="settings-label">短信通知</label>
            <div class="settings-input-group">
              <div class="switch-wrapper">
                <span :class="['switch', settings.smsNotify ? 'active' : '']" @click="settings.smsNotify = !settings.smsNotify">
                  <span class="switch-dot"></span>
                </span>
                <span class="switch-text">{{ settings.smsNotify ? '开启' : '关闭' }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="settings-row">
          <div class="settings-item">
            <label class="settings-label">邮件通知</label>
            <div class="settings-input-group">
              <div class="switch-wrapper">
                <span :class="['switch', settings.emailNotify ? 'active' : '']" @click="settings.emailNotify = !settings.emailNotify">
                  <span class="switch-dot"></span>
                </span>
                <span class="switch-text">{{ settings.emailNotify ? '开启' : '关闭' }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="settings-row">
          <div class="settings-item">
            <label class="settings-label">公众号通知</label>
            <div class="settings-input-group">
              <div class="switch-wrapper">
                <span :class="['switch', settings.wechatNotify ? 'active' : '']" @click="settings.wechatNotify = !settings.wechatNotify">
                  <span class="switch-dot"></span>
                </span>
                <span class="switch-text">{{ settings.wechatNotify ? '开启' : '关闭' }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 通知模板配置 -->
    <div class="settings-card">
      <div class="card-header">
        <h3 class="card-title">通知模板配置</h3>
      </div>
      <div class="card-body">
        <div class="template-tabs">
          <button :class="['tab-btn', activeTab === 'submit' ? 'active' : '']" @click="activeTab = 'submit'">提交通知</button>
          <button :class="['tab-btn', activeTab === 'process' ? 'active' : '']" @click="activeTab = 'process'">处理通知</button>
          <button :class="['tab-btn', activeTab === 'complete' ? 'active' : '']" @click="activeTab = 'complete'">完成通知</button>
          <button :class="['tab-btn', activeTab === 'remind' ? 'active' : '']" @click="activeTab = 'remind'">催促通知</button>
        </div>
        <div class="template-content">
          <div class="form-item">
            <label class="form-label">短信模板</label>
            <textarea class="form-textarea" v-model="templates[activeTab].sms" placeholder="请输入短信模板内容" rows="4"></textarea>
            <div class="template-vars">
              <span class="var-tag" @click="insertVar('sms', '{patientName}')">{patientName} 患者姓名</span>
              <span class="var-tag" @click="insertVar('sms', '{caseNo}')">{caseNo} 案件编号</span>
              <span class="var-tag" @click="insertVar('sms', '{status}')">{status} 处理状态</span>
            </div>
          </div>
          <div class="form-item">
            <label class="form-label">邮件主题</label>
            <input type="text" class="form-input" v-model="templates[activeTab].emailSubject" placeholder="请输入邮件主题">
          </div>
          <div class="form-item">
            <label class="form-label">邮件内容</label>
            <textarea class="form-textarea" v-model="templates[activeTab].emailContent" placeholder="请输入邮件内容" rows="6"></textarea>
          </div>
        </div>
      </div>
    </div>

    <!-- 保存按钮 -->
    <div class="action-bar">
      <button class="btn btn-primary" @click="saveSettings">
        <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H16L21 8V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M17 21V13H7V21" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M7 3V8H15" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        保存设置
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const activeTab = ref('submit')

const settings = ref({
  complaintDeadline: 7,
  ratingDeadline: 30,
  autoRemind: true,
  remindInterval: 2,
  smsNotify: true,
  emailNotify: true,
  wechatNotify: true
})

const templates = ref({
  submit: {
    sms: '【港大医院】尊敬的{patientName}，您的投诉建议已提交成功，案件编号：{caseNo}，我们将尽快处理。',
    emailSubject: '投诉建议提交成功通知',
    emailContent: '尊敬的{patientName}：\n\n您的投诉建议已提交成功，案件编号：{caseNo}。\n\n我们将尽快处理并反馈结果。\n\n香港大学深圳医院'
  },
  process: {
    sms: '【港大医院】尊敬的{patientName}，您的案件{caseNo}正在处理中，请耐心等待。',
    emailSubject: '投诉建议处理通知',
    emailContent: '尊敬的{patientName}：\n\n您的案件{caseNo}正在处理中。\n\n处理人：{handler}\n\n请耐心等待处理结果。\n\n香港大学深圳医院'
  },
  complete: {
    sms: '【港大医院】尊敬的{patientName}，您的案件{caseNo}已处理完成，请点击链接进行评价。',
    emailSubject: '投诉建议处理完成通知',
    emailContent: '尊敬的{patientName}：\n\n您的案件{caseNo}已处理完成。\n\n处理结果：{result}\n\n请点击以下链接进行评价：\n{ratingLink}\n\n香港大学深圳医院'
  },
  remind: {
    sms: '【港大医院】尊敬的{patientName}，您的案件{caseNo}即将超期，请尽快处理。',
    emailSubject: '投诉建议催促通知',
    emailContent: '尊敬的{patientName}：\n\n您的案件{caseNo}即将超期，请尽快处理。\n\n剩余时间：{remainingTime}\n\n香港大学深圳医院'
  }
})

const insertVar = (type, variable) => {
  templates.value[activeTab.value][type === 'sms' ? 'sms' : 'emailContent'] += variable
}

const saveSettings = () => {
  alert('设置保存成功！')
}
</script>

<style scoped>
.page-container {
  padding: 20px;
  background: #f5f7fa;
  min-height: 100vh;
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
  font-size: 14px;
}

.breadcrumb-icon {
  width: 16px;
  height: 16px;
  color: #666;
}

.breadcrumb-item {
  color: #666;
}

.breadcrumb-item.active {
  color: #1890ff;
}

.breadcrumb-separator {
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

.settings-card {
  background: #fff;
  border-radius: 4px;
  margin-bottom: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.card-header {
  padding: 16px 20px;
  border-bottom: 1px solid #f0f0f0;
}

.card-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.card-body {
  padding: 20px;
}

.settings-row {
  margin-bottom: 20px;
}

.settings-row:last-child {
  margin-bottom: 0;
}

.settings-item {
  display: flex;
  align-items: flex-start;
}

.settings-label {
  width: 150px;
  font-size: 14px;
  color: #333;
  padding-top: 6px;
}

.settings-input-group {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 12px;
}

.form-input {
  height: 32px;
  padding: 0 12px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-size: 14px;
  outline: none;
  width: 200px;
}

.form-input:focus {
  border-color: #1890ff;
}

.input-tip {
  font-size: 12px;
  color: #999;
}

.switch-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
}

.switch {
  width: 44px;
  height: 22px;
  background: #bfbfbf;
  border-radius: 11px;
  position: relative;
  cursor: pointer;
  transition: background 0.3s;
}

.switch.active {
  background: #1890ff;
}

.switch-dot {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 18px;
  height: 18px;
  background: #fff;
  border-radius: 50%;
  transition: transform 0.3s;
}

.switch.active .switch-dot {
  transform: translateX(22px);
}

.switch-text {
  font-size: 14px;
  color: #666;
}

.template-tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
}

.tab-btn {
  padding: 8px 16px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  background: #fff;
  font-size: 14px;
  color: #666;
  cursor: pointer;
  transition: all 0.3s;
}

.tab-btn:hover {
  color: #1890ff;
  border-color: #1890ff;
}

.tab-btn.active {
  background: #1890ff;
  color: #fff;
  border-color: #1890ff;
}

.template-content {
  background: #fafafa;
  padding: 20px;
  border-radius: 4px;
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
  padding: 8px 12px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-size: 14px;
  outline: none;
  resize: vertical;
  min-height: 100px;
}

.form-textarea:focus {
  border-color: #1890ff;
}

.template-vars {
  display: flex;
  gap: 8px;
  margin-top: 8px;
  flex-wrap: wrap;
}

.var-tag {
  padding: 4px 8px;
  background: #e6f7ff;
  color: #1890ff;
  border-radius: 2px;
  font-size: 12px;
  cursor: pointer;
}

.var-tag:hover {
  background: #bae7ff;
}

.action-bar {
  display: flex;
  justify-content: flex-end;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 40px;
  padding: 0 24px;
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

.btn-icon {
  width: 16px;
  height: 16px;
}
</style>
