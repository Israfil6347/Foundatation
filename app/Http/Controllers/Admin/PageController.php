<?php

namespace App\Http\Controllers\Admin;

use App\Http\Requests\PageRequest\StorePageRequest;
use App\Http\Requests\PageRequest\UpdatePageRequest;
use App\Http\Resources\Page\EditPageResource;
use App\Http\Resources\Page\PageCollection;
use App\Http\Resources\Page\PageResource;
use App\Models\Page;
use App\Service\PageService;
use App\Utilities\LinkObject;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Routing\Controller as BaseController;


class PageController extends BaseController
{
    protected $pageService;

    public function __construct(PageService $pageService)
    {
        $this->pageService = $pageService;
    }


    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $perPage = request()->filled('per_page') ? request()->query('per_page') : 10;
        $searchText = request()->filled('search_text') ? request()->query('search_text') : '';
        $pages= PageCollection::collection($this->pageService->all($perPage, $searchText))->additional([
            'createNew' => Auth::user()?->role === 'Super Admin' ? new LinkObject("create", "Create New", route('pages.create'), "GET") : null,
        ]);
        return Inertia::render('Admin/Pages/Index', [
            'pages' => $pages,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
       return Inertia::render('Admin/Pages/PageCreateView', [
        'Page' => Auth::user()?->role === 'Super Admin' 
                ? new LinkObject("index", "Pages", route('pages.index'), "GET", 'fa-solid fa-list-ul') 
                : null,
        ]);
    }
    /**
     * Store a newly created resource in storage.
     */

    public function store(StorePageRequest $request)
    {

        $validatedData = $request->validated();
        $result =new PageResource($this->pageService->createPage($validatedData));

        if ($result['status'] === 'error') {
            return redirect()->back()->with('error', $result['message']);
        }

        return redirect()->route('pages.index')->with('message', $result['message']);

        
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
     
        $page = $this->pageService->getPage($id);
        $pageView = new PageResource($page);
        return Inertia::render('Admin/Pages/PageView', [
            'pageView' => $pageView,
        ]);
      
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $pageData = new PageResource($this->pageService->getPage($id));    
        $pageData->additional([
            'update' => Auth::user()?->role === 'Super Admin' ? new LinkObject(
                "update", 
                "Update Page", 
                "", 
                ""
            ) : null,
        ]); 

        return Inertia::render('Admin/Pages/PageUpdateView', [
            'pageView' => $pageData,
            "id"=> $id,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePageRequest $request, string $id)
    {

       try {

        $this->pageService->updatePage($request, $id);

        return redirect()->route('pages.edit', $id)
                         ->with('message', 'Page updated successfully');
        } catch (\Exception $e) {
            
            return redirect()->route('pages.index')
                            ->with('error', 'Failed to update page: ' . $e->getMessage());
        }
        
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
         try {
             $this->pageService->deletePage($id);

            return redirect()->route('pages.index')
                         ->with('message', 'Page deleted successfully');
        } catch (\Exception $e) {
            return redirect()->route('pages.index')
                            ->with('error', 'Failed to delete page: ' . $e->getMessage());
        }

    }

    public function removeImage(string $id){

        try {
             $this->pageService->removeImage($id);
            return redirect()->route('pages.edit', $id)
                         ->with('message', 'image remove successfully');
        } catch (\Exception $e) {
            return redirect()->route('pages.index')
                            ->with('error', 'Failed to delete page: ' . $e->getMessage());
        }

    }

    public function updateDraftStatus($id)
    {
         try {
            new PageResource($this->pageService->updateDraftStatus($id));

            return redirect()->route('pages.index')
                         ->with('message', 'Page Draft successfully');
        } catch (\Exception $e) {
            return redirect()->route('pages.index')
                            ->with('error', 'Failed to delete page: ' . $e->getMessage());
        }
    }

    public function updatePublishStatus($id){

        try {
            new PageResource($this->pageService->updatePublishStatus($id));

            return redirect()->route('pages.index')
                         ->with('message', 'Page Draft successfully');
        } catch (\Exception $e) {
            return redirect()->route('pages.index')
                            ->with('error', 'Failed to delete page: ' . $e->getMessage());
        }
    }
     public function getPostBySlug($slug)
    {
        return new PageResource($this->pageService->getPostBySlug($slug));
    }

     
}
