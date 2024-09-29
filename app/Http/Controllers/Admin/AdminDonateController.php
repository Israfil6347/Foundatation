<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\DonateRequest\StoreDonateRequest;
use App\Http\Resources\Donate\DonateCollection;
use App\Http\Resources\Donate\DonateResource;
use App\Service\DonateService;
use App\Utilities\LinkObject;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AdminDonateController extends Controller
{
      protected $donateService;

    public function __construct(DonateService $DonateService)
    {
        $this->donateService = $DonateService;
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $perPage = request()->filled('per_page') ? request()->query('per_page') : 5;
        $searchText = request()->filled('search_text') ? request()->query('search_text') : '';
        $pages= DonateCollection::collection($this->donateService->all($perPage, $searchText))->additional([
            'createNew' => Auth::user()?->role === 'Super Admin' ? new LinkObject("create", "Create New", route('adminDonate.create'), "GET") : null,
        ]);
        return Inertia::render('Admin/Donate/Index', [
            'pages' => $pages,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Donate/PageCreateView', [
        'Page' => Auth::user()?->role === 'Super Admin' 
                ? new LinkObject("index", "Pages", route('adminDonate.index'), "GET", 'fa-solid fa-list-ul') 
                : null,
        ]);
        
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreDonateRequest $request)
    {
        $validatedData = $request->validated();
        $result =new DonateResource($this->donateService->createPage($validatedData));

        if ($result['status'] === 'error') {
            return redirect()->back()->with('error', $result['message']);
        }

        return redirect()->route('adminDonate.index')->with('message', $result['message']);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $page = $this->donateService->getPage($id);
        $pageView = new DonateResource($page);

        return Inertia::render('Admin/Donate/PageView', [
            'pageView' => $pageView,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $pageData = new DonateResource($this->donateService->getPage($id));    
        $pageData->additional([
            'update' => Auth::user()?->role === 'Super Admin' ? new LinkObject(
                "update", 
                "Update Page", 
                "", 
                ""
            ) : null,
        ]); 

        return Inertia::render('Admin/Donate/PageUpdateView', [
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
        $this->donateService->updatePage($request, $id);
        return redirect()->route('adminDonate.edit', $id)->with('message', 'Page updated successfully');
        } catch (\Exception $e) {
            return redirect()->route('adminDonate.index')->with('error', 'Failed to update page: ' . $e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
         try {
            $this->donateService->deletePage($id);

            return redirect()->route('adminDonate.index')
                         ->with('message', 'Page deleted successfully');
        } catch (\Exception $e) {
            return redirect()->route('adminDonate.index')
                            ->with('error', 'Failed to delete page: ' . $e->getMessage());
        }
        //
    }

    public function updateDraftStatus($id)
    {
         try {
            new DonateResource($this->donateService->updateDraftStatus($id));

            return redirect()->route('adminDonate.index')
                         ->with('message', 'Page Draft successfully');
        } catch (\Exception $e) {
            return redirect()->route('adminDonate.index')
                            ->with('error', 'Failed to delete page: ' . $e->getMessage());
        }
    }

    public function updatePublishStatus($id){

        try {
            new DonateResource($this->donateService->updatePublishStatus($id));

            return redirect()->route('adminDonate.index')
                         ->with('message', 'Page Draft successfully');
        } catch (\Exception $e) {
            return redirect()->route('adminDonate.index')
                            ->with('error', 'Failed to delete page: ' . $e->getMessage());
        }
    }

     public function getAllDonateAccountInfo()
    {
        return DonateCollection::collection($this->donateService->getAllDonateAccounts());
    }
}
