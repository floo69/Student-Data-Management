<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;
use App\Models\Achievement;
use App\Services\FileUploadService;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use App\Http\Requests\AchievementRequest;

class AchievementController extends Controller
{
    public function __construct(
        private FileUploadService $fileUploadService
    ) {}

    public function index(): Response
    {
        return Inertia::render('Achievements/Index', [
            'achievements' => Achievement::where('user_id', Auth::id())
                ->orderBy('achievement_date', 'desc')
                ->get()
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Achievements/Create');
    }

    public function store(AchievementRequest $request)
    {
        $achievement = new Achievement($request->validated());
        $achievement->user_id = Auth::id();

        if ($request->hasFile('document')) {
            $achievement->document_path = $this->fileUploadService
                ->uploadDocument($request->file('document'), 'achievements');
        }

        $achievement->save();

        return redirect()->route('achievements.index')
            ->with('success', 'Achievement created successfully.');
    }

    

    public function edit(Achievement $achievement): Response
    {
        if (Auth::id() == $achievement->user_id) {
            return Inertia::render('Achievements/Edit', [
                'achievement' => $achievement
            ]);
        } else {
            abort(403, 'Unauthorized action.');
        }
    }

    public function update(AchievementRequest $request, Achievement $achievement)
    {
        if (Auth::id() != $achievement->user_id) {
            abort(403, 'Unauthorized action.');
        }

        $achievement->fill($request->validated());

        if ($request->hasFile('document')) {
            // Delete old document if exists
            if ($achievement->document_path) {
                Storage::disk('public')->delete($achievement->document_path);
            }
            
            $achievement->document_path = $this->fileUploadService
                ->uploadDocument($request->file('document'), 'achievements');
        }

        $achievement->save();

        return redirect()->route('achievements.index')
            ->with('success', 'Achievement updated successfully.');
    }

    public function destroy(Achievement $achievement)
    {
        if (Auth::id() != $achievement->user_id) {
            abort(403, 'Unauthorized action.');
        }

        if ($achievement->document_path) {
            Storage::disk('public')->delete($achievement->document_path);
        }

        $achievement->delete();

        return redirect()->route('achievements.index')
            ->with('success', 'Achievement deleted successfully.');
    }
}