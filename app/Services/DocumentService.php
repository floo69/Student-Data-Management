<?php

namespace App\Services;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class DocumentService
{
    public function uploadDocument(UploadedFile $file, string $directory): string
    {
        return $file->store($directory, 'public');
    }

    public function deleteDocument(?string $path): void
    {
        if ($path) {
            Storage::disk('public')->delete($path);
        }
    }
}