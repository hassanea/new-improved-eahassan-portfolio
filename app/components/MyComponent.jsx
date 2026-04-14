export default defineComponent({
  props: {
    message: {
      type: String,
      required: false,
    },
  },
  render({ message }) {
    const isActive = ref(false);
    const handleClick = e => {
      isActive.value = !isActive.value;
      console.log(e, isActive.value);
    };

    const messageOutput = computed(() => {
      return isActive.value ? `${message}!!` : message;
    });

    return (
      <button class="inline-block bg-blue-800 text-white" onClick={handleClick}>
        {messageOutput.value}
      </button>
    );
  },
});
