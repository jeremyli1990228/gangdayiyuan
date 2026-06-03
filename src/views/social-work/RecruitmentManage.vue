<template>
  <div class="page-container">
    <div class="breadcrumb">
      <div class="breadcrumb-arrow" @click="goBack">
        <svg viewBox="0 0 24 24" fill="none" stroke="#999" xmlns="http://www.w3.org/2000/svg">
          <polyline points="15 18 9 12 15 6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <span class="breadcrumb-item">社工管理</span>
      <span class="breadcrumb-separator">›</span>
      <span class="breadcrumb-item active">招聘管理</span>
    </div>
    
    <div class="page-header">
      <h1 class="page-title">招聘管理</h1>
      <button class="btn btn-primary" style="margin-left: auto;" @click="showAddDrawer = true">
        <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 5v14M5 12h14" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        新增招聘
      </button>
    </div>
    
    <div class="table-section">
      <div class="table-container">
        <div class="table-header">
          <div class="table-cell" style="width: 80px;">序号</div>
          <div class="table-cell" style="width: 200px;">标题</div>
          <div class="table-cell" style="width: 150px;">最多报名人数</div>
          <div class="table-cell" style="width: 150px;">已报名人数</div>
          <div class="table-cell" style="width: 120px;">状态</div>
          <div class="table-cell" style="width: 180px;">创建时间</div>
          <div class="table-cell" style="width: 150px;">操作</div>
        </div>
        <div class="table-body">
          <div class="empty-row">
            <svg class="empty-icon" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="30" y="20" width="60" height="80" rx="4" fill="#f0f0f0" stroke="#e0e0e0" stroke-width="2"/>
              <path d="M40 35 L50 35 L50 50 L40 50 Z M70 35 L80 35 L80 65 L70 65 Z" fill="#e0e0e0"/>
              <path d="M45 60 L50 55 L60 70 L70 50 L75 55" fill="none" stroke="#d0d0d0" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <div class="empty-text">暂无数据</div>
          </div>
        </div>
      </div>
      
      <div class="pagination">
        <div class="pagination-info">共 0 条</div>
        <select class="pagination-select">
          <option>10条/页</option>
          <option>20条/页</option>
          <option>50条/页</option>
        </select>
        <div class="pagination-buttons">
          <button class="pagination-btn" disabled>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
              <polyline points="15 18 9 12 15 6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          <button class="pagination-btn active">1</button>
          <button class="pagination-btn" disabled>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
              <polyline points="9 18 15 12 9 6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
        <div class="pagination-jump">
          前往
          <input type="text" class="jump-input" value="1"/>
          页
        </div>
      </div>
    </div>
    
    <div class="drawer-mask" v-if="showAddDrawer" @click="showAddDrawer = false"></div>
    <div class="drawer" :class="{ open: showAddDrawer }">
      <div class="drawer-header">
        <span class="drawer-title">新增招聘</span>
        <svg class="drawer-close" viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg" @click="showAddDrawer = false">
          <line x1="18" y1="6" x2="6" y2="18" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <line x1="6" y1="6" x2="18" y2="18" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <div class="drawer-body">
        <div class="form-item required">
          <label>标题</label>
          <input type="text" placeholder="请点击输入" class="form-input"/>
        </div>
        <div class="form-item required">
          <label>最多招聘人数</label>
          <input type="number" class="form-input" value="1"/>
        </div>
        <div class="form-item required">
          <label>招聘描述</label>
          <div class="rich-editor">
            <div class="rich-editor-toolbar">
              <div class="toolbar-btn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M4 7V4h16v3M9 20h6M12 4v16" stroke-width="2"/></svg></div>
              <div class="toolbar-btn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M6 4h12v4a4 4 0 0 1-4 4H10a4 4 0 0 1-4-4V4zm4 10a4 4 0 0 1 4 4v2H6v-2a4 4 0 0 1 4-4z" stroke-width="2"/></svg></div>
              <div class="toolbar-btn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M4 7h16M4 12h8m-8 5h16" stroke-width="2" stroke-linecap="round"/></svg></div>
              <div class="toolbar-btn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M5 4h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1zm0 8h14" stroke-width="2"/></svg></div>
              <div class="toolbar-btn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2M14 12l-4 4m0-4l4 4M10 4h4" stroke-width="2" stroke-linecap="round"/></svg></div>
              <div class="toolbar-btn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" stroke-width="2" stroke-linecap="round"/></svg></div>
              <div class="toolbar-btn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M4 16l4.586-4.586a2 2 0 0 1 2.828 0L16 16m-2-2l1.586-1.586a2 2 0 0 1 2.828 0L20 14m-6-6h.01M6 20h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2z" stroke-width="2"/></svg></div>
              <div class="toolbar-btn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M13.828 10.172a4 4 0 0 0-5.656 0l-4 4a4 4 0 1 0 5.656 5.656l1.102-1.101m-.758-4.899a4 4 0 0 0 5.656 0l4-4a4 4 0 0 0-5.656-5.656l-1.1 1.1" stroke-width="2" stroke-linecap="round"/></svg></div>
              <div class="toolbar-btn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M9 12h.01M15 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 0 1-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" stroke-width="2"/></svg></div>
              <div class="toolbar-btn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M8 7h8m-8 5h8m-8 5h5" stroke-width="2" stroke-linecap="round"/></svg></div>
              <div class="toolbar-btn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M4 6h16M4 10h16M4 14h16M4 18h16" stroke-width="2" stroke-linecap="round"/></svg></div>
              <div class="toolbar-btn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6M16 13H8M16 17H8M10 9H8" stroke-width="2"/></svg></div>
              <div class="toolbar-btn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17M17 8h2a2 2 0 0 1 2 2v6m-4-8v8m0-4l2 2m-2-2-2 2" stroke-width="2" stroke-linecap="round"/></svg></div>
              <div class="toolbar-btn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 0 1-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" stroke-width="2"/></svg></div>
              <div class="toolbar-btn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zm0 5l8 5 8-5" stroke-width="2"/></svg></div>
              <div class="toolbar-btn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M15 10l4.553-2.276A1 1 0 0 1 21 8.618v6.764a1 1 0 0 1-1.447.894L15 14M5 18h8a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2z" stroke-width="2"/></svg></div>
              <div class="toolbar-btn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M10 6H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-4M14 4h6m0 0v6m0-6L10 14" stroke-width="2" stroke-linecap="round"/></svg></div>
              <div class="toolbar-btn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M3 10h10a8 8 0 0 1 8 8v2M3 10l6 6m-6-6l6-6" stroke-width="2" stroke-linecap="round"/></svg></div>
              <div class="toolbar-btn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M21 10h-6a2 2 0 0 0-2 2v6m-4-4H3m18 0l-6 6m6-6l-6-6" stroke-width="2" stroke-linecap="round"/></svg></div>
            </div>
            <div class="rich-editor-content" contenteditable="true"></div>
          </div>
        </div>
        <div class="form-item required">
          <label>过期设置</label>
          <div class="radio-group">
            <label class="radio-item">
              <input type="radio" name="expire" checked/>
              <span class="radio-dot"></span>
              有效
            </label>
            <label class="radio-item">
              <input type="radio" name="expire"/>
              <span class="radio-dot"></span>
              无效
            </label>
          </div>
        </div>
      </div>
      <div class="drawer-footer">
        <button class="btn btn-default" @click="showAddDrawer = false">取消</button>
        <button class="btn btn-primary">提交</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const showAddDrawer = ref(false)

