<template>
  <aside class="sidebar" :class="{ 'collapsed': collapsed }">
    <div class="sidebar-header">
      <svg class="logo" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
        <circle cx="30" cy="30" r="28" fill="#1890ff"/>
        <path d="M15 30 Q15 18 24 18 Q30 18 30 24 Q30 18 36 18 Q45 18 45 30 Q45 42 36 42 Q30 42 30 36 Q30 42 24 42 Q15 42 15 30 Z" fill="#40a9ff"/>
        <circle cx="24" cy="24" r="6" fill="#FFFFFF"/>
        <circle cx="36" cy="36" r="6" fill="#FFFFFF"/>
      </svg>
      <div class="logo-text" v-show="!collapsed">
        <div class="logo-title">香港大学深圳医院</div>
        <div class="logo-subtitle">The University of Hong Kong<br/>Shenzhen Hospital</div>
      </div>
    </div>
    <div class="nav-menu">
      <router-link to="/" class="menu-item" :class="{ 'active': $route.path === '/' }">
        <svg class="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 9L12 2L21 9V20C21 20.5304 21.7893 21.0391 21.4142 21.4142C21.0391 21.7893 20.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M9 22V12H15V22" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span>首页</span>
        <div class="menu-tooltip">首页</div>
      </router-link>
      <div class="menu-submenu" v-for="submenu in menuData" :key="submenu.key">
        <div class="menu-item" @click="handleMenuClick(submenu.key)">
          <svg class="menu-icon" :viewBox="submenu.iconViewBox" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path :d="submenu.iconPath" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path v-if="submenu.iconPath2" :d="submenu.iconPath2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span>{{ submenu.title }}</span>
          <div class="menu-tooltip">{{ submenu.title }}</div>
          <svg v-if="submenu.items.length > 0 && !collapsed" class="expand-icon" :class="{ 'expanded': openMenus.includes(submenu.key) }" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <div class="submenu-items" :class="{ 'open': openMenus.includes(submenu.key) }">
          <router-link 
            v-for="item in submenu.items" 
            :key="item.path"
            :to="item.path"
            class="submenu-item"
            :class="{ 'active': $route.path === item.path }"
          >
            {{ item.name }}
          </router-link>
        </div>
      </div>
    </div>
    <button class="collapse-btn" @click="$emit('toggle')">
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15 19l-7-7 7-7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
  </aside>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const props = defineProps({
  collapsed: {
    type: Boolean,
    default: false
  }
})

defineEmits(['toggle'])

const route = useRoute()
const openMenus = ref(['my-cases'])

const handleMenuClick = (key) => {
  if (!props.collapsed) {
    toggleSubmenu(key)
  }
}

const toggleSubmenu = (key) => {
  const index = openMenus.value.indexOf(key)
  if (index > -1) {
    openMenus.value.splice(index, 1)
  } else {
    openMenus.value.push(key)
  }
}

