<template>
  <div class="page-container">
    <!-- 面包屑导航 -->
    <div class="breadcrumb">
      <div class="breadcrumb-arrow" @click="goBack">
        <svg viewBox="0 0 24 24" fill="none" stroke="#999" xmlns="http://www.w3.org/2000/svg">
          <polyline points="15 18 9 12 15 6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <span class="breadcrumb-item">民生诉求</span>
      <span class="breadcrumb-separator">›</span>
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
              <span class="input-tip">超过此时效未回复将自动标记为超期</span>
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
        <div class="settings-row">
          <div class="settings-item">
            <label class="settings-label">自动预警</label>
            <div class="settings-input-group">
              <div class="switch-wrapper">
                <span :class="['switch', settings.autoWarning ? 'active' : '']" @click="settings.autoWarning = !settings.autoWarning">
                  <span class="switch-dot"></span>
                </span>
                <span class="switch-text">{{ settings.autoWarning ? '开启' : '关闭' }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="settings-row" v-if="settings.autoWarning">
          <div class="settings-item">
            <label class="settings-label">预警时间（分钟）</label>
            <div class="settings-input-group">
              <input type="number" class="form-input" v-model="settings.warningTime" min="1">
              <span class="input-tip">提前几分钟自动弹窗预警提示</span>
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
      </div>
    </div>

    <!-- 操作按钮 -->
    <div class="footer-actions">
      <button class="btn btn-primary" @click="saveSettings">保存设置</button>
      <button class="btn btn-secondary" @click="goBack">取消</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const settings = ref({
  complaintDeadline: 7,
  autoRemind: true,
  remindInterval: 2,
  autoWarning: true,
  warningTime: 5,
  emailNotify: true
})

const goBack = () => {
  window.history.back()
}

const saveSettings = () => {
  alert('设置保存成功！')
}
</script>

<style scoped>
.page-container {
  padding: 24px;
  background-color: #f0f2f5;
  min-height: 100%;
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

.breadcrumb-item.active {
  color: #666;
}

.breadcrumb-separator {
  margin: 0 8px;
  color: #999;
}

.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.page-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.settings-card {
  background-color: #fff;
  border-radius: 4px;
  margin-bottom: 20px;
  border: 1px solid #f0f0f0;
}

.card-header {
  padding: 12px 20px;
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

.footer-actions {
  margin-top: 24px;
  display: flex;
  gap: 12px;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  height: 32px;
  padding: 0 20px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-primary {
  background-color: #1890ff;
  color: #fff;
}

.btn-primary:hover {
  background-color: #40a9ff;
}

.btn-secondary {
  background-color: #fff;
  color: #333;
  border: 1px solid #d9d9d9;
}

.btn-secondary:hover {
  color: #1890ff;
  border-color: #1890ff;
}
</style>
