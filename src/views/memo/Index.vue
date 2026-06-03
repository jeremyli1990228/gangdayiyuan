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
      <span class="breadcrumb-item active">个人备忘录</span>
    </div>

    <!-- 页面标题 -->
    <div class="page-header">
      <h1 class="page-title">个人备忘录</h1>
      <button class="btn btn-primary" @click="showAddDrawer = true">
        <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M12 5v14M5 12h14" stroke-width="2" stroke-linecap="round"/>
        </svg>
        新增备忘录
      </button>
    </div>

    <!-- 视图切换 -->
    <div class="view-tabs">
      <button :class="['view-tab', viewMode === 'list' ? 'active' : '']" @click="viewMode = 'list'">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M8 6H21M8 12H21M8 18H21M3 6H3.01M3 12H3.01M3 18H3.01" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        列表视图
      </button>
      <button :class="['view-tab', viewMode === 'calendar' ? 'active' : '']" @click="viewMode = 'calendar'">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <line x1="16" y1="2" x2="16" y2="6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <line x1="8" y1="2" x2="8" y2="6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <line x1="3" y1="10" x2="21" y2="10" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        日历视图
      </button>
    </div>

    <!-- 列表视图 -->
    <div class="memo-list" v-if="viewMode === 'list'">
      <div class="memo-card" v-for="item in memoList" :key="item.id">
        <div class="memo-header">
          <span :class="['memo-status', item.status ? 'completed' : 'pending']">
            {{ item.status ? '已完成' : '待办' }}
          </span>
          <span class="memo-time">{{ item.remindTime }}</span>
        </div>
        <div class="memo-body">
          <h3 class="memo-title">{{ item.title }}</h3>
          <p class="memo-content">{{ item.content }}</p>
        </div>
        <div class="memo-footer">
          <span class="memo-case" v-if="item.caseId">关联案件：{{ item.caseId }}</span>
          <div class="memo-actions">
            <button class="action-btn" @click="toggleComplete(item)" v-if="!item.status">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M22 11.08V12C21.9988 14.1564 21.1505 16.2124 19.595 17.595C18.0395 18.9776 15.9429 19.7379 13.7884 19.6923C11.6339 19.6467 9.57094 18.7989 8.07889 17.3232C6.58684 15.8475 5.77817 13.7934 5.82455 11.6388C5.87094 9.48433 6.76835 7.45894 8.27159 6.04805C9.77483 4.63716 11.7686 3.84655 13.9236 3.82682C16.0786 3.80708 18.0872 4.55967 19.6167 5.94098C21.1462 7.32229 22.0762 9.22461 22.2191 11.2758" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M9 12L11 14L15 10" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
            <button class="action-btn" @click="editMemo(item)">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M11 4H4C2.89543 4 2 4.89543 2 6V20C2 21.1046 2.89543 22 4 22H18C19.1046 22 20 21.1046 20 20V13" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M18.5 2.5C19.3284 1.67157 20.6716 1.67157 21.5 2.5C22.3284 3.32843 22.3284 4.67157 21.5 5.5L12 15L8 16L9 12L18.5 2.5Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
            <button class="action-btn delete" @click="deleteMemo(item)">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M3 6H5H21" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div class="empty-state" v-if="memoList.length === 0">
        <svg viewBox="0 0 24 24" fill="none" stroke="#d9d9d9">
          <path d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M7 7H17M7 12H17M7 17H12" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <p>暂无备忘录</p>
      </div>
    </div>

    <!-- 日历视图 -->
    <div class="calendar-view" v-if="viewMode === 'calendar'">
      <div class="calendar-header">
        <button class="calendar-nav" @click="prevMonth">&lt;</button>
        <span class="calendar-title">{{ currentYear }}年{{ currentMonth }}月</span>
        <button class="calendar-nav" @click="nextMonth">&gt;</button>
      </div>
      <div class="calendar-weekdays">
        <span>日</span><span>一</span><span>二</span><span>三</span><span>四</span><span>五</span><span>六</span>
      </div>
      <div class="calendar-days">
        <div :class="['calendar-day', { 'other-month': day.otherMonth, 'has-memo': day.hasMemo, 'today': day.isToday }]" 
             v-for="(day, index) in calendarDays" 
             :key="index">
          <span class="day-number">{{ day.date }}</span>
          <div class="day-memos" v-if="day.memos && day.memos.length">
            <span class="memo-dot" v-for="m in day.memos" :key="m.id" :title="m.title"></span>
          </div>
        </div>
      </div>
    </div>

    <!-- 新增/编辑抽屉 -->
    <div class="drawer-overlay" v-if="showAddDrawer" @click="showAddDrawer = false">
      <div class="drawer" @click.stop>
        <div class="drawer-header">
          <h3 class="drawer-title">{{ isEdit ? '编辑备忘录' : '新增备忘录' }}</h3>
          <button class="drawer-close" @click="showAddDrawer = false">×</button>
        </div>
        <div class="drawer-body">
          <div class="form-item required">
            <label class="form-label">标题</label>
            <input type="text" class="form-input" v-model="formData.title" placeholder="请输入标题">
          </div>
          <div class="form-item">
            <label class="form-label">内容</label>
            <textarea class="form-textarea" v-model="formData.content" placeholder="请输入内容" rows="4"></textarea>
          </div>
          <div class="form-item">
            <label class="form-label">提醒时间</label>
            <input type="datetime-local" class="form-input" v-model="formData.remindTime">
          </div>
          <div class="form-item">
            <label class="form-label">提醒方式</label>
            <select class="form-select" v-model="formData.remindType">
              <option value="0">系统内提醒</option>
              <option value="1">邮件提醒</option>
              <option value="2">短信提醒</option>
            </select>
          </div>
          <div class="form-item">
            <label class="form-label">关联案件</label>
            <input type="text" class="form-input" v-model="formData.caseId" placeholder="请输入案件编号（选填）">
          </div>
        </div>
        <div class="drawer-footer">
          <button class="btn btn-secondary" @click="showAddDrawer = false">取消</button>
          <button class="btn btn-primary" @click="saveMemo">保存</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const viewMode = ref('list')
