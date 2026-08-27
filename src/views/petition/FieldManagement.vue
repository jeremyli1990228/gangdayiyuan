<template>
  <div class="page-container">
    <div class="breadcrumb">
      <span class="breadcrumb-item">
        <svg class="breadcrumb-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </span>
      <span class="breadcrumb-separator">/</span>
      <router-link to="/petition/all" class="breadcrumb-item">民生诉求</router-link>
      <span class="breadcrumb-separator">/</span>
      <span class="breadcrumb-item active">工单字段配置</span>
    </div>

    <div class="page-header">
      <h1 class="page-title">工单字段配置</h1>
      <div class="header-actions">
        <template v-if="!isEditing">
          <button class="btn btn-primary" @click="enterEditMode">
            <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            编辑配置
          </button>
        </template>
        <template v-else>
          <button class="btn btn-primary" @click="saveConfig">
            <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M5 13l4 4L19 7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            保存配置
          </button>
          <button class="btn btn-default" @click="cancelEdit">
            取消
          </button>
        </template>
      </div>
    </div>

    <div class="config-content">
      <div 
        v-for="section in sections" 
        :key="section.key" 
        class="config-section"
        :class="{ 'collapsed': collapsedSections.includes(section.key) }"
      >
        <div class="section-header" @click="toggleSection(section.key)">
          <div class="section-title-row">
            <svg class="chevron-icon" :class="{ 'rotated': !collapsedSections.includes(section.key) }" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M9 18L15 12L9 6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <h3 class="section-title">{{ section.title }}</h3>
            <span class="config-type-badge" :class="{ 'group-level': isEditing }">
              {{ isEditing ? '分组级配置' : '字段级配置' }}
            </span>
          </div>
        </div>

        <div class="section-body" v-show="!collapsedSections.includes(section.key)">
          <table class="field-table">
            <thead>
              <tr>
                <th class="col-name">字段名称</th>
                <th class="col-required">必须</th>
                <th class="col-display">显示</th>
                <th class="col-required-field">必填</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="field in section.fields" :key="field.key" class="field-row">
                <td class="col-name">
                  <span class="field-name">{{ field.name }}</span>
                </td>
                <td class="col-required">
                  <span v-if="field.required" class="required-badge">是</span>
                  <span v-else class="optional-text">否</span>
                </td>
                <td class="col-display">
                  <label class="checkbox-wrapper" :class="{ disabled: !isEditing || field.required }">
                    <input 
                      type="checkbox" 
                      :checked="field.display" 
                      :disabled="!isEditing" 
                      @change="toggleField(field, 'display')"
                    />
                    <span class="checkbox-custom"></span>
                  </label>
                </td>
                <td class="col-required-field">
                  <label class="checkbox-wrapper" :class="{ disabled: !isEditing || field.required }">
                    <input 
                      type="checkbox" 
                      :checked="field.requiredField" 
                      :disabled="!isEditing || field.required" 
                      @change="toggleField(field, 'requiredField')"
                    />
                    <span class="checkbox-custom"></span>
                  </label>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watch } from 'vue'

const STORAGE_KEY = 'petition_ticket_field_config'

