<template>
    <div class="mb-4">
        <el-button type="primary"  @click="handleAdd">
            <el-icon><Plus /></el-icon>
        </el-button>
    </div>
    <el-table :data="filterTableData" style="width: 100%" @selection-change="handleSelectionChange">
        <!-- 表格列定义 -->
        <el-table-column type="selection" width="55" />
        <el-table-column label="日期" prop="date" />
        <el-table-column label="事件" prop="notes" />
        <el-table-column align="right">
            <template #header>
                <el-button
                    type="danger"
                    size="small"
                    :disabled="selectedRows.length === 0"
                    @click="handleBatchDelete"
                >
                    批量删除
                </el-button>
            </template>
            <template #default="scope">
                <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
                <el-button
                    size="small"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)"
                >
                    删除
                </el-button>
            </template>
        </el-table-column>
    </el-table>

    <!-- 添加/编辑对话框 -->
    <el-dialog v-model="dialogVisible" :title="isAdding ? '添加事件' : '编辑数据'" width="30%">
        <el-form :model="editForm" label-width="80px">
            <el-form-item label="日期">
                <el-date-picker
                    v-model="editForm.date"
                    type="date"
                    placeholder="选择日期"
                    value-format="YYYY-MM-DD"
                />
            </el-form-item>
            <el-form-item label="名称">
                <el-input v-model="editForm.notes" placeholder="请输入事件名称" />
            </el-form-item>
        </el-form>
        <template #footer>
            <el-button @click="dialogVisible = false">取消</el-button>
            <el-button type="primary" @click="confirmEdit">确定</el-button>
        </template>
    </el-dialog>
    <button class="show-code-fab" style="background-color: red;" @click="showCode = true" title="查看代码"></button>
    <div v-if="showCode" class="code-modal">
        <div class="code-modal-content">
            <button class="close-btn" @click="showCode = false">×</button>
            <button class="copy-btn" @click="copyCode" title="复制代码">复制</button>
            <transition name="fade">
                <div v-if="copySuccess" class="copy-success-tip">复制成功</div>
            </transition>
            <pre><code>{{ sourceCode }}</code></pre>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed, ref, onMounted } from 'vue'
