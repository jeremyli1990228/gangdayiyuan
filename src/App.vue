<template>
  <div class="app-container">
    <!-- H5页面单独渲染 -->
    <router-view v-if="isH5Page" />
    
    <!-- 电脑端页面布局 -->
    <template v-else>
      <Sidebar :collapsed="sidebarCollapsed" @toggle="sidebarCollapsed = !sidebarCollapsed" />
      <div class="main-content" :class="{ 'sidebar-collapsed': sidebarCollapsed }">
        <Header @toggle-sidebar="sidebarCollapsed = !sidebarCollapsed" />
        <router-view />
      </div>
      <div v-if="sidebarCollapsed && !isMobile" class="sidebar-overlay" @click="sidebarCollapsed = false"></div>
      
    </template>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import Sidebar from './components/Sidebar.vue'
import Header from './components/Header.vue'

const route = useRoute()
const sidebarCollapsed = ref(false)

// 判断是否是H5页面
const isH5Page = computed(() => {
  return route.path.startsWith('/h5/')
})
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}

.app-container {
  display: flex;
  min-height: 100vh;
}

.main-content {
  flex: 1;
  margin-left: 220px;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #F5F7FA;
  transition: margin-left 0.3s ease;
}

.main-content.sidebar-collapsed {
  margin-left: 64px;
}

.sidebar-overlay {
  position: fixed;
  top: 0;
  left: 64px;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 90;
}

@media (max-width: 768px) {
  .main-content {
    margin-left: 0;
    position: relative;
    z-index: 10;
  }
  
  .main-content.sidebar-collapsed {
    margin-left: 0;
  }
  
  .sidebar-overlay {
    left: 0;
    display: none;
  }
  
  .main-content.sidebar-collapsed + .sidebar-overlay {
    display: block;
  }
}
</style>
