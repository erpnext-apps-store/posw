export default function base(Pos) {
  if (Pos.extensions && Pos.extensions.includes('base')) {
    return Pos;
  }

  class PosWithBase extends Pos {
    constructor(wrapper) {
      super(wrapper);
      this.load_master_data();
    }
    async load_master_data() {
      const registration = await navigator.serviceWorker.ready;
      if (registration.active) {
        registration.active.postMessage('load_master_data');
      }
    }
  }
  const extensions = PosWithBase.extensions || [];
  PosWithBase.extensions = [...extensions, 'base'];
  return PosWithBase;
}
