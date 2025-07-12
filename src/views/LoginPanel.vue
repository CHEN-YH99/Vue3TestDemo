<template>
  <div class="login-panel">
    <!-- 已登录状态 -->
    <div v-if="isLoggedIn" class="welcome-section">
      <el-card class="welcome-card">
        <div class="welcome-content">
          <el-avatar :size="60" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" />
          <h3>欢迎，{{ loginForm.username }}!</h3>
          <el-button type="danger" @click="confirmLogout" round>注销</el-button>
        </div>
      </el-card>
    </div>

    <!-- 未登录状态 -->
    <div v-else class="login-section">
      <el-card class="login-card">
        <template #header>
          <h3>用户登录</h3>
        </template>
        <el-form 
          :model="loginForm" 
          :rules="rules" 
          ref="loginFormRef"
          label-width="80px"
        >
          <el-form-item label="用户名" prop="username">
            <el-input 
              v-model="loginForm.username" 
              placeholder="请输入用户名(4-16位字母、数字或下划线)" 
            />
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input 
              v-model="loginForm.password" 
              type="password" 
              placeholder="请输入密码(8-20位,含大小写字母和数字)" 
              show-password
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitLogin" round>登录</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
  <!-- 查看代码 -->
  <button class="show-code-fab" style="background-color:red ;" @click="showCode = true" title="查看代码"></button>
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

<script setup>
import { ref } from 'vue';
import { 
  ElCard, 
  ElAvatar, 
  ElButton, 
  ElForm, 
  ElFormItem, 
  ElInput, 
  ElMessage,
  ElMessageBox 
} from 'element-plus';

//查看代码，复制代码
import '@/assets/style/showcode.css'
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
const sourceCode = `<template>
  <div class="login-panel">
    <!-- 已登录状态 -->
    <div v-if="isLoggedIn" class="welcome-section">
      <el-card class="welcome-card">
        <div class="welcome-content">
          <el-avatar :size="60" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" />
          <h3>欢迎，{{ loginForm.username }}!</h3>
          <el-button type="danger" @click="confirmLogout" round>注销</el-button>
        </div>
      </el-card>
    </div>

    <!-- 未登录状态 -->
    <div v-else class="login-section">
      <el-card class="login-card">
        <template #header>
          <h3>用户登录</h3>
        </template>
        <el-form 
          :model="loginForm" 
          :rules="rules" 
          ref="loginFormRef"
          label-width="80px"
        >
          <el-form-item label="用户名" prop="username">
            <el-input 
              v-model="loginForm.username" 
              placeholder="请输入用户名(4-16位字母、数字或下划线)" 
            />
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input 
              v-model="loginForm.password" 
              type="password" 
              placeholder="请输入密码(8-20位,含大小写字母和数字)" 
              show-password
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitLogin" round>登录</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
  <!-- 查看代码 -->
  <button class="show-code-fab" style="background-color:red ;" @click="showCode = true" title="查看代码"></button>
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
<script setup>
import { ref } from 'vue';
import { 
  ElCard, 
  ElAvatar, 
  ElButton, 
  ElForm, 
  ElFormItem, 
  ElInput, 
  ElMessage,
  ElMessageBox 
} from 'element-plus';

//查看代码，复制代码
import '@/assets/style/showcode.css'
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
  //登录注册逻辑
const isLoggedIn = ref(false);
const loginForm = ref({
  username: '',
  password: '',
});
const loginFormRef = ref();

// 验证规则
const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { 
      pattern: /^[a-zA-Z0-9_]{4,16}$/, 
      message: '用户名需为4-16位字母、数字或下划线', 
      trigger: 'blur' 
    }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { 
      pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,20}$/, 
      message: '密码需为8-20位,包含大小写字母和数字', 
      trigger: 'blur' 
    }
  ]
};

// 登录逻辑
const submitLogin = () => {
  loginFormRef.value.validate((valid) => {
    if (valid) {
      ElMessage.success('登录成功！');
      isLoggedIn.value = true;
    } else {
      ElMessage.warning('请检查输入是否符合规则！');
    }
  });
};

// 注销逻辑
const confirmLogout = () => {
  ElMessageBox.confirm('确定要注销吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    isLoggedIn.value = false;
    loginForm.value = { username: '', password: '' };
    ElMessage.success('注销成功！');
  }).catch(() => {
    ElMessage.info('已取消注销');
  });
};
<\/script>

<style scoped lang="scss">
.login-panel {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f7fa;

  .welcome-card,
  .login-card {
    width: 400px;
    text-align: center;

    .welcome-content {
      padding: 20px;

      h3 {
        margin: 15px 0;
      }
    }
  }

  .el-form {
    padding: 20px;
  }
}
</style>`;

//登录注册逻辑
const isLoggedIn = ref(false);
const loginForm = ref({
  username: '',
  password: '',
});
const loginFormRef = ref();

// 验证规则
const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { 
      pattern: /^[a-zA-Z0-9_]{4,16}$/, 
      message: '用户名需为4-16位字母、数字或下划线', 
      trigger: 'blur' 
    }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { 
      pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,20}$/, 
      message: '密码需为8-20位，包含大小写字母和数字', 
      trigger: 'blur' 
    }
  ]
};

// 登录逻辑
const submitLogin = () => {
  loginFormRef.value.validate((valid) => {
    if (valid) {
      ElMessage.success('登录成功！');
      isLoggedIn.value = true;
    } else {
      ElMessage.warning('请检查输入是否符合规则！');
    }
  });
};

// 注销逻辑
const confirmLogout = () => {
  ElMessageBox.confirm('确定要注销吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    isLoggedIn.value = false;
    loginForm.value = { username: '', password: '' };
    ElMessage.success('注销成功！');
  }).catch(() => {
    ElMessage.info('已取消注销');
  });
};
</script><style scoped lang="scss">
.login-panel {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f7fa;

  .welcome-card,
  .login-card {
    width: 400px;
    text-align: center;

    .welcome-content {
      padding: 20px;

      h3 {
        margin: 15px 0;
      }
    }
  }

  .el-form {
    padding: 20px;
  }
}
</style>

