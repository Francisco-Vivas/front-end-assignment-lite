<script setup>
import Header from './Header.vue';
</script>

<template>
    <div :class="$style.site">
        <div :class="$style.wrap">
            <Header />

            <main :class="$style.content">
                <slot></slot>
            </main>
        </div>
    </div>
</template>

<style module>
    .wrap {
        width: min(95%, 600px);
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: var(--space-md);
    }

    .site {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;
    }

    .content {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
</style>
