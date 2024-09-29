<?php

namespace App\Http\Controllers;

use App\Http\Resources\Gallery\GalleryResource;
use App\Service\GalleryService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GalleryController extends Controller
{
    //
    protected $galleryService;

    public function __construct(GalleryService $galleryService)
    {
        $this->galleryService = $galleryService;
    }

    public function gallery()
    {
        //
        $data = $this->galleryService->allGallery();
        $allGallery = GalleryResource::collection($data);
        return Inertia::render('Gallery/Index', [
            'gallery' => $allGallery,
        ]);
    }
}
