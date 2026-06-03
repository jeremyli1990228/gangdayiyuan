<template>
  <div class="warning-modal" v-if="isVisible" @click="closeModal">
    <div class="warning-container" @click.stop>
      <div class="warning-header">
        <div class="warning-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="#ff4d4f">
            <path d="M12 9v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <h2 class="warning-title">预警提醒</h2>
        <button class="close-btn" @click="closeModal">×</button>
      </div>
      
      <div class="warning-content">
        <!-- 临期案件提醒 -->
        <div class="warning-section" v-if="warnings.length > 0">
          <div class="section-header">
            <svg class="section-icon" viewBox="0 0 24 24" fill="none" stroke="#ff7a45">
              <circle cx="12" cy="12" r="10" stroke-width="2"/>
              <path d="M12 6v6l4 2" stroke-width="2" stroke-linecap="round"/>
            </svg>
            <span class="section-title">临期案件提醒 ({{ warnings.length }})</span>
          </div>
          
          <div class="warning-list">
            <div v-for="warning in warnings" :key="warning.id" class="warning-item">
              <div class="warning-main">
                <div class="warning-title">{{ warning.title }}</div>
                <div class="warning-meta">
                  <span class="deadline" :class="{ 'urgent': warning.isUrgent }">
                    剩余 {{ warning.remainingDays }} 天
                  </span>
                  <span class="department">{{ warning.department }}</span>
                  <span class="handler">负责人: {{ warning.handler }}</span>
                </div>
              </div>
              <div class="warning-actions">
                <button class="btn-action" @click="viewCase(warning)">查看详情</button>
                <button class="btn-action primary" @click="handleCase(warning)">立即处理</button>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 催促提醒 -->
        <div class="warning-section" v-if="reminders.length > 0">
          <div class="section-header">
            <svg class="section-icon" viewBox="0 0 24 24" fill="none" stroke="#faad14">
              <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span class="section-title">催促提醒 ({{ reminders.length }})</span>
          </div>
          
          <div class="reminder-list">
            <div v-for="reminder in reminders" :key="reminder.id" class="reminder-item">
              <div class="reminder-info">
                <div class="reminder-title">{{ reminder.title }}</div>
                <div class="reminder-desc">{{ reminder.description }}</div>
                <div class="reminder-time">催促时间: {{ reminder.reminderTime }}</div>
              </div>
              <div class="reminder-actions">
                <button class="btn-action" @click="sendReminder(reminder)">发送催促</button>
                <button class="btn-action" @click="ignoreReminder(reminder)">忽略</button>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 无预警 -->
        <div class="no-warning" v-if="warnings.length === 0 && reminders.length === 0">
          <svg class="success-icon" viewBox="0 0 24 24" fill="none" stroke="#52c41a">
            <circle cx="12" cy="12" r="10" stroke-width="2"/>
            <path d="M9 12l2 2 4-4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <div class="no-warning-text">暂无预警信息</div>
          <div class="no-warning-desc">所有案件处理正常</div>
        </div>
      </div>
      
      <div class="warning-footer">
        <button class="btn-link" @click="viewAllWarnings">查看全部预警</button>
        <button class="btn-close" @click="closeModal">关闭</button>
      </div>
    </div>
  </div>
  
  <!-- 未读预警数量提示 -->
  <div class="warning-badge" v-if="totalWarnings > 0 && !isVisible" @click="openModal">
    <span class="badge-count">{{ totalWarnings > 99 ? '99+' : totalWarnings }}</span>
    <span class="badge-text">预警提醒</span>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const isVisible = ref(false)

// 临期案件数据
const warnings = ref([
  {
    id: 1,
    title: '关于门诊就诊等候时间过长的投诉',
    remainingDays: 2,
    isUrgent: true,
    department: '门诊部',
    handler: '张三',
    dueDate: '2024-01-20'
  },
  {
    id: 2,
    title: '建议增加自助挂号机数量的建议',
    remainingDays: 5,
    isUrgent: false,
    department: '信息中心',
    handler: '李四',
    dueDate: '2024-01-23'
  },
  {
    id: 3,
    title: '医生诊疗服务咨询',
    remainingDays: 3,
    isUrgent: false,
    department: '医务部',
    handler: '王五',
    dueDate: '2024-01-21'
  }
])

// 催促提醒数据
const reminders = ref([
  {
    id: 1,
    title: '门诊部未回复',
    description: '关于门诊就诊等候时间投诉案件，科室已超过48小时未回复',
    reminderTime: '2024-01-18 10:00'
  },
  {
    id: 2,
    title: '信息中心待处理',
    description: '建议增加自助挂号机数量的建议，信息中心超过72小时未处理',
    reminderTime: '2024-01-17 14:30'
  }
])

const totalWarnings = computed(() => {
  return warnings.value.length + reminders.value.length
})

const openModal = () => {
  isVisible.value = true
}

const closeModal = () => {
  isVisible.value = false
}

const viewCase = (warning) => {
  console.log('查看案件详情:', warning)
  closeModal()
  // 可以跳转到案件详情页
  // router.push(`/case/detail/${warning.id}`)
}

const handleCase = (warning) => {
  console.log('立即处理案件:', warning)
  closeModal()
  // 可以跳转到案件处理页
  // router.push(`/case/handle/${warning.id}`)
}

