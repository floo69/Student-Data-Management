<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PublicationRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => 'required|string|max:255',
            'journal' => 'required|string|max:255',
            'publication_date' => 'required|date',
            'document' => 'nullable|file|mimes:pdf,doc,docx|max:2048',
        ];
    }
}