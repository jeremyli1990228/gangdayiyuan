<template>
  <div class="h5-page">
    <!-- 顶部导航 -->
    <div class="h5-header">
      <button class="back-btn" @click="goBack">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M15 18L9 12L15 6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
      <h1 class="h5-title">投诉详情</h1>
    </div>

    <!-- 详情内容 -->
    <div class="h5-content">
      <!-- 基本信息 -->
      <div class="detail-card">
        <div class="card-title">基本信息</div>
        <div class="info-list">
          <div class="info-item">
            <span class="info-label">案件编号</span>
            <span class="info-value">{{ detail.caseNo }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">问题类型</span>
            <span class="info-value">{{ detail.type }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">提交时间</span>
            <span class="info-value">{{ detail.submitTime }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">当前状态</span>
            <span :class="['status-tag', getStatusClass(detail.status)]">{{ getStatusText(detail.status) }}</span>
          </div>
        </div>
      </div>

      <!-- 问题描述 -->
      <div class="detail-card">
        <div class="card-title">问题描述</div>
        <div class="card-content">{{ detail.description }}</div>
        <div class="image-list" v-if="detail.images && detail.images.length">
          <img v-for="(img, index) in detail.images" :key="index" :src="img" alt="附件图片">
        </div>
      </div>

      <!-- 处理进度 -->
      <div class="detail-card">
        <div class="card-title">处理进度</div>
        <div class="timeline">
          <div class="timeline-item" v-for="(item, index) in detail.timeline" :key="index">
            <div class="timeline-dot"></div>
            <div class="timeline-content">
              <div class="timeline-title">{{ item.title }}</div>
              <div class="timeline-time">{{ item.time }}</div>
              <div class="timeline-desc" v-if="item.desc">{{ item.desc }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 处理结果 -->
      <div class="detail-card" v-if="detail.handleResult">
        <div class="card-title">处理结果</div>
        <div class="card-content">{{ detail.handleResult }}</div>
      </div>

      <!-- 评价区域 -->
      <div class="detail-card" v-if="detail.status === 2">
        <div class="card-title">满意度评价</div>
        <div class="rating-section">
          <div class="rating-stars">
            <span v-for="i in 5" :key="i" :class="['star', i <= rating ? 'active' : '']" @click="rating = i">★</span>
          </div>
          <textarea class="rating-textarea" v-model="ratingContent" placeholder="请输入您的评价意见（选填）"></textarea>
          <button class="submit-btn" @click="submitRating">提交评价</button>
        </div>
      </div>

      <!-- 已评价 -->
      <div class="detail-card" v-if="detail.status === 3">
        <div class="card-title">我的评价</div>
        <div class="rating-display">
          <div class="rating-stars">
            <span v-for="i in 5" :key="i" :class="['star', i <= detail.rating ? 'active' : '']">★</span>
          </div>
          <div class="rating-content" v-if="detail.ratingContent">{{ detail.ratingContent }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const rating = ref(0)
const ratingContent = ref('')

const detail = ref({
  id: route.params.id,
  caseNo: 'TS20260601001',
  type: '服务态度 - 医护态度',
  submitTime: '2026-06-01 09:30:00',
  status: 2,
  description: '门诊挂号处工作人员态度冷漠，排队等候时间过长，希望改进服务流程。具体表现为：1. 工作人员对患者的询问爱理不理；2. 排队等候超过1小时；3. 窗口开放数量不足。',
  images: ['https://via.placeholder.com/100', 'https://via.placeholder.com/100'],
  handleResult: '感谢您的反馈，我们已对相关工作人员进行了批评教育，并优化了排班制度，增加了服务窗口。如有问题请随时联系我们。',
  timeline: [
    { title: '提交投诉', time: '2026-06-01 09:30', desc: '您的投诉已提交成功' },
    { title: '受理中', time: '2026-06-01 10:15', desc: '您的投诉已分配给门诊办公室处理' },
    { title: '处理中', time: '2026-06-02 09:00', desc: '正在调查核实情况' },
    { title: '已处理', time: '2026-06-03 15:30', desc: '处理完成，等待您的评价' }
  ],
  rating: 0,
  ratingContent: ''
})

const getStatusClass = (status) => {
  const classes = ['pending', 'processing', 'resolved', 'rated']
  return classes[status] || 'pending'
}

const getStatusText = (status) => {
  const texts = ['待处理', '处理中', '已处理', '已评价']
  return texts[status] || '待处理'
}

const submitRating = () => {
  if (rating.value === 0) {
    alert('请选择评分')
    return
  }
  detail.value.status = 3
  detail.value.rating = rating.value
  detail.value.ratingContent = ratingContent.value
  alert('评价提交成功')
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

.h5-content {
  flex: 1;
  padding: 12px;
  overflow-y: auto;
}

.detail-card {
  background: #fff;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 12px;
}

.card-title {
  font-size: 15px;
  font-weight: 500;
  color: #333;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid #f0f0f0;
}

.info-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.info-item {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
}

.info-label {
  color: #999;
}

.info-value {
  color: #333;
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

.card-content {
  font-size: 14px;
  color: #333;
  line-height: 1.6;
}

.image-list {
  display: flex;
  gap: 8px;
  margin-top: 12px;
  overflow-x: auto;
}

.image-list img {
  width: 80px;
  height: 80px;
  border-radius: 4px;
  object-fit: cover;
}

.timeline {
  position: relative;
  padding-left: 20px;
}

.timeline-item {
  position: relative;
  padding-bottom: 20px;
}

.timeline-item:last-child {
  padding-bottom: 0;
}

.timeline-dot {
  position: absolute;
  left: -20px;
  top: 4px;
  width: 10px;
  height: 10px;
  background: #1890ff;
  border-radius: 50%;
}

.timeline-item:not(:last-child)::before {
  content: '';
  position: absolute;
  left: -16px;
  top: 14px;
  width: 2px;
  height: calc(100% - 10px);
  background: #e8e8e8;
}

.timeline-content {
  padding-left: 8px;
}

.timeline-title {
  font-size: 14px;
  font-weight: 500;
  color: #333;
}

.timeline-time {
  font-size: 12px;
  color: #999;
  margin-top: 4px;
}

.timeline-desc {
  font-size: 13px;
  color: #666;
  margin-top: 4px;
}

.rating-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.rating-stars {
  display: flex;
  gap: 8px;
  justify-content: center;
}

.star {
  font-size: 32px;
  color: #d9d9d9;
  cursor: pointer;
}

.star.active {
  color: #faad14;
}

.rating-textarea {
  width: 100%;
  min-height: 80px;
  padding: 12px;
  background: #f5f5f5;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  resize: vertical;
  outline: none;
}

.submit-btn {
  width: 100%;
  height: 40px;
  background: #1890ff;
  border: none;
  border-radius: 20px;
  color: #fff;
  font-size: 14px;
  cursor: pointer;
}

.rating-display {
  text-align: center;
}

.rating-content {
  font-size: 14px;
  color: #666;
  margin-top: 12px;
}
</style>
