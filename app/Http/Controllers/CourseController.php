<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;
use App\Models\Course;
use App\Services\FileUploadService;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use App\Http\Requests\CourseRequest;
use Illuminate\Http\Request;


class CourseController extends Controller
{
    public function __construct(
        private FileUploadService $fileUploadService
    ) {}

    public function index(Request $request): Response
    {
        $search = $request->input('search');
        $query = Course::where('user_id', Auth::id());

        if ($search) {
            $query->where(function($q) use ($search) {
                $q->where('name', 'LIKE', "%{$search}%")
                  ->orWhere('institution', 'LIKE', "%{$search}%")
                  ->orWhere('completion_date', 'LIKE', "%{$search}%");
            });
        }

        return Inertia::render('Courses/Index', [
            'courses' => $query->orderBy('completion_date', 'desc')->get(),
            'filters' => ['search' => $search]
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Courses/Create');
    }

    public function store(CourseRequest $request)
    {
        $course = new Course($request->validated());
        $course->user_id = Auth::id();

        if ($request->hasFile('document')) {
            $course->document_path = $this->fileUploadService
                ->uploadDocument($request->file('document'), 'courses');
        }

        $course->save();

        return redirect()->route('courses.index') // Changed route name
            ->with('success', 'Course created successfully.');
    }

    public function edit(Course $course): Response
    {
        if (Auth::id() == $course->user_id) {
            return Inertia::render('Courses/Edit', [
                'course' => $course
            ]);
        } else {
            abort(403, 'Unauthorized action.');
        }
    }

    public function update(CourseRequest $request, Course $course)
    {   
        if (Auth::id() != $course->user_id) {
            abort(403, 'Unauthorized action.');
        }

        $course->fill($request->validated());

        if ($request->hasFile('document')) {
            if ($course->document_path) {
                Storage::disk('public')->delete($course->document_path);
            }
            $course->document_path = $this->fileUploadService
                ->uploadDocument($request->file('document'), 'courses');
        }

        $course->save();

        return redirect()->route('courses.index') // Changed route name
            ->with('success', 'Course updated successfully.');
    }

    public function destroy(Course $course)
    {
        if (Auth::id() != $course->user_id) {
            abort(403, 'Unauthorized action.');
        }
        if ($course->document_path) {
            Storage::disk('public')->delete($course->document_path);
       }
        $course->delete();
        return redirect()->route('courses.index') // Changed route name
           ->with('success', 'Course deleted successfully.');
   }
}