<?php

use App\Http\Controllers\AchievementController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\InternshipController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PublicationController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
    ]);
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Achievement routes
    Route::get('/achievements', [AchievementController::class, 'index'])->name('achievements.index');
    Route::get('/achievements/create', [AchievementController::class, 'create'])->name('achievements.create');
    Route::get('/achievements/{achievement}', [AchievementController::class, 'edit'])->name('achievements.edit');
    Route::put('/achievements/{achievement}', [AchievementController::class, 'update'])->name('achievements.update'); 
    Route::delete('/achievements/{achievement}', [AchievementController::class, 'destroy'])->name('achievements.destroy');
    Route::post('/achievements', [AchievementController::class, 'store'])->name('achievements.store');

    // Internship routes
    Route::get('/internships', [InternshipController::class, 'index'])->name('internships.index');
    Route::get('/internships/create', [InternshipController::class, 'create'])->name('internships.create');
    Route::get('/internships/{internship}', [InternshipController::class, 'edit'])->name('internships.edit');
    Route::put('/internships/{internship}', [InternshipController::class, 'update'])->name('internships.update'); 
    Route::delete('/internships/{internship}', [InternshipController::class, 'destroy'])->name('internships.destroy');
    Route::post('/internships', [InternshipController::class, 'store'])->name('internships.store');

    // Course routes
    Route::get('/courses', [CourseController::class, 'index'])->name('courses.index');
    Route::get('/courses/create', [CourseController::class, 'create'])->name('courses.create');
    Route::get('/courses/{course}', [CourseController::class, 'edit'])->name('courses.edit');
    Route::put('/courses/{course}', [CourseController::class, 'update'])->name('courses.update'); 
    Route::delete('/courses/{course}', [CourseController::class, 'destroy'])->name('courses.destroy');
    Route::post('/courses', [CourseController::class, 'store'])->name('courses.store');

    // Publication routes
    Route::get('/publications', [PublicationController::class, 'index'])->name('publications.index');
    Route::get('/publications/create', [PublicationController::class, 'create'])->name('publications.create');
    Route::get('/publications/{publication}', [PublicationController::class, 'edit'])->name('publications.edit');
    Route::delete('/publications/{publication}', [PublicationController::class, 'destroy'])->name('publications.destroy');
    Route::put('/publications/{publication}', [PublicationController::class, 'update'])->name('publications.update');
    Route::post('/publications', [PublicationController::class, 'store'])->name('publications.store');
});

require __DIR__.'/auth.php';