const showAddDrawer = ref(false)
const isEdit = ref(false)
const currentYear = ref(2026)
const currentMonth = ref(6)

const formData = ref({
  title: '',
  content: '',
  remindTime: '',
  remindType: '0',
  caseId: ''
})

const memoList = ref([
  { id: 1, title: '跟进张三投诉案件', content: '需要在周五前完成初步调查，并联系相关科室了解情况。', remindTime: '2026-06-05 09:00', remindType: 0, status: 0, caseId: 'TS20260601001' },
  { id: 2, title: '准备月度报告', content: '整理本月投诉处理数据，准备下周一的汇报材料。', remindTime: '2026-06-08 14:00', remindType: 1, status: 0, caseId: '' },
  { id: 3, title: '培训新员工', content: '对新入职的投诉处理专员进行系统操作培训。', remindTime: '2026-06-03 10:00', remindType: 0, status: 1, caseId: '' }
])

const calendarDays = computed(() => {
  const days = []
  const firstDay = new Date(currentYear.value, currentMonth.value - 1, 1)
  const lastDay = new Date(currentYear.value, currentMonth.value, 0)
  const startDay = firstDay.getDay()
  
  // 上月日期
  for (let i = startDay - 1; i >= 0; i--) {
    const date = new Date(currentYear.value, currentMonth.value - 1, -i)
    days.push({ date: date.getDate(), otherMonth: true, hasMemo: false, isToday: false, memos: [] })
  }
  
  // 本月日期
  const today = new Date()
  for (let i = 1; i <= lastDay.getDate(); i++) {
    const dateStr = `${currentYear.value}-${String(currentMonth.value).padStart(2, '0')}-${String(i).padStart(2, '0')}`
    const memos = memoList.value.filter(m => m.remindTime.startsWith(dateStr))
    days.push({
      date: i,
      otherMonth: false,
      hasMemo: memos.length > 0,
      isToday: today.getFullYear() === currentYear.value && today.getMonth() + 1 === currentMonth.value && today.getDate() === i,
      memos
    })
  }
  
  // 下月日期
  const remaining = 42 - days.length
  for (let i = 1; i <= remaining; i++) {
    days.push({ date: i, otherMonth: true, hasMemo: false, isToday: false, memos: [] })
  }
  
  return days
})

const prevMonth = () => {
  if (currentMonth.value === 1) {
    currentMonth.value = 12
    currentYear.value--
  } else {
    currentMonth.value--
  }
}

const nextMonth = () => {
  if (currentMonth.value === 12) {
    currentMonth.value = 1
    currentYear.value++
  } else {
    currentMonth.value++
  }
}

const editMemo = (item) => {
  isEdit.value = true
  formData.value = { ...item }
  showAddDrawer.value = true
}

const toggleComplete = (item) => {
  item.status = 1
}

const deleteMemo = (item) => {
  if (confirm('确定要删除该备忘录吗？')) {
    const index = memoList.value.findIndex(m => m.id === item.id)
    if (index > -1) {
      memoList.value.splice(index, 1)
    }
  }
}

const saveMemo = () => {
  if (!formData.value.title) {
    alert('请输入标题')
    return
  }
  if (isEdit.value) {
    const index = memoList.value.findIndex(m => m.id === formData.value.id)
    if (index > -1) {
      memoList.value[index] = { ...formData.value }
    }
  } else {
    memoList.value.unshift({
      ...formData.value,
      id: Date.now(),
      status: 0
    })
  }
  showAddDrawer.value = false
  resetForm()
}

