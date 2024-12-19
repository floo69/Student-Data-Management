<?php

namespace App\Traits;

trait HasDocument
{
    public function getDocumentUrlAttribute(): ?string
    {
        return $this->document_path ? Storage::disk('public')->url($this->document_path) : null;
    }
}