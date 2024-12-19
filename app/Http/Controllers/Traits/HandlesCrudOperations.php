<?php

namespace App\Http\Controllers\Traits;

use App\Services\DocumentService;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Http\FormRequest;
use Inertia\Response;

trait HandlesCrudOperations
{
    protected DocumentService $documentService;

    public function __construct(DocumentService $documentService)
    {
        $this->documentService = $documentService;
    }

    protected function storeRecord(FormRequest $request, string $modelClass, string $directory): Model
    {
        $record = new $modelClass($request->validated());
        $record->user_id = auth()->id();

        if ($request->hasFile('document')) {
            $record->document_path = $this->documentService
                ->uploadDocument($request->file('document'), $directory);
        }

        $record->save();
        return $record;
    }

    protected function updateRecord(FormRequest $request, Model $record): void
    {
        $record->fill($request->validated());

        if ($request->hasFile('document')) {
            $this->documentService->deleteDocument($record->document_path);
            $record->document_path = $this->documentService
                ->uploadDocument($request->file('document'), $this->getDocumentDirectory());
        }

        $record->save();
    }

    protected function deleteRecord(Model $record): void
    {
        $this->documentService->deleteDocument($record->document_path);
        $record->delete();
    }
}