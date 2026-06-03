<template>
  <div class="page-container">
    <div class="breadcrumb">
      <div class="breadcrumb-arrow" @click="goBack">
        <svg viewBox="0 0 24 24" fill="none" stroke="#999" xmlns="http://www.w3.org/2000/svg">
          <polyline points="15 18 9 12 15 6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <span class="breadcrumb-item">系统权限</span>
      <span class="breadcrumb-separator">›</span>
      <span class="breadcrumb-item active">菜单管理</span>
    </div>
    
    <div class="page-header">
      <div></div>
      <div class="header-actions">
        <button class="btn btn-success">
          <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 5v14M5 12h14" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          新增顶级菜单
        </button>
      </div>
    </div>
    
    <div class="content-wrapper">
      <div class="left-panel">
        <div class="panel-header">
          <span class="panel-title">菜单列表</span>
        </div>
        <div class="panel-content">
          <div class="menu-actions">
            <button class="btn btn-primary btn-sm">
              <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 5v14M5 12h14" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              新增
            </button>
            <button class="btn btn-warning btn-sm">
              <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              编辑
            </button>
            <button class="btn btn-danger btn-sm">
              <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              删除
            </button>
          </div>
          <div class="menu-tree">
            <div class="menu-item">
              <span class="menu-toggle">▸</span>
              <span class="menu-text">首页</span>
            </div>
            <div class="menu-item">
              <span class="menu-toggle">▸</span>
              <span class="menu-text">我的案件</span>
            </div>
            <div class="menu-item">
              <span class="menu-toggle">▸</span>
              <span class="menu-text">处理案件</span>
            </div>
            <div class="menu-item">
              <span class="menu-toggle">▸</span>
              <span class="menu-text">案件报备</span>
            </div>
            <div class="menu-item">
              <span class="menu-toggle">▸</span>
              <span class="menu-text">问卷调查</span>
            </div>
            <div class="menu-item">
              <span class="menu-toggle">▸</span>
              <span class="menu-text">学习资料</span>
            </div>
            <div class="menu-item">
              <span class="menu-toggle">▸</span>
              <span class="menu-text">数据统计</span>
            </div>
            <div class="menu-item">
              <span class="menu-toggle">▸</span>
              <span class="menu-text">社工管理</span>
            </div>
            <div class="menu-item">
              <span class="menu-toggle">▸</span>
              <span class="menu-text">通讯录</span>
            </div>
            <div class="menu-item">
              <span class="menu-toggle">▸</span>
              <span class="menu-text">消息</span>
            </div>
            <div class="menu-item">
              <span class="menu-toggle">▸</span>
              <span class="menu-text">设置</span>
            </div>
            <div class="menu-item">
              <span class="menu-toggle">▸</span>
              <span class="menu-text">系统权限</span>
            </div>
          </div>
        </div>
      </div>
      
      <div class="right-panel">
        <div class="panel-header">
          <span class="panel-title">菜单内容</span>
        </div>
        <div class="panel-content">
          <div class="form-section">
            <div class="form-group">
              <label>父级节点</label>
              <input type="text" class="form-input" placeholder="请输入父级节点" disabled/>
            </div>
            <div class="form-group">
              <label>标题</label>
              <input type="text" class="form-input" placeholder="请输入标题"/>
            </div>
            <div class="form-group">
              <label>权限标识</label>
              <input type="text" class="form-input" placeholder="请输入权限标识"/>
            </div>
            <div class="form-group">
              <label>图标</label>
              <div class="icon-input-wrapper">
                <input type="text" class="form-input" placeholder="菜单图标"/>
                <button class="btn btn-default btn-xs">选择</button>
              </div>
            </div>
            <div class="form-group">
              <label>类型</label>
              <div class="radio-group">
                <label class="radio-item">
                  <input type="radio" name="menuType"/>
                  <span>菜单</span>
                </label>
                <label class="radio-item">
                  <input type="radio" name="menuType"/>
                  <span>按钮</span>
                </label>
                <label class="radio-item">
                  <input type="radio" name="menuType"/>
                  <span>页面</span>
                </label>
              </div>
            </div>
            <div class="form-group">
              <label>排序</label>
              <input type="text" class="form-input" placeholder="请输入排序"/>
            </div>
            <div class="form-group">
              <label>前端组件</label>
              <input type="text" class="form-input" placeholder="请输入描述"/>
            </div>
            <div class="form-group">
              <label>前端地址</label>
              <input type="text" class="form-input" placeholder="地址"/>
            </div>
            <div class="form-group">
              <label>路由缓存</label>
              <div class="toggle-switch">
                <div class="toggle-track">
                  <div class="toggle-thumb"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
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
  justify-content: space-between;
  margin-bottom: 16px;
}

.header-actions {
  display: flex;
  gap: 12px;
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

.btn-sm {
  height: 28px;
  padding: 0 12px;
  font-size: 13px;
}

.btn-xs {
  height: 24px;
  padding: 0 8px;
  font-size: 12px;
}

.btn-icon {
  width: 14px;
  height: 14px;
}

.btn-primary {
  background-color: #1890ff;
  color: #fff;
}

.btn-success {
  background-color: #10b981;
  color: #fff;
}

.btn-warning {
  background-color: #faad14;
  color: #fff;
}

.btn-danger {
  background-color: #f5222d;
  color: #fff;
}

.btn-default {
  background-color: #fff;
  color: #333;
  border: 1px solid #d9d9d9;
}

.content-wrapper {
  display: flex;
  gap: 16px;
  background-color: #fff;
  border-radius: 4px;
  border: 1px solid #f0f0f0;
  min-height: 600px;
}

.left-panel {
  width: 300px;
  border-right: 1px solid #f0f0f0;
  display: flex;
  flex-direction: column;
}

.right-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.panel-header {
  padding: 16px 20px;
  border-bottom: 1px solid #f0f0f0;
}

.panel-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
}

.panel-content {
  padding: 16px 20px;
  flex: 1;
}

.menu-actions {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

.menu-tree {
  padding: 8px 0;
}

.menu-item {
  padding: 8px 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #333;
  border-radius: 4px;
  margin-bottom: 4px;
}

.menu-item:hover {
  background-color: #f5f5f5;
}

.menu-toggle {
  color: #999;
  font-size: 12px;
  width: 16px;
  text-align: center;
}

.menu-text {
  flex: 1;
}

.form-section {
  max-width: 500px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  font-size: 14px;
  color: #333;
  margin-bottom: 8px;
  font-weight: 500;
}

.form-input {
  width: 100%;
  height: 36px;
  padding: 0 12px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-size: 14px;
  outline: none;
  box-sizing: border-box;
}

.form-input:disabled {
  background-color: #f5f5f5;
  cursor: not-allowed;
}

.icon-input-wrapper {
  display: flex;
  gap: 8px;
}

.icon-input-wrapper .form-input {
  flex: 1;
}

.radio-group {
  display: flex;
  gap: 24px;
}

.radio-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  color: #333;
  cursor: pointer;
}

.radio-item input {
  margin: 0;
}

.toggle-switch {
  display: inline-flex;
}

.toggle-track {
  width: 44px;
  height: 22px;
  background-color: #ff7875;
  border-radius: 11px;
  padding: 2px;
  cursor: pointer;
}

.toggle-thumb {
  width: 18px;
  height: 18px;
  background-color: #fff;
  border-radius: 50%;
  margin-left: auto;
}
</style>