// Simple callback manager - stores one callback at a time
// We can't store functions in Redux (not serializable), so we store it here
class ModalCallbackManager {
    private callback: (() => void) | null = null;

    set(callback: () => void): void {
        this.callback = callback;
    }

    execute(): void {
        if (this.callback) {
            this.callback();
            this.callback = null; // Clean up after execution
        }
    }

    clear(): void {
        this.callback = null;
    }
}

export const modalCallbackManager = new ModalCallbackManager();
