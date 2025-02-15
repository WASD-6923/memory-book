import { Ref, ref } from 'vue'
const bus: Ref<Map<string, string>> = ref(new Map<string, string>())

export default function useKiviEventsBus() {
  function emitter(event: string, arg: string) {
    bus.value.set(event, arg)
  }

  return {
    emitter,
    bus,
  }
}
