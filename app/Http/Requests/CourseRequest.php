<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CourseRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'institution' => 'required|string|max:255',
            'completion_date' => 'required|date',
            'document' => 'nullable|file|mimes:pdf,doc,docx|max:2048',
        ];
    }
}