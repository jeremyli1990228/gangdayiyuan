<template>
  <header class="header">
    <div class="header-left">
      <button class="menu-toggle-btn" @click="$emit('toggle-sidebar')">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 12H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M3 6H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M3 18H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
      <button class="icon-btn desktop-only">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 12H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M3 6H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M3 18H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
      <div class="breadcrumb">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 12H6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M13 18L6 12L13 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span>首页</span>
      </div>
    </div>
    <div class="header-right">
      <!-- 多维度检索按钮 -->
      <button class="header-btn" @click="openSearch">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="11" cy="11" r="8" stroke="currentColor" stroke-width="2"/>
          <path d="M21 21l-4.35-4.35" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
        <span>全局检索</span>
      </button>
      
      <!-- 预警提醒按钮 -->
      <button class="header-btn warning-btn" @click="openWarning">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span>预警提醒</span>
        <span class="warning-badge">3</span>
      </button>
      
      <button class="quick-nav">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <polygon points="12 2 2 7 12 12 22 7 12 2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <polygon points="2 17 12 22 22 17 12 12 2 17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span>新建快捷导航</span>
      </button>
      <div class="user-info">
        <div class="user-avatar">
          <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="16" cy="16" r="16" fill="#D1D5DB"/>
            <circle cx="16" cy="13" r="6" fill="#9CA3AF"/>
            <path d="M6 28C6 23.5817 9.58172 20 14 20H18C22.4183 20 26 23.5817 26 28" fill="#9CA3AF"/>
          </svg>
        </div>
        <span class="user-name">付世平</span>
        <svg class="dropdown-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['toggle-sidebar'])

const openSearch = () => {
  // 触发全局搜索
  console.log('打开全局检索')
  // 可以通过事件总线或Pinia触发SearchModal组件显示
  window.dispatchEvent(new CustomEvent('open-global-search'))
}

const openWarning = () => {
  // 触发预警提醒
  console.log('打开预警提醒')
  // 可以通过事件总线或Pinia触发WarningModal组件显示
  window.dispatchEvent(new CustomEvent('open-warning-modal'))
}
</script>

<style scoped>
.header {
  height: 56px;
  background-color: #FFFFFF;
  border-bottom: 1px solid #E5E7EB;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  position: sticky;
  top: 0;
  z-index: 50;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 8px;
}

.menu-toggle-btn {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  cursor: pointer;
  border-radius: 6px;
  color: #6B7280;
  transition: all 0.2s;
  display: none;
}

.menu-toggle-btn:hover {
  background-color: #F3F4F6;
  color: #374151;
}

.menu-toggle-btn svg {
  width: 20px;
  height: 20px;
}

.icon-btn {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  cursor: pointer;
  border-radius: 6px;
  color: #6B7280;
  transition: all 0.2s;
}

.icon-btn:hover {
  background-color: #F3F4F6;
  color: #374151;
}

.icon-btn svg {
  width: 20px;
  height: 20px;
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #374151;
  font-size: 14px;
  padding: 6px 12px;
  background-color: #F3F4F6;
  border-radius: 6px;
}

.breadcrumb svg {
  width: 16px;
  height: 16px;
  color: #00A896;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.header-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background: transparent;
  border: 1px solid #d9d9d9;
  color: #666;
  font-size: 13px;
  cursor: pointer;
  border-radius: 6px;
  transition: all 0.2s;
  position: relative;
}

.header-btn:hover {
  border-color: #1890ff;
  color: #1890ff;
}

.header-btn svg {
  width: 16px;
  height: 16px;
}

.warning-btn {
  border-color: #ff4d4f;
  color: #ff4d4f;
}

.warning-btn:hover {
  background-color: #fff1f0;
  border-color: #ff4d4f;
  color: #ff4d4f;
}

.warning-badge {
  position: absolute;
  top: -6px;
  right: -6px;
  min-width: 18px;
  height: 18px;
  background: #ff4d4f;
  color: #fff;
  border-radius: 9px;
  font-size: 11px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 4px;
}

.quick-nav {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background: transparent;
  border: none;
  color: #00A896;
  font-size: 13px;
  cursor: pointer;
  border-radius: 6px;
  transition: all 0.2s;
}

.quick-nav:hover {
  background-color: #ECFDF5;
}

.quick-nav svg {
  width: 16px;
  height: 16px;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 8px 6px 6px;
  border-radius: 20px;
  background-color: #F3F4F6;
  cursor: pointer;
  transition: all 0.2s;
}

.user-info:hover {
  background-color: #E5E7EB;
}

.user-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  overflow: hidden;
}

.user-avatar svg {
  width: 100%;
  height: 100%;
}

.user-name {
  font-size: 14px;
  color: #374151;
}

.dropdown-icon {
  width: 14px;
  height: 14px;
  color: #6B7280;
}

.desktop-only {
  display: flex;
}

@media (max-width: 768px) {
  .header {
    padding: 0 12px;
  }
  
  .menu-toggle-btn {
    display: flex;
  }
  
  .desktop-only {
    display: none;
  }
  
  .quick-nav span {
    display: none;
  }
  
  .user-name {
    display: none;
  }
  
  .breadcrumb {
    font-size: 12px;
    padding: 4px 8px;
  }
  
  .breadcrumb svg {
    width: 14px;
    height: 14px;
  }
}
</style>