const goBack = () => {
  window.history.back()
}
</script>

<style scoped>
.page-container {
  padding: 24px;
  background-color: #f0f2f5;
  min-height: 100%;
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

.breadcrumb-arrow svg {
  width: 16px;
  height: 16px;
}

.breadcrumb-item {
  color: #333;
  text-decoration: none;
  font-size: 14px;
}

.breadcrumb-item.active {
  color: #666;
}

.breadcrumb-separator {
  margin: 0 8px;
  color: #999;
}

.page-header {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
}

.page-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  height: 32px;
  padding: 0 16px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
}

.btn-icon {
  width: 14px;
  height: 14px;
}

.btn-primary {
  background-color: #1890ff;
  color: #fff;
}

.btn-default {
  background-color: #fff;
  color: #333;
  border: 1px solid #d9d9d9;
}

.table-section {
  background-color: #fff;
  border-radius: 4px;
  padding: 16px 20px;
}

.table-container {
  border: 1px solid #f0f0f0;
  border-radius: 4px;
}

.table-header {
  display: flex;
  background-color: #fafafa;
  padding: 12px 16px;
}

.table-cell {
  font-size: 14px;
  font-weight: 600;
  color: #333;
  text-align: left;
  flex-shrink: 0;
}

.table-body {
  padding: 16px;
}

