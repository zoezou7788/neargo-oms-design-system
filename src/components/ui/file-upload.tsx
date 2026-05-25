"use client";

import * as React from "react";
import { Upload, X, FileText, Image, File } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FileUploadItem {
  id: string;
  file: File;
  preview?: string;
  progress?: number;
  error?: string;
}

export interface FileUploadProps {
  accept?: string;
  multiple?: boolean;
  maxSize?: number;
  maxFiles?: number;
  onFilesChange?: (files: File[]) => void;
  disabled?: boolean;
  className?: string;
  hint?: string;
}

function getFileIcon(file: File) {
  if (file.type.startsWith("image/")) return Image;
  if (file.type === "application/pdf") return FileText;
  return File;
}

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function FileUpload({
  accept,
  multiple = true,
  maxSize = 10 * 1024 * 1024,
  maxFiles = 5,
  onFilesChange,
  disabled = false,
  className,
  hint,
}: FileUploadProps) {
  const [items, setItems] = React.useState<FileUploadItem[]>([]);
  const [dragging, setDragging] = React.useState(false);
  const [errors, setErrors] = React.useState<string[]>([]);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const addFiles = React.useCallback((incoming: FileList | File[]) => {
    const newErrors: string[] = [];
    const validFiles: File[] = [];

    Array.from(incoming).forEach(file => {
      if (items.length + validFiles.length >= maxFiles) {
        newErrors.push(`最多上传 ${maxFiles} 个文件`);
        return;
      }
      if (file.size > maxSize) {
        newErrors.push(`${file.name} 超过 ${formatBytes(maxSize)} 限制`);
        return;
      }
      validFiles.push(file);
    });

    if (validFiles.length === 0) { setErrors(newErrors); return; }

    const newItems: FileUploadItem[] = validFiles.map(file => ({
      id: `${Date.now()}-${Math.random()}`,
      file,
      preview: file.type.startsWith("image/") ? URL.createObjectURL(file) : undefined,
    }));

    const updated = [...items, ...newItems];
    setItems(updated);
    setErrors(newErrors);
    onFilesChange?.(updated.map(i => i.file));
  }, [items, maxFiles, maxSize, onFilesChange]);

  const remove = (id: string) => {
    const item = items.find(i => i.id === id);
    if (item?.preview) URL.revokeObjectURL(item.preview);
    const updated = items.filter(i => i.id !== id);
    setItems(updated);
    onFilesChange?.(updated.map(i => i.file));
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    if (disabled) return;
    addFiles(e.dataTransfer.files);
  };

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <div
        onDragOver={e => { e.preventDefault(); if (!disabled) setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        onClick={() => !disabled && inputRef.current?.click()}
        className={cn(
          "flex flex-col items-center justify-center gap-2 rounded-[8px] border-2 border-dashed",
          "px-6 py-8 cursor-pointer transition-colors",
          disabled && "opacity-50 cursor-not-allowed",
          dragging
            ? "border-[#1F1D1C] bg-[var(--gray-2)]"
            : "border-[var(--border)] hover:border-[var(--gray-7)] hover:bg-[var(--gray-1)]",
        )}
      >
        <div className={cn(
          "w-10 h-10 rounded-[8px] flex items-center justify-center",
          "bg-[var(--gray-2)] text-[var(--gray-10)]",
          dragging && "bg-[var(--gray-3)] text-[var(--gray-12)]",
        )}>
          <Upload size={20} />
        </div>
        <div className="text-center">
          <p className="text-[13px] font-medium text-[var(--gray-12)]">
            拖拽文件到此，或 <span className="text-[var(--gray-11)] underline underline-offset-2">点击选择</span>
          </p>
          <p className="text-[12px] text-[var(--gray-9)] mt-0.5">
            {hint ?? `支持 ${accept?.replace(/,/g, " / ") ?? "任意格式"}，单文件最大 ${formatBytes(maxSize)}`}
          </p>
        </div>
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          className="hidden"
          onChange={e => e.target.files && addFiles(e.target.files)}
        />
      </div>

      {errors.length > 0 && (
        <div className="flex flex-col gap-1">
          {errors.map((err, i) => (
            <p key={i} className="text-[12px] text-[var(--red-solid)]">{err}</p>
          ))}
        </div>
      )}

      {items.length > 0 && (
        <ul className="flex flex-col gap-2">
          {items.map(item => {
            const Icon = getFileIcon(item.file);
            return (
              <li
                key={item.id}
                className="flex items-center gap-3 px-3 py-2 rounded-[8px] bg-[var(--gray-1)] border border-[var(--border)]"
              >
                {item.preview ? (
                  <img src={item.preview} alt="" className="w-8 h-8 rounded-[4px] object-cover shrink-0" />
                ) : (
                  <div className="w-8 h-8 rounded-[4px] bg-[var(--gray-3)] flex items-center justify-center shrink-0 text-[var(--gray-10)]">
                    <Icon size={16} />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-medium text-[var(--gray-12)] truncate">{item.file.name}</p>
                  <p className="text-[11px] text-[var(--gray-9)]">{formatBytes(item.file.size)}</p>
                  {item.progress != null && item.progress < 100 && (
                    <div className="mt-1 h-1 rounded-[9999px] bg-[var(--gray-3)] overflow-hidden">
                      <div
                        className="h-full rounded-[9999px] bg-[#1F1D1C] transition-[width] duration-200"
                        style={{ width: `${item.progress}%` }}
                      />
                    </div>
                  )}
                  {item.error && <p className="text-[11px] text-[var(--red-solid)] mt-0.5">{item.error}</p>}
                </div>
                <button
                  onClick={() => remove(item.id)}
                  className="flex items-center justify-center w-6 h-6 rounded-[4px] text-[var(--gray-9)] hover:bg-[var(--gray-3)] hover:text-[var(--gray-12)] transition-colors shrink-0"
                  aria-label="移除文件"
                >
                  <X size={13} />
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
