<template>
  <div class="h5-page">
    <!-- 顶部导航 -->
    <div class="h5-header">
      <button class="back-btn" @click="goBack">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M15 18L9 12L15 6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
      <h1 class="h5-title">我的投诉建议</h1>
    </div>

    <!-- 筛选标签 -->
    <div class="filter-tabs">
      <button :class="['filter-tab', activeTab === 'all' ? 'active' : '']" @click="activeTab = 'all'">全部</button>
      <button :class="['filter-tab', activeTab === 'pending' ? 'active' : '']" @click="activeTab = 'pending'">待处理</button>
      <button :class="['filter-tab', activeTab === 'processed' ? 'active' : '']" @click="activeTab = 'processed'">已处理</button>
    </div>

    <!-- 列表内容 -->
    <div class="h5-content">
      <div class="complaint-list">
        <div class="complaint-card" v-for="item in filteredList" :key="item.id" @click="viewDetail(item)">
          <div class="card-header">
            <span :class="['status-tag', getStatusClass(item.status)]">{{ getStatusText(item.status) }}</span>
            <span class="card-time">{{ item.submitTime }}</span>
          </div>
          <div class="card-body">
            <div class="card-type">{{ item.type }}</div>
            <div class="card-desc">{{ item.description }}</div>
          </div>
          <div class="card-footer">
            <span class="card-no">编号：{{ item.caseNo }}</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M9 18L15 12L9 6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
        </div>
      </div>

      <!-- 空状态 -->
      <div class="empty-state" v-if="filteredList.length === 0">
        <svg viewBox="0 0 24 24" fill="none" stroke="#d9d9d9">
          <path d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M14 2V8H20" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <p>暂无相关记录</p>
      </div>
    </div>

    <!-- 底部按钮 -->
    <div class="h5-footer">
      <button class="add-btn" @click="goSubmit">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M12 5v14M5 12h14" stroke-width="2" stroke-linecap="round"/>
        </svg>
        新增投诉建议
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const activeTab = ref('all')

const complaintList = ref([
  { id: 1, caseNo: 'TS20260601001', type: '服务态度 - 医护态度', description: '门诊挂号处工作人员态度冷漠，排队等候时间过长，希望改进服务流程。', status: 0, submitTime: '2026-06-01 09:30' },
  { id: 2, caseNo: 'TS20260530002', type: '就医流程 - 挂号困难', description: '建议增加自助挂号机数量，减少排队等候时间。', status: 1, submitTime: '2026-05-30 14:20' },
  { id: 3, caseNo: 'TS20260528003', type: '医疗质量 - 诊断问题', description: '对检查结果有疑问，医生解释不够详细，希望得到更专业的解答。', status: 2, submitTime: '2026-05-28 10:15' },
  { id: 4, caseNo: 'TS20260525004', type: '其他', description: '请问周末是否可以做体检？需要提前预约吗？', status: 3, submitTime: '2026-05-25 11:30' }
])

const filteredList = computed(() => {
  if (activeTab.value === 'all') return complaintList.value
  if (activeTab.value === 'pending') return complaintList.value.filter(item => item.status < 2)
  return complaintList.value.filter(item => item.status >= 2)
})

const getStatusClass = (status) => {
  const classes = ['pending', 'processing', 'resolved', 'rated']
  return classes[status] || 'pending'
}

const getStatusText = (status) => {
  const texts = ['待处理', '处理中', '已处理', '已评价']
  return texts[status] || '待处理'
}

const viewDetail = (item) => {
  router.push(`/h5/complaint/detail/${item.id}`)
}

const goSubmit = () => {
  router.push('/h5/complaint/submit')
}

const goBack = () => {
  router.back()
}
</script>

<style scoped>
.h5-page {
  min-height: 100vh;
  background: #f5f5f5;
  display: flex;
  flex-direction: column;
}

.h5-header {
  height: 44px;
  background: #1890ff;
  display: flex;
  align-items: center;
  padding: 0 16px;
  position: sticky;
  top: 0;
  z-index: 100;
}

.back-btn {
  width: 32px;
  height: 32px;
  background: none;
  border: none;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.back-btn svg {
  width: 20px;
  height: 20px;
  color: #fff;
}

.h5-title {
  flex: 1;
  text-align: center;
  font-size: 17px;
  font-weight: 500;
  color: #fff;
  margin: 0;
  margin-right: 32px;
}

.filter-tabs {
  display: flex;
  background: #fff;
  padding: 8px 16px;
  gap: 12px;
}

.filter-tab {
  flex: 1;
  height: 32px;
  background: #f5f5f5;
  border: none;
  border-radius: 16px;
  font-size: 14px;
  color: #666;
  cursor: pointer;
  transition: all 0.3s;
}

.filter-tab.active {
  background: #1890ff;
  color: #fff;
}

.h5-content {
  flex: 1;
  padding: 12px;
  overflow-y: auto;
}

.complaint-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.complaint-card {
  background: #fff;
  border-radius: 8px;
  padding: 16px;
  cursor: pointer;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.status-tag {
  padding: 4px 8px;
  border-radius: 2px;
  font-size: 12px;
}

.status-tag.pending {
  background: #fff1f0;
  color: #ff4d4f;
}

.status-tag.processing {
  background: #fff7e6;
  color: #fa8c16;
}

.status-tag.resolved {
  background: #f6ffed;
  color: #52c41a;
}

.status-tag.rated {
  background: #e6f7ff;
  color: #1890ff;
}

.card-time {
  font-size: 12px;
  color: #999;
}

.card-body {
  margin-bottom: 12px;
}

.card-type {
  font-size: 14px;
  font-weight: 500;
  color: #333;
  margin-bottom: 8px;
}

.card-desc {
  font-size: 13px;
  color: #666;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-no {
  font-size: 12px;
  color: #999;
}

.card-footer svg {
  width: 16px;
  height: 16px;
  color: #999;
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
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

.h5-footer {
  padding: 12px 16px;
  background: #fff;
}

.add-btn {
  width: 100%;
  height: 44px;
  background: #1890ff;
  border: none;
  border-radius: 22px;
  color: #fff;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
}

.add-btn svg {
  width: 18px;
  height: 18px;
}
</style>
