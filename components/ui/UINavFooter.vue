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
    font-size: $fs-18;
    line-height: 1.2;
    text-decoration: none;
    z-index: 100;
    position: absolute;
    top: 40px;
    line-height: 1.5;
    cursor: pointer;

    @include this-and-above('lg') {
        display: none;
    }
}

.social {
    align-self: flex-start;
}

.contact {
    align-self: flex-end;
}

.modal-hr {
    width: 100%;
    border: none;
    height: 2px;
    align-self: center;
    background-color: $secondary;
    margin-bottom: 40px;
}
</style>
