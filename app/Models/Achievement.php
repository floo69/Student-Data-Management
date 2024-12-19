<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Achievement extends Model
{
    protected $fillable = [
        'user_id',
        'title',
        'description',
        'achievement_date',
        'document_path',
    ];

    protected $casts = [
        'achievement_date' => 'date',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}