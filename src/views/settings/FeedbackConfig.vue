<template>
  <div class="page-container">
    <div class="breadcrumb">
      <div class="breadcrumb-arrow" @click="goBack">
        <svg viewBox="0 0 24 24" fill="none" stroke="#999" xmlns="http://www.w3.org/2000/svg">
          <polyline points="15 18 9 12 15 6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <span class="breadcrumb-item">设置</span>
      <span class="breadcrumb-separator">›</span>
      <span class="breadcrumb-item active">反馈设置</span>
    </div>

    <div class="page-header">
      <h1 class="page-title">反馈配置</h1>
    </div>

    <div class="settings-card">
      <div class="card-header">
        <h3 class="card-title">基础设置</h3>
      </div>
      <div class="card-body">
        <div class="settings-row">
          <div class="settings-item">
            <label class="settings-label">自动催促</label>
            <div class="settings-input-group">
              <div class="switch-wrapper">
                <span :class="['switch', settings.autoRemind ? 'active' : '']" @click="toggleSetting('autoRemind')">
                  <span class="switch-dot"></span>
                </span>
              </div>
              <span class="input-tip">是否启用自动提醒功能</span>
            </div>
          </div>
        </div>

        <div class="settings-row" :class="{ disabled: !isEditing && !settings.autoRemind }">
          <div class="settings-item">
            <label class="settings-label">临期催促天数（天）</label>
            <div class="settings-input-group">
              <input
                type="number"
                class="form-input"
                v-model.number="settings.remindDays"
                min="1"
                :disabled="!isEditing"
              >
              <span class="input-tip">距离截止时间多少天开始发送催促提醒</span>
            </div>
          </div>
        </div>

        <div class="settings-row" :class="{ disabled: !isEditing && !settings.autoRemind }">
          <div class="settings-item">
            <label class="settings-label">催促间隔（天）</label>
            <div class="settings-input-group">
              <input
                type="number"
                class="form-input"
                v-model.number="settings.remindInterval"
                min="1"
                :disabled="!isEditing"
              >
              <span class="input-tip">每隔几天发送一次催促提醒</span>
            </div>
          </div>
        </div>

        <div class="settings-row">
          <div class="settings-item">
            <label class="settings-label">自动预警</label>
            <div class="settings-input-group">
              <div class="switch-wrapper">
                <span :class="['switch', settings.autoWarning ? 'active' : '']" @click="toggleSetting('autoWarning')">
                  <span class="switch-dot"></span>
                </span>
              </div>
              <span class="input-tip">超期和临期案件自动预警提醒</span>
            </div>
          </div>
        </div>

        <div class="settings-row" :class="{ disabled: !isEditing && !settings.autoWarning }">
          <div class="settings-item">
            <label class="settings-label">预警时间（分钟）</label>
            <div class="settings-input-group">
              <input
                type="number"
                class="form-input"
                v-model.number="settings.warningTime"
                min="1"
                :disabled="!isEditing"
              >
              <span class="input-tip">提前几分钟自动弹窗预警提示</span>
            </div>
          </div>
        </div>

      </div>
    </div>

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
                <span :class="['switch', settings.emailNotify ? 'active' : '']" @click="toggleSetting('emailNotify')">
                  <span class="switch-dot"></span>
                </span>
              </div>
              <span class="input-tip">催促提醒时向系统内人员发送邮件通知</span>
            </div>
          </div>
        </div>

      </div>
    </div>

    <div class="action-bar">
      <template v-if="!isEditing">
        <button class="btn btn-primary" @click="enterEditMode">编辑设置</button>
      </template>
      <template v-else>
        <button class="btn btn-primary" @click="saveSettings">保存设置</button>
        <button class="btn btn-default" @click="cancelEdit">取消</button>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const goBack = () => { window.history.back() }

const STORAGE_KEY = 'feedback_config'

const defaultSettings = {
  autoRemind: true,
  remindDays: 3,
  remindInterval: 2,
  autoWarning: true,
  warningTime: 5,
  emailNotify: true
}

const loadSettings = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      return JSON.parse(saved)
    }
  } catch (e) {
    console.error('Failed to load config:', e)
  }
  return JSON.parse(JSON.stringify(defaultSettings))
}

const settings = reactive(loadSettings())
const isEditing = ref(false)
const savedBackup = ref(null)

const toggleSetting = (key) => {
  if (!isEditing.value) return
  settings[key] = !settings[key]
}

const enterEditMode = () => {
  savedBackup.value = JSON.parse(JSON.stringify(settings))
  isEditing.value = true
}

const cancelEdit = () => {
  if (savedBackup.value) {
    Object.assign(settings, savedBackup.value)
  }
  savedBackup.value = null
  isEditing.value = false
}

const saveSettings = () => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
  } catch (e) {
    console.error('Failed to save config:', e)
  }
  savedBackup.value = null
  isEditing.value = false
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

.breadcrumb-arrow svg { width: 16px; height: 16px; }
.breadcrumb-item { color: #333; font-size: 14px; }
.breadcrumb-item.active { color: #666; }
.breadcrumb-separator { margin: 0 8px; color: #999; }

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

.settings-row.disabled {
  opacity: 0.5;
}

.settings-item {
  display: flex;
  align-items: flex-start;
}

.settings-label {
  width: 160px;
  font-size: 14px;
  color: #333;
  padding-top: 6px;
  text-align: right;
  padding-right: 16px;
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

.form-input:disabled {
  background: #f5f5f5;
  color: #999;
  cursor: not-allowed;
}

.form-select {
  height: 32px;
  padding: 0 12px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-size: 14px;
  outline: none;
  min-width: 160px;
  background: #fff;
  cursor: pointer;
}

.form-select:focus {
  border-color: #1890ff;
}

.form-select:disabled {
  background: #f5f5f5;
  color: #999;
  cursor: not-allowed;
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
  flex-shrink: 0;
}

.switch.active {
  background: #52c41a;
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

.action-bar {
  display: flex;
  justify-content: flex-start;
  gap: 12px;
  padding-top: 8px;
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

.btn-default {
  background: #fff;
  color: #333;
  border: 1px solid #d9d9d9;
}

.btn-default:hover {
  border-color: #1890ff;
  color: #1890ff;
}

.btn-icon {
  width: 16px;
  height: 16px;
}
</style>
