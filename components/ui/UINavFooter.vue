<script setup lang="ts">
</script>

<template>
    <div>
        <hr class="modal-hr">
        <div class="social">
            <slot name="social"></slot>
        </div>
        <div class="contact">
            <slot name="contact"></slot>
        </div>
    </div>
</template>


<style lang="scss" scoped>
.contact,
.social {
    color: #ECDFCC;
    font-size: $fs-16;
    line-height: 1.2;
    text-decoration: none;
    z-index: 100;

    @include this-and-above('lg') {
        display: none;
    }
}

.contact {
    margin-top: 10px;
}

.modal-hr {
    width: 100%;
    border: none;
    height: 2px;
    color: $accent1;
    align-self: center;
    background-color: $accent2;
    margin-bottom: 40px;
}
</style>
