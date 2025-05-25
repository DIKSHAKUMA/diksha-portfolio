<script setup lang="ts">
</script>

<template>
    <div>
        <div class="social">
            <slot name="social"></slot>
        </div>
        <div class="contact">
            <slot name="contact"></slot>
        </div>
        <hr class="modal-hr">
    </div>
</template>


<style lang="scss" scoped>
.contact,
.social {
    position: relative;
    right: 0px;
    top: 20px;
    color: #ECDFCC;
    font-size: 15px;
    line-height: 1.2;
    text-decoration: none;
    z-index: 100;

    @include this-and-above('lg') {
        display: none;
    }
}
.contact{
    margin-top:10px;
}

.modal-hr {
    position: absolute;
    width: 100%;
    bottom: 60px;
    right: 0;
    border: none;
    height: 2px;
    color: $secondary;
    background-color: $secondary;
}
</style>
