<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;
use App\Models\Internship;
use App\Services\FileUploadService;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use App\Http\Requests\InternshipRequest;

class InternshipController extends Controller
{
    public function __construct(
        private FileUploadService $fileUploadService
    ) {}

    public function index(): Response
    {
        return Inertia::render('Internships/Index', [
            'internships' => Internship::where('user_id', Auth::id())
                ->orderBy('start_date', 'desc')
                ->get()
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Internships/Create');
    }

    public function store(InternshipRequest $request)
    {
        $internship = new Internship($request->validated());
        $internship->user_id = Auth::id();

        if ($request->hasFile('document')) {
            $internship->document_path = $this->fileUploadService
                ->uploadDocument($request->file('document'), 'internships');
        }

        $internship->save();

        return redirect()->route('internships.index')
            ->with('success', 'Internship created successfully.');
    }

    
    public function edit(Internship $internship): Response
    {
        if (Auth::id() == $internship->user_id) {
            return Inertia::render('Internships/Edit', [
                'internship' => $internship
            ]);
        } else {
            abort(403, 'Unauthorized action.');
        }
    }
     public function update(InternshipRequest $request, Internship $internship)
    {
        if (Auth::id() != $internship->user_id) {
            abort(403, 'Unauthorized action.');
        }

        $internship->fill($request->validated());

        // Handle file updates if needed (similar to AchievementController)
        if ($request->hasFile('document')) {
            if ($internship->document_path) {
                Storage::disk('public')->delete($internship->document_path);
            }
            $internship->document_path = $this->fileUploadService
                ->uploadDocument($request->file('document'), 'internships');
        }

        $internship->save();

        return redirect()->route('internships.index')
            ->with('success', 'Internship updated successfully.');
    }

    public function destroy(Internship $internship)
    {
        if (Auth::id() != $internship->user_id) {
            abort(403, 'Unauthorized action.');
        }

        if ($internship->document_path) {
            Storage::disk('public')->delete($internship->document_path);
        }

        $internship->delete();

        return redirect()->route('internships.index')
            ->with('success', 'Internship deleted successfully.');
    }
}
