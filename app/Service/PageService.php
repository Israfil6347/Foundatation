<?php

namespace App\Service;

use App\Repositories\Page\PageRepositoryInterface;
use Illuminate\Support\Str;



class PageService
{
    protected $pageRepository;

    public function __construct(PageRepositoryInterface $pageRepository)
    {
        $this->pageRepository = $pageRepository;
    }
     public function createPage(array $validatedData)
    {
        $slug = $validatedData['slug'];
        if ($this->pageRepository->findBySlug($slug)) {
            return ['status' => 'error', 'message' => 'A page with this slug already exists.'];
        }
        $validatedData['id'] = Str::uuid()->toString();

        if (isset($validatedData['attachment'])) {
            $attachmentFile = $validatedData['attachment'];
            $imageName = time().'.'.$attachmentFile->getClientOriginalExtension();
            $attachmentPath =  "attachments";
            $attachmentFile->move(public_path($attachmentPath), $imageName);
            $validatedData['attachment_name'] = $imageName;
            $validatedData['attachment_path'] = $attachmentPath;
            $validatedData['attachment_mime'] = $attachmentFile->getClientMimeType();
            $validatedData['attachment_url'] = url($attachmentPath.'/' . $imageName);
        }

        $this->pageRepository->create($validatedData);

        return ['status' => 'success', 'message' => 'Page created successfully.'];
    }

    public function all($perPage, $searchText){
        return $this->pageRepository->all($perPage, $searchText);
    }

    public function getPage($id){
        return $this->pageRepository->getPage($id);
    }

    public function updatePage($request, $id){

        // $updatePage = Page::find($id);

        if ($request->hasFile('attachment')) {
        $attachmentFile = $request->file('attachment');
        $imageName = time() . '.' . $attachmentFile->getClientOriginalExtension();
        $attachmentPath = "attachments";
        $attachmentFile->move(public_path($attachmentPath), $imageName);
        $request['attachment_name'] = $imageName;
        $request['attachment_path'] = $attachmentPath;
        $request['attachment_mime'] = $attachmentFile->getClientMimeType();
        $request['attachment_url'] = url($attachmentPath . '/' . $imageName);

        }


        return $this->pageRepository->updatePage($request ,$id);

    }

    public function deletePage($id){
        $this->pageRepository->deletePage($id);
    }

    public function updateDraftStatus($id){

        return $this->pageRepository->updateDraftStatus($id);
    }

    public function updatePublishStatus($id){

          return $this->pageRepository->updatePublishStatus($id);
    }

    public function removeImage($id){
        
        $this->pageRepository->removeImage($id);
    }

    public function getPostBySlug($slug){
        
        return $this->pageRepository->getPostBySlug($slug);
    }



}
