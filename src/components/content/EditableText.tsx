'use client';

import { useEffect, useRef, useState } from 'react';
import type { ElementType, ReactNode } from 'react';
import { Check, Pencil, RotateCcw, X } from 'lucide-react';
import { useContentEditor } from './ContentEditorProvider';

type EditableTextProps = {
  contentKey: string;
  defaultValue: string;
  children?: ReactNode;
  as?: ElementType;
  className?: string;
};

export default function EditableText({
  contentKey,
  defaultValue,
  children,
  as: Tag = 'p',
  className,
}: EditableTextProps) {
  const { canEdit, content, save, reset } = useContentEditor();
  const savedValue = content[contentKey];
  const currentValue = savedValue ?? defaultValue;
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(currentValue);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => setDraft(currentValue), [currentValue]);
  useEffect(() => {
    if (editing) textareaRef.current?.focus();
  }, [editing]);

  const handleSave = async () => {
    if (!draft.trim() || draft.trim() === currentValue) {
      setEditing(false);
      setDraft(currentValue);
      return;
    }
    setSaving(true);
    setError('');
    try {
      await save(contentKey, draft);
      setEditing(false);
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : 'Unable to save');
    } finally {
      setSaving(false);
    }
  };

  const handleReset = async () => {
    setSaving(true);
    setError('');
    try {
      await reset(contentKey);
      setDraft(defaultValue);
      setEditing(false);
    } catch (resetError) {
      setError(resetError instanceof Error ? resetError.message : 'Unable to reset');
    } finally {
      setSaving(false);
    }
  };

  const displayedContent = savedValue === undefined ? (children ?? defaultValue) : savedValue;

  if (!canEdit) {
    return <Tag className={className}>{displayedContent}</Tag>;
  }

  return (
    <div className="editable-text">
      {editing ? (
        <div className="editable-text__form">
          <textarea
            ref={textareaRef}
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            onKeyDown={(event) => {
              if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') void handleSave();
              if (event.key === 'Escape') {
                setDraft(currentValue);
                setEditing(false);
              }
            }}
            rows={Math.min(8, Math.max(2, draft.split('\n').length + Math.ceil(draft.length / 80)))}
            aria-label={`Edit ${contentKey}`}
          />
          <div className="editable-text__actions">
            <button type="button" onClick={() => void handleSave()} disabled={saving} aria-label="Save text"><Check size={15} /> Save</button>
            <button type="button" onClick={() => { setDraft(currentValue); setEditing(false); }} disabled={saving} aria-label="Cancel editing"><X size={15} /> Cancel</button>
            {savedValue !== undefined && <button type="button" onClick={() => void handleReset()} disabled={saving} aria-label="Restore original text"><RotateCcw size={14} /> Original</button>}
          </div>
          {error && <p className="editable-text__error" role="alert">{error}</p>}
        </div>
      ) : (
        <>
          <Tag className={className}>{displayedContent}</Tag>
          <button className="editable-text__trigger" type="button" onClick={() => setEditing(true)} aria-label={`Edit ${contentKey}`} title="Edit this text">
            <Pencil size={14} />
          </button>
        </>
      )}
    </div>
  );
}
