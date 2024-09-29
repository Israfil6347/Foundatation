<?php

namespace App\Service;

use App\Repositories\Publication\PublicationRepositoryInterface;
use Illuminate\Support\Str;


class PublicationService{

    protected $publicationRepository;

    public function __construct(PublicationRepositoryInterface $publicationRepository)
    {
        $this->publicationRepository = $publicationRepository;
    }    
    
    
     public function all($perPage, $searchText){
        return $this->publicationRepository->all($perPage, $searchText);
    }

    public function createPage(array $validatedData)
    {

      
        $slug = $validatedData['slug'];
        if ($this->publicationRepository->findBySlug($slug)) {
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

        $this->publicationRepository->create($validatedData);

        return ['status' => 'success', 'message' => 'Page created successfully.'];
    }
    public function getPage($id){
        return $this->publicationRepository->getPage($id);
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


        return $this->publicationRepository->updatePage($request ,$id);

    }

    public function deletePage($id){
        $this->publicationRepository->deletePage($id);
    }

      public function updateDraftStatus($id){

        return $this->publicationRepository->updateDraftStatus($id);
    }

    public function updatePublishStatus($id){

          return $this->publicationRepository->updatePublishStatus($id);
    }

    public function allPublication(){
       return $this->publicationRepository->allPublication();
    }

}