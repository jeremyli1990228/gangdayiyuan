import { ref, watch } from 'vue'

const STORAGE_KEY = 'handleResultTemplates'

const defaultTemplates = {
  resolved: [
    { id: 'r1', name: '标准已解决回复', content: '您的反馈已处理完成，问题已解决。感谢您的监督与支持。', isDefault: true, enabled: true },
    { id: 'r2', name: '退款解决回复', content: '您反馈的费用问题已核实并完成退款处理，请查收。感谢您的理解。', isDefault: false, enabled: true }
  ],
  processing: [
    { id: 'p1', name: '标准处理中回复', content: '您的反馈已受理，正在处理中，请耐心等待处理结果。', isDefault: true, enabled: true },
    { id: 'p2', name: '需核实处理中', content: '您的反馈已收到，需进一步核实情况，预计3-5个工作日内回复。', isDefault: false, enabled: true }
  ],
  rejected: [
    { id: 'rej1', name: '标准不予受理', content: '您的反馈经核实不属于受理范围，不予受理。如有疑问请联系客服。', isDefault: true, enabled: true }
  ]
}

// 模块级单例，所有组件共享同一响应式状态
let templatesRef = null
let watcherInitialized = false

function loadTemplates() {
  if (templatesRef) return templatesRef
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const parsed = JSON.parse(stored)
      templatesRef = ref({
        resolved: Array.isArray(parsed.resolved) ? parsed.resolved : JSON.parse(JSON.stringify(defaultTemplates.resolved)),
        processing: Array.isArray(parsed.processing) ? parsed.processing : JSON.parse(JSON.stringify(defaultTemplates.processing)),
        rejected: Array.isArray(parsed.rejected) ? parsed.rejected : JSON.parse(JSON.stringify(defaultTemplates.rejected))
      })
    } else {
      templatesRef = ref(JSON.parse(JSON.stringify(defaultTemplates)))
    }
  } catch (e) {
    templatesRef = ref(JSON.parse(JSON.stringify(defaultTemplates)))
  }
  if (!watcherInitialized) {
    watch(templatesRef, () => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(templatesRef.value))
    }, { deep: true })
    watcherInitialized = true
  }
  return templatesRef
}

export function useHandleResultTemplates() {
  const templates = loadTemplates()

  const addTemplate = (resultKey, template) => {
    const id = Date.now().toString(36) + Math.random().toString(36).substring(2, 7)
    const newTemplate = { ...template, id }
    templates.value[resultKey].push(newTemplate)
    if (template.isDefault) {
      templates.value[resultKey].forEach(t => {
        if (t.id !== id) t.isDefault = false
      })
    }
  }

  const updateTemplate = (resultKey, id, updates) => {
    const tpl = templates.value[resultKey].find(t => t.id === id)
    if (tpl) {
      Object.assign(tpl, updates)
      if (updates.isDefault) {
        templates.value[resultKey].forEach(t => {
          if (t.id !== id) t.isDefault = false
        })
      }
    }
  }

  const deleteTemplate = (resultKey, id) => {
    const index = templates.value[resultKey].findIndex(t => t.id === id)
    if (index > -1) {
      templates.value[resultKey].splice(index, 1)
    }
  }

  const getEnabledTemplates = (resultKey) => {
    if (!resultKey) return []
    return templates.value[resultKey].filter(t => t.enabled)
  }

  return {
    templates,
    addTemplate,
    updateTemplate,
    deleteTemplate,
    getEnabledTemplates
  }
}
