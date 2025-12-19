import { expect as baseExpect } from '@playwright/test';

export const expect = baseExpect.extend({
    toUseCharmPracing: (price: string | number) => {
        const ifTestPassed = /[.,]99$/.test(price.toString());
        // return ifTestPassed
        //     ? { message: () => 'We are using Charm Pricing as expected', pass: true }
        //     : { message: () => 'Regular price detected', pass: false }
        if (ifTestPassed) {
            return { message: () => 'We are using Charm Pricing as expected', pass: true }
        } else {
            return { message: () => 'Regular price detected', pass: false }
        }
    },
});

declare global {
    namespace PlaywrightTest {
        interface Matchers<R> {
            toUseCharmPracing(): R;
        }
    }
}