const sendReminder = (reminder) => {
  console.log('发送催促:', reminder)
  alert('催促邮件已发送')
}

const ignoreReminder = (reminder) => {
  const index = reminders.value.findIndex(r => r.id === reminder.id)
  if (index > -1) {
    reminders.value.splice(index, 1)
  }
}

const viewAllWarnings = () => {
  console.log('查看全部预警')
  closeModal()
  // 可以跳转到预警列表页
  // router.push('/warnings')
}

// 暴露方法供外部调用
defineExpose({
  openModal,
  closeModal
})

// 自动弹出预警提醒（模拟）
setTimeout(() => {
  // 仅当有预警时自动弹出
  if (totalWarnings.value > 0) {
    // openModal()
  }
}, 3000)
</script>

<style scoped>
.warning-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
}

.warning-container {
  width: 560px;
  max-width: 90%;
  max-height: 80vh;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.warning-header {
  display: flex;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid #f0f0f0;
  gap: 12px;
}

.warning-icon svg {
  width: 32px;
  height: 32px;
}

.warning-title {
  flex: 1;
  font-size: 18px;
  font-weight: 500;
  color: #333;
  margin: 0;
}

.close-btn {
  width: 32px;
  height: 32px;
  border: none;
  background: none;
  font-size: 24px;
  color: #999;
  cursor: pointer;
  border-radius: 50%;
  transition: all 0.2s;
}

.close-btn:hover {
  background: #f5f5f5;
  color: #666;
}

.warning-content {
  flex: 1;
  overflow-y: auto;
  padding: 20px 24px;
}

.warning-section {
  margin-bottom: 24px;
}

.warning-section:last-child {
  margin-bottom: 0;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid #f0f0f0;
}

.section-icon {
  width: 20px;
  height: 20px;
}

.section-title {
  font-size: 15px;
  font-weight: 500;
  color: #333;
}

.warning-list,
.reminder-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.warning-item,
.reminder-item {
  padding: 16px;
  background: #fff7e6;
  border: 1px solid #ffd591;
  border-radius: 8px;
}

.warning-main {
  margin-bottom: 12px;
}

.warning-title,
.reminder-title {
  font-size: 14px;
  font-weight: 500;
  color: #333;
  margin-bottom: 8px;
}

.warning-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  font-size: 12px;
  color: #666;
}

.deadline {
  padding: 2px 8px;
  background: #fff7e6;
  color: #fa8c16;
  border-radius: 4px;
  font-weight: 500;
}

.deadline.urgent {
  background: #fff1f0;
  color: #ff4d4f;
}

.department,
.handler {
  color: #666;
}

.warning-actions,
.reminder-actions {
  display: flex;
  gap: 8px;
}

.btn-action {
  flex: 1;
  height: 32px;
  border: 1px solid #d9d9d9;
  background: #fff;
  border-radius: 4px;
  font-size: 13px;
  color: #666;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-action:hover {
  border-color: #1890ff;
  color: #1890ff;
}

.btn-action.primary {
  background: #ff4d4f;
  border-color: #ff4d4f;
  color: #fff;
}

.btn-action.primary:hover {
  background: #ff7875;
  border-color: #ff7875;
}

.reminder-info {
  margin-bottom: 12px;
}

.reminder-desc {
  font-size: 13px;
  color: #666;
  margin-bottom: 6px;
}

.reminder-time {
  font-size: 12px;
  color: #999;
}

.no-warning {
  text-align: center;
  padding: 40px 20px;
}

.success-icon {
  width: 64px;
  height: 64px;
  margin-bottom: 16px;
}

.no-warning-text {
  font-size: 16px;
  font-weight: 500;
  color: #333;
  margin-bottom: 8px;
}

.no-warning-desc {
  font-size: 14px;
  color: #999;
}

.warning-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  border-top: 1px solid #f0f0f0;
  background: #fafafa;
}

.btn-link {
  background: none;
  border: none;
  color: #1890ff;
  font-size: 14px;
  cursor: pointer;
}

.btn-link:hover {
  text-decoration: underline;
}

.btn-close {
  width: 80px;
  height: 36px;
  border: 1px solid #d9d9d9;
  background: #fff;
  border-radius: 6px;
  font-size: 14px;
  color: #666;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-close:hover {
  border-color: #1890ff;
  color: #1890ff;
}

/* 未读预警数量提示 */
.warning-badge {
  position: fixed;
  top: 70px;
  right: 20px;
  background: #ff4d4f;
  color: #fff;
  padding: 12px 20px;
  border-radius: 8px;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(255, 77, 79, 0.3);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  transition: all 0.2s;
  z-index: 1000;
}

.warning-badge:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(255, 77, 79, 0.4);
}

.badge-count {
  font-size: 18px;
  font-weight: 600;
}

.badge-text {
  font-size: 12px;
}

@media (max-width: 768px) {
  .warning-modal {
    padding-top: 0;
  }
  
  .warning-container {
    width: 100%;
    max-height: 100vh;
    border-radius: 0;
  }
  
  .warning-header {
    padding: 16px;
  }
  
  .warning-content {
    padding: 16px;
  }
  
  .warning-footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 16px;
    background: #fff;
    box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.1);
  }
  
  .warning-badge {
    top: auto;
    bottom: 80px;
    right: 16px;
  }
}
</style>
