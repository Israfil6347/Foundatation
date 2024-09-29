<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreGalleryImage;
use App\Http\Resources\Gallery\GalleryCollection;
use App\Http\Resources\Gallery\GalleryResource;
use App\Http\Resources\Gallery\StoreGalleryImageResource;
use App\Service\GalleryService;
use App\Utilities\LinkObject;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AdminGalleryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    protected $galleryService;

    public function __construct(GalleryService $galleryService)
    {
        $this->galleryService = $galleryService;
    }
    public function index()
    {
        
        $perPage = request()->filled('per_page') ? request()->query('per_page') : 5;
        $searchText = request()->filled('search_text') ? request()->query('search_text') : '';
        $pages= GalleryCollection::collection($this->galleryService->all($perPage, $searchText))->additional([
            'createNew' => Auth::user()?->role === 'Super Admin' ? new LinkObject("create", "Create New", route('adminGallery.create'), "GET") : null,
        ]);
        return Inertia::render('Admin/GalleryImages/Index', [
            'pages' => $pages,
        ]);
    
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/GalleryImages/PageCreateView', [
        'Page' => Auth::user()?->role === 'Super Admin' 
                ? new LinkObject("index", "Pages", route('adminGalleryImage.index'), "GET", 'fa-solid fa-list-ul') 
                : null,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->all();
        $result =new GalleryCollection(resource: $this->galleryService->createPage( $data));

        if ($result['status'] === 'error') {
            return redirect()->back()->with('error', $result['message']);
        }

        return redirect()->route(route: 'adminGalleryImage.index')->with('message', $result['message']);

    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
        $page = $this->galleryService->getPage($id);        
        $pageView = new GalleryResource(resource: $page);
        return Inertia::render('Admin/GalleryImages/PageView', [
            'pageView' => $pageView,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $pageData = new GalleryResource($this->galleryService->getPage($id));    
        $pageData->additional([
            'update' => Auth::user()?->role === 'Super Admin' ? new LinkObject(
                "update", 
                "Update Page", 
                "", 
                ""
            ) : null,
        ]); 

        return Inertia::render('Admin/GalleryImages/PageUpdateView', [
            'pageView' => $pageData,
            "id"=> $id,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        try {

        $this->galleryService->updatePage($request, $id);

        return redirect()->route('adminGalleryImage.edit', $id)
                         ->with('message', 'Page updated successfully');
        } catch (\Exception $e) {
            
            return redirect()->route('adminGalleryImage.index')
                            ->with('error', 'Failed to update page: ' . $e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
             $this->galleryService->deletePage($id);

            return redirect()->route('adminGalleryImage.index')
                         ->with('message', 'Page deleted successfully');
        } catch (\Exception $e) {
            return redirect()->route('adminGalleryImage.index')
                            ->with('error', 'Failed to delete page: ' . $e->getMessage());
        }
    }

    public function updateDraftStatus($id)
    {
        try {
            new GalleryResource($this->galleryService->updateDraftStatus($id));

            return redirect()->route('adminGalleryImage.index')
                         ->with('message', 'Page Draft successfully');
        } catch (\Exception $e) {
            return redirect()->route('adminGalleryImage.index')
                            ->with('error', 'Failed to delete page: ' . $e->getMessage());
        }
    }

    public function updatePublishStatus($id){
        try {
            new GalleryResource($this->galleryService->updatePublishStatus($id));

            return redirect()->route('adminGalleryImage.index')
                         ->with('message', 'Page Draft successfully');
        } catch (\Exception $e) {
            return redirect()->route('adminGalleryImage.index')
                            ->with('error', 'Failed to delete page: ' . $e->getMessage());
        }
    }

   public function storeGalleryImage(StoreGalleryImage $request, $id) {
    
        $validatedData = $request->validated();       
        $result = new StoreGalleryImageResource($this->galleryService->createGalleryImagePage($validatedData, $id));
        if ($result['status'] === 'error') {
            return redirect()->back()->with('error', $result['message']);
        }
        return redirect()->route('adminGalleryImage.storeGalleryImage',$id)->with('message', $result['message']);
    }

    public function delateGalleryImageAttachment ($id){
        try {
             $this->galleryService->deleteGalleryImagePage($id);

            return redirect()->route('adminGalleryImage.index')
                         ->with('message', 'Page deleted successfully');
        } catch (\Exception $e) {
            return redirect()->route('adminGalleryImage.index')
                            ->with('error', 'Failed to delete page: ' . $e->getMessage());
        }

    }

}