const defaultSections = [
  {
    key: 'patient',
    title: '患者信息',
    fields: [
      { key: 'patientName', name: '患者姓名', required: false, display: true, requiredField: false },
      { key: 'patientNo', name: '病人号', required: false, display: true, requiredField: false }
    ]
  },
  {
    key: 'feedback',
    title: '反馈人信息',
    fields: [
      { key: 'feedbackName', name: '反馈人（信访人）', required: true, display: true, requiredField: true },
      { key: 'feedbackPhone', name: '反馈人手机号', required: true, display: true, requiredField: true }
    ]
  },
  {
    key: 'ticket',
    title: '工单信息',
    fields: [
      { key: 'signDate', name: '签收日期', required: true, display: true, requiredField: true },
      { key: 'source', name: '工单平台来源', required: true, display: true, requiredField: true },
      { key: 'ticketNo', name: '工单编号', required: true, display: true, requiredField: true },
      { key: 'category', name: '工单分类', required: true, display: true, requiredField: true },
      { key: 'urgency', name: '紧急程度', required: true, display: true, requiredField: true },
      { key: 'purpose', name: '诉求目的', required: true, display: true, requiredField: true },
      { key: 'problemSource', name: '问题来源', required: true, display: true, requiredField: true },
      { key: 'description', name: '诉求（问题描述）', required: true, display: true, requiredField: true },
      { key: 'department', name: '涉及科室', required: true, display: true, requiredField: true },
      { key: 'link', name: '涉及环节', required: false, display: true, requiredField: false }
    ]
  },
  {
    key: 'reply',
    title: '答复与评价',
    fields: [
      { key: 'replyTime', name: '工单答复时间', required: true, display: true, requiredField: true },
      { key: 'replyContent', name: '答复内容', required: true, display: true, requiredField: true },
      { key: 'isBadReview', name: '是否差评', required: true, display: true, requiredField: true },
      { key: 'badReviewContent', name: '差评内容', required: false, display: true, requiredField: false }
    ]
  },
  {
    key: 'medical',
    title: '病历摘要',
    fields: [
      { key: 'content', name: '病历摘要', required: false, display: true, requiredField: false }
    ]
  },
  {
    key: 'followup',
    title: '跟进记录',
    fields: [
      { key: 'investigationRecord', name: '跟进记录', required: true, display: true, requiredField: true }
    ]
  },
  {
    key: 'result',
    title: '处理结果',
    fields: [
      { key: 'processResult', name: '处理结果（多选）', required: true, display: true, requiredField: true }
    ]
  },
  {
    key: 'attachment',
    title: '上传附件',
    fields: [
      { key: 'file', name: '附件', required: false, display: true, requiredField: false }
    ]
  }
]

const loadConfig = () => {
  const defaults = JSON.parse(JSON.stringify(defaultSections))
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      const parsed = JSON.parse(saved)
      // 合并：只保留默认配置中存在的 section 和字段，避免历史遗留字段残留
      return defaults.map(defSec => {
        const savedSec = parsed.find(s => s.key === defSec.key)
        if (!savedSec) return defSec
        return {
          ...defSec,
          fields: defSec.fields.map(defField => {
            const savedField = savedSec.fields.find(f => f.key === defField.key)
            return savedField ? savedField : defField
          })
        }
      })
    }
  } catch (e) {
    console.error('Failed to load config:', e)
  }
  return defaults
}

const sections = reactive(loadConfig())
const collapsedSections = ref([])
const isEditing = ref(false)
const savedBackup = ref(null)

const toggleSection = (key) => {
  const index = collapsedSections.value.indexOf(key)
  if (index > -1) {
    collapsedSections.value.splice(index, 1)
  } else {
    collapsedSections.value.push(key)
  }
}

const enterEditMode = () => {
  savedBackup.value = JSON.parse(JSON.stringify(sections))
  isEditing.value = true
}

const cancelEdit = () => {
  if (savedBackup.value) {
    Object.assign(sections, savedBackup.value)
  }
  savedBackup.value = null
  isEditing.value = false
}

const saveConfig = () => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sections))
  } catch (e) {
    console.error('Failed to save config:', e)
  }
  savedBackup.value = null
  isEditing.value = false
}

const toggleField = (field, property) => {
  if (field.required) return
  field[property] = !field[property]
}

watch(sections, () => {}, { deep: true })
</script>

<style scoped>
.page-container {
  padding: 0;
  background-color: #f5f7fa;
  min-height: 100vh;
}

.breadcrumb {
  display: flex;
  align-items: center;
  padding: 12px 24px;
  background-color: #fff;
  border-bottom: 1px solid #e8e8e8;
  font-size: 14px;
  color: #666;
}