const menuData = [
  {
    key: 'my-cases',
    title: '我的案件',
    iconViewBox: '0 0 24 24',
    iconPath: 'M12 2L2 7L12 12L22 7L12 2Z',
    iconPath2: 'M2 17L12 22L22 17',
    items: [
      { name: '我跟进的', path: '/my-cases/following' },
      { name: '转办知悉', path: '/my-cases/transfer-notice' },
      { name: '出具科室意见', path: '/my-cases/opinions' },
      { name: '有效性判定', path: '/my-cases/validity' },
      { name: '完结归档判定', path: '/my-cases/archive' },
      { name: '我移交的', path: '/my-cases/transferred-out' },
      { name: '移交我的', path: '/my-cases/transferred-in' },
      { name: '我发起的转办', path: '/my-cases/initiated-transfer' },
      { name: '我发起的申请', path: '/my-cases/initiated-application' },
      { name: '所有案件', path: '/my-cases/all' }
    ]
  },
  {
    key: 'complaint',
    title: '投诉管理',
    iconViewBox: '0 0 24 24',
    iconPath: 'M21 15A2 2 0 0 1 19 17H7L3 21V5C3 3.89543 3.89543 3 5 3H19C20.1046 3 21 3.89543 21 5V15Z',
    items: [
      { name: '常见问题', path: '/complaint/faq' },
      { name: '反馈管理', path: '/complaint/feedback-manage' },
      { name: '反馈类型', path: '/complaint/feedback-type' },
      { name: '数据统计', path: '/complaint/statistics' },
      { name: '反馈设置', path: '/complaint/settings' },
      { name: '我的反馈', path: '/complaint/my-feedback' }
    ]
  },
  {
    key: 'process-cases',
    title: '处理案件',
    iconViewBox: '0 0 24 24',
    iconPath: 'M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z',
    iconPath2: 'M12 6V12L16 14',
    items: [
      { name: '新增案件', path: '/process-cases/add' },
      { name: '所有案件', path: '/process-cases/all' },
      { name: '草稿箱', path: '/process-cases/drafts' },
      { name: '结案反馈', path: '/process-cases/feedback' },
      { name: '多模块录入', path: '/process-cases/multi-module' },
      { name: '案件闭环管理', path: '/process-cases/case-tracking' }
    ]
  },
  {
    key: 'report-cases',
    title: '案件报备',
    iconViewBox: '0 0 24 24',
    iconPath: 'M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2Z',
    iconPath2: 'M14 2V8H20',
    items: [
      { name: '新增报备案件', path: '/report-cases/add' },
      { name: '我的报备', path: '/report-cases/mine' },
      { name: '所有报备', path: '/report-cases/all' }
    ]
  },
  {
    key: 'questionnaire',
    title: '问卷调查',
    iconViewBox: '0 0 24 24',
    iconPath: 'M9 11H9.01M15 11H15.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z',
    items: [
      { name: '满意度调查', path: '/questionnaire/satisfaction' },
      { name: '问卷推广', path: '/questionnaire/promotion' }
    ]
  },
  {
    key: 'learning',
    title: '学习资料',
    iconViewBox: '0 0 24 24',
    iconPath: 'M12 6.25278V19.2528M12 6.25278C10.8321 5.47686 9.24649 5 7.5 5C5.75351 5 4.16789 5.47686 3 6.25278V19.2528C4.16789 18.4769 5.75351 18 7.5 18C9.24649 18 10.8321 18.4769 12 19.2528M12 6.25278C13.1679 5.47686 14.7535 5 16.5 5C18.2465 5 19.8321 5.47686 21 6.25278V19.2528C19.8321 18.4769 18.2465 18 16.5 18C14.7535 18 13.1679 18.4769 12 19.2528',
    items: [
      { name: '文档中心', path: '/learning/document-center' }
    ]
  },
  {
    key: 'knowledge',
    title: '知识库',
    iconViewBox: '0 0 24 24',
    iconPath: 'M12 6.25278V19.2528M12 6.25278C10.8321 5.47686 9.24649 5 7.5 5C5.75351 5 4.16789 5.47686 3 6.25278V19.2528C4.16789 18.4769 5.75351 18 7.5 18C9.24649 18 10.8321 18.4769 12 19.2528M12 6.25278C13.1679 5.47686 14.7535 5 16.5 5C18.2465 5 19.8321 5.47686 21 6.25278V19.2528C19.8321 18.4769 18.2465 18 16.5 18C14.7535 18 13.1679 18.4769 12 19.2528',
    items: [
      { name: '知识库首页', path: '/knowledge' }
    ]
  },
  {
    key: 'statistics',
    title: '数据统计',
    iconViewBox: '0 0 24 24',
    iconPath: 'M3 3V21H21M3 3V21H21M3 3V21H21M7 16V12M12 16V8M17 16V4',
    items: [
      { name: '案件变化趋势', path: '/statistics/case-trend' },
      { name: '案件受理类型分布', path: '/statistics/case-type-distribution' },
      { name: '案件状态分布', path: '/statistics/case-status-distribution' },
      { name: '案件反馈分布', path: '/statistics/case-feedback-distribution' },
      { name: '工作量统计', path: '/statistics/workload-statistics' },
      { name: '结案时长统计', path: '/statistics/case-duration' },
      { name: '满意度样本数统计', path: '/statistics/satisfaction-sample' },
      { name: '满意度分项指标', path: '/statistics/satisfaction-indicators' },
      { name: '数据可视化看板', path: '/statistics/dashboard' },
      { name: '报表分析', path: '/statistics/report-analysis' },
      { name: '导出中心', path: '/statistics/export-center' }
    ]
  },
  {
    key: 'social-work',
    title: '社工管理',
    iconViewBox: '0 0 24 24',
    iconPath: 'M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21',
    iconPath2: 'M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z',
    items: [
      { name: '招聘管理', path: '/social-work/recruitment-manage' },
      { name: '社工管理', path: '/social-work/social-worker-manage' },
      { name: '工时管理', path: '/social-work/work-time-manage' },
      { name: '招聘推广', path: '/social-work/recruitment-promotion' }
    ]
  },
  {
    key: 'contacts',
    title: '通讯录',
    iconViewBox: '0 0 24 24',
    iconPath: 'M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z M22 3L12 10.5L2 3',
    items: [
      { name: '员工列表', path: '/contacts/employee-list' },
      { name: '员工组', path: '/contacts/employee-group' },
      { name: '组织关系', path: '/contacts/organization' },
      { name: '反馈人名单', path: '/contacts/feedback-list' },
      { name: '患者名单', path: '/contacts/patient-list' },
      { name: '更新配置', path: '/contacts/sync-config' }
    ]
  },
  {
    key: 'messages',
    title: '消息',
    iconViewBox: '0 0 24 24',
    iconPath: 'M21 15A2 2 0 0 1 19 17H7L3 21V5C3 3.89543 3.89543 3 5 3H19C20.1046 3 21 3.89543 21 5V15Z',
    items: [
      { name: '站内信', path: '/messages/inbox' },
      { name: '邮件记录', path: '/messages/email-records' },
      { name: '短信记录', path: '/messages/sms-records' },
      { name: '系统日志', path: '/messages/system-log' },
      { name: '消息中心', path: '/notifications' }
    ]
  },
  {
    key: 'settings',
    title: '设置',
    iconViewBox: '0 0 24 24',
    iconPath: 'M10.325 4.317C10.7558 3.58054 11.6225 3.13846 12.545 3.13846C13.4675 3.13846 14.3342 3.58054 14.765 4.317L15.165 5.017C15.363 5.361 15.789 5.598 16.245 5.638L17.155 5.717C18.115 5.801 18.845 6.614 18.845 7.584V8.397C18.845 8.863 19.037 9.308 19.375 9.623L19.945 10.163C20.4306 10.6263 20.686 11.2877 20.638 11.974C20.59 12.6603 20.2445 13.3035 19.685 13.755L18.985 14.315C18.641 14.583 18.452 15.037 18.472 15.511L18.552 16.421C18.656 17.471 17.812 18.303 16.772 18.303H15.959C15.493 18.303 15.053 18.504 14.738 18.851L14.198 19.431C13.7399 19.9465 13.0965 20.3109 12.3753 20.4609C11.6542 20.6108 10.8968 20.5392 10.215 20.26L9.505 19.97C9.061 19.791 8.562 19.805 8.129 20.013L7.279 20.413C6.319 20.867 5.26 20.615 4.706 19.655L4.306 18.945C4.039 18.473 3.873 17.934 3.846 17.383L3.766 16.473C3.669 15.513 4.246 14.623 5.146 14.343L5.856 14.123C6.342 13.974 6.691 13.518 6.691 13.003V12.19C6.691 11.724 6.49 11.284 6.143 10.969L5.563 10.429C5.04426 9.9391 4.76571 9.27351 4.809 8.587C4.85229 7.90048 5.21095 7.27547 5.791 6.875L6.501 6.385C6.873 6.118 7.054 5.633 7.012 5.143L6.932 4.233C6.828 3.183 7.672 2.351 8.712 2.351H9.525C9.991 2.351 10.431 2.15 10.746 1.803L11.306 1.213C11.783 0.666489 12.42 0.355322 13.094 0.35362C13.768 0.351919 14.406 0.659698 14.89 1.213L15.45 1.803C15.805 2.191 16.257 2.396 16.735 2.396H17.548C18.588 2.396 19.432 3.228 19.536 4.278L19.616 5.188C19.658 5.678 19.477 6.163 19.105 6.43L18.395 6.92C17.91 7.268 17.55 7.753 17.46 8.323L17.38 9.233C17.276 10.283 16.432 11.115 15.392 11.115H14.579C14.113 11.115 13.673 11.316 13.358 11.663L12.778 12.253C12.2898 12.7961 11.6621 13.1439 10.98 13.235C10.2979 13.3261 9.61917 13.1549 9.08 12.755L8.37 12.255C8.02 12.003 7.55 11.889 7.08 11.949L6.17 12.049C5.13 12.163 4.27 13.027 4.14 14.067L4.04 14.977C3.98 15.447 4.094 15.917 4.346 16.267L4.926 17.057C5.37638 17.6821 5.61174 18.4407 5.57 19.227C5.52826 20.0133 5.21263 20.7607 4.68 21.36',
    items: [
      { name: '公共词库', path: '/settings/public-thesaurus' },
      { name: '个人词库', path: '/settings/personal-thesaurus' },
      { name: '审批设置', path: '/settings/approval-settings' },
      { name: '科室架构', path: '/settings/department-manage' },
      { name: '投诉原因', path: '/settings/complaint-reason' },
      { name: '系统设置', path: '/settings/advanced' }
    ]
  },
  {
    key: 'memo',
    title: '个人备忘录',
    iconViewBox: '0 0 24 24',
    iconPath: 'M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z',
    iconPath2: 'M7 7H17M7 12H17M7 17H12',
    items: [
      { name: '备忘录列表', path: '/memo' }
    ]
  },
  {
    key: 'system-auth',
    title: '系统权限',
    iconViewBox: '0 0 24 24',
    iconPath: 'M19 11H5C3.89543 11 3 11.8954 3 13V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V13C21 11.8954 20.1046 11 19 11Z',
    iconPath2: 'M7 11V7C7 5.67392 7.52678 4.40215 8.46447 3.46447C9.40215 2.52678 10.6739 2 12 2C13.3261 2 14.5979 2.52678 15.5355 3.46447C16.4732 4.40215 17 5.67392 17 7V11',
    items: [
      { name: '用户管理', path: '/system-auth/user-manage' },
      { name: '角色管理', path: '/system-auth/role-manage' },
      { name: '菜单管理', path: '/system-auth/menu-manage' },
      { name: '功能权限', path: '/system-auth/function-permission' },
      { name: '权限配置', path: '/system-auth/permission-config' }
    ]
  },
  {
    key: 'system-manage',
    title: '系统管理',
    iconViewBox: '0 0 24 24',
    iconPath: 'M13 2L3 14H12L11 22L21 10H12L13 2Z',
    items: [
      { name: '日志管理', path: '/system-manage/log-manage' },
      { name: '字典管理', path: '/system-manage/dictionary-manage' },
      { name: '终端管理', path: '/system-manage/terminal-manage' },
      { name: '密钥管理', path: '/system-manage/key-manage' },
      { name: '令牌管理', path: '/system-manage/token-manage' },
      { name: '动态路由', path: '/system-manage/dynamic-route' }
    ]
  }
]

