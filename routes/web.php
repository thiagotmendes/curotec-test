<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use \App\Http\Controllers\ResourceController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    // Resource routes
    Route::get('resources', [ResourceController::class, 'index'])->name('resources.index');
    Route::post('resources', [ResourceController::class, 'store'])->name('resources.store');
    Route::put('resources/{resource}', [ResourceController::class, 'update'])->name('resources.update');
    Route::delete('resources/{resource}', [ResourceController::class, 'destroy'])->name('resources.destroy');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
