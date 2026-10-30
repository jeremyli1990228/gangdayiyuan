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
        <transition name="collapse">
          <div class="settings-row recipient-row" v-if="settings.emailNotify">
            <div class="settings-item">
              <label class="settings-label">收件人</label>
              <div class="settings-input-group">
                <div class="recipient-picker" ref="pickerRef">
                  <div class="recipient-trigger" @click.stop="togglePicker">
                    <template v-if="recipients.length">
                      <span class="recipient-tag" v-for="r in recipients" :key="r.email">
                        {{ r.name }}
                        <span class="tag-close" @click.stop="removeRecipient(r.email)">×</span>
                      </span>
                    </template>
                    <span class="recipient-placeholder" v-else>请选择收件人</span>
                    <svg class="picker-arrow" :class="{ open: pickerOpen }" viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <polyline points="6 9 12 15 18 9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </div>
                  <div class="picker-panel" v-if="pickerOpen">
                    <div class="picker-search">
                      <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="11" cy="11" r="7" stroke-width="2"/>
                        <path d="M21 21L16.65 16.65" stroke-width="2" stroke-linecap="round"/>
                      </svg>
                      <input type="text" class="picker-search-input" v-model="pickerKeyword" placeholder="请输入内容"/>
                    </div>
                    <div class="picker-body">
                      <template v-if="pickerKeyword.trim()">
                        <div class="picker-result-list">
                          <div class="picker-result-item" v-for="m in searchMembers" :key="m.email" @click="toggleRecipient(m)">
                            <div class="result-info">
                              <div class="result-name">{{ m.name }}</div>
                              <div class="result-mail">{{ m.email }}</div>
                            </div>
                            <span class="picker-check" v-if="isSelected(m.email)">✓</span>
                          </div>
                          <div class="picker-empty" v-if="searchMembers.length === 0">无匹配人员</div>
                        </div>
                      </template>
                      <template v-else>
                        <div class="picker-col">
                          <div class="picker-col-item" v-for="d in recipientTree" :key="d.name"
                            :class="{ active: d.name === activeRootName }"
                            @click="selectRoot(d.name)">
                            <span>{{ d.name }}</span>
                            <span class="col-arrow">›</span>
                          </div>
                        </div>
                        <div class="picker-col" v-if="activeRoot">
                          <div class="picker-col-item" v-for="s in activeRoot.children" :key="s.name"
                            :class="{ active: s.name === activeSubName }"
                            @click="activeSubName = s.name">
                            <span>{{ s.name }}</span>
                            <span class="col-arrow">›</span>
                          </div>
                        </div>
                        <div class="picker-col picker-col-members" v-if="activeSub">
                          <div class="picker-member" v-for="m in activeSub.members" :key="m.email" @click="toggleRecipient(m)">
                            <span class="member-name">{{ m.name }}</span>
                            <span class="picker-check" v-if="isSelected(m.email)">✓</span>
                          </div>
                          <div class="picker-empty" v-if="activeSub.members.length === 0">该部门暂无人员</div>
                        </div>
                      </template>
                    </div>
                  </div>
                </div>
                <span class="input-tip">开启邮件通知后，新反馈将发送至所选收件人邮箱</span>
              </div>
            </div>
          </div>
        </transition>
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
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useHandleResultTemplates } from '../../composables/useHandleResultTemplates'

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

// 邮件通知 - 收件人选择
const recipientTree = [
  {
    name: '服务测试',
    children: [
      { name: '医疗改善部', members: [
        { name: '王小明', email: 'wangxiaoming@hku-szh.org' },
        { name: '付世平', email: 'fushingping@hku-szh.org' }
      ] },
      { name: '门诊', members: [
        { name: '李静', email: 'lijing@hku-szh.org' },
        { name: '陈慧', email: 'chenhui@hku-szh.org' }
      ] },
      { name: '医疗关系部', members: [
        { name: '张伟', email: 'zhangwei@hku-szh.org' },
        { name: '刘敏', email: 'liumin@hku-szh.org' }
      ] },
      { name: '测试心血管内科', members: [
        { name: '赵磊', email: 'zhaolei@hku-szh.org' }
      ] },
      { name: '机构事务部', members: [
        { name: '周倩', email: 'zhouqian@hku-szh.org' }
      ] }
    ]
  },
  {
    name: '医务管理部',
    children: [
      { name: '医务科', members: [
        { name: '孙强', email: 'sunqiang@hku-szh.org' },
        { name: '吴倩', email: 'wuqian@hku-szh.org' }
      ] },
      { name: '质控科', members: [
        { name: '郑楠', email: 'zhengnan@hku-szh.org' }
      ] }
    ]
  },
  {
    name: '护理部',
    children: [
      { name: '护理管理组', members: [
        { name: '林芳', email: 'linfang@hku-szh.org' },
        { name: '何敏', email: 'hemin@hku-szh.org' }
      ] }
    ]
  }
]

const recipients = ref([])
const pickerOpen = ref(false)
const pickerKeyword = ref('')
const activeRootName = ref(recipientTree[0].name)
const activeSubName = ref(recipientTree[0].children[0].name)

const activeRoot = computed(() => recipientTree.find(d => d.name === activeRootName.value) || null)
const activeSub = computed(() => activeRoot.value?.children.find(s => s.name === activeSubName.value) || null)
const allMembers = computed(() =>
  recipientTree.flatMap(d => d.children.flatMap(s => s.members.map(m => ({ ...m, dept: s.name }))))
)
const searchMembers = computed(() => {
  const k = pickerKeyword.value.trim().toLowerCase()
  if (!k) return []
  return allMembers.value.filter(m =>
    m.name.toLowerCase().includes(k) ||
    m.email.toLowerCase().includes(k) ||
    m.dept.toLowerCase().includes(k)
  )
})

