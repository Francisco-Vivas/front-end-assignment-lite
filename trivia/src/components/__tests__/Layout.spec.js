import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';

import Layout from '../Layout.vue';

describe('Layout', () => {
    it('renders properly', () => {
        const wrapper = mount(Layout);
        expect(wrapper.text()).toContain('Q’s And A’s');
        expect(wrapper.text()).toContain('Select Your Answers, Enjoy The Questions');
    });
});
