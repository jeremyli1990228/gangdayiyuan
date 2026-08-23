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

    <!-- 处理结果模板配置 -->
    <div class="settings-card">
      <div class="card-header">
        <h3 class="card-title">处理结果模板配置</h3>
      </div>
      <div class="card-body">
        <div class="template-tabs">
          <button :class="['tab-btn', handleResultTab === 'resolved' ? 'active' : '']" @click="handleResultTab = 'resolved'">已解决</button>
          <button :class="['tab-btn', handleResultTab === 'processing' ? 'active' : '']" @click="handleResultTab = 'processing'">处理中</button>
          <button :class="['tab-btn', handleResultTab === 'rejected' ? 'active' : '']" @click="handleResultTab = 'rejected'">不予受理</button>
        </div>
        <div class="handle-template-list">
          <div class="handle-template-row" v-for="tpl in handleResultTemplates[handleResultTab]" :key="tpl.id">
            <div class="handle-template-info">
              <div class="handle-template-name">
                {{ tpl.name }}
                <span class="default-tag" v-if="tpl.isDefault">默认</span>
              </div>
              <div class="handle-template-content">{{ tpl.content }}</div>
            </div>
            <div class="handle-template-actions">
              <div class="switch-wrapper">
                <span :class="['switch', tpl.enabled ? 'active' : '']" @click="tpl.enabled = !tpl.enabled">
                  <span class="switch-dot"></span>
                </span>
              </div>
              <button class="text-btn" @click="openEditTemplate(tpl)">编辑</button>
              <button class="text-btn danger" @click="deleteHandleTemplate(tpl.id)">删除</button>
            </div>
          </div>
          <div class="empty-tip" v-if="handleResultTemplates[handleResultTab].length === 0">
            暂无模板，请点击下方按钮添加
          </div>
        </div>
        <button class="btn btn-outline" @click="openAddTemplate">+ 新增模板</button>
      </div>
    </div>

    <!-- 模板编辑弹窗 -->
    <div class="modal-overlay" v-if="showTemplateModal" @click="showTemplateModal = false">
      <div class="modal" @click.stop>
        <div class="modal-header">
          <h3 class="modal-title">{{ editingTemplate.id ? '编辑模板' : '新增模板' }}</h3>
          <button class="modal-close" @click="showTemplateModal = false">×</button>
        </div>
        <div class="modal-body">
          <div class="form-item">
            <label class="form-label">模板名称</label>
            <input type="text" class="form-input" v-model="editingTemplate.name" placeholder="请输入模板名称" style="width: 100%;">
          </div>
          <div class="form-item">
            <label class="form-label">模板内容</label>
            <textarea class="form-textarea" v-model="editingTemplate.content" placeholder="请输入模板内容（纯文本）" rows="6"></textarea>
          </div>
          <div class="form-item">
            <label class="form-label">设为默认</label>
            <div class="switch-wrapper">
              <span :class="['switch', editingTemplate.isDefault ? 'active' : '']" @click="editingTemplate.isDefault = !editingTemplate.isDefault">
                <span class="switch-dot"></span>
              </span>
              <span class="switch-text">{{ editingTemplate.isDefault ? '是' : '否' }}</span>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" @click="showTemplateModal = false">取消</button>
          <button class="btn btn-primary" @click="saveHandleTemplate">保存</button>
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
import { useHandleResultTemplates } from '../../composables/useHandleResultTemplates'

const activeTab = ref('submit')

const settings = ref({
  complaintDeadline: 7,
  ratingDeadline: 30,
  autoRemind: true,
  remindInterval: 2,
  autoWarning: false,
  warningTime: 5,
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

// 处理结果模板配置
const { templates: handleResultTemplates, addTemplate, updateTemplate, deleteTemplate } = useHandleResultTemplates()

const handleResultTab = ref('resolved')
const showTemplateModal = ref(false)
const editingTemplate = ref({ name: '', content: '', isDefault: false })

const openAddTemplate = () => {
  editingTemplate.value = { name: '', content: '', isDefault: false }
  showTemplateModal.value = true
}

const openEditTemplate = (tpl) => {
  editingTemplate.value = { ...tpl }
  showTemplateModal.value = true
}

const saveHandleTemplate = () => {
  if (!editingTemplate.value.name || !editingTemplate.value.content) {
    alert('请填写模板名称和内容')
    return
  }
  if (editingTemplate.value.id) {
    updateTemplate(handleResultTab.value, editingTemplate.value.id, {
      name: editingTemplate.value.name,
      content: editingTemplate.value.content,
      isDefault: editingTemplate.value.isDefault
    })
  } else {
    addTemplate(handleResultTab.value, {
      name: editingTemplate.value.name,
      content: editingTemplate.value.content,
      isDefault: editingTemplate.value.isDefault,
      enabled: true
    })
  }
  showTemplateModal.value = false
}

const deleteHandleTemplate = (id) => {
  if (confirm('确定删除该模板？')) {
    deleteTemplate(handleResultTab.value, id)
  }
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

/* 处理结果模板配置 */
.handle-template-list {
  margin-bottom: 16px;
}

.handle-template-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border: 1px solid #f0f0f0;
  border-radius: 4px;
  margin-bottom: 8px;
  background: #fafafa;
}

.handle-template-info {
  flex: 1;
  min-width: 0;
  margin-right: 16px;
}

.handle-template-name {
  font-size: 14px;
  font-weight: 500;
  color: #333;
  margin-bottom: 4px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.default-tag {
  display: inline-block;
  padding: 1px 6px;
  background: #e6f7ff;
  color: #1890ff;
  border-radius: 2px;
  font-size: 12px;
  font-weight: normal;
}

.handle-template-content {
  font-size: 13px;
  color: #666;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.handle-template-actions {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
}

.text-btn {
  background: none;
  border: none;
  color: #1890ff;
  font-size: 13px;
  cursor: pointer;
  padding: 0;
}

.text-btn:hover {
  color: #40a9ff;
}

.text-btn.danger {
  color: #ff4d4f;
}

.text-btn.danger:hover {
  color: #ff7875;
}

.empty-tip {
  text-align: center;
  color: #999;
  font-size: 14px;
  padding: 24px 0;
}

.btn-secondary {
  background: #fff;
  color: #333;
  border: 1px solid #d9d9d9;
}

.btn-secondary:hover {
  color: #1890ff;
  border-color: #1890ff;
}

.btn-outline {
  background: #fff;
  color: #1890ff;
  border: 1px dashed #1890ff;
}

.btn-outline:hover {
  background: #e6f7ff;
}

/* 模板编辑弹窗 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal {
  background: #fff;
  border-radius: 8px;
  width: 500px;
  max-width: 90vw;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-bottom: 1px solid #f0f0f0;
}

.modal-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.modal-close {
  background: none;
  border: none;
  font-size: 20px;
  color: #999;
  cursor: pointer;
  padding: 0;
  line-height: 1;
}

.modal-close:hover {
  color: #333;
}

.modal-body {
  padding: 20px;
  overflow-y: auto;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  padding: 12px 20px;
  border-top: 1px solid #f0f0f0;
}

.modal-body .form-input {
  width: 100%;
}
</style>
