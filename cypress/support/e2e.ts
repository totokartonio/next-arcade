import "./commands";
import "@testing-library/cypress/add-commands";

Cypress.on("window:before:load", (win) => {
  class MockAudioParam {
    value = 1;
    setValueAtTime() {}
  }
  class MockGainNode {
    gain = new MockAudioParam();
    connect() {}
    disconnect() {}
  }
  class MockBufferSource {
    buffer: any = null;
    playbackRate = new MockAudioParam();
    onended: any = null;
    connect() {}
    disconnect() {}
    start() {}
    stop() {}
    addEventListener() {}
    removeEventListener() {}
  }
  class MockAudioContext {
    currentTime = 0;
    createGain() {
      return new MockGainNode();
    }
    createBuffer() {
      return {};
    }
    createBufferSource() {
      return new MockBufferSource();
    }
    decodeAudioData(_b: ArrayBuffer, cb: () => void) {
      cb();
    }
    resume() {
      return Promise.resolve();
    }
    suspend() {
      return Promise.resolve();
    }
    close() {
      return Promise.resolve();
    }
  }

  (win as any).AudioContext = MockAudioContext;
  (win as any).webkitAudioContext = MockAudioContext;

  win.HTMLMediaElement.prototype.play = () => Promise.resolve();
  win.HTMLMediaElement.prototype.pause = () => {};
});

Cypress.on("uncaught:exception", (err) => {
  if (/Hydration failed/i.test(err.message)) {
    return false;
  }
});