import { ElMessageBox, ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue' // 导入 Plus加号 图标
//导入查看代码按钮样式以及复制成功提示样式
import '@/assets/style/showcode.css'
const showCode = ref(false)
const copySuccess = ref(false)
const sourceCode = `<template>
    <div class="mb-4">
        <el-button type="primary"  @click="handleAdd">
            <el-icon><Plus /></el-icon>
        </el-button>
    </div>
    <el-table :data="filterTableData" style="width: 100%" @selection-change="handleSelectionChange">
        <!-- 表格列定义 -->
        <el-table-column type="selection" width="55" />
        <el-table-column label="日期" prop="date" />
        <el-table-column label="事件" prop="notes" />
        <el-table-column align="right">
            <template #header>
                <el-button
                    type="danger"
                    size="small"
                    :disabled="selectedRows.length === 0"
                    @click="handleBatchDelete"
                >
                    批量删除
                </el-button>
            </template>
            <template #default="scope">
                <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
                <el-button
                    size="small"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)"
                >
                    删除
                </el-button>
            </template>
        </el-table-column>
    </el-table>

    <!-- 添加/编辑对话框 -->
    <el-dialog v-model="dialogVisible" :title="isAdding ? '添加事件' : '编辑数据'" width="30%">
        <el-form :model="editForm" label-width="80px">
            <el-form-item label="日期">
                <el-date-picker
                    v-model="editForm.date"
                    type="date"
                    placeholder="选择日期"
                    value-format="YYYY-MM-DD"
                />
            </el-form-item>
            <el-form-item label="名称">
                <el-input v-model="editForm.notes" placeholder="请输入事件名称" />
            </el-form-item>
        </el-form>
        <template #footer>
            <el-button @click="dialogVisible = false">取消</el-button>
            <el-button type="primary" @click="confirmEdit">确定</el-button>
        </template>
    </el-dialog>
    <button class="show-code-fab" @click="showCode = true" title="查看代码"></button>
    <div v-if="showCode" class="code-modal">
        <div class="code-modal-content">
            <button class="close-btn" @click="showCode = false">×</button>
            <button class="copy-btn" @click="copyCode" title="复制代码">复制</button>
            <transition name="fade">
                <div v-if="copySuccess" class="copy-success-tip">复制成功</div>
            </transition>
            <pre><code>{{ sourceCode }}</code></pre>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed, ref, onMounted } from 'vue'
import { ElMessageBox, ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue' // 导入 Plus加号 图标
const showCode = ref(false)
const copySuccess = ref(false)
const copyCode = () => {
  navigator.clipboard.writeText(sourceCode).then(() => {
    copySuccess.value = true
    setTimeout(() => {
      copySuccess.value = false
    }, 1200)
  })
}
interface User {
    date: string
    notes: string
    address: string
}

const search = ref('')
const tableData = ref<User[]>([])
const selectedRows = ref<User[]>([])
const dialogVisible = ref(false)
const editForm = ref<User>({ date: '', notes: '', address: '' })
const currentEditIndex = ref(-1)
const isAdding = ref(false) // 标记是否是添加操作

const filterTableData = computed(() =>
    tableData.value.filter(
        (data) =>
            !search.value ||
            data.notes.toLowerCase().includes(search.value.toLowerCase())
    )
)

// 模拟动态加载数据
const fetchData = async () => {
    const mockData: User[] = [
        {
            date: '2023-10-01',
            notes: '和家人去北京旅游',
            address: 'No. 100, Park Ave, New York',
        },
        {
            date: '2023-10-02',
            notes: '去长城游玩',
            address: 'No. 200, Broadway, New York',
        },
        {
            date: '2023-10-03',
            notes: '去故宫博物院参观',
            address: 'No. 300, Wall St, New York',
        },
        {
            date: '2023-10-4',
            notes: '去张家界观光',
            address: 'No. 300, Wall St, New York',
        },
        {
            date: '2023-10-05',
            notes: '返程回家吃饭',
            address: 'No. 300, Wall St, New York',
        },
        {
            date: '2023-10-06',
            notes: '睡觉',
            address: 'No. 300, Wall St, New York',
        },
    ]
    tableData.value = mockData
}

onMounted(() => {
    fetchData()
})

// 添加按钮点击事件
const handleAdd = () => {
    editForm.value = { date: '', notes: '', address: '' } // 清空表单
    isAdding.value = true
    dialogVisible.value = true
}

// 编辑按钮点击事件
const handleEdit = (row: User) => {
    editForm.value = { ...row }
    currentEditIndex.value = tableData.value.findIndex(item => item === row)
    isAdding.value = false
    dialogVisible.value = true
}

// 确认编辑或添加
const confirmEdit = () => {
    if (isAdding.value) {
        tableData.value.push({ ...editForm.value })
        ElMessage.success('添加成功')
    } else if (currentEditIndex.value !== -1) {
        tableData.value[currentEditIndex.value] = { ...editForm.value }
        ElMessage.success('修改成功')
    }
    dialogVisible.value = false
}

// 删除按钮点击事件
const handleDelete = (index: number, row: User) => {
    ElMessageBox.confirm('确定删除当前行吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
    }).then(() => {
        tableData.value.splice(index, 1)
        ElMessage.success('删除成功')
    }).catch(() => {
        ElMessage.info('已取消删除')
    })
}

// 批量删除
const handleBatchDelete = () => {
    if (selectedRows.value.length === 0) {
        ElMessage.warning('请先选中需要删除的数据')
        return
    }
    ElMessageBox.confirm('确定删除选中的数据吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
    }).then(() => {
        tableData.value = tableData.value.filter(item => !selectedRows.value.includes(item))
        selectedRows.value = []
        ElMessage.success('批量删除成功')
    }).catch(() => {
        ElMessage.info('已取消删除')
    })
}

const handleSelectionChange = (val: User[]) => {
    selectedRows.value = val
}
<\/script>

<style scoped>
.show-code-fab {
    position: absolute;
    right: 16px;
    bottom: 16px;
    width: 56px;
    height: 56px;
    border-radius: 50%;
    // background: #e3e9ef;
    color: #fff;
    border: none;
    box-shadow: 0 4px 16px rgba(64,158,255,0.18);
    font-size: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 10000;
    transition: background 0.2s, box-shadow 0.2s;
  }
  .show-code-fab::before {
    content: '<>';
    font-family: monospace;
    font-size: 28px;
  }
  .show-code-fab:hover {
    background: #66b1ff;
  }
  .show-code-fab[title]:hover::after {
    content: attr(title);
    position: absolute;
    right: 70px;
    bottom: 16px;
    background: #333;
    color: #fff;
    padding: 4px 12px;
    border-radius: 4px;
    font-size: 14px;
    white-space: nowrap;
    pointer-events: none;
    opacity: 0.95;
  }
  
  .code-modal {
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(0,0,0,0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    .code-modal-content {
      background: #fff;
      border-radius: 10px;
      padding: 24px;
      min-width: 400px;
      max-width: 90vw;
      max-height: 80vh;
      overflow: auto;
      box-shadow: 0 4px 24px rgba(0,0,0,0.18);
      position: relative;
      .close-btn {
        position: absolute;
        top: 12px;
        right: 18px;
        background: transparent;
        color: #909399;
        border: none;
        border-radius: 50%;
        font-size: 24px;
        width: 32px;
        height: 32px;
        cursor: pointer;
        transition: background 0.2s, color 0.2s;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2;
        &:hover {
          background: #f2f6fc;
          color: #f56c6c;
        }
      }
      .copy-btn {
        position: absolute;
        top: 16px;
        right: 60px;
        background: #409eff;
        color: #fff;
        border: none;
        border-radius: 4px;
        padding: 2px 8px;
        cursor: pointer;
        font-size: 11px;
        min-width: 36px;
        min-height: 22px;
        display: flex;
        align-items: center;
        gap: 2px;
        transition: background 0.2s;
        box-shadow: 0 1px 4px rgba(64,158,255,0.10);
        z-index: 2;
        &:hover {
          background: #66b1ff;
        }
      }
      .copy-icon {
        font-size: 13px;
        margin-right: 2px;
      }
      .copy-text {
        font-size: 11px;
        letter-spacing: 0.5px;
      }
      .copy-success-tip {
        position: absolute;
        top: 0;
        right: 110px;
        background: #67c23a;
        color: #fff;
        border-radius: 4px;
        padding: 2px 10px;
        font-size: 12px;
        z-index: 10001;
        box-shadow: 0 1px 4px rgba(103,194,58,0.10);
        pointer-events: none;
        opacity: 0.95;
      }
      pre {
        background: #272822;
        color: #f8f8f2;
        padding: 16px;
        border-radius: 8px;
        font-size: 13px;
        overflow-x: auto;
      }
    }
  }
  
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.3s;
  }
  .fade-enter-from, .fade-leave-to {
    opacity: 0;
  }
</style>`

const copyCode = () => {
  navigator.clipboard.writeText(sourceCode).then(() => {
    copySuccess.value = true
    setTimeout(() => {
      copySuccess.value = false
    }, 1200)
  })
}
interface User {
    date: string
    notes: string
    address: string
}

const search = ref('')
const tableData = ref<User[]>([])
const selectedRows = ref<User[]>([])
const dialogVisible = ref(false)
const editForm = ref<User>({ date: '', notes: '', address: '' })
const currentEditIndex = ref(-1)
const isAdding = ref(false) // 标记是否是添加操作

const filterTableData = computed(() =>
    tableData.value.filter(
        (data) =>
            !search.value ||
            data.notes.toLowerCase().includes(search.value.toLowerCase())
    )
)

// 模拟动态加载数据
const fetchData = async () => {
    const mockData: User[] = [
        {
            date: '2023-10-01',
            notes: '和家人去北京旅游',
            address: 'No. 100, Park Ave, New York',
        },
        {
            date: '2023-10-02',
            notes: '去长城游玩',
            address: 'No. 200, Broadway, New York',
        },
        {
            date: '2023-10-03',
            notes: '去故宫博物院参观',
            address: 'No. 300, Wall St, New York',
        },
        {
            date: '2023-10-4',
            notes: '去张家界观光',
            address: 'No. 300, Wall St, New York',
        },
        {
            date: '2023-10-05',
            notes: '返程回家吃饭',
            address: 'No. 300, Wall St, New York',
        },
        {
            date: '2023-10-06',
            notes: '睡觉',
            address: 'No. 300, Wall St, New York',
        },
    ]
    tableData.value = mockData
}

onMounted(() => {
    fetchData()
})

// 添加按钮点击事件
const handleAdd = () => {
    editForm.value = { date: '', notes: '', address: '' } // 清空表单
    isAdding.value = true
    dialogVisible.value = true
}

// 编辑按钮点击事件
const handleEdit = (row: User) => {
    editForm.value = { ...row }
    currentEditIndex.value = tableData.value.findIndex(item => item === row)
    isAdding.value = false
    dialogVisible.value = true
}

// 确认编辑或添加
const confirmEdit = () => {
    if (isAdding.value) {
        tableData.value.push({ ...editForm.value })
        ElMessage.success('添加成功')
    } else if (currentEditIndex.value !== -1) {
        tableData.value[currentEditIndex.value] = { ...editForm.value }
        ElMessage.success('修改成功')
    }
    dialogVisible.value = false
}

// 删除按钮点击事件
const handleDelete = (index: number, row: User) => {
    ElMessageBox.confirm('确定删除当前行吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
    }).then(() => {
        tableData.value.splice(index, 1)
        ElMessage.success('删除成功')
    }).catch(() => {
        ElMessage.info('已取消删除')
    })
}

// 批量删除
const handleBatchDelete = () => {
    if (selectedRows.value.length === 0) {
        ElMessage.warning('请先选中需要删除的数据')
        return
    }
    ElMessageBox.confirm('确定删除选中的数据吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
    }).then(() => {
        tableData.value = tableData.value.filter(item => !selectedRows.value.includes(item))
        selectedRows.value = []
        ElMessage.success('批量删除成功')
    }).catch(() => {
        ElMessage.info('已取消删除')
    })
}

const handleSelectionChange = (val: User[]) => {
    selectedRows.value = val
}
</script>
<style scoped lang="scss"></style>