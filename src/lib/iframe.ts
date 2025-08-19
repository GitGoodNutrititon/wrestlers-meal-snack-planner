// Iframe communication utilities for Squarespace integration
import { IframeMessage } from '@/types';

export class IframeManager {
  private static instance: IframeManager;
  private parentOrigin: string | null = null;

  private constructor() {
    this.initializeMessageListener();
    this.detectParentOrigin();
  }

  static getInstance(): IframeManager {
    if (!IframeManager.instance) {
      IframeManager.instance = new IframeManager();
    }
    return IframeManager.instance;
  }

  private initializeMessageListener(): void {
    if (typeof window === 'undefined') return;

    window.addEventListener('message', (event) => {
      // Validate origin for security
      if (!this.isAllowedOrigin(event.origin)) {
        return;
      }

      // Handle messages from parent
      const message: IframeMessage = event.data;
      this.handleParentMessage(message);
    });
  }

  private detectParentOrigin(): void {
    if (typeof window === 'undefined') return;

    try {
      // Try to get parent origin from referrer
      const referrer = document.referrer;
      if (referrer) {
        const url = new URL(referrer);
        this.parentOrigin = url.origin;
      }
    } catch (error) {
      console.warn('Could not detect parent origin:', error);
    }
  }

  private isAllowedOrigin(origin: string): boolean {
    const allowedDomains = (process.env.ALLOWED_DOMAINS || '').split(',');
    return allowedDomains.some(domain => 
      origin.toLowerCase().includes(domain.toLowerCase())
    );
  }

  private handleParentMessage(message: IframeMessage): void {
    switch (message.type) {
      case 'ready':
        this.sendReadyConfirmation();
        break;
      default:
        console.log('Unknown message type:', message.type);
    }
  }

  // Send height update to parent
  public updateHeight(): void {
    if (typeof window === 'undefined' || !this.parentOrigin) return;

    try {
      const height = Math.max(
        document.documentElement.scrollHeight,
        document.body.scrollHeight,
        document.documentElement.offsetHeight,
        document.body.offsetHeight
      );

      const message: IframeMessage = {
        type: 'resize',
        height: height + 50, // Add some padding
      };

      window.parent.postMessage(message, this.parentOrigin);
    } catch (error) {
      console.warn('Could not send height update:', error);
    }
  }

  // Send ready confirmation to parent
  private sendReadyConfirmation(): void {
    if (!this.parentOrigin) return;

    const message: IframeMessage = {
      type: 'ready',
      data: { loaded: true }
    };

    try {
      window.parent.postMessage(message, this.parentOrigin);
    } catch (error) {
      console.warn('Could not send ready confirmation:', error);
    }
  }

  // Auto-update height on content changes
  public enableAutoHeightUpdate(): void {
    if (typeof window === 'undefined') return;

    // Initial height update
    setTimeout(() => this.updateHeight(), 100);

    // Update height on window resize
    window.addEventListener('resize', () => {
      setTimeout(() => this.updateHeight(), 100);
    });

    // Use ResizeObserver if available for more accurate height tracking
    if (window.ResizeObserver) {
      const resizeObserver = new ResizeObserver(() => {
        setTimeout(() => this.updateHeight(), 100);
      });

      resizeObserver.observe(document.body);
    }

    // Fallback: periodic height checks
    setInterval(() => {
      this.updateHeight();
    }, 1000);
  }
}

// Utility function to initialize iframe management
export function initializeIframe(): void {
  const iframeManager = IframeManager.getInstance();
  iframeManager.enableAutoHeightUpdate();
}

// Hook for React components to trigger height updates
export function useIframeHeightUpdate(): () => void {
  const iframeManager = IframeManager.getInstance();
  return () => iframeManager.updateHeight();
}