// 根据当前路由自动展开对应的菜单
watch(() => route.path, (newPath) => {
  if (newPath.startsWith('/my-cases')) {
    if (!openMenus.value.includes('my-cases')) {
      openMenus.value.push('my-cases')
    }
  } else if (newPath.startsWith('/complaint')) {
    if (!openMenus.value.includes('complaint')) {
      openMenus.value.push('complaint')
    }
  } else if (newPath.startsWith('/process-cases')) {
    if (!openMenus.value.includes('process-cases')) {
      openMenus.value.push('process-cases')
    }
  } else if (newPath.startsWith('/report-cases')) {
    if (!openMenus.value.includes('report-cases')) {
      openMenus.value.push('report-cases')
    }
  } else if (newPath.startsWith('/questionnaire')) {
    if (!openMenus.value.includes('questionnaire')) {
      openMenus.value.push('questionnaire')
    }
  } else if (newPath.startsWith('/learning')) {
    if (!openMenus.value.includes('learning')) {
      openMenus.value.push('learning')
    }
  } else if (newPath.startsWith('/knowledge')) {
    if (!openMenus.value.includes('knowledge')) {
      openMenus.value.push('knowledge')
    }
  } else if (newPath.startsWith('/statistics')) {
    if (!openMenus.value.includes('statistics')) {
      openMenus.value.push('statistics')
    }
  } else if (newPath.startsWith('/social-work')) {
    if (!openMenus.value.includes('social-work')) {
      openMenus.value.push('social-work')
    }
  } else if (newPath.startsWith('/contacts')) {
    if (!openMenus.value.includes('contacts')) {
      openMenus.value.push('contacts')
    }
  } else if (newPath.startsWith('/messages')) {
    if (!openMenus.value.includes('messages')) {
      openMenus.value.push('messages')
    }
  } else if (newPath.startsWith('/notifications')) {
    if (!openMenus.value.includes('messages')) {
      openMenus.value.push('messages')
    }
  } else if (newPath.startsWith('/settings')) {
    if (!openMenus.value.includes('settings')) {
      openMenus.value.push('settings')
    }
  } else if (newPath.startsWith('/memo')) {
    if (!openMenus.value.includes('memo')) {
      openMenus.value.push('memo')
    }
  } else if (newPath.startsWith('/system-auth')) {
    if (!openMenus.value.includes('system-auth')) {
      openMenus.value.push('system-auth')
    }
  } else if (newPath.startsWith('/system-manage')) {
    if (!openMenus.value.includes('system-manage')) {
      openMenus.value.push('system-manage')
    }
  }
}, { immediate: true })
</script>

