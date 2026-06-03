<template>
  <header class="header">
    <div class="header-left">
      <button class="icon-btn">
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
</script>

<style scoped>
.header {
  height: 56px;
  background-color: #FFFFFF;
  border-bottom: 1px solid #E5E7EB;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  position: sticky;
  top: 0;
  z-index: 50;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 8px;
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
  gap: 16px;
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
</style>
