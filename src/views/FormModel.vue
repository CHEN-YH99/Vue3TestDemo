<template>
  <div class="form-container">
    <el-form :model="form" :rules="rules" ref="formRef" label-width="120px">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username" placeholder="请输入用户名" />
      </el-form-item>

      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" type="password" placeholder="请输入密码" show-password />
      </el-form-item>

      <el-form-item label="确认密码" prop="confirmPassword">
        <el-input v-model="form.confirmPassword" type="password" placeholder="请再次输入密码" show-password />
        <span v-if="form.password !== form.confirmPassword" class="error-message">密码不一致</span>
      </el-form-item>

      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email" placeholder="请输入邮箱" />
        <span v-if="!isEmailValid && form.email" class="error-message">邮箱格式不正确</span>
      </el-form-item>

      <el-form-item prop="acceptTerms">
        <el-checkbox v-model="form.acceptTerms">接受条款</el-checkbox>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" :disabled="!isFormValid" @click="submitForm">提交</el-button>
      </el-form-item>
    </el-form>

    <div class="data-display">
      <h3>表单数据：</h3>
      <pre>{{ JSON.stringify(form, null, 2) }}</pre>
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
import { ref, computed } from 'vue';
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
  <div class="form-container">
    <el-form :model="form" :rules="rules" ref="formRef" label-width="120px">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username" placeholder="请输入用户名" />
      </el-form-item>

      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" type="password" placeholder="请输入密码" show-password />
      </el-form-item>

      <el-form-item label="确认密码" prop="confirmPassword">
        <el-input v-model="form.confirmPassword" type="password" placeholder="请再次输入密码" show-password />
        <span v-if="form.password !== form.confirmPassword" class="error-message">密码不一致</span>
      </el-form-item>

      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email" placeholder="请输入邮箱" />
        <span v-if="!isEmailValid && form.email" class="error-message">邮箱格式不正确</span>
      </el-form-item>

      <el-form-item prop="acceptTerms">
        <el-checkbox v-model="form.acceptTerms">接受条款</el-checkbox>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" :disabled="!isFormValid" @click="submitForm">提交</el-button>
      </el-form-item>
    </el-form>

    <div class="data-display">
      <h3>表单数据：</h3>
      <pre>{{ JSON.stringify(form, null, 2) }}</pre>
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
import { ref, computed } from 'vue';
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
  // 表单数据
const form = ref({
  username: '',
  password: '',
  confirmPassword: '',
  email: '',
  acceptTerms: false,
});

const formRef = ref(null);

const rules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  confirmPassword: [{ required: true, message: '请确认密码', trigger: 'blur' }],
  email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }],
  acceptTerms: [{ required: true, message: '请接受条款', trigger: 'change' }],
};

const isEmailValid = computed(() => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(form.value.email);
});

const isFormValid = computed(() => {
  return (
    form.value.username &&
    form.value.password &&
    form.value.confirmPassword &&
    form.value.password === form.value.confirmPassword &&
    isEmailValid.value &&
    form.value.acceptTerms
  );
});

const submitForm = () => {
  if (isFormValid.value) {
    alert('表单提交成功！');
    console.log('表单数据：', form.value);
  }
};
<\/script>

<style scoped lang="scss">
.form-container {
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #eee;
  border-radius: 4px;
}

.error-message {
  color: red;
  font-size: 12px;
  margin-left: 10px;
}

.data-display {
  margin-top: 20px;
  padding: 10px;
  background: #f5f5f5;
  border-radius: 4px;
}
</style>`;

// 表单数据
const form = ref({
  username: '',
  password: '',
  confirmPassword: '',
  email: '',
  acceptTerms: false,
});

const formRef = ref(null);

const rules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  confirmPassword: [{ required: true, message: '请确认密码', trigger: 'blur' }],
  email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }],
  acceptTerms: [{ required: true, message: '请接受条款', trigger: 'change' }],
};

const isEmailValid = computed(() => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(form.value.email);
});

const isFormValid = computed(() => {
  return (
    form.value.username &&
    form.value.password &&
    form.value.confirmPassword &&
    form.value.password === form.value.confirmPassword &&
    isEmailValid.value &&
    form.value.acceptTerms
  );
});

const submitForm = () => {
  if (isFormValid.value) {
    alert('表单提交成功！');
    console.log('表单数据：', form.value);
  }
};
</script>

<style scoped lang="scss">
.form-container {
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #eee;
  border-radius: 4px;
}

.error-message {
  color: red;
  font-size: 12px;
  margin-left: 10px;
}

.data-display {
  margin-top: 20px;
  padding: 10px;
  background: #f5f5f5;
  border-radius: 4px;
}
</style>