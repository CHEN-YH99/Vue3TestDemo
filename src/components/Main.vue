<template>
    <div class="main">
        <div class="marquee-container">
            <div class="marquee-text">
                {{ marqueeText }}&nbsp;&nbsp;&nbsp;{{ marqueeText }}
            </div>
        </div>
    </div>
</template>

<script setup>
import { reactive} from 'vue'
const marqueeText = "在这里你可以通过小案例掌握vue3的语法"
</script>

<style scoped lang="scss">
.marquee-container {
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    position: relative;
}

.marquee-text {
    display: inline-block;
    padding-left: 100%;
    animation: marquee 15s linear infinite;
    font-size: 24px;
    font-weight: bold;
}

@keyframes marquee {
    0% {
        transform: translateX(-100%);
    }
    100% {
        transform: translateX(0);
    }
}
</style>