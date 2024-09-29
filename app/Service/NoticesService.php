<?php

namespace App\Service;


use App\Repositories\Notices\NoticesRepositoryInterface;
use Illuminate\Support\Str;



class NoticesService
{
    protected $noticesRepository;

    public function __construct(NoticesRepositoryInterface $NoticesRepository)
    {
        $this->noticesRepository = $NoticesRepository;
    }
     public function createPage(array $validatedData)
    {
        $slug = $validatedData['slug'];
        if ($this->noticesRepository->findBySlug($slug)) {
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

        $this->noticesRepository->create($validatedData);

        return ['status' => 'success', 'message' => 'Page created successfully.'];
    }

    

    public function all($perPage, $searchText){
        return $this->noticesRepository->all($perPage, $searchText);
    }

    public function getPage($id){
        return $this->noticesRepository->getPage($id);
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


        return $this->noticesRepository->updatePage($request ,$id);

    }

    public function deletePage($id){
        $this->noticesRepository->deletePage($id);
    }

    public function updateDraftStatus($id){

        return $this->noticesRepository->updateDraftStatus($id);
    }

    public function updatePublishStatus($id){

          return $this->noticesRepository->updatePublishStatus($id);
    }

    public function removeImage($id){
        
        $this->noticesRepository->removeImage($id);
    }

    public function getAllPost(){
        
        return $this->noticesRepository->getAllPost();
    }



}