const resetForm = () => {
  formData.value = {
    title: '',
    content: '',
    remindTime: '',
    remindType: '0',
    caseId: ''
  }
  isEdit.value = false
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.page-title {
  font-size: 20px;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 32px;
  padding: 0 16px;
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

.btn-secondary {
  background: #fff;
  color: #666;
  border: 1px solid #d9d9d9;
}

.btn-icon {
  width: 14px;
  height: 14px;
}

.view-tabs {
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
}

.view-tab {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  background: #fff;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-size: 14px;
  color: #666;
  cursor: pointer;
  transition: all 0.3s;
}

.view-tab svg {
  width: 16px;
  height: 16px;
}

.view-tab:hover {
  color: #1890ff;
  border-color: #1890ff;
}

.view-tab.active {
  background: #1890ff;
  color: #fff;
  border-color: #1890ff;
}

.memo-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 16px;
}

.memo-card {
  background: #fff;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.memo-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.memo-status {
  padding: 4px 8px;
  border-radius: 2px;
  font-size: 12px;
}

.memo-status.pending {
  background: #fff1f0;
  color: #ff4d4f;
}

.memo-status.completed {
  background: #f6ffed;
  color: #52c41a;
}

.memo-time {
  font-size: 12px;
  color: #999;
}

.memo-title {
  font-size: 15px;
  font-weight: 500;
  color: #333;
  margin: 0 0 8px;
}

.memo-content {
  font-size: 13px;
  color: #666;
  line-height: 1.6;
  margin: 0;
}

.memo-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid #f0f0f0;
}

.memo-case {
  font-size: 12px;
  color: #1890ff;
}

.memo-actions {
  display: flex;
  gap: 8px;
}

.action-btn {
  width: 28px;
  height: 28px;
  background: none;
  border: none;
  padding: 4px;
  cursor: pointer;
  color: #666;
  border-radius: 4px;
  transition: all 0.3s;
}

.action-btn:hover {
  background: #f0f0f0;
  color: #1890ff;
}

.action-btn.delete:hover {
  color: #ff4d4f;
}

.action-btn svg {
  width: 16px;
  height: 16px;
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
  background: #fff;
  border-radius: 8px;
}

.empty-state svg {
  width: 64px;
  height: 64px;
}

.empty-state p {
  font-size: 14px;
  color: #999;
  margin: 16px 0 0;
}

/* 日历视图 */
.calendar-view {
  background: #fff;
  border-radius: 8px;
  padding: 20px;
}

.calendar-header {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
}

.calendar-nav {
  width: 32px;
  height: 32px;
  background: #f5f5f5;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.calendar-title {
  font-size: 16px;
  font-weight: 500;
  color: #333;
}

.calendar-weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  font-size: 14px;
  color: #666;
  margin-bottom: 10px;
}

.calendar-days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
}

.calendar-day {
  aspect-ratio: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  font-size: 14px;
}

.calendar-day.other-month {
  color: #d9d9d9;
}

.calendar-day.today {
  background: #e6f7ff;
  color: #1890ff;
}

.calendar-day.has-memo {
  font-weight: 500;
}

.day-number {
  margin-bottom: 4px;
}

.day-memos {
  display: flex;
  gap: 2px;
}

.memo-dot {
  width: 6px;
  height: 6px;
  background: #1890ff;
  border-radius: 50%;
}

/* 抽屉样式 */
.drawer-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: flex-end;
  z-index: 1000;
}

.drawer {
  width: 500px;
  height: 100vh;
  background: #fff;
  display: flex;
  flex-direction: column;
  box-shadow: -2px 0 8px rgba(0, 0, 0, 0.15);
}

.drawer-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  border-bottom: 1px solid #f0f0f0;
}

.drawer-title {
  font-size: 16px;
  font-weight: 600;
  margin: 0;
}

.drawer-close {
  width: 32px;
  height: 32px;
  border: none;
  background: none;
  font-size: 20px;
  color: #999;
  cursor: pointer;
}

.drawer-body {
  flex: 1;
  padding: 24px;
  overflow-y: auto;
}

.drawer-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 16px 24px;
  border-top: 1px solid #f0f0f0;
}

.form-item {
  margin-bottom: 20px;
}

.form-item.required .form-label::before {
  content: '*';
  color: #ff4d4f;
  margin-right: 4px;
}

.form-label {
  display: block;
  font-size: 14px;
  color: #333;
  margin-bottom: 8px;
}

.form-input,
.form-select {
  width: 100%;
  height: 32px;
  padding: 0 12px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-size: 14px;
  outline: none;
}

.form-input:focus,
.form-select:focus {
  border-color: #1890ff;
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
</style>
