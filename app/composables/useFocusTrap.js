import { customRef } from 'vue';
import { createFocusTrap } from 'focus-trap';

// Reference: https://stackoverflow.com/questions/44452084/how-to-keep-focus-within-modal-dialog
// Reference: https://www.telerik.com/blogs/how-to-trap-focus-modal-vue-3
// https://github.com/focus-trap/focus-trap
// https://www.qwant.com/?client=ext-safari-macos-sb&t=web&q=focus+trap+modal+dialogs
// https://accessibility.huit.harvard.edu/support-keyboard-interaction

export const useFocusTrap = () => {
  const trapRef = customRef((track, trigger) => {
    let $trapEl = null;
    return {
      get() {
        track();
        return $trapEl;
      },
      set(value) {
        $trapEl = value;
        value ? initFocusTrap() : clearFocusTrap();
        trigger();
      },
    };
  });

  let trap = null;
  const initFocusTrap = () => {
    if (!trapRef.value) return;
    trap = createFocusTrap(trapRef.value, {
      allowOutsideClick: true,
      clickOutsideDeactivates: true,
    });
    trap.activate();
  };

  const clearFocusTrap = () => {
    trap?.deactivate();
    trap = null;
  };

  return {
    trapRef,
    initFocusTrap,
    clearFocusTrap,
  };
};