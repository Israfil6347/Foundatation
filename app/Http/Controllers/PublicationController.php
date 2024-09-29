<?php

namespace App\Http\Controllers;

use App\Http\Resources\Publication\AdminPublicationCollection;
use App\Http\Resources\Publication\AdminPublicationResource;
use App\Service\PublicationService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PublicationController extends Controller
{
    protected $publicationService;

    public function __construct(PublicationService $publicationService)
    {
        $this->publicationService = $publicationService;
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
         $data = $this->publicationService->allPublication();
            $allPublication = AdminPublicationResource::collection($data);
     
          return Inertia::render('Publication/Index', [
                'AllPublication' => $allPublication,
            ]);
    }   
}
