<template>
    <div 
      class="card" 
      :class="variant ? `card--${variant}` : ''" 
      :style="{ width, height }"
    >
      <div v-if="$slots.header" class="card__header">
        <slot name="header"></slot>
      </div>
      <div class="card__content">
        <slot></slot>
      </div>
      <div v-if="$slots.actions" class="card__actions">
        <slot name="actions"></slot>
      </div>
    </div>
  </template>
  
  <script setup>
  defineProps({
    width: {
      type: String,
      default: '100%',
    },
    height: {
      type: String,
      default: 'auto',
    },
    variant: {
      type: String,
      default: '',
      validator: (value) => ['primary', 'success', 'warning', 'danger'].includes(value),
    },
  });
  </script>
  
  <style scoped lang="scss">
  .card {
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    padding: 16px;
    background: #fff;
  
    &__header {
      font-size: 1.2rem;
      font-weight: bold;
      margin-bottom: 12px;
    }
  
    &__content {
      margin-bottom: 12px;
    }
  
    &__actions {
      display: flex;
      gap: 8px;
      justify-content: flex-end;
    }
  
    &--primary {
      border-left: 4px solid #3490dc;
    }
  
    &--success {
      border-left: 4px solid #38c172;
    }
  
    &--warning {
      border-left: 4px solid #ffed4a;
    }
  
    &--danger {
      border-left: 4px solid #e3342f;
    }
  }
  </style>