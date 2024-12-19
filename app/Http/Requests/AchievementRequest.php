<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AchievementRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'achievement_date' => 'required|date',
            'document' => 'nullable|file|mimes:pdf,doc,docx|max:2048',
        ];
    }
}