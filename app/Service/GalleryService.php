<?php

namespace App\Service;

use App\Repositories\Gallery\GalleryRepositoryInterface;
use Illuminate\Support\Str;

class GalleryService
{
    protected $galleryRepository;

    public function __construct(GalleryRepositoryInterface $GalleryRepository)
    {
        $this->galleryRepository = $GalleryRepository;
    }

    public function all($perPage, $searchText){

        return $this->galleryRepository->all($perPage, $searchText);
    }
    public function createPage(array $validatedData): array
    {
         $slug = $validatedData['slug'];
        if ($this->galleryRepository->findBySlug($slug)) {
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

        $this->galleryRepository->create( $validatedData);

        return ['status' => 'success', 'message' => 'Page created successfully.'];
    }
    public function getPage($id){

        return $this->galleryRepository->getPage($id);
    }
    public function updatePage($request, $id){

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
        return $this->galleryRepository->updatePage($request ,$id);

    }
    public function deletePage($id){
        $this->galleryRepository->deletePage($id);
    }

    public function updateDraftStatus($id){
        return $this->galleryRepository->updateDraftStatus($id);
    }

    public function updatePublishStatus($id){
          return $this->galleryRepository->updatePublishStatus($id);
    }

    public function createGalleryImagePage($data, $id) {

         $title = $data['title'];
        if ($this->galleryRepository->findBySlug($title)) {
            return ['status' => 'error', 'message' => 'A page with this slug already exists.'];
        }
        $data['id'] = Str::uuid()->toString();
        $data['gallery_id'] = $id;
        if (isset($data['attachment'])) {
            $attachmentFile = $data['attachment'];
            $imageName = time().'.'.$attachmentFile->getClientOriginalExtension();
            $attachmentPath =  "attachments";
            $attachmentFile->move(public_path($attachmentPath), $imageName);
            $data['attachment_name'] = $imageName;
            $data['attachment_path'] = $attachmentPath;
            $data['attachment_mime'] = $attachmentFile->getClientMimeType();
            $data['attachment_url'] = url($attachmentPath.'/' . $imageName);
        }
        // dd($data);
        
        $this->galleryRepository->createGalleryImage( $data);

        return ['status' => 'success', 'message' => 'Page created successfully.'];
        
    }

    public function deleteGalleryImagePage ($id){
        $this->galleryRepository->deleteGalleryImagePage($id);
    }

    public function allGallery(){
       return $this->galleryRepository->allGallery();
    }
}