.breadcrumb-icon {
  width: 16px;
  height: 16px;
  color: #666;
}

.breadcrumb-separator {
  margin: 0 8px;
  color: #ccc;
}

.breadcrumb-item {
  color: #666;
  text-decoration: none;
  font-size: 14px;
}

.breadcrumb-item:hover {
  color: #1890ff;
}

.breadcrumb-item.active {
  color: #1890ff;
}

.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
  background-color: #fff;
  border-bottom: 1px solid #e8e8e8;
}

.page-title {
  font-size: 20px;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.header-actions {
  display: flex;
  gap: 12px;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 20px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid transparent;
}

.btn-primary {
  background-color: #1890ff;
  color: #fff;
  border-color: #1890ff;
}

.btn-primary:hover {
  background-color: #40a9ff;
  border-color: #40a9ff;
}

.btn-default {
  background-color: #fff;
  color: #666;
  border-color: #d9d9d9;
}

.btn-default:hover {
  color: #1890ff;
  border-color: #1890ff;
}

.btn-icon {
  width: 16px;
  height: 16px;
}

.config-content {
  padding: 16px 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.config-section {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
  overflow: hidden;
}

.section-header {
  display: flex;
  align-items: center;
  padding: 16px 20px;
  cursor: pointer;
  user-select: none;
  transition: background-color 0.2s;
}

.section-header:hover {
  background-color: #fafafa;
}

.section-title-row {
  display: flex;
  align-items: center;
  gap: 10px;
}

.chevron-icon {
  width: 16px;
  height: 16px;
  color: #999;
  transition: transform 0.2s;
}

.chevron-icon.rotated {
  transform: rotate(90deg);
}

.section-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.config-type-badge {
  display: inline-block;
  padding: 2px 10px;
  border-radius: 10px;
  font-size: 12px;
  font-weight: 500;
  background-color: #e6f7ff;
  color: #1890ff;
}

.config-type-badge.group-level {
  background-color: #fff7e6;
  color: #fa8c16;
}

.section-body {
  padding: 0 20px 16px;
}

.field-table {
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #e8e8e8;
  border-radius: 4px;
  overflow: hidden;
}

.field-table th,
.field-table td {
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid #f0f0f0;
}

.field-table th {
  background-color: #fafafa;
  font-size: 13px;
  font-weight: 600;
  color: #666;
}

.field-table td {
  font-size: 14px;
  color: #333;
}

.field-table tr:last-child td {
  border-bottom: none;
}

.col-name {
  width: auto;
}

.col-required {
  width: 80px;
  text-align: center;
}

.col-display {
  width: 80px;
  text-align: center;
}

.col-required-field {
  width: 80px;
  text-align: center;
}

.required-badge {
  display: inline-block;
  padding: 2px 10px;
  border-radius: 4px;
  background-color: #fff1f0;
  color: #f5222d;
  font-size: 12px;
  font-weight: 600;
}

.optional-text {
  color: #999;
  font-size: 13px;
}

.checkbox-wrapper {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
}

.checkbox-wrapper input[type="checkbox"] {
  position: absolute;
  opacity: 0;
  cursor: pointer;
}

.checkbox-custom {
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 1px solid #d9d9d9;
  border-radius: 3px;
  background-color: #fff;
  transition: all 0.2s;
  position: relative;
}

.checkbox-wrapper input[type="checkbox"]:checked + .checkbox-custom {
  background-color: #1890ff;
  border-color: #1890ff;
}

.checkbox-wrapper input[type="checkbox"]:checked + .checkbox-custom::after {
  content: '';
  position: absolute;
  left: 4px;
  top: 1px;
  width: 5px;
  height: 9px;
  border: solid #fff;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.checkbox-wrapper.disabled {
  cursor: not-allowed;
}

.checkbox-wrapper.disabled .checkbox-custom {
  opacity: 0.5;
}

.field-name {
  color: #333;
  font-weight: 400;
}
</style>
