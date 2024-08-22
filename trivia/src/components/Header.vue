<template>
    <header :class="$style.root">
        <h1 :class="$style.heading1">
            Q’s And A’s
        </h1>

        <h2 :class="$style.heading2">
            Select Your Answers, Enjoy The Questions
        </h2>
    </header>
</template>

<style module>
    .root {
        overflow: inherit;
        min-width: 104px;
        margin-bottom: calc(2 * var(--margin-bottom));
        text-align: center;
    }

    .heading1 {
        font-size: var(--font-size-xxxl);
        line-height: 2.5rem;
    }

    .heading2 {
        font-size: var(--font-size-xl);
        line-height: 2rem;
        letter-spacing: .01em;
    }
</style>
