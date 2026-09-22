'use client';

import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import type { SiteContentMap } from '@/lib/siteContent';

type ContentEditorContextValue = {
  canEdit: boolean;
  content: SiteContentMap;
  save: (key: string, value: string) => Promise<void>;
  reset: (key: string) => Promise<void>;
};

const ContentEditorContext = createContext<ContentEditorContextValue | null>(null);

export default function ContentEditorProvider({
  children,
  initialContent,
  canEdit,
}: {
  children: ReactNode;
  initialContent: SiteContentMap;
  canEdit: boolean;
}) {
  const [content, setContent] = useState(initialContent);

  const save = useCallback(async (key: string, value: string) => {
    const response = await fetch('/api/site-content', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key, value }),
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || 'Unable to save this text');
    setContent((current) => ({ ...current, [key]: result.value }));
  }, []);

  const reset = useCallback(async (key: string) => {
    const response = await fetch(`/api/site-content?key=${encodeURIComponent(key)}`, { method: 'DELETE' });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || 'Unable to reset this text');
    setContent((current) => {
      const next = { ...current };
      delete next[key];
      return next;
    });
  }, []);

  const value = useMemo(() => ({ canEdit, content, save, reset }), [canEdit, content, save, reset]);

  return <ContentEditorContext.Provider value={value}>{children}</ContentEditorContext.Provider>;
}

export function useContentEditor() {
  const context = useContext(ContentEditorContext);
  if (!context) throw new Error('useContentEditor must be used inside ContentEditorProvider');
  return context;
}