<style scoped>
.sidebar {
  width: 220px;
  background-color: #1A1F36;
  color: #FFFFFF;
  display: flex;
  flex-direction: column;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 100;
  transition: width 0.3s ease, transform 0.3s ease;
}

.sidebar.collapsed {
  width: 64px;
}

.sidebar-header {
  padding: 16px 20px;
  background: #1890ff;
  display: flex;
  align-items: center;
  gap: 12px;
  justify-content: center;
}

.collapsed .sidebar-header {
  padding: 12px;
}

.logo {
  width: 48px;
  height: 48px;
  flex-shrink: 0;
}

.collapsed .logo {
  width: 40px;
  height: 40px;
}

.logo-text {
  display: flex;
  flex-direction: column;
}

.logo-title {
  font-size: 14px;
  font-weight: 600;
  color: #FFFFFF;
  line-height: 1.3;
}

.logo-subtitle {
  font-size: 9px;
  color: rgba(255, 255, 255, 0.85);
  line-height: 1.4;
  margin-top: 2px;
}

.nav-menu {
  flex: 1;
  padding: 8px 0;
  overflow-y: auto;
}

.menu-item {
  display: flex;
  align-items: center;
  padding: 12px 20px;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.7);
  transition: all 0.2s;
  gap: 10px;
  text-decoration: none;
  position: relative;
}

