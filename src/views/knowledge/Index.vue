<template>
  <div class="knowledge-container">
    <div class="breadcrumb">
      <router-link to="/" class="breadcrumb-item">首页</router-link>
      <span class="breadcrumb-separator">›</span>
      <span class="breadcrumb-item active">知识库</span>
    </div>
    
    <!-- 头部区域 -->
    <div class="header-section">
      <div class="search-box">
        <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <circle cx="11" cy="11" r="8" stroke-width="2"/>
          <path d="M21 21l-4.35-4.35" stroke-width="2" stroke-linecap="round"/>
        </svg>
        <input type="text" v-model="searchQuery" placeholder="搜索知识文章、常见问题..." />
      </div>
      <button class="btn btn-primary" @click="showAddModal = true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M12 5v14M5 12h14" stroke-width="2" stroke-linecap="round"/>
        </svg>
        新建文章
      </button>
    </div>
    
    <div class="content-grid">
      <!-- 左侧分类 -->
      <div class="sidebar">
        <div class="category-card">
          <h3 class="category-title">分类导航</h3>
          <div class="category-list">
            <div v-for="cat in categories" 
                 :key="cat.id"
                 :class="['category-item', {active: activeCategory === cat.id}]"
                 @click="activeCategory = cat.id">
              <span class="category-icon">{{ cat.icon }}</span>
              <span class="category-name">{{ cat.name }}</span>
              <span class="category-count">{{ cat.count }}</span>
            </div>
          </div>
        </div>
        
        <div class="stats-card">
          <h3 class="stats-title">知识库统计</h3>
          <div class="stats-item">
            <span class="stats-label">总文章数</span>
            <span class="stats-value">156</span>
          </div>
          <div class="stats-item">
            <span class="stats-label">本月新增</span>
            <span class="stats-value">12</span>
          </div>
          <div class="stats-item">
            <span class="stats-label">浏览次数</span>
            <span class="stats-value">3,245</span>
          </div>
        </div>
      </div>
      
      <!-- 右侧内容 -->
      <div class="main-content">
        <!-- 快速访问 -->
        <div class="quick-access">
          <h3 class="section-title">快速访问</h3>
          <div class="quick-grid">
            <div class="quick-item">
              <div class="quick-icon blue">📋</div>
              <span class="quick-label">处理流程</span>
            </div>
            <div class="quick-item">
              <div class="quick-icon green">❓</div>
              <span class="quick-label">常见问题</span>
            </div>
            <div class="quick-item">
              <div class="quick-icon orange">📚</div>
              <span class="quick-label">规范文档</span>
            </div>
            <div class="quick-item">
              <div class="quick-icon purple">🎯</div>
              <span class="quick-label">最佳实践</span>
            </div>
          </div>
        </div>
        
        <!-- 热门文章 -->
        <div class="hot-section">
          <div class="section-header">
            <h3 class="section-title">热门文章</h3>
            <button class="btn-link">查看更多</button>
          </div>
          <div class="article-list">
            <div v-for="article in hotArticles" :key="article.id" class="article-item" @click="viewArticle(article)">
              <div class="article-info">
                <span class="article-tag" :style="{background: article.tagBg, color: article.tagColor}">
                  {{ article.tag }}
                </span>
                <h4 class="article-title">{{ article.title }}</h4>
                <p class="article-desc">{{ article.desc }}</p>
                <div class="article-meta">
                  <span class="meta-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke-width="2"/>
                      <line x1="16" y1="2" x2="16" y2="6" stroke-width="2" stroke-linecap="round"/>
                      <line x1="8" y1="2" x2="8" y2="6" stroke-width="2" stroke-linecap="round"/>
                      <line x1="3" y1="10" x2="21" y2="10" stroke-width="2" stroke-linecap="round"/>
                    </svg>
                    {{ article.date }}
                  </span>
                  <span class="meta-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke-width="2"/>
                      <circle cx="12" cy="12" r="3" stroke-width="2"/>
                    </svg>
                    {{ article.views }}
                  </span>
                </div>
              </div>
              <div class="article-thumb" :style="{background: article.thumbBg}"></div>
            </div>
          </div>
        </div>
        
        <!-- 最新文章 -->
        <div class="latest-section">
          <div class="section-header">
            <h3 class="section-title">最新文章</h3>
            <button class="btn-link">查看更多</button>
          </div>
          <div class="article-cards">
            <div v-for="article in latestArticles" :key="article.id" class="article-card" @click="viewArticle(article)">
              <div class="card-header">
                <span class="card-tag" :style="{background: article.tagBg, color: article.tagColor}">
                  {{ article.tag }}
                </span>
              </div>
              <h4 class="card-title">{{ article.title }}</h4>
              <p class="card-desc">{{ article.desc }}</p>
              <div class="card-footer">
                <span class="card-author">{{ article.author }}</span>
                <span class="card-date">{{ article.date }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 新建文章弹窗 -->
    <div class="modal-overlay" v-if="showAddModal" @click.self="showAddModal = false">
      <div class="modal add-modal">
        <div class="modal-header">
          <h3 class="modal-title">新建知识文章</h3>
          <button class="modal-close" @click="showAddModal = false">×</button>
        </div>
        <div class="modal-body">
          <div class="form-row">
            <div class="form-item full">
              <label class="form-label">文章标题</label>
              <input type="text" class="form-input" v-model="newArticle.title" placeholder="请输入文章标题" />
            </div>
          </div>
          <div class="form-row">
            <div class="form-item">
              <label class="form-label">分类</label>
              <select class="form-input" v-model="newArticle.category">
                <option value="">请选择</option>
                <option value="1">处理流程</option>
                <option value="2">常见问题</option>
                <option value="3">规范文档</option>
                <option value="4">最佳实践</option>
              </select>
            </div>
            <div class="form-item">
              <label class="form-label">标签</label>
              <input type="text" class="form-input" v-model="newArticle.tags" placeholder="多个标签用逗号分隔" />
            </div>
          </div>
          <div class="form-row">
            <div class="form-item full">
              <label class="form-label">文章内容</label>
              <textarea class="form-textarea" v-model="newArticle.content" placeholder="请输入文章内容"></textarea>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" @click="showAddModal = false">取消</button>
          <button class="btn btn-primary" @click="saveArticle">保存</button>
        </div>
      </div>
    </div>
    
    <!-- 查看文章弹窗 -->
    <div class="modal-overlay" v-if="showViewModal" @click.self="showViewModal = false">
      <div class="modal view-modal">
        <div class="modal-header">
          <h3 class="modal-title">{{ currentArticle.title }}</h3>
          <button class="modal-close" @click="showViewModal = false">×</button>
        </div>
        <div class="modal-body view-body">
          <div class="view-meta">
            <span class="view-tag" :style="{background: currentArticle.tagBg, color: currentArticle.tagColor}">
              {{ currentArticle.tag }}
            </span>
            <span class="view-author">作者：{{ currentArticle.author }}</span>
            <span class="view-date">更新时间：{{ currentArticle.date }}</span>
          </div>
          <div class="view-content">
            <p>{{ currentArticle.content }}</p>
            <p v-if="currentArticle.moreContent">{{ currentArticle.moreContent }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const searchQuery = ref('')
const showAddModal = ref(false)
const showViewModal = ref(false)
const activeCategory = ref('')
const currentArticle = ref({})

const categories = ref([
  { id: '1', name: '处理流程', icon: '📋', count: 32 },
  { id: '2', name: '常见问题', icon: '❓', count: 48 },
  { id: '3', name: '规范文档', icon: '📚', count: 28 },
  { id: '4', name: '最佳实践', icon: '🎯', count: 18 },
  { id: '5', name: '培训资料', icon: '📺', count: 15 },
  { id: '6', name: '系统操作', icon: '💻', count: 15 }
])

const hotArticles = ref([
  {
    id: 1,
    title: '投诉案件处理完整流程指南',
    desc: '详细介绍了投诉案件从接收到结案的完整处理流程，包括各环节的注意事项和时间要求。',
    tag: '处理流程',
    tagBg: '#e6f7ff',
    tagColor: '#1890ff',
    thumbBg: 'linear-gradient(135deg, #1890ff, #69c0ff)',
    date: '2024-01-12',
    views: 1523,
    author: '张小明',
    content: '投诉案件处理是医院服务质量的重要组成部分。本指南详细介绍了从案件接收、登记、分配、处理到结案的完整流程...',
    moreContent: '每个环节都有明确的时间要求和质量标准，确保案件能够及时、妥善地得到处理...'
  },
  {
    id: 2,
    title: '医患沟通技巧100问',
    desc: '收集整理了医患沟通中的常见问题和应对技巧，帮助工作人员提升沟通能力。',
    tag: '常见问题',
    tagBg: '#fff7e6',
    tagColor: '#faad14',
    thumbBg: 'linear-gradient(135deg, #faad14, #ffc53d)',
    date: '2024-01-10',
    views: 1245,
    author: '李医生',
    content: '良好的医患沟通是医疗服务的基础。本文档收集了100个常见的沟通场景和应对建议...'
  },
  {
    id: 3,
    title: '医疗文书书写规范',
    desc: '详细说明了各类医疗文书的书写要求和注意事项，确保医疗记录的规范性和准确性。',
    tag: '规范文档',
    tagBg: '#f6ffed',
    tagColor: '#52c41a',
    thumbBg: 'linear-gradient(135deg, #52c41a, #95de64)',
    date: '2024-01-08',
    views: 987,
    author: '王主任',
    content: '医疗文书是医疗活动的重要记录，规范、准确的医疗文书对于保障医疗质量和安全至关重要...'
  }
])

const latestArticles = ref([
  {
    id: 4,
    title: '2024年服务质量提升计划',
    desc: '为提升医院服务质量，特制定本计划...',
    tag: '最佳实践',
    tagBg: '#f9f0ff',
    tagColor: '#722ed1',
    author: '管理员',
    date: '2024-01-15'
  },
  {
    id: 5,
    title: '新员工入职培训手册',
    desc: '包含新员工需要了解的各项制度和流程...',
    tag: '培训资料',
    tagBg: '#fff1f0',
    tagColor: '#ff4d4f',
    author: '人事部',
    date: '2024-01-14'
  },
  {
    id: 6,
    title: '系统功能升级说明',
    desc: '本次升级包含多项新功能，具体说明如下...',
    tag: '系统操作',
    tagBg: '#e6fffb',
    tagColor: '#13c2c2',
    author: '技术部',
    date: '2024-01-13'
  }
])

const newArticle = ref({
  title: '',
  category: '',
  tags: '',
  content: ''
})

const viewArticle = (article) => {
  currentArticle.value = article
  showViewModal.value = true
}

const saveArticle = () => {
  alert('文章已保存！')
  showAddModal.value = false
  newArticle.value = {
    title: '',
    category: '',
    tags: '',
    content: ''
  }
}
</script>

<style scoped>
.knowledge-container {
  padding: 20px;
  background-color: #f0f2f5;
  min-height: 100vh;
}

.breadcrumb {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  font-size: 14px;
}

.breadcrumb-item {
  color: #666;
  text-decoration: none;
}

.breadcrumb-item:hover {
  color: #1890ff;
}

.breadcrumb-separator {
  margin: 0 8px;
  color: #999;
}

.breadcrumb-item.active {
  color: #333;
}

/* 头部区域 */
.header-section {
  display: flex;
  gap: 16px;
  margin-bottom: 20px;
}

.search-box {
  flex: 1;
  display: flex;
  align-items: center;
  background: #fff;
  border-radius: 12px;
  padding: 0 16px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}

.search-icon {
  width: 20px;
  height: 20px;
  color: #999;
  margin-right: 12px;
}

.search-box input {
  flex: 1;
  height: 52px;
  border: none;
  font-size: 15px;
  outline: none;
}

.btn {
  height: 52px;
  padding: 0 24px;
  border: none;
  border-radius: 12px;
  font-size: 15px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s;
}

.btn-primary {
  background: #1890ff;
  color: #fff;
}

.btn-primary:hover {
  background: #40a9ff;
}

.btn-primary svg {
  width: 20px;
  height: 20px;
}

.btn-secondary {
  background: #f5f5f5;
  color: #666;
}

.btn-secondary:hover {
  background: #e5e5e5;
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

/* 内容网格 */
.content-grid {
  display: grid;
  grid-template-columns: 260px 1fr;
  gap: 20px;
}

/* 侧边栏 */
.sidebar {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.category-card, .stats-card {
  background: #fff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}

.category-title, .stats-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin: 0 0 16px 0;
}

.category-list {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.category-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
}

.category-item:hover {
  background: #f5f5f5;
}

.category-item.active {
  background: #e6f7ff;
}

.category-icon {
  font-size: 18px;
}

.category-name {
  flex: 1;
  font-size: 14px;
  color: #333;
}

.category-item.active .category-name {
  color: #1890ff;
  font-weight: 500;
}

.category-count {
  font-size: 13px;
  color: #999;
  background: #f5f5f5;
  padding: 2px 8px;
  border-radius: 10px;
}

.stats-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #f0f0f0;
}

.stats-item:last-child {
  border-bottom: none;
}

.stats-label {
  font-size: 14px;
  color: #666;
}

.stats-value {
  font-size: 16px;
  font-weight: 600;
  color: #333;
}

/* 主内容 */
.main-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.quick-access, .hot-section, .latest-section {
  background: #fff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}

.section-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin: 0 0 16px 0;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.quick-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

.quick-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 20px;
  background: #fafafa;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s;
}

.quick-item:hover {
  background: #f5f5f5;
  transform: translateY(-2px);
}

.quick-icon {
  width: 56px;
  height: 56px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
}

.quick-icon.blue {
  background: #e6f7ff;
}

.quick-icon.green {
  background: #f6ffed;
}

.quick-icon.orange {
  background: #fff7e6;
}

.quick-icon.purple {
  background: #f9f0ff;
}

.quick-label {
  font-size: 14px;
  color: #333;
  font-weight: 500;
}

/* 文章列表 */
.article-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.article-item {
  display: flex;
  gap: 20px;
  padding: 20px;
  background: #fafafa;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s;
}

.article-item:hover {
  background: #f5f5f5;
  transform: translateX(4px);
}

.article-info {
  flex: 1;
}

.article-tag {
  display: inline-block;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 12px;
  margin-bottom: 8px;
}

.article-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin: 0 0 8px 0;
}

.article-desc {
  font-size: 14px;
  color: #666;
  line-height: 1.6;
  margin: 0 0 12px 0;
}

.article-meta {
  display: flex;
  gap: 20px;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: #999;
}

.meta-item svg {
  width: 16px;
  height: 16px;
}

.article-thumb {
  width: 160px;
  height: 100px;
  border-radius: 10px;
  flex-shrink: 0;
}

/* 文章卡片 */
.article-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.article-card {
  background: #fafafa;
  border-radius: 12px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.2s;
}

.article-card:hover {
  background: #f5f5f5;
  transform: translateY(-4px);
}

.card-header {
  margin-bottom: 12px;
}

.card-tag {
  display: inline-block;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 12px;
}

.card-title {
  font-size: 15px;
  font-weight: 600;
  color: #333;
  margin: 0 0 8px 0;
}

.card-desc {
  font-size: 13px;
  color: #666;
  line-height: 1.5;
  margin: 0 0 16px 0;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
  color: #999;
}

/* 弹窗 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
}

.modal {
  background: #fff;
  border-radius: 16px;
  max-width: 700px;
  width: 100%;
  max-height: 90vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid #f0f0f0;
}

.modal-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.modal-close {
  width: 36px;
  height: 36px;
  border: none;
  background: #f5f5f5;
  border-radius: 50%;
  font-size: 24px;
  color: #999;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.modal-close:hover {
  background: #e5e5e5;
  color: #666;
}

.modal-body {
  flex: 1;
  padding: 24px;
  overflow-y: auto;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 20px 24px;
  border-top: 1px solid #f0f0f0;
}

.modal-footer .btn {
  height: 40px;
  padding: 0 24px;
  border-radius: 8px;
}

/* 表单 */
.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 16px;
}

.form-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-item.full {
  grid-column: span 2;
}

.form-label {
  font-size: 14px;
  color: #333;
  font-weight: 500;
}

.form-input {
  height: 44px;
  padding: 0 12px;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s;
}

.form-input:focus {
  border-color: #1890ff;
}

.form-textarea {
  min-height: 200px;
  padding: 12px;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  font-size: 14px;
  outline: none;
  resize: vertical;
  transition: border-color 0.2s;
}

.form-textarea:focus {
  border-color: #1890ff;
}

/* 查看弹窗 */
.view-modal {
  max-width: 800px;
}

.view-body {
  padding: 0 24px 24px 24px;
}

.view-meta {
  display: flex;
  gap: 16px;
  padding: 20px 0;
  border-bottom: 1px solid #f0f0f0;
  align-items: center;
}

.view-tag {
  padding: 4px 12px;
  border-radius: 4px;
  font-size: 13px;
}

.view-author, .view-date {
  font-size: 14px;
  color: #666;
}

.view-content {
  padding: 24px 0;
  font-size: 15px;
  line-height: 1.8;
  color: #333;
}

.view-content p {
  margin: 0 0 16px 0;
}

.view-content p:last-child {
  margin-bottom: 0;
}

/* 响应式 */
@media (max-width: 1200px) {
  .content-grid {
    grid-template-columns: 1fr;
  }
  
  .sidebar {
    order: 2;
  }
  
  .main-content {
    order: 1;
  }
  
  .article-cards {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .quick-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .article-cards {
    grid-template-columns: 1fr;
  }
  
  .article-item {
    flex-direction: column;
  }
  
  .article-thumb {
    width: 100%;
    height: 140px;
  }
  
  .form-row {
    grid-template-columns: 1fr;
  }
  
  .form-item.full {
    grid-column: span 1;
  }
}
</style>