.empty-row {
  text-align: center;
  padding: 60px 0;
}

.empty-icon {
  width: 120px;
  height: 120px;
  margin-bottom: 16px;
}

.empty-text {
  color: #999;
  font-size: 14px;
}

.pagination {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 16px;
  margin-top: 20px;
  padding-top: 16px;
  border-top: 1px solid #f0f0f0;
}

.pagination-info {
  font-size: 14px;
  color: #666;
}

.pagination-select {
  height: 32px;
  padding: 0 12px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  background-color: #fff;
  font-size: 14px;
}

.pagination-buttons {
  display: flex;
  gap: 8px;
}

.pagination-btn {
  width: 32px;
  height: 32px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  background-color: #fff;
  color: #333;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pagination-btn:hover:not(:disabled) {
  border-color: #1890ff;
  color: #1890ff;
}

.pagination-btn.active {
  background-color: #1890ff;
  border-color: #1890ff;
  color: #fff;
}

.pagination-btn:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.pagination-btn svg {
  width: 14px;
  height: 14px;
}

.pagination-jump {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #666;
}

.jump-input {
  width: 56px;
  height: 32px;
  padding: 0 8px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  text-align: center;
  font-size: 14px;
}

.drawer-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.45);
  z-index: 1000;
}

.drawer {
  position: fixed;
  top: 0;
  right: -520px;
  width: 520px;
  height: 100%;
  background-color: #fff;
  z-index: 1001;
  display: flex;
  flex-direction: column;
  transition: right 0.3s ease;
  box-shadow: -2px 0 8px rgba(0, 0, 0, 0.15);
}

.drawer.open {
  right: 0;
}

.drawer-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  border-bottom: 1px solid #f0f0f0;
  background-color: #54657a;
}

.drawer-title {
  font-size: 16px;
  font-weight: 600;
  color: #fff;
}

.drawer-close {
  width: 24px;
  height: 24px;
  cursor: pointer;
  color: #fff;
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
  margin-bottom: 24px;
}

.form-item.required label::before {
  content: '*';
  color: #ff4d4f;
  margin-right: 4px;
}

.form-item label {
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  color: #333;
  font-weight: 500;
}

.form-input {
  width: 100%;
  height: 32px;
  padding: 0 12px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-size: 14px;
  outline: none;
  box-sizing: border-box;
}

.form-input:focus {
  border-color: #1890ff;
}

.rich-editor {
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  overflow: hidden;
}

.rich-editor-toolbar {
  display: flex;
  gap: 4px;
  padding: 8px 12px;
  background-color: #f0f0f0;
  border-bottom: 1px solid #d9d9d9;
  flex-wrap: wrap;
}

.toolbar-btn {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 2px;
  color: #333;
}

.toolbar-btn:hover {
  background-color: #e0e0e0;
}

.toolbar-btn svg {
  width: 16px;
  height: 16px;
}

.rich-editor-content {
  min-height: 200px;
  padding: 12px;
  outline: none;
}

.radio-group {
  display: flex;
  gap: 32px;
}

.radio-item {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 14px;
  color: #333;
}

.radio-item input {
  display: none;
}

.radio-dot {
  width: 16px;
  height: 16px;
  border: 2px solid #d9d9d9;
  border-radius: 50%;
  position: relative;
}

.radio-item input:checked + .radio-dot {
  border-color: #1890ff;
}

.radio-item input:checked + .radio-dot::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 8px;
  height: 8px;
  background-color: #1890ff;
  border-radius: 50%;
}
</style>
