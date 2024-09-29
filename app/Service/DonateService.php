<?php

namespace App\Service;

use App\Repositories\Donate\DonateRepositoryInterface;
use Illuminate\Support\Str;



class DonateService
{
    protected $donateRepository;

    public function __construct(DonateRepositoryInterface $donateRepository)
    {
        $this->donateRepository = $donateRepository;
    }
     public function createPage(array $validatedData)
    {
        $slug = $validatedData['slug'];
        if ($this->donateRepository->findBySlug($slug)) {
            return ['status' => 'error', 'message' => 'A page with this slug already exists.'];
        }
        $validatedData['id'] = Str::uuid()->toString();
       

        $this->donateRepository->create($validatedData);

        return ['status' => 'success', 'message' => 'Page created successfully.'];
    }

    public function all($perPage, $searchText){

        return $this->donateRepository->all($perPage, $searchText);
    }

    public function getPage($id){
        return $this->donateRepository->getPage($id);
    }

    public function updatePage($request, $id){

        return $this->donateRepository->updatePage($request ,$id);

    }

    public function deletePage($id){
        $this->donateRepository->deletePage($id);
    }

    public function updateDraftStatus($id){

        return $this->donateRepository->updateDraftStatus($id);
    }

    public function updatePublishStatus($id){

          return $this->donateRepository->updatePublishStatus($id);
    }

    public function removeImage($id){
        
        $this->donateRepository->removeImage($id);
    }

    public function getAllDonateAccounts(){
        
        return $this->donateRepository->getAllDonateAccounts();
    }



}
