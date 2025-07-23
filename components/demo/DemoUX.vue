<script setup lang="ts">

onMounted(() => {

})
onUnmounted(() => {

})
</script>
<template>
    <div class="ui-wrapper">
        <div class="ui">
            <div class="arrow-next-row">
                <div class="next-text">NEXT</div>
                <div class="arrows">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">

.ui {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
}

.arrow-next-row {
    display: flex;
    align-items: center;
}

.arrows {
    position: relative;
    width: 32px;
    height: 30px;
    display: flex;
    align-items: center;
}

.arrows span {
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    width: 30px;
    height: 30px;
    border-right: 2px solid $primary;
    border-bottom: 2px solid $primary;
    transform: rotate(-45deg);
    animation: animate 2s infinite;
}

.arrows span:nth-child(2) {
    animation-delay: -0.2s;
}

.arrows span:nth-child(3) {
    animation-delay: -0.4s;
}

.next-text {
    display: flex;
    align-items: center;
    height: 20px;
    font-size: 50px;
    color: $primary;
    letter-spacing: 2px;
}

@keyframes animate {
    0% {
        opacity: 0;
    }

    50% {
        opacity: 1;
        left: 20px
    }

    100% {
        opacity: 0;
    }
}
</style>