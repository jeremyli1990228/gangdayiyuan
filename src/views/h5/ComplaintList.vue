<template>
  <div class="h5-page">
    <!-- 顶部导航 -->
    <div class="h5-header">
      <button class="back-btn" @click="goBack">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M15 18L9 12L15 6" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </button>
      <h1 class="h5-title">我的反馈</h1>
      <button class="header-btn" @click="goToSubmit">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M12 5v14M5 12h14" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </button>
    </div>

    <!-- 筛选标签 -->
    <div class="filter-tabs">
      <div class="filter-tab" :class="{ active: activeTab === 'all' }" @click="activeTab = 'all'">
        全部
        <span class="tab-count">{{ getCount('all') }}</span>
      </div>
      <div class="filter-tab" :class="{ active: activeTab === 'pending' }" @click="activeTab = 'pending'">
        待处理
        <span class="tab-count">{{ getCount('pending') }}</span>
      </div>
      <div class="filter-tab" :class="{ active: activeTab === 'processing' }" @click="activeTab = 'processing'">
        处理中
        <span class="tab-count">{{ getCount('processing') }}</span>
      </div>
      <div class="filter-tab" :class="{ active: activeTab === 'resolved' }" @click="activeTab = 'resolved'">
        已解决
        <span class="tab-count">{{ getCount('resolved') }}</span>
      </div>
    </div>

    <!-- 内容列表 -->
    <div class="h5-content">
      <div v-if="filteredFeedback.length === 0" class="empty-state">
        <svg viewBox="0 0 64 64" fill="none">
          <path d="M32 8a24 24 0 100 48 24 24 0 000-48zM26 28l6 6 10-10" stroke="#d9d9d9" stroke-width="3" stroke-linecap="round"/>
        </svg>
        <p class="empty-text">暂无反馈记录</p>
        <button class="empty-btn" @click="goToSubmit">立即提交</button>
      </div>
      
      <div v-else class="feedback-list">
        <div class="feedback-item" v-for="item in filteredFeedback" :key="item.id" @click="goToDetail(item.id)">
          <div class="feedback-header">
            <div class="feedback-title">
              <span class="feedback-type" :class="item.category">{{ item.categoryText }}</span>
              <span class="feedback-no">【{{ item.caseNo }}】</span>
              <span class="feedback-subject">{{ item.subject }}</span>
            </div>
            <div class="feedback-status" :class="item.statusClass">{{ item.statusText }}</div>
          </div>
          
          <div class="feedback-body">
            <p class="feedback-desc">{{ item.description }}</p>
            <div class="feedback-images" v-if="item.images?.length">
              <img v-for="(img, idx) in item.images.slice(0, 3)" :key="idx" :src="img" alt="反馈图片">
              <div class="more-images" v-if="item.images.length > 3">
                +{{ item.images.length - 3 }}
              </div>
            </div>
          </div>
          
          <div class="feedback-footer">
            <div class="feedback-time">{{ item.createTime }}</div>
            <div class="feedback-actions">
              <span class="has-reply" v-if="item.hasReply">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke-width="2" stroke-linecap="round"/>
                </svg>
                {{ item.replyCount }}条回复
              </span>
              <span class="feedback-arrow">查看详情 ></span>
            </div>
          </div>
          
          <!-- 进度时间线（简化版） -->
          <div class="feedback-timeline" v-if="item.lastReply">
            <div class="timeline-dot"></div>
            <div class="timeline-text">
              <span class="timeline-user">官方回复</span>
              <span class="timeline-time">{{ item.lastReplyTime }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const activeTab = ref('all')

// 模拟反馈列表数据
const feedbackList = ref([
  {
    id: 1,
    caseNo: 'TS20240605001',
    category: 'suggestion',
    categoryText: '建议',
    subject: '希望增加夜间门诊服务',
    description: '由于工作原因，白天没有时间看病，希望医院能开设夜间门诊，方便上班族就诊。',
    images: ['https://via.placeholder.com/80', 'https://via.placeholder.com/80'],
    status: 'resolved',
    statusText: '已解决',
    statusClass: 'success',
    createTime: '2024-06-05 14:30',
    hasReply: true,
    replyCount: 2,
    lastReply: '非常感谢您的建议！医院正在计划开设夜间门诊，预计7月开始试运行。',
    lastReplyTime: '2024-06-05 16:45'
  },
  {
    id: 2,
    caseNo: 'TS20240604002',
    category: 'complaint',
    categoryText: '投诉',
    subject: '候诊时间过长',
    description: '今天上午排队排了2个小时才轮到，候诊时间太长了，建议优化预约叫号系统。',
    images: [],
    status: 'processing',
    statusText: '处理中',
    statusClass: 'processing',
    createTime: '2024-06-04 09:15',
    hasReply: true,
    replyCount: 1,
    lastReply: '非常抱歉让您久等了！我们会优化预约系统。',
    lastReplyTime: '2024-06-04 11:20'
  },
  {
    id: 3,
    caseNo: 'TS20240603003',
    category: 'consult',
    categoryText: '咨询',
    subject: '关于门诊预约的问题',
    description: '想咨询一下如何预约专家号，以及挂号费用是多少？',
    images: [],
    status: 'resolved',
    statusText: '已解决',
    statusClass: 'success',
    createTime: '2024-06-03 16:45',
    hasReply: true,
    replyCount: 1,
    lastReply: '专家号可通过微信公众号或医院官网预约，挂号费50元起。',
    lastReplyTime: '2024-06-03 17:30'
  },
  {
    id: 4,
    caseNo: 'TS20240602004',
    category: 'complaint',
    categoryText: '投诉',
    subject: '停车位太少',
    description: '医院停车位太少了，找车位找了半个多小时，建议增加停车位。',
    images: [],
    status: 'pending',
    statusText: '待处理',
    statusClass: 'pending',
    createTime: '2024-06-02 10:00',
    hasReply: false,
    replyCount: 0
  }
])

// 筛选后的列表
const filteredFeedback = computed(() => {
  if (activeTab.value === 'all') {
    return feedbackList.value
  }
  return feedbackList.value.filter(item => item.status === activeTab.value)
})

// 获取数量
const getCount = (status) => {
  if (status === 'all') {
    return feedbackList.value.length
  }
  return feedbackList.value.filter(item => item.status === status).length
}

const goBack = () => {
  router.push('/h5/home')
}

const goToSubmit = () => {
  router.push('/h5/complaint/submit')
}

const goToDetail = (id) => {
  router.push(`/h5/complaint/detail/${id}`)
}
</script>

<style scoped>
.h5-page {
  min-height: 100vh;
  background: #f5f7fa;
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

.back-btn, .header-btn {
  width: 32px;
  height: 32px;
  background: none;
  border: none;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.back-btn svg, .header-btn svg {
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
}

/* 筛选标签 */
.filter-tabs {
  display: flex;
  background: white;
  padding: 0 4px;
  border-bottom: 1px solid #f0f0f0;
}

.filter-tab {
  flex: 1;
  text-align: center;
  padding: 12px 8px;
  font-size: 13px;
  color: #666;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
}

.filter-tab.active {
  color: #1890ff;
  font-weight: 500;
}

.filter-tab.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 40px;
  height: 2px;
  background: #1890ff;
}

.tab-count {
  padding: 0 6px;
  background: #f0f0f0;
  border-radius: 10px;
  font-size: 11px;
  color: #999;
  line-height: 1.4;
}

.filter-tab.active .tab-count {
  background: #e6f7ff;
  color: #1890ff;
}

.h5-content {
  flex: 1;
  overflow-y: auto;
}

/* 空状态 */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60px 20px;
}

.empty-state svg {
  width: 80px;
  height: 80px;
  margin-bottom: 16px;
}

.empty-text {
  font-size: 14px;
  color: #999;
  margin-bottom: 20px;
}

.empty-btn {
  padding: 10px 32px;
  background: #1890ff;
  color: white;
  border: none;
  border-radius: 20px;
  font-size: 14px;
}

/* 反馈列表 */
.feedback-list {
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.feedback-item {
  background: white;
  border-radius: 8px;
  padding: 16px;
}

.feedback-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
}

.feedback-title {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
}

.feedback-type {
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11px;
  flex-shrink: 0;
}

.feedback-type.suggestion { background: #e6f7ff; color: #1890ff; }
.feedback-type.complaint { background: #fff1f0; color: #ff4d4f; }
.feedback-type.consult { background: #f6ffed; color: #52c41a; }

.feedback-no {
  font-size: 12px;
  color: #999;
  flex-shrink: 0;
}

.feedback-subject {
  font-size: 14px;
  font-weight: 500;
  color: #333;
}

.feedback-status {
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 12px;
  flex-shrink: 0;
}

.feedback-status.success { background: #f6ffed; color: #52c41a; }
.feedback-status.processing { background: #fff7e6; color: #fa8c16; }
.feedback-status.pending { background: #f5f5f5; color: #999; }

.feedback-body {
  margin-bottom: 12px;
}

.feedback-desc {
  font-size: 13px;
  color: #666;
  line-height: 1.6;
  margin: 0 0 12px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.feedback-images {
  display: flex;
  gap: 8px;
}

.feedback-images img {
  width: 60px;
  height: 60px;
  border-radius: 4px;
  object-fit: cover;
}

.more-images {
  width: 60px;
  height: 60px;
  border-radius: 4px;
  background: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  color: #999;
}

.feedback-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 12px;
  border-top: 1px solid #f5f5f5;
}

.feedback-time {
  font-size: 12px;
  color: #999;
}

.feedback-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.has-reply {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: #1890ff;
}

.has-reply svg {
  width: 14px;
  height: 14px;
}

.feedback-arrow {
  font-size: 12px;
  color: #999;
}

/* 时间线预览 */
.feedback-timeline {
  margin-top: 12px;
  padding: 10px;
  background: #fafafa;
  border-radius: 6px;
  display: flex;
  gap: 10px;
}

.timeline-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #52c41a;
  margin-top: 4px;
  flex-shrink: 0;
}

.timeline-text {
  flex: 1;
}

.timeline-user {
  font-size: 12px;
  font-weight: 500;
  color: #333;
}

.timeline-time {
  font-size: 11px;
  color: #999;
  margin-left: 8px;
}
</style>
