<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\PublicController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Admin\PageController;
use App\Http\Controllers\PublicationController;
use App\Http\Controllers\Admin\SettingController;
use App\Http\Controllers\Admin\AdminUserController;
use App\Http\Controllers\Admin\AdminDonateController;
use App\Http\Controllers\Admin\AdminNoticeController;
use App\Http\Controllers\Admin\AdminGalleryController;
use App\Http\Controllers\Admin\AdminPublicationController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\GalleryController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/pages/slug/{slug}', [PageController::class, 'getPostBySlug'])->name(name: 'pages.getPostBySlug');
Route::get('/withoutAuthAdminDonate', [AdminDonateController::class, 'getAllDonateAccountInfo'])->name(name: 'adminDonate.allAccountInfo');
Route::get('/getAllNotices', action: [AdminNoticeController::class, 'getAllPost'])->name( name: 'adminNotices.adminNoticeView');
Route::get('/galleryImage', action: [AdminGalleryController::class, 'getAllData'])->name( name: 'gallery.adminAllGallery');
Route::get('/publication', action: [PublicationController::class, 'index'])->name( name: 'publication');

Route::get("/settings/public", [SettingController::class, 'getPublicSetting'])
    ->name("settings.getPublicSetting");

Route::get('/notices', [PublicController::class, 'notice'])->name('notices');
Route::get('/gallery', [GalleryController::class, 'gallery'])->name('gallery');
Route::get('/donate', [PublicController::class, 'donate'])->name('donate');
Route::get('/faq', [PublicController::class, 'faq'])->name('faq');
Route::get('/contact', [PublicController::class, 'contact'])->name('contact');

Route::prefix('about')->group(callback: function () {
    Route::get('/', [PublicController::class, 'about'])->name('about');
    Route::get('/our-history', [PublicController::class, 'history'])->name('about/our-history');
    Route::get('/mission-vision', [PublicController::class, 'missionAndVision'])->name('about/mission-vision');
    Route::get('/structure-and-partners', [PublicController::class, 'structureAndPartners'])->name('about/structure-and-partners');
    Route::get('/activities', [PublicController::class, 'activities'])->name('about/activities');
    Route::get('/chairman-message', [PublicController::class, 'chairmanMessage'])->name('about/chairman-message');
});

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name("home");

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

});