.collapsed .menu-item {
  padding: 12px;
  justify-content: center;
}

.menu-item:hover {
  background-color: rgba(255, 255, 255, 0.08);
  color: rgba(255, 255, 255, 0.95);
}

.menu-item.active {
  background-color: #1890ff;
  color: #FFFFFF;
}

.menu-icon {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}

.expand-icon {
  width: 16px;
  height: 16px;
  margin-left: auto;
  transition: transform 0.2s;
  flex-shrink: 0;
}

.expand-icon.expanded {
  transform: rotate(90deg);
}

.menu-tooltip {
  display: none;
  position: absolute;
  left: 100%;
  top: 50%;
  transform: translateY(-50%);
  background-color: #374151;
  color: #FFFFFF;
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 13px;
  white-space: nowrap;
  z-index: 200;
  margin-left: 8px;
}

.menu-tooltip::before {
  content: '';
  position: absolute;
  right: 100%;
  top: 50%;
  transform: translateY(-50%);
  border: 6px solid transparent;
  border-right-color: #374151;
}

.collapsed .menu-item:hover .menu-tooltip {
  display: block;
}

.submenu-items {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease-out;
}

.submenu-items.open {
  max-height: 500px;
}

.collapsed .submenu-items {
  display: none;
}

.submenu-item {
  display: block;
  padding: 10px 20px 10px 50px;
  color: rgba(255, 255, 255, 0.6);
  font-size: 13px;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s;
}

.submenu-item:hover {
  background-color: rgba(255, 255, 255, 0.06);
  color: rgba(255, 255, 255, 0.9);
}

.submenu-item.active {
  background-color: #FFFFFF;
  color: #333;
}

.collapse-btn {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 40px;
  height: 40px;
  border: none;
  background-color: rgba(255, 255, 255, 0.1);
  color: #FFFFFF;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.collapse-btn:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.collapse-btn svg {
  width: 18px;
  height: 18px;
  transition: transform 0.3s ease;
}

.collapsed .collapse-btn svg {
  transform: rotate(180deg);
}

@media (max-width: 768px) {
  .sidebar {
    transform: translateX(-100%);
    width: 260px;
  }
  
  .sidebar.collapsed {
    transform: translateX(0);
    width: 260px;
  }
  
  .sidebar.collapsed .menu-tooltip {
    display: none;
  }
  
  .collapse-btn {
    display: none;
  }
  
  .logo {
    width: 40px;
    height: 40px;
  }
  
  .logo-text {
    display: flex !important;
  }
  
  .menu-item {
    padding: 12px 20px !important;
    justify-content: flex-start !important;
  }
  
  .expand-icon {
    display: block !important;
  }
  
  .submenu-items {
    display: block !important;
  }
}
</style>
