<template>
  <div class="tree-node-item">
    <div 
      class="node-row" 
      :class="{ 'has-children': hasChildren }"
      :style="{ paddingLeft: (depth * 16) + 'px' }"
    >
      <span class="expand-icon" @click.stop="handleExpand">
        <svg v-if="hasChildren" :class="{ 'expanded': isExpanded }" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <polyline points="9 18 15 12 9 6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span v-else class="placeholder"></span>
      </span>
      
      <label class="checkbox-wrapper" @click.stop>
        <input 
          type="checkbox" 
          :checked="isChecked"
          :ref="el => setCheckboxRef(el)"
          @change="onCheckboxChange"
        />
        <span class="checkbox-custom" :class="{ 'indeterminate': isIndeterminate }"></span>
      </label>
      
      <span class="node-label" @click="handleExpand">{{ node.title }}</span>
    </div>
    
    <div class="node-children" v-if="hasChildren && isExpanded">
      <PermissionTreeNode
        v-for="child in node.children"
        :key="child.key"
        :node="child"
        :checked-nodes="checkedNodes"
        :depth="depth + 1"
        @toggle="onToggle"
        @check="onCheck"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch, nextTick } from 'vue'

const props = defineProps({
  node: {
    type: Object,
    required: true
  },
  checkedNodes: {
    type: Set,
    required: true
  },
  depth: {
    type: Number,
    default: 0
  }
})

const emit = defineEmits(['toggle', 'check'])

const checkboxEl = ref(null)
const localExpanded = ref(true) // 默认展开

const hasChildren = computed(() => {
  return props.node.children && props.node.children.length > 0
})

// 判断当前节点是否被完全选中
const isChecked = computed(() => {
  if (!hasChildren.value) {
    return props.checkedNodes.has(props.node.key)
  }
  // 有子节点：所有子节点都被选中才算选中
  return areAllChildrenChecked(props.node)
})

// 判断是否半选状态
const isIndeterminate = computed(() => {
  if (!hasChildren.value) return false
  const hasChecked = props.node.children.some(child => {
    if (child.children && child.children.length > 0) {
      return isNodeCheckedOrIndeterminate(child)
    }
    return props.checkedNodes.has(child.key)
  })
  const allChecked = areAllChildrenChecked(props.node)
  return hasChecked && !allChecked
})

// 递归检查节点是否被选中或半选
const isNodeCheckedOrIndeterminate = (node) => {
  if (!node.children || node.children.length === 0) {
    return props.checkedNodes.has(node.key)
  }
  return node.children.some(child => {
    if (child.children && child.children.length > 0) {
      return isNodeCheckedOrIndeterminate(child)
    }
    return props.checkedNodes.has(child.key)
  })
}

// 递归检查所有子节点是否都被选中
const areAllChildrenChecked = (node) => {
  if (!node.children || node.children.length === 0) return false
  return node.children.every(child => {
    if (child.children && child.children.length > 0) {
      return areAllChildrenChecked(child)
    }
    return props.checkedNodes.has(child.key)
  })
}

const isExpanded = computed(() => localExpanded.value)

const handleExpand = () => {
  if (hasChildren.value) {
    localExpanded.value = !localExpanded.value
    emit('toggle', props.node.key)
  }
}

// 递归获取节点及其所有子 key
const getAllKeys = (node) => {
  const keys = [node.key]
  if (node.children) {
    node.children.forEach(child => {
      keys.push(...getAllKeys(child))
    })
  }
  return keys
}

const onCheckboxChange = (e) => {
  const checked = e.target.checked
  const allKeys = getAllKeys(props.node)
  
  // 通过 emit 通知父组件更新
  emit('check', { keys: allKeys, checked })
  
  // 立即更新当前 checkbox 的 indeterminate 状态
  nextTick(() => {
    if (checkboxEl.value) {
      checkboxEl.value.indeterminate = false
    }
  })
}

const setCheckboxRef = (el) => {
  if (el) {
    checkboxEl.value = el
  }
}

// 同步 indeterminate 状态到原生 checkbox
watch(() => isIndeterminate.value, (val) => {
  nextTick(() => {
    if (checkboxEl.value) {
      checkboxEl.value.indeterminate = val
    }
  })
}, { immediate: true })

onMounted(() => {
  nextTick(() => {
    if (checkboxEl.value) {
      checkboxEl.value.indeterminate = isIndeterminate.value
    }
  })
})
</script>

<style scoped>
.tree-node-item {
  user-select: none;
}

.node-row {
  display: flex;
  align-items: center;
  gap: 4px;
  height: 32px;
  padding: 0 8px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.15s;
}

.node-row:hover {
  background-color: #f5f7fa;
}

.expand-icon {
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
  flex-shrink: 0;
}

.expand-icon svg {
  width: 14px;
  height: 14px;
  transition: transform 0.2s;
}

.expand-icon svg.expanded {
  transform: rotate(90deg);
}

.expand-icon .placeholder {
  width: 14px;
}

.checkbox-wrapper {
  display: flex;
  align-items: center;
  cursor: pointer;
  flex-shrink: 0;
}

.checkbox-wrapper input {
  display: none;
}

.checkbox-custom {
  width: 16px;
  height: 16px;
  border: 1px solid #d9d9d9;
  border-radius: 2px;
  background: #fff;
  position: relative;
  transition: all 0.2s;
  flex-shrink: 0;
}

.checkbox-wrapper input:checked + .checkbox-custom {
  background-color: #1890ff;
  border-color: #1890ff;
}

.checkbox-wrapper input:checked + .checkbox-custom::after {
  content: '';
  position: absolute;
  left: 4px;
  top: 1px;
  width: 5px;
  height: 9px;
  border: solid #fff;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.checkbox-custom.indeterminate {
  background-color: #1890ff;
  border-color: #1890ff;
}

.checkbox-custom.indeterminate::after {
  content: '';
  position: absolute;
  left: 3px;
  top: 6px;
  width: 8px;
  height: 2px;
  background: #fff;
  border: none;
  transform: none;
}

.node-label {
  font-size: 14px;
  color: #333;
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.node-children {
  overflow: hidden;
}
</style>
