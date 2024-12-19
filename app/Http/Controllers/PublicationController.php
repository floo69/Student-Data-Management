<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;
use App\Models\Publication;
use App\Services\FileUploadService;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use App\Http\Requests\PublicationRequest;

class PublicationController extends Controller
{
    public function __construct(
        private FileUploadService $fileUploadService
    ) {}

    public function index(): Response
    {
        return Inertia::render('Publications/Index', [
            'publications' => Publication::where('user_id', Auth::id())
                ->orderBy('publication_date', 'desc')
                ->get()
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Publications/Create');
    }

    public function store(PublicationRequest $request)
    {
        $publication = new Publication($request->validated());
        $publication->user_id = Auth::id();

        if ($request->hasFile('document')) {
            $publication->document_path = $this->fileUploadService
                ->uploadDocument($request->file('document'), 'publications');
        }

        $publication->save();

        return redirect()->route('publications.index')
            ->with('success', 'Publication created successfully.');
    }

    public function edit(Publication $publication): Response
    {
        if (Auth::id() == $publication->user_id) {
            return Inertia::render('Publications/Edit', [
                'publication' => $publication
            ]);
        } else {
            abort(403, 'Unauthorized action.');
        }
    }

    public function update(PublicationRequest $request, Publication $publication)
    {
        if (Auth::id() != $publication->user_id) {
            abort(403, 'Unauthorized action.');
        }

        $publication->fill($request->validated());

        if ($request->hasFile('document')) {
            if ($publication->document_path) {
                Storage::disk('public')->delete($publication->document_path);
            }
            $publication->document_path = $this->fileUploadService
                ->uploadDocument($request->file('document'), 'publications');
        }

        $publication->save();

        return redirect()->route('publications.index')
            ->with('success', 'Publication updated successfully.');
    }

    public function destroy(Publication $publication)
    {
        if (Auth::id() != $publication->user_id) {
            abort(403, 'Unauthorized action.');
        }

        if ($publication->document_path) {
            Storage::disk('public')->delete($publication->document_path);
        }
        $publication->delete();
        return redirect()->route('publications.index')
           ->with('success', 'Publication deleted successfully.');
   }
}