const togglePicker = () => {
  if (!pickerOpen.value) pickerKeyword.value = ''
  pickerOpen.value = !pickerOpen.value
}

const selectRoot = (name) => {
  activeRootName.value = name
  const root = recipientTree.find(d => d.name === name)
  activeSubName.value = root?.children[0]?.name || ''
}

const isSelected = (email) => recipients.value.some(r => r.email === email)

const toggleRecipient = (member) => {
  const idx = recipients.value.findIndex(r => r.email === member.email)
  if (idx > -1) {
    recipients.value.splice(idx, 1)
  } else {
    recipients.value.push({ name: member.name, email: member.email, dept: member.dept })
  }
}

const removeRecipient = (email) => {
  const idx = recipients.value.findIndex(r => r.email === email)
  if (idx > -1) recipients.value.splice(idx, 1)
}

// 点击选择器外部或按 Esc 关闭弹窗
const pickerRef = ref(null)
const handleOutsideClick = (e) => {
  if (!pickerOpen.value) return
  if (pickerRef.value && !pickerRef.value.contains(e.target)) pickerOpen.value = false
}
const handleEsc = (e) => {
  if (e.key === 'Escape') pickerOpen.value = false
}
onMounted(() => {
  document.addEventListener('mousedown', handleOutsideClick)
  document.addEventListener('keydown', handleEsc)
})
onBeforeUnmount(() => {
  document.removeEventListener('mousedown', handleOutsideClick)
  document.removeEventListener('keydown', handleEsc)
})

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

/* 邮件通知 - 收件人 */
.recipient-picker {
  position: relative;
  width: 420px;
  max-width: 100%;
}

.recipient-trigger {
  position: relative;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 6px;
  min-height: 32px;
  padding: 4px 28px 4px 8px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  background: #fff;
  cursor: pointer;
  transition: border-color 0.2s;
}

.recipient-trigger:hover {
  border-color: #1890ff;
}

.recipient-placeholder {
  font-size: 14px;
  color: #bfbfbf;
}

.recipient-tag {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  height: 22px;
  padding: 0 6px;
  background: #e6f7ff;
  border: 1px solid #91d5ff;
  border-radius: 3px;
  font-size: 12px;
  color: #1890ff;
}

.tag-close {
  font-size: 13px;
  line-height: 1;
  cursor: pointer;
}

.tag-close:hover {
  color: #ff4d4f;
}

.picker-arrow {
  position: absolute;
  right: 8px;
  top: 50%;
  width: 14px;
  height: 14px;
  color: #bfbfbf;
  transform: translateY(-50%);
  transition: transform 0.2s;
}

.picker-arrow.open {
  transform: translateY(-50%) rotate(180deg);
}

.picker-panel {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  width: 560px;
  max-width: 70vw;
  background: #fff;
  border: 1px solid #e8e8e8;
  border-radius: 4px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
  z-index: 1001;
  overflow: hidden;
}

.picker-search {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 10px;
  border-bottom: 1px solid #f0f0f0;
}

.search-icon {
  width: 14px;
  height: 14px;
  color: #bfbfbf;
  flex-shrink: 0;
}

.picker-search-input {
  flex: 1;
  min-width: 0;
  height: 26px;
  border: none;
  outline: none;
  font-size: 13px;
  color: #333;
}

.picker-body {
  display: flex;
  max-height: 280px;
  overflow: hidden;
}

.picker-col {
  flex: 1;
  min-width: 0;
  max-height: 280px;
  overflow-y: auto;
  padding: 4px 0;
  border-right: 1px solid #f0f0f0;
}

.picker-col:last-child {
  border-right: none;
}

.picker-col-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 7px 12px;
  font-size: 13px;
  color: #333;
  cursor: pointer;
}

.picker-col-item:hover {
  background: #f5f9ff;
}

.picker-col-item.active {
  background: #e6f7ff;
  color: #1890ff;
  font-weight: 500;
}

.col-arrow {
  color: #bfbfbf;
}

.picker-member {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 7px 12px;
  font-size: 13px;
  color: #333;
  cursor: pointer;
}

.picker-member:hover {
  background: #f5f9ff;
}

.picker-check {
  color: #1890ff;
  font-weight: 600;
}

.picker-result-list {
  width: 100%;
  max-height: 280px;
  overflow-y: auto;
  padding: 4px 0;
}

.picker-result-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  cursor: pointer;
}

.picker-result-item:hover {
  background: #f5f9ff;
}

.result-name {
  font-size: 13px;
  color: #333;
}

.result-mail {
  font-size: 12px;
  color: #999;
  margin-top: 2px;
}

.picker-empty {
  text-align: center;
  color: #bfbfbf;
  font-size: 12px;
  padding: 16px 0;
}

.collapse-enter-active,
.collapse-leave-active {
  transition: opacity 0.22s ease, max-height 0.22s ease, margin-bottom 0.22s ease;
  overflow: hidden;
}

.collapse-enter-from,
.collapse-leave-to {
  opacity: 0;
  max-height: 0;
  margin-bottom: 0;
}

.collapse-enter-to,
.collapse-leave-from {
  opacity: 1;
  max-height: 120px;
}
</style>
