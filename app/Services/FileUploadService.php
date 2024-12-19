<?php

namespace App\Services;

use Illuminate\Http\UploadedFile;

class FileUploadService
{
    public function uploadDocument(UploadedFile $file, string $directory): string
    {
        return $file->store($directory, 'public');
    }
}