Route::middleware('auth')->group(function () {
    Route::get('pages', [PageController::class, 'index'])->name('pages.index');
    Route::get('pages/create', [PageController::class, 'create'])->name('pages.create');
    Route::post('pages', [PageController::class, 'store'])->name('pages.store');
    Route::get('pages/{id}', [PageController::class, 'show'])->name('pages.show');
    Route::get('pages/{id}/edit', [PageController::class, 'edit'])->name('pages.edit');
    Route::post('pages/{id}', [PageController::class, 'update'])->name('pages.update');
    Route::delete('pages/{id}', [PageController::class, 'destroy'])->name('pages.destroy');
    Route::delete('pages/removeImage/{id}', [PageController::class, 'removeImage'])->name('pages.removeImage');
    Route::patch('pages/updateDraftStatus/{id}', [PageController::class, 'updateDraftStatus'])->name('pages.updateDraftStatus');
    Route::patch('pages/updatePublishStatus/{id}', [PageController::class, 'updatePublishStatus'])->name('pages.updatePublishStatus');

    Route::get("adminDonate", [AdminDonateController::class, 'index'])->name("adminDonate.index");
    Route::get('adminDonate/create', [AdminDonateController::class, 'create'])->name('adminDonate.create');
    Route::post('adminDonate', [AdminDonateController::class, 'store'])->name('adminDonate.store');
    Route::get('adminDonate/{id}', [AdminDonateController::class, 'show'])->name('adminDonate.show');
    Route::get('adminDonate/{id}/edit', [AdminDonateController::class, 'edit'])->name('adminDonate.edit');
    Route::post('adminDonate/{id}', [AdminDonateController::class, 'update'])->name('adminDonate.update');
    Route::patch('adminDonate/updateDraftStatus/{id}', [AdminDonateController::class, 'updateDraftStatus'])->name('adminDonate.updateDraftStatus');
    Route::patch('adminDonate/updatePublishStatus/{id}', [AdminDonateController::class, 'updatePublishStatus'])->name('adminDonate.updatePublishStatus');
    Route::delete('adminDonate/{id}', [AdminDonateController::class, 'destroy'])->name('adminDonate.destroy');

    Route::get("adminNotices", [AdminNoticeController::class, 'index'])->name("adminNotices.index");
    Route::get('adminNotices/create', [AdminNoticeController::class, 'create'])->name('adminNotices.create');
    Route::post('adminNotices', [AdminNoticeController::class, 'store'])->name('adminNotice.store');
    Route::get('adminNotices/{id}', [AdminNoticeController::class, 'show'])->name('adminNotice.show');
    Route::get('adminNotices/{id}/edit', [AdminNoticeController::class, 'edit'])->name('adminNotice.edit');
    Route::post('adminNotices/{id}', [AdminNoticeController::class, 'update'])->name('adminNotices.update');
    Route::patch('adminNotices/updateDraftStatus/{id}', [AdminNoticeController::class, 'updateDraftStatus'])->name('adminNotices.updateDraftStatus');
    Route::patch('adminNotices/updatePublishStatus/{id}', [AdminNoticeController::class, 'updatePublishStatus'])->name('adminNotices.updatePublishStatus');
    Route::delete('adminNotices/{id}', [AdminNoticeController::class, 'destroy'])->name('adminNotice.destroy');

    Route::get("adminGalleryImage", [AdminGalleryController::class, 'index'])->name("adminGalleryImage.index");
    Route::get('adminGallery/create', [AdminGalleryController::class, 'create'])->name('adminGallery.create');
    Route::post('adminGallery', [AdminGalleryController::class, 'store'])->name('adminGallery.store');
    Route::get('adminGallery/{id}', [AdminGalleryController::class, 'show'])->name('adminGalleryImage.show');
    Route::get('adminGallery/{id}/edit', [AdminGalleryController::class, 'edit'])->name('adminGalleryImage.edit');
    Route::post('adminGallery/{id}', [AdminGalleryController::class, 'update'])->name('adminGalleryImage.update');
    Route::delete('adminGallery/{id}', [AdminGalleryController::class, 'destroy'])->name('adminGalleryImage.destroy');
    Route::patch('adminGallery/updateDraftStatus/{id}', [AdminGalleryController::class, 'updateDraftStatus'])->name('adminGalleryImage.updateDraftStatus');
    Route::patch('adminGallery/updatePublishStatus/{id}', [AdminGalleryController::class, 'updatePublishStatus'])->name('adminGalleryImage.updatePublishStatus');
    Route::post('adminGallery/{id}/edit', [AdminGalleryController::class, 'storeGalleryImage'])->name('adminGalleryImage.storeGalleryImage');
    Route::delete('adminGallery/{id}/edit', [AdminGalleryController::class, 'delateGalleryImageAttachment'])->name('galleryImageAttachment.delateGalleryImageAttachment');
    Route::patch('adminGallery/{id}/edit', [AdminGalleryController::class, 'UpdateGalleryImageAttachment'])->name('adminGalleryImageUpdate.updateGalleryImage');

    Route::get("adminPublication", [AdminPublicationController::class, 'index'])->name("adminPublication.index");
    Route::get('adminPublication/create', [AdminPublicationController::class, 'create'])->name('adminPublication.create');
    Route::post('adminPublication/store', [AdminPublicationController::class, 'store'])->name('adminPublication.store');
    Route::get('adminPublication/{id}', [AdminPublicationController::class, 'show'])->name('adminPublication.show');
    Route::get('adminPublication/{id}/edit', [AdminPublicationController::class, 'edit'])->name('adminPublication.edit');
    Route::post('adminPublication/{id}', [AdminPublicationController::class, 'update'])->name('adminPublication.update');
    Route::patch('adminPublication/updateDraftStatus/{id}', [AdminPublicationController::class, 'updateDraftStatus'])->name('adminPublication.updateDraftStatus');
    Route::patch('adminPublication/updatePublishStatus/{id}', [AdminPublicationController::class, 'updatePublishStatus'])->name('adminPublication.updatePublishStatus');
    Route::delete('adminPublication/{id}', [AdminPublicationController::class, 'destroy'])->name('adminPublication.destroy');

    Route::get("users", [AdminUserController::class, 'index'])->name("users.index");
    Route::get("users/create", [AdminUserController::class, 'create'])->name("users.create");
    Route::post("users/create", [AdminUserController::class, 'store'])->name("users.store");
    Route::get('users/{id}', [AdminUserController::class, 'show'])->name('users.show');
    Route::get('users/{id}', [AdminUserController::class, 'show'])->name('users.show');
    Route::patch('users/updateUserActiveStatus/{id}', [AdminUserController::class, 'updateUserActiveStatus'])
    ->name('users.updateUserActiveStatus');
    Route::get('users/{id}/edit', [AdminUserController::class, 'edit'])->name('users.edit');
    Route::delete('users/{id}', [AdminUserController::class, 'destroy'])->name('users.destroy');
    Route::post('users/{id}', [AdminUserController::class, 'update'])->name('users.update');

    Route::get("/settings", [SettingController::class, 'index'])->name("settings.index");
    Route::post("/settings", [SettingController::class, 'update'])->name("settings.update");
    Route::get("/settings/{settingName}", [SettingController::class, 'getSettingBySettingName'])
    ->name("settings.getSettingBySettingName")->withoutMiddleware("auth");


    Route::get("/dashboard/all", [DashboardController::class, 'index'])->name("admin.getAllPublishAndDraftCalculation");
 
});

require __DIR__.'/auth.php';
