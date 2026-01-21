"use client";

import { useCallback, useEffect, useRef, useState, type RefObject } from "react";

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: string | HTMLElement,
        options: {
          sitekey: string;
          callback: (token: string) => void;
          "error-callback"?: () => void;
          "expired-callback"?: () => void;
          size?: "normal" | "compact" | "invisible";
          appearance?: "always" | "execute" | "interaction-only";
          execution?: "render" | "execute";
        },
      ) => string;
      execute: (container: string | HTMLElement, options?: object) => void;
      reset: (widgetId: string) => void;
      remove: (widgetId: string) => void;
    };
    __turnstileOnload?: () => void;
  }
}

type TurnstileRenderOptions = {
  size?: "normal" | "compact" | "invisible";
  appearance?: "always" | "execute" | "interaction-only";
  execution?: "render" | "execute";
};

type UseTurnstileOptions = {
  siteKey: string;
  enabled?: boolean;
  autoRender?: boolean;
  renderOptions?: TurnstileRenderOptions;
  onSuccess: (token: string) => void;
  onError?: () => void;
  onExpired?: () => void;
};

type UseTurnstileResult = {
  containerRef: RefObject<HTMLDivElement | null>;
  ready: boolean;
  failed: boolean;
  execute: () => Promise<boolean>;
  reset: () => void;
  remove: () => void;
  clearFailure: () => void;
};

let turnstileScriptPromise: Promise<void> | null = null;

function loadTurnstileScript(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.turnstile) return Promise.resolve();
  if (turnstileScriptPromise) return turnstileScriptPromise;

  turnstileScriptPromise = new Promise((resolve) => {
    window.__turnstileOnload = () => resolve();
    const existing = document.querySelector(
      'script[src^="https://challenges.cloudflare.com/turnstile/v0/api.js"]',
    );

    if (existing) {
      const interval = window.setInterval(() => {
        if (window.turnstile) {
          window.clearInterval(interval);
          resolve();
        }
      }, 50);
      return;
    }

    const script = document.createElement("script");
    script.src =
      "https://challenges.cloudflare.com/turnstile/v0/api.js?onload=__turnstileOnload&render=explicit";
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
  });

  return turnstileScriptPromise;
}

export function useTurnstile({
  siteKey,
  enabled = true,
  autoRender = true,
  renderOptions,
  onSuccess,
  onError,
  onExpired,
}: UseTurnstileOptions): UseTurnstileResult {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const failedRef = useRef(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const onSuccessRef = useRef(onSuccess);
  const onErrorRef = useRef(onError);
  const onExpiredRef = useRef(onExpired);

  useEffect(() => {
    onSuccessRef.current = onSuccess;
  }, [onSuccess]);

  useEffect(() => {
    onErrorRef.current = onError;
  }, [onError]);

  useEffect(() => {
    onExpiredRef.current = onExpired;
  }, [onExpired]);

  const reset = useCallback(() => {
    if (widgetIdRef.current && window.turnstile) {
      window.turnstile.reset(widgetIdRef.current);
    }
  }, []);

  const remove = useCallback(() => {
    if (widgetIdRef.current && window.turnstile) {
      window.turnstile.remove(widgetIdRef.current);
    }
    widgetIdRef.current = null;
    setReady(false);
  }, []);

  const clearFailure = useCallback(() => {
    failedRef.current = false;
    setFailed(false);
  }, []);

  const handleError = useCallback(() => {
    failedRef.current = true;
    setFailed(true);
    setReady(false);
    remove();
    onErrorRef.current?.();
  }, [remove]);

  const handleExpired = useCallback(() => {
    reset();
    onExpiredRef.current?.();
  }, [reset]);

  const render = useCallback(async () => {
    if (!enabled || !siteKey || failedRef.current) return false;
    if (!containerRef.current) return false;

    await loadTurnstileScript();
    if (!window.turnstile || failedRef.current) return false;
    if (widgetIdRef.current) return true;

    widgetIdRef.current = window.turnstile.render(containerRef.current, {
      sitekey: siteKey,
      callback: (token: string) => {
        onSuccessRef.current(token);
      },
      "error-callback": handleError,
      "expired-callback": handleExpired,
      ...renderOptions,
    });
    setReady(true);
    return true;
  }, [enabled, handleError, handleExpired, onSuccess, renderOptions, siteKey]);

  const execute = useCallback(async () => {
    if (failedRef.current) return false;
    const rendered = await render();
    if (!rendered || !widgetIdRef.current || !window.turnstile) return false;
    window.turnstile.execute(widgetIdRef.current);
    return true;
  }, [render]);

  useEffect(() => {
    if (!autoRender || !enabled) return;
    void render();
    return () => {
      remove();
    };
  }, [autoRender, enabled, remove, render]);

  return {
    containerRef,
    ready,
    failed,
    execute,
    reset,
    remove,
    clearFailure,
  };
}
